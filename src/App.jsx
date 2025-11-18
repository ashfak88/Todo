import React, { useReducer, useState } from "react";

// ---------------- Reducer ----------------
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "DELETE_TASK":
      return state.filter((_, i) => i !== action.payload);

    case "EDIT_TASK":
      return state.map((task, i) =>
        i === action.payload.index ? action.payload.updatedTask : task
      );

    default:
      return state;
  }
};

function App() {
  // Reducer State
  const [tasks, dispatch] = useReducer(todoReducer, []);

  // Input States
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // ---------------- Add Or Save Edit ----------------
  const handleAddTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      // Save Edited Task
      dispatch({
        type: "EDIT_TASK",
        payload: { index: editIndex, updatedTask: task },
      });
      setEditIndex(null);
    } else {
      // Add New Task
      dispatch({ type: "ADD_TASK", payload: task });
    }

    setTask("");
  };

  // ---------------- Delete ----------------
  const handleDeleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", payload: index });
  };

  // ---------------- Edit ----------------
  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div
          className="container-fluid"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h1 className="navbar-brand">
            <b>Todo List</b>
          </h1>
        </div>
      </nav>

      <div className="container mt-5">
        <input
          className="form-control mb-3"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />

        <button onClick={handleAddTask} className="btn btn-success">
          {editIndex !== null ? "Save" : "Add"}
        </button>

        <ul className="list-group mt-3">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {t}

              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditTask(index)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
