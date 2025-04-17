import {createSlice} from '@reduxjs/toolkit';


const API_URL='http://localhost:5173/tasks';
const tasksSlice= createSlice({
    name:'tasks',
    initialState:{tasks:[]},
    reducers:{
        setTasks:(state,action)=>{
            state.tasks=action.payload;
        },
        addTask:(state,action)=>{
            state.tasks=push(action.payload);
        },
        updateTask:(state,action)=>{
            const index=state.tasks.findIndex(task=>task_id===action.payload._id);
            if(index!==-1){
                state.tasks[index]=action.payload;
            }
        },
        deleteTask:(state,action)=>{
            state.tasks=state.tasks.filter(task=>task._id!==action.payload);
        },
    },
});

export const{setTasks,addTask,updateTask,deleteTask} =tasksSlice.actions;
export default tasksSlice.reducer;