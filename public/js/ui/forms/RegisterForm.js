class RegisterForm extends AsyncForm {
  onSubmit( options ) {
    User.register(options, function(err, response) {
      if (err) {
        throw new Error('Ошибка регистрации:' + err);
      }
      else {
        this.reset();
        App.setState('user-logged');
        App.getModal('#modal-register').close();
      }
    })
  }
}
