class CategoryApi{
    url = "http://localhost:8000/api/categories"
    simpleUrl = "http://localhost:8000"

    getAll(handler){
        fetch(this.url)
            .then(response => response.json())
            .then(json => handler(json))
    }

    getById(idApi)
    {
        return fetchJSON(`${this.simpleUrl}${idApi}`)
    }

}