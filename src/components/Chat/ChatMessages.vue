<script setup>
import { defineProps } from 'vue';

// Define props to accept messages from the parent
const props = defineProps({
    messages: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <h1>Comments</h1>
    <ul>
        <li v-for="(message, index) in messages" :key="index">
            <strong>{{ message.user }}</strong>: {{ message.text }}
        </li>
    </ul>
</template>

<style scoped></style>
