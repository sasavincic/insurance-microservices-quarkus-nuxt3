<script setup lang="ts">
import { claimParams } from "@/store/entityParams";
import { useClaimStore, ClaimState } from "@/store/Claim";
import { useRiskAssessmentStore } from "~~/store/RiskAssessment";

const route = useRoute();
const id = route.params.id;

const claimStore = useClaimStore();
claimStore.fetchById(id);

const riskAssessmentStore = useRiskAssessmentStore();

riskAssessmentStore.assessed = false;

const assess = async () => {
  await riskAssessmentStore.prepareModelPayload();
  await riskAssessmentStore.assessRisk();
  riskAssessmentStore.assessed = true;
};

const deleteClaim = () => {
  claimStore.delete(id);

  return navigateTo({
    path: `/claim`,
  });
};

const approve = async () => {
  await claimStore.approve(id);
  await claimStore.fetchById(id);
};
const reject = async () => {
  await claimStore.reject(id);
  await claimStore.fetchById(id);
};
</script>

<template>
  <div class="m-5">
    <div v-if="claimStore.claim.claimState?.valueOf() == ClaimState.CREATED.valueOf()" class="flex justify-end mt-5">
      <div v-if="riskAssessmentStore.assessed" class="font-medium text-xl mr-5">
        Risk Assessment: <span class="text-xl font-bold">{{ riskAssessmentStore.risk }}%</span>
      </div>
      <button v-if="!riskAssessmentStore.assessed" v-on:click="assess" class="btn btn-sm mx-2 mb-2 hover:bg-gradient-to-r from-primary to-base-300">Assess Risk</button>
      <div class="flex justify-between text-xl font-medium text-success hover cursor-pointer mx-4" v-on:click="approve">
        <i class="material-icons-outlined text-2xl mr-1">done</i>
        <p>Approve</p>
      </div>
      <div class="flex justify-between text-xl font-medium text-error hover cursor-pointer mx-4" v-on:click="reject">
        <i class="material-icons-outlined text-2xl mr-1">close</i>
        <p>Reject</p>
      </div>
    </div>
    <div class="flex w-full">
      <CustomList :redirect="false" entityType="claim" title="Info" :entityParams="claimParams" :entity="claimStore.claim" />
    </div>
    <div class="flex justify-end mt-5">
      <label for="delete-modal" class="btn btn-outline btn-error modal-button">Delete<i class="material-icons-outlined ml-2">delete</i></label>

      <input type="checkbox" id="delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label for="delete-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="font-bold text-lg">Delete Claim?</h3>
          <p class="pt-5 pb-2 font-medium">Are you sure you want to delete this Claim?</p>
          <div class="modal-action">
            <label for="delete-modal" class="btn btn-outline btn-error" v-on:click="deleteClaim">Delete<i class="material-icons-outlined ml-2">delete</i></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
