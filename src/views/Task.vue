<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <topbar :toolbar-title="toolbarTitle" />
      <div class="screen-wrapper">
        <div
          class="
            c-topbar-bottom
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <div class="c-topbar-bottom__left">
            <div class="text-muted c-topbar-bottom__date">
              {{ todayDate() }}
            </div>
            <strong>Today</strong>
          </div>
          <div class="topbar-bottom__right">
            <ion-button mode="md" href="/tabs/task/add" color="secondary">
              <ion-icon slot="start" :icon="addOutline" />
              <span>Add Task</span>
            </ion-button>
          </div>
        </div>
        <ul
          class="
            c-current-week
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <li
            v-for="(week, index) in daysOfTheWeek()"
            :key="index"
            class="d-flex flex-column align-items-center c-current-week__item"
            :class="{ active: isToday(week.day) }"
          >
            <span class="text-muted">{{ shortWeekday(week.weekday) }}</span>
            <strong :class="{ 'text-primary': isToday(week.day) }">{{
              week.day
            }}</strong>
          </li>
        </ul>
        <div class="card-listing">
          <Card
            :card-header="2"
            card-title="New Web UI Design Project"
            card-description="Website UI Design for $500"
            card-timings="10-11 AM"
            :card-persons="2"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { Constants } from "@/constants/index";
import { addOutline } from "ionicons/icons";
import Topbar from "@/components/topbar/Topbar.vue";
import Card from "@/components/topbar/Card.vue";
import CommonMixin from "@/mixins/common";
export default defineComponent({
  name: Constants.NAME.TASK_TAB,
  components: { IonContent, IonPage, Topbar, Card },
  mixins: [CommonMixin],
  setup() {
    return {
      toolbarTitle: "Task",
      addOutline
    };
  },
  methods: {
    isToday(day: any) {
      const date = new Date();
      return day == date.getDate() ? true : false;
    },
  },
});
</script>
