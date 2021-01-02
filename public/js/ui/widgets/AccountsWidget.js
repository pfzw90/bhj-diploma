class AccountsWidget {
 
  constructor( element ) {
    if ( !element ) { throw new Error( 'Не передан элемент Accounts Widget!' ) }
    else {
      this.element = element;
      this.update();
    }
  }

  registerEvents() {
    this.element.querySelector( 'span.create-account' ).addEventListener( 'click' , () => App.getModal( 'createAccount' ).open());
    Array.from( this.element.querySelectorAll( 'li.account' ) ).forEach( account => account.addEventListener( 'click' , () => this.onSelectAccount(account) ) );
  }

  update() {
    if ( User.current() ) {
      Account.list( User.current() , (err, response) => {
        if ( !err ) {
          this.clear();
          this.renderItem( response.data );
          this.registerEvents();
        }
      })
    }
  }
    
  clear() { Array.from( this.element.querySelectorAll('li.account') ).forEach( elem => elem.remove() ) }

  onSelectAccount(element) {
    Array.from(this.element.getElementsByClassName('account')).forEach(elem => elem.className='account');
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }

  
  getAccountHTML(item) { 
    return `<li class="account" data-id=${item.id}>
    <a href="#">
        <span>${item.name}</span> /
        <span>${new Intl.NumberFormat().format(item.sum)} ₽</span>
    </a>
    </li>` }

  renderItem(item) { item.forEach(i => this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(i))) }

}
