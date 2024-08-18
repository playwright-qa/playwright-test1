export default class CarsController {
    #CREATE_CAR_PATH = '/api/cars'
    #GET_CARS_PATH = '/api/cars'
    #GET_CARS_BRANDS_PATH = '/api/cars/brands'
    #GET_CARS_BRANDS_PATH_BY_ID = (id) => `/api/cars/brands/${id}`
    #DELETE_CAR_PATH = (id) => `/api/cars/${id}`
    #GET_CAR_MODELS_PATH = '/api/cars/models'
    #GET_CARS_MODELS_PATH_BY_ID = (id) => `/api/cars/models/${id}`
    #EDIT_CAR_PATH_BY_ID = (id) => `/api/cars/${id}`

    constructor(request){
        this._request = request
    }

    async getCars(){
        console.log("Get all user's cars")
        return this._request.get(this.#GET_CARS_PATH)
    }

    async getCarsBrands(){
        console.log("Get all user's brands")
        return this._request.get(this.#GET_CARS_BRANDS_PATH)
    }

    async getCarsBrandsById(id){
        console.log("Get car brands by id")
        return this._request.get(this.#GET_CARS_BRANDS_PATH_BY_ID(id))
    }

    async getCarModels(){
        console.log("Get car models")
        return this._request.get(this.#GET_CAR_MODELS_PATH)
    }

    async getCarsModelsById(id){
        console.log(`Get car model by id -> ${id}`)
        return this._request.get(this.#GET_CARS_MODELS_PATH_BY_ID(id))
    }

    async getCarById(){
        console.log("Get car by id")
        return this._request.get(this.#GET_CARS_PATH)
    }

    async editCarById(id,updatedCarData){
        console.log(`Edit car by id -> ${id}`)
        return this._request.put(this.#EDIT_CAR_PATH_BY_ID(id), {
            data: updatedCarData
        })
    }

    async createCar(requestBody){
        console.log("Create car with data: ", requestBody)
        return this._request.post(this.#CREATE_CAR_PATH, {
            data: requestBody
        })
    }

    async deleteCar(id){
        console.log(`Delete car by id: ${id}`)
        return this._request.delete(this.#DELETE_CAR_PATH(id))
    }
}