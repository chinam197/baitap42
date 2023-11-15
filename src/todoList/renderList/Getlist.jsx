import React from "react";
import { useEffect, useState } from "react";
import { client } from "../../config/client";
import removeTodo from "../removeTodo/RemoveTodo";
import updateTodo from "../editUpdateTodo/updateTodo";
import objUpdateTodo from "../editUpdateTodo/updateTodo";
export let numberRender = null;
export let reload = (render = 0) => {
  numberRender = render;
  console.log(numberRender);
};

function Getlist() {
  const [listTodoUser, setListTodo] = useState(null);
  const [edit, setEdit] = useState(false);

  const editList = (click) => {
    setEdit(click);
  };

  useEffect(() => {
    const handleGetlist = async () => {
      console.log("hihi");
      try {
        const api = localStorage.getItem("apiKey");

        if (!api) {
          throw new Error("loi roi apikey anh oi");
        }
        const apiKey = JSON.parse(api);
        client.setToken(apiKey);
        const { response, data } = await client.get("/todos");
        const { listTodo } = data.data;
        setListTodo(listTodo);

        if (!response.ok) {
          throw new Error("loi roi anh oi vui long dang nhap lai");
        }
      } catch {
        console.error("Err getdata");
      }
    };
    handleGetlist();
  }, [numberRender]);

  return (
    <>
      {listTodoUser &&
        listTodoUser.map(({ todo, _id, isCompleted }) => {
          return (
            <li
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
              key={_id}
            >
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                readOnly={edit ? "" : "none"}
                defaultValue={todo}
                style={{
                  textDecoration: isCompleted ? "line-through black" : "none",
                }}
                onInput={(e) => {
                  e.preventDefault();
                  objUpdateTodo.handleOnInput(e, todo);
                }}
              />
              <div className="flex items-center justify-between mt-4">
                {edit ? (
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      {isCompleted ? (
                        <label htmlFor={_id} className="mr-2">
                          Not Completed
                        </label>
                      ) : (
                        <label htmlFor={_id} className="mr-2">
                          Completed
                        </label>
                      )}

                      <input
                        id={_id}
                        type="checkbox"
                        className={`form-checkbox h-5 w-5 text-gray-600 `}
                        onInput={(e) => {
                          e.preventDefault();
                          objUpdateTodo.handleOnIsCompleted(e, isCompleted);
                        }}
                      />
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="bg-orange-500 hover:bg-orange-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={(e) => {
                          e.preventDefault();
                          editList(false);
                        }}
                      >
                        Thoát
                      </button>
                      <button
                        type="button"
                        className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={(e) => {
                          setEdit(false);
                          e.preventDefault();
                          objUpdateTodo.updateTodo(todo, _id, isCompleted);
                        }}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        onClick={(e) => {
                          e.preventDefault();
                          removeTodo(_id, () => {
                            <Getlist />;
                          });
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      onClick={(e) => {
                        e.preventDefault();
                        editList(true);
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                      onClick={(e) => {
                        e.preventDefault();
                        removeTodo(_id);
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
    </>
  );
}

export default Getlist;
