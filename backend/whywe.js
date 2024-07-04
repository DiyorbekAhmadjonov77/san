let Home_Why_We_Place = document.querySelector('.why-we-place');

function get_whywe_info() {
	axios.get(BASE_URL+"/get-why-we/").then((res)=>{
		// console.log(res.data);
		let box = ''
		
		res.data?.map((item,index)=>{
			box+=`
			<div class="col-lg-4 col-md-6 col-12">
				<!-- Start Single Service -->
				<div class="single-service">
					<img src=${BASE_URL_MEDIA + item.photo} class='img' />


					<h4><a href="service-details.html">${item.title}</a></h4>
					<p>${item.text}</p>	
				</div>
				<!-- End Single Service -->
			</div>
			`
			
		})
		

		Home_Why_We_Place.innerHTML = box
	})
}



get_whywe_info()