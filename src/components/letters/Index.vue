<template>
    <div class="letters">
        <Letter
            v-for="(item, index) in letters"
            :key="index"
            :letter="item"
            :index="index"
            :isAnimate="true"
        />
    </div>
</template>

<script setup>
    import Letter from './Letter.vue';
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

<style lang="scss" scoped>
    .letters {
        display: flex;
        gap: 5px;
    }
</style>
