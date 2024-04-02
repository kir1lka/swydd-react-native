import axios from "axios";
import { API_HOST } from "@env";

const ApiManager = axios.create({
  baseURL: `${API_HOST}`,
});

export default ApiManager;
