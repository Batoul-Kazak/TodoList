import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export default function DeleteDialog({
    todo, isClearAll = false,
    showDeleteDialog, setShowDeleteDialog,
    alertTitle, alertDetails }) {

    const { setTodos } = useContext(TodosContext);

    function handleClose() {
        setShowDeleteDialog(false);
    }

    function handleDelete() {
        if (isClearAll) {
            setTodos([]);
            localStorage.setItem("todos", JSON.stringify([]));
        } else if (todo?.id) {
            setTodos(prevTodos => {
                const updatedTodos = prevTodos.filter(t => t.id !== todo.id);
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
                return updatedTodos;
            });
        }
        setShowDeleteDialog(false);
    }

    // function handleClearAll() {
    //     setTodos([]);
    //     // localStorage.setItem("todos", todos);
    //     setShowDeleteDialog(false);
    // }

    return <Dialog
        dir='ltr'
        open={showDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {alertTitle}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {alertDetails}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button autoFocus color="error" variant="contained" autoFocus onClick={handleDelete}>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
}