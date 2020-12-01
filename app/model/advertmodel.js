class AdvertModel{
    constructor() {
        this.advertApi = new AdvertApi()
    }

    getAll(handler){
        this.advertApi.getAll(handler)
    }

    async getById(id) {
        try {
            return Object.assign(new Advert(), await this.advertApi.getById(id))
        } catch (e) {
            if (e === 404) return null
            return undefined
        }
    }
}