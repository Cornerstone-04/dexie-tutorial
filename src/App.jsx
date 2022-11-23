import React, { useEffect, useState } from "react";
import { Dexie } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

const db = new Dexie("todoApp");
db.version(1).stores({
  todos: "++id, task, completed, date",
});

const { todos } = db;

const App = () => {
  const allItems = useLiveQuery(() => todos.toArray(), []);

  const [displayArrow, setDisplayArrow] = useState(false);
  const [done, setDone] = useState(false);
  const [taskInput, setTaskInput] = useState("");

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

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    await todos.add({
      task: taskInput,
      completed: false,
    });

    setTaskInput("");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-[30px]">
      <div className="w-[90%] lg:w-[50%] flex flex-col gap-[40px] items-center">
        <h1 className="text-teal-700 font-bold text-2xl">Todo App</h1>
        <form
          className="w-full flex flex-col gap-[6px] justify-end items-end"
          onSubmit={addTask}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="What are you doing today?"
            className="w-full outline-none border-b-2 border-teal-700 pb-[8px] pl-[5px]"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="text-white font-semibold text-base bg-teal-700 px-[20px] py-[5px] uppercase shadow-md shadow-slate-500">
            Add
          </button>
        </form>

        <div className="w-full shadow-md min-h-full flex flex-col gap-[15px] justify-center items-center p-[20px]">
          {allItems?.map(({ completed, id, task }) => (
            <div className="w-full flex justify-between items-center" key={id}>
              <p>
                <label
                  htmlFor=""
                  className="flex justify-center items-center gap-[5px]"
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => {
                      setDone(!done);
                    }}
                  />
                  <span className={completed && "line-through"}>{task}</span>
                </label>
              </p>
              <button className="cursor-pointer bg-red-600 px-[15px] py-[5px] text-white font-semibold">
                Del
              </button>
            </div>
          ))}
        </div>
      </div>

      {displayArrow && (
        <button className="fixed bottom-[40px] right-[10px]" onClick={scrollUp}>
          Up
        </button>
      )}
    </div>
  );
};

export default App;
