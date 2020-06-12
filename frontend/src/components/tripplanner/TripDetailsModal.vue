<template>
      <div class="modal" v-show="value">
        <div v-if="trip != null" class="container">
            <span @click.prevent="close" class="close">&times;</span>
            
            <h3>{{ trip.Leg[0].Origin.name }} till {{ trip.Leg[trip.Leg.length - 1].Destination.name }}</h3>

            <div v-for="(leg, j) in trip.Leg" :key="j" class="trip-leg">
                <div class="leg-overview">
                    <h3 v-if="leg.name == 'Gå'">{{ leg.name }}</h3>
                    <h3 v-else :style="{background: leg.fgColor, color: leg.bgColor }">{{ leg.name }} mot {{ leg.direction }}</h3>
                    <p>{{ getTravelTime(leg.Origin, leg.Destination) }} min</p>
                </div>
                <div class="leg-details">
                    <p>{{ leg.Origin.time }}</p>
                    <p>{{ leg.Destination.time }}</p>
                    <p>{{ leg.Origin.name }}</p>
                    <p>{{ leg.Destination.name }}</p>
                    <p>{{ leg.Origin.track }}</p>
                    <p>{{ leg.Destination.track }}</p>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            value: {
                required: true
            },
            trip: {}
        },
        methods: {
            close() {
              this.$emit("input", !this.value);
            },
            getTravelTime(origin, dest) {
                let originTime = new Date(origin.date + "T" + origin.time + ":00");
                let destTime = new Date(dest.date + "T" + dest.time + ":00");
                var travelTime = (destTime.getTime() - originTime.getTime()) / 1000;
                travelTime /= 60;
                return Math.abs(Math.round(travelTime));
            }       
        }
    };
</script>


<style scoped>
    .modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    .container {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 50%; /* Could be more or less, depending on screen size */
    }

    /* The Close Button */
    .close {
        color: #aaa;
        float: right;
        font-size: 35px;
        font-weight: bold;
    }

    .close:hover, .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    .trip-leg {
        background-color: #c3e6f4;
        padding: 30px;
        margin: 20px 0;
        border-radius: 1em;
    }

    .leg-overview {
    margin-bottom: 20px;
    }

    .leg-overview h3 {
    padding: 10px;
    background: grey;
    margin-bottom: 10px;
    }

    .leg-details {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-row: auto auto;
    grid-column-gap: 5px;
    grid-row-gap: 10px;
    }
</style>