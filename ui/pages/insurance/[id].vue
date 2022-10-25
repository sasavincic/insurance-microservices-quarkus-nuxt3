<script setup lang="ts">
import { insuranceParams } from "@/store/entityParams";
import { useInsuranceStore } from "@/store/Insurance";

const route = useRoute();
const id = route.params.id;

const insuranceStore = useInsuranceStore();
insuranceStore.fetchById(id);

const deleteInsurance = () => {
  insuranceStore.delete(id);

  return navigateTo({
    path: `/insurance`,
  });
};

const cancelInsurance = () => {
  insuranceStore.cancel(id);
  insuranceStore.fetchById(id);
};
</script>

<template>
  <div class="m-5">
    <div v-if="insuranceStore.insurance.validUntil == null" class="flex justify-end">
      <label for="cancel-modal" class="btn btn-outline btn-error border-none modal-button mb-5">Cancel<i class="material-icons-outlined ml-2">cancel</i></label>

      <input type="checkbox" id="cancel-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label for="cancel-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="font-bold text-lg">Delete Insurance?</h3>
          <p class="pt-5 pb-2 font-medium">Are you sure you want to cancel this Insurance?</p>
          <p><b>NOTE:</b> This will reject all of its claims!</p>
          <div class="modal-action">
            <label for="cancel-modal" class="btn btn-outline btn-error" v-on:click="cancelInsurance">Cancel<i class="material-icons-outlined ml-2">cancel</i></label>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-end">
      <h2 class="text-xl text-error">Cancelled</h2>
    </div>
    <div class="flex w-full mb-5">
      <CustomList :redirect="false" entityType="insurance" title="Info" :entityParams="insuranceParams" :entity="insuranceStore.insurance" />
    </div>
    <div class="flex justify-end">
      <label for="delete-modal" class="btn btn-outline btn-error modal-button">Delete<i class="material-icons-outlined ml-2">delete</i></label>

      <input type="checkbox" id="delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label for="delete-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="font-bold text-lg">Delete Insurance?</h3>
          <p class="pt-5 pb-2 font-medium">Are you sure you want to delete this Insurance?</p>
          <p><b>NOTE:</b> This will delete all of its claims!</p>
          <div class="modal-action">
            <label for="delete-modal" class="btn btn-outline btn-error" v-on:click="deleteInsurance">Delete<i class="material-icons-outlined ml-2">delete</i></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
