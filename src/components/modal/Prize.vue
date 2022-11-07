<template>
    <vue-final-modal v-model="state.isShowPrize" classes="modal" content-class="modal__content">
        <div class="modal__close" @click="closeModal">
            <IconClose color="#fff" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div class="modal__title">Призы</div>
            <div class="modal__blocks">
                <Block v-for="(prize, i) in state.prizes" :key="i" :prize="prize" :index="i" />
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup>
    import IconClose from '~icons/mdi/close';
    import Block from './PrizeBlock.vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const state = store.state.modal;

    const closeModal = () => store.commit('setIsShowPrize', false);
</script>

<style lang="scss">
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;

        &__content {
            position: relative;
            width: 550px;
            min-height: 200px;
            max-height: 500px;
            padding: 60px 16px 16px 16px;
            overflow: hidden;
            background-color: $gray-modal;
            color: $white;
            border-radius: 20px;
            box-shadow: 0 4px 32px rgb(255 255 255 / 10%);
        }

        &__content-inner {
            height: 100%;
            max-height: 500px;
            padding-right: 16px;
            overflow: auto;

            &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 8px;
                background: #ffffff;
            }

            &::-webkit-scrollbar-track {
                border-radius: 8px;
                background: $gray-modal-inner;
            }
        }

        &__close {
            position: absolute;
            right: 16px;
            top: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background-color: $gray-modal-inner;
            border-radius: 50%;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: $gray-modal-inner-lighten;
            }

            &:active {
                background-color: $gray-modal-inner-darken;
            }
        }

        &__title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 20px;
            color: $yellow;
        }

        &__blocks {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
</style>
