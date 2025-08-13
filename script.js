// ==================== TYPEWRITER ====================
(() => {
  const el = document.getElementById("typewriter");
  if (!el) return;
  const text = "Pawan Kumar Sharma";
  let i = 0;
  (function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i++);
      setTimeout(type, 90);
    }
  })();
})();

// ==================== HELPERS ====================
const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const $ = (sel, root = document) => root.querySelector(sel);

// All sections under <main>
const getSections = () => $all("main section");

// Hide/Show helpers (Tailwind-friendly)
function hide(el) {
  if (!el) return;
  el.classList.add("hidden");
}
function show(el) {
  if (!el) return;
  el.classList.remove("hidden");
}

// Active link styling
function setActiveNav(hash) {
  const allLinks = $all('header nav a, #mobile-menu a');
  allLinks.forEach(a => {
    if (a.getAttribute("href") === hash) {
      a.classList.add("text-indigo-600", "font-semibold");
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove("text-indigo-600", "font-semibold");
      a.removeAttribute("aria-current");
    }
  });
}

// Show only one section by id
function showSectionById(id) {
  const sections = getSections();
  sections.forEach(hide);
  const target = document.getElementById(id);
  if (target) show(target);

  // Close mobile menu if open
  const mobile = $("#mobile-menu");
  if (mobile && !mobile.classList.contains("hidden")) {
    mobile.classList.add("hidden");
  }

  // Update active nav
  setActiveNav(`#${id}`);

  // Scroll to top of page (since others are hidden)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==================== THEME TOGGLE (Tailwind dark class on <html>) ====================
document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement; // <html>
    const themeBtn = document.getElementById("theme-icon-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function setThemeIcon(isDark) {
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      setThemeIcon(true);
    } else if (savedTheme === "light") {
      root.classList.remove("dark");
      setThemeIcon(false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
      setThemeIcon(prefersDark);
    }

    themeBtn.addEventListener("click", () => {
      const isDark = root.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      setThemeIcon(isDark);
    });
  });

// ==================== NAV + SECTION ROUTER ====================
(function initRouter() {
  // Intercept clicks on all in-page links
  function handleAnchorClick(e) {
    const href = this.getAttribute("href") || "";
    if (!href.startsWith("#") || href === "#") return; // ignore external or empty
    e.preventDefault();
    const id = href.slice(1);
    if (!id) return;
    // Only show if section exists
    if (document.getElementById(id)) {
      showSectionById(id);
      history.replaceState(null, "", `#${id}`); // keep hash without page jump
    }
  }

  // Desktop links
  $all("header nav a").forEach(a => a.addEventListener("click", handleAnchorClick));
  // Mobile links
  $all("#mobile-menu a").forEach(a => a.addEventListener("click", handleAnchorClick));

  // Hamburger
  const hamburger = $("#hamburger");
  const mobileMenu = $("#mobile-menu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Initial section: use hash if valid, else show #home
  window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash || "#home";
    const id = hash.replace("#", "");
    if (document.getElementById(id)) {
      showSectionById(id);
    } else {
      showSectionById("home");
    }
  });
})();

// ==================== SCROLL TO TOP ====================
(function initScrollTop() {
  const btn = $("#scroll-top");
  if (!btn) return;
  const toggle = () => {
    if (window.scrollY > 300) btn.style.display = "block";
    else btn.style.display = "none";
  };
  window.addEventListener("scroll", toggle);
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  toggle();
})();

// ==================== DATA LOADING (JSON) ====================
async function safeFetchJson(urls) {
  // Try multiple URLs (for projects we’ll try projects.json then project.json)
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (_) {}
  }
  throw new Error("All sources failed: " + urls.join(", "));
}

