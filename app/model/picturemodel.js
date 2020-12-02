class PictureModel{
    constructor() {
        this.pictureApi = new PictureApi()
    }

    async getById(id) {
        try {
            return Object.assign(new Picture(), await this.pictureApi.getById(id))
        } catch (e) {
            if (e === 404) return null
            return undefined
        }
    }

    async post(formData){
        return Object.assign(new Picture(), await this.pictureApi.post(formData))
    }
}