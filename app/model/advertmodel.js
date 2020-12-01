class AdvertModel{
    constructor() {
        this.advertApi = new AdvertApi()
    }

    async getAll(query,getNbAdvert = false){
        let json = await this.advertApi.getAll(query)
        if(!getNbAdvert) {
            let adverts = []
            for (let advert of json['hydra:member']) {
                adverts.push(Object.assign(new Advert(), advert))
            }

            return adverts
        }else{
            return json['hydra:totalItems']
        }
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