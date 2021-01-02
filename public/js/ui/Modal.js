class Modal {
  constructor( element ) {
    if ( !element ) { throw new Error( 'Не передан элемент всплывающего окна!' ) 
    } else {
      this.element = element;
      this.registerEvents() }
  }

  registerEvents() {
    Array.from(this.element.querySelectorAll('[data-dismiss = "modal"]')).forEach(elem => {
      elem.addEventListener( 'click', () => this.onClose() )})   
    }
  
  onClose() { this.close() }
  
  unregisterEvents() {
    Array.from( this.element.querySelectorAll( '[data-dismiss = "modal"]' )).forEach( elem => {
      elem.removeEventListener('click', () => this.onClose())})
  }
  
  open() { this.element.style.display = 'block' }

  close() { this.element.style.display = '' }

}
