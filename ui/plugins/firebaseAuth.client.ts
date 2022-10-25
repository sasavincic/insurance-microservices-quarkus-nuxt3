import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
    };

    const app = initializeApp(firebaseConfig);

    initUser();

    const auth = getAuth();

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
})