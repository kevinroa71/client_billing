<template>
  <div class="home row justify-content-center">
    <div class="col-12">
      <div class="float-right">
        <Balance></Balance>
      </div>
    </div>
    <div class="col-12">
      <BillingTable></BillingTable>
    </div>
  </div>
</template>

<script>
import BillingTable from "../components/BillingTable";
import Balance from "../components/Balance";

export default {
  name: 'Home',
  components: {
    BillingTable,
    Balance
  }
}
</script>
