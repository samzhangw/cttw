// Dark Mode Functionality
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  updateDarkModeIcon();
  updateParticlesColor();
  
  if (document.getElementById("qrModal").style.display === "block") {
    showQRCode();
  }
}

function updateDarkModeIcon() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const isDarkMode = document.body.classList.contains('dark-mode');
  darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const savedDarkMode = localStorage.getItem('darkMode');

  if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
  }
  updateDarkModeIcon();
  darkModeToggle.addEventListener('click', toggleDarkMode);
}