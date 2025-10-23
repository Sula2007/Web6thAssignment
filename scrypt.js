// ========================================
// PART 1: DOM MANIPULATION AND STYLING
// ========================================

// ===== TASK 1.1: Selecting and Manipulating Elements =====
// Author: Chingiz
// Dynamic greeting based on user input
function initializeGreeting() {
  const greetingResult = document.getElementById('greeting-result');
  const nameInput = document.getElementById('user-name-input');
  const greetingButton = document.getElementById('greeting-btn');
  
  if (greetingButton && nameInput && greetingResult) {
    greetingButton.addEventListener('click', function() {
      const userName = nameInput.value.trim();
      if (userName) {
        greetingResult.textContent = `Hello, ${userName}! Welcome to God loves the Trinity!`;
        greetingResult.style.color = '#8B4513';
        playClickSound();
      } else {
        greetingResult.textContent = 'Please enter your name!';
        greetingResult.style.color = '#d32f2f';
      }
    });
  }
}

// ===== ВОССТАНОВЛЕНО: Change Background Color (15 разных цветов) =====
// Author: Chingiz
// This function changes the background color when button is clicked
function changeBackgroundColor() {
  const colors = [
    '#f5f5f0', // 1. Оригинальный бежевый
    '#e8f4f8', // 2. Светло-голубой
    '#fff5e6', // 3. Светло-оранжевый
    '#f0e6ff', // 4. Светло-фиолетовый
    '#e6ffe6', // 5. Светло-зеленый
    '#ffe6f0', // 6. Светло-розовый
    '#fff9e6', // 7. Светло-желтый
    '#ffe6e6', // 8. Нежно-красный
    '#e6f7ff', // 9. Небесно-голубой
    '#f0fff0', // 10. Мятный
    '#fff0f5', // 11. Лавандовый
    '#fffacd', // 12. Лимонный
    '#f5f5dc', // 13. Бежевый кремовый
    '#faebd7', // 14. Античный белый
    '#ffd4e5'  // 15. Персиковый розовый
  ];
  
  // Получаем текущий цвет фона
  let currentBg = window.getComputedStyle(document.body).backgroundColor;
  
  // Конвертируем rgb в hex для сравнения
  const rgbToHex = (rgb) => {
    if (!rgb || rgb === 'rgba(0, 0, 0, 0)') return '#f5f5f0';
    const result = rgb.match(/\d+/g);
    if (!result) return '#f5f5f0';
    return '#' + result.slice(0, 3).map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  const currentColor = rgbToHex(currentBg);
  
  let newColor;
  let attempts = 0;
  
  // Выбираем случайный цвет, отличный от текущего
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
    attempts++;
  } while (newColor.toLowerCase() === currentColor.toLowerCase() && attempts < 20);
  
  // Применяем новый цвет
  document.body.style.backgroundColor = newColor;
  document.body.style.transition = 'background-color 0.5s ease';
  
  console.log('Background changed from', currentColor, 'to', newColor);
  playClickSound();
}

// Add event listener for background color button
function initializeBackgroundChanger() {
  const bgButton = document.getElementById('bg-color-btn');
  if (bgButton) {
    bgButton.addEventListener('click', changeBackgroundColor);
    console.log('Background color changer initialized');
  } else {
    console.log('Background color button not found');
  }
}

// ===== TASK 1.2: Dynamic Style Changes - Theme Switcher =====
// Author: Chingiz
// Day/Night theme toggle
function initializeThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'day';
    applyTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.classList.contains('night-theme') ? 'night' : 'day';
      const newTheme = currentTheme === 'day' ? 'night' : 'day';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  if (theme === 'night') {
    document.body.classList.add('night-theme');
    document.body.style.backgroundColor = '#1a1a2e';
    document.body.style.color = '#eee';
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = '☀️ Day Mode';
    }
  } else {
    document.body.classList.remove('night-theme');
    document.body.style.backgroundColor = '#f5f5f0';
    document.body.style.color = '#333';
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = '🌙 Night Mode';
    }
  }
}

