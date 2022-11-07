<template>
    <div class="panel">
        <div class="panel__title" v-html="title"></div>
        <div class="panel__items">
            <Item v-for="(item, i) in state.panelItems" :key="i" :item="item" />
        </div>
    </div>
</template>

<script setup>
    import Item from './Item.vue';
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const state = store.state.main;

    const title = computed(() => 'Играйте <br />и получайте удовольствие!');
</script>

<style lang="scss" scoped>
    .panel {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 200px;
        padding: 30px;
        background-color: $gray-modal;
        border-radius: 20px 20px 0 0;
        box-sizing: border-box;

        &__title {
            color: $yellow;
            text-align: center;
            font-size: 30px;
            font-weight: bold;
            line-height: 35px;
        }

        &__items {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
    }
</style>
