
const prizes = ["Приз 1", "Приз 2", "Приз 3", "Приз 4", "Приз 5", "Приз 6", "Приз 7", "Ничего"];
let lastSpin = localStorage.getItem("lastSpin");

function showSection(id) {
  document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function updateTimer() {
  const timer = document.getElementById('timer');
  const now = new Date().getTime();
  if (!lastSpin) {
    timer.textContent = "Можно крутить!";
    return;
  }

  const nextSpin = parseInt(lastSpin) + 7 * 24 * 60 * 60 * 1000;
  const timeLeft = nextSpin - now;
  if (timeLeft <= 0) {
    timer.textContent = "Можно крутить!";
    return;
  }

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  timer.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function spin() {
  const now = new Date().getTime();
  if (lastSpin && now - parseInt(lastSpin) < 7 * 24 * 60 * 60 * 1000) {
    alert("Можно крутить только раз в 7 дней!");
    return;
  }

  const angle = 360 * 5 + Math.floor(Math.random() * 360);
  document.getElementById("wheel").style.transform = `rotate(${angle}deg)`;
  const sector = Math.floor((angle % 360) / (360 / prizes.length));
  const prize = prizes[sector];

  setTimeout(() => {
    alert("Вы выиграли: " + prize);
    lastSpin = now.toString();
    localStorage.setItem("lastSpin", lastSpin);
  }, 4500);
}

setInterval(updateTimer, 1000);
updateTimer();
