import axios from "axios";

export async function getUsers(page) {
  return await axios.get(`https://reqres.in/api/users?page=${page + 1}`);
}

export async function postUser(data) {
  return await axios.post(`https://reqres.in/api/users`, data);
}

export async function putUser(id, data) {
  return await axios.put(`https://reqres.in/api/users/${id}`, data);
}

export async function deleteUser(id) {
  return await axios.delete(`https://reqres.in/api/users/${id}`);
}
