class AdvertApi {
    url = "http://localhost:8000/api/adverts"
    simpleUrl = "http://localhost:8000"
    headers = new Headers()
    getAll(query) {
        this.headers.set('Content-Type','Application/json')
        return new Promise((resolve, reject) => fetch(this.url + query, {
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

    getById(idApi) {
        return fetchJSON(`${this.simpleUrl}${idApi}`)
    }

    post(advert){
        this.headers.set('Content-Type','application/json')
        return fetch(this.url,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(advert)
        })
    }

}