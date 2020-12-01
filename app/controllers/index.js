class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new CategoryModel()
        this.advertModel = new AdvertModel();
        this.currentPage = 1
        this.nbPageTot= 1
        this.initCategory()
        this.initAdverts('')
    }

    async initCategory() {
        let content = ''
        try {
            for (const category of await this.model.getAll()) {
                content += `<option value="${category.id}">${category.name}</option>`
            }
            document.getElementById("selectCategory").innerHTML = content
            M.FormSelect.init(document.getElementById("selectCategory"));
        } catch (err) {
            console.error(err.message)
            this.displayNotFoundError()
        }
    }

    async initAdverts(query) {
        document.getElementById("advertsList").innerHTML = "<h1>Chargement en cours ...</h1>"
        document.getElementById("pagination").innerHTML = ""
        let content = ''
        let paginationContent = ''
        try {
            this.nbPageTot= Math.ceil(await this.advertModel.getAll(query,true)/30)
            if(this.currentPage > 1){
                paginationContent += `<button class="btn waves-effect waves-light" onclick="indexController.changePage('prev')">Précédent</button>`
            }
            if(this.nbPageTot !== this.currentPage && this.nbPageTot > 1)
            {
                paginationContent += `<button class="btn waves-effect waves-light" onclick="indexController.changePage('next')">Suivant</button>`
            }
            for (const advert of await this.advertModel.getAll(query)) {
                let category = await this.model.getById(advert.category)
                content += `<div class="col s12 m6">
                                  <div class="card blue-grey darken-1">
                                    <div class="card-content white-text">
                                      <span class="card-title">${advert.title}</span>
                                      <p>${advert.content}</p>
                                      <p>Vendu à ${advert.price}€</p>
                                      <p>Publié par ${advert.author} à ${advert.publishedAt} dans la catégorie ${category.name}</p>
                                    </div>
                                    <div class="card-action">
                                      <a href="#">Plus d'info</a>
                                    </div>
                                  </div>
                                </div>`
            }
            document.getElementById("advertsList").innerHTML = content
            document.getElementById("pagination").innerHTML = paginationContent
        } catch (err) {
            console.error(err.message)
            this.displayNotFoundError()
        }
    }

    setQuery(changePage = false){
        let query = '?'
        let selectCategory = document.getElementById("selectCategory").value
        let priceMin = document.getElementById("priceMin").value * 1
        let priceMax = document.getElementById("priceMax").value * 1
        let orderPrice = document.getElementById("selectTriPrice").value
        let orderDate = document.getElementById("selectTriDate").value
        if(selectCategory != null && selectCategory !== ''){
            let selectElement = document.getElementById('selectCategory');
            let selectedOptions = selectElement.selectedOptions || [].filter.call(selectedElement.options, option => option.selected);
            let selectedValues = [].map.call(selectedOptions, option => option.value);
            query += ''
            for(let value of selectedValues){
                query += `category.id[]=${value}&`
            }
        }
        if(!isNaN(priceMin)){
            if(priceMin !== 0 && priceMin > 0) {
                query += `price[gt]=${priceMin-0.01}&`
            }
        }
        if(!isNaN(priceMax)){
            if(priceMin< priceMax) {
                query += `price[lt]=${priceMax+0.01}&`
            }
        }
        if(orderPrice !== ""){
            query += `order[price]=${orderPrice}&`
        }
        if(orderDate !== ""){
            console.log(orderDate)
            query += `order[publishedAt]=${orderDate}&`
        }
        if(changePage){
            query += `page=${this.currentPage}`
        }else{
            this.currentPage = 1
        }

        this.initAdverts(query)
    }

    changePage(type){
        if(type === 'next')
            this.currentPage += 1
        if(type=== 'prev')
            this.currentPage -= 1

        this.setQuery(true)
    }
}

window.indexController = new IndexController()
