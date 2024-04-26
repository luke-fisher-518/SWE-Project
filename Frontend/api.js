const axios = require("axios");

const api = axios.create({
    baseURL: "http://localhost:5050/",
    responseType: 'json'
})

exports.registerUser = async (userData) =>
    api.post('/users', userData)
    .then((response) => response.data)
    .catch((error) => error.response.data);

exports.login = async (loginInfo) =>
    api.post('/login', loginInfo)
    .then((response) => response.data)
    .catch((error) => error.response.data);

exports.fetchUsers = async () =>
    api.post('/users')
    .then((response) => response.data)
    .catch((error) => error.response.data);

exports.getUserByName = async (userName) =>
    api.get(`/users/${userName}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

exports.updateUser = async (newUserData) =>
    api.post(`/users/${newUserData.id}`, newUserData)
    .then((response) => response.data)
    .catch((error) => error.response.data);

exports.deleteUser = async (userName) =>
    api.delete(`/users/${userName}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

exports.addItem = async (userData, itemData) => {
    api.patch(`/users/${userName}/inventory`)
        .then((response) => response.data)
        .catch((error) => error.response.data);
}