import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { releasedTask, filterTask } from "../../actions/taskActions";
import { notification } from "antd";
import { FilterFilled } from "@ant-design/icons";

import "./content.scss";

const Filter = () => {
  const dispatch = useDispatch();
  const taskReleased = (taskSelect) => dispatch(releasedTask(taskSelect));
  const taskFilter = (filter) => dispatch(filterTask(filter));;

  const taskSelect = useSelector((state) => state.task.taskSelect);

  const [filter, setFilter] = useState('recent');

    useEffect(() => {
      if(filter){
        taskFilter(filter);
      }
      // eslint-disable-next-line
    }, [filter])

  const editTask = () => {
    if (taskSelect.length < 1) {
      notification["error"]({
        message: "Debes Selecionar al menos una tarea.",
      });
      return;
    }
    taskReleased(taskSelect);
  };

  const { Option } = Select;
  return (
    <div className="container-filter">
      <div className="container-filter__released">
        <Button type="dashed" size="large" onClick={editTask}>
          {taskSelect.length > 1 ? "Liberar Seleccionadas" : "Liberar"}
        </Button>
      </div>
      <div className="container-filter__btn">
          <FilterFilled style={{ fontSize: "25px"}} />
          <Select
            defaultValue="recent"
            placeholder="Ordernar"
            onChange={(e) => setFilter(e)}
          >
            <Option value="recent">Por Creación</Option>
            <Option value="old">Por Antiguedad</Option>
            <Option value="status">Por Estado</Option>
          </Select>
      </div>
    </div>
  );
};

export default Filter;
