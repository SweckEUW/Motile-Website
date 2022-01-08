import AxiosHelper from "./AxiosHelper.js";

function getData(){
    let token = localStorage.getItem('token');
    return {token};
}

class ServerRequest{
  
    async getAllMotileParts(){
        return await AxiosHelper.get('/MotileParts');
    }

    async getUserConfigurations() {
        return await AxiosHelper.post('/User/Configs', getData());
    }

    async login(data) {
        return await AxiosHelper.post('/Login',data);
    }

    async loginJWT() {
        return await AxiosHelper.post('/LoginJWT', getData());
    }

    async register(user) {
        return await AxiosHelper.post('/Register',user);
    }

    async getUserData() {
        return await AxiosHelper.post('/User/Data', getData());
    }

    async requestBlenderRendering(settings) {
        return await AxiosHelper.post('/Blender',settings, {responseType: 'blob'});
    }

    async stayAlive(){
        return await AxiosHelper.post('/StayAlive', getData());
    }

    async saveUserConfiguration(data){
        let sendData = getData();
        sendData.config = data;
        let saveResponse = await AxiosHelper.post('/SaveConfiguration', sendData);
        let generateThumbnailRespone = await AxiosHelper.post('/GenerateThumbnail', sendData);
        return generateThumbnailRespone;
    }
}

export default new ServerRequest();

