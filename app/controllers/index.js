class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new CategoryModel()
        this.advertModel = new AdvertModel();
        this.initCategory()
        this.initAdverts()
    }

    async initCategory(){
        let content = ''
        try {
            await this.model.getAll(categories => {
                for (const category of categories['hydra:member']) {
                    content += `<option value="${category.id}">${category.name}</option>`
                }
                document.getElementById("selectCategory").innerHTML = content
                M.FormSelect.init(document.getElementById("selectCategory"));
            })
        } catch (err) {
            console.error(err.message)
            this.displayNotFoundError()
        }
    }

    async initAdverts(){
        let content = ''
        try{
            await this.advertModel.getAll(adverts =>{
                for (const advert of adverts['hydra:member']){
                    content += `<div class="col s12 m6">
                                  <div class="card blue-grey darken-1">
                                    <div class="card-content white-text">
                                      <span class="card-title">${advert.title}</span>
                                      <p>${advert.content}</p>
                                      <p>Publié par ${advert.author} à ${advert.publishedAt}</p>
                                    </div>
                                    <div class="card-action">
                                      <a href="#">Plus d'info</a>
                                    </div>
                                  </div>
                                </div>`
                }
                document.getElementById("advertsList").innerHTML = content
            })
        }catch (err) {
            console.error(err.message)
            this.displayNotFoundError()
        }
    }
}

window.indexController = new IndexController()
