import React, { useEffect, useState } from "react";
import Checkbox from "./components/Checkbox";

const App = () => {
  const [displayArrow, setDisplayArrow] = useState(false);
  const [done, setDone] = useState(false);
  const [todo, setTodo] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      alert(todo);
    } else {
      alert("please input a todo");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-[30px]">
      <div className="w-[90%] md:w-[50%] flex flex-col gap-[40px] items-center">
        <h1 className="text-teal-700 font-bold text-2xl">Todo App</h1>
        {/* todo form */}
        <form
          className="w-full flex flex-col gap-[6px] justify-end items-end"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="What are you doing today?"
            className="w-full outline-none border-b-2 border-teal-700 pb-[8px] pl-[5px]"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="text-white font-semibold text-base bg-teal-700 px-[20px] py-[5px] uppercase shadow-md shadow-slate-500">
            Add
          </button>
        </form>

        <div className="w-full shadow-md min-h-full flex flex-col gap-[15px] justify-center items-center p-[20px]">
          <div className="w-full flex justify-between items-center">
            <p>
              <label
                htmlFor=""
                className="flex justify-center items-center gap-[5px]"
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    setDone(!done);
                  }}
                />
                <span className={done && "line-through"}>
                  Call Kayy to check on her
                </span>
              </label>
            </p>
            <button
              className="cursor-pointer bg-red-600 px-[15px] py-[5px] text-white font-semibold"
              onClick={() => alert("Deleted")}
            >
              Del
            </button>
          </div>
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
