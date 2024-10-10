import { populate, toggleDisplayForm } from "./display";
import { filterAll } from "./index";
import Updates from "./subscribe";

function setList(list) {
  let lists = Updates.getLists();
  if (lists) {
    lists.push(list);
    lists.forEach((e) => {
      let b = JSON.parse(localStorage.getItem(e));
      if (!Array.isArray(b)) {
        localStorage.setItem(`${e}`, JSON.stringify([]));
      }
    });
    localStorage.setItem("lists", JSON.stringify(lists));
  } else {
    let lists = [];
    lists.push(list);
    localStorage.setItem("lists", JSON.stringify(lists));
  }
}

function setTask(task, parentName) {
  let list = JSON.parse(localStorage.getItem(parentName));
  if (list) {
    list.push(task);
    localStorage.setItem(parentName, JSON.stringify(list));
  } else {
    localStorage.setItem(`${parentName}`, JSON.stringify([task]));
  }
}

const listForm = document.getElementById("formList");

const taskForm = document.getElementById("formTask");

const updateForm = document.getElementById("formUpdate");

function addTaskForm(parentName, filter) {
  taskForm.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const taskData = new FormData(taskForm);
      const taskFormatted = Object.fromEntries(taskData);
      taskFormatted.completed = "false";
      setTask(taskFormatted, parentName);
      toggleDisplayForm(document.getElementById("taskForm"));
      populate(filter);
    },
    { once: true }
  );
}
function updateTask(parent, filter, index) {
  updateForm.addEventListener(
    "submit",
    (e) => {
      let list = JSON.parse(localStorage.getItem(parent));
      e.preventDefault();
      let updatedDate = new FormData(updateForm);
      let newData = Object.fromEntries(updatedDate);
      list[index] = newData;
      newData.completed = "false";
      console.log(list);
      localStorage.setItem(parent, JSON.stringify(list));
      toggleDisplayForm(document.getElementById("updateTask"));
      populate(filter);
    },
    { once: true }
  );
}

function updateList(parent, child, filter) {
  let list = JSON.parse(localStorage.getItem(parent));
  let index = list.findIndex((c) => {
    return c.taskName === child.taskName && c.date === child.date;
  });
  list[index] = child;
  localStorage.setItem(parent, JSON.stringify(list));
  populate(filter);
}

function deleteTask(parent, child, filter) {
  let list = JSON.parse(localStorage.getItem(parent));
  let index = list.findIndex((c) => {
    return c.taskName === child.taskName && c.date === child.date;
  });
  console.log(list.splice(index, 1));
  localStorage.setItem(parent, JSON.stringify(list));
  populate(filter);
}

function initListForm() {
  listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listData = new FormData(listForm);
    const listFormatted = Object.fromEntries(listData);
    let name = listFormatted.listName;
    setList(name);
    toggleDisplayForm(document.getElementById("listForm"));
    populate(filterAll);
  });
}

export {
  setList,
  setTask,
  initListForm,
  addTaskForm,
  updateList,
  deleteTask,
  updateTask,
};
