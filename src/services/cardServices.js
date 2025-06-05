import axios from "./AxiosInstance";

//const api = `${import.meta.env.VITE_API}/cards`;
const apiRouteName = "cards"

function handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
}


export function getAllCards(){
    return axios.get(apiRouteName).then(handleResponse);
}

export function getOneCard(id){
    return axios.get(`${apiRouteName}/${id}`).then(handleResponse);
};

export function getUserCards(token) {
    return axios.get(`${apiRouteName}/my-cards`, {
        headers: {
            'x-auth-token': `${token}`
        }
    }).then(handleResponse);
};

export function addCard(cardInfo, token){
    return axios.post(apiRouteName, cardInfo, {headers: {
        'x-auth-token': `${token}`}
    }).then(handleResponse);
};

export function likeCard(id, token){
    return axios.patch(`${apiRouteName}/${id}`,{}, {
        headers: {
            'x-auth-token': `${token}`}
    }).then(handleResponse);
}

export function editCard(id, cardInfo, token,){
    return axios.put(`${apiRouteName}/${id}`, cardInfo, {headers: {
            'x-auth-token': `${token}`}
    }).then(handleResponse);
};

export function patchBizNum(id, bizNum, token,){
    return axios.patch(`${apiRouteName}/${id}`, {bizNumber: bizNum}, {headers: {
            'x-auth-token': `${token}`}
    }).then(handleResponse);
};

export function deleteCard(id, token)
{
    return axios.delete(`${apiRouteName}/${id}`, {headers: {
        'x-auth-token': `${token}`}
    });
};