const yearElement = document.getElementById('year');
if (yearElement) {
	yearElement.textContent = new Date().getFullYear();
}

const topbar = document.querySelector('.topbar');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = Array.from(document.querySelectorAll('main section[id]'));
const revealElements = Array.from(document.querySelectorAll('.reveal'));

const setActiveNav = (sectionId) => {
	navLinks.forEach((link) => {
		const isActive = link.getAttribute('href') === `#${sectionId}`;
		link.classList.toggle('active', isActive);
	});
};

const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setActiveNav(entry.target.id);
			}
		});
	},
	{
		threshold: 0.35,
		rootMargin: '-20% 0px -35% 0px'
	}
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('in-view');
			observer.unobserve(entry.target);
		});
	},
	{
		threshold: 0.18
	}
);

revealElements.forEach((element, index) => {
	element.style.transitionDelay = `${Math.min(index * 40, 200)}ms`;
	revealObserver.observe(element);
});

const toggleTopbarState = () => {
	if (!topbar) return;
	topbar.classList.toggle('scrolled', window.scrollY > 6);
};

toggleTopbarState();
window.addEventListener('scroll', toggleTopbarState, { passive: true });
