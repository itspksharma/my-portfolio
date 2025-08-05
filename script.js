// ==================== TYPEWRITER EFFECT ====================
const typewriter = document.getElementById("typewriter");
const text = "Pawan Kumar Sharma";
let i = 0;

function typeWriterEffect() {
  if (i < text.length) {
    typewriter.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriterEffect, 100);
  }
}
typeWriterEffect();

// ==================== THEME TOGGLE ====================
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("theme-icon-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function setThemeIcon(isDark) {
    themeIcon.textContent = isDark ? "☀️" : "🌙";
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    setThemeIcon(true);
  } else {
    setThemeIcon(false);
  }

  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setThemeIcon(isDark);
  });
});

// ==================== SCROLL TO TOP ====================
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==================== MOBILE NAV TOGGLE ====================
const hamburger = document.getElementById("hamburger-menu");
const sidebar = document.getElementById("sidebar-nav");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// ==================== DEFAULT ACTIVE TAB ====================
document.addEventListener("DOMContentLoaded", () => {
  const allSections = document.querySelectorAll(".section-tab");
  allSections.forEach(sec => sec.classList.remove("active"));
  document.getElementById("about").classList.add("active");
});

// ==================== NAVIGATION TABS ====================
const navLinks = document.querySelectorAll("#sidebar-links a");
const allSections = document.querySelectorAll(".section-tab");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);

    allSections.forEach(sec => sec.classList.remove("active"));
    const target = document.getElementById(targetId);
    if (target) target.classList.add("active");

    navLinks.forEach(n => n.classList.remove("active"));
    link.classList.add("active");

    sidebar.classList.remove("show"); // auto-close on mobile after click
  });
});

// ==================== LOAD DATA ====================
function loadSkills() {
  fetch('skills.json')
    .then(res => res.json())
    .then(data => {
      const map = {
        languages: document.getElementById('languages'),
        frameworks: document.getElementById('frameworks'),
        databases: document.getElementById('databases'),
        tools: document.getElementById('tools'),
        platforms: document.getElementById('platforms'),
        design: document.getElementById('design'),
        os: document.getElementById('os'),
        soft: document.getElementById('soft')
      };

      Object.values(map).forEach(container => container.innerHTML = "");


      data.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.innerHTML = `
          <div class="skill-icon">${skill.icon}</div>
          <div class="skill-name">${skill.name}</div>
          ${skill.level ? `<div class="skill-level">${capitalize(skill.level)}</div>` : ""}
        `;
        map[skill.category]?.appendChild(div);
      });
    })
    .catch(err => console.error("Failed to load skills:", err));
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Call the function on page load
window.addEventListener("DOMContentLoaded", loadSkills);



function loadProjects() {
  fetch('projects.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('project-cards');
      data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${project.name}</h3>
          <p>${project.desc}</p>
          <div class="project-links">
          <a href="${project.github}" target="_blank" class="project-btn">View on GitHub</a>
          ${project.live ? `<a href="${project.live}" target="_blank" class="project-btn live-btn">Live Demo</a>` : ''}
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Failed to load projects:", err));
}

function loadEducation() {
  fetch('education.json')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('edu-list');
      data.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${e.course}</strong><br>
          ${e.university} – ${e.year}
          ${e.location ? `<br><em>${e.location}</em>` : ''}
          ${e.specialization ? `<br>Specialization: ${e.specialization}` : ''}
          ${e.note ? `<br><small style="color:#666;">${e.note}</small>` : ''}
          ${e.link ? `<br><a href="${e.link}" target="_blank">Verify Degree</a>` : ''}
        `;
        li.style.marginBottom = "15px";
        list.appendChild(li);
      });
    })
    .catch(err => console.error("Failed to load education:", err));
}


function loadCertificates() {
  fetch('certificates.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('cert-cards');
      data.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.innerHTML = `
          <h3>${cert.title}</h3>
          <p>${cert.organization}</p>
          <p class="cert-year">${cert.year}</p>
          ${cert.link ? `<a href="${cert.link}" target="_blank" class="cert-btn">View Certificate</a>` : ''}
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Failed to load certificates:", err));
}

function loadBlogs() {
  fetch('blogs.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('blog-cards');
      data.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
          <h3>${blog.title}</h3>
          <a href="${blog.link}" target="_blank" class="blog-btn">Read Blog</a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Failed to load blogs:", err));
}

// Load all content after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadSkills();
  loadProjects();
  loadEducation();
  loadCertificates();
  loadBlogs();
});

// ==================== DISABLE RIGHT-CLICK ====================
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
  if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'c')) {
    e.preventDefault();
    return false;
  }
};

// ===== Hero Contact Button Fix =====
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    
    // Hide all tabs
    document.querySelectorAll(".section-tab").forEach(sec => sec.classList.remove("active"));
    
    // Show Contact section
    document.getElementById("contact").classList.add("active");

    // Update nav active state
    document.querySelectorAll("#nav-list a, #sidebar-links a").forEach(n => n.classList.remove("active"));
    const matchingNav = document.querySelector('#nav-list a[href="#contact"], #sidebar-links a[href="#contact"]');
    if (matchingNav) matchingNav.classList.add("active");

    // Scroll to it
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
});
