// Typing animation for "Karina Lalwani"
document.addEventListener("DOMContentLoaded", () => {
  const nameSpan = document.querySelector(".hero h1 span");
  const text = "Karina Lalwani";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      nameSpan.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 120);
    }
  }

  nameSpan.textContent = ""; // Clear initial text
  typeWriter();
});
