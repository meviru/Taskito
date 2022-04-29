<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div
        class="
          h-100
          d-flex
          flex-column
          text-center
          pb-5
          align-items-center
          justify-content-between
        "
      >
        <div
          class="c-logo mt-5 d-flex align-items-center justify-content-center"
        >
          <img
            class="c-logo__img"
            src="@/assets/images/logo.png"
            alt="Taskito"
            width="60"
          />
          <span class="c-logo__name ml-3">Taskito</span>
        </div>
        <div class="c-section mb-4">
          <h1 class="c-section__title">
            Manage <br />
            your task easily
          </h1>
          <p class="c-section__desc">
            Easy way to manage daily task and office management.
          </p>
        </div>
        <div class="c-login-action">
          <ion-button
            @click="signInWithGoogle"
            expand="block"
            class="c-login-action__btn"
          >
            Sign in with Google
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent, useIonRouter, toastController } from "@ionic/vue";
import { Constants } from "@/constants/index";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import store from "@/store/index";
export default defineComponent({
  name: Constants.NAME.SIGN_IN,
  components: { IonContent, IonPage },
  data() {
    return {
      ionRouter: useIonRouter(),
    };
  },
  methods: {
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          store.dispatch("setUserDetail", result.user);
          this.ionRouter.push("/tabs");
        })
        .catch((error) => {
          this.openToast("Something went wrong! Please try again.");
        });
    },
    async openToast(toastMessage) {
      const toast = await toastController.create({
        mode: "ios",
        cssClass: "c-toaster",
        position: "top",
        message: toastMessage,
        duration: 2000,
      });
      return toast.present();
    },
  },
});
</script>
