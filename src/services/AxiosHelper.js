import axios from "axios";

export default axios.create({
  baseURL: "https://motile-website.vercel.app/", //http://localhost:5000
  headers: {
    "Content-type": "application/json",
  },
})

