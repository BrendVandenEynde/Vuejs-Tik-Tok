<script setup>
import { ref, reactive } from 'vue';
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
        state.messages.push(...data.data.messages); // Populate with data from API
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
    });

// Handle the event when a new message is sent from ChatForm
function handleSendMessage(newMessage) {
    // Log the message before sending for debugging
    console.log('Sending message:', newMessage);

    // Add the new message to the local state
    state.messages.push(newMessage);

    // Send the new message to the backend (POST request)
    fetch('https://nodejsmongodbtrash-03gj.onrender.com/api/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }), // Wrap newMessage in { message }
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorData => {
                    console.error('Server responded with error (non-JSON):', errorData);
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
