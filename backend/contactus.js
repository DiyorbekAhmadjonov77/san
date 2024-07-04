function contact_post(e) {
	e.preventDefault()
	let {name, email, phone,message} = e.target

	if(name.value == "" || phone.value == "" || email.value == "" || message.value == ""){
		Swal.fire({
			title: "Eslatma",
			text: "Iltimos barcha bo'sh maydornlarni to'ldiring ",
			icon: "warning"
		});
	}else{
		let formdata = new FormData()
		formdata.append("full_name",name.value)
		formdata.append("email",email.value)
		formdata.append("phone",phone.value)
		formdata.append("message",message.value)

		axios.post(BASE_URL + "/create-applicant/",formdata).then((res)=>{
			// console.log(res)
			name.value = ''
			phone.value = ''
			email.value = ''
			message.value = ''
			Swal.fire({
				title: "Muvaffaqiyat",
				text: "Habaringiz muvaffaqiyatli yuborildi. Sizga tez orada aloqaga chiqamiz ",
				icon: "success"
			});
		})
	}
}

