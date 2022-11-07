<template>
    <div class="info">
        <IconGift class="info__icon" width="30" height="30" @click="showModalPrize" />
        <IconInfo class="info__icon" width="30" height="30" @click="showModalInfo" />
        <IconBonus
            v-if="stateMain.isGameFinished"
            class="info__icon"
            width="30"
            height="30"
            @click="showModalBonus"
        />
    </div>
</template>

<script setup>
    import IconInfo from '~icons/carbon/information';
    import IconGift from '~icons/carbon/gift';
    import IconBonus from '~icons/carbon/badge';
    import { useStore } from 'vuex';
    const store = useStore();
    const stateMain = store.state.main;
    const showModalPrize = () => store.commit('setIsShowPrize', true);
    const showModalInfo = () => store.commit('setIsShowInfo', true);
    const showModalBonus = () => store.commit('setIsShowBonus', true);
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
