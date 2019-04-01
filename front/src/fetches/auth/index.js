const headers = { "Content-Type": "application/json" };

export function fetchSignInUser(username, password) {
  fetch(`http://localhost:3002/api/clients/signin`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers
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
        throw String("Вы забыли подтвердить аккаунт, мы выслали вам ещё один код на почту!");
      } else {
        localStorage.setItem("token", json.token);

        return {
          username: json.username,
          email: json.email,
          phoneNumber: json.phoneNumber,
          adress: json.adress,
          role: json.role
        };
      }
    })
    .then(user => {
      this.props.signInUser(user);
      this.handleMessage("Вход успешный!", "success");
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
    headers
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
        throw String(
          "Вы забыли подтвердить аккаунт, мы выслали вам ещё одно сообщение на почту!"
        );
      } else {
        localStorage.setItem("token", json.token);

        return {
          username: json.username,
          email: json.email,
          phoneNumber: json.phoneNumber,
          city: json.city,
          companyName: json.companyName,
          description: json.description,
          typesOfCleaning: json.typesOfCleaning,
          role: json.role
        };
      }
    })
    .then(executor => {
      this.props.signInExecutor(executor);
      this.handleMessage("Вход успешный!", "success");
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
        this.props.signIn(json);
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
    headers
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
    headers
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

export function fetchRegisterUser(
  username,
  password,
  email,
  phoneNumber,
  adress
) {
  fetch(`http://localhost:3002/api/clients/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      email,
      phoneNumber,
      adress
    }),
    headers
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

export function fetchRegisterExecutor(values) {
  fetch(`http://localhost:3002/api/companies/register`, {
    method: "POST",
    body: JSON.stringify(values),
    headers
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
    .catch(err => {
      console.log(err);
      return this.handleMessage(err, "error");
    });
}

export function fetchConfirmEmailExecutor(verificationCode) {
  return fetch(
    `http://localhost:3002/api/companies/confirm?token=${verificationCode}`,
    {
      method: "PUT",
      headers
    }
  )
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log("ERROR " + json.error);
      if (json.error) {
        throw new Error(json.error);
      }
      this.props.signInExecutor(json);
    })
    .catch(err => {
      throw new Error(err);
    });
}
