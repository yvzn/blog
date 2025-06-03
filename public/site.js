/* --- Dark mode toggle script  --- */
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

/* --- Mobile menu toggle script --- */
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenuHidden(forceHiddenState) {
	let isHidden = forceHiddenState;
	if (forceHiddenState === undefined) {
		// If no force parameter is provided, toggle the hidden state
		isHidden = !mobileMenu.hidden;
	}

	mobileMenu.classList.toggle('hidden', isHidden);
	mobileMenu.hidden = isHidden;
	if (isHidden) {
		mobileMenuButton.setAttribute('aria-expanded', 'false');
	} else {
		mobileMenuButton.setAttribute('aria-expanded', 'true');
	}
}

mobileMenuButton.addEventListener('click', () => {
	toggleMenuHidden();
});

mobileMenu.addEventListener('click', () => {
	toggleMenuHidden(true);
});

if (window.matchMedia) {
	const mdBreakpointMediaQuery = window.matchMedia('(width >= 48rem)');
	mdBreakpointMediaQuery.addEventListener('change', () => {
		toggleMenuHidden(true);
	});
}
