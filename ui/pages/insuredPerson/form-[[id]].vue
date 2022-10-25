<script setup lang="ts">
import { useInsuredPersonStore } from "@/store/InsuredPerson";
definePageMeta({
  middleware: ["auth"],
});

const insuredPersonStore = useInsuredPersonStore();
const id = useRoute().params.id;

const idProvided: Boolean = id === "" ? false : true;

insuredPersonStore.fetchByIdIfProvided(id, idProvided);

const submitForm = async () => {
  idProvided ? await insuredPersonStore.update(insuredPersonStore.insuredPerson) : await insuredPersonStore.add(insuredPersonStore.insuredPerson);
  return navigateTo({
    path: "/insuredPerson",
  });
};
</script>

<template>
  <div>
    <form v-on:submit.prevent="submitForm">
      <div class="flex justify-start">
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Full Name</span>
          </label>
          <input required type="text" placeholder="e.g. John Doe" class="input input-bordered w-full max-w-xs" v-model="insuredPersonStore.insuredPerson.fullName" />
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Date of Birth</span>
          </label>
          <input required type="date" class="input input-bordered w-full max-w-xs" v-model="insuredPersonStore.insuredPerson.dateOfBirth" />
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input required type="email" placeholder="e.g. john.doe@gmail.com" class="input input-bordered w-full max-w-xs" v-model="insuredPersonStore.insuredPerson.email" />
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Gender</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuredPersonStore.insuredPerson.gender">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div class="flex justify-start">
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Marital Status</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuredPersonStore.insuredPerson.maritalStatus">
            <option value="SINGLE">Single</option>
            <option value="MARRIED">Married</option>
          </select>
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Education</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuredPersonStore.insuredPerson.education">
            <option value="NONE">None</option>
            <option value="HIGH SCHOOL">High School</option>
            <option value="UNIVERSITY">University</option>
          </select>
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Income Level</span>
          </label>
          <select required class="select select-bordered w-full max-w-xs" v-model="insuredPersonStore.insuredPerson.incomeLevel">
            <option value="MINMAL">Minimal</option>
            <option value="BELOW AVERAGE">Low</option>
            <option value="AVERAGE">Average</option>
            <option value="ABOVE AVERAGE">Above Average</option>
          </select>
        </div>
        <div class="form-control w-full max-w-xs m-3">
          <label class="label">
            <span class="label-text">Number of Children</span>
          </label>
          <input type="number" class="input input-bordered w-24 max-w-xs" v-model="insuredPersonStore.insuredPerson.numberOfChildren" />
        </div>
      </div>
      <button type="submit" class="btn m-3">{{ idProvided ? "Update Insured Person" : "Create Insured Person" }}</button>
    </form>
  </div>
</template>
