import "./index.css"
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { TodosContext } from "./contexts/todosContext";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";


const theme = createTheme({
  typography: {
    fontFamily: [
      "Rubik"
    ]
  },
  palette: {
    primary: {
      main: "#72BAA9", //093C5D
      // dark: "#3454FA"
    },
    secondary: {
      main: "#934761" //3B7597 
    },
    success: {
      main: "#67C090"
    },
    warning: {
      main: "#6E1A37"
    },
    info: {
      main: "#D5E7B5"
    },
    // third color: #F8C463
  }
})

const InitialTodos = [
  {
    id: uuidv4(),
    title: "Read a book",
    details: "Finish 50 pages of 'Atomic Habits' by James Clear",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "Grocery shopping",
    details: "Buy vegetables, eggs, milk, and chicken for the week",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "Morning workout",
    details: "30-min jog + 15-min stretching routine",
    isCompleted: false
  },
];

export default function App() {
  // const [allTodos, setTodos] = useState(() => {
  // const val = localStorage.getItem("todos");
  // if (val) {
  // return JSON.parse(val); // Parse string back to array
  // }
  // return InitialTodos; // Fallback to default
  // });

  const [allTodos, setTodos] = useState(InitialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen w-screen flex justify-center items-center bg-[#111]" style={{ direction: "ltr" }}>
        <TodosContext.Provider value={{ todos: allTodos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}
