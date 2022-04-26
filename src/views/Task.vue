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
            <router-link to="/tabs/task/add">
              <ion-button mode="md" color="secondary">
                <ion-icon slot="start" :icon="addOutline" />
                <span>Add Task</span>
              </ion-button>
            </router-link>
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
            :class="{
              active: selectedDate == index,
            }"
            @click="filterTaskByDate(week.fulldate, index)"
          >
            <span class="text-muted">{{ shortWeekday(week.weekday) }}</span>
            <strong :class="{ 'text-primary': selectedDate == index }">{{
              week.day
            }}</strong>
          </li>
        </ul>
        <div class="card-listing" v-if="totalTasks > 0">
          <template v-for="(item, index) in tasksList" :key="index">
            <card
              :id="item.id"
              :card-header="item.board?.value"
              :card-title="item.name"
              :card-description="item.description"
              :card-timings="item.startTime + ` - ` + item.endTime"
              :card-persons="2"
            />
          </template>
        </div>
        <template v-else>
          <empty-state
            empty-state-img="no-data-found.svg"
            empty-state-desc="No Data Found"
          />
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { Constants } from "@/constants/index";
import { addOutline } from "ionicons/icons";
import Topbar from "@/components/topbar/Topbar.vue";
import Card from "@/components/card/Card.vue";
import EmptyState from "@/components/empty-state/EmptyState.vue";
import CommonMixin from "@/mixins/common";
import { filterByDate } from "@/firebase";
import { format, parseISO } from "date-fns";
export default defineComponent({
  name: Constants.NAME.TASK_TAB,
  components: { IonContent, IonPage, Topbar, Card, EmptyState },
  mixins: [CommonMixin],
  setup() {
    return {
      toolbarTitle: "Task",
      addOutline,
      // tasksList,
    };
  },
  data() {
    return {
      tasksList: [] as any,
      totalTasks: 0,
      selectedDate: 0,
    };
  },
  watch: {
    tasksList(newValue) {
      if (newValue) {
        this.tasksList = newValue;
        this.totalTasks = this.tasksList.length;
      }
    },
  },
  methods: {
    filterTaskByDate(day, index) {
      this.selectedDate = index;
      const date = new Date(day).toISOString();
      const finalDate = format(parseISO(date), "MMM dd, yyyy");
      this.tasksList = filterByDate(finalDate);
    },
  },
  created() {
    const date = new Date();
    this.daysOfTheWeek().forEach((day, index) => {
      if (day.day == date.getDate()) this.selectedDate = index;
    });
    this.filterTaskByDate(date, this.selectedDate);
  },
});
</script>
