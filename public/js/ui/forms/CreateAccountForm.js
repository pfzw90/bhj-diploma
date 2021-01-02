class CreateAccountForm extends AsyncForm {

  onSubmit(options) {
    Account.create(options, (err, response) => {
      if (!err) {
        console.log(response)
        document.getElementById('new-account-form').reset();
        App.getModal('createAccount').close();
        App.update() 
      } else { throw new Error('Ошибка создания счета:' + err) }
    })
  }

}

