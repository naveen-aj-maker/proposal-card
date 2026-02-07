document.addEventListener("DOMContentLoaded", () => {
  const acceptBtn = document.getElementById("acceptBtn");
  const declineBtn = document.getElementById("declineBtn");
  const response = document.getElementById("response");
  const container = document.querySelector(".buttons");

  // Accept button behavior
acceptBtn.addEventListener("click", () => {
  response.innerHTML = `
    💖✨ You’ve said YES! ✨💖 <br><br>
    🥰 From this moment, my heart belongs to you forever. <br>
    💍 I promise to love ❤️, cherish 💕, and stand by you 🤝 
    for all the days of my life. 🌹💫
  `;
  document.body.style.background = "linear-gradient(to right, #ffdde1, #ee9ca7)";
  response.style.color = "#e63946";

  // Disable Decline button
  declineBtn.disabled = true;
  declineBtn.style.opacity = "0.5";
  declineBtn.style.cursor = "not-allowed";

  // Floating hearts animation
  for (let i = 0; i < 20; i++) {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = window.innerHeight + "px";
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
});


  // Sad emoji options for decline button
  const emojis = ["💔", "😢", "😭", "😞", "😔", "☹️", "🙁", "😿", "🥀", "😓"];
  const iner_text =["No ?", "Why No?" ,"Again No?","Please say yes","Please"];

  function moveDeclineButton() {
    if (declineBtn.disabled) return; // stop moving if disabled

    let maxX = container.offsetWidth - declineBtn.offsetWidth;
    let maxY = container.offsetHeight - declineBtn.offsetHeight;

    let x, y;
    let overlap = true;

    while (overlap) {
      x = Math.floor(Math.random() * maxX);
      y = Math.floor(Math.random() * maxY);

      const declineRect = {
        left: x,
        right: x + declineBtn.offsetWidth,
        top: y,
        bottom: y + declineBtn.offsetHeight
      };

      const acceptRect = acceptBtn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const acceptRelative = {
        left: acceptRect.left - containerRect.left,
        right: acceptRect.right - containerRect.left,
        top: acceptRect.top - containerRect.top,
        bottom: acceptRect.bottom - containerRect.top
      };

      overlap = !(
        declineRect.right < acceptRelative.left ||
        declineRect.left > acceptRelative.right ||
        declineRect.bottom < acceptRelative.top ||
        declineRect.top > acceptRelative.bottom
      );
    }

    declineBtn.style.left = x + "px";
    declineBtn.style.top = y + "px";

    // Always pick a sad emoji
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    let randoumtext = iner_text[Math.floor(Math.random() * iner_text.length)]
    declineBtn.innerText = randoumtext+" " + randomEmoji;
  }

  document.addEventListener("mousemove", (event) => {
    if (declineBtn.disabled) return;

    const rect = declineBtn.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 80) {
      moveDeclineButton();
    }
  });

  declineBtn.addEventListener("mouseenter", moveDeclineButton);

  declineBtn.addEventListener("click", (e) => {
    if (declineBtn.disabled) return;
    e.preventDefault();
    alert("You can’t decline 💔, sorry!");
  });
});
