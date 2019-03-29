export function fetchConfirmUser(verificationCode) {
  fetch(`http://localhost:3002/api/clients/confirm?token=${verificationCode}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.error) {
        this.handleMessage(json.error, "error");
      } else {
        this.handleMessage("Регистрация завершена!", "success");
      }
    })
    .catch(err => this.handleMessage(err, "error"));
}

export function fetchNewVerificationCodeForUser({ username, password }) {
  fetch(`http://localhost:3002/api/clients/newVerificationCode`, {
    method: "PUT",
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.error) {
        this.handleMessage(json.error, "error");
      }
    })
    .catch(err => this.handleMessage(err, "error"));
}

export function fetchNewVerificationCodeForExecutor({ username, password }) {
  fetch(`http://localhost:3002/api/companies/newVerificationCode`, {
    method: "PUT",
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.error) {
        this.handleMessage(json.error, "error");
      }
    })
    .catch(err => this.handleMessage(err, "error"));
}

export function fetchRegisterUser({username, password, email, phoneNumber}) {
  fetch(`http://localhost:3002/api/clients/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      email,
      phoneNumber
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.error) {
        this.handleMessage(json.error, "error");
      } else {
        this.handleMessage(
          "Мы выслали сообщение с кодом подтверждения вам на почту!",
          "info"
        );
        this.setState({ isSended: true });
      }
    })
    .catch(() => this.handleMessage("Неизвестная ошибка", "error"));
}
