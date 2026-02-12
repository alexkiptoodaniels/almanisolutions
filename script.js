const html = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");

/* THEME PERSIST */
if (localStorage.getItem("theme")) {
    html.setAttribute("data-theme", localStorage.getItem("theme"));
}

toggleBtn.addEventListener("click", () => {
    let currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "dark") {
        html.setAttribute("data-theme", "light");
        toggleBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        toggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

/* MOBILE SIDEBAR */
hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

/* SCROLL ANIMATION */
const faders = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

faders.forEach(fade => observer.observe(fade));

/* ACTIVE LINK ON SCROLL */
window.addEventListener("scroll", () => {
    let fromTop = window.scrollY;

    navLinks.forEach(link => {
        let section = document.querySelector(link.getAttribute("href"));

        if (!section) return;

        if (
            section.offsetTop <= fromTop + 100 &&
            section.offsetTop + section.offsetHeight > fromTop + 100
        ) {
            navLinks.forEach(link => link.classList.remove("active"));
            link.classList.add("active");
        }
    });
});
