<template>
    <div :class="$style.letters">
        <Letter
            v-for="(item, index) in letters"
            :key="index"
            :letter="item"
            :index="index"
            is-animate
        />
    </div>
</template>

<script setup lang="ts">
import Letter from '@/components/letters/Letter.vue';

const letters = [
    {
        letter: '5',
        isRight: true,
    },
    {
        letter: 'Б',
        isRight: true,
    },
    {
        letter: 'У',
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
];
</script>

<style lang="scss" module>
    .letters {
        display: flex;
        gap: 5px;
    }
</style>
