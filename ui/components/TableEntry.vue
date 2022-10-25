<script setup lang="ts">
import { Claim } from "@/store/Claim";
import { Insurance } from "@/store/Insurance";
import { InsuredPerson } from "@/store/InsuredPerson";

interface TableEntryProps {
  entity: Insurance | Claim | InsuredPerson;
  entityType: string;
}
const props = defineProps<TableEntryProps>();

const detailsRoute = (entity: Insurance | Claim | InsuredPerson) => {
  return navigateTo({
    path: `/${props.entityType}/${entity.id}`,
  });
};
</script>

<template>
  <tr class="hover">
    <td v-for="value in entity" class="cursor-pointer" v-on:click="detailsRoute(entity)">
      {{ value }}
    </td>
  </tr>
</template>
