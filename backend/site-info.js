let Footer_Slogan = document.querySelectorAll(".footer-slogans");
let Footer_Social_Insta = document.querySelectorAll(".footer-social-medias-insta");
let Footer_Social_Tg = document.querySelectorAll(".footer-social-medias-tg");
let Footer_Social_Face = document.querySelectorAll(".footer-social-medias-face");
let Footer_Social_Google = document.querySelectorAll(".footer-social-medias-google");
let Footer_Social_Twit = document.querySelectorAll(".footer-social-medias-twit");
let Footer_Working_Hours = document.querySelectorAll(".footer-working-days")
let Header_Email_Place = document.querySelectorAll(".header-email-place")
let Header_Phone_Place = document.querySelectorAll(".header-phone-place")
let Header_Logo_Place = document.querySelectorAll(".header-logo-place")



function get_site_info() {
	axios.get(BASE_URL+"/get-info/").then((res)=>{
		console.log(res.data);
		
		for (let i = 0; i < Footer_Slogan.length; i++) {
			const element = Footer_Slogan[i];
			element.textContent = res?.data?.info?.slogan
		}
		for (let i = 0; i < Header_Logo_Place.length; i++) {
			const element = Header_Logo_Place[i];
			element.src = BASE_URL_MEDIA + res?.data?.info?.logo
		}

		for (let i = 0; i < Header_Email_Place.length; i++) {
			const element = Header_Email_Place[i];
			element.href = res?.data?.info?.email
			// element.textContent = 'Telegram group'
		}

		for (let i = 0; i < Header_Phone_Place.length; i++) {
			const element = Header_Phone_Place[i];
			element.textContent = res?.data?.info?.phone
		}

		for (let i = 0; i < Footer_Social_Insta.length; i++) {
			const element = Footer_Social_Insta[i];
			element.href = res?.data?.info?.instagram
		}

		for (let i = 0; i < Footer_Social_Tg.length; i++) {
			const element = Footer_Social_Tg[i];
			element.href = res?.data?.info?.telegram
		}
		
		for (let i = 0; i < Footer_Social_Face.length; i++) {
			const element = Footer_Social_Face[i];
			element.href = res?.data?.info?.facebook
		}
		
		for (let i = 0; i < Footer_Social_Google.length; i++) {
			const element = Footer_Social_Google[i];
			element.href = res?.data?.info?.google
		}

		for (let i = 0; i < Footer_Social_Twit.length; i++) {
			const element = Footer_Social_Twit[i];
			element.href = res?.data?.info?.twitter
		}

		let box = ''

		res?.data['working-hours']?.map((item,index)=>{
			box+=`
				<li class="day">${item.days}<span>${item.open} - ${item.close}</span></li>
			`
		})

		for (let i = 0; i < Footer_Working_Hours.length; i++) {
			const element = Footer_Working_Hours[i];
			element.innerHTML = box
			// console.log(box,element)
		}

	})
}



get_site_info()