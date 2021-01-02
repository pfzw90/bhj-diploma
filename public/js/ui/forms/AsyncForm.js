class AsyncForm {
  constructor( element ) {
    if ( !element ) { throw new Error('Элемент формы не передан!') }
    else { 
      this.element = element;
      this.registerEvents();
    }
  }

  getData() {
    let data = {}
    for (let inp of Array.from(this.element.querySelectorAll( 'input' )).concat(Array.from(this.element.querySelectorAll( 'select' )))) {
      data[ inp.getAttribute( 'name' ) ] = inp.value;
    }
    return data;
  }

  submit() { this.onSubmit( this.getData() ) }

  registerEvents() {
    this.element.addEventListener( 'submit', (ev) => {
      ev.preventDefault();
      this.submit();
    });
  }

  onSubmit( options ) {
  }

}
