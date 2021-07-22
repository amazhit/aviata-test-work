<template>
  <div class="flight" @click="handleItemClick">
    <div class="flight__main">
      <div class="flight__info">
        <div class="flight__logo">
          <img :src="getImageUrl(data.validating_carrier)" alt="" />
          <h2>
            {{ data.itineraries[0][0].carrier_name }}
          </h2>
        </div>
        <div class="flight__duration">
          <div class="flight__time">
            <p>{{ departure.date }}, {{ departure.weekDay }}</p>
            <strong>{{ departure.time }}</strong>
          </div>
          <div class="flight__directions">
            <div class="flight__timeline">
              <p>{{ segments[0].origin_code }}</p>
              <p class="flight__timeline-duration">
                {{ getDuration(data.best_time) }}
              </p>
              <p>{{ segments[segments.length - 1].dest_code }}</p>
            </div>
            <div class="flight__dots">
              <div></div>
              <div v-if="segments.length > 1"></div>
              <div></div>
            </div>
            <div class="flight__transit">
              <p>
                {{
                  segments.length > 1
                    ? `через ${segments[1].origin}, ${getDuration(
                        data.itineraries[0][0].layovers[0]
                      )}`
                    : ""
                }}
              </p>
            </div>
          </div>
          <div class="flight__time">
            <p>{{ arrival.date }}, {{ arrival.weekDay }}</p>
            <strong>{{ arrival.time }}</strong>
          </div>
        </div>
      </div>
      <div class="flight__details">
        <a>Детали перелета</a>
        <a>Условия тарифа</a>
        <div class="flight__type">
          <img v-if="data.refundable" src="@/assets/cancelable.svg" alt="" />
          <img v-else src="@/assets/uncancelable.svg" alt="" />
          <p>{{ data.refundable ? "возвратный" : "невозвратный" }}</p>
        </div>
      </div>
    </div>
    <div class="flight__purchase">
      <h3 class="flight__price">{{ data.price }} <span>₸</span></h3>
      <button class="flight__btn">Выбрать</button>
      <p>Цена за всех пассажиров</p>
      <div class="flight__services">
        <p>Нет багажа</p>
        <button>+ Добавить багаж</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Flight",
  props: {
    data: Object,
  },
  data() {
    return {
      segments: [],
      arrival: {
        date: "",
        time: "",
      },
      departure: {
        date: "",
        time: "",
      },
    };
  },
  methods: {
    getImageUrl(code) {
      return `https://aviata.kz/static/airline-logos/80x80/${code}.png`;
    },
    getDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
      return {
        date: new Date(date).toLocaleDateString("ru-RU", options).substr(0, 6),
        weekDay: days[new Date(date).getDay()],
        time: new Date(date).toLocaleTimeString().substr(0, 5),
      };
    },
    getDuration(seconds) {
      const totalMinutes = seconds / 60;

      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes - hours * 60);

      if (hours) {
        return `${hours} ч ${minutes} м`;
      } else {
        return ``;
      }
    },
  },
  created() {
    this.departure = this.getDate(this.data?.itineraries[0][0].dep_date);
    this.arrival = this.getDate(this.data?.itineraries[0][0].arr_date);
    this.segments = this.data.itineraries[0][0].segments;
  },
};
</script>

<style scoped lang="sass">
.flight
    border-radius: $radius-sm
    height: 168px
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15)
    margin-bottom: 12px
    background-color: white
    display: grid
    grid-template-columns: 1fr 240px
    @include breakpoint(desktop)
        grid-template-columns: 600px 240px
    @include breakpoint(laptop)
        grid-template-columns: 500px 200px
    &__info
        display: flex
    &__purchase
        padding: 12px 20px
        background-color: #F5F5F5
        & > p
            text-align: center
            font-size: 12px
            color: $dark
    &__main
        padding: 40px 40px 15px
        display: flex
        flex-direction: column
        justify-content: space-between
    &__duration
        display: flex
        justify-content: space-between
        width: 100%
    &__timeline
        display: flex
        justify-content: space-between
        font-size: 10px
        width: 150px
        & p
          color: $gray
        &-duration
          color: $deep-dark !important
          font-size: 12px
    &__dots
        border-bottom: 1px solid $gray
        display: flex
        justify-content: space-between
        & > div
          width: 5px
          height: 5px
          border-radius: 50%
          border: 1px solid $gray
          top: 3px
          position: relative
          background-color: white
    &__transit
        font-size: 12px
        text-align: center
        margin-top: 5px
        & > p
            color: $yellow
    &__logo
        display: flex
        align-items: center
        width: 250px
        // По дизайну высота логотипа 20px, я сделал 40px,
        // так как при 20px логотипы некоторых авиалиний отображаются
        // слишком мелко (из-за лишнего white-space на исходной картинке)
        height: 40px
        & > img
            max-width: 100%
            max-height: 100%
            margin-right: 20px
        & > h2
            font-size: 14px
            font-weight: 600
    &__details
        display: flex
        align-items: center
        & > a
            margin-right: 23px
            font-size: 12px
            color: $blue
            border-bottom: 1px dashed $blue
            line-height: 22px
            cursor: pointer
            transition: .3s
            &:hover
                color: lighten($blue, 20)
                border-bottom: 1px dashed lighten($blue, 20)
    &__type
        color: $dark
        font-size: 12px
        display: flex
        align-items: center
        margin-left: 23px
        & > img
            margin-right: 7px
    &__time
        text-align: center
        & > p
            font-size: 12px
        & > strong
            font-size: 24px
            font-weight: 600
    &__price
        font-size: 26px
        text-align: center
        font-weight: 400
        font-family: Arial, sans-serif
        & > span
            font-size: 18px
    &__services
        display: flex
        align-items: center
        font-size: 12px
        justify-content: space-between
        margin-top: 15px
        & > button
            background-color: $light-blue
            border: none
            width: 128px
            height: 24px
            color: $blue
            border-radius: 2px
            font-weight: 600
            cursor: pointer
            font-size: 12px
            transition: .3s
            &:hover
                background-color: $blue
                color: $light-blue
    &__btn
        display: block
        width: 200px
        height: 40px
        background-color: $primary
        border: none
        color: white
        margin: 10px auto
        border-radius: $radius-sm
        font-size: 18px
        font-weight: 700
        cursor: pointer
        transition: .3s
        @include breakpoint(laptop)
            width: 100%
            font-size: 14px
            height: 30px
        &:hover
            background-color: lighten($primary, 5 )
</style>
