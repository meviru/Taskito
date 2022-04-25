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
              name="name"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <div
                class="w-100 form-control"
                :class="{
                  'is-invalid': errors['name'],
                }"
              >
                <ion-input
                  name="name"
                  inputmode="text"
                  mode="md"
                  v-bind="field"
                ></ion-input>
              </div>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="name" />
            </div>
          </ion-item>
          <ion-item mode="md">
            <ion-label position="stacked">Description</ion-label>
            <Field
              v-model="taskDescription"
              type="text"
              name="description"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <div
                class="w-100 form-control"
                :class="{
                  'is-invalid': errors['description'],
                }"
              >
                <ion-input
                  name="description"
                  type="text"
                  mode="md"
                  v-bind="field"
                ></ion-input>
              </div>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="description" />
            </div>
          </ion-item>

          <ion-item mode="md">
            <ion-label position="stacked">Date</ion-label>
            <Field
              v-model="taskDate"
              type="text"
              name="taskDate"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <div
                class="form-control d-flex align-items-center w-100"
                :class="{
                  'is-invalid': errors['taskDate'],
                }"
              >
                <ion-input
                  name="taskDate"
                  mode="md"
                  v-bind="field"
                  readonly
                  @click="setDatepickerOpen(true)"
                ></ion-input>
                <ion-icon slot="end" :icon="calendarClearOutline" />
              </div>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="taskDate" />
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
                    name="startTime"
                    v-slot="{ field }"
                    :rules="isRequired"
                  >
                    <div
                      class="form-control d-flex align-items-center"
                      :class="{
                        'is-invalid': errors['startTime'],
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
                    <ErrorMessage name="startTime" />
                  </div>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item mode="md">
                  <ion-label position="stacked">End Time</ion-label>
                  <Field
                    v-model="taskEndTime"
                    type="text"
                    name="endTime"
                    v-slot="{ field }"
                    :rules="isRequired"
                  >
                    <div
                      class="form-control d-flex align-items-center"
                      :class="{
                        'is-invalid': errors['endTime'],
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
                    <ErrorMessage name="endTime" />
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
                name="board"
                v-model="selectedBoardItem"
              />
              <ion-chip
                class="c-chip"
                v-for="(item, index) in boardItems"
                :key="index"
                @click="onBoardSelect(item, index + 1)"
                :class="{
                  'c-chip__secondary': item.value == 1,
                  'c-chip__accent': item.value == 2,
                  'c-chip__primary': item.value == 3,
                  'c-chip__warning': item.value == 4,
                  'c-chip__selected': isChipSelected == index + 1,
                }"
              >
                {{ item.text }}
              </ion-chip>
              <div class="invalid-error">
                <ErrorMessage name="board" />
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
  toastController,
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
import { createTask, getTask, updateTask } from "@/firebase";

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
      taskName: "",
      taskDescription: "",
      taskDate: "",
      taskDateISO: "",
      taskStartTime: "",
      taskEndTime: "",
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
          selectedIndex: 0,
        },
        {
          name: "minutes",
          options: minutesArray,
          selectedIndex: 0,
        },
        {
          name: "label",
          options: [
            { text: "AM", value: "AM" },
            { text: "PM", value: "PM" },
          ],
          selectedIndex: 0,
        },
      ],
      boardItems: [
        { text: "Urgent", value: 1 },
        { text: "Ongoing", value: 2 },
        { text: "Running", value: 3 },
        { text: "Onhold", value: 4 },
      ],
      isChipSelected: undefined as any,
      selectedBoardItem: {} as any,
      isEdit: false,
    };
  },
  computed: {
    getTaskId() {
      return this.$route.params.id;
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
                this.taskStartTime =
                  value.hours.value +
                  ":" +
                  value.minutes.value +
                  " " +
                  value.label.value;
              } else {
                this.taskEndTime =
                  value.hours.value +
                  ":" +
                  value.minutes.value +
                  " " +
                  value.label.value;
              }
            },
          },
        ],
      });
      await picker.present();
    },
    async openToast(toastMessage) {
      const toast = await toastController.create({
        mode: "ios",
        cssClass: "c-toaster",
        position: "bottom",
        message: toastMessage,
        duration: 2000,
      });
      return toast.present();
    },
    onBoardSelect(item: any, index: number) {
      this.isChipSelected = index;
      this.selectedBoardItem = item;
    },
    async onSubmit(values: any) {
      if (!this.isEdit) {
        const response = await createTask({ ...values });
        if (response) {
          this.openToast("Task has been added successfully.");
          this.ionRouter.back();
        }
      } else {
        await updateTask(this.getTaskId, { ...values });
        this.openToast("Task has been updated successfully.");
        this.ionRouter.back();
      }
    },
    getTaskInfo(taskId) {
      return new Promise((resolve) => {
        const task: any = getTask(taskId);
        if (task) {
          resolve(task);
        }
      });
    },
  },
  mounted() {
    if (this.getTaskId) {
      this.isEdit = true;
      this.modalTopbarTitle = "Edit Task";
      this.getTaskInfo(this.getTaskId)
        .then((task: any) => {
          this.taskName = task.name;
          this.taskDescription = task.description;
          this.taskDate = task.taskDate;
          this.taskStartTime = task.startTime;
          this.taskEndTime = task.endTime;
          this.selectedBoardItem = task.board;
          this.isChipSelected = task.board.value;
        })
        .catch((error) => {
          console.log(error);
          this.openToast("Error fetching the data from the server.");
        });
    }
  },
});
</script>
