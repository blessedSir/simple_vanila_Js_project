const modal = document.getElementById("modal");
const close = document.querySelector(".close");
const concertInput = document.getElementById("concert-info");
const concertSelect = document.getElementById("concert-select");
const ticketForm = document.getElementById("ticket-form");
const toaster = document.getElementById("toaster");
const arrow = document.querySelector(".arrow");
const heroSection = document.querySelector(".hero");
const contactForm = document.querySelector(".contact form");
const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

const concerts = Array.from(
  document.querySelectorAll("#concerts table tr:not(:first-child)")
).map((tr) => tr.querySelector("td").textContent);

document.querySelectorAll(".btn-red, .btn-yellow").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn-yellow")) {
      concertSelect.style.display = "block";
      concertInput.style.display = "none";
      concertSelect.innerHTML = concerts
        .map((c) => `<option value="${c}">${c}</option>`)
        .join("");
    } else {
      concertSelect.style.display = "none";
      concertInput.style.display = "block";
      const row = btn.closest("tr");
      concertInput.value = row.querySelector("td").textContent;
    }
    modal.style.display = "block";
  });
});

close.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toaster-message";
  toast.textContent = message;
  toaster.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const concert =
    concertSelect.style.display === "block"
      ? concertSelect.value
      : concertInput.value;
  const name = ticketForm.name.value;
  const email = ticketForm.email.value;
  const quantity = ticketForm.quantity.value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      concert: concert,
      name: name,
      email: email,
      quantity: quantity,
    }),
  })
    .then((response) => response.json())
    .then(
      () => showToast(`Дякуємо, ${name}! Ми отримали ваше повідомлення.`),
      contactForm.reset()
    )
    .catch((error) => showToast("Ошибка:", error));
  modal.style.display = "none";
  ticketForm.reset();
});

window.addEventListener("scroll", () => {
  const heroHeight = heroSection.offsetHeight;

  if (window.scrollY > heroHeight - 200) {
    arrow.classList.add("show");
  } else {
    arrow.classList.remove("show");
  }
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const message = contactForm.querySelector("textarea").value;

  if (!name || !email || !message) {
    showToast("Будь ласка, заповніть усі поля.");
    return;
  }
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
    }),
  })
    .then((response) => response.json())
    .then(
      () => showToast(`Дякуємо, ${name}! Ми отримали ваше повідомлення.`),
      contactForm.reset()
    )
    .catch((error) => showToast("Ошибка:", error));

  // showToast(`Дякуємо, ${name}! Ми отримали ваше повідомлення.`);
  // contactForm.reset();
});

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileNav.classList.toggle("show");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");

    burger.classList.remove("active");
    mobileNav.classList.remove("show");

    setTimeout(() => {
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    }, 350);
  });
});
