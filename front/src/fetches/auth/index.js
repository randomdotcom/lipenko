export function fetchSignInUser(username, password) {
  fetch(`http://localhost:3002/api/clients/signin`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
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
        throw json.error;
      } else if (json.isVerified === false) {
        this.setState({ isVerified: false, isSended: true });
        fetchNewVerificationCodeForUser.call(this, {
          username: username,
          password: password
        });
        throw "Вы забыли подтвердить аккаунт, мы выслали вам ещё один код на почту!";
      } else {
        localStorage.setItem("token", json.token);

        return {
          username: json.username,
          email: json.email,
          phoneNumber: json.phoneNumber,
          role: json.role
        };
      }
    })
    .then(user => {
      this.props.signIn(user);
      this.handleMessage("Вход успешный!", "success");
      console.log(user);
    })
    .catch(err => this.handleMessage(err, "error"));
}

export function fetchSignInExecutor(username, password) {
  fetch(`http://localhost:3002/api/companies/signin`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      if (json.error) {
        throw json.error;
      } else if (json.isVerified === false) {
        this.setState({ isVerified: false, isSended: true });
        fetchNewVerificationCodeForExecutor.call(this, {
          username: username,
          password: password
        });
        throw "Вы забыли подтвердить аккаунт, мы выслали вам ещё одно сообщение на почту!";
      } else {
        localStorage.setItem("token", json.token);

        return {
          username: json.username,
          email: json.email,
          phoneNumber: json.phoneNumber,
          role: json.role
        };
      }
    })
    .then(user => {
      this.props.signIn(user);
      this.handleMessage("Вход успешный!", "success");
      console.log(user);
    })
    .catch(err => this.handleMessage(err, "error"));
}

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
        console.log(json);
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

export function fetchRegisterUser(username, password, email, phoneNumber) {
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
        this.setState({ isSended: true });
        this.handleMessage(
          "Мы выслали сообщение с кодом подтверждения вам на почту!",
          "info"
        );
      }
    })
    .catch(err => this.handleMessage(err, "error"));
}

export function fetchRegisterExecutor(username, password, email, phoneNumber, typesOfCleaning) {
  fetch(`http://localhost:3002/api/companies/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      email,
      phoneNumber,
      typesOfCleaning
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
          "Мы выслали письмо для подтверждения аккаунта вам на почту!",
          "info"
        );
      }
    })
    .catch(err => this.handleMessage(err, "error"));
}
