let Home_Category_Place = document.querySelector('.home-big-category1');
let Home_Category_Place2 = document.querySelector('.home-big-category2');
let Cat_data = []

function get_home_categories() {
	axios.get(BASE_URL+"/get-category/").then((res)=>{
		console.log(res.data);
		Cat_data = res.data
		let box = ''
		let next_box = ''
		let next_last_box = ''
		res.data?.map((item,index)=>{
			box+=`
			<div class="col-md-4">
				<div class="card">
					<div class="cover item-a" style="background-image:url(${BASE_URL_MEDIA + item.photo})">
						<div class="arrowing">
								<span></span>
								<span></span>
								<span></span>
						</div>
						<h1>${item.name} </h1>
						<div class="card-back">
							<!-- <button><span>Mahsulotlar</span></button> -->
							<a  onclick="put_category_id(${item.id})">Mahsulotlar >></a>
						</div>
					</div>
				</div>
			</div>
			`
			next_box+=`
			<div class="carding">
				<div class="img-container">
					<img src=${BASE_URL_MEDIA + item.photo} alt=""/>
				</div>
				<div class="carding-details">
					<h2>${item.name}</h2>
					<b>${item.slogan}</b>
					<p>Buyurtma berish uchun quyidani tugmani bosing</p>
					<button class="btn" style="margin-top: 30px;" onclick="put_category_id(${item.id})">Buyurtma berish</button>
				</div>
			</div>
			`
			next_last_box+=`
			<div class="wrappering-cat">
				<div class="banner-image" style='background-image:url(${BASE_URL_MEDIA + item.photo})'> </div>
					<h1> ${item.name}</h1>
					<p>${item.slogan}</p>
				
				<div class="button-wrappering"> 
					<button onclick="put_category_id(${item.id})" class="btning fill">Buyurtma berish</button>
				</div>
			 </div>
			`
		})

		Home_Category_Place.innerHTML = next_last_box
		// Home_Category_Place2.innerHTML = next_box 
	})
}

function put_category_id(category_id) {

	let Finded = Cat_data.find((item,index)=>{
		return item.id == category_id
	})
	localStorage.setItem("category_id",category_id);
	localStorage.setItem("cat_name",Finded?.name);
	
	
	window.location.href = 'sub-category.html'
}


get_home_categories()