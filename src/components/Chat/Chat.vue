<script setup>
import { reactive } from 'vue';
import ChatMessages from './ChatMessages.vue';
import ChatForm from './ChatForm.vue';

// Reactive state for messages
const state = reactive({
    messages: [],
});

// Fetch the initial messages when the component is mounted
fetch('https://nodejsmongodbtrash-03gj.onrender.com/api/v1/messages')
    .then(response => response.json())
    .then(data => {
        state.messages.push(...data.data.messages.reverse()); // Reverse to show newest first
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
    });

// Handle the event when a new message is sent from ChatForm
function handleSendMessage(newMessage) {
    // Add the new message to the beginning of the local state (newest first)
    state.messages.unshift(newMessage);

    // Send the new message to the backend (POST request)
    fetch('https://nodejsmongodbtrash-03gj.onrender.com/api/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }), // Adjusted for backend format
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Server responded with error:', errorData);
                throw new Error('Failed to send message.');
            });
        }
    })
    .catch(error => {
        console.error('Error sending message to the backend:', error);
    });
}
</script>

<template>
    <!-- Pass the messages to ChatMessages component as a prop -->
    <ChatMessages :messages="state.messages" />
    <!-- Listen for the sendMessage event emitted by ChatForm and handle it -->
    <ChatForm @sendMessage="handleSendMessage" />
</template>

<style scoped></style>
