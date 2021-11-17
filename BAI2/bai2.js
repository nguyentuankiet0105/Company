window.addEventListener('load', function () {
  const listSelect = document.querySelector('.list-select');
  const listCity = document.querySelectorAll('.list-group-item');
  listSelect.addEventListener('change', function (e) {
    let choice = this.value;

    listCity.forEach((cities) => {
      cities.classList.remove('active');
    });

    if (choice === '' || choice === 'reset') return;

    for (var i = 1; i <= listCity.length ; i++) {
      if (choice === 'even') {
        if ((i - 1) % 2 !== 0) {
          listCity[i-1].classList.add('active');
        }
      } else if (choice === 'odd') {
        if ((i - 1) % 2 == 0) {
          listCity[i-1].classList.add('active');
        }
      } else {
        listCity[choice - 1].classList.add('active');
        return;
      }
    }
  });
});
