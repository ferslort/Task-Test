import React from "react";
import { Checkbox, DatePicker, notification } from "antd";
import moment from "moment";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { editTask, selectTask } from "../../actions/taskActions";
import { useDispatch } from "react-redux";

const Task = ({ item }) => {
  const dispatch = useDispatch();
  const taskEdit = (task) => dispatch(editTask(task));
  const taskSelect = (task, checked) => dispatch(selectTask(task, checked));

  const { name, date, status } = item;

  //editar fecha de la tarea seleccionada
  const editDate = async (task, e) => {
    if (e) {
      task.date = e;
      taskEdit(task);
    } else {
      notification["error"]({
        message: "Debes Seleccionar una fecha",
      });
    }
  };

  //editar status liberada de la tarea seleccionada
  const editStatus = (task, checked) => {
    taskSelect(task, checked);
  };

  let statusItem = date;
  if (status === "past") {
    statusItem = (
      <CloseCircleOutlined
        style={{ fontSize: "36px", color: "red", paddingLeft: "0.8rem" }}
      />
    );
  } else if (status === "released") {
    statusItem = (
      <CheckCircleOutlined
        style={{ fontSize: "36px", color: "#08c", paddingLeft: "0.8rem" }}
      />
    );
  } else if (status === "pending") {
    statusItem = (
      <ExclamationCircleOutlined
        style={{ fontSize: "36px", color: "orange", paddingLeft: "0.8rem" }}
      />
    );
  }

  return (
    <div className="container-task">
      <div className="container-task__title">
        <h3>{name}</h3>
      </div>
      <div className="container-task__detail">
        <div>
          {item.status !== "released" && (
            <Checkbox onChange={(e) => editStatus(item, e.target.checked)} />
          )}
        </div>
        <div className="container-piker">
          <DatePicker
            format={"YYYY-MM-DD"}
            defaultPickerValue={moment(date)}
            className="piker"
            onChange={(e) => editDate(item, moment(e._d).format("YYYY-MM-DD"))}
            placeholder={date}
          />
          {statusItem}
        </div>
      </div>
    </div>
  );
};

export default Task;
