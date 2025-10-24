// ============================================
// ASSIGNMENT 6: ADVANCED JAVASCRIPT
// Team: Newcomers (Chingiz, Sultan, Kaisar)
// Group: SE-2405
// ============================================

// ============================================
// PART 1: DOM MANIPULATION AND STYLING
// ============================================

// 1.1 Dynamic Content Update - Greeting with Name Input
// Author: Chingiz
function updateDynamicGreeting() {
  const nameInput = document.getElementById('dynamic-name-input');
  const greetingDisplay = document.getElementById('dynamic-greeting');
  
  if (nameInput && greetingDisplay) {
    const userName = nameInput.value.trim() || 'Guest';
    greetingDisplay.textContent = `Welcome to God loves the Trinity, ${userName}!`;
    greetingDisplay.style.color = '#8B4513';
    greetingDisplay.style.fontWeight = 'bold';
  }
}

// 1.2 Rating System with Stars
// Author: Sultan
function initializeRatingSystem() {
  const stars = document.querySelectorAll('.rating-star');
  const ratingValue = document.getElementById('rating-value');
  
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      // Reset all stars
      stars.forEach(s => {
        s.textContent = '☆';
        s.style.color = '#ccc';
      });
      
      // Fill selected stars
      for (let i = 0; i <= index; i++) {
        stars[i].textContent = '★';
        stars[i].style.color = '#FFD700';
      }
      
      // Update rating display
      if (ratingValue) {
        ratingValue.textContent = `Your Rating: ${index + 1} / 5`;
        ratingValue.style.color = '#8B4513';
      }
      
      // Play sound effect
      playClickSound();
    });
    
    // Hover effect
    star.addEventListener('mouseenter', () => {
      star.style.transform = 'scale(1.3)';
    });
    
    star.addEventListener('mouseleave', () => {
      star.style.transform = 'scale(1)';
    });
  });
}

// 1.3 Day/Night Theme Toggle
// Author: Kaisar
function toggleDayNightTheme() {
  const body = document.body;
  const themeButton = document.getElementById('theme-toggle-btn');
  
  body.classList.toggle('night-theme');
  
  if (body.classList.contains('night-theme')) {
    // Night mode
    body.style.backgroundColor = '#1a1a1a';
    body.style.color = '#f5f5f5';
    if (themeButton) {
      themeButton.textContent = '☀️ Day Mode';
      themeButton.style.background = '#FFD700';
      themeButton.style.color = '#000';
    }
  } else {
    // Day mode
    body.style.backgroundColor = '#f5f5f0';
    body.style.color = '#333';
    if (themeButton) {
      themeButton.textContent = '🌙 Night Mode';
      themeButton.style.background = '#8B4513';
      themeButton.style.color = '#fff';
    }
  }
}

// 1.4 Image Gallery - Change Main Image on Thumbnail Click
// Author: Chingiz
function setupImageGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail-image');
  const mainImage = document.getElementById('gallery-main-image');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (mainImage) {
        mainImage.src = thumb.src;
        mainImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          mainImage.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });
}

// 1.5 Read More Toggle
// Author: Sultan
function toggleReadMore() {
  const moreContent = document.getElementById('read-more-content');
  const readMoreBtn = document.getElementById('read-more-btn');
  
  if (moreContent && readMoreBtn) {
    if (moreContent.style.display === 'none' || !moreContent.style.display) {
      moreContent.style.display = 'block';
      readMoreBtn.textContent = 'Read Less';
      readMoreBtn.style.backgroundColor = '#654321';
    } else {
      moreContent.style.display = 'none';
      readMoreBtn.textContent = 'Read More';
      readMoreBtn.style.backgroundColor = '#8B4513';
    }
  }
}

// ============================================
// PART 2: EVENT HANDLING
// ============================================

