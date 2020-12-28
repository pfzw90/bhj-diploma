

class Modal {
   constructor( element ) {
     console.log(element)
    if (element) {
      this.element = element;
      this.registerEvents();
    }
    else {
      throw new Error('Не передан элемент всплывающего окна!')
    }
  }

  registerEvents() {

    Array.from(this.element.querySelectorAll('[data-dismiss = "modal"]')).forEach(elem => {
      elem.addEventListener('click', (ev) => {this.onClose(ev);});
      });   
    }
  
  
  onClose(e) {
    e.preventDefault;
    this.close();
  }
  
  unregisterEvents() {
    Array.from(this.element.querySelectorAll('[data-dismiss = "modal"]')).forEach(elem => {
      elem.removeEventListener('click', (ev) => this.onClose(ev));
      });   
    }
  
 
  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.setAttribute('style', this.element.getAttribute('style').replace('display: block;', ''));
  }
}
