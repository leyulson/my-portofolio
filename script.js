// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Skill bars animation
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width + "%"
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Animate skill bars when skills section is visible
      if (entry.target.id === "skills") {
        setTimeout(animateSkillBars, 500)
      }
    }
  })
}, observerOptions)

// Observe sections for fade-in animation
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in")
  observer.observe(section)
})

// Portfolio filtering
const filterButtons = document.querySelectorAll(".filter-btn")
const workItems = document.querySelectorAll(".work-item")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")

    const filterValue = button.getAttribute("data-filter")

    workItems.forEach((item) => {
      if (filterValue === "all") {
        item.classList.remove("hidden")
      } else {
        if (item.getAttribute("data-category") === filterValue) {
          item.classList.remove("hidden")
        } else {
          item.classList.add("hidden")
        }
      }
    })
  })
})

// Contact form handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Simulate form submission
  alert("Thank you for your message! I'll get back to you soon.")
  contactForm.reset()
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Typing animation for hero title (optional enhancement)
const heroTitle = document.querySelector(".hero-title")
const titleText = heroTitle.innerHTML
heroTitle.innerHTML = ""

let i = 0
const typeWriter = () => {
  if (i < titleText.length) {
    heroTitle.innerHTML += titleText.charAt(i)
    i++
    setTimeout(typeWriter, 100)
  }
}

// Start typing animation after page load
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000)
})

// Smooth reveal animations for elements
const revealElements = document.querySelectorAll(".work-item, .skill-category, .stat")

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  },
  { threshold: 0.1 },
)

revealElements.forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(30px)"
  element.style.transition = "all 0.6s ease"
  revealObserver.observe(element)
})
