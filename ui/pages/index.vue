<script setup lang="ts">
import { useClaimStore } from "~~/store/Claim";
import { useInsuranceStore } from "~~/store/Insurance";
import { useInsuredPersonStore } from "~~/store/InsuredPerson";
import { claimParams } from "~~/store/entityParams";

const insuranceStore = useInsuranceStore();
insuranceStore.fetchAll();
const claimStore = useClaimStore();
claimStore.fetchAll();
const insuredPersonStore = useInsuredPersonStore();
insuredPersonStore.fetchAll();
</script>

<template>
  <div class="bg-gradient-to-r to-base-100 from-base-200 h-full rounded-2xl px-10 py-5">
    <div class="flex">
      <div class="flex-1 mt-28">
        <div>
          <div class="stats bg-gradient-to-r to-base-200 from-base-100 text-primary-content my-3">
            <div class="stat">
              <div class="stat-title">Pending Claims</div>
              <div class="stat-value">{{ claimStore.countByState("CREATED") }}</div>
              <div class="stat-actions">
                <button
                  class="btn btn-sm"
                  v-on:click="
                    navigateTo({
                      path: '/claim',
                    })
                  "
                >
                  Assess
                </button>
              </div>
            </div>
            <div class="stat">
              <div class="stat-title">Approved Claims</div>
              <div class="stat-value">{{ claimStore.countByState("APPROVED") }}</div>
              <div class="stat-desc">Total</div>
            </div>

            <div class="stat">
              <div class="stat-title">Rejected Claims</div>
              <div class="stat-value">{{ claimStore.countByState("REJECTED") }}</div>
              <div class="stat-desc">Total</div>
            </div>
          </div>
        </div>

        <div>
          <div class="stats bg-gradient-to-r to-base-200 from-base-100 text-primary-content my-5">
            <div class="stat">
              <div class="stat-title">Active Insurances</div>
              <div class="stat-value">{{ insuranceStore.countActive() }}</div>
              <div class="stat-desc">Total</div>
            </div>

            <div class="stat">
              <div class="stat-title">Canceled Insurances</div>
              <div class="stat-value">{{ insuranceStore.countCancelled() }}</div>
              <div class="stat-desc">Total</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="card h-18 bg-gradient-to-r to-base-200 from-base-100 text-primary-content w-full shadow-xl my-3">
          <div class="card-body p-5">
            <h2 class="card-title text-md">Most Recent Claim</h2>
          </div>
        </div>
        <CustomList :redirect="true" class="h-auto cursor-pointer" :entityParams="claimParams" entityType="claim" :entity="claimStore.mostRecentClaim()" />
      </div>
    </div>

    <div class="mt-12 mb-3">
      <div class="stats bg-gradient-to-r from-base-100 to-base-200 text-primary-content w-full">
        <div class="stat">
          <div class="stat-title">Insurances</div>
          <div class="stat-value">{{ insuranceStore.insurances.length }}</div>
          <div class="stat-desc">Total</div>
        </div>

        <div class="stat">
          <div class="stat-title">Claims</div>
          <div class="stat-value">{{ claimStore.claims.length }}</div>
          <div class="stat-desc">Total</div>
        </div>

        <div class="stat">
          <div class="stat-title">Insured Persons</div>
          <div class="stat-value">{{ insuredPersonStore.insuredPersons.length }}</div>
          <div class="stat-desc">Total</div>
        </div>
      </div>
    </div>
  </div>
</template>
