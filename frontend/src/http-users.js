import axis from "axios";

export default axis.create({
  baseURL: "http://localhost:3000/",
  headers:{
    "Content-type":"application/json"
  }
});
