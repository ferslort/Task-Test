import {
  CREATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  EDIT_TASK,
  TASK_SELECT,
  TASK_DELETE_SELECT,
  RELEASED_TASK,
  FILTER_TASK,
} from "../types";
import axios from "axios";
import { notification } from "antd";
import moment from "moment";

////////////////////////////////Crear Tareas//////////////////////////////

export function addTask(task) {
  return async (dispatch) => {
    const date = moment(task.date).format("YYYY-MM-DD");
    const diff = moment().isSameOrBefore(date);

    if (!diff) {
      task.status = "past";
    }

    try {
      task.date = moment(task.date).format("YYYY-MM-DD");
      const url = "http://localhost:4000/task";
      const result = await axios.post(url, task);

      dispatch(createTaskSucess(result.data));
      //notificacion
      notification["success"]({
        message: "Tarea Agregada",
      });
    } catch (error) {
      //notificacion
      notification["error"]({
        message: "Hubo un error.",
      });
    }
  };
}

const createTaskSucess = (task) => ({
  type: CREATE_TASK_SUCCESS,
  payload: task,
});

////////////////////////////////obtener las tareas//////////////////////////////
export function getTask() {
  return async (dispatch) => {
    try {
      const url = "http://localhost:4000/task";
      const result = await axios(url);
      dispatch(getTaskSuccess(result.data));
    } catch (error) {
      //notificacion
      notification["error"]({
        message: "Hubo un error.",
      });
    }
  };
}

const getTaskSuccess = (task) => ({
  type: GET_TASK_SUCCESS,
  payload: task,
});

//////////////////////////////// Editar las tareas Fecha //////////////////////////////

export function editTask(task) {
  return async (dispatch) => {
    const now = await moment().unix();
    const date = await moment(task.date).unix();

    if (date < now) {
      task.status = "past";
    } else if (date >= now) {
      task.status = "pending";
    }
    if (task.status === "") {
      console.log("vacio");
    }
    task.date = moment(task.date).format("YYYY-MM-DD");
    const url = `http://localhost:4000/task/${task.id}`;
    await axios.patch(url, task);
    dispatch(idTaskSelect(task));

    //notificacion
    notification["success"]({
      message: "Tarea Actualizada",
    });
  };
}

const idTaskSelect = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

//////////////////////////////// Seleccionar tareas a liberar //////////////////////////////

export function selectTask(task, checked) {
  return async (dispatch) => {
    if (checked) {
      dispatch(selectTaskSelect(task));
    } else {
      dispatch(selectTaskDelete(task));
    }
  };
}

const selectTaskSelect = (task) => ({
  type: TASK_SELECT,
  payload: task,
});

const selectTaskDelete = (task) => ({
  type: TASK_DELETE_SELECT,
  payload: task,
});

//////////////////////////////// Liberar tareas seleccionada //////////////////////////////

export function releasedTask(taskSelect) {
  return async (dispatch) => {
    const newTask = [];

    await Promise.all(
      taskSelect.map((task) => {
        task.status = "released";
        const url = `http://localhost:4000/task/${task.id}`;
        axios.patch(url, task);
        newTask.push(task);
      })
    );
    dispatch(taskReleased(newTask));
    //notificacion
    notification["success"]({
      message: "Tarea Actualizada",
    });
  };
}

const taskReleased = (newTask) => ({
  type: RELEASED_TASK,
  payload: newTask,
});

//////////////////////////////// Filtrado de tareas //////////////////////////////

export function filterTask(filter) {
  return (dispatch) => {
    dispatch(taskFilter(filter));
  };
}

const taskFilter = (filter) => ({
  type: FILTER_TASK,
  payload: filter,
});
