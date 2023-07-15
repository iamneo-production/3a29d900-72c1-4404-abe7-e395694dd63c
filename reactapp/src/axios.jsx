import axios from "axios";

const API = axios.create({
    baseURL: "https://8080-cfcaacebbcefaffccecdfccfeafefcdfdfda.project.examly.io/"
}); 

export default API;