// ===== TASK 1.3: Manipulating Attributes - Rating System =====
// Author: Sultan
// Star rating implementation
function initializeRatingSystem() {
  const stars = document.querySelectorAll('.rating-star');
  const ratingDisplay = document.getElementById('rating-display');
  
  stars.forEach((star, index) => {
    star.addEventListener('click', function() {
      const rating = index + 1;
      
      // Update all stars
      stars.forEach((s, i) => {
        if (i < rating) {
          s.style.color = '#FFD700';
          s.textContent = '★';
        } else {
          s.style.color = '#ccc';
          s.textContent = '☆';
        }
      });
      
      // Update rating display
      if (ratingDisplay) {
        ratingDisplay.textContent = `Your rating: ${rating} out of 5 stars`;
      }
    });
    
    // Hover effect
    star.addEventListener('mouseenter', function() {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.style.transform = 'scale(1.2)';
        }
      });
    });
    
    star.addEventListener('mouseleave', function() {
      stars.forEach((s) => {
        s.style.transform = 'scale(1)';
      });
    });
  });
}

// ========================================
// PART 2: EVENT HANDLING
// ========================================

// ===== TASK 2.1: Event Listeners on Buttons - Current Time Display =====
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

function initializeDateTimeDisplay() {
  const dateTimeElement = document.getElementById('current-datetime');
  if (dateTimeElement) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }
  
  // Add button to show/hide time
  const timeToggleBtn = document.getElementById('time-toggle-btn');
  if (timeToggleBtn && dateTimeElement) {
    timeToggleBtn.addEventListener('click', function() {
      if (dateTimeElement.style.display === 'none') {
        dateTimeElement.style.display = 'inline';
        timeToggleBtn.textContent = 'Hide Time';
      } else {
        dateTimeElement.style.display = 'none';
        timeToggleBtn.textContent = 'Show Time';
      }
    });
  }
}

// ===== TASK 2.2: Keyboard Event Handling - Navigation =====
// Author: Sultan
function initializeKeyboardNavigation() {
  const navLinks = document.querySelectorAll('.navigation a');
  let currentIndex = 0;
  
  if (navLinks.length > 0) {
    // Set initial focus
    navLinks[currentIndex].style.outline = '2px solid #8B4513';
    
    document.addEventListener('keydown', function(event) {
      // Only handle navigation when not in input fields
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        // Remove highlight from current
        navLinks[currentIndex].style.outline = 'none';
        // Move to next
        currentIndex = (currentIndex + 1) % navLinks.length;
        // Highlight new
        navLinks[currentIndex].style.outline = '2px solid #8B4513';
        navLinks[currentIndex].focus();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        // Remove highlight from current
        navLinks[currentIndex].style.outline = 'none';
        // Move to previous
        currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        // Highlight new
        navLinks[currentIndex].style.outline = '2px solid #8B4513';
        navLinks[currentIndex].focus();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        navLinks[currentIndex].click();
      }
    });
  }
}

// ===== TASK 2.3: Callbacks - Reservation Form Submission =====
// Author: Sultan
function validateReservationForm(event) {
  event.preventDefault();
  
  // Clear previous errors
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  let isValid = true;
  
  // Get form fields
  const name = document.getElementById('guest-name');
  const email = document.getElementById('guest-email');
  const phone = document.getElementById('guest-phone');
  const partySize = document.getElementById('party-size');
  const date = document.getElementById('reservation-date');
  const time = document.getElementById('reservation-time');
  
  // Validate Name
  if (name && (!name.value.trim() || name.value.trim().length < 2)) {
    showError(name, 'Name must be at least 2 characters long');
    isValid = false;
  }
  
  // Validate Email
  const emailRegex = /^[^\s@]+@

function submitReservation(form, callback) {
  // Simulate async submission
  setTimeout(function() {
    callback(true);
  }, 500);
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

function showSuccessMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'success-message';
  messageDiv.style.cssText = 'background:#4CAF50; color:#fff; padding:15px; border-radius:5px; margin:20px auto; max-width:700px; text-align:center; animation: slideIn 0.3s ease;';
  messageDiv.textContent = message;
  
  const form = document.querySelector('.contact-form');
  if (form) {
    form.parentNode.insertBefore(messageDiv, form);
    setTimeout(() => messageDiv.remove(), 5000);
  }
}

function showErrorMessage(message) {
  alert(message);
}

// ===== TASK 2.4: Switch Statement - Content Filter =====
// Author: Kaisar
function initializeContentFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const contentItems = document.querySelectorAll('.content-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter content using switch
      contentItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        switch(category) {
          case 'all':
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease';
            break;
          case 'appetizers':
            item.style.display = itemCategory === 'appetizers' ? 'block' : 'none';
            break;
          case 'mains':
            item.style.display = itemCategory === 'mains' ? 'block' : 'none';
            break;
          case 'desserts':
            item.style.display = itemCategory === 'desserts' ? 'block' : 'none';
            break;
          default:
            item.style.display = 'block';
        }
      });
    });
  });
}

