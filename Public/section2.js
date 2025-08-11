const track = document.querySelector('.carousel-track');    // The carousel container holding the slides
const slides = Array.from(track.children);                  // All the slides inside the track
const nextButton = document.querySelector('.next');         // The "Next" button
const prevButton = document.querySelector('.prev');         // The "Previous" button
const dotsNav = document.querySelector('.carousel-dots');   // The dots navigation container
const dots = Array.from(dotsNav.children);                  // The individual dots for navigation

// Get the width of a single slide
const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides side by side in a row
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

let currentSlideIndex = 0; // The index of the currently visible slide

// Move to a specific slide based on the index
const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + (slideWidth * index) + 'px)';  // Move the track to the correct position
    dots.forEach(dot => dot.classList.remove('active'));                    // Remove active class from all dots
    dots[index].classList.add('active');                                    // Add active class to the current dot
}

// Next Button - Move to the next slide (loop back to the first slide if on the last)
nextButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length; // Loop back to 0 after the last slide
    moveToSlide(currentSlideIndex);
});

// Previous Button - Move to the previous slide (loop back to the last slide if on the first)
prevButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; // Loop to last slide when going back from the first
    moveToSlide(currentSlideIndex);
});

// Auto slide every 3 seconds
let autoSlide = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;  // Move to the next slide (loop back to the first)
    moveToSlide(currentSlideIndex);
}, 3000);  // Change slide every 3 seconds

// Pause auto-slide when the user hovers over the carousel
track.addEventListener('mouseenter', () => clearInterval(autoSlide));

// Resume auto-slide when the user stops hovering over the carousel
track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(currentSlideIndex);
    }, 3000);  // Continue auto-sliding after 3 seconds
});

// Dot Navigation - Move to the slide when a dot is clicked
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlideIndex = index;   // Update the currentSlideIndex based on the dot clicked
        moveToSlide(currentSlideIndex);
    });
});


