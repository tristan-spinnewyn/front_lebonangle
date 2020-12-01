class CategoryApi{
    url = "http://localhost:8000/api/categories"
    simpleUrl = "http://localhost:8000"
    headers = new Headers()

    getAll(){
        this.headers.set('Content-Type','Application/json')
        return new Promise((resolve, reject) => fetch(this.url, {
            method: 'GET',
            headers: this.headers
        }).then(res => {
            if (res.status === 200) {
                resolve(res.json())
            } else {
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }

    getById(idApi)
    {
        return fetchJSON(`${this.simpleUrl}${idApi}`)
    }

}