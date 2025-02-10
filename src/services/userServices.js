import axios from "axios";
const api = `${import.meta.env.VITE_API}/users`;

function handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return response;
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
}

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

export function deleteUser(id, token) {
    return axios.delete(`${api}/${id}`, {
        headers: {
            'x-auth-token': `${token}`
        }
    }).then(handleResponse);
};