// 2.1 Display Current Time Button
// Author: Chingiz
function displayCurrentTime() {
  const timeDisplay = document.getElementById('current-time-display');
  if (timeDisplay) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    timeDisplay.textContent = `Current Time: ${timeString}`;
    timeDisplay.style.fontSize = '1.3rem';
    timeDisplay.style.color = '#8B4513';
    timeDisplay.style.fontWeight = 'bold';
    
    // Animation
    timeDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
      timeDisplay.style.transform = 'scale(1)';
    }, 300);
    
    playClickSound();
  }
}

// 2.2 Reset Form Button
// Author: Sultan
function resetAllForms() {
  const inputs = document.querySelectorAll('input');
  const textareas = document.querySelectorAll('textarea');
  const selects = document.querySelectorAll('select');
  
  inputs.forEach(input => {
    if (input.type !== 'button' && input.type !== 'submit') {
      input.value = '';
      input.style.borderColor = '';
    }
  });
  
  textareas.forEach(textarea => {
    textarea.value = '';
    textarea.style.borderColor = '';
  });
  
  selects.forEach(select => {
    select.selectedIndex = 0;
  });
  
  // Remove error messages
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.remove());
  
  alert('All forms have been reset!');
  playClickSound();
}

// 2.3 Keyboard Navigation for Menu
// Author: Kaisar
function initializeKeyboardNavigation() {
  const menuItems = document.querySelectorAll('.navigation a');
  let currentIndex = -1;
  
  document.addEventListener('keydown', (e) => {
    if (menuItems.length === 0) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % menuItems.length;
      menuItems[currentIndex].focus();
      menuItems[currentIndex].style.outline = '2px solid #8B4513';
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[currentIndex].focus();
      menuItems[currentIndex].style.outline = '2px solid #8B4513';
    } else if (e.key === 'Enter' && currentIndex >= 0) {
      menuItems[currentIndex].click();
    }
  });
  
  // Remove outline on blur
  menuItems.forEach(item => {
    item.addEventListener('blur', () => {
      item.style.outline = '';
    });
  });
}

// 2.4 Contact Form with Async Submission (Callback)
// Author: Chingiz
function setupContactFormAsync() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm && !contactForm.dataset.asyncSetup) {
    contactForm.dataset.asyncSetup = 'true';
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        subject: document.getElementById('subject')?.value,
        message: document.getElementById('message')?.value
      };
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate async submission with callback
      handleAsyncSubmission(formData, (success, message) => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (success) {
          alert('✓ ' + message);
          contactForm.reset();
          playSuccessSound();
        } else {
          alert('✗ ' + message);
        }
      });
    });
  }
}

function handleAsyncSubmission(data, callback) {
  // Simulate API call with setTimeout
  setTimeout(() => {
    console.log('Form submitted:', data);
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      callback(true, 'Your message has been sent successfully! We will contact you soon.');
    } else {
      callback(false, 'There was an error sending your message. Please try again.');
    }
  }, 1500);
}

