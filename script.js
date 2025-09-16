// ==============================================
// PART 2: JavaScript Functions - Scope, Parameters & Return Values
// ==============================================

// Global scope variable
let globalCounter = 0;

// Function with parameters and return value
function calculateSum(a, b) {
    // Local scope variables
    const result = a + b;
    return result;
}

// Function demonstrating closure
function createCounter() {
    // Local variable encapsulated by the function
    let privateCount = 0;
    
    return {
        increment: function() {
            privateCount++;
            return privateCount;
        },
        decrement: function() {
            privateCount--;
            return privateCount;
        },
        getCount: function() {
            return privateCount;
        },
        reset: function() {
            privateCount = 0;
            return privateCount;
        }
    };
}

// Function with default parameters
function applyDiscount(price, discount = 10) {
    return price - (price * discount / 100);
}

// ==============================================
// PART 3: Combining CSS Animations with JavaScript
// ==============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dark/Light Mode Toggle
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or respect OS preference
    if (localStorage.getItem('theme') === 'dark' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Counter Game with closure implementation
    const counterDisplay = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    const incrementFiveBtn = document.getElementById('increment-five-btn');
    
    // Create a counter instance using the factory function
    const counter = createCounter();
    
    function updateCounter() {
        const count = counter.getCount();
        counterDisplay.textContent = count;
        
        // Change color based on value using a function with return value
        counterDisplay.style.color = getCounterColor(count);
        
        // Celebration when reaching 10
        if (count === 10) {
            triggerCelebration();
        }
    }
    
    // Function that returns a value based on input
    function getCounterColor(count) {
        if (count > 0) {
            return '#2a9d8f';
        } else if (count < 0) {
            return '#e63946';
        } else {
            return 'var(--text-color)';
        }
    }
    
    // Function that triggers an animation
    function triggerCelebration() {
        counterDisplay.classList.add('pulse');
        setTimeout(() => {
            counterDisplay.classList.remove('pulse');
        }, 2000);
    }
    
    incrementBtn.addEventListener('click', function() {
        counter.increment();
        updateCounter();
    });
    
    decrementBtn.addEventListener('click', function() {
        counter.decrement();
        updateCounter();
    });
    
    incrementFiveBtn.addEventListener('click', function() {
        // Using the calculateSum function
        const newValue = calculateSum(counter.getCount(), 5);
        // Set the counter to the new value
        while (counter.getCount() < newValue) {
            counter.increment();
        }
        updateCounter();
    });
    
    resetBtn.addEventListener('click', function() {
        counter.reset();
        updateCounter();
    });

    // Animation Controls
    const bounceBtn = document.getElementById('bounce-btn');
    const pulseBtn = document.getElementById('pulse-btn');
    const flipBtn = document.getElementById('flip-btn');
    const fadeOutBtn = document.getElementById('fade-out-btn');
    const resetAnimationBtn = document.getElementById('reset-animation-btn');
    const animationTarget = document.getElementById('animation-target');
    
    // Function to apply animation with parameters
    function applyAnimation(element, animationName, duration = 0.5) {
        // Reset any existing animations
        element.classList.remove('bounce', 'pulse', 'flip', 'fade-out');
        
        // Apply the new animation
        element.classList.add(animationName);
        
        // Remove the animation after it completes
        setTimeout(() => {
            element.classList.remove(animationName);
        }, duration * 1000);
    }
    
    bounceBtn.addEventListener('click', function() {
        applyAnimation(animationTarget, 'bounce');
    });
    
    pulseBtn.addEventListener('click', function() {
        // For pulse, we don't want it to auto-remove
        animationTarget.classList.remove('bounce', 'flip', 'fade-out');
        animationTarget.classList.toggle('pulse');
    });
    
    flipBtn.addEventListener('click', function() {
        applyAnimation(animationTarget, 'flip', 1);
    });
    
    fadeOutBtn.addEventListener('click', function() {
        applyAnimation(animationTarget, 'fade-out');
    });
    
    resetAnimationBtn.addEventListener('click', function() {
        animationTarget.classList.remove('bounce', 'pulse', 'flip', 'fade-out');
    });

    // Card Flip Animation
    const card = document.getElementById('card');
    
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });

    // Form Validation
    const form = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Validate name
    function validateName() {
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim().length < 2) {
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }
    
    // Validate email
    function validateEmail() {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    // Validate message
    function validateMessage() {
        const messageError = document.getElementById('message-error');
        if (messageInput.value.trim().length < 10) {
            messageError.style.display = 'block';
            return false;
        } else {
            messageError.style.display = 'none';
            return true;
        }
    }
    
    // Add input event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // If all fields are valid, show success message
        if (isNameValid && isEmailValid && isMessageValid) {
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
            
            // Add a celebration animation
            successMessage.classList.add('slide-in-left');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    // Demonstrate function with parameters and return values
    console.log("Sum of 5 and 7:", calculateSum(5, 7));
    console.log("Price after discount:", applyDiscount(100, 20));
    console.log("Price with default discount:", applyDiscount(100));
});