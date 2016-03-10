var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left');
console.log(menu)
menu.addEventListener('touchstart', function() {
	var point = side.getAttribute('open')
	side.style.marginLeft = 0

	switch (point) {
		case 'opened':
			side.style.boxShadow = 'none'
			side.style.marginLeft = '-200px'
			side.setAttribute('open', 'closed')
			break;
		default:
			side.style.boxShadow = '10px 0 20px rgba(0,0,0,.3)'
			side.style.marginLeft = 0
			side.setAttribute('open', 'opened')
			break;
	}
})