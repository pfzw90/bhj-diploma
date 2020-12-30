class RegisterForm extends AsyncForm {
  onSubmit( options ) {
    User.register(options, function(err, response) {
      if (err) {
        throw new Error('Ошибка регистрации:' + err);
      }
      else {
        document.getElementById('register-form').reset();
        App.setState('user-logged');
        App.getModal('register').close();
      }
    })
  }
}
