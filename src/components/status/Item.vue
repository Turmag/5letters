<template>
    <div class="item-wrapper">
        <div class="item" :class="itemClass">
            <div class="item__inner">
                <template v-if="item.isGift">
                    <IconGift class="item__icon" width="30" height="30" />
                </template>
                <template v-else-if="item.isActive">
                    <IconCheck width="30" height="30" />
                </template>
                <template v-else>
                    {{ item.step }}
                </template>
            </div>
            <div v-if="item.isDecor" class="item__inner-decor" />
        </div>
        <div class="item__name">
            <template v-if="item.word">
                {{ item.word }}
            </template>
            <template v-else>
                <IconCircle
                    v-for="i in 5"
                    :key="i"
                    width="10"
                    height="10"
                    color="#414143"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconGift from '~icons/carbon/gift';
import IconCircle from '~icons/carbon/circle-solid';
import IconCheck from '~icons/mdi/check';
import { computed } from 'vue';
import { PanelItem } from '@/services/types';

interface Props {
    item: PanelItem;
}

const props = defineProps<Props>();

const itemClass = computed(() => {
    return { 'item--active': props.item.isActive };
});
</script>

<style lang="scss" scoped>
    .item-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .item {
        display: flex;
        align-items: center;

        &__inner {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: $gray-modal-inner;
            font-size: 25px;
            color: $gray-lighten;
        }

        &--active &__inner {
            background-color: $yellow;
            color: $black;
        }

        &__inner-decor {
            width: 35px;
            height: 7px;
            background-color: $gray-modal-inner;
        }

        &--active &__inner-decor {
            background-color: $yellow;
        }

        &__name {
            display: flex;
            align-items: center;
            gap: 3px;
            height: 25px;
            margin-left: 2px;
            font-size: 20px;
        }
    }
</style>
