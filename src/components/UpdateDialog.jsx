import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TodosContext } from "../contexts/todosContext";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FlagIcon from "@mui/icons-material/Flag";
import { PRIORITY_COLORS } from "../config/priorities";

import { useState, useContext, useEffect } from "react";
import { Typography } from "@mui/material";

export default function UpdateDialog({
  todo,
  showUpdateDialog,
  setShowUpdateDialog,
}) {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("none");

  function handleCloseDialog() {
    setTitle("");
    setDetails("");
    setPriority("none");
    setShowUpdateDialog(false);
  }

  function handleUpdateTodo() {
    setTodos((todos) =>
      todos.map((t) =>
        t.id === todo.id ? { ...t, title, details, priority } : t,
      ),
    );

    setTitle(todo.title);
    setDetails(todo.details);
    setShowUpdateDialog(false);
    setPriority(todo.priority);

    localStorage.setItem(
      "todos",
      JSON.stringify(
        todos.map((t) =>
          t.id === todo.id ? { ...t, title, details, priority } : t,
        ),
      ),
    );

    handleCloseDialog();
  }

  useEffect(() => {
    if (showUpdateDialog && todo) {
      setTitle(todo.title || "");
      setDetails(todo.details || "");
    }
  }, [todo, showUpdateDialog]);

  return (
    <Dialog
      dir="ltr"
      open={showUpdateDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
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

        <InputLabel id="priority">Priority</InputLabel>
        <Select
          id="priority"
          value={priority}
          label="Priority"
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem style={{display: "flex", gap: "15px", justifyContent: "space-between"}} value="low" selected>
            <Typography variant="h6" style={{fontSize: "15px"}}>Low</Typography>
            <FlagIcon style={{ color: PRIORITY_COLORS["low"] }} />
          </MenuItem>
          <MenuItem style={{display: "flex", gap: "15px", justifyContent: "space-between"}} value="medium">
            <Typography variant="h6" style={{fontSize: "15px"}}>Medium</Typography>
            <FlagIcon style={{ color: PRIORITY_COLORS["medium"] }} />
          </MenuItem>
          <MenuItem style={{display: "flex", gap: "15px", justifyContent: "space-between"}} value="high">
            <Typography variant="h6" style={{fontSize: "15px"}}>High</Typography>
            <FlagIcon style={{ color: PRIORITY_COLORS["high"] }} />
          </MenuItem>
          <MenuItem style={{display: "flex", gap: "15px", justifyContent: "space-between"}} value="urgent">
            <Typography variant="h6" style={{fontSize: "15px"}}>Urgent</Typography>
            <FlagIcon style={{ color: PRIORITY_COLORS["urgent"] }} />
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button autoFocus onClick={() => handleUpdateTodo(todo.id)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
