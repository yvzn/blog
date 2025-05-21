/* Dark mode toggle script */
const darkModeToggle = document.getElementById('dark-mode-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

function toggleDarkMode() {
	document.documentElement.classList.toggle('dark');
	sunIcon.classList.toggle('hidden');
	moonIcon.classList.toggle('hidden');
}

darkModeToggle.addEventListener('click', toggleDarkMode);

if (window.matchMedia) {
	const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	if (darkModeMediaQuery.matches) {
		toggleDarkMode();
	}
	darkModeMediaQuery.addEventListener('change', toggleDarkMode);
}

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
	mobileMenu.classList.toggle('hidden');
});

mobileMenu.addEventListener('click', () => {
	mobileMenu.classList.toggle('hidden');
});

if (window.matchMedia) {
	const mdBreakpointMediaQuery = window.matchMedia('(width >= 48rem)');
	mdBreakpointMediaQuery.addEventListener('change', () => {
		mobileMenu.classList.add('hidden');
	});
}
