class CategoryModel{
    constructor() {
        this.categoryApi = new CategoryApi()
    }

    getAll(handler){
        this.categoryApi.getAll(handler)
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