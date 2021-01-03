class DnD {
  position = {
    left: 0,
    top: 0,
  };

  shifts = {
    x: 0,
    y: 0,
  };

  // updatePosition — служит для передачи данных из одного класса в другой
  constructor(el, updatePosition) {
    this.el = el;
    this.updatePosition = updatePosition;

    this.init();
  }

  init() {
    this.handleMouseDown = this.mouseDown.bind(this);
    this.handleMouseMove = this.mouseMove.bind(this);
    this.handleMouseUp = this.mouseUp.bind(this);

    this.el.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  mouseDown(event) {
    this.calcShifts(event.clientX, event.clientY);

    document.addEventListener("mousemove", this.handleMouseMove);
  }

  mouseMove(event) {
    this.setPosition(event.pageX, event.pageY);
  }

  mouseUp() {
    document.removeEventListener("mousemove", this.handleMouseMove);

    // вызвали updatePosition и передали el, который передвинули и его позицию
    if (this.position.left && this.position.top) {
      this.updatePosition(this.el, this.position);
    }
  }

  calcShifts(clientX, clientY) {
    const rect = this.el.getBoundingClientRect();

    this.shifts.x = clientX - rect.left;
    this.shifts.y = clientY - rect.top;
  }

  setPosition(x, y) {
    this.position.left = x - this.shifts.x;
    this.position.top = y - this.shifts.y;

    this.el.style.left = this.position.left + "px";
    this.el.style.top = this.position.top + "px";
  }
}

export { DnD };
