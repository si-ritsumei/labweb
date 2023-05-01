var mySwiper1 = new Swiper('.swiper1', {
	spaceBetween: 10,
	navigation: {
		nextEl: '.next1',
		prevEl: '.prev1'
	}
});

var mySwiper2 = new Swiper('.swiper2', {
	slideToClickedSlide: true,
	controller: {
		control: mySwiper1,
		inverse: false,
		by: 'slide'
	},
	spaceBetween: 10,
	slidesPerView: 3,
	slideToClickedSlide: true
});
mySwiper1.controller.control = mySwiper2;