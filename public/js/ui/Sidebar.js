class Sidebar {
  
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    document.querySelector("a.sidebar-toggle.visible-xs").addEventListener('click' , function(ev) {
      ev.preventDefault();
      document.querySelector("body").classList.toggle('sidebar-open');
      document.querySelector("body").classList.toggle('sidebar-collapse');
    });
  }

  static initAuthLinks() {
    document.querySelector('li.menu-item.menu-item_register').addEventListener('click', function(ev) {
      ev.preventDefault();
      console.log(App.getModal('modal-register'))
      App.getModal('register').open();
    });

    document.querySelector('li.menu-item.menu-item_login').addEventListener('click', function(ev) {
      ev.preventDefault();
      App.getModal('login').open();
    });

    document.querySelector('li.menu-item.menu-item_logout').addEventListener('click', function(ev) {
      ev.preventDefault();
      if (User.logout().response.success) {
         App.setState('init');
      }
    });
  }

}
