const headerText = "About Pennock Systems";
const subText = "Driven by innovation. Powered by people. Built for your business.";

const headerTarget = document.getElementById("typing-header");
const subTarget = document.getElementById("typing-sub");

let hIndex = 0;
let pIndex = 0;

function typeHeader() {
  if (hIndex <= headerText.length) {
    headerTarget.innerHTML = headerText.substring(0, hIndex) + '<span class="cursor">|</span>';
    hIndex++;
    setTimeout(typeHeader, 40);
  } else {
    // Finish header, remove cursor
    headerTarget.innerHTML = headerText;
    setTimeout(typeSub, 500);
  }
}

function typeSub() {
  if (pIndex <= subText.length) {
    subTarget.innerHTML = subText.substring(0, pIndex) + '<span class="cursor">|</span>';
    pIndex++;
    setTimeout(typeSub, 30);
  } else {
    // Finish paragraph, remove cursor
    subTarget.innerHTML = subText;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeHeader();
});

  
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".services-hero").offsetHeight;

  const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 16;
  const columns = canvas.width / fontSize;

  const drops = Array.from({ length: columns }).fill(1);

  function drawMatrix() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1E90FF'); // Dodger Blue
    gradient.addColorStop(1, '#8A2BE2'); // Blue Violet

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = gradient;
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      const x = i * fontSize;
      ctx.fillText(text, x, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    });
  }

  setInterval(drawMatrix, 50);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".services-hero").offsetHeight;
  });