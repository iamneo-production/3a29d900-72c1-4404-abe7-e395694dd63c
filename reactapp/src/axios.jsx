import axios from "axios";

const API = axios.create({
    baseURL: "https://8080-ddfbcadcffaffccecdfccfeafefcdfdfda.project.examly.io/"
}); 

export default API;
