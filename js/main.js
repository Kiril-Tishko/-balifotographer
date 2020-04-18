const mainMenuElem = document.getElementById('main-menu')

function addMenuShadow() {
	let positionY = window.pageYOffset

	if (positionY > 30) {
		mainMenuElem.classList.add('shadow')
	} else 
		mainMenuElem.classList.remove('shadow')
}

window.addEventListener('scroll', addMenuShadow)



// MODAL
const modalElem = document.getElementById('modal')
const section = document.getElementsByTagName('section')
const header = document.getElementsByTagName('header')[0]
const footer = document.getElementsByTagName('footer')[0]
const gelleryImgElem = document.getElementsByClassName('header-gallery__photo')
const modalImgElem = document.getElementsByClassName('modal__img')
const modalCloseBtnElem = document.getElementById('modal-close-btn')
const modalLeftBtnElem = document.getElementById('modal-left-btn')
const modalRightBtnElem = document.getElementById('modal-right-btn')

//	show modal
var handler = function() {
	// clicked img
	let index = this.getAttribute('data-index')
	// modall is visible
	modalElem.classList.add('displayFlex')
	modalImgElem[index].style.display = 'block'
	// blocking scroll for mobile
	if (window.matchMedia("(min-width: 650px)").matches) {
		function myPrevDef(e){
			e.preventDefault();
		}
	}
	window.myPrevDef = myPrevDef
	window.addEventListener('touchmove', myPrevDef, {passive: false})
	// modal animatin
	modalImgElem[index].classList.add('animated', 'zoomIn')
	// background blur
	for (var i = section.length; i--;) {
		section[i].classList.add('blure')
	}
	header.classList.add('blure')
	footer.classList.add('blure')

	// modal slider
	//		left btn
	function leftSlide () {
		if (index > 0) {
			// hide all img
			for (var i = modalImgElem.length; i--;) {
				modalImgElem[i].style.display = 'none'
				modalImgElem[i].classList.remove('animated', 'zoomIn')
			}
			// show left img
			index--
			modalImgElem[index].style.display = 'block'
			// activate right btn
			modalRightBtnElem.disabled = false
			// disabled left
			if (index <= 0) {
				modalLeftBtnElem.disabled = true
			} else {
				modalLeftBtnElem.disabled = false
			}
		}
	}

	//		left btn disabled
	if (index < 1) {
		modalLeftBtnElem.disabled = true
	} else {
		modalLeftBtnElem.disabled = false
	}

	//		right btn
	function rightSlide () {
		if (index < modalImgElem.length - 1) {
			// hide all img
			for (var i = modalImgElem.length; i--;) {
				modalImgElem[i].style.display = 'none'
				modalImgElem[i].classList.remove('animated', 'zoomIn')
			}
			// show right img
			index++
			modalImgElem[index].style.display = 'block'
			// activate left btn
			modalLeftBtnElem.disabled = false
			// disabled right btn (by _sliding_ on the last picture)
			if (index >= modalImgElem.length - 1) {
				modalRightBtnElem.disabled = true
			} else {
				modalRightBtnElem.disabled = false
			}
		}
	}

	//				disabled right btn (by _clicking_ on the last picture)
	if (index >= modalImgElem.length - 1) {
		modalRightBtnElem.disabled = true
	} else {
		modalRightBtnElem.disabled = false
	}

	//		slide img by keydown
	function keydownSlide() {
		if (event.keyCode === 37) {leftSlide() }
			if (event.keyCode === 39) {rightSlide() }
		}

	// close menu btn
	function CloseMenu () {
		modalElem.classList.remove('displayFlex')
		for (var i = modalImgElem.length; i--;) {
			modalImgElem[i].style.display = 'none'
		}
		for (var i = section.length; i--;) {
			section[i].classList.remove('blure')
		}
	header.classList.remove('blure')
	footer.classList.remove('blure')
		// allow to scroll
		window.removeEventListener('touchmove', myPrevDef, {passive: false});
	}

	//		close modal by screen rotate
	window.addEventListener("orientationchange", function() {
		if (window.orientation = 90) {
			CloseMenu()
		}
	}, false);

	//		close modal by keydown(Esc)
	function keydownCloseMenu() {
		if (event.keyCode === 27) { CloseMenu() }
	}

	// assign a function to the enent
	modalRightBtnElem.addEventListener('click', rightSlide)
	modalLeftBtnElem.addEventListener('click', leftSlide)
	modalCloseBtnElem.addEventListener('click', CloseMenu)
	window.addEventListener('keydown', keydownSlide)
	window.addEventListener('keydown', keydownCloseMenu)
}

// aplay function by click on img
for (var i = gelleryImgElem.length; i--;) {
	gelleryImgElem[i].setAttribute('data-index', i)
	gelleryImgElem[i].onclick = handler
}




// Highlighting menu options
// if (window.matchMedia("(min-width: 650px)").matches) {
// 	function loadImgAnimation() {
// 		const images = document.querySelectorAll('.photostories')
// 		let options = {
// 			root: null,
// 			rootMargin: '0px 0px ' + document.documentElement.clientHeight * (-1) + 'px 0px',
// 			threshold: 0
// 		}

// 		function handleImg(myImg, observer) {
// 			myImg.forEach(myImgSingle => {
// 				if (myImgSingle.intersectionRatio > 0) {
// 					loadImage(myImgSingle.target)
// 				}
// 			})
// 		}

// 		function loadImage(image) {
// 			const photostoriesMenuOptionElem = document.getElementById('photostoriesMenuOption')
// 			photostoriesMenuOptionElem.classList.add('main-menuHover')
// 		}

// 		const observer = new IntersectionObserver(handleImg, options)

// 		images.forEach(img => {
// 			observer.observe(img)
// 		})
// 	}

// 	loadImgAnimation()
// // }




// Contact form
jQuery(document).ready(function($) {

$(".ajax-contact-form").submit(function() {
var str = $(this).serialize();

$.ajax({
type: "POST",
url: "../php/contact.php",
data: str,
success: function(msg) {
if(msg == 'OK') {
result = '<p>Ваш заказ принят</p>';
$(".fields").hide();
} else {
result = msg;
}
$('.note').html(result);
}
});
return false;
});
});