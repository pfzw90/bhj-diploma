/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
      this.update();
    }
    else {
      throw new Error('Не передан элемент user widget!')
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    document.querySelector('span.create-account').addEventListener('click', function(ev) {
      ev.preventDefault();
      App.getModal('createAccount').open();
    });

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
      if (response) {
        this.clear();
        this.renderItem(response);
      }
      else console.log(err)
    })}}
    

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    Array.from(document.getElementsByClassName('account')).forEach(elem => elem.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    Array.from(document.getElementsByClassName('account')).forEach(elem => elem.className='accont')
    element.classList.add('active')
    App.showPage('transactions', { account_id: id_счёта })

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
 
    let li = document.createElement('li');
    li.className = 'active account'
    li.dataset.id = item.id;

    let a = document.createElement('a')
    a.href = '#'

    let nameSpan = document.createElement('span');
    nameSpan.innerText = item.name

    
    let sumSpan = document.createElement('span');
    sumSpan.innerText = new Intl.NumberFormat().format(item.sum)

    a.insertAdjacentElement('beforeend', nameSpan)
    a.insertAdjacentElement('beforeend', sumSpan)
    li.insertAdjacentElement('beforeend', a)

    return li.innerHTML
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    item.data.forEach(i => this.element.insertAdjacentElement('beforeend', i));
  }
}
