import axios from "axios";

const api = `${import.meta.env.VITE_API}/users`;

export function login(credentials) {
    return axios.post(`${api}/login`, credentials);
}

export function getAllUsers() {
    return axios.get(api);
};

export function getOneUser(id, token) {
    return axios.get(`${api}/${id}`, {
        headers: {
            'x-auth-token': `${token}`
        }
    })
};

export function addUser(userInfo) {
    return axios.post(api, userInfo);
};

export function editUser(id, updatedUser) {
    return axios.put(`${api}/${id}`, updatedUser);
};

export function deleteUser(id) {
    return axios.delete(`${api}/${id}`);
};