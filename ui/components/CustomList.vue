<script setup lang="ts">
import {} from "vue";
import { Claim } from "~~/store/Claim";
import { Insurance } from "~~/store/Insurance";
import { InsuredPerson } from "~~/store/InsuredPerson";

interface TableProps {
  class?: string;
  title?: string;
  entityParams: any;
  entityType: string;
  redirect: boolean;
  entity: Insurance | Claim | InsuredPerson;
}
const props = defineProps<TableProps>();

const routeEdit = () => {
  return navigateTo({
    path: `/${props.entityType}/form-${props.entity.id}`,
  });
};
const detailsRoute = () => {
  if (props.redirect) {
    return navigateTo({
      path: `/${props.entityType}/${props.entity.id}`,
    });
  }
};
</script>

<template>
  <div v-on:click="detailsRoute" class="card h-full w-full shadow-xl bg-gradient-to-r to-base-200 from-base-100" :class="class">
    <div class="card-body">
      <div class="mx-auto my-auto text-xl" v-if="entity == null">None</div>
      <ul class="w-full text-sm">
        <li class="flex justify-between w-full px-4 py-2" v-for="(value, index) in entity">
          <div class="my-auto">{{ entityParams[index] }}</div>
          <div class="my-auto font-medium text-lg">{{ value }}</div>
        </li>
      </ul>
      <div class="flex justify-end mt-5">
        <div class="flex text-primary-content text-xl hover cursor-pointer mt-5 mr-8" v-if="entity != null" v-on:click="routeEdit">
          <p class="my-auto">Edit</p>
          <i class="material-icons-outlined text-2xl ml-3">edit</i>
        </div>
      </div>
    </div>
  </div>
</template>
