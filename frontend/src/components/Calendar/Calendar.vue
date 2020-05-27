<template>
  <FullCalendar schedulerLicenseKey="XXX" :plugins="calendarPlugins" />
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin]
    };
  }
};
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/timeline/main.css";
@import "~@fullcalendar/resource-timeline/main.css";
</style>