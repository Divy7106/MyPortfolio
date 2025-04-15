
// ---------------------- SCRIPT FOR Q1
document.addEventListener('DOMContentLoaded', function () {
    var interBubble = document.querySelector('.interactive');
    var curX = 0;
    var curY = 0;
    var tgX = 0;
    var tgY = 0;
    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = "translate(".concat(Math.round(curX), "px, ").concat(Math.round(curY), "px)");
        requestAnimationFrame(function () {
            move();
        });
    }
    window.addEventListener('mousemove', function (event) {
        tgX = event.clientX;
        tgY = event.clientY;
    }); 
    move();
});



// MAIN INFO :
document.addEventListener('DOMContentLoaded', function() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section:not(.hero)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Initialize scroll-scale elements
    const scrollScaleElements = document.querySelectorAll('[data-scroll-scale]');
    scrollScaleElements.forEach(element => {
      element.classList.add('active'); // Make visible but will scale based on scroll
    });
    
    // Function to update scale based on element's position in viewport
    function updateElementScale() {
      scrollScaleElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how far element is from center of viewport (percentage)
        const elementCenter = rect.top + (rect.height / 2);
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = viewportHeight / 2;
        
        // Calculate scale based on distance (1.0 when centered, smaller as it moves away)
        let scale;
        if (elementCenter < 0 || elementCenter > viewportHeight) {
          // Element is outside viewport
          scale = 0.9; // Minimum scale
        } else {
          // Calculate scale between 0.7 and 1.1 based on distance from center
          const distanceRatio = 1 - (distanceFromCenter / maxDistance);
          scale = 0.9 + (distanceRatio * 0.2); // Scale between 0.7 and 1.1
        }
        
        // Apply scale transform
        element.style.transform = `scale(${scale/1.2})`;
      });
    }
    
    // Animate education items
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
      observer.observe(item);
    });
    
    // Animate skill bars
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = width;
            }, 300);
          });
        }
      });
    }, {
      threshold: 0.5
    });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
      skillObserver.observe(skillsSection);
    }
    
    // Apply scroll-based scaling on scroll
    window.addEventListener('scroll', updateElementScale);
    
    // Call once on load to set initial state
    updateElementScale();
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: 'smooth'
          });
        }
      });
    });
  });

// ---------------- Q2
// Initialize tracking on page load
document.addEventListener('DOMContentLoaded', function() {
  // Track page view when content is loaded
  logEvent('view', 'page');
  
  // Add click event listener to entire document
  document.addEventListener('click', function(event) {
    // Get the clicked element
    const element = event.target;
    
    // Determine the type of element clicked
    const elementType = getElementType(element);
    
    // Log the click event
    logEvent('click', elementType);
  });
  
  // Track when elements become visible in viewport
  setupViewportTracking();
});

/**
 * Log event details to console in required format
 * @param {string} eventType - Type of event (click or view)
 * @param {string} objectType - Type of object interacted with
 */
