import "./index.css"
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { TodosContext } from "./contexts/TodosContext";
import { useEffect, useState } from "react"
import { InitialTodos} from "./data/initialTodos"

const theme = createTheme({
  typography: {
    fontFamily: [
      "Rubik"
    ]
  },
  palette: {
    primary: {
      main: "#2C687B", //093C5D 72BAA9
      // dark: "#3454FA"
      contrastText: "#FFF"
    },
    secondary: {
      main: "#8CC7C4", //3B7597  934761
      contrastText: "#333"
    },
    success: {
      main: "#67C090"
    },
    warning: {
      main: "#6E1A37"
    },
    info: {
      main: "#D5E7B5"
    }
  }
})

export default function App() {
  // const [allTodos, setTodos] = useState(() => {
  // const val = localStorage.getItem("todos");
  // if (val) {
  // return JSON.parse(val); // Parse string back to array
  // }
  // return InitialTodos; // Fallback to default
  // });

  const [allTodos, setTodos] = useState(() => {
      const saved = localStorage.getItem("todos");

      if(saved)
      {
        try {
          return JSON.parse(saved)
        } catch(error)
        {
          console.error("Failed to parse todos from local storage", error);
          return InitialTodos;
        }
      }

      return InitialTodos;
  });

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
