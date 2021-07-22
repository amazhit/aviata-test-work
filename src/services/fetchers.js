import axios from "axios";

export const fetchData = async function() {
  const response = await axios.get("/airlines");
  return response.data;
};
