<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" @click="hideMenu" href="/tabs/dashboard">
          <ion-icon :icon="gridOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab2" @click="hideMenu" href="/tabs/task">
          <ion-icon :icon="documentTextOutline" />
        </ion-tab-button>
        <ion-tab-button
          tab="openMenu"
          class="tab-create-btn"
          :class="{ active: isMenuToggled }"
        >
          <ion-icon :icon="addOutline" @click="toggleMenu" />
          <ul class="c-menu">
            <li
              class="c-menu__item"
              v-for="(menu, index) in menuList"
              :key="index"
            >
              <router-link
                @click="toggleMenu"
                class="c-menu__link"
                :to="menu.path"
                >{{ menu.text }}</router-link
              >
            </li>
          </ul>
        </ion-tab-button>
        <ion-tab-button tab="tab3" @click="hideMenu" href="/tabs/board">
          <ion-icon :icon="albumsOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab4" @click="hideMenu" href="/tabs/chat">
          <ion-icon :icon="chatboxOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <!-- filters -->
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="shadowed-goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in2="shadow" in="goo" result="goo" />
          <feBlend in2="goo" in="SourceGraphic" result="mix" />
        </filter>
      </defs>
    </svg>
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
  data() {
    return {
      isMenuToggled: false,
      menuList: [
        { text: "Dashboard", path: "/tabs/dashboard" },
        { text: "Task", path: "/tabs/task" },
        { text: "Board", path: "/tabs/board" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuToggled = !this.isMenuToggled;
    },
    hideMenu() {
      this.isMenuToggled = false;
    },
  },
});
</script>