import axios from "axios";
import AxiosHelper from "./AxiosHelper.js";

class UserService{
    getAllUsers(){
        return AxiosHelper.get('/Users');
    }

    validateEmail(email) {
        return AxiosHelper.get('/Users?email='+email);
    }

    login(email,password) {
        return AxiosHelper.get('/Users?email='+email+'&password='+password);
    }

    createUser(user) {
       return AxiosHelper.post('/Users', user)
    }
}

export default new UserService();

