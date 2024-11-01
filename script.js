document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    };

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .publication, .education-item, .experience-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Toggle mobile menu
    const menuToggle = document.createElement('button');
    menuToggle.textContent = 'Menu';
    menuToggle.classList.add('menu-toggle');
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <ul>
            <li><a href="#research">Research</a></li>
            <li><a href="#publications">Publications</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#experience">Experience</a></li>
        </ul>
    `;
    nav.classList.add('main-nav');

    document.querySelector('header').appendChild(menuToggle);
    document.querySelector('header').appendChild(nav);

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌓';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');

    document.querySelector('header').appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Lazy loading for images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // Add a simple filter for publications
    const publicationFilter = document.createElement('div');
    publicationFilter.innerHTML = `
        <label for="pub-filter">Filter publications:</label>
        <select id="pub-filter">
            <option value="all">All</option>
            <option value="conference">Conference</option>
            <option value="journal">Journal</option>
        </select>
    `;
    document.querySelector('#publications').insertBefore(publicationFilter, document.querySelector('.publication-list'));

    document.querySelector('#pub-filter').addEventListener('change', (e) => {
        const filter = e.target.value;
        document.querySelectorAll('.publication').forEach(pub => {
            if (filter === 'all' || pub.querySelector(`.tag:contains('${filter}')`)) {
                pub.style.display = 'block';
            } else {
                pub.style.display = 'none';
            }
        });
    });
});