// 2.5 Switch Statement - Menu Category Filter
// Author: Sultan
function filterMenuByCategory(category) {
  const menuSections = document.querySelectorAll('.menu-section');
  
  switch(category) {
    case 'all':
      menuSections.forEach(section => {
        section.style.display = 'block';
      });
      break;
      
    case 'appetizers':
      menuSections.forEach(section => {
        if (section.querySelector('h2').textContent.toLowerCase().includes('appetizer')) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
      break;
      
    case 'main':
      menuSections.forEach(section => {
        if (section.querySelector('h2').textContent.toLowerCase().includes('main')) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
      break;
      
    case 'desserts':
      menuSections.forEach(section => {
        if (section.querySelector('h2').textContent.toLowerCase().includes('dessert')) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
      break;
      
    case 'beverages':
      menuSections.forEach(section => {
        if (section.querySelector('h2').textContent.toLowerCase().includes('beverage')) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
      break;
      
    default:
      menuSections.forEach(section => {
        section.style.display = 'block';
      });
  }
  
  playClickSound();
}

// Switch Statement - Time-based Greeting
// Author: Kaisar
function displayTimeBasedGreeting() {
  const greetingElement = document.getElementById('time-based-greeting');
  if (!greetingElement) return;
  
  const hour = new Date().getHours();
  let greeting, emoji, color;
  
  switch(true) {
    case (hour >= 5 && hour < 12):
      greeting = 'Good Morning';
      emoji = '🌅';
      color = '#FF8C00';
      break;
      
    case (hour >= 12 && hour < 17):
      greeting = 'Good Afternoon';
      emoji = '☀️';
      color = '#FFD700';
      break;
      
    case (hour >= 17 && hour < 21):
      greeting = 'Good Evening';
      emoji = '🌆';
      color = '#FF6347';
      break;
      
    default:
      greeting = 'Good Night';
      emoji = '🌙';
      color = '#4169E1';
  }
  
  greetingElement.textContent = `${emoji} ${greeting}! Welcome to God loves the Trinity`;
  greetingElement.style.color = color;
  greetingElement.style.fontSize = '1.5rem';
  greetingElement.style.fontWeight = 'bold';
}

// ============================================
// PART 3: ADVANCED JAVASCRIPT CONCEPTS
// ============================================

// 3.1 Objects and Methods
// Author: Chingiz
const restaurantInfo = {
  name: 'God loves the Trinity',
  location: '123 Divine Street, Heaven\'s Gate City',
  established: 2018,
  specialties: ['Italian Cuisine', 'Divine Pasta', 'Heavenly Desserts'],
  
  displayInfo() {
    return `${this.name} - Serving divine food since ${this.established}`;
  },
  
  getSpecialties() {
    return this.specialties.join(', ');
  },
  
  addSpecialty(specialty) {
    this.specialties.push(specialty);
  }
};

function showRestaurantInfo() {
  const infoDisplay = document.getElementById('restaurant-info-display');
  if (infoDisplay) {
    infoDisplay.innerHTML = `
      <h3>${restaurantInfo.displayInfo()}</h3>
      <p><strong>Location:</strong> ${restaurantInfo.location}</p>
      <p><strong>Our Specialties:</strong> ${restaurantInfo.getSpecialties()}</p>
    `;
    infoDisplay.style.padding = '20px';
    infoDisplay.style.backgroundColor = '#FFF8DC';
    infoDisplay.style.borderRadius = '8px';
    infoDisplay.style.marginTop = '15px';
  }
}

// 3.2 Arrays and Loops
// Author: Sultan
const menuHighlights = [
  { name: 'Trinity Pasta', price: 16.99, category: 'Main Course' },
  { name: 'Blessed Burger', price: 14.50, category: 'Main Course' },
  { name: 'Heavenly Salmon', price: 19.75, category: 'Main Course' },
  { name: 'Divine Chocolate Mousse', price: 8.50, category: 'Dessert' },
  { name: 'Angel Food Cake', price: 6.99, category: 'Dessert' }
];

function displayMenuHighlights() {
  const container = document.getElementById('menu-highlights-container');
  if (!container) return;
  
  let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">';
  
  for (let i = 0; i < menuHighlights.length; i++) {
    const item = menuHighlights[i];
    html += `
      <div class="highlight-card" style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: transform 0.3s;">
        <h4 style="color: #8B4513; margin-bottom: 10px;">${item.name}</h4>
        <p style="color: #666;">${item.category}</p>
        <p style="color: #8B4513; font-weight: bold; font-size: 1.2rem;">$${item.price}</p>
      </div>
    `;
  }
  
  html += '</div>';
  container.innerHTML = html;
  
  // Add hover animation
  const cards = container.querySelectorAll('.highlight-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// 3.3 Higher-Order Functions
// Author: Kaisar

// map() - Get all menu item names
function getAllMenuNames() {
  return menuHighlights.map(item => item.name);
}

// filter() - Get items by price range
function filterByPrice(maxPrice) {
  return menuHighlights.filter(item => item.price <= maxPrice);
}

// forEach() - Display each item with custom formatting
function displayMenuWithForEach() {
  const container = document.getElementById('foreach-display');
  if (!container) return;
  
  container.innerHTML = '<h3>Menu Items:</h3>';
  
  menuHighlights.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.style.padding = '10px';
    itemDiv.style.marginBottom = '5px';
    itemDiv.style.backgroundColor = index % 2 === 0 ? '#FFF8DC' : '#fff';
    itemDiv.textContent = `${index + 1}. ${item.name} - $${item.price} (${item.category})`;
    container.appendChild(itemDiv);
  });
}

// 3.4 Play Sounds
// Author: Chingiz
function playClickSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

function playSuccessSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 523.25; // C note
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
  
  setTimeout(() => {
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.value = 659.25; // E note
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    osc2.start(audioContext.currentTime);
    osc2.stop(audioContext.currentTime + 0.3);
  }, 150);
}

function playNotificationSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 440;
  oscillator.type = 'square';
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
}

// 3.5 Animations
// Author: Sultan
function animateElement(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.style.transition = 'all 0.5s ease';
  element.style.transform = 'scale(1.1) rotate(2deg)';
  
  setTimeout(() => {
    element.style.transform = 'scale(1) rotate(0deg)';
  }, 500);
}

function slideInAnimation(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.style.transition = 'transform 0.6s ease-out';
  element.style.transform = 'translateX(-100%)';
  element.style.opacity = '0';
  
  setTimeout(() => {
    element.style.transform = 'translateX(0)';
    element.style.opacity = '1';
  }, 100);
}

function bounceAnimation(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  element.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    element.style.transform = 'translateY(0)';
  }, 300);
}

// ============================================
// EXISTING FUNCTIONS (FROM PREVIOUS ASSIGNMENTS)
// ============================================

// TASK 5: Display Current Date and Time
// Author: Chingiz
function updateDateTime() {
  const now = new Date();
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  const formattedDate = now.toLocaleString('en-US', options);
  
  const dateTimeElement = document.getElementById('current-datetime');
  if (dateTimeElement) {
    dateTimeElement.textContent = formattedDate;
  }
}

// TASK 4: Change Background Color
// Author: Chingiz
function changeBackgroundColor() {
  const colors = [
    '#f5f5f0', '#e8f4f8', '#fff5e6', '#f0e6ff',
    '#e6ffe6', '#ffe6f0', '#fff9e6'
  ];
  
  const currentColor = document.body.style.backgroundColor || '#f5f5f0';
  let newColor;
  
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === currentColor);
  
  document.body.style.backgroundColor = newColor;
  document.body.style.transition = 'background-color 0.5s ease';
  
  playClickSound();
}

// TASK 1: Form Validation
// Author: Sultan
function validateReservationForm(event) {
  event.preventDefault();
  
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  let isValid = true;
  
  const name = document.getElementById('guest-name');
  const email = document.getElementById('guest-email');
  const phone = document.getElementById('guest-phone');
  const partySize = document.getElementById('party-size');
  const date = document.getElementById('reservation-date');
  const time = document.getElementById('reservation-time');
  
  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, 'Name must be at least 2 characters long');
    isValid = false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }
  
  const phoneRegex = /^\d{10,}$/;
  const phoneDigits = phone.value.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length < 10) {
    showError(phone, 'Phone number must be at least 10 digits');
    isValid = false;
  }
  
  if (!partySize.value) {
    showError(partySize, 'Please select party size');
    isValid = false;
  }
  
  if (!date.value) {
    showError(date, 'Please select a date');
    isValid = false;
  } else {
    const selectedDate = new Date(date.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showError(date, 'Date cannot be in the past');
      isValid = false;
    }
  }
  
  if (!time.value) {
    showError(time, 'Please select a time');
    isValid = false;
  }
  
  if (isValid) {
    playSuccessSound();
    alert('Reservation submitted successfully! We will contact you shortly to confirm.');
    event.target.reset();
  }
}

