let toDosArrStorange = [];
let toDos;

/* Creatore della sezione toDo:
    - toDoSearch: filtra i todo rispettando i parametri della searchbar;
    - toDoFilter: si occupa di verificare e applicare tutti i filtri
    - toDoShow: si occupa di creare l'elemento toDo utilizzando l'array precedentemente filtrato (se ci sono dei filtri attivi)
    - paginationSystem: si occupa di creare l'impaginazione dei toDoS
*/
class toDoCreator{

    constructor(arr) {
        this.toDoArr = arr;
        this.filterShowTrue = false;
        this.filterShowFalse = false;
        this.filterOrderTrue =  false;
        this.filterByName = false;
        this.currentPage = 1;
        this.maxRow = 10;

        this.toDosShow(this.toDoArr, this.maxRow, this.currentPage);
    }

//Filtraggio deli todos in base al value presente nella search bar

    toDoSearch(){
        this.toDoArr = [];
        this.currentPage = 1;
        const searchValue = document.getElementById('search-todo').value.toUpperCase();

        toDosArrStorange.forEach(element =>{
            const elementValue = element.title.toUpperCase();

            if(elementValue.includes(searchValue)){
                this.toDoArr.push(element);
            }
        });
        this.toDoFilters();
    }

//Controllo e applicazione dei vari filtri richiesti

    toDoFilters(){
        let filterArr = [...this.toDoArr];

        if(this.filterShowTrue == true){
            filterArr = [...this.toDoArr.filter(element => element.completed == true)];
        }

        if(this.filterShowFalse == true){
            filterArr = [...this.toDoArr.filter(element => element.completed == false)];
        }

        if(this.filterByName == true){
            filterArr.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        }

        if(this.filterOrderTrue == true){
            filterArr.sort((a,b) => (a.completed < b.completed) ? 1 : ((b.completed < a.completed) ? -1 : 0));
        }

        this.toDosShow(filterArr, this.maxRow, this.currentPage);

    }

//Creazione e inserimento in pagina dei toDos

    toDosShow(array, rowPage, page){
        page--;

        let arrayTotalItems = array.length;
        array = array.slice(rowPage * page, (rowPage * page) + rowPage);

        const toDosContainer = document.getElementById('todoList');

        toDosContainer.innerHTML = '';

        if(array.length > 0){
            array.forEach(element =>{
                const divRowToDo = document.createElement('div');
                divRowToDo.classList = "row border-top py-3";

                const toDoCompleted = element.completed ? `<span class="badge bg-success p-2">Completed!</span>` : `<span class="badge bg-warning text-dark p-2">In progress!</span>`;

                divRowToDo.innerHTML = `
                            <div class="col-2 d-flex justify-content-center align-items-center fw-bold">${element.id}</div>
                            <div class="col-6">${element.title}</div>
                            <div class="col-4 d-flex justify-content-center align-items-center">${toDoCompleted}</div>`;
                toDosContainer.appendChild(divRowToDo);
            });
        }else{
            const divRowToDo = document.createElement('div');
                divRowToDo.classList = "row border-top py-3";
                divRowToDo.innerHTML = `
                            <div class="col text-center fs-2 fst-italic text-secondary">Nothing found, try searching again!</div>`;
                toDosContainer.appendChild(divRowToDo);
        }

        this.paginationSystem(arrayTotalItems, this.currentPage);
    }

//Creazione della impaginazione

    paginationSystem(array, page){
        const maxPages = Math.ceil(array / this.maxRow);
        let prevPage;
        let lastPage;

        if(page == 1  && maxPages > 2){
            lastPage = 3;
        }else if((page + 1) < maxPages){
            lastPage = page + 1
        }else{
            lastPage = maxPages;
        }

        if(page == 1){
            prevPage = 1;
        }else if(page == (maxPages - 1)){
            prevPage = maxPages - 2;
        }else if((page === maxPages) && (maxPages > 2)){
            prevPage = maxPages - 2;
        }else{
            prevPage = page - 1;
        }

        const paginationToDoContainer = document.getElementById('paginationToDo');
        paginationToDoContainer.innerHTML = "";

        const btnFirstPage = document.createElement('li');
        btnFirstPage.classList = 'page-item';
        if(page == 1)btnFirstPage.classList.add('disabled');

        btnFirstPage.innerHTML = `<a class="page-link" href="#">&laquo;</a>`;

        if(maxPages > 1){
            btnFirstPage.addEventListener('click', (e)=> {
                toDos.currentPage = 1;
                toDos.toDoFilters();
            });

            paginationToDoContainer.appendChild(btnFirstPage);

            if(page < maxPages + 1){
                for(let i = prevPage; i <= lastPage; i++){
                    const btnPage = document.createElement('li');
                    btnPage.classList = 'page-item';
                    if(i == page){
                        btnPage.classList.add('active');
                    }
                    btnPage.innerHTML=`<a class="page-link" href="#">${i}</a>`;
                    btnPage.addEventListener('click', (e)=> {
                        btnPage.classList.add('active');
                        toDos.currentPage = i;
                        toDos.toDoFilters();
                    });
                    paginationToDoContainer.appendChild(btnPage);
                }
            }

            const btnLastPage = document.createElement('li');
            btnLastPage.classList = 'page-item';

            if(page == maxPages)btnLastPage.classList.add('disabled');

            btnLastPage.innerHTML = `<a class="page-link" href="#">&raquo;</a>`;

            btnLastPage.addEventListener('click', (e)=> {
                toDos.currentPage = maxPages;
                toDos.toDoFilters();
            });

            paginationToDoContainer.appendChild(btnLastPage);
        }

    }

}


