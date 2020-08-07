import React, { useState } from "react";
import { Button, Input, DatePicker } from "antd";
import moment from "moment";
import { addTask, getTask } from "../../actions/taskActions";

import { useDispatch } from "react-redux";

const FormTask = ({ setVisible }) => {
  const dispatch = useDispatch();
  const addNewTask = (task) => dispatch(addTask(task));
  const taskGet = () => dispatch(getTask());
  const [error, setError] = useState({});

  const [dataForm, setDataForm] = useState({
    name: "",
    date: "",
    createAt: moment().unix(),
    status: "pending",
  });

  const { name, date } = dataForm;

  const handleSubmit = async () => {
    //validar el form
    if (name.trim() === "") {
      setError({ name: "El nombre de la tarea es obligatorio." });
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (date === "") {
      setError({ date: "La fecha es obligatoria." });
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    //guardar datos
    addNewTask(dataForm);

    taskGet();
    //quitar el modal
    setVisible(false);

    //limpiar el form
    setDataForm({ ...dataForm, name: "" });
  };

  return (
    <div className="formTask">
      <div className="formTask-campo">
        <label htmlFor="name">Nombre de la Tareas:</label>
        <Input
          type="text"
          name="name"
          placeholder="Ejem: Aprobar la Prueba"
          onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          value={name}
        />
        {error.name && <h5 className="error">{error.name}</h5>}
      </div>
      <div className="formTask-campo">
        <label>Fecha:</label>
        <DatePicker
          format={"DD/MM/YYYY"}
          className="piker"
          onChange={(e) =>
            setDataForm({
              ...dataForm,
              date: moment(e._d).format("YYYY-MM-DD"),
            })
          }
          placeholder="Selecciona una Fecha"
        />
        {error.date && <h5 className="error">{error.date}</h5>}
      </div>

      <div className="formTask-footer">
        <Button type="danger" onClick={() => setVisible(false)}>
          Cancelar
        </Button>
        <Button type="primary" onClick={() => handleSubmit()}>
          Agregar
        </Button>
      </div>
    </div>
  );
};

export default FormTask;
