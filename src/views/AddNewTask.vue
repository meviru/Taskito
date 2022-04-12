<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1>Add New Task</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { Constants } from "@/constants/index";
import { addOutline } from "ionicons/icons";
export default defineComponent({
  name: Constants.NAME.ADD_NEW_TASK,
  components: { IonContent, IonPage },
  setup() {
    return {
      addOutline,
    };
  },
});
</script>
