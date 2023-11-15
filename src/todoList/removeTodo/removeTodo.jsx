import { client } from "../../config/client";
import { reload } from "../renderList/Getlist";
import Getlist from "../renderList/Getlist";

const removeTodo = async (_id) => {
  const isConfirmed = window.confirm(
    "Bạn có chắc chắn muốn thực hiện hành động xóa mục này?"
  );
  if (isConfirmed) {
    let api = localStorage.getItem("apiKey");
    let apiKey;

    if (!api) {
      return;
    }

    apiKey = JSON.parse(api);
    client.setToken(apiKey);
    const { response } = await client.delete(`/todos/${_id}`);
    if (response.ok) {
      alert("Xóa dữ liệu thành công");

      return;
    }
  } else {
    alert("da huy xoa");
  }
};
export default removeTodo;
