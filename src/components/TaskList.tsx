import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { addTask, deleteTask, editTask } from "../redux/taskSlice";
import '../tailwind.css';

function TaskList() {
    const tasks = useAppSelector((state) => state.tasks.taskList);
    const dispatch = useAppDispatch();
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const handleAddTask = () => {
        dispatch(addTask({ id: Date.now(), title: newTaskTitle }));
        setNewTaskTitle("");
    };
    const handleEditTask = (taskId: number, title: string | null) => {
        if (title) {
            dispatch(editTask({ id: taskId, title }));
        }
    };
    const handleDeleteTask = (taskId: number) => {
        dispatch(deleteTask(taskId));
    }
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Aufgaben</h1>
            <ul className="list-group mb-4">
                {tasks.map(({ id, title }) => (
                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                        {title}
                        <div>
                            <button className="btn btn-primary me-2" onClick={() =>
                                handleEditTask(id, prompt("Neuer Text", title))
                            }>Bearbeiten</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteTask(id)}>
                                Löschen
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Neue Aufgabe hinzufügen"
                />
                <button className="btn btn-success" onClick={handleAddTask}>Hinzufügen</button>
            </div>
        </div>
    );

}
export default TaskList;