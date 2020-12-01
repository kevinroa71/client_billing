<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand">
                <img src="../assets/logo.png" width="30" height="30" alt="" loading="lazy">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"><em class="fas fa-tachometer-alt"></em> Dashboard</router-link>
                    </li>
                    <li class="nav-item" v-if="!hasToken">
                        <router-link to="/registro" class="nav-link"><em class="fas fa-unlock"></em> Login</router-link>
                    </li>
                </ul>
                <button v-if="hasToken" class="btn btn-outline-light my-2 my-sm-0" @click="logout"><em class="fas fa-arrow-alt-circle-left"></em> Logout</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    computed: {
        hasToken() {
            return !!this.$store.getters.getToken;
        }
    },
    methods: {
        logout() {
            this.$store.commit('setToken', null);
            localStorage.removeItem('token');
            this.$router.push('/register');
        }
    }
}
</script>