// Greeting based on time of day using switch
function displayTimeBasedGreeting() {
  const greetingElement = document.getElementById('time-greeting');
  if (!greetingElement) return;
  
  const hour = new Date().getHours();
  let greeting;
  
  switch(true) {
    case (hour >= 5 && hour < 12):
      greeting = '🌅 Good Morning! Start your day with our breakfast specials.';
      greetingElement.style.background = '#FFE4B5';
      break;
    case (hour >= 12 && hour < 17):
      greeting = '☀️ Good Afternoon! Enjoy our lunch menu.';
      greetingElement.style.background = '#F0E68C';
      break;
    case (hour >= 17 && hour < 21):
      greeting = '🌆 Good Evening! Discover our dinner selections.';
      greetingElement.style.background = '#DEB887';
      break;
    default:
      greeting = '🌙 Good Night! We\'re closed now, but you can make a reservation for tomorrow.';
      greetingElement.style.background = '#8B4513';
      greetingElement.style.color = '#fff';
  }
  
  greetingElement.textContent = greeting;
}

// ========================================
// PART 3: JAVASCRIPT ADVANCED CONCEPTS
// ========================================

// ===== TASK 3.1: Objects and Methods =====
// Author: Chingiz
const Restaurant = {
  name: 'God loves the Trinity',
  location: '123 Divine Street, Heaven\'s Gate City',
  rating: 0,
  reviews: [],
  
  addReview: function(customerName, rating, comment) {
    this.reviews.push({
      customer: customerName,
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString()
    });
    this.updateAverageRating();
  },
  
  updateAverageRating: function() {
    if (this.reviews.length === 0) {
      this.rating = 0;
      return;
    }
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = (sum / this.reviews.length).toFixed(1);
  },
  
  displayReviews: function() {
    const reviewContainer = document.getElementById('reviews-container');
    if (!reviewContainer) return;
    
    reviewContainer.innerHTML = '<h3>Customer Reviews</h3>';
    
    if (this.reviews.length === 0) {
      reviewContainer.innerHTML += '<p>No reviews yet. Be the first to review!</p>';
      return;
    }
    
    this.reviews.forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review-item';
      reviewDiv.style.cssText = 'background:#fff; padding:15px; margin:10px 0; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.1);';
      reviewDiv.innerHTML = `
        <strong>${review.customer}</strong> - ⭐ ${review.rating}/5
        <br><small>${review.date}</small>
        <p>${review.comment}</p>
      `;
      reviewContainer.appendChild(reviewDiv);
    });
    
    const avgDiv = document.createElement('div');
    avgDiv.style.cssText = 'background:#F0E68C; padding:15px; border-radius:8px; text-align:center; margin-top:20px;';
    avgDiv.innerHTML = `<strong>Average Rating: ${this.rating} ⭐</strong>`;
    reviewContainer.appendChild(avgDiv);
  }
};

// ===== TASK 3.2: Arrays and Loops =====
// Author: Sultan
const menuItems = [
  { name: 'Sacred Bruschetta', category: 'appetizers', price: 8.99 },
  { name: 'Holy Hummus Platter', category: 'appetizers', price: 7.50 },
  { name: 'Trinity Pasta', category: 'mains', price: 16.99 },
  { name: 'Blessed Burger', category: 'mains', price: 14.50 },
  { name: 'Heavenly Salmon', category: 'mains', price: 19.75 },
  { name: 'Angel Food Cake', category: 'desserts', price: 6.99 },
  { name: 'Divine Chocolate Mousse', category: 'desserts', price: 8.50 }
];

