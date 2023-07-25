class API {
    constructor(settings) {
        this._baseURL = settings.baseURL;
        this._headers = settings.headers;
    }

    _handleResponseStatus(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Error: ${response.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponseStatus);
    }

    editUserInfo(data) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._handleResponseStatus);
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._handleResponseStatus)
    }

    addCard(data) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._handleResponseStatus)
    }

    deleteCard(cardID) {
        return fetch(`${this._baseURL}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._handleResponseStatus)
    }

    changeLike(cardID, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            })
                .then(this._handleResponseStatus)
        }
        else {
            return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
                method: 'PUT',
                headers: this._headers,
            })
                .then(this._handleResponseStatus)
        }
    }

    changeAvatar(data) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            }),
        })
            .then(this._handleResponseStatus)
    }

}

const api = new API({
    baseURL: 'http://api.genossek.mesto.nomoredomains.xyz/',
    headers: {
        authorization: '2bc76956-8c18-424e-a75e-aff99086882b',
        'Content-Type': 'application/json'
    }
})

export default api;