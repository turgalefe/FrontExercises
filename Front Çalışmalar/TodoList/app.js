const apiUrl = "http://localhost:5177/api/tasks"; // Updated API URL to match the provided port

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Fetch and display tasks
async function fetchTasks() {
  try {
    const response = await axios.get(apiUrl);
    taskList.innerHTML = ""; // Clear the list
    response.data.forEach(task => addTaskToList(task));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Add a new task
addTaskButton.addEventListener("click", async () => {
  const task = taskInput.value.trim();
  if (!task) return alert("Please enter a task.");

  try {
    const response = await axios.post(apiUrl, { name: task, isCompleted: false });
    addTaskToList(response.data);
    taskInput.value = ""; // Clear input
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

// Add task to the DOM
function addTaskToList(task) {
  const li = document.createElement("li");
  li.className = `task ${task.isCompleted ? "completed" : ""}`;
  li.innerHTML = `
    ${task.name}
    <div>
      <button onclick="toggleTask(${task.id}, ${task.isCompleted})">${task.isCompleted ? "<i class='fas fa-undo'></i>" : "<i class='fas fa-check'></i>"}</button>
      <button onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
    </div>
  `;
  taskList.appendChild(li);
}

// Toggle task completion
async function toggleTask(id, isCompleted) {
  try {
    await axios.put(`${apiUrl}/${id}`, { isCompleted: !isCompleted });
    fetchTasks();
  } catch (error) {
    console.error("Error toggling task:", error);
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Load tasks on page load
fetchTasks();