function displayMenuItems() {
  const menuContainer = document.getElementById('dynamic-menu');
  if (!menuContainer) return;
  
  menuContainer.innerHTML = '';
  
  // Group by category
  const categories = ['appetizers', 'mains', 'desserts'];
  
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'menu-category';
    categoryDiv.innerHTML = `<h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;
    
    let itemCount = 0;
    for (let j = 0; j < menuItems.length; j++) {
      if (menuItems[j].category === category) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item-dynamic';
        itemDiv.style.cssText = 'padding:10px; margin:5px 0; background:#fff; border-radius:5px; display:flex; justify-content:space-between;';
        itemDiv.innerHTML = `
          <span>${menuItems[j].name}</span>
          <strong>$${menuItems[j].price}</strong>
        `;
        categoryDiv.appendChild(itemDiv);
        itemCount++;
      }
    }
    
    if (itemCount > 0) {
      menuContainer.appendChild(categoryDiv);
    }
  }
}

// ===== TASK 3.3: Higher-Order Functions =====
// Author: Kaisar
function filterMenuByPrice(maxPrice) {
  return menuItems.filter(item => item.price <= maxPrice);
}

function applyDiscountToMenu(discountPercent) {
  return menuItems.map(item => ({
    ...item,
    originalPrice: item.price,
    price: (item.price * (1 - discountPercent / 100)).toFixed(2)
  }));
}

function displayDiscountedMenu() {
  const discountedItems = applyDiscountToMenu(10); // 10% discount
  const menuContainer = document.getElementById('special-offers');
  
  if (!menuContainer) return;
  
  menuContainer.innerHTML = '<h3>🎉 Special Offers - 10% Off!</h3>';
  
  discountedItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.style.cssText = 'padding:10px; background:#fff; margin:10px 0; border-radius:5px;';
    itemDiv.innerHTML = `
      <strong>${item.name}</strong><br>
      <span style="text-decoration:line-through; color:#999;">$${item.originalPrice}</span>
      <span style="color:#d32f2f; font-weight:bold;"> → $${item.price}</span>
    `;
    menuContainer.appendChild(itemDiv);
  });
}

// ===== TASK 3.4: Play Sounds =====
// Author: Chingiz
function playSuccessSound() {
  // Create audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

function playClickSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 400;
  oscillator.type = 'square';
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sound to all buttons
function addSoundToButtons() {
  const buttons = document.querySelectorAll('button, .button-style');
  buttons.forEach(button => {
    button.addEventListener('click', playClickSound);
  });
}

// ===== TASK 3.5: Animations =====
// Author: Kaisar
function initializeAnimations() {
  // Fade in animation for cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
  
  // Smooth scroll animation
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Accordion functionality
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.accordion-content');
        otherContent.style.maxHeight = null;
        
        const otherIcon = otherItem.querySelector('.accordion-icon');
        otherIcon.style.transform = 'rotate(0deg)';
      });
      
      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        
        const icon = header.querySelector('.accordion-icon');
        icon.style.transform = 'rotate(45deg)';
      }
      
      playClickSound();
    });
  });
}

// Popup functionality
function openPopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    playClickSound();
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

// ========================================
// INITIALIZATION
// ========================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Part 1: DOM Manipulation
  initializeGreeting();
  initializeBackgroundChanger(); // ВОССТАНОВЛЕНО
  initializeThemeSwitcher();
  initializeRatingSystem();
  
  // Part 2: Event Handling
  initializeDateTimeDisplay();
  initializeKeyboardNavigation();
  initializeContentFilter();
  displayTimeBasedGreeting();
  
  // Part 3: Advanced Concepts
  displayMenuItems();
  displayDiscountedMenu();
  addSoundToButtons();
  initializeAnimations();
  initAccordion();
  
  // Form validation
  const reservationForm = document.querySelector('#booking-header + .about-content + .contact-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', validateReservationForm);
  }
  
  // Popup handlers
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
  
  // Demo: Add sample review
  setTimeout(() => {
    Restaurant.addReview('John Doe', 5, 'Amazing food and atmosphere!');
    Restaurant.addReview('Jane Smith', 4, 'Great service, loved the pasta!');
    Restaurant.displayReviews();
  }, 1000);
  
  console.log('🎉 All features initialized successfully!');
});
