<template>
    <div :class="$style.itemWrapper">
        <div :class="[$style.item, itemClass]">
            <div :class="$style.inner">
                <CarbonGift
                    v-if="item.isGift"
                    :class="$style.icon"
                    width="30"
                    height="30"
                />
                <MdiCheck v-else-if="item.isActive" width="30" height="30" />
                <template v-else>
                    {{ item.step }}
                </template>
            </div>
            <div v-if="item.isDecor" :class="$style.innerDecor" />
        </div>
        <div :class="$style.name">
            <template v-if="item.word">
                {{ item.word }}
            </template>
            <template v-else>
                <CarbonCircleSolid
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
import { computed, useCssModule } from 'vue';
import type { IPanelItem } from '@/shared/types';

interface IProps {
    item: IPanelItem;
}

const props = defineProps<IProps>();
const $style = useCssModule();

const itemClass = computed(() => {
    return { [$style.active]: props.item.isActive };
});
</script>

<style lang="scss" module>
    .itemWrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .item {
        display: flex;
        align-items: center;
    }

    .inner {
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

    .active .inner {
        background-color: $yellow;
        color: $black;
    }

    .innerDecor {
        width: 35px;
        height: 7px;
        background-color: $gray-modal-inner;
    }

    .active .innerDecor {
        background-color: $yellow;
    }

    .name {
        display: flex;
        align-items: center;
        gap: 3px;
        height: 25px;
        margin-left: 2px;
        font-size: 20px;
    }

    .icon {
        cursor: pointer;
        user-select: none;
    }
</style>
