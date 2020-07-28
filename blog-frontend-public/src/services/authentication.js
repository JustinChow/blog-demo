const API_URL = "/api/login";

class AuthService {
    async login(username, password) {
        return fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(data => data.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    localStorage.setItem('token', JSON.stringify(response.token));
                }

                return response.token;
            });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }

    async signup(username, password, passwordConfirm) {
        return fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                passwordConfirm
            })
        })
            .then(data => data.json());
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    getToken() {
        return JSON.parse(localStorage.getItem('token'));;
    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));

        if (user && token) {
            return { Authorization: 'Bearer ' + token };
        } else {
            return {};
        }
    }
}

export default new AuthService();