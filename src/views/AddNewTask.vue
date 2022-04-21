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
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
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
import { Form, Field } from "vee-validate";
import { string } from "yup";
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
    return {
      modalTopbarTitle: "Add Task",
      ionRouter: useIonRouter(),
      taskDate: "",
      taskDateISO: "",
      dismissDatepicker: false,
      isRequired: string()
        .required(Constants.VALIDATION.REQUIRED)
        .nullable(true),
      pickingOptions: [
        {
          name: "hours",
          options: [
            { text: "12", value: "12" },
            { text: "1", value: "1" },
            { text: "2", value: "2" },
            { text: "3", value: "3" },
            { text: "4", value: "4" },
            { text: "5", value: "5" },
            { text: "6", value: "6" },
            { text: "7", value: "7" },
            { text: "8", value: "8" },
            { text: "9", value: "9" },
            { text: "10", value: "10" },
            { text: "11", value: "11" },
          ],
        },
        {
          name: "minutes",
          options: [
            { text: "00", value: "00" },
            { text: "10", value: "10" },
            { text: "15", value: "15" },
            { text: "20", value: "20" },
            { text: "25", value: "25" },
            { text: "30", value: "30" },
            { text: "35", value: "35" },
            { text: "40", value: "40" },
            { text: "45", value: "45" },
            { text: "50", value: "50" },
            { text: "55", value: "55" },
          ],
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
    onSubmit(values: any) {
      console.log(values);
    },
  },
});
</script>
