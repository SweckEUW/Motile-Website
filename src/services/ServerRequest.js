import AxiosHelper from "./AxiosHelper.js";

class ServerRequest{
    // MotileParts
    async getAllMotileParts(){
        return await AxiosHelper.get('/MotileParts');
    }

    async login(email,password) {
        return await AxiosHelper.get('/Login?email='+email+'&password='+password);
    }

    async createUser(user) {
        return await AxiosHelper.post('/Register', user);
    }

    // BlenderRendering
    async requestBlenderRendering(settings) {
        return await AxiosHelper.post('/Blender',settings, {responseType: 'blob'});
    }
}

export default new ServerRequest();

