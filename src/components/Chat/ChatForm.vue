<script setup>
import { ref } from "vue";

// Single input message managed by ref
const message = ref('');

// Define emit to send events to the parent component
const emit = defineEmits(['sendMessage']);

// Function to send the message
function sendMessage() {
    if (message.value.trim() !== '') {
        // Emit the new message to the parent with user and text data
        emit('sendMessage', { user: 'You', text: message.value });
        message.value = ''; // Clear the input field after sending
    }
}
</script>

<template>
    <div class="form">
        <input v-model="message" type="text" placeholder="Type your message here" />
        <button @click="sendMessage">Send</button>
    </div>
</template>

<style scoped></style>
