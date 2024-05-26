<template>
    <div class="row">
        <div
            v-if="isShowAdditionalBtns"
            class="cancel"
            :class="{ 'cancel--active': isCancelAvailable }"
            @click="cancelLetters"
        >
            <IconClose :color="cancelColor" width="50" height="50" />
        </div>
        <template v-if="letters.length">
            <Field
                v-for="(item, i) in letters"
                ref="field"
                :key="i"
                :letter="item"
                :index="i"
                :is-animate="isAnimate"
            />
        </template>
        <template v-else>
            <Field
                v-for="item in 5"
                ref="field"
                :key="item"
                :index="item - 1"
                :is-active="isActive"
                @prev="prev"
                @next="next"
                @enter-focus="enterFocus"
            />
        </template>
        <div
            v-if="isShowAdditionalBtns"
            class="apply"
            :class="{ 'apply--active': isActiveCheck }"
            @click="checkTrialLocal"
        >
            <IconCheck :color="checkColor" width="50" height="50" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Field from '@/components/game/Field.vue';
import IconCheck from '~icons/mdi/check';
import IconClose from '~icons/mdi/close';
import { computed, ref } from 'vue';
import { mainStore } from '@/store/main';
import { Letter } from '@/services/types';

interface Props {
    isActive?: boolean;
    isAnimate?: boolean;
    letters?: Letter[];
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
    isAnimate: false,
    letters: () => [],
});

const emit = defineEmits(['enterFocus']);
const field = ref(null);
const store = mainStore();
const cancelColor = '#fff';

const isActiveCheck = computed(() => store.currentWord.join('').length === 5);
const checkColor = computed(() => (isActiveCheck.value ? '#1c1c1e' : '#fff'));
const isCancelAvailable = computed(() => store.currentWord.join('').length > 0);
const isShowAdditionalBtns = computed(() => props.isActive && !store.isWin && !store.isLost);

const focusField = index => {
    const fields = field.value;
    if (fields[index]) {
        fields[index].focusInput();
    }
};
const prev = index => focusField(index);
const next = index => focusField(index);
const enterFocus = () => {
    emit('enterFocus');
};
const checkTrialLocal = async () => {
    if (isActiveCheck.value) {
        store.checkTrialAction();
        if ((store.isLost || store.isWin) && store.searchWords.length) {
            const timeout = store.isWin ? 1600 : 0;
            await setTimeout(() => {
                document.querySelector('.game__btn').scrollIntoView({ behavior: 'smooth' });
            }, timeout);
            setTimeout(() => {
                document.querySelector('.game__btn').focus();
            }, 400);
        } else if ((store.isLost || store.isWin) && !store.searchWords.length) {
            const timeout = store.isWin ? 1600 : 0;
            await setTimeout(() => {
                store.setWordsEnded();
            }, timeout);
        } else {
            enterFocus();
        }
    }
};
const cancelLetters = () => {
    store.resetWord();
    const fields = field.value;
    fields.forEach(el => el.clearLetter());
    enterFocus();
};
defineExpose({ focusField });
</script>

<style lang="scss" scoped>
    .row {
        position: relative;
        display: flex;
        gap: 10px;
    }

    .apply {
        position: absolute;
        top: 1px;
        right: -110px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border: 1px solid $gray;
        background-color: $gray;
        transition: 0.3s;
        transition-property: background-color border-color;
        user-select: none;

        &--active {
            border-color: $yellow;
            background-color: $yellow;
            cursor: pointer;

            &:hover {
                border-color: $yellow-lighten;
                background-color: $yellow-lighten;
            }

            &:active {
                border-color: $yellow-darken;
                background-color: $yellow-darken;
            }
        }
    }

    .cancel {
        position: absolute;
        top: 1px;
        left: -110px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border: 1px solid $gray;
        background-color: $gray;
        transition: 0.3s;
        transition-property: background-color border-color;
        user-select: none;

        &--active {
            border-color: $red;
            background-color: $red;
            cursor: pointer;

            &:hover {
                border-color: $red-lighten;
                background-color: $red-lighten;
            }

            &:active {
                border-color: $red-darken;
                background-color: $red-darken;
            }
        }
    }
</style>
