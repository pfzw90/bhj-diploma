class TransactionsPage {

  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else { throw new Error('Не передан элемент Transactions Page!') }
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions)
    } else { this.render() }
  }

  registerEvents() {
    this.element.addEventListener('click', (ev) => {
      let target = ev.target;
      if (ev.target.classList.contains('fa-trash')) target = ev.target.parentNode;
      if (target.classList.contains('transaction__remove')) this.removeTransaction(target.dataset.id);
      if (ev.target.classList.contains('remove-account')) this.removeAccount();
    });
  }

  removeAccount() {
    if (this.lastOptions && confirm('Вы действительно хотите удалить счёт?')) {
        Account.remove(this.lastOptions.account_id,this.lastOptions, (err) => {
        if (!err) {
          this.clear();
          App.update();
    }})}
  }
  
  removeTransaction(id) {
    if (this.lastOptions && confirm('Вы действительно хотите удалить транзакцию?')) {
        Transaction.remove(id, this.lastOptions, (err) => {
          if (!err) { App.update() }})
    }
  }
  
  
  render(options) {
    if (options) {
      Account.get(options.account_id, options, (err, response) => {
        if (!err) {
          this.clear();
          this.lastOptions = options;
          this.renderTitle(response.data.name);

          Transaction.list(options, (err, response) => {
            if (!err) {
              this.renderTransactions(response.data);
          }});
      }});
    }
  }
      
  
  clear() {
    delete this.lastOptions;
    Array.from(this.element.querySelector('.content').children).forEach(elem => elem.remove());
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  renderTitle(name) { document.querySelector('span.content-title').innerText = name }

  formatDate(date) {
    let months = {'01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октяюбря',
    '11': 'ноября',
    '12': 'декабря'};
    let template = /(\d{4})-(\d{2})-(\d{2})\D{1}(\d{2}):(\d{2})/gm;
    let d = template.exec(date);
    return `${d[3]} ${months[d[2]]} ${d[1]} в ${d[4]}:${d[5]}`
  }

  getTransactionHTML(item) {
    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
  </div>`
  }

  renderTransactions(data) {
    for (let transaction of data) {
      this.element.querySelector('.content').insertAdjacentHTML('beforeend', this.getTransactionHTML(transaction))
  }}

}
