import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, settodo] = useState("");
  const [todoList, settodoList] = useState([]);
  const [showfinished, setshowfinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todoList");
    if (todoString) {
      let todoList = JSON.parse(localStorage.getItem("todoList"));
      settodoList(todoList);
    }
  }, []);

  const savetoLS = (params) => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  const handleAdd = () => {
    settodoList([...todoList, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    savetoLS();
  };
  const handleEdit = (e, id) => {
    let newTodo = todoList.filter((item) => {
      return item.id === id;
    });
    settodo(newTodo[0].todo);
    let newtodoList = todoList.filter((item) => {
      return item.id !== id;
    });
    settodoList(newtodoList);
    savetoLS();
  };
  const handleDelete = (e, id) => {
    const shouldRemove = confirm("Are you sure you want to delete it?");
    if (shouldRemove) {
      let newtodoList = todoList.filter((item) => {
        return item.id !== id;
      });
      settodoList(newtodoList);
      savetoLS();
    }
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todoList.findIndex((item) => {
      return item.id === id;
    });
    let newtodoList = [...todoList];
    newtodoList[index].isCompleted = !newtodoList[index].isCompleted;
    settodoList(newtodoList);
    savetoLS();
  };
  const toggleFinished = (e) => {
    setshowfinished(!showfinished);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-violet-100 w-[90%] mx-auto min-h-[80vh] rounded-xl mt-6 p-6 space-y-5">
        <h1 className="font-bold text-xl">
          iTAsk - Manage your todos at one place!
        </h1>
        <div className="add-todo space-y-3">
          <h2 className="font-bold text-xl">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-3/4 sm:w-1/2 rounded-md"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-900 text-white disabled:bg-violet-950 font-bold rounded-lg px-3 ml-3"
          >
            Save
          </button>
        </div>
        <div className="your-todo space-y-3">
          <input
            onClick={toggleFinished}
            type="checkbox"
            checked={showfinished}
          />{" "}
          <span>Show Finished</span>
          <h2 className="font-bold text-xl">Your Todos</h2>
          {todoList.length === 0 && <div>No Todos to display</div>}
          {todoList.map((item) => {
            return (
              (showfinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-[50%] justify-between"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <p className={item.isCompleted ? "line-through w-[200px] sm:w-[400px] break-words" : "w-[200px] sm:w-[500px] break-words"}>
                      {item.todo}
                    </p>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-900 text-white font-bold rounded-lg p-2 mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-900 text-white font-bold rounded-lg p-2 mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
