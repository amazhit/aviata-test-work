<template>
  <div class="filter">
    <div class="filter__header">
      <h4>{{ title }}</h4>
      <div
        v-if="filters.length > 0"
        @click="handleReset"
        class="filter__reset"
      ></div>
    </div>
    <ul>
      <FilterItem
        v-for:="(item, key, index) in data"
        :onItemClick="onItemClick"
        :id="key"
        :title="item"
        :checked="checked(key)"
        key="key"
      />
    </ul>
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";

export default {
  name: "Filter",
  components: {
    FilterItem,
  },
  props: {
    title: String,
    data: Object,
    multiple: Boolean,
    onFilterChange: Function,
    type: String,
  },
  data() {
    return {
      filters: [],
    };
  },
  methods: {
    onItemClick(id) {
      if (this.filters.includes(id)) {
        this.filters = this.filters.filter((item) => item !== id);
      } else {
        if (this.multiple) {
          this.filters.push(id);
        } else {
          this.filters = [id];
        }
      }
    },
    checked(id) {
      return this.filters.includes(id);
    },
    handleReset() {
      this.filters = [];
    },
  },
  updated() {
    this.$nextTick(function() {
      this.onFilterChange(this.type, this.filters);
    });
  },
};
</script>

<style scoped lang="sass">
.filter
  padding: 12px
  margin-bottom: 12px
  background-color: $light-gray
  border-radius: $radius-sm
  & > h4
    font-size: 14px
    font-weight: 700
    margin-bottom: 22px
  &__header
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 16px
  &__reset
    width: 20px
    height: 20px
    background: url('../assets/close-filter.svg') no-repeat
    cursor: pointer
    transition: .3s
    &:hover
      background: url('../assets/close-filter-hover.svg') no-repeat
</style>
