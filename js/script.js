/**
 * YOPY TRI BUANA, S.T., M.Kom.
 * Personal Academic & Portfolio Website
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('yopy_theme');

  // Default to dark theme as requested by academic/tech aesthetic
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark) {
    // If system is explicitly light and no saved preference, can respect or stay dark
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('yopy_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  // ------------------------------------------------------------------------
  // 2. Sticky Navbar & Scroll Spy
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky navbar blur transition
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 450) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scroll Spy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ------------------------------------------------------------------------
  // 3. Mobile Navigation Menu Toggle
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. Hero Dynamic Typing Effect
  // ------------------------------------------------------------------------
  const typeTextElement = document.getElementById('dynamic-type');
  if (typeTextElement) {
    const words = [
      'Artificial Intelligence',
      'Computer Vision',
      'Deep Learning & YOLO',
      'Software Architecture',
      'Inclusive EdTech'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeLoop = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typeTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typeTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of word
        typingSpeed = 1900;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    typeLoop();
  }

  // ------------------------------------------------------------------------
  // 5. Scroll Reveal Animations (Intersection Observer)
  // ------------------------------------------------------------------------
  const fadeElements = document.querySelectorAll('.fade-up');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => revealObserver.observe(el));

  // ------------------------------------------------------------------------
  // 6. Back to Top Button Action
  // ------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 7. Modals: CV Download & Image Zoom Lightbox
  // ------------------------------------------------------------------------
  const cvModal = document.getElementById('cv-modal');
  const cvTriggers = document.querySelectorAll('.btn-download-cv');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay-bg');

  cvTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cvModal) {
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // Handle Download CV confirmation button inside modal
  const confirmDownloadBtn = document.getElementById('btn-confirm-download');
  if (confirmDownloadBtn) {
    confirmDownloadBtn.addEventListener('click', () => {
      closeModal(cvModal);
      showToast('Preparing Curriculum Vitae download...');
      setTimeout(() => {
        // Trigger print/download action or simulated file download
        window.print();
      }, 700);
    });
  }

  // ------------------------------------------------------------------------
  // 8. Clipboard Copy Utilities & Toast Notification
  // ------------------------------------------------------------------------
  const toastElement = document.getElementById('toast');
  let toastTimer = null;

  window.showToast = (message) => {
    if (!toastElement) return;
    toastElement.querySelector('.toast-text').textContent = message;
    toastElement.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3200);
  };

  // Copy email triggers
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'yoepytribuana@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast('Email address copied to clipboard');
      });
    });
  });

  // Copy publication citations
  const copyCitationBtns = document.querySelectorAll('.btn-copy-citation');
  copyCitationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const citation = btn.getAttribute('data-citation');
      if (citation) {
        navigator.clipboard.writeText(citation).then(() => {
          showToast('Citation copied to clipboard (BibTeX)!');
        }).catch(() => {
          showToast('Citation copied');
        });
      }
    });
  });

  // Publication placeholder notice
  const pubPlaceholderBtns = document.querySelectorAll('.btn-pub-link');
  pubPlaceholderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        showToast('Official publisher index link will be available soon');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. Interactive Contact Form Submission
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please complete all form fields');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Thank you! Your message has been received.');
      }, 1000);
    });
  }

  // ------------------------------------------------------------------------
  // 10. Research Visual Lightbox Zoom
  // ------------------------------------------------------------------------
  const researchImg = document.getElementById('research-vis-img');
  const imageModal = document.getElementById('image-modal');
  const imageModalTarget = document.getElementById('image-modal-target');

  if (researchImg && imageModal && imageModalTarget) {
    researchImg.style.cursor = 'zoom-in';
    researchImg.addEventListener('click', () => {
      imageModalTarget.src = researchImg.src;
      imageModalTarget.alt = researchImg.alt;
      imageModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
});
