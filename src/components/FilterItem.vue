<template>
  <li @click="onItemClick(id)">
    <img v-if="checked" src="@/assets/checkbox_active.svg" alt="" />
    <img v-else src="@/assets/checkbox_empty.svg" alt="" />
    <h6>{{ title }}</h6>
  </li>
</template>

<script>
export default {
  name: "FilterItem",
  props: {
    checked: Boolean,
    title: String,
    onItemClick: Function,
    id: String,
  },
};
</script>

<style scoped lang="sass">
li
    display: flex
    align-items: center
    margin-bottom: 10px
    cursor: pointer
    & > img
        margin-right: 5px
        user-select: none
    & > h6
        font-weight: 400
        font-size: 12px
        user-select: none
</style>
