import AxiosHelper from "./AxiosHelper.js";

class MotilePartsService{
    getAll(){
        return AxiosHelper.get();
    }
}

export default new MotilePartsService();
