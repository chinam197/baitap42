import { client } from "../../config/client";

const handleSearchTodo = async () => {
  alert("đã chuyển qua chế độ tìm kiếm");
  const api = localStorage.getItem("apiKey");
  if (!api) {
    console.error("khong co api keys");
    return;
  }
  const apiKey = JSON.parse(api);
  client.setToken(apiKey);
  const { response, data } = await client.get("/todos?q=ad");
  if (response) {
  }
};

export default handleSearchTodo;
