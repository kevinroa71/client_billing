<template>
    <div class="card col">
        <div class="card-body">
            <h2 class="card-title">
                <em class="fas fa-coins"></em> Balance
                <span class="badge badge-info float-right"><em class="fas fa-dollar-sign"></em> {{balance}}</span>
            </h2>
        </div>
    </div>
</template>

<script>
import Api from "../services/api";

export default {
    name: 'Balance',
    data() {
        return {
            balance: 0
        };
    },
    mounted: function() {
        Api.get('/balance')
        .then(resp => {
            this.balance = resp.data.total;
        })
        .catch(() => {});
    }
}
</script>

<style>

</style>