async function loadSkills() {
  try {
    const data = await safeFetchJson(["skills.json"]);
    const map = {
      languages: $("#languages"),
      frameworks: $("#frameworks"),
      databases: $("#databases"),
      tools: $("#tools"),
      platforms: $("#platforms"),
      design: $("#design"),
      os: $("#os"),
      soft: $("#soft"),
    };
    Object.values(map).forEach(c => c && (c.innerHTML = ""));

    data.forEach(skill => {
      const container = map[skill.category];
      if (!container) return;
      const div = document.createElement("div");
      // Tailwind-ish chips
      div.className = "flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm";
      div.innerHTML = `
        <span class="text-lg">${skill.icon || "🔹"}</span>
        <span class="font-medium">${skill.name || ""}</span>
        ${skill.level ? `<span class="text-xs px-2 py-0.5 rounded-full border ml-auto">${capitalize(skill.level)}</span>` : ""}
      `;
      container.appendChild(div);
    });
  } catch (e) {
    console.error("Failed to load skills:", e);
  }
}

async function loadProjects() {
  try {
    
    const data = await safeFetchJson(["projects.json", "project.json"]);
    const container = $("#project-cards");
    if (!container) return;
    container.innerHTML = "";
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-2";
      card.innerHTML = `
        <h3 class="text-lg font-semibold">${p.name || ""}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">${p.desc || ""}</p>
        <div class="flex gap-3 pt-1">
          ${p.github ? `<a href="${p.github}" target="_blank" class="px-3 py-1 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800">GitHub</a>` : ""}
          ${p.live ? `<a href="${p.live}" target="_blank" class="px-3 py-1 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800">Live</a>` : ""}
        </div>
      `;
      container.appendChild(card);
    });
  } catch (e) {
    console.error("Failed to load projects:", e);
  }
}

async function loadEducation() {
  try {
    const data = await safeFetchJson(["education.json"]);
    const list = $("#edu-list");
    if (!list) return;
    list.innerHTML = "";
    data.forEach(ed => {
      const li = document.createElement("li");
      li.className = "mb-4";
      li.innerHTML = `
        <strong>${ed.course || ""}</strong><br>
        ${ed.university || ""} – ${ed.year || ""} 
        ${ed.location ? `<br><em>${ed.location}</em>` : ""}
        ${ed.specialization ? `<br>Specialization: ${ed.specialization}` : ""}
        ${ed.note ? `<br><small class="text-gray-500">${ed.note}</small>` : ""}
        ${ed.link ? `<br><a href="${ed.link}" target="_blank" class="underline">Verify Degree</a>` : ""}
      `;
      list.appendChild(li);
    });
  } catch (e) {
    console.error("Failed to load education:", e);
  }
}

async function loadCertificates() {
  try {
    const data = await safeFetchJson(["certificates.json"]);
    const container = $("#cert-cards");
    if (!container) return;
    container.innerHTML = "";
    data.forEach(c => {
      const card = document.createElement("div");
      card.className = "p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm";
      card.innerHTML = `
        <h3 class="font-semibold">${c.title || ""}</h3>
        <p class="text-sm">${c.organization || ""}</p>
        <p class="text-xs text-gray-500">${c.year || ""}</p>
        ${c.link ? `<a href="${c.link}" target="_blank" class="inline-block mt-2 underline">View Certificate</a>` : ""}
      `;
      container.appendChild(card);
    });
  } catch (e) {
    console.error("Failed to load certificates:", e);
  }
}

async function loadBlogs() {
  try {
    const data = await safeFetchJson(["blogs.json"]);
    const container = $("#blog-cards");
    if (!container) return;
    container.innerHTML = "";
    data.forEach(b => {
      const card = document.createElement("div");
      card.className = "p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm";
      card.innerHTML = `
        <h3 class="font-semibold">${b.title || ""}</h3>
        ${b.link ? `<a href="${b.link}" target="_blank" class="inline-block mt-2 underline">Read Blog</a>` : ""}
      `;
      container.appendChild(card);
    });
  } catch (e) {
    console.error("Failed to load blogs:", e);
  }
}

function capitalize(w = "") {
  return w ? w.charAt(0).toUpperCase() + w.slice(1) : "";
}

// Load JSON after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadSkills();
  loadProjects();
  loadEducation();
  loadCertificates();
  loadBlogs();
});

// ==================== HERO CONTACT (already covered by router, but keep explicit) ====================
$all('a[href="#contact"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showSectionById("contact");
    history.replaceState(null, "", "#contact");
  });
});

// ==================== DISABLE RIGHT-CLICK / HOTKEYS ====================
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (e.ctrlKey && ["u", "s", "c"].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});
