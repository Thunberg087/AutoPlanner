<template>
  <div class="wrapper">
    <FullCalendar
      locale="sv"
      schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
      :plugins="calendarPlugins"
      :header="{
        left: 'prev, next, today, customButton',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
      }"
      :customButtons="{
        customButton: {
          text: 'Lägg till event!',
          click: openAddEventPopup
        }
      }"
      :aspectRatio="2.8"
      :weekends="calendarWeekends"
      :events="calendarEvents"
    />
    <div class="addEventPopup" v-if="statusAddEventPopup">
      <form v-on:submit.prevent="addEvent">
        <input v-model="eventTitle" type="text" placeholder="Titel" />
        <div class="checkboxWrapper">
          <input v-model="eventAllDay" type="checkbox" id="checkbox" />
          <label for="checkbox">Heldag</label>
        </div>

        <div class="dateTimeBox">
          <input v-model="eventStartDate" type="date" />
          <input v-model="eventStartTime" type="time" v-if="!eventAllDay" />
        </div>
        <div class="dateTimeBox">
          <input v-model="eventEndDate" type="date" />
          <input v-model="eventEndTime" type="time" v-if="!eventAllDay" />
        </div>
        <input type="submit" value="Lägg till" />
      </form>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default {
  components: {
    FullCalendar
  },
  data: function() {
    return {
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
        listPlugin
      ],
      calendarWeekends: true,
      calendarEvents: [
        // initial event data
      ],
      statusAddEventPopup: false,
      eventTitle: "",
      eventStartTime: null,
      eventEndTime: null,
      eventStartDate: null,
      eventEndDate: null,
      eventAllDay: false
    };
  },
  methods: {
    openAddEventPopup() {
      this.statusAddEventPopup = true;
    },
    addEvent() {
      this.calendarEvents.push({
        title: this.eventTitle,
        start: this.eventStartDate + "T" + this.eventStartTime,
        end: this.eventEndDate + "T" + this.eventEndTime,
        allDay: this.eventAllDay
      });
      this.removeAddEventPopup();
    },
    removeAddEventPopup() {
      this.statusAddEventPopup = false;
    }
  }
};
</script>

<style scoped>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/timeline/main.css";
@import "~@fullcalendar/resource-timeline/main.css";
@import "~@fullcalendar/timegrid/main.css";

.wrapper {
  padding: 50px;
}

/deep/ .fc-view-container {
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

/deep/ .fc-day-header {
  padding: 10px !important;
}

.addEventPopup {
  position: fixed;
  background: white;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  border-radius: 6px;
  -webkit-box-shadow: 0px 0px 9px -5px rgba(138, 138, 138, 1);
  -moz-box-shadow: 0px 0px 9px -5px rgba(138, 138, 138, 1);
  box-shadow: 0px 0px 9px -5px rgba(138, 138, 138, 1);
}

.addEventPopup form {
  display: grid;
}

.addEventPopup input {
  display: block;
  padding: 5px;
  margin: 5px;
  box-sizing: border-box;
}

.checkboxWrapper {
  display: inline-flex;
}

.dateTimeBox {
  display: inline-flex;
}
</style>