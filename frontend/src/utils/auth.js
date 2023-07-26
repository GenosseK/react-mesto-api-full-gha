export const BASE_URL = 'api.genossek.mesto.nomoredomains.xyz';

const handleResponseStatus = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`Error: ${response.status}`);
    }
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email }),
    }).then(handleResponseStatus);
};

export const authorise = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email }),
    }).then(handleResponseStatus);
};

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    }).then(handleResponseStatus);
};