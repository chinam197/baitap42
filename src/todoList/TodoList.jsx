import React from "react";
import "./todolist.css";
import { useState, useEffect } from "react";
import Getlist from "./renderList/Getlist";
import { client } from "../config/client";
import { reload } from "./renderList/Getlist";
import handleSearchTodo from "./searchTodo/searchTodo";
function TodoList({ onLoad }) {
  const [form, setForm] = useState({
    todo: "",
    search: "",
  });
  const [number, setNumber] = useState(0);
  const handlePushTodo = async (todo) => {
    let apiKey = localStorage.getItem("apiKey");
    apiKey = JSON.parse(apiKey);
    if (!apiKey) {
      console.error("API key is missing.");
      return;
    }

    client.setToken(apiKey);
    const { response } = await client.post("/todos", todo);
    setNumber(number + 1);
    reload(number);
    if (response.ok) {
      onLoad(false);
      alert("Đăng bài thành công");
      setForm({ todo: "" });
      return;
    }
    setTimeout(() => {
      alert("Đăng bài thất bại");
      onLoad(false);
    }, 3000);
  };
  const handleGetValue = (e) => {
    e.preventDefault();
    const { todo } = form;
    if (todo.length) {
      onLoad(true);
      handlePushTodo({ todo });
      return;
    }

    alert("Vui lòng nhập ít nhất một ký tự");
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //remove

  return (
    <main className="__className_6a793a flex items-center justify-center p-8">
      <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
        <h1 className="font-bold text-white">Welcome to Todo App!</h1>
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            handleGetValue(e);
          }}
        >
          <div className="flex items-center border-b border-teal-500 py-2 relative">
            <input
              type="text"
              name="todo"
              placeholder="Thêm một việc làm mới"
              className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-white "
              autoFocus="true"
              onChange={(e) => {
                e.preventDefault();
                handleChange(e);
              }}
              value={form.todo}
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-shrink-0"
            >
              Thêm mới
            </button>
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute translate-x-4 left-full w-max"
              onClick={(e) => {
                e.preventDefault();
                handleSearchTodo(e);
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </form>
        <ul className="list-disc w-full max-w-3xl flex flex-col gap-4">
          <Getlist />
        </ul>
      </div>
    </main>
  );
}

export default TodoList;
{
  /* <li className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            Không có todo
          </li> */
}
