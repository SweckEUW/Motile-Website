import AxiosHelper from "./AxiosHelper.js";

class UserService{
    getAllUsers(){
        return AxiosHelper.get('/Users');
    }

    validateEmail(email) {
        return AxiosHelper.get('/Users?email='+email);
    }

    createUser() {
        
    }
}

export default new UserService();

