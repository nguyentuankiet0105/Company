var index = 1;
function handleSlides(choice) {
  const slides = document.querySelectorAll('.slides');
  const dots = document.querySelectorAll('.dot');
  // click button next ở slide cuối cùng thì sẽ chuyển về lại slide đầu tiên
  if (choice > slides.length) {
    index = 1;
  }
  // click button previous ở slide đầu tiên thì sẽ chuyển đến slide cuối cùng
  if (choice < 1) {
    index = slides.length;
  }
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[index - 1].style.display = 'block';
  dots[index - 1].className += ' active';
}

handleSlides(index);

function plusSlides(nextIndex) {
  handleSlides((index += nextIndex));
}

function currentSlide(currentIndex) {
  handleSlides((index = currentIndex));
}
