<template>
    <div class="block" :class="blockClass">
        <div class="block__text" v-html="prize.name"></div>
        <div class="block__btns">
            <template v-if="prize.isActive">
                <div v-if="!prize.isReceived" class="block__btn" @click="choosePrize">Получить</div>
                <div v-else class="block__btn-text" v-html="prize.receivedMessage"></div>
            </template>
            <template v-else>
                {{ disabledText }}
            </template>
        </div>
        <img class="block__img" :class="{ 'block__img--round': prize.isRound }" :src="img" />
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    import { declOfNum } from './../../helpers/functions';
    const store = useStore();
    const props = defineProps({
        prize: { type: Object, default: () => ({}) },
        index: { type: Number, default: 0 },
    });
    const img = computed(() => new URL(`/src/assets/img/${props.prize.img}`, import.meta.url).href);
    const blockClass = computed(() => {
        return {
            'block--disabled': !props.prize.isActive,
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
        if (props.prize.isActive) {
            store.commit('setPrizeIsReceived', props.index);
        }
    };
</script>

<style lang="scss" scoped>
    .block {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        min-height: 150px;
        padding: 20px;
        background-color: $gray-modal-inner;
        border-radius: 20px;
        font-size: 20px;
        box-sizing: border-box;
        overflow: hidden;

        &--disabled {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgb(95 95 95 / 70%);
                z-index: 1;
            }
        }

        &__btns {
            display: flex;
            gap: 20px;
            font-size: 16px;
        }

        &__btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            border-radius: 25px;
            color: $black;
            background-color: $yellow;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: $yellow-lighten;
            }

            &:active {
                background-color: $yellow-darken;
            }
        }

        &__btn-text {
            display: flex;
            align-items: center;
            justify-content: center;
            color: $white;
        }

        &__img {
            position: absolute;
            right: 10px;
            top: 10px;
            height: 130px;
            object-fit: contain;

            &--round {
                border-radius: 50%;
            }
        }
    }
</style>
