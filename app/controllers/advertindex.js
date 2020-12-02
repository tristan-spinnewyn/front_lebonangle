class AdvertindexController extends BaseController{
    constructor() {
        super();
        this.url = "http://localhost:8000"
        this.modelCategory = new CategoryModel()
        this.modelPicture = new PictureModel()
        if(indexController.selectedAdvert) {
            this.advert = indexController.selectedAdvert
            indexController.selectedAdvert = null
        }
        this.initAdvert()
    }

    async initAdvert(){
        let category = await this.modelCategory.getById(this.advert.category)
        document.getElementById("titleAdvert").innerText = this.advert.title
        document.getElementById("category").innerHTML = `Catégorie: ${category.name}`
        let contentImg = ''
        for(let picture of this.advert.pictures){
            let img = await this.modelPicture.getById(picture)
            contentImg += `<div class="col s12 m6 l4">
              <img src="${this.url}${img.contentUrl}" alt="" class="responsive-img"> <!-- notice the "circle" class -->
            </div>`
        }
        document.getElementById("imageAdvert").innerHTML = contentImg
        document.getElementById("price").innerHTML = `${this.advert.price} €`
        let d = new Date(this.advert.publishedAt)
        document.getElementById("dateContactAuthor").innerHTML = `Publie le ${this.formatDate(d)} par ${this.advert.author} (contact: ${this.advert.email})`
        document.getElementById('contentAdvert').innerText = this.advert.content
    }

    formatDate(dt){
        return `${
            (dt.getMonth()+1).toString().padStart(2, '0')}/${
            dt.getDate().toString().padStart(2, '0')}/${
            dt.getFullYear().toString().padStart(4, '0')} ${
            dt.getHours().toString().padStart(2, '0')}:${
            dt.getMinutes().toString().padStart(2, '0')}:${
            dt.getSeconds().toString().padStart(2, '0')}`
    }
}

window.AdvertIndexController = new AdvertindexController()

