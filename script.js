// Optional: Typing effect on header name
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header h1");
  const name = "Karina Lalwani";
  let i = 0;
  header.textContent = "";

  function type() {
    if (i < name.length) {
      header.textContent += name.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }

  type();
});
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}
