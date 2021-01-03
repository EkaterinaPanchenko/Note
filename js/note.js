// offsetWidth/Height - внешняя ширина и высота (ширина контента + padding + border)
// clientWidth/Height - размер области внутри рамок (ширина контента + padding)
// scrollWidth/Height - полный размер с учётом прокрученной области
// scrollLeft/scrollTop - ширина/высота прокрученной области

import { DnD } from "./dnd";

class Note {
  data = []; // массив для хранения данных

  constructor(button, container) {
    this.button = button;
    this.container = container; // сюда складывать будем notes

    this.init();
  }

  init() {
    this.listenHandleClickButton();
  }

  // конкретный el и position получим в классе DnD при вызове этого метода колбэком
  updatePosition(el, { left, top }) {
    const { id } = el.dataset; // получим из атрибута el
    // тут надо найти по индексу в data объект для этого элемента и обновить для него left, top

    this.data.forEach((item) => {
      if (item.id === id) {
        item.left = left;
        item.top = top;
      }
    });
  }

  // тут надо переделать так, чтобы метод принимал объект из data и создавал note по этим данным
  createNote({ content = "Hello!!!", top, left, id, backgroundColor }) {
    const noteEl = document.createElement("div");
    const noteRemove = document.createElement("p");
    const noteColor = document.createElement("input");
    const noteText = document.createElement("textarea");

    noteEl.classList = "note";
    noteEl.style.left = left + "px";
    noteEl.style.top = top + "px";
    noteEl.setAttribute("data-id", id);
    noteEl.setAttribute("data-content", content);

    noteRemove.classList = "note__cancel";
    noteRemove.innerHTML = "✖";
    noteRemove.addEventListener("click", () => this.remove(id));

    noteColor.classList = "note__color";
    noteColor.setAttribute("type", "color");
    noteColor.setAttribute("value", backgroundColor);
    noteColor.addEventListener("change", (event) =>
      this.onChangeColor(event.currentTarget.value, id)
    );

    noteText.classList = "note__description";
    noteText.style.backgroundColor = backgroundColor;
    noteText.innerHTML = content;
    noteText.addEventListener("input", (event) =>
      this.onNoteChange(event.currentTarget.value, id)
    );

    noteEl.append(noteRemove, noteColor, noteText);

    new DnD(noteEl, this.updatePosition.bind(this));

    return noteEl;
  }

  onChangeColor(value, id) {
    this.data.forEach((item) => {
      if (item.id === id) {
        item.backgroundColor = value;
      }
    });

    this.render();
  }

  onNoteChange(value, id) {
    this.data.forEach((item) => {
      if (item.id === id) {
        item.content = value;
      }
    });
  }

  remove(id) {
    this.data = this.data.filter((item) => item.id !== id);

    this.render();
  }

  listenHandleClickButton() {
    this.button.addEventListener("click", () => {
      const newNote = {
        id: String(Math.random()),
        content: "Hello!!!",
        left: 0,
        top: 255,
        backgroundColor: "#008000",
      };

      this.data.push(newNote);
      this.render();
    });
  }

  render() {
    this.container.innerHTML = ""; // очищаем

    this.data.forEach((item) => {
      // тут надо отрисовать notes
      const noteEl = this.createNote(item);

      this.container.append(noteEl);
    });
  }
}

export { Note };
