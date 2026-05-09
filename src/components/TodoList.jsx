import { Box, Card, CardActions, CardContent, Container, Divider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState, useContext, useEffect } from 'react';
import Todo from './Todo';
// import { Grid } from "@mui/material/Unstable_Grid2"
import { Grid } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { TodosContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import DeleteDialog from './DeleteDialog';
import UpdateDialog from './UpdateDialog';

export default function TodoList() {
    const { todos, setTodos } = useContext(TodosContext);
    const [todoIdToDelete, setTodoIdToDelete] = useState(null);
    const [filterType, setFilterType] = useState("all");
    // const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    let FilteredTodos = todos;
    if (filterType == "all") FilteredTodos = todos;
    else if (filterType == "completed") FilteredTodos = todos.filter(t => t.isCompleted == true);
    else if (filterType == "not-completed") FilteredTodos = todos.filter(t => !t.isCompleted)
    const todos_ = todos || [];
    const [title, setTitle] = useState("");

    function handleAddClick() {
        if (!title) {
            alert("Add task title first");
            return;
        }

        const newTodo = { id: uuidv4(), title: title, details: "", isCompleted: false };

        setTodos([...todos_, newTodo]);
        setTitle("");
    }

    function handleClearAllTodos() {
        setTodoIdToDelete("CLEAR_ALL");
    }

    function changeFilterType(e) {
        setFilterType(e.target.value);
    }

    useEffect(() => {
        if (todos) {
            const storedTodos = localStorage.setItem("todos", JSON.stringify(todos)); //JSON is a library in js
            // setTodos(storedTodos);
        }
    }, [todos]);

    return (
        <>
            <DeleteDialog
                isClearAll={todoIdToDelete === "CLEAR_ALL"}
                todo={todoIdToDelete === "CLEAR_ALL" ? null : todos.find(t => t.id === todoIdToDelete)}
                showDeleteDialog={todoIdToDelete !== null}
                setShowDeleteDialog={(show) => {
                    setTodoIdToDelete(show ? todoIdToDelete : null);
                }}
                alertTitle={todoIdToDelete === "CLEAR_ALL"
                    ? "Delete all tasks?"
                    : "Delete this task?"}
                alertDetails={todoIdToDelete === "CLEAR_ALL"
                    ? "This will permanently delete ALL your tasks. This cannot be undone."
                    : "Confirming with 'Yes' will permanently delete this task, and it cannot be recovered."}
            />
            <Container maxWidth="sm"  >
                {/* <DeleteDialog
                todo={null}
                isClearAll={true}
                alertTitle="هل تريد حذف كل المهمّات؟"
                alertDetails="تأكيدك بالحذف يؤدي الى حذف جميع المهمات بشكل نهائي"
                todoIdToDelete={todoIdToDelete}
                setTodoIdToDelete={setTodoIdToDelete}
            /> */}

                <Card sx={{ minWidth: 275, maxHeight: "90vh", borderRadius: "15px" }} >
                    <CardContent sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0" }}>
                        <Typography variant="h3" sx={{ textAlign: "center", backgroundColor: "primary.main", width: "100%", padding: "35px 0 10px" }} >My Tasks</Typography>
                        <Divider sx={{ width: "100%" }} />
                        <Box sx={{ display: "flex", gap: "20px", alignItems: "center", marginTop: "15px" }}>
                            <Button sx={{ backgroundColor: "primary.main", color: "warning.main", fontWeight: "bold" }} onClick={handleClearAllTodos}>Clear ALL</Button>
                            <ToggleButtonGroup
                                style={{ direction: "ltr" }}
                                value={filterType}
                                exclusive
                                onChange={changeFilterType}
                                color='primary'
                            >
                                <ToggleButton value="not-completed"
                                // sx={{ backgroundColor: `${filterType === "not-completed" ? "blue" : "white"}`, color: `${filterType == "not-completed" ? "white" : "black"}` }}
                                >
                                    Not Completed
                                </ToggleButton>
                                <ToggleButton value="completed"
                                // sx={{ backgroundColor: `${filterType === "completed" ? "blue" : "white"}`, color: `${filterType == "completed" ? "white" : "black"}` }}
                                >
                                    Completed
                                </ToggleButton>
                                <ToggleButton
                                    value="all"
                                // sx={{ backgroundColor: `${filterType === "all" ? "blue" : "white"}`, color: `${filterType == "all" ? "white" : "black"}` }}
                                >
                                    All
                                </ToggleButton>
                                {/* <Button onClick={handleClearAllTodos}>Clear All</Button> */}
                            </ToggleButtonGroup>
                        </Box>
                        <Box sx={{ padding: "0 15px", width: "100%" }}>
                            <Box sx={(theme) => ({
                                width: "100%",
                                maxHeight: "45vh",
                                overflow: "auto",
                                "&::-webkit-scrollbar-thumb": {
                                    background: theme.palette.primary.main,
                                    borderRadius: "4px",
                                    "&:hover": { background: theme.palette.primary.dark }
                                },
                                scrollbarColor: `${theme.palette.primary.main} transparent`,
                            })}>
                                {FilteredTodos.length ? FilteredTodos.map(todo => <Todo key={todo.id}
                                    todo={todo} setTodos={setTodos}
                                    todoIdToDelete={todoIdToDelete}
                                    setTodoIdToDelete={setTodoIdToDelete}
                                />) :
                                    <Typography variant='h6' sx={{ fontSize: "15px", color: "warning.main", textAlign: "center", padding: "30px 0 0px", textDecoration: "underline" }}>There is no tasks to display</Typography>
                                }
                            </Box>
                            <Grid container style={{ marginTop: "20px", width: "100%" }}>
                                <Grid
                                    xs={8}
                                    display="flex"
                                    justifyContent="space-around"
                                    alignItems="center" style={{ width: "70%" }}>
                                    <TextField variant="outlined" label="Task Title" style={{ width: "95%" }} value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Grid>
                                <Grid
                                    xs={4}
                                    display="flex"
                                    justifyContent="space-around"
                                    alignItems="center" style={{ width: "30%" }}>
                                    <Button variant='contained' style={{ height: "100%", width: "100%", fontWeight: "bold" }}
                                        onClick={handleAddClick}
                                        disabled={title.length > 20}
                                    >ADD Task</Button>
                                </Grid>

                            </Grid>

                        </Box>
                    </CardContent>
                    {/* <CardActions> */}
                    {/* <Button size="small">Learn More</Button> */}
                    {/* </CardActions> */}
                </Card>
            </Container >
        </>
    )
}