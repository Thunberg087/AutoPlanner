<template>
  <div class="wrapper">
    <FullCalendar
    locale="sv"
    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
    :plugins="calendarPlugins"
    :selectable="true"
    :header="{
    left: 'prev, next, today, customButton',
    center: 'title',
    right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
    }"
    editable: true
    @eventClick="eventClick"
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
        <input v-model="newEvent.eventTitle" type="text" placeholder="Titel" />
        <div class="checkboxWrapper">
          <div class="selectWrapper">
            <select v-model="selected">
              <option disabled value>Välj en plats</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <input v-model="newEvent.eventAllDay" type="checkbox" id="checkbox" />
          <label for="checkbox">Heldag</label>
        </div>

        <div class="dateTimeBox">
          <input v-model="newEvent.eventStartDate" type="date" />
          <input v-model="newEvent.eventStartTime" type="time" v-if="!newEvent.eventAllDay" />
        </div>
        <div class="dateTimeBox">
          <input v-model="newEvent.eventEndDate" type="date" />
          <input v-model="newEvent.eventEndTime" type="time" v-if="!newEvent.eventAllDay" />
        </div>
        <input type="submit" value="Lägg till" />
        <p v-if="errorMessage">{{errorMessage}}</p>
      </form>
    </div>

    <!-- 
   - Location ska även visas, eventuellt samt busslinje visas. 
   - Avisering skall läggas till i med en checbox (diskuteras med gruppen om nödvädnigt) 
     typ som google kalender, notifikationstabell i databsen. 
   - Tidsmarginal skall visas och även kunna ändras.
   - Se busstid? Se bussen som passar bäst för tid man har lagt in?
    -->

    <div class="showEventInfoPopup" v-if="eventInfo">
      <div class="showTitleBox">Titel: {{eventInfo.title}}</div>

      <div class="showTimeBox">Start: {{eventInfo.start}}</div>
      <div class="showTimeBox">Slut: {{eventInfo.end}}</div>

      <button v-on:click="removeEventInfoPopup">Close</button>
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
      newEvent: {
        eventTitle: "",
        eventStartTime: null,
        eventEndTime: null,
        eventStartDate: null,
        eventEndDate: null,
        eventAllDay: false
      },
      errorMessage: null,
      statusAddEventPopup: false,
      eventInfo: null
    };
  },
  watch: {
    eventAllDay(newValue) {
      if (newValue == true) {
        this.newEvent.eventStartTime = null;
        this.newEvent.eventEndTime = null;
      }
    }
  },
  created() {
    let url =
      process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

    this.axios
      .post(url + "calendar/getEvents", {
        userId: this.$store.getters.getUser.id
      })
      .then(res => {
        this.calendarEvents = res.data;
      })
      .catch(err => {
        this.errorMessage = err.response.data.msg;
      });
  },
  methods: {
    openAddEventPopup() {
      this.statusAddEventPopup = true;
    },
    addEvent() {
      let start = this.newEvent.eventStartTime
        ? this.newEvent.eventStartDate + "T" + this.newEvent.eventStartTime
        : this.newEvent.eventStartDate;
      let end = this.newEvent.eventEndTime
        ? this.newEvent.eventEndDate + "T" + this.newEvent.eventEndTime
        : this.newEvent.eventEndDate;

      let newCalendarEvent = {
        title: this.newEvent.eventTitle,
        start,
        end,
        allDay: this.newEvent.eventAllDay,
        userId: this.$store.getters.getUser.id
      };
      let url =
        process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      this.axios
        .post(url + "calendar/addEvent", newCalendarEvent)
        .then(res => {
          this.calendarEvents.push(newCalendarEvent);
          this.removeAddEventPopup();
        })
        .catch(err => {
          this.errorMessage = err.response.data.msg;
        });
    },
    removeAddEventPopup() {
      this.statusAddEventPopup = false;
    },

    eventClick(info) {
      let url =
        process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      this.axios
        .post(url + "calendar/getEvent", { id: info.event.id })
        .then(res => {
          this.eventInfo = res.data[0];
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.response.data.msg;
        });
    },
    removeEventInfoPopup() {
      this.eventInfo = null;
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

.selectWrapper {
  display: inline-flex;
  margin: 5px;
}

.checkboxWrapper {
  display: inline-flex;
}

.dateTimeBox {
  display: inline-flex;
}

.showEventInfoPopup {
  position: fixed;
  background: white;
  padding: 15px;
  top: 50%;
  left: 45%;
  z-index: 15;
  border-radius: 6px;
  -webkit-box-shadow: 0px 0px 9px -5px rgba(138, 138, 138, 1);
  -moz-box-shadow: 0px 0px 9px -5px rgba(138, 138, 138, 1);
  box-shadow: 0px 0px 9px -5px rgba(138, 138, 138, 1);
}

.showEventInfoPopup form {
  display: grid;
}

.showEventInfoPopup input {
  display: block;
  padding: 5px;
  margin: 5px;
  box-sizing: border-box;
}
.showTimeBox {
  display: inline-flex;
}
</style>