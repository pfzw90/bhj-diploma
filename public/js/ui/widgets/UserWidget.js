class UserWidget {

  constructor( element ) {
    if ( !element ) { throw new Error( 'Не передан элемент user widget!' )
    } else { this.element = element }
  }

  update() {
    const user = User.current()
    if ( user ) { document.querySelector( 'p.user-name' ).innerText = user.name }
  }
  
}
