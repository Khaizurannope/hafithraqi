let thisPage = 1;
let limit = 6;
let list = document.querySelectorAll('.list .item');

function loadItem(){
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key)=>{
        if(key >= beginGet && key <= endGet){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
    listPage();
}
loadItem();

function listPage(){
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if(thisPage != 1){
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPage){
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if(thisPage != count){
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}
function changePage(i){
    thisPage = i;
    loadItem();
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        const pagination = document.getElementById('pagination');

        // Function to create a product item
        function createProductItem(product) {
            const item = document.createElement('div');
            item.className = 'item';

            item.innerHTML = `
                <div class="img">
                    <img src="${product.img}">
                </div>
                <div class="content">
                    <div class="title">${product.title}</div>
                    <div class="des">${product.description}</div>
                    <div class="price">${product.price}</div>
                    <button class="add">Add to cart</button>
                </div>
            `;

            return item;
        }

        // Function to create pagination link
        function createPaginationLink(pageNumber) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = pageNumber;
            li.appendChild(link);
            return li;
        }

        // Display products and pagination
        const itemsPerPage = 6; // Adjust as needed
        const totalPages = Math.ceil(data.length / itemsPerPage);

        for (let i = 0; i < totalPages; i++) {
            const startIndex = i * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const productsOnPage = data.slice(startIndex, endIndex);

            productsOnPage.forEach(product => {
                const productItem = createProductItem(product);
                productList.appendChild(productItem);
            });

            const paginationLink = createPaginationLink(i + 1);
            pagination.appendChild(paginationLink);
        }
    })
    .catch(error => console.error('Error fetching data:', error));
