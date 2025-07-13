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

fetch('skills.json')
  .then(res => res.json())
  .then(data => {
    const map = {
      languages: document.getElementById('lang-skills'),
      frameworks: document.getElementById('framework-skills'),
      tools: document.getElementById('tool-skills'),
      platforms: document.getElementById('platform-skills'),
      soft: document.getElementById('soft-skills')
    };

    data.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill-item';
      div.innerHTML = `
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
      `;
      map[skill.category].appendChild(div);
    });
  })
  .catch(err => console.error("Failed to load skills:", err));


// ==================== THEME TOGGLE ====================
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on refresh
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// ==================== SCROLL TO TOP ====================
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==================== MOBILE NAV TOGGLE ====================
function toggleMenu() {
  const navList = document.getElementById("nav-list");
  navList.classList.toggle("show");
}
// ========== ACTIVE NAV LINK ON SCROLL ==========
// const sections = document.querySelectorAll("section");
// const navLinks = document.querySelectorAll("nav ul li a");

// window.addEventListener("scroll", () => {
//   let current = "";
//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop - 100;
//     if (window.scrollY >= sectionTop) {
//       current = section.getAttribute("id");
//     }
//   });

//   navLinks.forEach((link) => {
//     link.classList.remove("active");
//     if (link.getAttribute("href").includes(current)) {
//       link.classList.add("active");
//     }
//   });
// });




// ========== LOAD PROJECTS DYNAMICALLY ==========
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const projectList = document.getElementById('project-list');

    data.forEach(project => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${project.name}</strong><br>
        <em>${project.desc}</em><br>
        <a href="${project.github}" target="_blank">View on GitHub</a>
      `;
      li.style.marginBottom = "20px";
      projectList.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error loading project list:", error);
  });
  // ==================== LOAD SKILLS DYNAMICALLY ====================
  fetch('skills.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('skills-list');
    data.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill.name;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error loading skills:", error);
  });
// ==================== LOAD EDUCATION DYNAMICALLY ====================
fetch('education.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('edu-list');
    data.forEach(e => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${e.course}</strong><br>
        ${e.university} - ${e.year}
        ${e.link ? `<br><a href="${e.link}" target="_blank">Verify</a>` : ''}
      `;
      li.style.marginBottom = "15px";
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error loading education:", error);
  });
  //=================== LOAD CERTIFICATES DYNAMICALLY ====================
  fetch('certificates.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('cert-list');
    data.forEach(cert => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${cert.title}</strong> - ${cert.organization} (${cert.year})`;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error loading certificates:", error);
  });
// ==================== LOAD BLOGS DYNAMICALLY ====================
fetch('blogs.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('blog-list');
    data.forEach(blog => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${blog.link}" target="_blank">${blog.title}</a>`;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error loading blogs:", error);
  });


ScrollReveal().reveal('section-tab', {
  duration: 800,
  origin: 'bottom',
  distance: '40px',
  reset: false
});

// ✅ DEFAULT: Only show ABOUT section
document.addEventListener("DOMContentLoaded", () => {
  const allSections = document.querySelectorAll(".section-tab");
  allSections.forEach(sec => sec.classList.remove("active"));
  document.getElementById("about").classList.add("active");
});

// ✅ TAB FUNCTIONALITY
const navLinks = document.querySelectorAll("#nav-list a");
const allSections = document.querySelectorAll(".section-tab");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);

    // Hide all sections
    allSections.forEach(sec => sec.classList.remove("active"));

    // Show selected
    const target = document.getElementById(targetId);
    if (target) target.classList.add("active");

    // Highlight nav
    navLinks.forEach(n => n.classList.remove("active"));
    link.classList.add("active");
  });
});

// ========== Disable right-click and basic shortcuts ==========
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
  if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'c')) {
    e.preventDefault();
    return false;
  }
};
