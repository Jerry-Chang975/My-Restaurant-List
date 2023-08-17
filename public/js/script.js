const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated'); // 標記表單已驗證
});
