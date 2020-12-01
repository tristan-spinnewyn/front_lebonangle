class AdvertApi{
    url = "http://localhost:8000/api/adverts"
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