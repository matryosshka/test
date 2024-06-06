/* Функцилнал: Показать еще */

const btn = document.getElementById('btn');
const description = Array.from(document.querySelectorAll('.projects__item'));

function showElem() {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'скрыть —') {
      description.forEach((item, index) => {
        if ((window.innerWidth > 1080 && index > 5) || (window.innerWidth <= 1080 && window.innerWidth > 480 && index > 2) || (window.innerWidth <= 480 && index > 2)) {
          item.classList.add('hidden');
        }
      });
      btn.textContent = 'показать еще +';
    } else {
      description.forEach((item, index) => {
        item.classList.remove('hidden');
      });
      btn.textContent = 'скрыть —';
    }
    setTimeout(() => {
      description.forEach((item) => {
        item.classList.toggle('hidden-animation');
      });
    }, 10);
  });
}

function resizedw() {
  if (window.innerWidth > 1080) {
    desktop();
  } else if (window.innerWidth <= 1080 && window.innerWidth > 480) {
    tablets();
  } else if (window.innerWidth <= 480) {
    phones();
  }

  let doit;
  window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };
}

function desktop() {
  if (window.innerWidth > 1080) {
    description.forEach((item, index) => {
      item.classList.add('hidden');
      if (index < 6) {
        item.classList.remove('hidden');
      } else {
        btn.classList.remove('hidden');
      }
    });
  }
}

function tablets() {
  if (window.innerWidth <= 1080 && window.innerWidth > 480) {
    description.forEach((item, index) => {
      item.classList.add('hidden');
      if (index < 3) {
        item.classList.remove('hidden');
      } else {
        btn.classList.remove('hidden');
      }
    });
  }
}

function phones() {
  if (window.innerWidth <= 480) {
    description.forEach((item, index) => {
      item.classList.add('hidden');
      if (index < 3) {
        item.classList.remove('hidden');
      } else {
        btn.classList.remove('hidden');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  btn.classList.add('hidden');
  desktop();
  tablets();
  phones();
  showElem();
});

window.addEventListener('orientationchange', () => {
  location.reload();
});

// Функционал: пролистывание меню (черновик) //

document.addEventListener('DOMContentLoaded', function() {
  const menuList = document.querySelector('.internal__menu-list');
  const menuContainer = document.querySelector('.internal__menu-container');
  let containerWidth = 0;
  if (menuContainer) {
    containerWidth = menuContainer.offsetWidth;
  }
  let touchStartX = 0;
  let touchEndX = 0;
  let scrollPosition = 0;

  menuList.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
  });

  menuList.addEventListener('touchmove', function(event) {
    touchEndX = event.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    let newScrollPosition = scrollPosition - diff;

    if (newScrollPosition > 0) {
      newScrollPosition = 0;
    } else if (newScrollPosition < containerWidth - menuList.offsetWidth) {
      newScrollPosition = containerWidth - menuList.offsetWidth;
    }

    menuList.style.transform = `translateX(${newScrollPosition}px)`;
  });

  menuList.addEventListener('touchend', function() {
    scrollPosition = parseInt(menuList.style.transform.replace('translateX(', ''), 10) || 0;
    touchStartX = 0;
    touchEndX = 0;
  });
});