<script setup lang="ts">
let email: string = "sasa.vincic16@gmail.com";
let password: string = "vincic";

const signIn = async () => {
  console.log(email, password);
  await signInUser(email, password);
  return navigateTo({
    path: `/`,
  });
};
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="space-y-8 object-center w-96">
      <div class="space-y-2 text-center">
        <h1 class="text-5xl font-medium">Sign In</h1>
      </div>
      <form class="space-y-4" v-on:submit.prevent="signIn">
        <div class="form-control w-full max-w-md space-y-2">
          <label>
            <span class="label-text">Email</span>
          </label>
          <input required class="input input-bordered w-full max-w-md" type="email" placeholder="e.g. john.doe@gmail.com" v-model="email" />
        </div>
        <div class="form-control w-full space-y-2">
          <label>
            <span class="label-text">Password</span>
          </label>
          <input required class="input input-bordered w-full max-w-md" type="password" placeholder="Password" v-model="password" />
        </div>
        <button type="submit" class="btn btn-outline btn-success w-full max-w-md">Sign in</button>
      </form>
      <div>
        <span>Don't have an account? <NuxtLink to="/signup" class="text-secondary">Sign Up</NuxtLink></span>
      </div>
    </div>
  </div>
</template>
