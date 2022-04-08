<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/dashboard">
          <ion-icon :icon="gridOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/tabs/task">
          <ion-icon :icon="documentTextOutline" />
        </ion-tab-button>
        <ion-tab-button tab="openMenu" class="tab-create-btn">
          <ion-icon :icon="addOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/board">
          <ion-icon :icon="albumsOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab4" href="/tabs/chat">
          <ion-icon :icon="chatboxOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  gridOutline,
  documentTextOutline,
  addOutline,
  albumsOutline,
  chatboxOutline,
} from "ionicons/icons";
import { Constants } from "@/constants/index";
export default defineComponent({
  name: Constants.NAME.TABS_PAGE,
  components: {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      gridOutline,
      documentTextOutline,
      addOutline,
      albumsOutline,
      chatboxOutline,
    };
  },
});
</script>