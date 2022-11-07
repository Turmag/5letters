<template>
    <div class="block" @click="clickHandle">
        <div class="block__title">
            <div class="block__title-text">{{ text }}</div>
            <IconInfo v-if="icon === 'info'" width="20" height="20" color="#ffda2f" />
            <IconLink v-else-if="icon === 'link'" width="20" height="20" color="#ffda2f" />
            <IconSave v-else-if="icon === 'save'" width="20" height="20" color="#ffda2f" />
            <IconReset v-else-if="icon === 'reset'" width="20" height="20" color="#ffda2f" />
        </div>
        <div class="block__note">{{ noteText }}</div>
    </div>
</template>

<script setup>
    import IconInfo from '~icons/carbon/information';
    import IconLink from '~icons/carbon/link';
    import IconSave from '~icons/carbon/save';
    import IconReset from '~icons/carbon/reset';
    import { setStorage } from './../../helpers/functions';
    import { ref, computed } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();

    const props = defineProps({
        text: { type: String, default: '' },
        icon: { type: String, default: '' },
        note: { type: String, default: '' },
        isCopy: { type: Boolean, default: false },
        isSave: { type: Boolean, default: false },
        isReset: { type: Boolean, default: false },
    });

    let isCopied = ref(false);
    let isSaved = ref(false);
    let isReseted = ref(false);
    let isResetDone = ref(false);
    let remainSeconds = ref(0);
    let resetInterval = null;
    let resetTimeout = null;

    const noteText = computed(() =>
        isCopied.value
            ? 'Скопировано'
            : isSaved.value
            ? 'Игра сохранена'
            : isReseted.value
            ? `Вы уверены? ${remainSeconds.value}`
            : isResetDone.value
            ? 'Сохранение сброшено'
            : props.note
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
            store.dispatch('saveGame');
            setTimeout(() => (isSaved.value = false), 1500);
        }
        if (props.isReset && isReseted.value) {
            clearInterval(resetInterval);
            clearTimeout(resetTimeout);
            isReseted.value = false;
            isResetDone.value = true;
            setTimeout(() => (isResetDone.value = false), 1500);
            setStorage({
                data: {},
                key: '5lettersData',
            });
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
        width: calc(50% - 10px);
        padding: 10px 20px;
        border-radius: 20px;
        background-color: $gray-modal-inner;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
        transition: 0.3s;
        transition-property: background-color border-color;

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
