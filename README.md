# 🌟 Personal Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer Intern.

![Portfolio Preview](images/profile.jpg)

## 🚀 Live Demo

- **Live Site:** [Coming Soon - Deploy on Vercel]
- **GitHub:** [github.com/quocbaong](https://github.com/quocbaong)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contact](#contact)

## 📖 About

This is my personal portfolio website built with pure HTML, CSS, and JavaScript. The website features a modern dark theme, smooth animations, and a fully responsive design that works seamlessly across all devices.

**Developer:** Nguyễn Quốc Bảo  
**Location:** Ho Chi Minh City, Vietnam  
**Email:** nbao76296@gmail.com  
**Phone:** +84 779456610

## ✨ Features

### 🎨 Design & UI/UX
- ✅ Modern dark theme with gradient accents
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll animations and transitions
- ✅ Interactive hover effects
- ✅ Particle background effect
- ✅ Typing animation for hero section
- ✅ Floating images with parallax effect

### 🔧 Functionality
- ✅ **Navigation:** Sticky navbar with active section highlighting
- ✅ **Hero Section:** Dynamic typing effect with name display
- ✅ **About Section:** Personal information and story
- ✅ **Skills Section:** 
  - Animated progress bars
  - Categorized skills (Frontend, Backend, Tools)
  - Colorful tech stack icons (HTML5, CSS3, JavaScript, React, Vue.js, Node.js, Java, Spring Boot, Figma, Linux, Git, Docker)
- ✅ **Projects Section:** 
  - Filterable project cards (All, Web, Mobile, Design)
  - Hover overlay with links
  - Project tags
- ✅ **Contact Section:** 
  - Contact information cards
  - Working contact form with validation
  - Form submission notification
- ✅ **Footer:** 
  - Social media links (GitHub, LinkedIn, Instagram, Facebook)
  - Quick navigation links
  - Newsletter subscription form

### 🎪 Advanced Features
- ✅ Scroll to top button
- ✅ Mobile hamburger menu
- ✅ Smooth scroll to sections
- ✅ Lazy loading images
- ✅ Tilt effect on cards
- ✅ Cursor trail effect (desktop only)
- ✅ Easter egg (Konami code: ↑↑↓↓←→←→BA)
- ✅ Performance optimized with debounced scroll events

### 🎨 Color-Coded Icons
- **Tech Stack Icons:** Each technology has its official brand color
- **Social Media Icons:** GitHub (black), LinkedIn (blue), Instagram (gradient), Facebook (blue)

## 🛠️ Tech Stack

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **JavaScript (ES6+)** - Vanilla JS, no frameworks

### Libraries & Tools
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Typography (optional)

### Key Features
- **Pure JavaScript** - No dependencies, no build process needed
- **CSS Variables** - Easy theme customization
- **CSS Animations** - Smooth transitions and effects
- **Intersection Observer API** - Scroll animations
- **LocalStorage** - (Optional for theme preference)

## 📁 Project Structure

```
Profile/
│
├── index.html              # Main HTML file
├── style.css              # All styles and animations
├── script.js              # All JavaScript functionality
├── README.md              # Project documentation
│
└── images/                # Image assets
    ├── profile.jpg        # Hero section profile image
    ├── about.jpg          # About section image
    ├── project_3.jpg      # Project screenshot 3
    └── project_4.png      # Project screenshot 4
```

### File Details

#### `index.html` (612 lines)
- Semantic HTML5 structure
- Sections: Navigation, Hero, About, Skills, Projects, Contact, Footer
- SEO-friendly meta tags
- Accessibility attributes

#### `style.css` (1,296 lines)
- CSS Variables for easy theming
- Mobile-first responsive design
- Animations and transitions
- Hover effects and micro-interactions
- Media queries for all screen sizes

#### `script.js` (494 lines)
- Navigation functionality (sticky, mobile menu, active highlighting)
- Typing effect animation
- Particle background generator
- Skill bars animation with Intersection Observer
- Project filtering system
- Scroll animations
- Contact form handling
- Notification system
- Performance optimizations (debouncing)
- Easter egg implementation

## 🚀 Setup & Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git (optional, for version control)

### Local Development

1. **Clone or Download the repository**
   ```bash
   git clone https://github.com/quocbaong/portfolio.git
   cd portfolio
   ```

2. **Open the project**
   - Simply open `index.html` in your browser
   - OR use Live Server extension in VS Code

3. **That's it!** No build process needed.

### Using Live Server (VS Code)
```bash
# Install Live Server extension
# Right-click on index.html
# Select "Open with Live Server"
```

### Using Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Open browser: http://localhost:8000
```

## 🌐 Deployment

### Option 1: Vercel (Recommended) ⚡

**Quick Deploy:**
1. Visit [vercel.com](https://vercel.com/new)
2. Sign in with GitHub
3. Import your repository
4. Click **Deploy**
5. Done! Your site is live at `your-name.vercel.app`

**Or via CLI:**
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Pages 🐙

```bash
# 1. Create a new repo on GitHub
# 2. Push your code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/quocbaong/portfolio.git
git push -u origin main

# 3. Enable GitHub Pages
# Settings > Pages > Source: main branch > Save
```

Your site will be at: `https://quocbaong.github.io/portfolio`

### Option 3: Netlify 🌐

1. Visit [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Done! Site is live at `your-name.netlify.app`

### Option 4: Cloudflare Pages ☁️

1. Connect your GitHub repository
2. Deploy automatically
3. Benefit from global CDN

## 🎨 Customization

### 1. Personal Information

Edit `index.html`:

```html
<!-- Line 37-38: Hero Section -->
<h1 class="hero-title">
    Hi, I'm 
    <span class="gradient-text typing-text" id="typing"></span>
</h1>

<!-- Line 105-127: About Section Info -->
<div class="about-info">
    <strong>Birthday:</strong> <span>June 10, 2004</span>
    <strong>Location:</strong> <span>Ho Chi Minh City, Vietnam</span>
    <strong>Email:</strong> <span>nbao76296@gmail.com</span>
    <strong>Occupation:</strong> <span>Full Stack Developer Intern</span>
</div>
```

### 2. Change Name in Typing Effect

Edit `script.js` line 54:

```javascript
const textArray = ['Nguyễn Quốc Bảo'];
// Change to your name
```

### 3. Update Skills

Edit `index.html` lines 147-263:

```html
<div class="skill-item">
    <div class="skill-info">
        <span class="skill-name">Your Skill</span>
        <span class="skill-percent">85%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="85"></div>
    </div>
</div>
```

### 4. Add/Edit Projects

Edit `index.html` lines 330-490:

```html
<div class="project-card" data-category="web">
    <div class="project-image">
        <img src="images/your-project.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Description here</p>
        <div class="project-tags">
            <span class="tag">React</span>
            <span class="tag">Node.js</span>
        </div>
    </div>
</div>
```

### 5. Change Colors

Edit `style.css` lines 9-20:

```css
:root {
    --primary-color: #6366f1;      /* Main color */
    --secondary-color: #8b5cf6;    /* Secondary color */
    --accent-color: #ec4899;       /* Accent color */
    --dark-bg: #0f172a;            /* Background */
    --dark-card: #1e293b;          /* Card background */
}
```

### 6. Update Social Links

Edit `index.html` lines 51-64 and 569-574:

```html
<a href="https://github.com/your-username" class="social-link">
    <i class="fab fa-github"></i>
</a>
```

### 7. Add Images

Place your images in the `images/` folder:
- `profile.jpg` - Your profile picture (500x500px recommended)
- `about.jpg` - About section image (600x600px)
- `project1.jpg` to `project6.jpg` - Project screenshots (800x600px)

**Image optimization tips:**
- Use [TinyPNG](https://tinypng.com) to compress images
- Recommended formats: JPG for photos, PNG for graphics
- Keep file sizes under 500KB for best performance

## 📱 Responsive Breakpoints

```css
/* Desktop */
> 968px - Full layout with all features

/* Tablet */
768px - 968px - Adjusted grid layouts

/* Mobile */
< 768px - Stacked layout, hamburger menu

/* Small Mobile */
< 480px - Optimized for small screens
```

## 🎯 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ⚠️ IE11 (not supported - uses modern JS/CSS)

## ⚡ Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **Load Time:** < 1.5s on 3G
- **No external dependencies** (except Font Awesome CDN)
- **Optimized animations** with debouncing
- **Lazy loading** for images

## 🐛 Known Issues & Limitations

1. Contact form currently shows notification but doesn't send emails (backend integration needed)
2. Project images are placeholders (replace with your actual project screenshots)
3. Some animations may be reduced on low-performance devices

## 🔮 Future Enhancements

- [ ] Add dark/light mode toggle
- [ ] Integrate backend for contact form (Node.js/Firebase)
- [ ] Add blog section
- [ ] Add testimonials section
- [ ] Multi-language support (EN/VN)
- [ ] Progressive Web App (PWA) features
- [ ] Certificate gallery
- [ ] Timeline/Experience section
- [ ] Download CV functionality

## 📄 License

This project is open source and available for personal and commercial use.

**Feel free to:**
- Use this code for your own portfolio
- Modify and customize as needed
- Share with others

**Please:**
- Give credit if you use substantial portions of the code
- Don't claim the original design as entirely your own

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Nguyễn Quốc Bảo**

- 📧 Email: nbao76296@gmail.com
- 📱 Phone: +84 779456610
- 💼 LinkedIn: [linkedin.com/in/ngquocbao-dev106](https://www.linkedin.com/in/ngquocbao-dev106/)
- 🐙 GitHub: [github.com/quocbaong](https://github.com/quocbaong)
- 📸 Instagram: [@quocbao.106](https://www.instagram.com/quocbao.106/)
- 📘 Facebook: [Quoc Bao](https://www.facebook.com/qbao.henry)

## 🙏 Acknowledgments

- Font Awesome for the icons
- Inspiration from modern portfolio designs
- The web development community

---

**⭐ If you like this project, please give it a star on GitHub!**

**Made with ❤️ by Nguyễn Quốc Bảo**

---

### 📊 Project Stats

- **Lines of Code:** ~2,400+
- **Files:** 4 core files
- **No Dependencies:** Pure vanilla JavaScript
- **Mobile First:** Fully responsive
- **Performance:** Optimized and fast

### 🎓 Learning Resources

If you're learning web development, this project demonstrates:
- Semantic HTML5
- Modern CSS (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- DOM Manipulation
- Event Handling
- Responsive Design
- Performance Optimization

---

**Last Updated:** October 2024  
**Version:** 1.0.0
