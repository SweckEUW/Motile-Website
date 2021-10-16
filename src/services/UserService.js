import axios from "axios";
import AxiosHelper from "./AxiosHelper.js";

class UserService{
    getAllUsers(){
        return AxiosHelper.get('/Users');
    }

    validateEmail(email) {
        return AxiosHelper.get('/Users?email='+email);
    }

    createUser(user) {
       return AxiosHelper.post('/Users', user)
    }
}

export default new UserService();

