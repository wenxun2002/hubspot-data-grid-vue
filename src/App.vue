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
    <table class="min-w-full bg-black border border-gray-200">
      <thead class="bg-black text-center">
        <tr>
          <th class="py-2 px-4 cursor-pointer " v-on:click="() => sortBy('name')">
            Name <span v-if="sortKey === 'name'">{{ sortOrderSymbol }}</span>
            <!-- sortOrderSymbol is a computed property that returns a symbol based on the sort order -->
          </th>
          <th class="py-2 px-4  cursor-pointer " v-on:click="() => sortBy('email')">
            Email <span v-if="sortKey === 'email'">{{ sortOrderSymbol }}</span>
            <!-- sortOrderSymbol is a computed property that returns a symbol based on the sort order -->
          </th>
          <th class="py-2 px-4 ">Company</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for is a directive that iterates over the filteredContacts array -->
        <tr
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="hover:bg-gray-50 hover:text-black border-t "
        >
          <!-- contact is the current contact in the iteration -->
          <td class="py-2 px-4">{{ contact.name }}</td>
          <td class="py-2 px-4">{{ contact.email }}</td>
          <td class="py-2 px-4">{{ contact.company }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { contacts } from './data/contacts.js';

const search = ref('');
const sortKey = ref('');
const sortAsc = ref(true);

// Sort order symbol
const sortOrderSymbol = computed(() => (sortAsc.value ? '▲' : '▼'));

// Sort the contacts array based on the key and sort order
function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    // Reset the sort order
    sortKey.value = key;
    sortAsc.value = true;
  }
  // Sort the contacts array based on the key and sort order
  contacts.value.sort((a, b) => {
    const valA = a[key].toLowerCase();
    const valB = b[key].toLowerCase();
    return sortAsc.value ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });
}

// Filter the contacts array based on the search value
const filteredContacts = computed(() => {
  return contacts.value.filter((c) => {
    return (
      // Check if the search value is in the name or email
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