function showError(inputElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#d32f2f';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '5px';
  errorDiv.textContent = message;
  
  inputElement.style.borderColor = '#d32f2f';
  inputElement.parentElement.appendChild(errorDiv);
  
  inputElement.addEventListener('input', function() {
    inputElement.style.borderColor = '';
    const error = inputElement.parentElement.querySelector('.error-message');
    if (error) error.remove();
  }, { once: true });
}

// TASK 2: Accordion for FAQs
// Author: Kaisar
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        playClickSound();
      }
    });
  });
}

// TASK 3: Popup Subscription Form
// Author: Kaisar
function openPopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    playNotificationSound();
  }
}

function closePopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function handleSubscription(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('popup-email');
  const email = emailInput.value.trim();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  playSuccessSound();
  alert('Thank you for subscribing! You will receive our newsletter soon.');
  emailInput.value = '';
  closePopup();
}

// ============================================
// INITIALIZATION - Run when page loads
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🍽️ God loves the Trinity - JavaScript Loaded Successfully!');
  
  // Initialize all features
  initializeAllFeatures();
  
  // Start datetime updates
  if (document.getElementById('current-datetime')) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }
  
  // Display time-based greeting
  displayTimeBasedGreeting();
  
  // Initialize keyboard navigation
  initializeKeyboardNavigation();
  
  // Setup image gallery
  setupImageGallery();
  
  // Initialize rating system
  initializeRatingSystem();
  
  // Initialize accordion
  if (document.querySelector('.accordion-item')) {
    initAccordion();
  }
  
  // Setup contact form async
  setupContactFormAsync();
  
  // Display menu highlights
  displayMenuHighlights();
  
  console.log('✓ All features initialized successfully!');
});

