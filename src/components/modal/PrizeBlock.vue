<template>
    <div :class="blockClass">
        <div :class="$style.text" v-html="prize.name" />
        <div :class="$style.btns">
            <template v-if="prize.isActive">
                <div
                    v-if="!prize.isReceived"
                    :class="$style.btn"
                    @click="choosePrize"
                >
                    Получить
                </div>
                <div
                    v-else
                    :class="$style.btnText"
                    v-html="prize.receivedMessage"
                />
            </template>
            <template v-else>
                {{ disabledText }}
            </template>
        </div>
        <img
            :class="[$style.img, prize.isRound && $style.imgRound]"
            :src="img"
        >
    </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { modalStore } from '@/store/modal';
import { declOfNum } from '@/assets/js/functions';
import { Prize } from '@/services/types';

interface Props {
    prize: Prize;
    index: number;
}

const props = defineProps<Props>();

const store = modalStore();
const $style = useCssModule();
const img = computed(() => new URL(`/src/assets/img/${props.prize.img}`, import.meta.url).href);
const blockClass = computed(() => {
    return {
        [$style.block]: true,
        [$style.blockDisabled]: !props.prize.isActive, 
    };
});
const disabledText = computed(() => {
    return `Отгадайте ещё ${props.prize.wordsToOpen} ${declOfNum(props.prize.wordsToOpen, [
        'слово',
        'слова',
        'слов',
    ])}`;
});
const choosePrize = () => {
    if (props.prize.isActive) store.setPrizeIsReceived(props.index);
};
</script>

<style lang="scss" module>
    .block {
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 150px;
        padding: 20px;
        border-radius: 20px;
        background-color: $gray-modal-inner;
        font-size: 20px;
        flex-direction: column;

        &.blockDisabled::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: rgb(95 95 95 / 70%);
        }
    }

    .btns {
        display: flex;
        gap: 20px;
        font-size: 16px;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        border-radius: 25px;
        background-color: $yellow;
        color: $black;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: $yellow-lighten;
        }

        &:active {
            background-color: $yellow-darken;
        }
    }

    .btnText {
        display: flex;
        align-items: center;
        justify-content: center;
        color: $white;
    }

    .img {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 130px;
        object-fit: contain;

        &.imgRound {
            border-radius: 50%;
        }
    }
</style>
