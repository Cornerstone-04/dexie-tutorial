import React, { useEffect, useState } from "react";
import { Dexie } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

const db = new Dexie("todoApp");
db.version(1).stores({
  todos: "++id, task, completed, date",
});

const { todos } = db;

const App = () => {
  const [displayArrow, setDisplayArrow] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const allItems = useLiveQuery(() => todos.toArray(), []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setDisplayArrow(true);
    } else {
      setDisplayArrow(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (taskInput) {
      await todos.add({
        task: taskInput,
        completed: false,
      });
      setTaskInput("");
    } else {
      alert("Please add a task.");
    }
  };

  const deleteColor = async (id) => await todos.delete(id);

  const toggleStatus = async (id, e) => {
    await todos.update(id, { completed: !!e.target.checked });
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-[30px] bg-gray-100">
      <div className="w-[90%] lg:w-[50%] flex flex-col gap-[40px] items-center">
        <h1 className="text-slate-700 font-bold text-2xl">Todo App</h1>
        <form
          className="w-full flex flex-col gap-[6px] justify-end items-end"
          onSubmit={addTask}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="What are you doing today?"
            className="w-full outline-none bg-transparent text-slate-700 font-medium placeholder:text-gray-400 focus:placeholder:text-slate-700 placeholder:transition-all placeholder:ease-linear border-b-2 border-slate-700 pb-[8px] pl-[5px]"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="text-white font-semibold text-base bg-slate-700 px-[20px] py-[5px] uppercase shadow-md shadow-slate-500">
            Add
          </button>
        </form>

        <div
          className="w-full bg-white shadow-md min-h-full flex flex-col gap-[20px] justify-center items-center p-[20px]"
          value="container"
        >
          {allItems?.map(({ completed, id, task }) => (
            <div className="w-full flex justify-between items-end" key={id}>
              <p>
                <label className="flex justify-center items-baseline gap-[5px]">
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => toggleStatus(id, e)}
                  />
                  <span
                    className={`font-medium transition-all ease-linear ${
                      completed && "line-through"
                    }`}
                  >
                    {task}
                  </span>
                </label>
              </p>
              <button
                className="cursor-pointer bg-red-600 px-[15px] py-[5px] text-white font-semibold"
                onClick={() => deleteColor(id)}
              >
                Del
              </button>
            </div>
          ))}
        </div>
      </div>

      {displayArrow && (
        <button
          className="flex justify-center items-center w-10 h-10 fixed bottom-[20px] right-[10px] cursor-pointer"
          onClick={scrollUp}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
