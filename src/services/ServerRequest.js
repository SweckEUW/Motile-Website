import AxiosHelper from "./AxiosHelper.js";
import axios from "axios";

function getJWTToken(){
    let token = localStorage.getItem('token')
    return {token};
}

class ServerRequest{
  
    async getAllMotileParts(){
        return await AxiosHelper.get('/MotileParts');
    }

    async getUserConfigurations() {
        return await AxiosHelper.post('/User/Configs', getJWTToken());
    }

    async login(user) {
        return await AxiosHelper.post('/Login',user);
    }

    async loginJWT() {
        return await AxiosHelper.post('/LoginJWT', getJWTToken());
    }

    async register(user) {
        return await AxiosHelper.post('/Register',user);
    }

    async getUserData() {
        return await AxiosHelper.post('/User/Data', getJWTToken());
    }

    async changeUserData(userData){
        return await AxiosHelper.post('/User/Modify', {
            userData, 
            token: localStorage.getItem('token')
        })
    }

    async addAddress(address){
        return await AxiosHelper.post('/User/AddAddress', {
            address, 
            token: localStorage.getItem('token')
        })
    }

    async removeAddress(addressId){
        return await AxiosHelper.post('/User/RemoveAddress', {
            addressId, 
            token: localStorage.getItem('token')
        })
    }

    async uploadImage(data){
        data.append("token", localStorage.getItem('token'));
        axios({
            method: 'post',
            url: 'http://localhost:5000/User/UploadProfilePic',
            data: data
        })
    }

    async requestBlenderRendering(settings) {
        return await AxiosHelper.post('/Blender',settings, {responseType: 'blob'});
    }
}

export default new ServerRequest();

