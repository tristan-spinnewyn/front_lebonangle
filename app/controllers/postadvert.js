class PostAdvertController extends BaseController{
    constructor() {
        super();
        this.pictureModel = new PictureModel()
        this.advertModel = new AdvertModel()
        this.categoryModel = new CategoryModel()
        this.initCategory()
    }

    async initCategory() {
        let content = ''
        try {
            for (const category of await this.categoryModel.getAll()) {
                content += `<option value="${category['@id']}">${category.name}</option>`
            }
            document.getElementById("selectCategory").innerHTML = content
            M.FormSelect.init(document.getElementById("selectCategory"));
        } catch (err) {
            console.error(err.message)
            this.displayNotFoundError()
        }
    }

    async postAdvert(){
        let price = document.getElementById("price").value * 1
        let category = document.getElementById('selectCategory').value
        let title = document.getElementById('title').value.trim()
        let author = document.getElementById('author').value.trim()
        let content = document.getElementById('contentAdvert').value.trim()
        let email = document.getElementById('email').value.trim()

        if(isNaN(price)){
            this.toast("Le prix doit etre en chiffre")
            return
        }

        if(price < 1 || price > 1000000){
            this.toast("Le prix doit etre compris entre 1 et 1 000 000 d'euros")
            return
        }

        if(category === null || category === ""){
            this.toast("La catégory doit etre renseigné")
            return
        }

        if(title.length < 3 || title.length > 100){
            this.toast("Le titre doit etre compris entre 3 et 100 caractère")
            return
        }

        if(author === null || author === ""){
            this.toast("L'auteur de l'annonce doit etre renseigné")
            return
        }

        if(content === null || content === ""){
            this.toast("La description doit etre renseigné")
            return
        }

        if(content.length > 1200){
            this.toast("La description ne peut pas faire plus de 1200 caractères")
            return
        }

        if(email === "" || email === null) {
            this.toast("l'émail doit etre renseigné")
            return
        }

        let files = document.getElementById('pictures').files
        let pictures = []

        for(let file of files){
            let formData = new FormData()
            formData.append('file',file)
            let picture = await this.pictureModel.post(formData)
            console.log(picture)
            pictures.push(picture["@id"])
        }

        let advert = new Advert(title,content,author,email,category,price,null,null,null,pictures)

        try{
            let status = await this.advertModel.insert(advert)
            if (status === 201) {
                console.log(status)
                this.toast("Votre annonce a été posté")
                navigate('index')
            }else{
                this.displayServiceError()
            }
        }catch (e){
            console.log(e)
            this.displayServiceError()
        }
    }
}

window.postAdvertController = new PostAdvertController()