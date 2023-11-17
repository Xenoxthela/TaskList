import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Task = {
    title: string;
    id: number;
};
export type TasksState = {
    taskList: Task[];
};
const initialState: TasksState = {
    taskList: [],
};
export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state: TasksState, action: PayloadAction<Task>) => {
            state.taskList.push(action.payload);
        },
        deleteTask: (state: TasksState, action: PayloadAction<number>) => {
            const idToDelete = action.payload;
            state.taskList = state.taskList.filter((task) =>
                task.id !== idToDelete);
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const { id, title } = action.payload;
            const taskToEdit = state.taskList.find((task) =>
                task.id === id);
            if (taskToEdit) {
                taskToEdit.title = title;
            }
        },
    },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;