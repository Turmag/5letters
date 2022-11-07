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
                ref="field"
                v-for="(item, i) in letters"
                :key="i"
                :letter="item"
                :index="i"
                :isAnimate="isAnimate"
            />
        </template>
        <template v-else>
            <Field
                ref="field"
                @prev="prev"
                @next="next"
                @enterFocus="enterFocus"
                v-for="item in 5"
                :key="item"
                :index="item - 1"
                :isActive="isActive"
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

<script setup>
    import Field from './Field.vue';
    import IconCheck from '~icons/mdi/check';
    import IconClose from '~icons/mdi/close';
    import { computed, ref } from 'vue';
    import { useStore } from 'vuex';
    const props = defineProps({
        isActive: { type: Boolean, default: false },
        isAnimate: { type: Boolean, default: false },
        letters: { type: Array, default: [] },
    });
    const emit = defineEmits(['enterFocus']);
    const field = ref(null);
    const store = useStore();
    const state = store.state.main;
    const cancelColor = '#fff';

    const isActiveCheck = computed(() => state.currentWord.join('').length === 5);
    const checkColor = computed(() => (isActiveCheck.value ? '#1c1c1e' : '#fff'));
    const isCancelAvailable = computed(() => state.currentWord.join('').length > 0);
    const isShowAdditionalBtns = computed(() => props.isActive && !state.isWin && !state.isLost);

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
            store.dispatch('checkTrialAction');
            if ((state.isLost || state.isWin) && state.searchWords.length) {
                const timeout = state.isWin ? 1600 : 0;
                await setTimeout(() => {
                    document.querySelector('.game__btn').scrollIntoView({ behavior: 'smooth' });
                }, timeout);
                setTimeout(() => {
                    document.querySelector('.game__btn').focus();
                }, 400);
            } else if ((state.isLost || state.isWin) && !state.searchWords.length) {
                const timeout = state.isWin ? 1600 : 0;
                await setTimeout(() => {
                    store.dispatch('setWordsEnded');
                }, timeout);
            } else {
                enterFocus();
            }
        }
    };
    const cancelLetters = () => {
        store.commit('resetWord');
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
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: $gray;
        border: 1px solid $gray;
        user-select: none;
        transition: 0.3s;
        transition-property: background-color border-color;

        &--active {
            background-color: $yellow;
            border-color: $yellow;
            cursor: pointer;

            &:hover {
                background-color: $yellow-lighten;
                border-color: $yellow-lighten;
            }

            &:active {
                background-color: $yellow-darken;
                border-color: $yellow-darken;
            }
        }
    }

    .cancel {
        position: absolute;
        top: 1px;
        left: -110px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: $gray;
        border: 1px solid $gray;
        user-select: none;
        transition: 0.3s;
        transition-property: background-color border-color;

        &--active {
            background-color: $red;
            border-color: $red;
            cursor: pointer;

            &:hover {
                background-color: $red-lighten;
                border-color: $red-lighten;
            }

            &:active {
                background-color: $red-darken;
                border-color: $red-darken;
            }
        }
    }
</style>
