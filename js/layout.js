var menu = document.querySelector('.menu-icon'),
		side = document.querySelector('.site-left');
console.log(menu)
menu.addEventListener('touchstart', function() {
	var point = menu.getAttribute('open')
	side.style.marginLeft = 0

	switch (point) {
		case 'opened':
			side.style.marginLeft = '-200px'
			menu.setAttribute('open', 'closed')
			break;
		default:
			side.style.marginLeft = 0
			menu.setAttribute('open', 'opened')
			break;
	}
})