/* Fetch dei todo-list con controllo in caso di errori con il server */
async function fetchToDos(){
    try{
        const fetchToDo = await fetch('https://jsonplaceholder.typicode.com/todos');
        if(!fetchToDo.ok){
             throw new errorFetchObject(fetchToDo.status, fetchToDo.statusText);
        }
        let json = await fetchToDo.json();
        localStorage.setItem('toDoS', JSON.stringify(json));

        toDosArrStorange.push(...json);
        toDos = new toDoCreator(toDosArrStorange);
    }catch(err){
        console.log(err)
    }
}

/* Fetch error creator in caso di bad response */
class errorFetchObject{
    constructor(fetchErrorCode = 0, fetchErrorMessage = ""){
        this.errorCode = fetchErrorCode;
        this.errorMessage = fetchErrorMessage;
        this.errorFetchCreator();
    }

    errorFetchCreator(){
        const errorContainer = document.createElement('div');
        errorContainer.classList = "fetch-error-container container-fluid mt-5";
        errorContainer.innerHTML = `
        <div class="fetch-error-content">
            <div class="fetch-error-emoji">&#128565;</div>
            <div class="fetch-error-message">
                <span>Oops!</span>
                <span>Somethings is wrong.</span>
            </div>
            <div class="fetch-error-code">
                <span>Error: ${this.errorCode} ${this.errorMessage}</span>
            </div>
        </div>
        `
        document.getElementById('containerMain').remove();
        document.body.appendChild(errorContainer);
    }
}

/* Controllo dell'esistenza dei todos-list in local storange */
if(localStorage.getItem('toDoS') != null){
    toDosArrStorange = JSON.parse(localStorage.getItem('toDoS'));
    toDos = new toDoCreator(toDosArrStorange);
}else{
    fetchToDos();
}


/* Search function il quale si occupa di filtrare i todo con il valore passato nella searchbar */
document.getElementById('search-todo').addEventListener('keyup', ()=>{
    toDos.toDoSearch();
});


/* Filtra i todo mettendoli in ordine di completed */
document.querySelectorAll('.filter-buttons').forEach(element => {
    element.addEventListener('click', (e)=>{
        const filterTarget = e.target.dataset.filter;

        if(e.target.classList.contains('clicked')){
            e.target.classList.remove('clicked');
            toDos[filterTarget]= false;
            toDos.currentPage = 1;
            toDos.toDoSearch();
        }else{
            e.target.classList.add('clicked');

            if(filterTarget == 'filterShowTrue'){
                toDos.filterShowFalse = false;
                toDos.filterOrderTrue = false;
                document.getElementById('btnFilterShowFalse').classList.remove('clicked');
                document.getElementById('btnFilterOrderTrue').classList.remove('clicked');
            }

            if(filterTarget == 'filterShowFalse'){
                toDos.filterShowTrue = false;
                toDos.filterOrderTrue = false;
                document.getElementById('btnFilterShowTrue').classList.remove('clicked');
                document.getElementById('btnFilterOrderTrue').classList.remove('clicked');
            }

            if(filterTarget == 'filterOrderTrue'){
                toDos.filterShowTrue = false;
                toDos.filterShowFalse = false;
                document.getElementById('btnFilterShowTrue').classList.remove('clicked');
                document.getElementById('btnFilterShowFalse').classList.remove('clicked');
            }

            toDos[filterTarget] = true;
            toDos.currentPage = 1;
            toDos.toDoFilters();
        }

    });
});