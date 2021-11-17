var index = 1;
function handelSlides(choice) {
  var slides = document.querySelectorAll('.slides');
  var dots = document.querySelectorAll('.dot');
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

handelSlides(index);

function plusSlides(nextIndex) {
  handelSlides((index += nextIndex));
}

function currentSlide(currentIndex) {
  handelSlides((index = currentIndex));
}
