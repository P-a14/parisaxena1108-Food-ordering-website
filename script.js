let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const deliveryCharge = 50;
const menuItems = [
{ name:"Noodles", price:180, rating:"4.4", time:"20 min", img:"images/noodles.jpg", category:"main" },
{ name:"French Fries", price:100, rating:"4.3", time:"15 min", img:"images/french-fries.jpg", category:"snacks" },
{ name:"Chocolate Cake", price:150, rating:"4.6", time:"25 min", img:"images/chocolate-cake.jpg", category:"dessert" },
{ name:"Momos", price:120, rating:"4.5", time:"20 min", img:"images/momos.jpg", category:"snacks" },
{ name:"Grilled Sandwich", price:140, rating:"4.4", time:"15 min", img:"images/sandwich.jpg", category:"snacks" },
{ name:"Masala Dosa", price:130, rating:"4.6", time:"25 min", img:"images/masala-dosa.jpg", category:"main" },
{ name:"Paneer Tikka", price:260, rating:"4.7", time:"30 min", img:"images/paneer-tikka.jpg", category:"main" },
{ name:"Pizza", price:220, rating:"4.6", time:"30 min", img:"images/veg-pizza.jpg", category:"main" },
{ name:"Spring Rolls", price:160, rating:"4.4", time:"20 min", img:"images/spring-rolls.jpg", category:"snacks" },
{ name:"White Sauce Pasta", price:200, rating:"4.5", time:"25 min", img:"images/white-sauce-pasta.jpg", category:"main" }
];

function updateCartCount() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = document.getElementById("cartCount");
  if (count) {
    count.textContent = cart.length;
  }
}

function addToCart(name, price) {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert(name + " added to cart!");

  showRecommended(name);
}



function removeFromCart(index) {

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
  updateCartCount();
}


function loadMenu() {

  const container = document.getElementById("menuContainer");

  if (!container) return;

  container.innerHTML = "";

  menuItems.forEach(item => {

    container.innerHTML += `
    <div class="menu-card">

      <img src="${item.img}" alt="${item.name}">

      <div class="menu-info">

        <h3>${item.name}</h3>

        <p class="menu-price">₹${item.price}</p>

        <button onclick="addToCart('${item.name}', ${item.price})">
        Add to Cart
        </button>

      </div>

    </div>
    `;
  });
}

  function loadCart(){

cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartItems");

if(!container) return;

container.innerHTML="";

if(cart.length===0){
container.innerHTML="<h2 style='text-align:center'>Cart Empty</h2>";
return;
}

let subtotal=0;

cart.forEach((item,index)=>{

subtotal+=item.price;


let imgName = item.name.toLowerCase().replace(/ /g,"-");

container.innerHTML+=`
<div class="food-card">

<img src="images/${imgName}.jpg" class="cart-img">

<h3>${item.name}</h3>

<div class="rating">
 4.5 |  20-30 min
</div>

<p class="price">₹${item.price}</p>

<button onclick="removeFromCart(${index})">Remove</button>

</div>
`;
});

const total=subtotal+deliveryCharge;

container.innerHTML+=`
<div class="checkout">

<h3>Subtotal : ₹${subtotal}</h3>

<h3>Delivery : ₹${deliveryCharge}</h3>

<h3>Total : ₹${total}</h3>

<button onclick="confirmPayment()">Place Order</button>

</div>
`;
}


function confirmPayment() {

cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {

alert("Cart is empty!");

return;
}

const subtotal =
cart.reduce((sum, item) => sum + item.price, 0);

const total = subtotal + deliveryCharge;

const date = new Date().toLocaleString();

const newOrder = {

date: date,

items: cart,

subtotal: subtotal,

deliveryCharges: deliveryCharge,

total: total
};

orders = JSON.parse(localStorage.getItem("orders")) || [];

orders.push(newOrder);

localStorage.setItem("orders", JSON.stringify(orders));

localStorage.removeItem("cart");

cart = [];

updateCartCount();

alert("Order placed successfully!");

window.location.href = "orders.html";
}


 function loadOrders(){

orders = JSON.parse(localStorage.getItem("orders")) || [];

const container = document.getElementById("ordersList");

if(!container) return;

container.innerHTML="";

if(orders.length===0){
container.innerHTML="<h2 style='text-align:center'>No orders yet</h2>";
return;
}

orders.forEach(order=>{

let itemsHTML="";

order.items.forEach(item=>{

let imgName = item.name.toLowerCase().replace(/ /g,"-");

itemsHTML+=`

<div class="order-item">

<img src="images/${imgName}.jpg" class="order-img">

<div class="order-info">
<h3>${item.name}</h3>

<div class="rating">
 4.5 |  20-30 min
</div>

<p>₹${item.price}</p>

</div>

</div>
`;
});

container.innerHTML+=`

<div class="order-card">

<div class="order-header">
 Order Date: ${order.date}
</div>

${itemsHTML}

<div class="order-summary">

<p>Subtotal : ₹${order.subtotal}</p>

<p>Delivery : ₹${order.deliveryCharges}</p>

<h3>Total : ₹${order.total}</h3>

<div class="order-status">
  
 Order Completed      
Thank you for ordering from FlavorNest!
</div>

</div>

</div>

`;

});

}



window.onload = function () {

  updateCartCount();

  if (document.getElementById("menuContainer")) {
    loadMenu();
  }

  if (document.getElementById("cartItems")) {
    loadCart();
  }

  if (document.getElementById("ordersList")) {
    loadOrders();
  }

};

function showRecommended(itemName){

const container = document.getElementById("recommendedItems");

if(!container) return;

container.innerHTML="<h2 style='text-align:center'>Recommended for You</h2>";

const recommendations = menuItems.filter(item => item.name !== itemName).slice(0,3);

recommendations.forEach(item =>{

container.innerHTML += `
<div class="menu-card">

<img src="${item.img}">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<button onclick="addToCart('${item.name}',${item.price})">
Add to Cart
</button>

</div>
`;

});

}

function searchFood(){

let input = document.getElementById("searchInput").value.toLowerCase();

let container = document.getElementById("searchResults");

container.innerHTML="";

if(input==="") return;

const results = menuItems.filter(item =>
item.name.toLowerCase().includes(input)
);

results.forEach(item =>{

container.innerHTML += `

<div class="food-card">

<img src="${item.img}" alt="${item.name}">

<h3>${item.name}</h3>

<p> ${item.rating} |  ${item.time}</p>

<p>₹${item.price}</p>

<button onclick="addToCart('${item.name}',${item.price})">
Add to Cart
</button>

</div>

`;

});

}

function filterFood(category){

const container = document.getElementById("menuContainer");

if(!container) return;

container.innerHTML="";

let filteredItems;

if(category === "all"){
filteredItems = menuItems;
}
else{
filteredItems = menuItems.filter(item => item.category === category);
}

filteredItems.forEach(item => {

container.innerHTML += `
<div class="menu-card">

<img src="${item.img}" alt="${item.name}">

<div class="menu-info">

<h3>${item.name}</h3>

<p class="menu-price">₹${item.price}</p>

<p> ${item.rating} |  ${item.time}</p>

<button onclick="addToCart('${item.name}', ${item.price})">
Add to Cart
</button>

</div>

</div>
`;

});

}