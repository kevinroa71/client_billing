<template>
    <div class="card col-md-8">
        <div class="card-body">
            <h2 class="card-title">
                <em class="fas fa-file-invoice-dollar"></em> Create Billing
            </h2>
            <form v-on:submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="nameInput"><em class="fas fa-shopping-basket"></em> Product / service</label>
                    <input type="text" class="form-control" id="nameInput" required v-model="billing.name" maxlength="100">
                </div>
                <div class="form-group">
                    <label for="descriptionInput">Description</label>
                    <input type="text" class="form-control" id="descriptionInput" v-model="billing.description" maxlength="255">
                </div>
                <div class="form-group">
                    <label for="amountInput"><em class="fas fa-dollar-sign"></em> Amount</label>
                    <input type="number" class="form-control" id="amountInput" required v-model.number="billing.amount" min="1" step="0.01">
                </div>
                <div class="form-group">
                    <label for="discountInput"><em class="fas fa-percent"></em> Discount</label>
                    <input type="number" class="form-control" id="discountInput" v-model.number="billing.discount" min="0" step="0.01" max="100">
                </div>
                <div class="form-group">
                    <label for="emailInput"><em class="fas fa-envelope"></em> Email</label>
                    <input type="email" class="form-control" id="emailInput" required v-model="billing.email">
                </div>

                <button type="submit" v-bind:disabled="sending" class="btn btn-primary btn-block btn-lg">
                    <em v-if="sending" class="fas fa-spinner fa-spin"></em> Create
                </button>
                <br>
                <div v-for="error in errors" v-bind:key="error">
                    <div class="alert alert-danger" role="alert">
                        <em class="fas fa-info-circle"></em> {{ error }}
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Api from '../services/api';

export default {
    name: 'CreateForm',
    data: function() {
        return {
            sending: false,
            billing: {
                name: null,
                description: null,
                amount: 0,
                discount: 0,
                email: null
            },
            errors: []
        }
    },
    methods: {
        onSubmit: function() {
            this.sending = true;
            Api.post('/billings', this.billing)
            .then(() => {
                this.$router.push('/');
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.violations) {
                        let msg = [];
                        error.response.data.violations.forEach(v => {
                            msg.push(v.propertyPath+': '+v.message);
                        });
                        this.errors = msg;
                    }
                }
            })
            .finally(() => {
                this.sending = false;
            });
        }
    }
}
</script>
