import {
  CREATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  EDIT_TASK,
  TASK_SELECT,
  RELEASED_TASK,
  FILTER_TASK,
} from "../types";

const initialState = {
  tasks: [],
  taskSelect: [],
  filter: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? (task = action.payload) : task
        ),
      };
    case TASK_SELECT:
      return {
        ...state,
        taskSelect: [...state.taskSelect, action.payload],
      };
    case RELEASED_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? (task = action.payload) : task
        ),
        filter: "recent",
      };
    case FILTER_TASK:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
