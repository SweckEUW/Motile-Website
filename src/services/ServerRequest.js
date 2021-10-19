import AxiosHelper from "./AxiosHelper.js";

class ServerRequest{
    // MotileParts
    async getAllMotileParts(){
        return await AxiosHelper.get('/MotileParts');
    }

    // Users
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
        return await AxiosHelper.post('/Users', user);
    }

    // BlenderRendering
    async requestBlenderRendering(settings) {
        return await AxiosHelper.post('/Blender',settings, {responseType: 'blob'});
    }
}

export default new ServerRequest();

