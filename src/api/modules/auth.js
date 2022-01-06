import Api from "../../api"

export default {
    login(credentials) {
        return Api().post('api/user/login', {
            email: credentials.username,
            password: credentials.password
        });
    },
    register(credentials) {
        return Api().post('api/user/register',{
            email: credentials.username,
            password: credentials.password,
            name: credentials.name,
            password_confirmation: credentials.password_confirmation,
            address: credentials.address,
            phoneNumber: credentials.phoneNumber,
            role_id: 2
        });
    },
    logout() {
        // const config = {
        //     headers: { Authorization: `Bearer ${credentials.token}` }
        // };
        return Api().post('api/user/logout');
    },
    userProfile() {
        return Api().get('api/user/user-profile');
    }
};