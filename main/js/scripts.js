document.addEventListener('DOMContentLoaded', () => {
	rotateLogoOnScroll();
});

// mobile menu
function mobileMenu() {
	const openBtn = document.querySelector('.open-menu');

	openBtn.addEventListener('click', function (event) {
		event.preventDefault();

		if (document.body.classList.contains('menu-opened')) {
			setTimeout(() => {
				document.body.classList.remove('menu-opened');
			}, 500)

		} else {
			document.body.classList.add('menu-opened');

		}

		setTimeout(addAnimation, 200);
	});
};



function initMap() {
	let options = {};

	if (window.innerWidth < 768) {
		options = {
			center: { lat: 59.43459298574444, lng: 24.75196377625909 },
			zoom: 9
		};

		console.log('ss')
	} else {
		options = {
			center: { lat: 59.4583164, lng: 24.587872 },
			zoom: 11
		};
	}

	const map = new google.maps.Map(document.getElementById("map"), options);
}


function rotateLogoOnScroll() {
	const image = document.getElementById("rotate-logo");
	let initialRotation = 339;

	if (image) {
		window.onscroll = function () {
			scrollRotate();
		};
	}

	function scrollRotate() {
		const rotation = initialRotation + window.pageYOffset / 3;
		image.style.transform = "rotate(" + rotation + "deg)";
	}
}