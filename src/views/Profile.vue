<template>
  <ion-page>
    <modal-topbar
      :toolbar-title="modalTopbarTitle"
      @closeModal="closeModal()"
    />
    <ion-content :fullscreen="true">
      <div class="py-3 px-3">
        <ion-button expand="block" color="primary" @click="logoutUser"
          >Logout</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent, useIonRouter } from "@ionic/vue";
import { Constants } from "@/constants/index";
import ModalTopbar from "@/components/modal-topbar/ModalTopbar.vue";
import store from "@/store/index";
import { getAuth, signOut } from "firebase/auth";
export default defineComponent({
  name: Constants.NAME.SIGN_IN,
  components: { IonContent, IonPage, ModalTopbar },
  data() {
    return {
      modalTopbarTitle: "Profile",
      ionRouter: useIonRouter(),
    };
  },
  computed: {
    getUserDetail() {
      return store.getters.getUserDetail;
    },
  },
  methods: {
    closeModal() {
      this.ionRouter.back();
    },
    logoutUser() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.ionRouter.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log(this.getUserDetail);
  },
});
</script>
