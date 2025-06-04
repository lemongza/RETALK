import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", //백엔드 서버 연결
  //withCredentials: true, //쿠키 포함
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
