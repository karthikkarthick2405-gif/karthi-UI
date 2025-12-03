// Sample project data

//Adding space
const projects = [
    {
        id: 1,
        title: "E-commerce Dashboard",
        category: "web",
        price: 299,
        description: "Complete admin dashboard with analytics and product management",
        icon: "🛒",
        rating: 4.8
    },
    {
        id: 2,
        title: "Fitness Tracker App",
        category: "mobile",
        price: 399,
        description: "Cross-platform mobile app for tracking workouts and nutrition",
        icon: "💪",
        rating: 4.9
    },
    {
        id: 3,
        title: "AI Chatbot System",
        category: "ai",
        price: 599,
        description: "Intelligent chatbot with natural language processing",
        icon: "🤖",
        rating: 4.7
    },
    {
        id: 4,
        title: "Brand Identity Kit",
        category: "design",
        price: 199,
        description: "Complete branding package with logos and style guide",
        icon: "🎨",
        rating: 4.6
    },
    {
        id: 5,
        title: "Portfolio Website",
        category: "web",
        price: 149,
        description: "Modern responsive portfolio template with animations",
        icon: "💼",
        rating: 4.5
    },
    {
        id: 6,
        title: "Recipe App",
        category: "mobile",
        price: 249,
        description: "Mobile app with recipes, meal planning, and shopping lists",
        icon: "🍳",
        rating: 4.7
    },
    {
        id: 7,
        title: "Image Recognition AI",
        category: "ai",
        price: 799,
        description: "Deep learning model for image classification and detection",
        icon: "📸",
        rating: 4.9
    },
    {
        id: 8,
        title: "UI Component Library",
        category: "design",
        price: 179,
        description: "50+ reusable UI components for modern interfaces",
        icon: "🧩",
        rating: 4.8
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sellBtn = document.getElementById('sellBtn');
const modal = document.getElementById('sellModal');
const closeModal = document.querySelector('.close');
const sellForm = document.getElementById('sellForm');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProjects(projects);
    setupEventListeners();
});

// Display projects
function displayProjects(projectsToShow) {
    projectsGrid.innerHTML = '';
    
    projectsToShow.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image">${project.icon}</div>
        <div class="project-content">
            <span class="project-category">${getCategoryName(project.category)}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-footer">
                <span class="project-price">$${project.price}</span>
                <div class="project-rating">
                    <span>⭐</span>
                    <span>${project.rating}</span>
                </div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showProjectDetails(project);
    });
    
    return card;
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        web: 'Web Development',
        mobile: 'Mobile Apps',
        ai: 'AI & ML',
        design: 'Design'
    };
    return categories[category] || category;
}

// Show project details
function showProjectDetails(project) {
    alert(`Project: ${project.title}\nCategory: ${getCategoryName(project.category)}\nPrice: $${project.price}\nRating: ${project.rating}⭐\n\n${project.description}\n\nThis would open a detailed view in a real application!`);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            if (category === 'all') {
                displayProjects(projects);
            } else {
                const filtered = projects.filter(p => p.category === category);
                displayProjects(filtered);
            }
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Modal controls
    sellBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Forms
    sellForm.addEventListener('submit', handleSellSubmit);
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Perform search
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        displayProjects(projects);
        return;
    }
    
    const filtered = projects.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        getCategoryName(p.category).toLowerCase().includes(query)
    );
    
    displayProjects(filtered);
    
    if (filtered.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #6b7280;">No projects found matching your search.</p>';
    }
}

// Handle sell form submission
function handleSellSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('projectTitle').value;
    const category = document.getElementById('projectCategory').value;
    const price = document.getElementById('projectPrice').value;
    const description = document.getElementById('projectDescription').value;
    
    // In a real application, this would send data to a server
    console.log('New project submission:', { title, category, price, description });
    
    alert(`Thank you for submitting your project!\n\nTitle: ${title}\nCategory: ${getCategoryName(category)}\nPrice: $${price}\n\nYour project will be reviewed and listed soon!`);
    
    sellForm.reset();
    modal.style.display = 'none';
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, this would send data to a server
    console.log('Contact form submission:', { name, email, message });
    
    alert(`Thank you for contacting us, ${name}!\n\nWe've received your message and will get back to you at ${email} shortly.`);
    
    contactForm.reset();
}

// Add some animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for animation
setTimeout(() => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
}, 100);
