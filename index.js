        // Mobile menu toggle functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header') && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });

        // Login/redirect functionality
        function isUserLoggedIn() {
            return localStorage.getItem('isLoggedIn') === 'true';
        }

        function handleButtonClick(redirectPage) {
            if (isUserLoggedIn()) {
                window.location.href = redirectPage;
            } else {
                window.location.href = 'login.html';
            }
        }

        // Attach event listeners to buttons
        document.querySelector('.placement-btn').addEventListener('click', () => {
            handleButtonClick('Home Page.html');
        });

        document.querySelector('.explore-btn').addEventListener('click', () => {
            handleButtonClick('Home Page.html');
        });