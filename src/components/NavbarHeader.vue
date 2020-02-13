<template>
  <nav class="navbar navbar-expand-lg nav-bg-color mb-2">
    <!-- <a class="navbar-brand" href="#">Navbar</a> -->
    <img alt="Vue logo" src="../assets/leads2b-logo.png" class="vue-logo" />
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/cadastro" class="nav-link">Cadastro</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="logout()">Sair do Sistema</a>
        </li>
      </ul>
    </div>
    <div>
      <h6 v-if="username != ''" style="color: white">Bem vindo, {{ username }}!</h6>
      <h6 v-if="username == ''" style="color: white">Bem vindo, usuário!</h6>
    </div>
  </nav>
</template>


<script>
export default {
  name: "NavbarHeader",
  props: {
    username: String
  },
  methods: {
    logout() {
      localStorage.removeItem("authLogin");
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.nav-bg-color {
  background-color: #394270;
}

.vue-logo {
  max-width: 10%;
  max-height: 10%;
  margin-right: 30px;
  margin-left: 14px;
}
</style>