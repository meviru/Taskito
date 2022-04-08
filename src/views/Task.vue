<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <topbar :toolbar-title="toolbarTitle" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

import { Constants } from "@/constants/index";
import Topbar from "@/components/topbar/Topbar.vue";
export default defineComponent({
  name: Constants.NAME.TASK_TAB,
  components: { IonContent, IonPage, Topbar },
  setup() {
    return {
      toolbarTitle: "Task",
    };
  },
});
</script>