function initializeAllFeatures() {
  // Background color button
  const bgButton = document.getElementById('bg-color-btn');
  if (bgButton) {
    bgButton.addEventListener('click', changeBackgroundColor);
  }
  
  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle-btn');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDayNightTheme);
  }
  
  // Current time button
  const timeButton = document.getElementById('show-time-btn');
  if (timeButton) {
    timeButton.addEventListener('click', displayCurrentTime);
  }
  
  // Reset form button
  const resetButton = document.getElementById('reset-form-btn');
  if (resetButton) {
    resetButton.addEventListener('click', resetAllForms);
  }
  
  // Read more button
  const readMoreBtn = document.getElementById('read-more-btn');
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', toggleReadMore);
  }
  
  // Dynamic name input
  const nameInput = document.getElementById('dynamic-name-input');
  if (nameInput) {
    nameInput.addEventListener('input', updateDynamicGreeting);
  }
  
  // Restaurant info button
  const infoButton = document.getElementById('show-info-btn');
  if (infoButton) {
    infoButton.addEventListener('click', showRestaurantInfo);
  }
  
  // Menu filter buttons
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      filterMenuByCategory(category);
    });
  });
  
  // Reservation form
  const reservationForm = document.querySelector('#booking-header + .about-content + .contact-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', validateReservationForm);
  }
  
  // Subscription popup
  const subscribeBtn = document.getElementById('subscribe-btn');
  const closeBtn = document.getElementById('close-popup');
  const popupOverlay = document.getElementById('subscription-popup');
  const popupForm = document.getElementById('subscription-form');
  
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', openPopup);
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }
  
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  }
  
  if (popupForm) {
    popupForm.addEventListener('submit', handleSubscription);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to add animation to any element
function addPulseAnimation(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.style.animation = 'pulse 1s ease-in-out';
  
  setTimeout(() => {
    element.style.animation = '';
  }, 1000);
}

// Console log helper for debugging
function logFeatureUsage(featureName) {
  console.log(`✓ Feature used: ${featureName} at ${new Date().toLocaleTimeString()}`);
}

// Export functions for use in HTML (if needed)
window.changeBackgroundColor = changeBackgroundColor;
window.toggleDayNightTheme = toggleDayNightTheme;
window.displayCurrentTime = displayCurrentTime;
window.resetAllForms = resetAllForms;
window.toggleReadMore = toggleReadMore;
window.filterMenuByCategory = filterMenuByCategory;
window.showRestaurantInfo = showRestaurantInfo;
window.playClickSound = playClickSound;
window.playSuccessSound = playSuccessSound;
window.animateElement = animateElement;
window.slideInAnimation = slideInAnimation;
window.bounceAnimation = bounceAnimation;
