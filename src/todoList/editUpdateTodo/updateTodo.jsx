import { client } from "../../config/client";
let valueTodo = "";
let checkIsCompleted = "";
const objUpdateTodo = {
  handleOnIsCompleted(e, isCompleted) {
    checkIsCompleted = e.target.checked;
  },
  handleOnInput: (e) => {
    valueTodo = e.target.value;
  },

  updateTodo: async (todo, _id, isCompleted) => {
    if (valueTodo != "") {
      todo = valueTodo;
    }

    if (checkIsCompleted != "") {
      isCompleted = checkIsCompleted;
    }

    if (todo || isCompleted != "") {
      const { response } = await client.patch(`/todos/${_id}`, {
        todo,
        isCompleted,
      });
      if (response.ok) {
        alert("Up date thành công");
        return;
      }
      alert("Update thất bại vui lòng thử lại sau");
    }
    // if (todo) {
    //   console.log();
    //   const { response } = await client.patch(`/todos/${_id}`, {
    //     todo,
    //   });
    //   if (response.ok) {
    //     alert("Up date thành công");
    //     return;
    //   }
    //   alert("Update thất bại vui lòng thử lại sau");
    // } else {
    //   const { response } = await client.patch(`/todos/${_id}`, {
    //     isCompleted,
    //   });
    //   if (response.ok) {
    //     alert("Up date thành công");
    //     return;
    //   }
    //   alert("Update thất bại vui lòng thử lại sau");
    // }
  },
};

export default objUpdateTodo;
