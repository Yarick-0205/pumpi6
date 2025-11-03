// Функция для загрузки избранных треков из localStorage
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(id => {
    const trackElement = document.querySelector(`.container_au1[data-id="${id}"]`);
    if (trackElement) {
      trackElement.querySelector('.favorite-btn').textContent = 'Удалить из избранного';
    }
  });
}

// Обработчик для кнопки
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('favorite-btn')) {
    const trackElement = e.target.closest('.container_au1');
    const trackId = trackElement.getAttribute('data-id');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(trackId)) {
      // Удаляем из избранного
      favorites = favorites.filter(id => id !== trackId);
      e.target.textContent = 'Добавить в избранное';
    } else {
      // Добавляем в избранное
      favorites.push(trackId);
      e.target.textContent = 'Удалить из избранного';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
});

// Загружаем избранное при старте
loadFavorites();