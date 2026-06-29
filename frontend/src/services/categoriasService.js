import { instance_auth as axios } from "../plugins/axios";

const base = "/categorias";

export default {
  async getAll() {
    return await axios.get(base);
  },
  async getById(id) {
    return await axios.get(`${base}/${id}`);
  },
  async create(data) {
    return await axios.post(base, data);
  },
  async update(id, data) {
    return await axios.put(`${base}/${id}`, data);
  },
  async delete(id) {
    return await axios.delete(`${base}/${id}`);
  }
};
