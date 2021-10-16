import AxiosHelper from "./AxiosHelper.js";

class UserService{
    getAllUsers(){
        return AxiosHelper.get('/Users');
    }

    validateEmail() {
        
    }

    createUser() {
        
    }
}

export default new UserService();

