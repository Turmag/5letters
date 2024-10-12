<template>
    <div :class="$style.panel">
        <div :class="$style.title" v-html="title" />
        <div :class="$style.items">
            <Item v-for="(item, i) in store.panelItems" :key="i" :item="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Item from '@/components/status/Item.vue';
import { mainStore } from '@/store/main';

const store = mainStore();

const title = computed(() => 'Играйте <br />и получайте удовольствие!');
</script>

<style lang="scss" module>
    .panel {
        position: fixed;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        min-height: 200px;
        padding: 30px;
        border-radius: 20px 20px 0 0;
        background-color: $gray-modal;
    }

    .title {
        text-align: center;
        font-size: 30px;
        line-height: 35px;
        color: $yellow;
        font-weight: bold;
    }

    .items {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
