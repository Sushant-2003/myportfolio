// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Add smooth scrolling behavior to navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Remove active class from all nav links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to target section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Intersection Observer for updating active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-70px 0px -50% 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
        
        // Remove active class from all nav links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Add active class to corresponding nav link
        if (correspondingNavLink) {
          correspondingNavLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Add scroll effect to navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    // Add/remove shadow based on scroll position
    if (scrollTop > 0) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-tag, .project-card, .contact-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initialize animation styles
  const animatedElements = document.querySelectorAll('.skill-tag, .project-card, .contact-item');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Check animations on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial check for animations
  setTimeout(animateOnScroll, 500);
  
  // Add staggered animation to elements
  const staggerElements = (selector, delay = 100) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * delay);
    });
  };
  
  // Apply staggered animations when sections come into view
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        switch(sectionId) {
          case 'skills':
            setTimeout(() => staggerElements('.skill-tag', 50), 200);
            break;
          case 'projects':
            setTimeout(() => staggerElements('.project-card', 200), 200);
            break;
          case 'contact':
            setTimeout(() => staggerElements('.contact-item', 150), 200);
            break;
        }
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Set initial active nav link
  const heroSection = document.querySelector('#hero');
  if (heroSection) {
    const heroNavLink = document.querySelector('.nav-link[href="#hero"]');
    if (heroNavLink) {
      heroNavLink.classList.add('active');
    }
  }
});
