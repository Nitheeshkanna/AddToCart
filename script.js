let butcart=document.querySelector('.cart-menu');
let cartadd=document.querySelector('.cart');
let cartbutremove=document.querySelector('.cart-remove');

butcart.addEventListener('click',()=>{
	cartadd.classList.add('cart-active')
});

cartbutremove.addEventListener('click',()=>{
	cartadd.classList.remove('cart-active')
});





document.addEventListener('DOMContentLoaded',loadproduct);

function loadproduct()
{
	loadcontent();
}


function loadcontent()
{
	let butremove =document.querySelectorAll('#trash');

	butremove.forEach((but)=>{
		but.addEventListener('click',removeitem)
	});

	let qtyelement=document.querySelectorAll('.quantity')
	qtyelement.forEach((input)=>{
		input.addEventListener('change',changeQty);
	});

	let cartbutton=document.querySelectorAll('#poroduct-cart')
	cartbutton.forEach((carton)=>{
		carton.addEventListener('click',addcart)
	});

	let orders=document.querySelector('.btn-buy');

	orders.addEventListener('click',placeorder);

	updatetotal();
}

function placeorder()
{
	if (confirm('Your Order Has been Placed')) {
		console.log("Thank You");
	}
}


function removeitem()
{
	if(confirm('Are you Sure to Remove')){
		let title=this.parentElement.querySelector('.cart-dress-title').innerHTML;
		itemlist=itemlist.filter(el=>el.title!=title);
		this.parentElement.remove();
		loadcontent();
	}
}

function changeQty()
{
	if(isNaN(this.value) || this.value<1)
	{
		this.value =1;
	}
	loadcontent();
}

let itemlist=[];

function addcart()
{
	let a=this.parentElement;
	//console.log(a);

	let title=a.querySelector('#product-name').innerHTML;
	let price=a.querySelector('.product-price').innerHTML;
	let imgsrc=a.querySelector('.pic').src;

	//console.log(title,price,imgsrc);

	let newproduct={title,price,imgsrc}

	let newproductel=createcartproduct(title,price,imgsrc);

	let newElement=document.createElement('div')
	newElement.innerHTML=newproductel;
	let cartbasket=document.querySelector('.cart-content');
	cartbasket.append(newElement);

	loadcontent();
	
}



function createcartproduct(title,price,imgsrc)
{
	return`
	<dvi class="cart-box">
						<img src="${imgsrc}" class="cart-img">
						<div class="detail-box">
							<div class="cart-dress-title">${title}</div>
							<div class="price-box">
								<div class="cart-price">${price}</div>
								 <div class="cart-amt">${price}</div>
							</div>
							<input type="number" value="1" class="quantity">
						</div>
						<ion-icon name="trash" id="trash"></ion-icon>		
					</dvi>`;
}


function updatetotal()
{
	const cartitem =document.querySelectorAll('.cart-box');
	const totalvalue =document.querySelector('.total-price');

	let total=0;

	cartitem.forEach(product=>{
		let priceEle=product.querySelector('.cart-price');
		let price=parseFloat(priceEle.innerHTML.replace("Rs.",""));
		let qty=product.querySelector('.quantity').value;
		total+=(price*qty);
		product.querySelector('.cart-amt').innerText="Rs."+price*qty;
	});

	totalvalue.innerHTML='Rs.'+total;
}