class CategoryModel{
    constructor() {
        this.categoryApi = new CategoryApi()
    }

    async getAll(){
        let categories = []
        let json = await this.categoryApi.getAll()
        for(let category of json['hydra:member']){
            categories.push(Object.assign(new Category(),category))
        }

        return categories
    }

    async getById(id) {
        try {
            return Object.assign(new Category(), await this.categoryApi.getById(id))
        } catch (e) {
            if (e === 404) return null
            return undefined
        }
    }
}