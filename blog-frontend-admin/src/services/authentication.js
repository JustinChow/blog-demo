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
                if (response.token && response.user && response.user.isAdmin) {
                    localStorage.setItem('admin_user', JSON.stringify(response.user));
                    localStorage.setItem('admin_token', JSON.stringify(response.token));
                    return {token: response.token};
                }
                else if (response.token && response.user && !response.user.isAdmin) {
                    return {error: {msg: 'User is not an admin'}};
                }
                else {
                    return  {error: {msg: 'Login failed'}};
                }
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