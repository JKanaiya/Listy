import "./styles.css";
import { isThisWeek, isToday, isTomorrow } from "date-fns";
import { toggleDisplayForm, populate } from "./display";
import { initListForm } from "./publish";

if (!JSON.parse(localStorage.getItem("lists"))) {
  let lists = [];
  lists.push("default");
  localStorage.setItem("lists", JSON.stringify(lists));
}
function filterAll(task) {
  return task.completed == "false";
}
if (JSON.parse(localStorage.getItem("lists"))) {
  populate(filterAll);
}

window.addEventListener("wheel", function (e) {
  let item = document.getElementById("container");
  if (e.deltaY > 0) item.scrollLeft += 100;
  else item.scrollLeft -= 100;
});

document.getElementById("incomplete").addEventListener("click", () => {
  function filterAll(task) {
    return task.completed == "false";
  }
  if (JSON.parse(localStorage.getItem("lists"))) {
    populate(filterAll);
  }
});

document.getElementById("today").addEventListener("click", () => {
  function filterToday(task) {
    return isToday(task.date) && task.completed === "false";
  }
  if (JSON.parse(localStorage.getItem("lists"))) {
    populate(filterToday);
  }
});

document.getElementById("tomorrow").addEventListener("click", () => {
  function filterTomorrow(task) {
    return isTomorrow(task.date) && task.completed === "false";
  }
  if (JSON.parse(localStorage.getItem("lists"))) {
    populate(filterTomorrow);
  }
});

document.getElementById("thisWeek").addEventListener("click", () => {
  function filterThisWeek(task) {
    return isThisWeek(task.date) && task.completed === "false";
  }
  if (JSON.parse(localStorage.getItem("lists"))) {
    populate(filterThisWeek);
  }
});

document.getElementById("completed").addEventListener("click", () => {
  function filterCompleted(task) {
    return task.completed == "true";
  }
  if (JSON.parse(localStorage.getItem("lists"))) {
    populate(filterCompleted);
  }
});

initListForm();
document
  .getElementById("addList")
  .addEventListener("click", () =>
    toggleDisplayForm(document.getElementById("listForm"))
  );
export { filterAll };
