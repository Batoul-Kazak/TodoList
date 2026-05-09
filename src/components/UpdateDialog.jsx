import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField"
import { TodosContext } from '../contexts/todosContext';

import { useState, useContext, useEffect } from "react"

export default function UpdateDialog({ todo, showUpdateDialog, setShowUpdateDialog }) {
    const { todos, setTodos } = useContext(TodosContext)
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    function handleCloseDialog() {
        setTitle("");
        setDetails("");
        setShowUpdateDialog(false);
    }

    function handleUpdateTodo() {
        setTodos((todos) => todos.map(t => t.id === todo.id ? { ...t, title, details } : t));

        setTitle(todo.title);
        setDetails(todo.details);
        setShowUpdateDialog(false);

        localStorage.setItem("todos", JSON.stringify(
            todos.map(t => t.id === todo.id ? { ...t, title, details } : t)
        ));

        handleCloseDialog();
    }

    useEffect(() => {
        if (showUpdateDialog && todo) {
            setTitle(todo.title || "");
            setDetails(todo.details || "");
        }
    }, [todo, showUpdateDialog]);

    return <Dialog
        dir='ltr'
        open={showUpdateDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">

        </DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Task Title"
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                label="Details"
                fullWidth
                variant="standard"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button autoFocus onClick={() => handleUpdateTodo(todo.id)}>
                Yes
            </Button>
        </DialogActions>
    </Dialog>
}