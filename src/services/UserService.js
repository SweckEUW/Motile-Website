import AxiosHelper from "./AxiosHelper.js";

class UserService{
    async getAllUsers(){
        return await AxiosHelper.get('/Users');
    }

    async validateEmail(email) {
        return await AxiosHelper.get('/Users?email='+email);
    }

    async login(email,password) {
        return await AxiosHelper.get('/Users?email='+email+'&password='+password);
    }

    async createUser(user) {
       return await AxiosHelper.post('/Users', user)
    }
}

export default new UserService();

