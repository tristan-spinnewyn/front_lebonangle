class PictureApi{
    simpleUrl = "http://localhost:8000"

    getById(idApi)
    {
        return fetchJSON(`${this.simpleUrl}${idApi}`)
    }

}