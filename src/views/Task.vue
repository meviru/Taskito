<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <topbar :toolbar-title="toolbarTitle" />
      <div
        class="
          c-topbar-bottom
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <div class="c-topbar-bottom__left">
          <div class="c-topbar-bottom__date">{{ todayDate() }}</div>
          <strong>Today</strong>
        </div>
        <div class="topbar-bottom__right">
          <ion-button mode="md" href="/tabs/task/add" color="secondary">
            <ion-icon slot="start" :icon="addOutline" />
            <span>Add Task</span>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

import { Constants } from "@/constants/index";
import Topbar from "@/components/topbar/Topbar.vue";
import { addOutline } from "ionicons/icons";
import CommonMixin from "@/mixins/common";
export default defineComponent({
  name: Constants.NAME.TASK_TAB,
  components: { IonContent, IonPage, Topbar },
  mixins: [CommonMixin],
  setup() {
    return {
      toolbarTitle: "Task",
      addOutline,
    };
  },
});
</script>
