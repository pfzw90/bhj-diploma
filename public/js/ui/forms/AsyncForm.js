class AsyncForm {
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
      }
    else {
      throw new Error('Элемент формы не передан!')
    }
  }

  getData() {
    let data = {}
    for (let inp of Array.from(this.element.querySelectorAll('input'))) {
      data[inp.getAttribute('name')] = inp.value;
    }
    return data;
  }


  submit() {
    this.onSubmit(this.getData());
  }

  registerEvents() {
    this.element.addEventListener('submit', (ev) =>{
      ev.preventDefault();
      this.submit();
    });
  }

  onSubmit(options) {
  }


}
