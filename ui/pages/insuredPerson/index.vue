<script setup lang="ts">
import { insuredPersonParams } from "@/store/entityParams";
import { useInsuredPersonStore } from "@/store/InsuredPerson";
definePageMeta({
  middleware: ["auth"],
});

const insuredPersonStore = useInsuredPersonStore();
insuredPersonStore.fetchAll();
</script>

<template>
  <div>
    <div class="flex justify-end">
      <NuxtLink to="/insuredPerson/form-"
        ><button class="btn"><i class="material-icons-outlined mr-2">add</i>Create Insured Person</button></NuxtLink
      >
    </div>
    <Table entityType="insuredPerson" :entityParams="insuredPersonParams" :entities="insuredPersonStore.insuredPersons" />
  </div>
</template>
