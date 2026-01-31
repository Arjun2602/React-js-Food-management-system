import api from "./api_instance"

const updateFoodApi = (url, foodData) => {
   api.put(url, foodData);
}

export default updateFoodApi