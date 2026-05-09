import React, { useEffect, useState } from 'react'
import { Card, CardContent, Dialog, Grid, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from './UpdateDialog'
import FlagIcon from '@mui/icons-material/Flag';
import { PRIORITY_COLORS } from '../config/priorities';

export default function Todo({ todo, setTodos, todoIdToDelete, setTodoIdToDelete
}) {
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const priorityColor = PRIORITY_COLORS[todo.priority] || PRIORITY_COLORS["none"];
    

    // function handleCheckTodo() {
    // setTodos((prevTodo) => prevTodo.map(t => (t.id == todo.id) ? { ...t, isCompleted: !t.isCompleted } : t));
    // }

    function handleCheckTodo() {
        setTodos((prevTodos) => {
            return prevTodos.map((t) => {
                if (t.id === todo.id) {
                    return { ...t, isCompleted: !t.isCompleted };
                }
                return t;
            });
        });
    }

    return (
        <>
            <UpdateDialog todo={todo} showUpdateDialog={showUpdateDialog} setShowUpdateDialog={setShowUpdateDialog} />
            <Card className='todo-card' sx={{ minWidth: 275, bgcolor: "secondary.main", color: "white", marginTop: 1 }}>
                <CardContent >
                    <Grid container spacing={0} >
                        <Grid item xs={8} sx={{ width: "60%" }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "secondary.contrastText", display: "flex", alignItems: "center", mb: 1, textDecoration: todo.isCompleted ? "line-through" : "none" }}>
                                <FlagIcon style={{color: priorityColor,  marginRight: "6px", fontSize: "2rem"}} />
                                {todo.title}</Typography>
                            <Typography variant="h6" sx={{color: "secondary.contrastText", fontSize: "14px",  minWidth: "330px" }}>{todo.details}</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ width: "40%", display: "flex", justifyContent: "end", alignItems: "center", gap: "5px" }}>
                            <IconButton
                                className='icon-button'
                                style={{
                                    color: `${todo.isCompleted ? "white" : "#1769aa"}`,
                                    backgroundColor: `${todo.isCompleted ? "#1769aa" : "white"}`,
                                    border: "3px solid #1769aa"
                                }}
                                onClick={handleCheckTodo}
                            >
                                <CheckCircleIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                            <IconButton
                                className='icon-button'
                                style={{
                                    color: "darkgreen",
                                    backgroundColor: "white",
                                    border: "3px solid darkgreen"
                                }}
                                onClick={() => setShowUpdateDialog(true)}
                            >
                                <ModeEditOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                            <IconButton
                                className='icon-button'
                                style={{
                                    color: "#b23c17",
                                    backgroundColor: "white",
                                    border: "3px solid #b23c17"
                                }}
                                onClick={() => setTodoIdToDelete(todo.id)}
                            >
                                <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </>
    );
}
