<template>
  <div class="wrapper">
    <FullCalendar
      schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
      :plugins="calendarPlugins"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
      }"
      :weekends="calendarWeekends"
      :events="calendarEvents"
      @dateClick="handleDateClick"
    />
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
        { title: "Event Now", start: new Date() }
      ]
    };
  },
  methods: {
    handleDateClick(arg) {
      if (confirm("Vill du lägga till en resa " + arg.dateStr + " ?")) {
        this.calendarEvents.push({
          // add new event data
          title: "",
          start: arg.date,
          allDay: false
        });
      }
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
</style>