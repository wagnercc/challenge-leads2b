<template>
  <div>
    <NavbarHeader v-bind:username="username" />
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1 v-show="getAllUsers" style="color: #747474">Usuários</h1>
          <hr />
          <h5 v-show="getAllUsers" style="color: #747474">Cadastrar</h5>
        </div>
        <div class="col-md-4 offset-md-4 text-center">
          <div class="form-group">
            <p>
              <input placeholder="Informe um nome" type="text" class="form-control" v-model="name" />
            </p>
            <p>
              <input
                placeholder="Informe uma senha"
                type="password"
                class="form-control"
                v-model="password"
              />
            </p>
            <button class="btn btn-primary" v-on:click="addUser()">Adicionar</button>
          </div>
        </div>
        <div class="col-md-12 text-center">
          <hr />
          <h5 style="color: #747474">Listagem</h5>
          <div
            class="alert alert-warning table-fix-head"
            role="alert"
            v-show="objUsers == 0"
          >Não existe nenhum usuário cadastrado</div>
          <table class="table table-striped" v-show="objUsers.length > 0">
            <thead>
              <tr>
                <th>Data Cadastro</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody v-if="objUsers.length > 0">
              <tr v-for="(user, index) in objUsers" v-bind:key="user.id">
                <td>{{ user.dateRegistred }}</td>
                <td>{{ user.name }}</td>
                <td>
                  <button class="btn btn-danger" v-on:click="deleteUser(user.id, index)">deletar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// imports
import NavbarHeader from "../NavbarHeader";
import axios from "axios";
import Paginate from "vuejs-paginate";
import Vue from "vue";

// Vue components
Vue.component("paginate", Paginate);

export default {
  name: "Cadastro",
  components: {
    NavbarHeader
  },
  props: {},
  data() {
    return {
      objUsers: [],
      name: "",
      password: "",
      username: ""
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    this.getAllUsers();
  },
  methods: {
    // The method get all records from database
    // @author Wagner Camargo Castilho
    getAllUsers() {
      let url = "http://localhost:3001/users";

      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (json.length > 0) {
            this.objUsers = json;
          }
        });
    },

    // The method get a data from database by name with param
    // @author Wagner Camargo Castilho
    getByName(name) {
      let url = "http://localhost:3001/users?name=" + name;

      return axios.get(url);
    },

    // The method add a user in database
    // @author Wagner Camargo Castilho
    async addUser() {
      this.getByName(this.name).then(res => {
        if (res.data.length > 0) {
          alert(
            "Já existe um usuário com este nome, por favor, altere o nome informado ou exclua o registro já existente!"
          );
        } else if (this.name == "" || this.password == "") {
          alert("Informe um nome e uma senha para cadastrar");
        } else {
          let url = "http://localhost:3001/users";

          let jsonObj = JSON.stringify({
            dateRegistred: new Date().toLocaleDateString("pt-BR"),
            name: this.name,
            password: btoa(this.password) // Converte a senha em base64
          });

          try {
            axios
              .post(url, jsonObj, {
                headers: { "Content-Type": "application/json" }
              })
              .then(res => {
                alert("O usuário foi criado!");
                this.objUsers.push({
                  id: res.data.id,
                  dateRegistred: res.data.dateRegistred,
                  name: res.data.name,
                  password: res.data.password
                });
              })
              .catch(error =>
                console.log("Erro ao realizar o post do Axios: ", error)
              );
          } catch (e) {
            console.error(e);
          }

          this.name = "";
          this.password = "";
        }
      });
    },

    // The method delete a user from database
    // @author Wagner Camargo Castilho
    deleteUser(id, param) {
      this.objUsers.splice(param, 1);

      let url = "http://localhost:3001/users/" + id;
      try {
        axios
          .delete(url)
          .then(res => {
            alert("O usuário foi deletado!", res);
          })
          .catch(error =>
            console.log("Erro ao realizar o delete do Axios: ", error)
          );
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped>
table {
  box-shadow: 2px 2px 4px 1px #cecece;
  border: 1px solid #cecece;
  border-radius: 4px;
}
</style>