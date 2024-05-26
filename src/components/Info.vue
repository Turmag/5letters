<template>
    <div class="info">
        <CarbonGift
            class="info__icon"
            width="30"
            height="30"
            @click="showModalPrize"
        />
        <CarbonInformation
            class="info__icon"
            width="30"
            height="30"
            @click="showModalInfo"
        />
        <CarbonBadge
            v-if="store.isGameFinished"
            class="info__icon"
            width="30"
            height="30"
            @click="showModalBonus"
        />
    </div>
</template>

<script setup lang="ts">
import { modalStore } from '@/store/modal';
import { mainStore } from '@/store/main';

const store = mainStore();
const storeModal = modalStore();
const showModalPrize = () => storeModal.setIsShowPrize(true);
const showModalInfo = () => storeModal.setIsShowInfo(true);
const showModalBonus = () => storeModal.setIsShowBonus(true);
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
