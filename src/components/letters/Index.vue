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

const letters = '5БУКВ'.split('').map(letter => ({
    letter,
    isRight: true,
}));
</script>

<style lang="scss" module>
    .letters {
        display: flex;
        gap: 5px;
    }
</style>
