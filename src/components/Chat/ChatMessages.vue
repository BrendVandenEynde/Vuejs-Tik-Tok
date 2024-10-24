<script setup>
import { onMounted, reactive } from 'vue';

const messages = reactive([]);

onMounted(() => {
    fetch('https://nodejsmongodbtrash-03gj.onrender.com/api/v1/messages')
        .then(response => response.json())
        .then(data => {
            messages.push(...data.data.messages);
        });
});

</script>

<template>
    <h1>Comments</h1>
    <ul>
        <li v-for="message in messages">
            <strong> {{ message.user }}</strong>: {{ message.text }}
        </li>
    </ul>
</template>

<style scoped></style>