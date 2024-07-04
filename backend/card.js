let Products = document.getElementById("products")
let Cart_Count = document.getElementById("savatcha-count")
let Cart_Count1 = document.querySelector(".savatcha-count")
let Purchasing_Products = JSON.parse(localStorage.getItem("products_for_purchase")) || [];

let COUNT = 1
let Sub_Category_ID = localStorage.getItem("sub_category_id")

let Products_Data = []






function ShoworDont() {
	if(Purchasing_Products.length === 0){
		Cart_Count.style.display = 'none'
		Cart_Count1.style.display = 'none'
	}else{
		Cart_Count.style.display = 'flex'
		Cart_Count.innerText = Purchasing_Products.length
		Cart_Count1.style.display = 'flex'
		Cart_Count1.innerText = Purchasing_Products.length
	}
}









function init() {
	let text = ""

	axios.get(BASE_URL + `/get-product/${Sub_Category_ID}/`).then((res)=>{
		
		console.log("cards",res)
		Products_Data = res.data
		res.data?.forEach((item,index)=>{
			text+=`
				<div class='samara-card'>
					<img src=${BASE_URL_MEDIA + item.photo[0]?.photo} class='card-img'>
					<h2>${item.name	}</h2>

					<div type='circle' class='my-list'>
						<li>Blogdagi soni: ${item.quantity_in_box}ta</li>
						<li>Bir dona narxi: ${format_num(item.price_per_peace)} so'm</li>
					</div>
					<span class="badge badge-primary mybadge">${item.category.name}</span>
					<div class='actions'>
						<p class='rating'> 
							${format_num(item.price_per_box)} so'm <span class='narxi-blog'>/ Blog narxi</span>
						</p>
						
					</div>
					<div class='card-center'>
						<button data-toggle="modal" data-target="#exampleModalCenter" class='purchase-btn btn' onclick='Open_Detail_Modal(${item.id})'><i class="icofont-cart" style="font-size:20px;margin-top:-3px"></i> Savatchaga solish</button>
					</div>
				</div>
			`
		})
	
		Products.innerHTML = text
	})	

	
}

function format_num(number) {
    let numberString = number.toString();
    numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return numberString;
}


init()
ShoworDont()