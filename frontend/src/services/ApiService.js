import { instance_auth as axios } from "../plugins/axios";

class ApiService {
  url = "";
  errors = [];

  constructor(url) {
    this.url = url;
  }
  async getAll() {
    try {
      const  data  = await axios.get(this.url);
      return data;
    } catch (error) {
      this.errors.push(error.status);
    } 
  }
  async findOne(id) {
    const data = await axios
      .get(`${this.url}${id}`)
      .then((response) => response.data)
      .catch((error) => this.errors.push(error.response.data));
    if (this.errors.length === 0) {
      return data;
    }
  }
  async create(data) {
    try {
        const response = await axios.post(this.url, data);
        return response;
    } catch (error) {
        console.error("Hubo un error en la petición:", error.response?.data);
        return null;
    }
  }
  async update(data, id) {
    await axios.put(`${this.url}${id}`, data);
  }
  async destroy(id) {
    await axios.delete(`${this.url}${id}`);
  }
}

export default ApiService;