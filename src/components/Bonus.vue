<template>
    <transition name="fade">
        <div v-if="store.isShowBonus" class="bonus-wrapper">
            <div class="bonus" :class="bonusClass">
                <div class="bonus__sphere" />
                <div class="bonus__sphere" :class="sphereClass" @click="hideModalBonus">
                    <transition name="fade">
                        <MdiClose
                            v-if="!store.isBonusAnimate"
                            color="#1c1c1e"
                            width="40"
                            height="40"
                        />
                    </transition>
                </div>
                <div class="bonus__sphere" />
                <div class="bonus__sphere" />
                <div class="bonus__title">
                    Поздравляю! Игра пройдена!
                </div>
                <div class="bonus__text">
                    Не забывайте о том, что всегда есть возможность получить замечательные призы
                    после угадывания слов.
                </div>
                <div class="bonus__text bonus__text--second">
                    Ах, да, ещё кое-что. Вы можете также играть и дальше, угадывая оставшиеся слова.
                    Кстати, вот вам ещё один приз!
                </div>
                <div class="bonus__prize">
                    42
                </div>
            </div>
            <div class="bonus-wrapper__overlay" @click="hideModalBonus" />
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { modalStore } from '@/store/modal';

const store = modalStore();
let timeout: null | ReturnType<typeof setTimeout> = null;

const bonusClass = computed(() => ({ 'bonus--animate': store.isBonusAnimate }));
const sphereClass = computed(() => ({ 'bonus__sphere--close': !store.isBonusAnimate }));

const hideModalBonus = () => {
    if (!store.isBonusAnimate) {
        store.setIsShowBonus(false);
    }
};

watch(
    () => store.isShowBonus,
    val => {
        if (val) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '17px';
            if (store.isBonusAnimate && !timeout) {
                timeout = setTimeout(() => store.setIsBonusAnimate(false), 11000);
            }
        } else {
            document.body.style.overflow = 'none';
            document.body.style.paddingRight = '0';
        }
    },
);

document.onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') hideModalBonus();
};
</script>

<style lang="scss" scoped>
    .bonus-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(0 0 0 / 50%);
        }
    }

    .bonus {
        position: relative;
        z-index: 1;
        box-sizing: border-box;
        width: 500px;
        height: 500px;
        padding: 20px;
        background-color: $gray-modal;
        box-shadow: 0 4px 32px rgb(255 255 255 / 10%);

        &__title {
            text-align: center;
            font-size: 25px;
            color: $yellow;
        }

        &--animate &__title {
            opacity: 0;
            animation-name: appear;
            animation-duration: 1s;
            animation-delay: 4.4s;
            animation-fill-mode: forwards;
        }

        &__text {
            margin-top: 20px;
        }

        &--animate &__text {
            opacity: 0;
            animation-name: appear;
            animation-duration: 1s;
            animation-delay: 5.5s;
            animation-fill-mode: forwards;

            &--second {
                animation-delay: 7s;
            }
        }

        &__prize {
            margin-top: 20px;
            text-align: center;
            font-size: 120px;
            line-height: 200px;
            color: $yellow;
            font-weight: bold;
            user-select: none;
        }

        &--animate &__prize {
            opacity: 0;
            animation-name: appear;
            animation-duration: 1s;
            animation-delay: 10s;
            animation-fill-mode: forwards;
        }

        &__sphere {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: $yellow;
            transform: translate3d(-50%, -50%, 0);
            box-shadow: 5px 5px 15px rgb(0 0 0 / 50%);

            &:nth-child(2) {
                top: 0;
                left: 100%;
            }

            &:nth-child(3) {
                top: 100%;
                left: 100%;
            }

            &:nth-child(4) {
                top: 100%;
                left: 0;
            }

            &--close {
                cursor: pointer;
                user-select: none;

                &:hover {
                    background-color: $yellow-lighten;
                }

                &:active {
                    background-color: $yellow-darken;
                }
            }
        }

        &--animate &__sphere {
            top: 0;
            left: 0;
            animation-duration: 4s;
            animation-fill-mode: forwards;
            animation-iteration-count: 1;
            animation-timing-function: ease-in-out;

            &:nth-child(1) {
                animation-name: bonus-animate-1;
                animation-delay: 0.4s;
            }

            &:nth-child(2) {
                animation-name: bonus-animate-2;
                animation-delay: 0.3s;
            }

            &:nth-child(3) {
                animation-name: bonus-animate-3;
                animation-delay: 0.2s;
            }

            &:nth-child(4) {
                animation-name: bonus-animate-4;
                animation-delay: 0.1s;
            }
        }
    }

    @keyframes bonus-animate-1 {
        0% {
            top: 0;
            left: 0;
        }

        25% {
            top: 0;
            left: 100%;
        }

        100% {
            top: 0;
            left: 100%;
        }
    }

    @keyframes bonus-animate-2 {
        0% {
            top: 0;
            left: 0;
        }

        25% {
            top: 0;
            left: 100%;
        }

        50% {
            top: 100%;
            left: 100%;
        }

        100% {
            top: 100%;
            left: 100%;
        }
    }

    @keyframes bonus-animate-3 {
        0% {
            top: 0;
            left: 0;
        }

        25% {
            top: 0;
            left: 100%;
        }

        50% {
            top: 100%;
            left: 100%;
        }

        75% {
            top: 100%;
            left: 0;
        }

        100% {
            top: 100%;
            left: 0;
        }
    }

    @keyframes bonus-animate-4 {
        0% {
            top: 0;
            left: 0;
        }

        25% {
            top: 0;
            left: 100%;
        }

        50% {
            top: 100%;
            left: 100%;
        }

        75% {
            top: 100%;
            left: 0;
        }

        100% {
            top: 0;
            left: 0;
        }
    }

    @keyframes appear {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
