AFRAME.registerComponent('hover-highlighter', {
  schema: {
    color: {type: 'color', default: 'white'}
  },
  init: function () {
    let target = this.el;
    this.handlerOnEnter = evt => this.onEnter(evt);
    this.handlerOnLeave = evt => this.onLeave(evt);
    target.addEventListener("mouseenter", this.handlerOnEnter);
    target.addEventListener("mouseleave", this.handlerOnLeave);
  },
  onEnter: function (evt) {
    let cursor = evt.detail.cursorEl;
    if (cursor.components['line']) {
      this.savedAttr = {...cursor.getAttribute('line')};
      cursor.setAttribute('line', 'color',  this.data.color);
    } else {
      this.savedColor = cursor.getAttribute("material").color;
      cursor.setAttribute("material", "color", this.data.color);
    }
  },
  onLeave: function (evt) {
    let cursor = evt.detail.cursorEl;
    if (cursor.components['line']) {
      cursor.setAttribute('line', 'color', this.savedAttr.color);
    } else {
      cursor.setAttribute("material", "color", this.savedColor);
    }
  },
  remove: function () {
    let target = this.el;
    target.removeEventListener("mouseenter", this.handlerOnEnter);
    target.removeEventListener("mouseleave", this.handlerOnLeave);
  }
});