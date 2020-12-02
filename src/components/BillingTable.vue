<template>
    <div class="col">
        <h1 id="title">Billings</h1>
        <nav aria-label="nav-top">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#" @click="previous">Previous</a></li>
                <li :class="['page-item', { 'active': i == page }]" v-for="i in totalPages" :key="'page-'+i"><a class="page-link" href="#" @click="loadBillings(i)">{{i}}</a></li>
                <li class="page-item"><a class="page-link" href="#" @click="next">Next</a></li>
            </ul>
        </nav>
        <table class="table" aria-describedby="title">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product / service</th>
                    <th scope="col">Email</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="billing in billings" :key="'billing-'+billing['@id']">
                    <th scope="row">{{billing['@id']}}</th>
                    <td>{{billing.name}}</td>
                    <td>{{billing.email}}</td>
                    <td>{{billing.amount}}$</td>
                    <td>{{billing.discount}}%</td>
                    <td>{{billing.total}}$</td>
                    <td><span :class="[{'text-success': billing.status}, {'text-secondary': !billing.status}]">{{billing.status ? 'Paid' : 'Pending'}}</span></td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="nav-bottom">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#" @click="previous">Previous</a></li>
                <li :class="['page-item', { 'active': i == page }]" v-for="i in totalPages" :key="'page-'+i"><a class="page-link" href="#" @click="loadBillings(i)">{{i}}</a></li>
                <li class="page-item"><a class="page-link" href="#" @click="next">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import Api from "../services/api";

export default {
    name: 'BillingTable',
    data() {
        return {
            page: 1,
            perPage: 30,
            totalBillings: 0,
            billings: []
        };
    },
    mounted() {
        this.loadBillings(this.page);
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalBillings/this.perPage);
        }
    },
    methods: {
        loadBillings(page) {
            this.page = page;
            Api.get('/billings', { params: {page} })
                .then(resp => {
                    this.billings = resp.data['hydra:member'];
                    this.totalBillings = resp.data['hydra:totalItems'];
                })
                .catch(() => {
                    this.billings = [];
                });
        },
        previous() {
            if (this.page > 1) {
                this.loadBillings(this.page--);
            }
        },
        next() {
            if (this.page < this.totalPages) {
                this.loadBillings(this.page++);
            }
        }
    }
}
</script>

<style>

</style>