<script setup lang="ts">
import { Claim } from "~~/store/Claim";
import { Insurance } from "~~/store/Insurance";
import { InsuredPerson } from "~~/store/InsuredPerson";

interface TableProps {
  entityParams: any;
  entities: Insurance[] | Claim[] | InsuredPerson[];
  entityType: string;
}
const props = defineProps<TableProps>();
</script>

<template>
  <div class="overflow-x-auto mt-5">
    <table class="table bg-base-100 w-full">
      <thead>
        <tr>
          <th v-for="(value, key) in entityParams" :key="key">{{ value }}</th>
        </tr>
      </thead>
      <tbody v-for="entity in entities" :key="entity.id">
        <TableEntry :entityType="entityType" :entity="entity" />
      </tbody>
    </table>
  </div>
</template>
