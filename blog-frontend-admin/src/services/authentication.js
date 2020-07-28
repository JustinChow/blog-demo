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
                    localStorage.setItem('admin_user', JSON.stringify(response.payload));
                    localStorage.setItem('admin_token', JSON.stringify(response.token));
                }

                return response.token;
            });
    }

    logout() {
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token')
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('admin_user'));;
    }

    getToken() {
        return JSON.parse(localStorage.getItem('admin_token'));;
    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem('admin_user'));
        const token = JSON.parse(localStorage.getItem('admin_token'));

        if (user && token) {
            return { Authorization: 'Bearer ' + token };
        } else {
            return {};
        }
    }
}

export default new AuthService();