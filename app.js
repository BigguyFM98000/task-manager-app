const url = "http://localhost:3001/tasks";
const displayResults = document.querySelector(".details");
// const myForm = document.getElementById("myform");
const addTask = document.getElementById("btn");
let output = "";
const titleValue = document.getElementById("title");
const descriptionValue = document.getElementById("description");
const statusValue = document.getElementById("status");
const priorityValue = document.getElementById("priority");
const btnSubmit = document.getElementById("btn-edit");

async function getTasks() {
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		data.data.forEach((element) => {
			output += `
                    <div data-id="${element._id}">
		            <div class="card">
						<label for="title">Title:</label>
						<span id="title">${element.title}</span>
					</div>

					<div class="card">
						<label for="description">Description:</label>
						<span id="description">${element.description}</span>
					</div>
					<div class="card">
						<label for="status">Status:</label>
						<span id="status">${element.status}</span>
					</div>
					<div class="card">
						<label for="priority">Priority:</label>
						<span id="priority">${element.priority}</span>
					</div>
                    <button id="edit-task">Edit</button><button id="delete-task">Delete</button>
                    </div>
		    `;
			displayResults.innerHTML = output;
		});
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}
getTasks();

addTask.addEventListener("click", async function (event) {
	event.preventDefault();
	const title = document.querySelector("#title").value;
	const description = document.querySelector("#description").value;
	const status = document.querySelector("#status").value;
	const priority = document.querySelector("#priority").value;

	const dataBody = {
		title,
		description,
		status,
		priority,
	};
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataBody),
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(`Error: ${error}`);
	}
});

let currentEditId = null;
displayResults.addEventListener("click", async function (event) {
	event.preventDefault();
	let editBtnPressed = event.target.id == "edit-task";
	let deleteBtnPressed = event.target.id == "delete-task";
	let id = event.target.parentElement.dataset.id;
	currentEditId = id;

	if (deleteBtnPressed) {
		fetch(`${url}/${id}`, { method: "DELETE" })
			.then((res) => res.json())
			.then(() => location.reload())
			.catch((error) => console.log(`Error: ${error}`));
	}

	if (editBtnPressed) {
		let parent = event.target.parentElement;
		const titleContent = parent.querySelector("#title").textContent;
		const descriptionContent = parent.querySelector("#description").textContent;
		const statusContent = parent.querySelector("#status").textContent;
		const priorityContent = parent.querySelector("#priority").textContent;

		titleValue.value = titleContent;
		descriptionValue.value = descriptionContent;
		statusValue.value = statusContent;
		priorityValue.value = priorityContent;
	}
});

btnSubmit.addEventListener("click", function (event) {
	event.preventDefault();
	fetch(`${url}/${currentEditId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title: titleValue.value,
			description: descriptionValue.value,
			status: statusValue.value,
			priority: priorityValue.value,
		}),
	})
		.then((res) => res.json())
		.then(() => {
			location.reload();
		})
		.catch((error) => console.log(`Error: ${error}`));

	titleValue.value = "";
	descriptionValue.value = "";
	statusValue.value = "";
	priorityValue.value = "";
});

// let currentEditId = null;

// displayResults.addEventListener("click", function (event) {
// 	event.preventDefault();

// 	let editBtnPressed = event.target.closest("#edit-task");
// 	let deleteBtnPressed = event.target.closest("#delete-task");
// 	let parent = event.target.closest("[data-id]");

// 	if (!parent) return;

// 	let id = parent.dataset.id;

// 	// DELETE
// 	if (deleteBtnPressed) {
// 		fetch(`${url}/${id}`, { method: "DELETE" })
// 			.then((res) => res.json())
// 			.then(() => location.reload())
// 			.catch((error) => console.log(`Error: ${error}`));
// 	}

// 	// EDIT
// 	if (editBtnPressed) {
// 		currentEditId = id;

// 		const titleContent = parent.querySelector("#title").textContent;
// 		const descriptionContent = parent.querySelector("#description").textContent;
// 		const statusContent = parent.querySelector("#status").textContent;
// 		const priorityContent = parent.querySelector("#priority").textContent;

// 		titleValue.value = titleContent;
// 		descriptionValue.value = descriptionContent;
// 		statusValue.value = statusContent;
// 		priorityValue.value = priorityContent;
// 	}
// });

// btnSubmit.addEventListener("click", function (event) {
// 	event.preventDefault();

// 	if (!currentEditId) return;

// 	fetch(`${url}/${currentEditId}`, {
// 		method: "PUT",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({
// 			title: titleValue.value,
// 			description: descriptionValue.value,
// 			status: statusValue.value,
// 			priority: priorityValue.value,
// 		}),
// 	})
// 		.then((res) => res.json())
// 		.then(() => location.reload())
// 		.catch((error) => console.log(`Error: ${error}`));
// });
