<script setup lang="ts">
import { InsuredPerson } from "@/store/InsuredPerson";
import { Claim } from "~~/store/Claim";
import { Insurance } from "~~/store/Insurance";

interface CardProps {
  buttonContent: any;
  title: string;
  entities: Insurance[] | Claim[] | InsuredPerson[];
  entityParams: any;
  entityType: string;
}

const props = defineProps<CardProps>();

const formRoute = () => {
  let basePath = "";

  if (props.entityType == "insurance") {
    basePath = "insurance";
  } else if (props.entityType == "claim") {
    basePath = "claim";
  } else if (props.entityType == "insuredPerson") {
    basePath = "insuredPerson";
  }
  return navigateTo({
    path: `/${basePath}/form-`,
  });
};
</script>

<template>
  <div class="my-5">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between m-5">
          <h2 class="card-title">{{ title }}</h2>
          <div class="flex text-primary-content text-xl hover cursor-pointer" v-on:click="formRoute()">
            <i class="material-icons-outlined mr-2 my-auto">add</i>
            <p class="my-auto">
              {{ buttonContent }}
            </p>
          </div>
        </div>
        <Table :entityType="entityType" :entityParams="entityParams" :entities="entities" />
      </div>
    </div>
  </div>
</template>
