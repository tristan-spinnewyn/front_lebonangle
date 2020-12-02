class PictureApi{
    simpleUrl = "http://localhost:8000"
    url = "http://localhost:8000/api/pictures"

    getById(idApi)
    {
        return fetchJSON(`${this.simpleUrl}${idApi}`)
    }

    post(formData){
        return new Promise((resolve, reject) => fetch(this.url,{
            body: formData,
            method: "post",
        }).then(res =>{
            if(res.status === 201){
                resolve(res.json())
            } else{
                reject(res.status)
            }
        }).catch(err => reject(err)));
    }

}