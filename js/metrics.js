// Метрика ------------------------------------------
// offsetWidth/Height - внешняя ширина и высота (ширина контента + padding + border)
// clientWidth/Height - размер области внутри рамок (ширина контента + padding)
// scrollWidth/Height - полный размер с учётом прокрученной области
// scrollLeft/scrollTop - ширина/высота прокрученной области

const el = document.querySelector(".block");

// console.log(el.offsetWidth)
// console.log(el.offsetHeight)
// console.log(el.scrollHeight)
// console.log(el.pageX) // нет такого свойство, только у объекта событий

// setTimeout(() => console.log(el.scrollTop), 1000)

// Координаты
// pageX/pageY - относительно документа
// clientX/clientY - относительно окна

//element.getBoundingClientRect() -// аналог позиционирования на css

const rect = el.getBoundingClientRect();

// console.warn(rect)

document.addEventListener("mousemove", (event) => {
  //   console.log(event.clientX, event.clientY)
});
