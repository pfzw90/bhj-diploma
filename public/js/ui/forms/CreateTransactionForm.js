class CreateTransactionForm extends AsyncForm {

  constructor( element ) {
    super( element );
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list( User.current(), ( err, response ) => {
      Array.from( this.element.querySelector( 'select.form-control.accounts-select' ).children ).forEach( elem => elem.remove() )
      if ( !err ) {
        response.data.forEach( account => {
          let acc = document.createElement( 'option' );
          acc.value = account.id;
          acc.innerText = account.name;
          this.element.querySelector( 'select.form-control.accounts-select' ).insertAdjacentElement( 'beforeend', acc );
        })
      }}) 
  }

  onSubmit( options ) {
    Transaction.create( options, ( err ) => {
      if ( !err ) {
        this.element.reset();
        App.getModal( `new${options.type.slice(0,1).toUpperCase()}${options.type.slice(1)}` ).close()
        App.update(); 
      }
    })
  }

}
