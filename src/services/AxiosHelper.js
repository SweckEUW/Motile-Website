import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000", //http://192.168.178.20:5000/
  headers: {
    "Content-type": "application/json",
  },
})

