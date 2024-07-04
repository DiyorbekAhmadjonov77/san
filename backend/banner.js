
let Banner_Place = document.querySelector('.hero-swip');


function get_banners() {

    axios.get(BASE_URL + "/get-banner-ad/").then((res)=>{
      // console.log(res.data)
      let box = ''
      res.data?.map((item,index)=>{
          box+=`
            <div class="swiper-slide" style="background-image:url(${BASE_URL_MEDIA + item.photo})">
              
            </div>
          `
      })
      Banner_Place.innerHTML = box
    })
}


get_banners()


var swiper = new Swiper(".mySwiper", {
  autoplay: {
    delay: 5000,
  },
  loop:true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});