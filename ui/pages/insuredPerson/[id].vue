<script setup lang="ts">
import { insuredPersonParams, insuranceParams, claimParams } from "@/store/entityParams";
import { useInsuranceStore } from "@/store/Insurance";
import { useInsuredPersonStore } from "@/store/InsuredPerson";
import { useClaimStore } from "@/store/Claim";
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const id = route.params.id;

const insuranceStore = useInsuranceStore();
insuranceStore.fetchByInsuredPerson(id);
insuranceStore.fetchActiveForInsuredPerson(id);

const claimStore = useClaimStore();
claimStore.fetchByInsuredPerson(id);

const insuredPersonStore = useInsuredPersonStore();
insuredPersonStore.fetchById(id);

const deleteInsuredPerson = () => {
  insuredPersonStore.delete(id);

  return navigateTo({
    path: `/insuredPerson`,
  });
};
</script>

<template>
  <div class="m-5">
    <div class="flex">
      <div class="flex-1 m-3">
        <CustomList :redirect="false" class="bg-base-200" entityType="insuredPerson" :entityParams="insuredPersonParams" :entity="insuredPersonStore.insuredPerson" />
      </div>
      <div class="flex-1 m-3">
        <div class="card h-13 bg-base-200 w-full shadow-xl mb-3">
          <div class="card-body">
            <h2 class="card-title">Active Insurances</h2>
          </div>
        </div>
        <div class="flex">
          <div class="flex-1 m-3" v-for="insurance in insuranceStore.insurancesSpecific">
            <CustomList :redirect="true" class="cursor-pointer" entityType="insurance" :entityParams="insuranceParams" :entity="insurance" />
          </div>
        </div>
      </div>
    </div>
    <CardTable entityType="claim" buttonContent="Create Claim" buttonFunction="ADD" title="All Claims" :entityParams="claimParams" :entities="claimStore.claims" />
    <CardTable entityType="insurance" buttonContent="Create Insurance" buttonFunction="ADD" title="All Insurances" :entityParams="insuranceParams" :entities="insuranceStore.insurances" />
    <div class="flex justify-end">
      <label for="delete-modal" class="btn btn-outline btn-error modal-button">Delete<i class="material-icons-outlined ml-2">delete</i></label>

      <input type="checkbox" id="delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label for="delete-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="font-bold text-lg">Delete Insured Person?</h3>
          <p class="pt-5 pb-2 font-medium">Are you sure you want to delete this Insured Person?</p>
          <p><b>NOTE:</b> This will delete all of his/hers claims and insurances!</p>
          <div class="modal-action">
            <label for="delete-modal" class="btn btn-outline btn-error" v-on:click="deleteInsuredPerson">Delete<i class="material-icons-outlined ml-2">delete</i></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
