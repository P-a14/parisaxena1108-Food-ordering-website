let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const deliveryCharges = 50;
const menuItems = [
  { name:"Noodles", price:180, img:"images/noodles.jpg" },
  { name:"French Fries", price:100, img:"images/french-fries.jpg" },
  { name:"Chocolate Cake", price:150, img:"images/chocolate-cake.jpg" },
  { name:"Momos", price:120, img:"images/momos.jpg" },
  { name:"Grilled Sandwich", price:140, img:"images/sandwich.jpg" },
  { name:"Masala Dosa", price:130, img:"images/masala-dosa.jpg" },
  { name:"Paneer Tikka", price:260, img:"images/paneer-tikka.jpg" },
  { name:"Pizza", price:220, img:"images/veg-pizza.jpg" },
  { name:"Spring Rolls", price:160, img:"images/spring-rolls.jpg" },
  { name:"White Sauce Pasta", price:200, img:"images/white-sauce-pasta.jpg" }
];
function showSection(section){
  const main = document.getElementById("mainContent");
  main.innerHTML="";
  if(section==="home"){
    main.innerHTML=`
      <div class="hero">
        <div class="hero-content">
          <h1>Delicious Food Delivered Fast</h1>
          <p>Order your favorite meals instantly</p>
          <button onclick="showSection('menu')">Explore Menu</button>
        </div>
      </div>`;
  }
  if(section==="menu"){
    const grid = document.createElement("div");
    grid.className="menu-grid";
    menuItems.forEach(item=>{
      const card=document.createElement("div");
      card.className="food-card";
      card.innerHTML=`
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.name}',${item.price})">Add to Cart</button>`;
      grid.appendChild(card);
    });
    main.appendChild(grid);
  }

  if(section==="cart"){
    if(cart.length===0){ main.innerHTML="<h2 style='text-align:center'>Cart is empty</h2>"; return; }
    cart.forEach((item,index)=>{
      const div=document.createElement("div");
      div.className="food-card";
      div.innerHTML=`
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>`;
      main.appendChild(div);
    });

    const subtotal = cart.reduce((sum,i)=>sum+i.price,0);
    const total = subtotal + deliveryCharges;

    const checkout = document.createElement("div");
    checkout.className="checkout";
    checkout.innerHTML=`
      <h3>Subtotal: ₹${subtotal}</h3>
      <h3>Delivery Charges: ₹${deliveryCharges}</h3>
      <h3 class="total">Total: ₹${total}</h3>
      <button onclick="confirmPayment()">Order Now & Pay</button>`;
    main.appendChild(checkout);
  }

  if(section==="orders"){
    main.innerHTML="<h1>Your Orders</h1>";
    if(orders.length===0){ main.innerHTML+="<h2 style='text-align:center'>No orders yet</h2>"; return; }
    
    orders.forEach(order=>{
      const div=document.createElement("div");
      div.className="food-card";

      let itemsList="";
      order.items.forEach(i=>{
        itemsList+=`<div>${i.name} - ₹${i.price}</div>`;
      });

      div.innerHTML=`
        <h3>Order Date: ${order.date}</h3>
        ${itemsList}
        <div>Subtotal: ₹${order.subtotal}</div>
        <div>Delivery Charges: ₹${order.deliveryCharges}</div>
        <div><strong>Total: ₹${order.total}</strong></div>`;

      main.appendChild(div);
    });
  }

  if(section==="help"){ main.innerHTML="<h1 style='text-align:center'>Help Center</h1><p style='text-align:center'>Contact us at support@tastybites.com</p>"; }
  if(section==="about"){ main.innerHTML="<h1 style='text-align:center'>About TastyBites</h1><p style='text-align:center'>We deliver fresh and delicious food quickly.</p>"; }
}
function addToCart(name,price){
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert(name+" added to cart");
}

function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  showSection("cart");
}

function confirmPayment(){
  if(cart.length===0){ alert("Cart empty!"); return; }
  const subtotal = cart.reduce((sum,i)=>sum+i.price,0);
  const total = subtotal + deliveryCharges;
  const orderDate = new Date().toLocaleString();
  
  const newOrder = {
    date: orderDate,
    items: [...cart],
    subtotal: subtotal,
    deliveryCharges: deliveryCharges,
    total: total
  };

  orders.push(newOrder);
  localStorage.setItem("orders",JSON.stringify(orders));

  cart = [];
  localStorage.setItem("cart",JSON.stringify(cart));

  alert("Order placed successfully!");
  showSection("orders");
}

window.onload=()=>showSection("home");