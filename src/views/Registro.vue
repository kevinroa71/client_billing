<template>
    <div class="row justify-content-md-center">
        <div class="card col-md-5 m-2">
            <div class="card-body">
                <h2 class="card-title text-center"><em class="fas fa-unlock"></em> Login</h2>
                <form v-on:submit.prevent="onLogin">
                    <div class="form-group">
                        <label for="emailLogin"><em class="fas fa-envelope"></em> Email</label>
                        <input type="email" class="form-control" id="emailLogin" required v-model="login.email">
                    </div>
                    <div class="form-group">
                        <label for="passwordLogin"><em class="fas fa-key"></em> Password</label>
                        <input type="password" class="form-control" id="passwordLogin" required v-model="login.password">
                    </div>
                    <button type="submit" v-bind:disabled="sending" class="btn btn-primary btn-block btn-lg">
                        <em v-if="sending" class="fas fa-spinner fa-spin"></em> Login
                    </button>
                    <br>
                    <div v-for="error in errorsLogin" v-bind:key="error">
                        <div class="alert alert-danger" role="alert">
                            <em class="fas fa-info-circle"></em> {{ error }}
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card col-md-6 m-2">
            <div class="card-body">
                <h2 class="card-title text-center"><em class="fas fa-file-signature"></em> Sign up</h2>
                <form v-on:submit.prevent="onRegister">
                    <div class="form-group">
                        <label for="documentRegister"><em class="fas fa-id-card"></em> Document</label>
                        <input type="text" class="form-control" minlength="4" maxlength="20" id="documentRegister" required v-model="register.document">
                    </div>
                    <div class="form-group">
                        <label for="nameRegister"><em class="fas fa-user-circle"></em> Full Name</label>
                        <input type="text" class="form-control" minlength="4" maxlength="100" id="nameRegister" required v-model="register.name">
                    </div>
                    <div class="form-group">
                        <label for="emailRegister"><em class="fas fa-envelope"></em> Email</label>
                        <input type="email" class="form-control" id="emailRegister" required v-model="register.email">
                    </div>
                    <div class="form-group">
                        <label for="phoneRegister"><em class="fas fa-mobile-alt"></em> Phone</label>
                        <input type="text" class="form-control" id="phoneRegister" aria-describedby="phoneHelp" required pattern="\d{10,11}" v-model="register.phone">
                        <small id="phoneHelp" class="form-text text-muted">Only numbers, between 10 and 11 digits</small>
                    </div>
                    <div class="form-group">
                        <label for="passwordRegister"><em class="fas fa-key"></em> Password</label>
                        <input type="password" class="form-control" id="passwordRegister" minlength="4" maxlength="30" required v-model="register.password">
                    </div>
                    <button type="submit" v-bind:disabled="sending" class="btn btn-primary btn-block btn-lg">
                        <em v-if="sending" class="fas fa-spinner fa-spin"></em> Sign up
                    </button>
                    <br>
                    <div v-for="error in errorsRegister" v-bind:key="error">
                        <div class="alert alert-danger" role="alert">
                            <em class="fas fa-info-circle"></em> {{ error }}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "../services/api";

export default {
    name: 'Registro',
    data: function() {
        return {
            sending: false,
            errorsLogin: [],
            errorsRegister: [],
            login: {
                email: null,
                password: null
            },
            register: {
                document: null,
                name: null,
                email: null,
                phone: null,
                password: null
            }
        };
    },
    methods: {
        onRegister() {
            this.sending = true;
            Api.post('/register', this.register)
                .then(() => {
                    this.login.email = this.register.email;
                    this.login.password = this.register.password;
                    this.onLogin();
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.data.violations) {
                            let msg = [];
                            error.response.data.violations.forEach(v => {
                                msg.push(v.propertyPath+': '+v.message);
                            });
                            this.errorsRegister = msg;
                        }
                    }
                })
                .finally(() => {
                    this.sending = false;
                });
        },
        onLogin() {
            this.sending = true;
            Api.post('/login', this.login)
                .then(resp => {
                    this.$store.commit('setToken', resp.data.token);
                    this.$router.push('/');
                })
                .catch(error => {
                    if (error.response) {
                        this.errorsLogin = [error.response.data.message];
                    }
                })
                .finally(() => {
                    this.sending = false;
                });
        }
    }
}
</script>

<style>

</style>