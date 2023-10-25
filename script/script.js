`use strict`;
const navFoxes = document.getElementById(`foxes`);
const navUtility = document.getElementById(`utility`);
const navFoxy = document.getElementById(`foxy`);
const navDens = document.getElementById(`dens`);
const navRight5 = document.getElementById(`navbar-right-5`);
const navbarItem = document.querySelectorAll(`.navbar-item`);
const slideEl = document.querySelectorAll(`.slide`);
const dots = document.querySelector(`.dots`);
const slides = document.querySelector(`.slides`);
const inputSearch = document.querySelector(`#input-search`);
const formSearch = document.querySelector(`.form-search`);
const formOption = document.querySelector(`.form-option`);
const listStyle = document.querySelector(`.list-style`);
//Hàm ẩn các navbar
const renderWhenClickNav = function (nav) {
  navbarItem.forEach((element) => {
    if (element.classList.contains(`${nav}`)) {
      element.classList.toggle(`hidden`);
    } else {
      element.classList.add(`hidden`);
    }
  });
};
//Bắt sự kiện nhấn thanh Navbar
navRight5.addEventListener(`click`, function (e) {
  e.preventDefault();
  let check = e.target.getAttribute(`data`);
  switch (check) {
    case `nav-1`:
      renderWhenClickNav(`foxes`);
      break;
    case `nav-2`:
      renderWhenClickNav(`utility`);
      break;
    case `nav-3`:
      renderWhenClickNav(`foxy`);
      break;
    case `nav-4`:
      renderWhenClickNav(`dens`);
      break;
  }
});
//Hàm hiển thị Dots
const renderDots = function () {
  for (let i = 0; i < slideEl.length - 2; i++) {
    const html = `<li>
                  <div data="dot-${i}" class="dot dot--${i + 1}"></div>
                </li>`;
    dots.querySelector(`ul`).insertAdjacentHTML(`beforeend`, html);
  }
};
renderDots();
let a = 0;
const dotEl = document.querySelectorAll(`.dot`);
//Bắt sự kiện click Dots
dots.addEventListener(`click`, function (e) {
  if (e.target.getAttribute(`data`)) {
    dotEl.forEach((e) => e.classList.remove(`active`));
    e.target.classList.add(`active`);
    for (let iD = 0; iD < dotEl.length; iD++) {
      if (e.target.classList.contains(`dot--${iD + 1}`)) {
        a = -iD;
        for (let i = 0; i < slideEl.length; i++) {
          slideEl[i].style.transform = `translateX(${(a + i) * 100}%)`;
        }
      }
    }
  }
});
//Hàm chạy slide
const waitInterval = function (seconds) {
  dotEl.forEach((e) => {
    e.classList.remove(`active`);
  });
  dotEl[Math.abs(a)].classList.add(`active`);
  setInterval(() => {
    dotEl.forEach((e) => {
      e.classList.remove(`active`);
    });
    dotEl[Math.abs(a)].classList.add(`active`);
    for (let i = 0; i < slideEl.length; i++) {
      slideEl[i].style.transform = `translateX(${(a + i) * 100}%)`;
    }
    a--;
    if (Math.abs(a) === slideEl.length - 2) {
      a = 0;
    }
  }, seconds * 1000);
};
waitInterval(5);
//Bắt sự kiện click form-option
formOption.addEventListener(`click`, function (e) {
  listStyle.classList.toggle(`hidden`);
  e.stopPropagation();
});
//Bắt sự kiện click form-search
formSearch.querySelector(`.icon`).addEventListener(`click`, function (e) {
  e.preventDefault();
  if (!inputSearch.value) {
    alert(`Vui lòng nhập thông tin tìm kiếm`);
  } else {
    console.log(`code form search`);
  }
});
//ESCAPE
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape`) {
    listStyle.classList.add(`hidden`);
    renderWhenClickNav(`nothing`);
  }
});
//CLICK BODY
document.querySelector(`body`).addEventListener(`click`, function (e) {
  listStyle.classList.add(`hidden`);
});
