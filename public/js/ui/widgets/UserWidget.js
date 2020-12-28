class UserWidget {

  constructor(element) {
    if (element) {
      this.element = element;
    }
    else {
      throw new Error('Не передан элемент user widget!')
    }
  }

  update() {
    const user = User.current()
    if (user) {
      document.getElementById('user-name').innerText = user.name;
    }
  }
}
