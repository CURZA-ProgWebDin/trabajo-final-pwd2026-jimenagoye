import { instance_auth as axios } from '../plugins/axios';

const base = '/movimientos_stock';

export default {
  getAll() { return axios.get(base); },
  getMisMovimientos() { return axios.get(`${base}/mis`); },
  registrar(data) { return axios.post(base, data); }
};
