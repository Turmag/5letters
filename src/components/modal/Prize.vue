<template>
    <vue-final-modal v-model="store.isShowPrize" classes="modal" content-class="modal__content">
        <div class="modal__close" @click="closeModal">
            <IconClose color="#fff" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div class="modal__title">
                Призы
            </div>
            <div class="modal__blocks">
                <Block
                    v-for="(prize, i) in store.prizes"
                    :key="i"
                    :prize="prize"
                    :index="i"
                />
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup lang="ts">
import IconClose from '~icons/mdi/close';
import Block from '@/components/modal/PrizeBlock.vue';
import { modalStore } from '@/store/modal';

const store = modalStore();

const closeModal = () => store.setIsShowPrize(false);
</script>

<style lang="scss">
    .modal {
        display: flex;
        align-items: center;
        justify-content: center;

        &__content {
            position: relative;
            overflow: hidden;
            width: 550px;
            min-height: 200px;
            max-height: 500px;
            padding: 60px 16px 16px;
            border-radius: 20px;
            background-color: $gray-modal;
            color: $white;
            box-shadow: 0 4px 32px rgb(255 255 255 / 10%);
        }

        &__content-inner {
            overflow: auto;
            height: 100%;
            max-height: 500px;
            padding-right: 16px;

            &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 8px;
                background: #fff;
            }

            &::-webkit-scrollbar-track {
                border-radius: 8px;
                background: $gray-modal-inner;
            }
        }

        &__close {
            position: absolute;
            top: 16px;
            right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: $gray-modal-inner;
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
            margin-bottom: 20px;
            text-align: center;
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
