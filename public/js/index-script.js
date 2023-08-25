const restaurantContainer = document.querySelector('#restaurant-container');
restaurantContainer.addEventListener('submit', (event) => {
  if (event.target.classList.contains('remove-restaurant')) {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('確定要刪除嗎?')) {
      event.target.submit();
    }
  }
});

// select to sort
const sortSelector = document.querySelector('#sort-selector');
sortSelector.addEventListener('change', (event) => {
  event.target.parentElement.submit();
});
