<template>
  <ion-page>
    <ion-content :fullscreen="true"> </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

import { Constants } from "@/constants/index";
export default defineComponent({
  name: Constants.NAME.TASK_TAB,
  components: { IonContent, IonPage },
});
</script>
