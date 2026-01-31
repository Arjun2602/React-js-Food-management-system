import api from "./api_instance"
const createFood = (foodData) => {
    api.post("/foods", foodData);
}

export default createFood