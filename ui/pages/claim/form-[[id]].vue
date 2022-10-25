<script setup lang="ts">
import { useClaimStore } from "@/store/Claim";
import { useInsuredPersonStore } from "@/store/InsuredPerson";
import { useInsuranceStore } from "~~/store/Insurance";

const insuredPersonStore = useInsuredPersonStore();
insuredPersonStore.fetchAll();

const insuranceStore = useInsuranceStore();
insuranceStore.fetchAll();

const claimStore = useClaimStore();
const id = useRoute().params.id;

const idProvided: Boolean = id === "" ? false : true;

claimStore.fetchByIdIfProvided(id, idProvided);

const submitForm = async () => {
  idProvided ? await claimStore.update(claimStore.claim) : await claimStore.add(claimStore.claim);
  return navigateTo({
    path: "/claim",
  });
};
</script>

<template>
  <div>
    <form v-on:submit.prevent="submitForm">
      <div class="flex justify-start">
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Insured Person</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="claimStore.claim.insuredPerson">
            <option v-for="insuredPerson in insuredPersonStore.insuredPersons" :value="insuredPerson.id">{{ insuredPerson.fullName }}</option>
          </select>
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Insurance</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="claimStore.claim.insurancePolicy">
            <option v-for="insurance in insuranceStore.insurances" :value="insurance.id">{{ insurance.policyType }} - {{ insuredPersonStore.getById(insurance.insuredPerson).fullName }}</option>
          </select>
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Accident Date</span>
          </label>
          <input required type="date" placeholder="Accident Date" class="input input-bordered w-full max-w-xs" v-model="claimStore.claim.accidentDate" />
        </div>
      </div>
      <div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Comment</span>
          </label>
          <textarea class="textarea textarea-bordered" placeholder="e.g. This is a Comment" v-model="claimStore.claim.comment"></textarea>
        </div>
      </div>
      <button type="submit" class="btn m-3">{{ idProvided ? "Update Claim" : "Create Claim" }}</button>
    </form>
  </div>
</template>
