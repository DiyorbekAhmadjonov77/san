let Purchasing_Div = document.getElementById('purchasing-products');
let FormIsm = document.getElementById('ism-id');
let FormTel1 = document.getElementById('phone-id');
let FormTel2 = document.getElementById('extra-phone-id');
let FormLocation = document.getElementById('location-id');
let FormComment = document.getElementById('comment-id');
let Savatch_Submit_Btn = document.getElementById("savatcha_submit_btn")
let Delivery_Place  = document.querySelector(".delivery-locations-container")

let PRICE = 0
let WEIGHT = 0
let LOCATIONs_ID = null
let USER_LAT = null
let USER_LNG = null
let is_should_Deliver = true

  
const Purchase = async (e) => {

	
	
	let ITEMS = new Array()
	for (let i = 0; i < Purchasing_Products.length; i++) {
		const element = Purchasing_Products[i];
		
		ITEMS.push({
			product_id:element.id,
			piece:false,
			quantity:element.count,
			color_id:element.item_color
		})
	}

	
	if(Purchasing_Products.length != 0){

		if(FormIsm.value != "" || FormTel1.value != "" || FormTel2.value != "" || FormLocation.value !="" || FormComment.value !=''){
			Savatch_Submit_Btn.disabled = true
			Savatch_Submit_Btn.textContent = "Tasdiqlanmoqda..."
			// console.log("items",ITEMS)
			// console.log("full_name",FormIsm.value)
			// console.log("phone",FormTel1.value)
			// console.log("extra_phone",FormTel2.value)
			// console.log("address",FormLocation.value)
			// console.log("message",FormComment.value)
			// console.log("deliver",is_should_Deliver)
			// console.log("lat",USER_LAT)
			// console.log("lng",USER_LAT)
			// console.log("location_id",LOCATIONs_ID)


			let backend_data = {
				full_name:FormIsm.value,
				phone:FormTel1.value,
				extra_phone:FormTel2.value,
				address:FormLocation.value,
				message:FormComment.value,
				delivery:is_should_Deliver,
				items:ITEMS
			}

			if(is_should_Deliver){
				backend_data.lat = USER_LAT
				backend_data.lng = USER_LNG
			}else{
				backend_data.location_id = LOCATIONs_ID
			}

			axios.post(BASE_URL + "/create-order/",backend_data).then((res)=>{
				// console.log(res)
				Savatch_Submit_Btn.disabled = false
				Savatch_Submit_Btn.textContent = "Buyurtma berish"
				if(res.data.success){
					Swal.fire({
						title: "Muvaffaqiyat",
						text: "Buyurtmangiz qabul qilindi",
						icon: "success"
					});
					localStorage.setItem("products_for_purchase",JSON.stringify([]))
					Purchasing_Products = [];
					PRICE = 0
					LOCATIONs_ID = null
					USER_LAT = null
					USER_LNG = null
					setTimeout(() => {
						window.location.href = 'index.html'
					}, 2000);
				}else{
					Swal.fire({
						title: "Xatolik",
						text: "Qandaydur hatolik iltimos admin bilan bog'laning",
						icon: "warning"
					});
				}
			})
		}else{
			alert("Iltimos barcha maydonlarni to'ldiring")
		}


	}else{
		alert("Biror bir mahsulot xarid qiling")
	}
	
};
  


function initial() {
	let text = '';

	Purchasing_Products.forEach(item => {
		text+=`
			<li class="p-cart list-group-item">
				<div class='p-main-div'>
					<img src=${BASE_URL_MEDIA + item.photo} class="p-cart-img" alt="">
					<div class="p-description">
						<h2>${item.name}</h2> 
						<p id='p-vazn'>Vazni: ${item.count*item.weight*item.quantity_in_box}kg Rangi: 
						<button class='p_chosen_color' style="background-color:${item.item_color_name}"></button> </p>
					</div>
				</div>
				<div class="p-actions">
					<div class='card-action'>
						<button onclick='counter_minus(${item.id},${item.item_color})'>-</button>
						<input type='number' onkeyup="cart_inp_change(this,${item.item_color},${item.id})" value="${item.count}" id='main-count-${String(item.id)+String(item.item_color)}'>
						<button onclick='counter_plus(${item.id},${item.item_color})'>+</button>
					</div>
					<p class='p-price' id='main-price-${String(item.id)+String(item.item_color)}' >${format_num(item.price_per_box * item.count)} so'm</p>
				</div>
			</li>
		`
	});

	Purchasing_Div.innerHTML = text.length == 0 ? "<h3 class='empty-cart'>Savatcha bo'sh...🍵</h3>" : text
}


