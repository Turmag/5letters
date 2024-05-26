<template>
    <div class="panel">
        <div class="panel__title" v-html="title" />
        <div class="panel__items">
            <Item v-for="(item, i) in store.panelItems" :key="i" :item="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Item from '@/components/status/Item.vue';
import { computed } from 'vue';
import { mainStore } from '@/store/main';

const store = mainStore();

const title = computed(() => 'Играйте <br />и получайте удовольствие!');
</script>

<style lang="scss" scoped>
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

        &__title {
            text-align: center;
            font-size: 30px;
            line-height: 35px;
            color: $yellow;
            font-weight: bold;
        }

        &__items {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
    }
</style>
