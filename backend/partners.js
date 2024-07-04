let Home_Partners_Place = document.querySelector('.partners-place');

function get_partners() {
	axios.get(BASE_URL+"/get-partner/").then((res)=>{
		// console.log(res.data);
		let box = ''
		
		res.data?.map((item,index)=>{
			box+=`
				<div class="swiper-slide partner-swiper" >
						<img src=${BASE_URL_MEDIA + item.photo} alt="#">
				</div>
			`
			
		})
		

		Home_Partners_Place.innerHTML = box
		var swiper = new Swiper(".hamkorlar-swiper", {
			slidesPerView: 5,
			spaceBetween: 30,
			loop: true, 
			autoplay: {
				delay: 1000, 
				disableOnInteraction: false,  
			},
			breakpoints: {
				'@0.30': {
					slidesPerView: 1,
					spaceBetween: 0,
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



get_partners()

document.addEventListener("DOMContentLoaded", function () {
    // Your Swiper initialization code here
    var swiper = new Swiper(".hamkorlar-swiper", {
        slidesPerView: 5,
        spaceBetween: 30,
		loop: true, 
		autoplay: {
			delay: 1000, 
			disableOnInteraction: false,  
		},
        breakpoints: {
            '@0.25': {
                slidesPerView: 1,
                spaceBetween: 0,
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
});