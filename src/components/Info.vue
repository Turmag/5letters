<template>
    <div class="info">
        <IconGift
            class="info__icon"
            width="30"
            height="30"
            @click="showModalPrize"
        />
        <IconInfo
            class="info__icon"
            width="30"
            height="30"
            @click="showModalInfo"
        />
        <IconBonus
            v-if="store.isGameFinished"
            class="info__icon"
            width="30"
            height="30"
            @click="showModalBonus"
        />
    </div>
</template>

<script setup lang="ts">
import IconInfo from '~icons/carbon/information';
import IconGift from '~icons/carbon/gift';
import IconBonus from '~icons/carbon/badge';
import { modalStore } from '@/store/modal';

const store = modalStore();
const showModalPrize = () => store.setIsShowPrize(true);
const showModalInfo = () => store.setIsShowInfo(true);
const showModalBonus = () => store.setIsShowBonus(true);
</script>

<style lang="scss" scoped>
    .info {
        display: flex;
        align-items: center;
        gap: 5px;

        &__icon {
            cursor: pointer;
            user-select: none;
        }
    }
</style>
