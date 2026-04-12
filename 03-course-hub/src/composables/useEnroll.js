import { ref } from 'vue'

const loading = ref(false)
const enrolled = ref([])

const fetchEnrolled = async () => {
    loading.value = true
    try {
        const response = await fetch('http://localhost:3001/enrolled')
        enrolled.value = await response.json()
    }
    finally {
        loading.value = false
    }
}
const registerCourse = async (course) => {
    if (enrolled.value.some((e => e.id === course.id))) {
        alert('Course already purchased!')
        return
    }

    const newCourse = {
        id: course.id,
        title: course.title,
        price: course.price,
        description: course.description,
        status: "pending"
    }

    enrolled.value.push(newCourse)

    try {
        const response = await fetch('http://localhost:3001/enrolled', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newCourse,
                status: "confirmed"
            })

        })

        if (response.ok) {
            const index = enrolled.value.findIndex((b) => b.id === newCourse.id)
            enrolled.value[index] = await response.json()
        } else {
            enrolled.value = enrolled.value.filter((b) => b.id != newCourse.id)
            return
        }
    } catch (e) {
        console.error(e)
        enrolled.value = enrolled.value.filter((b) => b.id != newCourse.id)
    }


}

const reportCourse = async (courseId) => {
    const index = enrolled.value.findIndex((e) => e.id === courseId)
    const toBeDeleted = enrolled.value[index]
    enrolled.value.splice(index, 1)

    try {
        const response = await fetch(`http://localhost:3001/enrolled/${courseId}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw Error("Couldn't delete course.")
        }
    } catch (error) {
        console.log(error)
        enrolled.value.splice(index, 0, toBeDeleted)
    }
}
export default function useEnroll() {
    return { loading, enrolled, fetchEnrolled, registerCourse, reportCourse }
}