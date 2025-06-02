document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Function to show a specific page
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
            // Scroll to the top of the page content after displaying
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Function to update active navigation link
    function updateNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href').substring(1); // Get target ID without '#'
            showPage(targetId);
            updateNavLink(targetId);
            // Update URL hash without refreshing
            history.pushState(null, '', `#${targetId}`);
        });
    });

    // Handle direct link/refresh to a specific hash
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showPage(hash);
            updateNavLink(hash);
        } else {
            // Default to 'beranda' if no hash
            showPage('beranda');
            updateNavLink('beranda');
        }
    }

    // Initial page load based on hash or default
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    // Smooth scroll for buttons like "Pelajari Lebih Lanjut"
    document.querySelectorAll('a.button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showPage(targetId);
            updateNavLink(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });
});