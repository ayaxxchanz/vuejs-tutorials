<script setup>
// Import Vue utilities we need:
// ref - makes a variable reactive (Vue watches it and updates the UI when it changes)
// computed - creates a value that auto-recalculates when its dependencies change
// watch - runs a function whenever a reactive value changes
// onMounted - runs code after the component is loaded into the page
import { ref, computed, watch, onMounted } from 'vue'

// ref('') creates a reactive variable. Wrapping in ref() means Vue will
// re-render the template automatically whenever this value changes.
const newTask = ref('')   // holds the text from the "add task" input field
const tasks = ref([])     // holds the array of all task objects

const addTask = () => {
  // .value is how you read/write a ref variable inside <script setup>
  // (In the template, Vue handles .value automatically, so you don't need it there)
  const text = newTask.value.trim()  // .trim() removes leading/trailing whitespace

  if (!text) return  // don't add an empty task

  // .push() adds a new task object to the end of the tasks array
  tasks.value.push({
    id: Date.now(),      // use current timestamp as a unique ID
    text: text,
    favourite: false,
    completed: false
  })

  newTask.value = ''     // clear the input field after adding
  console.log(tasks)
}

const removeTask = (id) => {
  // .filter() returns a new array keeping only tasks that do NOT match the given id
  // This effectively removes the task with the matching id
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

// editId tracks which task is currently being edited (null means none)
const editId = ref(null)
// editBuffer temporarily holds the text while the user is editing
// We use a buffer so changes are not saved until the user confirms
const editBuffer = ref('')

const startEdit = (task) => {
  editId.value = task.id      // mark this task as the one being edited
  editBuffer.value = task.text  // pre-fill the edit input with the current text
}

const cancelEdit = () => {
  // Reset both values to "nothing is being edited" state
  editId.value = null
  editBuffer.value = ''
}

const finishEdit = (task) => {
  // Guard clause: if this isn't the task being edited, do nothing
  // (e.g. @blur might fire on the wrong task)
  if (editId.value !== task.id) return

  const trimmed = editBuffer.value.trim()

  if (!trimmed) {
    removeTask(task.id)  // if the user cleared the text, delete the task entirely
  } else {
    // Tasks inside tasks.value are reactive objects, so directly
    // mutating a property like task.text will trigger a UI update
    task.text = trimmed
  }

  cancelEdit()  // exit edit mode regardless
}

const toggleFavourite = (task) => {
  // Toggle between true/false using the ! (NOT) operator
  task.favourite = !task.favourite
}

const search = ref('')                // holds the search input text
const activeFilter = ref('All')       // which filter button is currently selected
const filters = ref(['All', 'Completed', 'Incomplete', 'Favourites'])  // filter options

// computed() recalculates filteredTasks automatically whenever
// tasks, search, or activeFilter change — no manual refresh needed
const filteredTasks = computed(() => {
  return tasks.value
    // First, filter by search text (case-insensitive)
    .filter((t) => t.text.toLowerCase().includes(search.value.toLowerCase()))
    // Then, filter by the active filter button
    .filter((t) => {
      if (activeFilter.value === 'Completed')  return t.completed
      if (activeFilter.value === 'Incomplete') return !t.completed
      if (activeFilter.value === 'Favourites') return t.favourite
      return true  // 'All' — keep every task
    })
})

// watch() listens for changes to `tasks` and runs the callback when it changes.
// { deep: true } is required here because tasks is an array of objects —
// without it, Vue only detects if the array reference changes, not changes
// to properties inside each object (like task.completed or task.text)
watch(
  tasks,
  () => {
    // Persist tasks to localStorage so they survive page refreshes
    // JSON.stringify converts the array to a string, since localStorage only stores strings
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  },
  { deep: true }
)

// onMounted runs once, right after the component appears on the page.
// We use it to load saved tasks from localStorage on startup.
onMounted(() => {
  const saved = localStorage.getItem('tasks')
  if (saved) {
    // JSON.parse converts the string back into a JavaScript array
    tasks.value = JSON.parse(saved)
  }
})
</script>

<template>
  <div class="wrapper">
    <h1>ToDo App</h1>

    <!-- Input row for adding a new task -->
    <div class="input-row">
      <!-- v-model creates a two-way binding: input updates newTask, and newTask updates the input -->
      <!-- @keyup.enter calls addTask when the user presses Enter -->
      <input type="text" placeholder="Type new task here..." v-model="newTask" @keyup.enter="addTask" />
      <button @click="addTask" class="addBtn">Add</button>
    </div>

    <!-- Search and filter row -->
    <div class="search-row">
      <input type="text" placeholder="Search anything..." v-model="search" />

      <div class="filterBtns">
        <!-- v-for renders one button per item in the filters array -->
        <!-- :key helps Vue track each element efficiently when the list updates -->
        <!-- :class conditionally adds the "active" CSS class when this filter is selected -->
        <button
          @click="activeFilter = f"
          v-for="f in filters"
          :key="f"
          :class="{ active: activeFilter === f }"
          class="filterBtn"
        >{{ f }}</button>
      </div>
    </div>

    <div class="task-list">
      <ul>
        <!-- v-for renders one <li> per task in the filtered+searched list -->
        <!-- :class adds "done" styling if completed, and "editing" if this task is being edited -->
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          :class="{ done: task.completed, editing: editId === task.id }"
        >

          <!-- v-if / v-else: show edit mode UI or normal UI depending on whether this task is being edited -->
          <template v-if="editId === task.id">
            <!-- Edit mode: shows a text input pre-filled with the task text -->
            <!-- :ref with a function auto-focuses the input when it appears -->
            <!-- @blur fires when the user clicks outside the input, finishing the edit -->
            <input
              type="text"
              v-model="editBuffer"
              :ref="(el) => el && el.focus()"
              style="width:87%;"
              @keyup.enter="finishEdit(task)"
              @keydown.esc="cancelEdit"
              @blur="finishEdit(task)"
            />
            <!-- Checkmark icon to confirm the edit -->
            <svg @click="finishEdit(task)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon icon-done">
              <title>Finish Edit</title>
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </template>

          <!-- Normal (non-edit) mode -->
          <template v-else>
            <!-- v-if / v-else: show outline star if not favourite, filled star if favourite -->
            <svg v-if="!task.favourite" @click="toggleFavourite(task)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon icon-fav">
              <title>Add to Favorite</title>
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <svg v-else @click="toggleFavourite(task)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon icon-fav">
              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
            </svg>

            <!-- v-model on checkbox two-way binds to task.completed,
                 so checking/unchecking it instantly updates the task -->
            <!-- :id and :for link the checkbox to its label, so clicking the label also toggles it -->
            <input type="checkbox" v-model="task.completed" :id="task.id" />
            <label :for="task.id">{{ task.text }}</label>

            <!-- Edit icon — clicking it enters edit mode for this task -->
            <svg @click="startEdit(task)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon icon-edit">
              <title>Edit</title>
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>

            <!-- Delete button — passes this task's id to removeTask -->
            <button @click="removeTask(task.id)" class="delBtn" title="Delete">X</button>
          </template>

        </li>
      </ul>

      <!-- v-if on the paragraph: only show "No new tasks" when the tasks array is empty -->
      <p v-if="!tasks.length" style="margin-top: 2rem; font-family: 'Playpen Sans', cursive;">No new tasks.</p>
    </div>
  </div>
</template>

<!-- "scoped" means these CSS styles only apply to this component, not globally -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Playpen+Sans:wght@100..800&display=swap');

*{
  font-family: "Figtree", sans-serif;
  font-size: 1rem;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.wrapper {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px 10px;
  background-color: beige;
  text-align: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

h1{
  font-size: 2rem;
  font-weight: 700;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
}

input:focus {
  outline: 2px solid #ffda53;
}

.addBtn {
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #303030;
  color: #ccc;
}

.addBtn:active{
  outline: 2px solid #ffda53;
  box-shadow: 0 2px #666; /* Shrink shadow */
  transform: translateY(2px); /* Move down */
}

.search-row {
  display: flex;
  flex-direction: column;
}

.filterBtns {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.filterBtn {
  cursor: pointer;
  padding: 0.2rem 1rem;
  font-size: 0.8rem;
  border-radius: 2rem;
  border: 1px solid #ccc;
  outline: none;
}

.filterBtn.active {
  background-color: #303030;
  color: #ccc;
}

.task-list {
  align-items: center;
}

ul {
  margin-top: 2rem;
}

ul>li {
  list-style-type: none;
  text-align: left;
  margin-right: 2rem;
  margin-bottom: 1rem;  
  border-bottom: 1px solid #ccc;
}

input[type="checkbox"] {
  margin-right: 8px;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}

input[type="checkbox"]:checked {
  accent-color: green;
}

label {
  cursor: pointer;
  margin-right: 2rem;
  vertical-align: middle;
  font-family: "Playpen Sans", cursive;
  font-weight: 400;
  color: #303030;
}

.done {
  text-decoration: line-through;
  color: #666;
}

.delBtn {
  float: right;
  margin-right: 1rem;
  background-color: transparent;
  outline: none;
  border: none;
  color: #d70020;
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
}

.delBtn:hover {
  color: #ff687f;
  transition: 1s;
}

.icon{
  width: 18px;
  height: 18px;
  vertical-align: middle;
  cursor: pointer;
}

.icon-edit {
  color: #0400d6c3;
}

.icon-done {
  color: green;
  margin-left: 1rem;
}

.icon-fav {
  color: orange;
  margin: auto 1rem;
  width: 22px;
  height: 22px;
}
</style>
