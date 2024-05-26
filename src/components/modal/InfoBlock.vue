<template>
    <div class="block" @click="clickHandle">
        <div class="block__title">
            <div class="block__title-text">
                {{ text }}
            </div>
            <CarbonInformation
                v-if="icon === 'info'"
                width="20"
                height="20"
                color="#ffda2f"
            />
            <CarbonLink
                v-else-if="icon === 'link'"
                width="20"
                height="20"
                color="#ffda2f"
            />
            <CarbonSave
                v-else-if="icon === 'save'"
                width="20"
                height="20"
                color="#ffda2f"
            />
            <CarbonReset
                v-else-if="icon === 'reset'"
                width="20"
                height="20"
                color="#ffda2f"
            />
        </div>
        <div class="block__note">
            {{ noteText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { mainStore } from '@/store/main';
import { useLocalStorage } from '@vueuse/core';

interface Props {
    text: string;
    icon: string;
    note: string;
    isCopy?: boolean;
    isSave?: boolean;
    isReset?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isCopy: false,
    isSave: false,
    isReset: false,
});

const store = mainStore();
const isCopied = ref(false);
const isSaved = ref(false);
const isReseted = ref(false);
const isResetDone = ref(false);
const remainSeconds = ref(0);

let resetInterval: ReturnType<typeof setInterval>;
let resetTimeout: ReturnType<typeof setTimeout>;

const noteText = computed(() =>
    isCopied.value
        ? 'Скопировано'
        : isSaved.value
            ? 'Игра сохранена'
            : isReseted.value
                ? `Вы уверены? ${remainSeconds.value}`
                : isResetDone.value
                    ? 'Сохранение сброшено'
                    : props.note,
);

const clickHandle = () => {
    if (props.isCopy) {
        isCopied.value = true;
        const textArea = document.createElement('textarea');
        textArea.value = 'https://focusinfo.ru/5letters/';

        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        textArea.style.position = 'absolute';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setTimeout(() => (isCopied.value = false), 1500);
    }
    if (props.isSave) {
        isSaved.value = true;
        store.saveGame();
        setTimeout(() => (isSaved.value = false), 1500);
    }
    if (props.isReset && isReseted.value) {
        clearInterval(resetInterval);
        clearTimeout(resetTimeout);
        isReseted.value = false;
        isResetDone.value = true;
        setTimeout(() => (isResetDone.value = false), 1500);
        const fiveLettersData = useLocalStorage('5lettersData', '{}');
        fiveLettersData.value = JSON.stringify({});
    }
    if (props.isReset && !isReseted.value && !isResetDone.value) {
        isReseted.value = true;
        remainSeconds.value = 3;
        resetInterval = setInterval(() => (remainSeconds.value -= 1), 1000);
        resetTimeout = setTimeout(() => {
            isReseted.value = false;
            clearInterval(resetInterval);
        }, 3000);
    }
};
</script>

<style lang="scss" scoped>
    .block {
        box-sizing: border-box;
        width: calc(50% - 10px);
        padding: 10px 20px;
        border-radius: 20px;
        background-color: $gray-modal-inner;
        transition: 0.3s;
        transition-property: background-color border-color;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: $gray-modal-inner-lighten;
        }

        &:active {
            background-color: $gray-modal-inner-darken;
        }

        &__title {
            display: flex;
            align-items: center;
            gap: 10px;
            color: $white;
        }

        &__title-text {
            font-size: 18px;
        }

        &__note {
            color: #9a999e;
        }
    }
</style>
