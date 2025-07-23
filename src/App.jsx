import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim().length < 3) return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((items) => items.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((items) => items.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="absolute top-16 w-full flex justify-center items-center min-h-screen 
      
      bg-gradient-to-tr from-blue-100 via-white to-blue-200 p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
            Todo List
          </h1>
          <div className="Adder flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={todo}
              onChange={handleInput}
              placeholder="Add your todo..."
              className="flex-1 px-4 py-3 rounded-lg border 
              border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all 
                text-blue-800 placeholder-gray-500"
            />
            <button
              disabled={todo.trim().length < 3}
              onClick={handleAdd}
              className={`px-6 py-3 rounded-lg font-semibold text-white 
                transition-all duration-300 shadow-md ${
                  todo.trim().length < 3
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              Save
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              id="show"
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
              className="w-5 h-5 accent-blue-600"
            />
            <label htmlFor="show" className="text-gray-700 font-medium">
              Show Finished
            </label>
          </div>

          <div className="todos space-y-4">
            {todos.length === 0 && (
              <div className="text-center text-gray-500 text-xl">
                No todos to display
              </div>
            )}

            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex flex-col sm:flex-row sm:items-center justify-between bg-blue-100 rounded-lg p-4 shadow-md"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        name={item.id}
                        type="checkbox"
                        onChange={handleCheck}
                        checked={item.isCompleted}
                        className="w-5 h-5 accent-blue-600"
                      />
                      <div
                        className={`text-lg font-medium break-all whitespace-normal w-full ${
                          item.isCompleted ? "line-through text-gray-500" : "text-blue-900"
                        }`}
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex gap-3 mt-3 sm:mt-0">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
