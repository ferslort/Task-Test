import React, { useEffect } from "react";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "../../actions/taskActions";

const ListTask = () => {
  const dispatch = useDispatch();
  const getTaskAll = () => dispatch(getTask());
  const filterTask = useSelector((state) => state.task.filter);

  useEffect(() => {
    getTaskAll();
    // eslint-disable-next-line
  }, []);

  const listTask = useSelector((state) => state.task.tasks);

  let arrayTask = listTask;
  if (filterTask === "recent") {
    arrayTask = listTask.sort(
      (a, b) => parseFloat(b.createAt) - parseFloat(a.createAt)
    );
  } else if (filterTask === "status") {
    arrayTask = listTask.sort(function (x, y) {
      const a = x.status.toUpperCase(),
        b = y.status.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
  } else {
    arrayTask = listTask.sort(function (a, b) {
      if (a.date < b.date) return -1;
    });
  }

  return (
    <div>
      <h2 className="title">
        {arrayTask.length ? "Tus Tareas" : "Aun no tienes Tareas"}
      </h2>
      <div className="container-listTask">
        {arrayTask.map((item, index) => (
          <Task key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListTask;
