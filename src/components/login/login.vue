<template>
  <div class="container-fluid bg-login">
    <div class="row h-100">
      <div class="col-md-12" style="margin-top: auto; margin-bottom: auto;">
        <div class="form-group d-flex justify-content-center">
          <div class="login-form">
            <img
              src="https://leads2b.com/wp-content/uploads/2019/08/Leads2b_C-191x43.png"
              alt="logo-leads2b"
              class="logo-leads"
            />
            <p>
              <input type="text" v-model="usuario_value" placeholder="Informe seu usuário" />
            </p>
            <p>
              <input type="password" v-model="senha_value" placeholder="Informe sua senha" />
            </p>
            <button class="btn btn-login" v-on:click="logar">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      usuario_value: "",
      senha_value: ""
    };
  },
  methods: {
    logar() {
      let url = "http://localhost:3001/users?name=" + this.usuario_value;

      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(json => {
          // Verifica se encontrou o usuário, se sim, efetua login, caso não, apresenta a mensagem
          if (json.length > 0) {
            // Converte a senha de base64 para string, assim, comparando a digitada com a salva no banco
            let senha = atob(json[0].password);
            if (senha == this.senha_value) {
              localStorage.setItem("authLogin", "true");
              localStorage.setItem("username", json[0].name);
              alert("login liberado");
              this.$router.push({ name: "Cadastro" });
            } else {
              alert("Login negado");
            }
          } else {
            alert("Não foram encontrados nenhum usuário com este nome cadastrado");
          }
        });
    }
  }
};
</script>

<style>
.bg-login {
  background-size: cover;
  background: linear-gradient(to right, #00d5b1, #166dac);
  height: 100vh;
  width: 100%;
}

.logo-leads {
  margin-bottom: 40px;
}

.btn-login {
  background-color: #22ae97;
  color: white;
}

.btn-login:hover {
  background-color: #1fa58f;
  color: white;
}

.title-login {
  font-family: "Lato", sans-serif;
  color: white;
  margin: 0;
}

.login-form {
  width: 30%;
  background-color: #496978ab;
  border-radius: 4px;
  padding: 25px;
  text-align: center;
  box-shadow: 1px 1px 5px 2px rgba(58, 58, 58, 0.781);
}

input {
  width: 60%;
  height: 2.3em;
  padding: 10px;
  border: 1px solid #cecece;
  border-radius: 2px;
  font-family: "Quicksand", sans-serif;
}

::placeholder {
  font-family: "Quicksand", sans-serif;
}

.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
</style>