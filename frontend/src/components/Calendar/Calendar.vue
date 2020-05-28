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
      :weekends="calendarWeekends"
      :events="calendarEvents"
    />
    <div class="addEventPopup" v-if="statusAddEventPopup">
      <form v-on:submit.prevent="addEvent">
        <input v-model="eventTitle" type="text" placeholder="titel" />
        <input v-model="eventStartTime" type="time" v-if="!eventAllDay" />
        <input v-model="eventEndTime" type="time" v-if="!eventAllDay" />
        <input v-model="eventStartDate" type="date" />
        <input v-model="eventEndDate" type="date" />
        <input v-model="eventAllDay" type="checkbox" />
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
        start: this.eventStartDate,
        end: this.eventEndDate,
        startTime: this.eventStartTime,
        endTime: this.eventEndTime,
        allDay: this.eventAllDay
      });
    }
  }
};
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/timeline/main.css";
@import "~@fullcalendar/resource-timeline/main.css";
@import "~@fullcalendar/timegrid/main.css";
.wrapper {
  padding: 50px;
}
.addEventPopup {
  position: fixed;
  background: greenyellow;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
}
</style>