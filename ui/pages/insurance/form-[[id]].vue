<script setup lang="ts">
import { useInsuranceStore } from "@/store/Insurance";
import { useInsuredPersonStore } from "@/store/InsuredPerson";

let insuredPersonStore = useInsuredPersonStore();
insuredPersonStore.fetchAll();

const insuranceStore = useInsuranceStore();
const id = useRoute().params.id;

const idProvided: Boolean = id === "" ? false : true;

insuranceStore.fetchByIdIfProvided(id, idProvided);

const submitForm = async () => {
  idProvided ? await insuranceStore.update(insuranceStore.insurance) : await insuranceStore.add(insuranceStore.insurance);
  return navigateTo({
    path: "/insurance",
  });
};
</script>

<template>
  <div>
    <form v-on:submit.prevent="submitForm">
      <div class="flex justify-start">
        <div class="form-control w-48 max-w-xs m-3">
          <label class="label">
            <span class="label-text">Insured Person</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuranceStore.insurance.insuredPerson">
            <option v-for="insuredPerson in insuredPersonStore.insuredPersons" :value="insuredPerson.id">{{ insuredPerson.fullName }}</option>
          </select>
        </div>

        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">PolicyType</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuranceStore.insurance.policyType">
            <option value="TYPE1">Type 1</option>
            <option value="TYPE2">Type 2</option>
            <option value="TYPE3">Type 3</option>
          </select>
        </div>
      </div>

      <div class="flex justify-start">
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Vehicle Registration Number</span>
          </label>
          <input required type="text" placeholder="e.g. MB KI-800" class="input input-bordered w-full max-w-xs" v-model="insuranceStore.insurance.vehicleRegistrationNumber" />
        </div>

        <div class="form-control w-48 max-w-xs m-3">
          <label class="label">
            <span class="label-text">Vehicle Type</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuranceStore.insurance.vehicleType">
            <option value="SEDAN">Sedan</option>
            <option value="SPORTS CAR">Sports car</option>
          </select>
        </div>

        <div class="form-control w-48 max-w-xs m-3">
          <label class="label">
            <span class="label-text">Vehicle Year</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuranceStore.insurance.vehicleYear">
            <option value="after 2015">After 2015</option>
            <option value="before 2015">Before 2015</option>
          </select>
        </div>

        <div class="form-control w-46 max-w-xs m-3">
          <label class="label">
            <span class="label-text">Annual Mileage</span>
          </label>
          <label class="input-group">
            <input required type="number" placeholder="Mileage" class="input input-bordered w-full max-w-xs" v-model="insuranceStore.insurance.mileage" />
            <span>KM</span>
          </label>
        </div>

        <div class="form-control w-48 max-w-xs m-3">
          <label class="label">
            <span class="label-text">Driving Experience</span>
          </label>
          <label class="input-group">
            <select required class="select select-bordered w-full max-w-xs" v-model="insuranceStore.insurance.drivingExperience">
              <option value="0-9">0 - 9</option>
              <option value="10-19">10 - 19</option>
              <option value="20-29">20 - 29</option>
              <option value="30">30 or more</option>
            </select>
            <span>Years</span>
          </label>
        </div>
      </div>

      <div class="form-control w-48 max-w-xs m-3">
        <label class="label">
          <span class="label-text">Vehicle Ownership</span>
        </label>
        <input type="checkbox" class="toggle" checked v-model="insuranceStore.insurance.vehicleOwnership" />
      </div>

      <div class="flex">
        <div class="form-control w-32 max-w-xs m-3">
          <label class="label">
            <span class="label-text">Speed Violations</span>
          </label>
          <input required type="number" placeholder="e.g. 2" class="input input-bordered w-full max-w-xs" v-model="insuranceStore.insurance.numberOfSpeedViolations" />
        </div>

        <div class="form-control w-32 max-w-xs m-3">
          <label class="label">
            <span class="label-text">DUI Violations</span>
          </label>
          <input required type="number" placeholder="e.g. 2" class="input input-bordered w-full max-w-xs" v-model="insuranceStore.insurance.numberOfDUIViolations" />
        </div>

        <div class="form-control w-32 max-w-xs m-3">
          <label class="label">
            <span class="label-text">Past Accidents</span>
          </label>
          <input required type="number" placeholder="e.g. 2" class="input input-bordered w-full max-w-xs" v-model="insuranceStore.insurance.numberOfPastAccidents" />
        </div>
      </div>

      <button type="submit" class="btn m-3">{{ idProvided ? "Update Insurance" : "Create Insurance" }}</button>
    </form>
  </div>
</template>
