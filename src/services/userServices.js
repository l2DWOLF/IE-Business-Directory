import axios from "./AxiosInstance";
const apiRouteName = "users"

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
    return axios.post(`${apiRouteName}/login`, credentials);
}

export function getAllUsers() {
    return axios.get(apiRouteName);
};

export function getOneUser(id, token) {
    return axios.get(`${apiRouteName}/${id}`, {
        headers: {
            'x-auth-token': `${token}`
        }
    })
};

export function addUser(userInfo) {
    return axios.post(apiRouteName, userInfo);
};

export function editUser(id, updatedUser) {
    return axios.put(`${apiRouteName}/${id}`, updatedUser);
};

export function deleteUser(id, token) {
    return axios.delete(`${apiRouteName}/${id}`, {
        headers: {
            'x-auth-token': `${token}`
        }
    }).then(handleResponse);
};