class LoginForm extends AsyncForm {
  onSubmit( options ) {
    User.login(options, function(err, response) {

      if (err) {
        throw new Error('Ошибка входа:' + err);
      }
      else if (response.success) {
        document.getElementById('login-form').reset();
        App.setState('user-logged');
        App.getModal('login').close();
      }
    })
  }
}
