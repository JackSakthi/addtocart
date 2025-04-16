
let iconcart=document.querySelector('#icon-cart');
let iconccart=document.querySelector('.closee');

let body=document.querySelector('body');
let closecart=document.querySelector('.close');
var result=document.getElementById("items");
let listproduct = document.querySelector('.items');
let listcarthtml = document.querySelector('.listcart');
let iconcartspan= document.querySelector('.icon-cart');

let listproducts = [];
let carts = [];

iconcart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
})
iconccart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
})
closecart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
    
})

const addDataToHTML = () => { 
listproduct.innerHTML = '';
if (listproducts.length > 0) {
listproducts.forEach(product => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.dataset.id = product.id; 

    itemDiv.innerHTML = `
        <img src="${product.img}" alt="">
        <h2>${product.ttl}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">Add to Cart</button>
    `;

    listproduct.appendChild(itemDiv);
});
}
};


listproduct.addEventListener('click', (event)=>{
let positionClick = event.target;
if(positionClick.classList.contains('addCart')){
let product_id = positionClick.parentElement.dataset.id;
addtocart(product_id);
}
});

const addtocart = (product_id)=>{
let positionthisproductincart = carts.findIndex((value)=>value.product_id == product_id);
if(carts.length<=0){
carts= [{
    product_id: product_id,
    quantity: 1
}]
}
else if (positionthisproductincart < 0 ){
carts.push({
    product_id: product_id,
    quantity: 1
});
}
else{
carts[positionthisproductincart].quantity = carts[positionthisproductincart].quantity + 1;
}

addCarthtml();
addcarttomemory();
}
const addcarttomemory = () => {
localStorage.setItem('cart', JSON.stringify(carts));
};

const addCarthtml = () => {
listcarthtml.innerHTML = '';
let totalquantity = 0;

if (carts.length > 0) {
carts.forEach(cart => {
    totalquantity += cart.quantity;

    let newCart = document.createElement('div');
    newCart.classList.add('item');
    newCart.dataset.id = cart.product_id;

    let positionproduct = listproducts.findIndex(value => value.id == cart.product_id);
    let info = listproducts[positionproduct];

    newCart.innerHTML = `
        <div class="image">
            <img src="${info.img}" alt="">
        </div>
        <div class="name">
            ${info.ttl}
        </div>
        <div class="totalprice">
            $${info.price * cart.quantity}
        </div>
        <div class="quantity">    
         <span class="minu">-</span>
         <span>${cart.quantity}</span>
         <span class="plus">+</span>
        
        </div>
    `;

    listcarthtml.appendChild(newCart);
});
}

iconcartspan.innerText = totalquantity;
};

listcarthtml.addEventListener('click', (event) => {
let positionclick = event.target;
if (positionclick.classList.contains('minu') || positionclick.classList.contains('plus')) {
let parentWithId = positionclick.closest('[data-id]');
if (parentWithId) {
    let product_id = parentWithId.dataset.id;
    let type="minu";
    if(positionclick.classList.contains('plus')){
        type = "plus";
    }
    changeQuantityCart(product_id,type)
}
}
});


const changeQuantityCart = (product_id, type) => {
let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
if (positionItemInCart >= 0) {
let info = carts[positionItemInCart];
switch (type) {
    case 'plus':
        carts[positionItemInCart].quantity += 1;
        break;
    default:
        let changeQuantity = carts[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
            carts[positionItemInCart].quantity = changeQuantity;
        } else {
            carts.splice(positionItemInCart, 1);
        }
        break;
}
}
addCarthtml();
addcarttomemory();
}


const initApp=()=>{
    fetch('db.json')
    .then(response => response.json())
    .then(data =>{
        listproducts = data;
        addDataToHTML();


        if (localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart'));
        addDataToHTML();
    }
    })
}

initApp();














