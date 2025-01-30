import axios from "axios";

const api = `${import.meta.env.VITE_API}/cards`;
/* const api = `${process.env.REACT_APP_API}`; */

function handleResponse(response) {
    console.log("Response Data:", response.data);
    if (response.status >= 200 && response.status < 300) {
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
}


export function getAllCards(){
    return axios.get(api).then(handleResponse);
}

export function getOneCard(id){
    return axios.get(`${api}/${id}`).then(handleResponse);
};

export function getUserCards(token) {
    return axios.get(`${api}/my-cards`, {
        headers: {
            'x-auth-token': `${token}`
        }
    }).then(handleResponse);
};

export function addCard(cardInfo, token){
    return axios.post(api, cardInfo, {headers: {
        'x-auth-token': `${token}`}
    }).then(handleResponse);
};

export function editCard(id, cardInfo, token,){
    console.log("Token in Axios: " + token);
    console.log("Put Path: " + `${api}/${id}/1`);
    console.log("Values: " + cardInfo);
    
    return axios.put(`${api}/${id}`, cardInfo, {headers: {
            'x-auth-token': `${token}`}
    }).then(handleResponse);
};

export function deleteCard(id)
{
    return axios.delete(`${api}/${id}`);
}