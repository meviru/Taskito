<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <topbar :toolbar-title="toolbarTitle" />
      <div class="chart-wrapper">
        <Doughnut
          :css-classes="cssClasses"
          :chart-id="chartId"
          :chart-data="chartData"
          :chart-options="chartOptions"
          :styles="styles"
          :plugins="plugins"
        />
      </div>
      <div class="wrapper">
        <ion-list class="card-list" lines="none">
          <ion-item>
            <ion-avatar
              slot="start"
              class="icon-gray d-flex align-items-center justify-content-center"
            >
              <ion-icon :icon="folderOutline" />
            </ion-avatar>
            <ion-label>Total Task</ion-label>
            <ion-label slot="end">100</ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar
              slot="start"
              class="
                icon-primary
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <ion-icon :icon="checkmarkDoneOutline" />
            </ion-avatar>
            <ion-label>Completed</ion-label>
            <ion-label slot="end">10</ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar
              slot="start"
              class="
                icon-accent
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <ion-icon :icon="repeatOutline" />
            </ion-avatar>
            <ion-label>In Progress</ion-label>
            <ion-label slot="end">40</ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar
              slot="start"
              class="
                icon-secondary
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <ion-icon :icon="addOutline" />
            </ion-avatar>
            <ion-label>Pending</ion-label>
            <ion-label slot="end">20</ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar
              slot="start"
              class="
                icon-warning
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <ion-icon :icon="pauseOutline" />
            </ion-avatar>
            <ion-label>On Hold</ion-label>
            <ion-label slot="end">30</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  onIonViewWillEnter,
  onIonViewDidLeave,
} from "@ionic/vue";
import { Constants } from "@/constants/index";
import {
  folderOutline,
  checkmarkDoneOutline,
  repeatOutline,
  addOutline,
  pauseOutline,
} from "ionicons/icons";
import { animate, stagger } from "motion";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import Topbar from "@/components/topbar/Topbar.vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
export default defineComponent({
  name: Constants.NAME.DASHBOARD_TAB,
  components: { IonContent, IonPage, Doughnut, Topbar },
  setup() {
    // Chart integration
    const chartData = {
      datasets: [
        {
          backgroundColor: ["#5a55ca", "#2bc09c", "#f26950", "#ffab58"],
          data: [10, 40, 20, 30],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
      },
      hoverOffset: 4,
      hoverBorderWidth: 0,
      plugins: {},
    };

    const delayCount: any = stagger(0.1);
    const addAnimation = () => {
      animate(
        ".item",
        { y: 0, opacity: 1 },
        {
          delay: delayCount,
          duration: 0.2,
          easing: "ease-out",
        }
      );
      animate(
        "#dashboard-chart",
        { scale: 1, opacity: 1 },
        {
          duration: 0.5,
          easing: "ease-out",
        }
      );
    };

    const removeAnimation = () => {
      animate(".item", { y: 45, opacity: 0 });
      animate("#dashboard-chart", { scale: 0, opacity: 0 });
    };

    onIonViewWillEnter(() => {
      addAnimation();
    });

    onIonViewDidLeave(() => {
      removeAnimation();
    });

    return {
      toolbarTitle: "Dashboard",
      // Ionicons
      folderOutline,
      checkmarkDoneOutline,
      repeatOutline,
      addOutline,
      pauseOutline,
      // Chart options
      chartData,
      chartOptions,
      chartId: "dashboard-chart",
      cssClasses: "dashboard-chart",
      styles: {
        height: "200px",
      },
    };
  },
});
</script>
