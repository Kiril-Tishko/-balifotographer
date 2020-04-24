let lazyLoadImg = document.getElementsByClassName('lazyLoadImg')

//		lazy load
const targets = document.querySelectorAll('.lazyLoadImg');

const lazyLoad = target => {
	var options = {
		root: null,
		rootMargin: '250px 0px 250px 0px',
		threshold: 0
	}

	if (window.matchMedia("(min-width: 1000px)").matches) {
		var options = {
			root: null,
			rootMargin: '400px 0px 400px 0px',
			threshold: 0
		}
	}

	var callback = function(entries, observer) { 
		entries.forEach(entry => {

			if (entry.isIntersecting) {
				const img = entry.target;
				let src = img.getAttribute('data-lazy');

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