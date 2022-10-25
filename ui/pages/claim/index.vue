<script setup lang="ts">
import { claimParams } from "@/store/entityParams";
import { useClaimStore } from "@/store/Claim";

const claimStore = useClaimStore();
claimStore.fetchAll();
</script>

<template>
  <div>
    <div class="flex justify-end">
      <NuxtLink to="/claim/form-"
        ><button class="btn"><i class="material-icons-outlined mr-2">add</i>Create Claim</button></NuxtLink
      >
    </div>
    <Table entityType="claim" :entityParams="claimParams" :entities="claimStore.claims" />
  </div>
</template>
