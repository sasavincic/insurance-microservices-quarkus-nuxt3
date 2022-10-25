<script setup lang="ts">
let email = "sasa.vincic@gmail.com";
let password = "vincic";

const signUp = async () => {
  await createUser(email, password);
  return navigateTo({
    path: `/`,
  });
};
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="space-y-8 object-center w-96">
      <div class="space-y-2 text-center">
        <h1 class="text-5xl font-medium">Sign Up</h1>
      </div>
      <form class="space-y-4" v-on:submit.prevent="signUp()">
        <div class="flex space-x-2">
          <div class="form-control w-full max-w-md space-y-2">
            <label>
              <span class="label-text">First Name</span>
            </label>
            <input required class="input input-bordered w-full max-w-md" type="text" placeholder="e.g. John" />
          </div>
          <div class="form-control w-full max-w-md space-y-2">
            <label>
              <span class="label-text">Last Name</span>
            </label>
            <input required class="input input-bordered w-full max-w-md" type="text" placeholder="e.g. Doe" />
          </div>
        </div>
        <div class="form-control w-full max-w-md space-y-2">
          <label>
            <span class="label-text">Email</span>
          </label>
          <input required class="input input-bordered w-full max-w-md" type="email" placeholder="john.doe@gmail.com" v-model="email" />
        </div>
        <div class="form-control w-full space-y-2">
          <label>
            <span class="label-text">Password</span>
          </label>
          <input required class="input input-bordered w-full max-w-md" type="password" placeholder="Password" v-model="password" />
        </div>
        <button type="submit" class="btn btn-outline btn-success w-full max-w-md">Sign Up</button>
      </form>
      <div>
        <span>Already have an account? <NuxtLink to="/signin" class="text-secondary">Sign In</NuxtLink></span>
      </div>
    </div>
  </div>
</template>
