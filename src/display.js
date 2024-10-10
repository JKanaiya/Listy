import Updates from "./subscribe";
import { addTaskForm, deleteTask, updateList, updateTask } from "./publish";

let container = document.getElementById("container");
let navbar = document.getElementById("navbar");
function displayDetails(a) {
  a.style.display = "flex";
}
function hideDetails(a) {
  a.style.display = "none";
}
function addDOM(parent, child) {
  parent.appendChild(child);
}
function toggleBlur(target) {
  target.classList.toggle("blur");
}
function toggleDisplayForm(a) {
  if (a.style.display == "flex") {
    hideDetails(a);
    toggleBlur(container);
    toggleBlur(navbar);
  } else {
    displayDetails(a);
    toggleBlur(container);
    toggleBlur(navbar);
  }
}
function populate(filter) {
  container.innerHTML = "";
  let lists = Updates.getLists();
  lists.forEach((name) => {
    let listDiv = document.createElement("div");
    listDiv.classList.add("list");
    let b = document.createElement("div");
    b.classList.add("title");
    addDOM(listDiv, b);
    let title = document.createElement("h2");
    title.textContent = name;
    addDOM(b, title);
    let c = document.createElement("div");
    c.classList.add("add");
    addDOM(b, c);
    let label = document.createElement("h3");
    label.textContent = "Add Task";
    addDOM(c, label);
    let span = document.createElement("span");
    span.innerHTML = `<ion-icon name="add-outline"></ion-icon>`;
    span.classList.add("sButton");
    let rName = name;
    span.addEventListener("click", () => {
      addTaskForm(rName, filter);
      toggleDisplayForm(document.getElementById("taskForm"));
    });
    addDOM(c, span);
    addDOM(container, listDiv);

    name = JSON.parse(localStorage.getItem(name));

    if (name !== null) {
      let filtered = name.filter(filter);
      if (filtered) {
        filtered.forEach((e) => {
          const task = document.createElement("div");
          const summ = document.createElement("div");
          const det = document.createElement("div");
          addDOM(task, summ);
          let checkBox = document.createElement("input");
          checkBox.setAttribute("type", "checkbox");

          checkBox.addEventListener("click", (event) => {
            event.stopPropagation();
            e.completed === "true"
              ? (e.completed = "false")
              : (e.completed = "true");
            updateList(rName, e, filter);
          });

          addDOM(summ, checkBox);
          let header = document.createElement("h2");
          header.innerHTML = e.taskName;
          addDOM(summ, header);
          const dueDate = document.createElement("h2");
          dueDate.innerHTML = e.date;
          addDOM(summ, dueDate);

          let expandButton = document.createElement("div");
          expandButton.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
          addDOM(summ, expandButton);

          if (e.priority === "High") {
            task.style.borderColor = "red";
          } else if (e.priority === "Mid") {
            task.style.borderColor = "#d88373";
          } else if (e.priority === "Low") {
            task.style.borderColor = "blue";
          }
          const description = document.createElement("h2");
          description.innerHTML = e.taskDescription;

          addDOM(det, description);
          let displayed = false;
          summ.addEventListener("click", () => {
            displayed == false ? (displayed = true) : (displayed = false);
            if (displayed == true) hideDetails(det);
            else displayDetails(det);
          });
          addDOM(det, description);

          const buttons = document.createElement("div");
          const deleteButton = document.createElement("button");
          deleteButton.addEventListener("click", () => {
            console.log(rName);
            deleteTask(rName, e, filter);
          });
          deleteButton.innerText = "Delete";
          const updateButton = document.createElement("button");
          updateButton.innerText = "Update";
          updateButton.addEventListener("click", () => {
            let list = JSON.parse(localStorage.getItem(rName));
            let index = list.findIndex((c) => {
              return c.taskName === e.taskName && c.date === e.date;
            });

            let uName = document.getElementById("updateTName");
            uName.value = e.taskName;

            let uTaskDescription = document.getElementById("uTaskDescription");
            uTaskDescription.value = e.taskDescription;

            let uDate = document.getElementById("uDate");
            uDate.value = e.date;

            updateTask(rName, filter, index);
            toggleDisplayForm(document.getElementById("updateTask"));
          });
          addDOM(det, buttons);
          addDOM(buttons, deleteButton);
          addDOM(buttons, updateButton);
          addDOM(task, det);

          buttons.classList.add("buttons");
          task.classList.add("task");
          expandButton.classList.add("expandButton");
          summ.classList.add("summ");
          det.classList.add("det");
          listDiv.appendChild(task);
        });
      }
    }
  });
}
export {
  displayDetails,
  hideDetails,
  addDOM,
  toggleBlur,
  toggleDisplayForm,
  container,
  populate,
};
