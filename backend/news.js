let Home_News_Place = document.querySelector('.yangiliklar-place');

function get_new_products() {
	axios.get(BASE_URL+"/get-all-news/").then((res)=>{
		console.log(res.data);
		let box = ''
		
		res.data?.map((item,index)=>{
			box+=`
				<div class="swiper-slide yangiliklar-swiper" >
					<div class="single-pf">
						<img src="${BASE_URL_MEDIA + item.photo}" alt="#">
						<a href="detail.html" onclick="batafsiling(${item.id})" class="btn">Batafsil</a>
					</div>
				</div>
			`
			
		})

		Home_News_Place.innerHTML = box
		var swiper = new Swiper(".news-swiper", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true, 
			autoplay: {
				delay: 1000, 
				disableOnInteraction: false,  
			},
			breakpoints: {
				'@0.35': {
				  slidesPerView: 1,
				  spaceBetween: 20,
				},
				'@1.00': {
				  slidesPerView: 2,
				  spaceBetween: 40,
				},
				'@1.50': {
				  slidesPerView: 3,
				  spaceBetween: 50,
				},
				'@2.00': {
					slidesPerView: 4,
					spaceBetween: 50,
				},
			  }
		});
	})
}


function batafsiling(news_id) {
	localStorage.setItem('news_id',news_id)
}

get_new_products()

var swiper = new Swiper(".news-swiper", {
	slidesPerView: 4,
	spaceBetween: 30,
	loop: true, 
	autoplay: {
		delay: 1000, 
		disableOnInteraction: false,  
	},
	breakpoints: {
		'@0.35': {
		  slidesPerView: 1,
		  spaceBetween: 20,
		},
		'@1.00': {
		  slidesPerView: 2,
		  spaceBetween: 40,
		},
		'@1.50': {
		  slidesPerView: 3,
		  spaceBetween: 50,
		},
		'@2.00': {
			slidesPerView: 4,
			spaceBetween: 50,
		},
	  }
});