<template>
    <div :class="$style.info">
        <CarbonGift
            :class="$style.icon"
            width="30"
            height="30"
            @click="showModalPrize"
        />
        <CarbonInformation
            :class="$style.icon"
            width="30"
            height="30"
            @click="showModalInfo"
        />
        <CarbonBadge
            v-if="store.isGameFinished"
            :class="$style.icon"
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

<style lang="scss" module>
    .info {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .icon {
        cursor: pointer;
        user-select: none;
    }
</style>
