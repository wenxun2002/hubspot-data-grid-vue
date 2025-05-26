<template>
    <div
      :class="mode === 'card' ? 'border rounded-lg p-4 shadow hover:shadow-md transition hover:bg-white hover:text-black' 
      : 
      'flex items-center justify-between p-4 border rounded-lg shadow-sm bg-black hover:bg-gray-50 hover:text-black transition'"
    >
      <div>
        <h2 class="text-xl font-semibold">{{ contact.name }}</h2>
        <p class="text-gray-600">{{ contact.email }}</p>
        <p class="text-gray-500">{{ contact.company }}</p>
      </div>
      <div v-if="mode === 'list'" class="text-sm text-right text-gray-400">
        <span>ID: {{ contact.id }}</span>
      </div>
    </div>
</template>
  
  <script setup>
  defineProps({
    contact: Object,
    mode: {
      type: String,
      default: 'card' // 'card' or 'list'
    }
  });
  </script>
  