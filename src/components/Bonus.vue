<template>
    <transition name="fade">
        <div v-if="state.isShowBonus" class="bonus-wrapper">
            <div class="bonus" :class="bonusClass">
                <div class="bonus__sphere"></div>
                <div class="bonus__sphere" :class="sphereClass" @click="hideModalBonus">
                    <transition name="fade">
                        <IconClose
                            v-if="!state.isBonusAnimate"
                            color="#1c1c1e"
                            width="40"
                            height="40"
                        />
                    </transition>
                </div>
                <div class="bonus__sphere"></div>
                <div class="bonus__sphere"></div>
                <div class="bonus__title">Поздравляю! Игра пройдена!</div>
                <div class="bonus__text">
                    Не забывайте о том, что всегда есть возможность получить замечательные призы
                    после угадывания слов.
                </div>
                <div class="bonus__text bonus__text--second">
                    Ах, да, ещё кое-что. Вы можете также играть и дальше, угадывая оставшиеся слова.
                    Кстати, вот вам ещё один приз!
                </div>
                <div class="bonus__prize">42</div>
            </div>
            <div class="bonus-wrapper__overlay" @click="hideModalBonus"></div>
        </div>
    </transition>
</template>

<script setup>
    import IconClose from '~icons/mdi/close';
    import { computed, watch } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const state = store.state.modal;
    let timeout = null;

    const bonusClass = computed(() => ({
        'bonus--animate': state.isBonusAnimate,
    }));
    const sphereClass = computed(() => ({
        'bonus__sphere--close': !state.isBonusAnimate,
    }));

    const hideModalBonus = () => {
        if (!state.isBonusAnimate) {
            store.commit('setIsShowBonus', false);
        }
    };

    watch(
        () => state.isShowBonus,
        val => {
            if (val) {
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '17px';
                if (state.isBonusAnimate && !timeout) {
                    timeout = setTimeout(() => store.commit('setIsBonusAnimate', false), 11000);
                }
            } else {
                document.body.style.overflow = null;
                document.body.style.paddingRight = null;
            }
        }
    );

    document.onkeydown = e => {
        if (e.keyCode === 27) {
            hideModalBonus();
        }
    };
</script>

<style lang="scss" scoped>
    .bonus-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
    }

    .bonus {
        position: relative;
        width: 500px;
        height: 500px;
        padding: 20px;
        background-color: $gray-modal;
        box-shadow: 0 4px 32px rgb(255 255 255 / 10%);
        box-sizing: border-box;
        z-index: 1;

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
            color: $yellow;
            font-size: 120px;
            font-weight: bold;
            line-height: 200px;
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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            top: 0;
            left: 0;
            transform: translate3d(-50%, -50%, 0);
            background-color: $yellow;
            border-radius: 50%;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);

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
            animation-fill-mode: forwards;
            animation-duration: 4s;
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
