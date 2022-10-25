<script setup lang="ts">
import { insuranceParams } from "@/store/entityParams";
import { useInsuranceStore } from "@/store/Insurance";

const insuranceStore = useInsuranceStore();
insuranceStore.fetchAll();
</script>

<template>
  <div>
    <div class="flex justify-end">
      <NuxtLink to="/insurance/form-"
        ><button class="btn"><i class="material-icons-outlined mr-2">add</i>Create Insurance</button></NuxtLink
      >
    </div>
    <Table entityType="insurance" :entityParams="insuranceParams" :entities="insuranceStore.insurances" />
  </div>
</template>
