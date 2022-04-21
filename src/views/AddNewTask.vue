<template>
  <ion-page>
    <modal-topbar
      :toolbar-title="modalTopbarTitle"
      @closeModal="closeModal()"
    />
    <ion-content :fullscreen="true">
      <Form @submit="onSubmit" v-slot="{ errors }" class="c-form h-100">
        <ion-content class="c-form__content">
          <ion-item mode="md">
            <ion-label position="stacked">Task Name</ion-label>
            <Field
              v-model="taskName"
              type="text"
              name="task.name"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <div
                class="w-100 form-control"
                :class="{
                  'is-invalid': errors['task.name'],
                }"
              >
                <ion-input
                  name="task.name"
                  inputmode="text"
                  mode="md"
                  v-bind="field"
                ></ion-input>
              </div>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="task.name" />
            </div>
          </ion-item>
          <ion-item mode="md">
            <ion-label position="stacked">Description</ion-label>
            <Field
              v-model="taskDescription"
              type="text"
              name="task.description"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <div
                class="w-100 form-control"
                :class="{
                  'is-invalid': errors['task.description'],
                }"
              >
                <ion-input
                  name="task.description"
                  type="text"
                  mode="md"
                  v-bind="field"
                ></ion-input>
              </div>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="task.description" />
            </div>
          </ion-item>

          <ion-item mode="md">
            <ion-label position="stacked">Date</ion-label>
            <Field
              v-model="taskDate"
              type="text"
              name="task.taskDate"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <div
                class="form-control d-flex align-items-center w-100"
                :class="{
                  'is-invalid': errors['task.taskDate'],
                }"
              >
                <ion-input
                  name="task.taskDate"
                  mode="md"
                  v-bind="field"
                  readonly
                  @click="setDatepickerOpen(true)"
                ></ion-input>
                <ion-icon slot="end" :icon="calendarClearOutline" />
              </div>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="task.taskDate" />
            </div>
            <ion-modal
              mode="md"
              class="c-modal__datepicker"
              show-backdrop="true"
              :is-open="dismissDatepicker"
              @didDismiss="setDatepickerOpen(false)"
            >
              <ion-content force-overscroll="false">
                <ion-datetime
                  mode="md"
                  class="c-datepicker"
                  :value="taskDateISO"
                  presentation="date"
                  @ionChange="formatDate"
                ></ion-datetime>
              </ion-content>
            </ion-modal>
          </ion-item>
          <ion-grid class="ion-no-padding">
            <ion-row>
              <ion-col>
                <ion-item mode="md">
                  <ion-label position="stacked">Start Time</ion-label>
                  <Field
                    v-model="taskStartTime"
                    type="text"
                    name="task.startTime"
                    v-slot="{ field }"
                    :rules="isRequired"
                  >
                    <div
                      class="form-control d-flex align-items-center"
                      :class="{
                        'is-invalid': errors['task.startTime'],
                      }"
                    >
                      <ion-input
                        @click="openPicker('start')"
                        mode="md"
                        readonly
                        v-bind="field"
                        id="startTimePicker"
                      ></ion-input>
                      <ion-icon slot="end" :icon="chevronDownOutline" />
                    </div>
                  </Field>
                  <div class="invalid-error">
                    <ErrorMessage name="task.startTime" />
                  </div>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item mode="md">
                  <ion-label position="stacked">End Time</ion-label>
                  <Field
                    v-model="taskEndTime"
                    type="text"
                    name="task.endTime"
                    v-slot="{ field }"
                    :rules="isRequired"
                  >
                    <div
                      class="form-control d-flex align-items-center"
                      :class="{
                        'is-invalid': errors['task.endTime'],
                      }"
                    >
                      <ion-input
                        @click="openPicker('end')"
                        mode="md"
                        readonly
                        v-bind="field"
                        id="endTimePicker"
                      ></ion-input>
                      <ion-icon slot="end" :icon="chevronDownOutline" />
                    </div>
                  </Field>
                  <div class="invalid-error">
                    <ErrorMessage name="task.endTime" />
                  </div>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-item
            class="item-input item-label-stacked"
            lines="none"
            mode="md"
          >
            <ion-label position="stacked">Board</ion-label>
            <div class="c-chip-wrap">
              <Field
                type="hidden"
                :rules="isRequiredBoard"
                name="task.boardName"
                v-model="selectedBoardItem"
              />
              <ion-chip
                class="c-chip"
                v-for="(item, index) in boardItems"
                :key="index"
                @click="onBoardSelect(item, index)"
                :class="{
                  'c-chip__secondary': item.value == 1,
                  'c-chip__accent': item.value == 2,
                  'c-chip__primary': item.value == 3,
                  'c-chip__warning': item.value == 4,
                  'c-chip__selected': isChipSelected == index,
                }"
              >
                {{ item.text }}
              </ion-chip>
              <div class="invalid-error">
                <ErrorMessage name="task.boardName" />
              </div>
            </div>
          </ion-item>
        </ion-content>
        <div class="c-form__action">
          <ion-button type="submit" color="primary" expand="block">
            Done
          </ion-button>
        </div>
      </Form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  useIonRouter,
  IonModal,
  IonDatetime,
  pickerController,
} from "@ionic/vue";
import { Constants } from "@/constants/index";
import {
  addOutline,
  chevronDownOutline,
  calendarClearOutline,
} from "ionicons/icons";
import { Form, Field, ErrorMessage } from "vee-validate";
import { string, object, number } from "yup";
import { format, parseISO } from "date-fns";
import ModalTopbar from "@/components/modal-topbar/ModalTopbar.vue";
export default defineComponent({
  name: Constants.NAME.ADD_NEW_TASK,
  components: {
    IonContent,
    IonPage,
    ModalTopbar,
    Form,
    Field,
    ErrorMessage,
    IonModal,
    IonDatetime,
  },
  setup() {
    return {
      addOutline,
      chevronDownOutline,
      calendarClearOutline,
    };
  },
  data() {
    const hoursArray: any = [];
    for (let i = 1; i <= 12; i++) {
      hoursArray.push({
        text: i,
        value: i,
      });
    }

    const minutesArray: any = [];
    for (let i = 0; i <= 60; i++) {
      minutesArray.push({
        text: i < 10 ? "0" + i : i,
        value: i < 10 ? "0" + i : i,
      });
    }

    return {
      modalTopbarTitle: "Add Task",
      ionRouter: useIonRouter(),
      taskDate: "",
      taskDateISO: "",
      dismissDatepicker: false,
      isRequired: string()
        .required(Constants.VALIDATION.REQUIRED)
        .nullable(true),
      isRequiredBoard: object().shape({
        text: string().required(Constants.VALIDATION.REQUIRED).nullable(true),
        value: number().required(Constants.VALIDATION.REQUIRED).nullable(true),
      }),
      pickingOptions: [
        {
          name: "hours",
          options: hoursArray,
        },
        {
          name: "minutes",
          options: minutesArray,
        },
        {
          name: "label",
          options: [
            { text: "AM", value: "AM" },
            { text: "PM", value: "PM" },
          ],
        },
      ],
      pickedStartDate: {
        hours: "",
        minutes: "",
        label: "",
      },
      pickedEndDate: {
        hours: "",
        minutes: "",
        label: "",
      },
      boardItems: [
        { text: "Urgent", value: 1 },
        { text: "Running", value: 2 },
        { text: "Ongoing", value: 3 },
        { text: "Pending", value: 4 },
      ],
      isChipSelected: undefined as any,
      selectedBoardItem: "",
    };
  },
  computed: {
    taskStartTime(): string {
      if (this.pickedStartDate.hours) {
        return (
          this.pickedStartDate.hours +
          ":" +
          this.pickedStartDate.minutes +
          " " +
          this.pickedStartDate.label
        );
      } else {
        return "";
      }
    },
    taskEndTime(): string {
      if (this.pickedEndDate.hours) {
        return (
          this.pickedEndDate.hours +
          ":" +
          this.pickedEndDate.minutes +
          " " +
          this.pickedEndDate.label
        );
      } else {
        return "";
      }
    },
  },
  methods: {
    formatDate(event: any) {
      if (event.detail.value === undefined) return;
      this.taskDateISO = event.detail.value;
      this.taskDate = format(parseISO(event.detail.value), "MMM dd, yyyy");
      this.dismissDatepicker = false;
    },
    setDatepickerOpen(state: boolean) {
      this.dismissDatepicker = state;
    },
    closeModal() {
      this.ionRouter.back();
    },
    async openPicker(time: string) {
      const picker = await pickerController.create({
        mode: "ios",
        cssClass: "c-timepicker",
        columns: this.pickingOptions,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Confirm",
            handler: (value) => {
              if (time == "start") {
                this.pickedStartDate.hours = value.hours.value;
                this.pickedStartDate.minutes = value.minutes.value;
                this.pickedStartDate.label = value.label.value;
              } else {
                this.pickedEndDate.hours = value.hours.value;
                this.pickedEndDate.minutes = value.minutes.value;
                this.pickedEndDate.label = value.label.value;
              }
            },
          },
        ],
      });
      await picker.present();
    },
    onBoardSelect(item: any, index: number) {
      this.isChipSelected = index;
      this.selectedBoardItem = item;
    },
    onSubmit(values: any) {
      console.log(values);
    },
  },
});
</script>
