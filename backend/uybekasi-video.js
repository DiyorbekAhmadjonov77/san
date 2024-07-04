//http://127.0.0.1:8000/api/get-category/
let Home_Uybekasi_Place = document.querySelector('.uybekasi-place-1');
let Home_Uybekasi_Place2 = document.querySelector('.uybekasi-place-2');

function get_home_categories() {
	axios.get(BASE_URL+"/get-about-us/").then((res)=>{
		// console.log(res.data);
		let box = `
		<div class="choose-left">
			<h3>${res?.data?.title}</h3>
			<p>${res?.data?.text}</p>
			<div class="row">
				<div class="col-lg-6">
					<ul class="list">
						${
							res?.data?.info?.slice(0,3)?.map((item,index)=>{
								return `<li><i class="fa fa-caret-right"></i>${item?.text}</li>`
							}).join("")
					 	}
					</ul>
				</div>
				<div class="col-lg-6">
					<ul class="list">
					${
						res?.data?.info?.slice(3,6)?.map((item,index)=>{
							return `<li><i class="fa fa-caret-right"></i>${item?.text}</li>`
						}).join("")
					 }
					</ul>
				</div>
			</div>
		</div>
		`
		let box2 = `
		<div class="choose-right" style="background-image:url('${BASE_URL_MEDIA + res?.data?.bg_image}')">
			<div class="video-image" >
				<!-- Video Animation -->
				<div class="promo-video">
					<div class="waves-block">
						<div class="waves wave-1"></div>
						<div class="waves wave-2"></div>
						<div class="waves wave-3"></div>
					</div>
				</div>
				<!--/ End Video Animation -->
				<a href="${BASE_URL_MEDIA + res?.data?.video}" class="video video-popup mfp-iframe">
					<i class="fa fa-play"></i>
				</a>
			</div>
		</div>
		`

		Home_Uybekasi_Place.innerHTML = box
		Home_Uybekasi_Place2.innerHTML = box2
	})
}


function list_uybakesi_desc() {
	
}


get_home_categories()