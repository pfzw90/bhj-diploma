class LoginForm extends AsyncForm {
  onSubmit( options ) {
    User.login(options, function(err, response) {
      console.log(response)
      if (err) {
        throw new Error('Ошибка входа:' + err);
      }
      else if (response.success) {
        document.getElementById('login').reset();
        App.setState('user-logged');
        App.getModal('#modal-login').close();
      }
    })
  }
}
