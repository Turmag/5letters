<template>
    <vue-final-modal v-model="store.isShowInfo" classes="modal" content-class="modal__content">
        <div class="modal__close" @click="closeModal">
            <MdiClose color="#fff" width="20" height="20" />
        </div>
        <div v-if="isRules" class="modal__back" @click="setIsRules(false)">
            &lt;
        </div>
        <div class="modal__content-inner">
            <template v-if="isRules">
                <div class="modal__title">
                    Правила игры «5 букв»
                </div>
                <div class="modal__text">
                    Каждый день что-то происходит! Если вы об этом не знали - знайте! Здесь можно
                    отгадать слова и получить самые необычные призы!
                </div>
                <div class="modal__text modal__text--mt">
                    Даётся 6 попыток. Но если не угадаете - ничего страшного! Итак, давайте
                    разберём, что вообще тут происходит. После отправки слова у букв будет меняться
                    цвет фона. Что это значит вообще?! А вот что!
                </div>
                <div class="modal__line" />
                <div class="modal__letters">
                    <Letter
                        v-for="(item, index) in lettersFirst"
                        :key="index"
                        :letter="item"
                        :index="index"
                    />
                </div>
                <div class="modal__text modal__text--mt modal__text--mb">
                    Шотуд? В этом слове буквы «В» и «А» на белом фоне - а это значит, что они
                    <b>есть</b> в загаданном слове, но находятся в других местах. Буквы же «Л», «И»
                    и «К» на сером фоне. Получается, в этом слове их нет вообще!
                </div>
                <div class="modal__letters">
                    <Letter
                        v-for="(item, index) in lettersSecond"
                        :key="index"
                        :letter="item"
                        :index="index"
                    />
                </div>
                <div class="modal__text modal__text--mt modal__text--mb">
                    Посмотрите-ка! Буквы «Т», «В», и «А» на жёлтом фоне. Это означает, что эти буквы
                    угаданы и находятся на <b>нужных</b> местах!
                </div>
                <div class="modal__letters">
                    <Letter
                        v-for="(item, index) in lettersThird"
                        :key="index"
                        :letter="item"
                        :index="index"
                    />
                </div>
                <div class="modal__text modal__text--mt modal__text--mb">
                    Когда слово угадано - все буквы будут на жёлтом фоне. И это здорово!
                </div>
                <div class="modal__line" />
                <div class="modal__text">
                    Так-так-так. Играйте в своё удовольствие, сколько захотите. И помните - мир
                    интереснее, чем вам кажется!
                </div>
                <div class="modal__text modal__text--mt">
                    По поводу буквы <b>ё</b>. Её в этой игре вводить нельзя. Хотя я являюсь
                    сторонником этой буквы, несмотря ни на что! Просто конкретно вот здесь вводить
                    её разрешение не даётся. Однако, если вы всё же захотите и дадите обратную связь
                    по этому поводу, я без сделаю разрешение на её ввод ;)
                </div>
                <div class="modal__text modal__text--mt">
                    Ах, да, и ещё. Если что-то не получается, вам не о чем переживать. Ведь можно
                    всегда попить чайку, скушать что-нибудь вкусное!
                </div>
                <div class="modal__text modal__text--mt">
                    По всем вопросам и предложениям пишите
                    <a href="https://t.me/Turmag" target="_blank">
                        мне в Telegram
                    </a> - отвечу!
                    Приятного времяпревровождения!
                </div>
            </template>
            <template v-else>
                <div class="modal__title">
                    Информация об игре
                </div>
                <div class="modal__text">
                    Эта игра практически плагиат игры «5 букв»
                    <a href="https://5bukv.tinkoff.ru/" target="_blank">из Тинькофф</a>. Но сделана
                    для того, чтоб во-первых, можно было угадать слова в большем количестве, а
                    во-вторых, просто по приколу! Наслаждайтесь!
                </div>
                <div class="modal__additional">
                    <Block
                        text="Правила"
                        icon="info"
                        note="игры «5 букв»"
                        @click="setIsRules(true)"
                    />
                    <Block
                        text="Ссылка"
                        icon="link"
                        note="focusinfo.ru/5letters"
                        is-copy
                    />
                </div>
                <div class="modal__additional">
                    <Block
                        text="Сохранить"
                        icon="save"
                        note="Сохранится в браузер"
                        is-save
                    />
                    <Block
                        text="Сбросить прогресс"
                        icon="reset"
                        note="Сбросится сохранение"
                        is-reset
                    />
                </div>
            </template>
        </div>
    </vue-final-modal>
</template>

<script setup lang="ts">
import Block from '@/components/modal/InfoBlock.vue';
import Letter from '@/components/letters/Letter.vue';
import { ref } from 'vue';
import { modalStore } from '@/store/modal';

const store = modalStore();
const isRules = ref(false);
const lettersFirst = [
    {
        letter: 'В',
        isAlmost: true,
    },
    {
        letter: 'А',
        isAlmost: true,
    },
    {
        letter: 'Л',
        isWrong: true,
    },
    {
        letter: 'И',
        isWrong: true,
    },
    {
        letter: 'К',
        isWrong: true,
    },
];
const lettersSecond = [
    {
        letter: 'Т',
        isRight: true,
    },
    {
        letter: 'Р',
        isWrong: true,
    },
    {
        letter: 'А',
        isWrong: true,
    },
    {
        letter: 'В',
        isRight: true,
    },
    {
        letter: 'А',
        isRight: true,
    },
];
const lettersThird = [
    {
        letter: 'Т',
        isRight: true,
    },
    {
        letter: 'Ы',
        isRight: true,
    },
    {
        letter: 'К',
        isRight: true,
    },
    {
        letter: 'В',
        isRight: true,
    },
    {
        letter: 'А',
        isRight: true,
    },
];

const closeModal = () => store.setIsShowInfo(false);
const setIsRules = (value: boolean) => isRules.value = value;
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

        &__back {
            position: absolute;
            top: 16px;
            left: 16px;
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

        &__text {
            &--mt {
                margin-top: 20px;
            }

            &--mb {
                margin-bottom: 20px;
            }
        }

        &__additional {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-top: 20px;
        }

        &__line {
            width: 100%;
            height: 1px;
            margin: 20px 0;
            background-color: $gray-modal-inner;
        }

        &__letters {
            display: flex;
            gap: 5px;
        }
    }
</style>
