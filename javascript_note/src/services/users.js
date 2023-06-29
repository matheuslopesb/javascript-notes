import Api from './api';

const UsersService = {
    register: (params) => Api.post('/users/register', params), 
    login: async function (params) {
        const response = await Api.post('/users/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    }, 
    logout: () => {
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    }, 
    update: async (params) => {
        const response = await Api.put(`/users`, params, {
            headers: {'x-access-token': localStorage.getItem('token')}
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token); 
    }, 
    updatePassword: async (password) => Api.put(`/users/password`, {password: password}, {
        headers: {'x-access-token': localStorage.getItem('token')}
    }), 
    verifyPassword: async (params) => {
        await Api.post('/users/password', params, {
            headers: {'x-access-token': localStorage.getItem('token')}
        });
    }, 
    delete: async () => Api.delete('/users', {
            headers: {'x-access-token': localStorage.getItem('token')}
    })
}

export default UsersService; 