<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Contact Data Grid (HubSpot Style)</h1>

    <div class="mb-4 w-full h-16">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or email"
        class="p-4 text-lg border border-gray-300 rounded-lg w-full h-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
      />
    </div>

    <div class="flex items-center mb-4 gap-2">
      <button
        class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        @click="currentView = 'table'"
      >
        Table View
      </button>
      <button
        class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
        @click="currentView = 'card'"
      >
        Card View
      </button>
      <button
        class="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
        @click="currentView = 'list'"
      >
        List View
      </button>
    </div>

    <!-- Table View -->
    <table
      v-if="currentView === 'table'"
      class="min-w-full bg-black border border-gray-200"
    >
      <thead class="text-center">
        <tr>
          <th class="py-2 px-4 cursor-pointer" @click="() => sortBy('name')">
            Name <span v-if="sortKey === 'name'">{{ sortOrderSymbol }}</span>
          </th>
          <th class="py-2 px-4 cursor-pointer" @click="() => sortBy('email')">
            Email <span v-if="sortKey === 'email'">{{ sortOrderSymbol }}</span>
          </th>
          <th class="py-2 px-4">Company</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="hover:bg-white hover:text-black border-t"
        >
          <td class="py-2 px-4">{{ contact.name }}</td>
          <td class="py-2 px-4">{{ contact.email }}</td>
          <td class="py-2 px-4">{{ contact.company }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Card View -->
    <div
      v-if="currentView === 'card'"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <ContactCard
        v-for="contact in filteredContacts"
        :key="contact.id"
        :contact="contact"
        mode="card"
      />
    </div>

    <!-- List View -->
    <div v-if="currentView === 'list'" class="space-y-4">
      <ContactCard
        v-for="contact in filteredContacts"
        :key="contact.id"
        :contact="contact"
        mode="list"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { contacts } from './data/contacts.js';
import ContactCard from './components/ContactCard.vue';

const search = ref('');
const sortKey = ref('');
const sortAsc = ref(true);
const currentView = ref('table');

const sortOrderSymbol = computed(() => (sortAsc.value ? '▲' : '▼'));

function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
  contacts.value.sort((a, b) => {
    const valA = a[key].toLowerCase();
    const valB = b[key].toLowerCase();
    return sortAsc.value ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });
}

const filteredContacts = computed(() => {
  return contacts.value.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.value.toLowerCase()) ||
      c.email.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
</script>

<style scoped>
th {
  user-select: none;
}
</style>
