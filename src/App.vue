<template>
  <div class="container">
    <div class="tickets">
      <aside class="tickets__filters">
        <Filter
          :multiple="false"
          title="Опции тарифа"
          type="options"
          :data="options"
          :onFilterChange="onFilterChange"
        />
        <Filter
          :multiple="true"
          title="Авиакомпании"
          type="airlines"
          :data="airlines"
          :onFilterChange="onFilterChange"
        />
      </aside>
      <div class="tickets__content">
        <Flight v-for:="flight in sortedFlights" :data="flight" />
        <p v-if="sortedFlights.length === 0">Билеты не найдены...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Filter from "./components/Filter.vue";
import Flight from "./components/Flight.vue";
import { fetchData } from "@/services/fetchers";

export default {
  name: "App",
  components: {
    Filter,
    Flight,
  },
  data() {
    return {
      airlines: [],
      flights: [],
      filters: {
        airlines: [],
        options: [],
      },
      options: {
        has_meta: "Только прямые",
        bonus_usage: "Только с багажом",
        refundable: "Только возвратные",
      },
    };
  },
  methods: {
    onFilterChange(type, filters) {
      this.filters[type] = filters;
    },
  },
  computed: {
    sortedFlights() {
      const { airlines, options } = this.filters;

      let data = [...this.flights];

      if (airlines.length > 0) {
        data = this.flights.filter((item) =>
          airlines.includes(item.validating_carrier)
        );
      }

      if (options.length > 0) {
        data = data.filter((item) => item[options[0]]);
      }

      return data;
    },
  },
  async created() {
    try {
      const { airlines, flights } = await fetchData();

      this.airlines = airlines;
      this.flights = flights;
    } catch (error) {
      console.log("Something went wrong...", error);
    }
  },
};
</script>

<style lang="sass">

.tickets
  display: flex
  flex-direction: row
  padding-top: 100px
  position: relative
  &__filters
    width: 300px
    margin-right: 20px
  &__content

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  background-color: #E1E1E1
  min-height: 100vh
  @include breakpoint(tablet)
    padding: 0px 20px

.container
  max-width: 1140px
  margin: 0 auto
  @include breakpoint(mobile)
    max-width: 100%
  @include breakpoint(tablet)
    max-width: 700px
  @include breakpoint(laptop)
    max-width: 900px
  @include breakpoint(desktop)
    max-width: 1140px

ul
  list-style-type: none

*
  margin: 0
  padding: 0
  box-sizing: border-box
  color: $deep-dark
</style>
