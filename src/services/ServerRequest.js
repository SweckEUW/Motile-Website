import AxiosHelper from "./AxiosHelper.js";

function getJWTToken(){
    let token = localStorage.getItem('token')
    return {token};
}

class ServerRequest{
  
    async getAllMotileParts(){
        return await AxiosHelper.get('/MotileParts');
    }

    async getMotileConfigurations() {
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

    async requestBlenderRendering(settings) {
        return await AxiosHelper.post('/Blender',settings, {responseType: 'blob'});
    }
}

export default new ServerRequest();

