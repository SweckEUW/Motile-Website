import AxiosHelper from "./AxiosHelper.js";

class MotilePartsService{
    getAll(){
        return AxiosHelper.get('/MotileParts');
    }
}

export default new MotilePartsService();
