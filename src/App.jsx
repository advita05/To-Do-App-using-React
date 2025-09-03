import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  // Save todos to localStorage
  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, iscompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, iscompleted: !item.iscompleted } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-10 rounded-xl p-5 bg-violet-50 min-h-[80vh] md:w-2/3 lg:w-1/2">
        <h1 className="font-bold text-center text-3xl mb-5">
          Manage your todos at one place
        </h1>

        {/* Add Todo */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            placeholder="Enter your task..."
            className="w-full md:w-3/4 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="w-full md:w-1/4 bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Save
          </button>
        </div>

        {/* Show Finished Toggle */}
        <div className="flex items-center mb-3">
          <input
            id="showFinished"
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
            className="mr-2"
          />
          <label htmlFor="showFinished">Show Finished</label>
        </div>

        {/* Todos List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No Todos to display
            </div>
          )}
          {todos.map(
            (item) =>
              (showFinished || !item.iscompleted) && (
                <div
                  key={item.id}
                  className="todo flex flex-col sm:flex-row justify-between p-3 bg-white rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={item.iscompleted}
                      onChange={() => handleCheckbox(item.id)}
                    />
                    <div className={item.iscompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 rounded-md text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-md text-white"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
