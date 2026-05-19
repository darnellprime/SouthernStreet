setTimeout(() => {

  const loadingScreen =
    document.getElementById('loading-screen');

  loadingScreen.style.transition =
    'opacity 1.5s ease';

  loadingScreen.style.opacity = '0';

  setTimeout(() => {
    loadingScreen.remove();
  }, 1500);

}, 6500);