<script setup lang="ts">
const routes = {
  insurance: {
    path: "/insurance",
    title: "Insurances",
  },
  claim: {
    path: "/claim",
    title: "Claims",
  },
  insuredPerson: {
    path: "/insuredPerson",
    title: "Insured Persons",
  },
};

const signOut = async () => {
  await signOutUser();
  return navigateTo({
    path: `/signin`,
  });
};
</script>

<template>
  <div class="navbar bg-base-100 p-5">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <NuxtLink :to="routes.insurance.path">{{ routes.insurance.title }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="routes.claim.path">{{ routes.claim.title }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="routes.insuredPerson.path">{{ routes.insuredPerson.title }}</NuxtLink>
          </li>
          <li class="mt-8">
            <button class="btn btn-outline btn-error border-none" v-on:click="signOut()"><i class="material-icons-outlined"> logout </i>Sign out</button>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">Car Insurance</NuxtLink>
    </div>
    <div class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <li>
          <NuxtLink :to="routes.insurance.path">{{ routes.insurance.title }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="routes.claim.path">{{ routes.claim.title }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="routes.insuredPerson.path">{{ routes.insuredPerson.title }}</NuxtLink>
        </li>
        <li class="ml-10">
          <button class="btn btn-outline btn-error border-none" v-on:click="signOut()"><i class="material-icons-outlined"> logout </i>Sign out</button>
        </li>
      </ul>
    </div>
  </div>
</template>
