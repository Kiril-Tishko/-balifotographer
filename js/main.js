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
const gelleryImgWrapElem = document.getElementsByClassName('header-gallery__photo')
// let lazyLoadImg = document.getElementsByClassName('lazyLoadImg')
// let modalImgElem = document.getElementsByClassName('modal__img')
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
for (var i = gelleryImgWrapElem.length; i--;) {
	gelleryImgWrapElem[i].setAttribute('data-index', i)
	gelleryImgWrapElem[i].onclick = handler
}



let lazyLoadImg = document.getElementsByClassName('lazyLoadImg')
let modalImgElem = document.getElementsByClassName('modal__img')
	//		delate (main part) action lazy load on PC
function justLoadAllGalleryImg() {
	for (var i = lazyLoadImg.length; i--;) {
		let srcGellery = lazyLoadImg[i].getAttribute('src')
		// delete '-thumbnail' from src
		srcGellery = srcGellery.replace('thumbnails/', '')
		// set atribute
		lazyLoadImg[i].setAttribute('src', srcGellery)
	}
}

function justLoadAllModalImg() {
	for (var i = modalImgElem.length; i--;) {
		let srcModal = modalImgElem[i].getAttribute('data-lazy')
		// set atribute
		modalImgElem[i].setAttribute('src', srcModal)
	}
}

if (window.matchMedia("(min-width: 525px)").matches) {
	justLoadAllGalleryImg()
	justLoadAllModalImg()
}


//		lazy load on mobile
if (window.matchMedia("(max-width: 525px)").matches) {
	const targets = document.querySelectorAll('.lazyLoadImg');

	const lazyLoad = target => {
		var options = {
			root: null,
			rootMargin: '250px 0px 250px 0px',
			threshold: 0
		}

		var callback = function(entries, observer) { 
			entries.forEach(entry => {

				if (entry.isIntersecting) {
					const img = entry.target;
					let src = img.getAttribute('src');

					// delete '-thumbnail' from src
					src = src.replace('thumbnails/', '')

					img.setAttribute('src', src);
					observer.disconnect();
				}
			});
		};
		var observer = new IntersectionObserver(callback, options);
		observer.observe(target)
	};

	targets.forEach(lazyLoad);
}