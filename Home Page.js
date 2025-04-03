document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const userBtn = document.getElementById('userBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    const searchBar = document.getElementById('searchBar');
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const courseContainers = document.querySelectorAll('.list-container');
    
    // Create "Result Not Found" element if it doesn't exist
    let resultNotFound = document.getElementById('resultNotFound');
    if (!resultNotFound) {
        resultNotFound = document.createElement('div');
        resultNotFound.id = 'resultNotFound';
        resultNotFound.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No courses found</h3>
            <p>Try different search terms</p>
        `;
        resultNotFound.style.cssText = `
            display: none; 
            text-align: center; 
            padding: 40px; 
            background: rgba(255,255,255,0.9); 
            border-radius: 10px; 
            margin: 20px 0;
        `;
        document.querySelector('.content-platform').prepend(resultNotFound);
    }

    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #4a6bff;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    document.body.appendChild(backToTopBtn);

    // Event Listeners
    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    userBtn.addEventListener('click', toggleUserDropdown);
    searchBar.addEventListener('input', handleSearch);
    logoutBtn?.addEventListener('click', handleLogout);
    backToTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', closeAllDropdowns);
    
    // Mobile nav active state
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Course container horizontal scrolling
    courseContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // Functions
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    function toggleUserDropdown(e) {
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
    }

    function handleSearch() {
        const searchTerm = this.value.toLowerCase().trim();
        const courses = document.querySelectorAll('.vid-list');
        let foundAny = false;

        courses.forEach(course => {
            const title = course.getAttribute('data-title').toLowerCase();
            if (searchTerm === '' || title.includes(searchTerm)) {
                course.style.display = 'block';
                if (searchTerm !== '') foundAny = true;
            } else {
                course.style.display = 'none';
            }
        });

        // Show/hide "no results" message
        resultNotFound.style.display = (searchTerm !== '' && !foundAny) ? 'block' : 'none';
    }

    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function handleScroll() {
        // Back to top button visibility
        backToTopBtn.style.display = (window.pageYOffset > 300) ? 'flex' : 'none';
        
        // Animate elements on scroll
        const elements = document.querySelectorAll('.course-section, .stats-section, .testimonials, .companies');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('slide-up');
            }
        });
    }

    function handleResize() {
        // Close dropdown on larger screens
        if (window.innerWidth > 1200) {
            dropdownContent.classList.remove('show');
        }
        
        // Adjust layout for mobile
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.sidebar-links a').forEach(link => {
                link.addEventListener('click', toggleSidebar);
            });
        }
    }

    function closeAllDropdowns() {
        dropdownContent.classList.remove('show');
    }

    // Initialize
    handleResize(); // Set initial responsive state
    handleScroll(); // Check for elements to animate on load
});