function counter_plus(p_id,p_color) {
	let Inp = document.querySelector(`#main-count-${String(p_id)+ String(p_color)}`)
	Inp.value= Inp.value*1+1
	// console.log(p_id,p_color,Inp)
	updateProductCount(p_id, p_color, Inp)
	
}

function counter_minus(p_id,p_color) {
	let Inp = document.querySelector(`#main-count-${String(p_id)+ String(p_color)}`)
	Inp.value=Inp.value*1-1
	// console.log(p_id,p_color,Inp)
	
	

	if(Inp.value == '0'){
		Purchasing_Products = Purchasing_Products.filter(product => !(product.id === p_id && product.item_color === p_color));
    	localStorage.setItem("products_for_purchase", JSON.stringify(Purchasing_Products));
		initial()
	}else{
		updateProductCount(p_id, p_color, Inp)
	}

}

function cart_inp_change(cart_counter,p_color,p_id) {
	
	// console.log(cart_counter,p_color,p_id)
	if(cart_counter.value*1<0){
		cart_counter.value = cart_counter.value*-1
	}

	if(cart_counter.value == '0'){
		Purchasing_Products = Purchasing_Products.filter(product => !(product.id === p_id && product.item_color === p_color));
    	localStorage.setItem("products_for_purchase", JSON.stringify(Purchasing_Products));
		initial()
	}else{
		updateProductCount(p_id, p_color, cart_counter,true)
	}
}

function updateProductCount(p_id, p_color, Inp,is_change) {
    const productIndex = Purchasing_Products.findIndex(product => product.id === p_id && product.item_color === p_color);

    if (productIndex !== -1) {
        Purchasing_Products[productIndex].count = parseInt(Inp.value == "" ? 0 : Inp.value, 10);

        console.log(`Updated product with id ${p_id} and color ${p_color} count to ${Inp.value}`);
    } else {
        console.log(`Product with id ${p_id} and color ${p_color} not found`);
    }

    localStorage.setItem("products_for_purchase", JSON.stringify(Purchasing_Products));
	if(is_change){
		let allprice_place = document.getElementById(`main-price-${String(p_id)+ String(p_color)}`)
		allprice_place.textContent = format_num(Purchasing_Products[productIndex].count*Purchasing_Products[productIndex].price_per_box) + "so'm"
	}else{
		initial()

	}
	all_price()
}


let Tabing1 = document.getElementById("tabings-1")
let Tabing2 = document.getElementById("tabings-2")



function Choosing_Del_option(option) {
	if(option === 1){
		Tabing1.style.display = 'flex'
		Tabing2.style.display = 'none'
		is_should_Deliver = true
	}else{
		Tabing2.style.display = 'flex'
		Tabing1.style.display = 'none'
		is_should_Deliver = false
	}
}
Choosing_Del_option(1)

function get_locations(params) {
	axios.get(BASE_URL + "/get-locations/").then((res)=>{
		// console.log(res)
		let box = ''

		res?.data?.map((item,index)=>{
			box+=`
				<label for="mainid${item.id}" class="delivery-locations" onclick='set_location_id(${item.id})'>
					<input type="radio" value='${item.id}' name="choose-location" id="mainid${item.id}">
					<div>
						<h3>${item.name}</h3>
						<p>${item.address}</p>
					</div>
				</label>
			`
		})
		Delivery_Place.innerHTML = box
	})
}
get_locations()


function set_location_id(location_id) {
	LOCATIONs_ID = location_id
}

function all_price() {
	let all_sum = new Array();
	let all_weight = new Array();

	Purchasing_Products.forEach((a)=>{
		all_sum.push(a?.count*a?.price_per_box)
	})
	Purchasing_Products.forEach((a)=>{
		all_weight.push(a?.count*a?.quantity_in_box*a?.weight)
	})

	let reduced_sum = all_sum.reduce((a,b)=>{
		return a+b
	})
	let reduced_weight = all_weight.reduce((a,b)=>{
		return a+b
	})

	PRICE = reduced_sum
	WEIGHT = reduced_weight
	document.getElementById('price_all').textContent = format_num(PRICE) + " s'om"
	document.getElementById('weight_all').textContent = format_num(WEIGHT) + " kg"
}
 
initial()
all_price()