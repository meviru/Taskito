<template>
  <ion-page>
    <ion-content :fullscreen="true">
        <h1>Sign In Page</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { Constants } from "@/constants/index";
export default defineComponent({
  name: Constants.NAME.SIGN_IN,
  components: { IonContent, IonPage },
});
</script>