function logEvent(eventType, objectType) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}, ${eventType}, ${objectType}`);
}

/**
 * Determine the type of element based on tag, attributes, and CSS
 * @param {HTMLElement} element - The DOM element to analyze
 * @return {string} Description of the element type
 */
function getElementType(element) {
  // Check for common elements by tag name
  const tagName = element.tagName.toLowerCase();
  
  // Handle specific element types
  switch(tagName) {
    case 'a': return 'link';
    case 'button': return 'button';
    case 'input':
      return element.type === 'submit' ? 'submit button' :
             element.type === 'checkbox' ? 'checkbox' :
             element.type === 'radio' ? 'radio button' :
             element.type === 'text' ? 'text input' :
             `input-${element.type}`;
    case 'select': return 'dropdown';
    case 'textarea': return 'text area';
    case 'img': return 'image';
    case 'video': return 'video';
    case 'audio': return 'audio';
    case 'form': return 'form';
    case 'label': return 'label';
    case 'li': return 'list item';
    case 'option': return 'dropdown option';
  }
  
  // Check for role attributes for accessibility elements
  if (element.hasAttribute('role')) {
    return `${element.getAttribute('role')}`;
  }
  
  // Check for common CSS classes or IDs to identify UI components
  const classAndId = (element.className || '') + ' ' + (element.id || '');
  const lowerClassAndId = classAndId.toLowerCase();
  
  if (lowerClassAndId.includes('nav')) return 'navigation';
  if (lowerClassAndId.includes('btn') || lowerClassAndId.includes('button')) return 'button';
  if (lowerClassAndId.includes('menu')) return 'menu';
  if (lowerClassAndId.includes('dropdown')) return 'dropdown';
  if (lowerClassAndId.includes('modal')) return 'modal';
  if (lowerClassAndId.includes('card')) return 'card';
  if (lowerClassAndId.includes('slider')) return 'slider';
  if (lowerClassAndId.includes('carousel')) return 'carousel';
  if (lowerClassAndId.includes('tab')) return 'tab';
  if (lowerClassAndId.includes('accordion')) return 'accordion';
  
  // If no specific identifier found, use the tag name and text content
  const textContent = element.textContent.trim();
  if (textContent && textContent.length < 20) {
    return `${tagName} (${textContent})`;
  }
  
  // Last resort: just return the tag name
  return tagName;
}

/**
 * Set up tracking for elements becoming visible in the viewport
 */
function setupViewportTracking() {
  // Use Intersection Observer API if available
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // use viewport
      threshold: 0.5 // element is 50% visible
    };
    
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is now visible
          const elementType = getElementType(entry.target);
          logEvent('view', elementType);
          
          // Stop observing once it's been seen
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe important elements (you can customize this list)
    const elementsToTrack = [
      'img', 'video', 'iframe', 'h1', 'h2', 'section', 
      '.card', '.product', '.feature', '.testimonial'
    ].join(',');
    
    document.querySelectorAll(elementsToTrack).forEach(element => {
      observer.observe(element);
    });
  }
}

// Function to manually track custom events if needed
function trackCustomEvent(eventName, objectDescription) {
  logEvent(eventName, objectDescription);
}

// ---------------- Q3
document.addEventListener('DOMContentLoaded', function() {
  const analyzeButton = document.getElementById('analyzeButton');
  
  // Set up intersection observer for scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15, // Element is 15% visible before animation triggers
    rootMargin: '0px 0px -50px 0px' // Triggers slightly before element comes into view
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  analyzeButton.addEventListener('click', function() {
    analyzeText();
    
    // Reset and re-observe animations for results
    const resultSections = document.querySelectorAll('.result-section');
    resultSections.forEach(section => {
      section.classList.remove('visible');
      setTimeout(() => {
        observer.unobserve(section);
        observer.observe(section);
      }, 100);
    });
  });
  
  function analyzeText() {
    const text = document.getElementById('textInput').value;
    
    if (!text.trim()) {
      alert('Please enter some text to analyze.');
      return;
    }
    
    // Basic text statistics
    calculateBasicStats(text);
    
    // Tokenize the text (simple splitting by spaces and removing punctuation)
    const words = tokenizeText(text);
    
    // Analyze pronouns, prepositions, and indefinite articles
    countWordGroups(words);
  }
  
  function calculateBasicStats(text) {
    // Count letters (alphanumeric characters)
    const letterCount = (text.match(/[a-zA-Z0-9]/g) || []).length;
    
    // Count words
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    
    // Count spaces
    const spaceCount = (text.match(/\s/g) || []).length;
    
    // Count newlines
    const newlineCount = (text.match(/\n/g) || []).length;
    
    // Count special symbols (non-alphanumeric, non-whitespace)
    const specialCount = (text.match(/[^\w\s]/g) || []).length;
    
    // Update the DOM
    document.getElementById('letterCount').textContent = letterCount;
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('spaceCount').textContent = spaceCount;
    document.getElementById('newlineCount').textContent = newlineCount;
    document.getElementById('specialCount').textContent = specialCount;
  }
  
  function tokenizeText(text) {
    // Convert to lowercase
    const lowercase = text.toLowerCase();
    
    // Split by whitespace and remove punctuation
    const words = lowercase.split(/\s+/)
      .map(word => word.replace(/[^\w']/g, ''))
      .filter(word => word.length > 0);
    
    return words;
  }
  
  function countWordGroups(words) {
    // Define word lists
    const pronouns = [
      'i', 'me', 'my', 'mine', 'myself',
      'you', 'your', 'yours', 'yourself', 'yourselves',
      'he', 'him', 'his', 'himself',
      'she', 'her', 'hers', 'herself',
      'it', 'its', 'itself',
      'we', 'us', 'our', 'ours', 'ourselves',
      'they', 'them', 'their', 'theirs', 'themselves',
      'this', 'that', 'these', 'those',
      'who', 'whom', 'whose', 'which', 'what',
      'whoever', 'whomever', 'whatever', 'whichever'
    ];
    
    const prepositions = [
      'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
      'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond',
      'by', 'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside',
      'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over',
      'past', 'since', 'through', 'throughout', 'to', 'toward', 'towards', 'under',
      'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'
    ];
    
    const indefiniteArticles = ['a', 'an', 'the', 'some', 'any'];
    
    // Initialize count objects
    const pronounCounts = {};
    const prepositionCounts = {};
    const articleCounts = {};
    
    // Count occurrences
    words.forEach(word => {
      if (pronouns.includes(word)) {
        pronounCounts[word] = (pronounCounts[word] || 0) + 1;
      }
      
      if (prepositions.includes(word)) {
        prepositionCounts[word] = (prepositionCounts[word] || 0) + 1;
      }
      
      if (indefiniteArticles.includes(word)) {
        articleCounts[word] = (articleCounts[word] || 0) + 1;
      }
    });
    
    // Display the results
    displayWordCounts('pronounStats', pronounCounts);
    displayWordCounts('prepositionStats', prepositionCounts);
    displayWordCounts('articleStats', articleCounts);
  }
  
  function displayWordCounts(elementId, countObject) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    // Sort by count (descending)
    const sortedItems = Object.entries(countObject)
      .sort((a, b) => b[1] - a[1]);
    
    if (sortedItems.length === 0) {
      container.innerHTML = '<p>None found in the text.</p>';
      return;
    }
    
    // Create DOM elements for each word and its count
    sortedItems.forEach(([word, count], index) => {
      const wordItem = document.createElement('div');
      wordItem.className = 'word-item';
      wordItem.style.animationDelay = `${index * 0.05}s`; // Staggered animation
      
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word;
      
      const countSpan = document.createElement('span');
      countSpan.className = 'count';
      countSpan.textContent = count;
      
      wordItem.appendChild(wordSpan);
      wordItem.appendChild(countSpan);
      container.appendChild(wordItem);
      
      // Force reflow for animation
      setTimeout(() => {
        wordItem.style.opacity = "1";
        wordItem.style.transform = "translateY(0)";
      }, 10);
    });
  }
});

