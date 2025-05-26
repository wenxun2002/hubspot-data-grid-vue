<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Contact Data Grid (HubSpot Style)</h1>
    <div class="mb-4 w-full h-16 flex gap-2">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or email"
        class="p-4 text-lg border border-gray-300 rounded-lg w-full h-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
      />
      <!-- export csv (extra feature)-->
      <!-- <button
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        @click="exportCSV"
      >
        Export CSV
      </button> -->
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

    <div v-if="filteredContacts.length === 0" class="text-center text-gray-500 mt-8">
      No contacts match your search.
    </div>

    <!-- Table View -->
    <table
      v-if="currentView === 'table' && filteredContacts.length > 0"
      class="min-w-full bg-black border border-gray-200"
    >
      <thead class="text-center">
        <tr>
          <th class="py-2 px-4 cursor-pointer" :class="sortKey === 'name' ? 'text-blue-400' : ''" @click="sortBy('name')">
            Name <span v-if="sortKey === 'name'">{{ sortOrderSymbol }}</span>
          </th>
          <th class="py-2 px-4 cursor-pointer" :class="sortKey === 'email' ? 'text-blue-400' : ''" @click="sortBy('email')">
            Email <span v-if="sortKey === 'email'">{{ sortOrderSymbol }}</span>
          </th>
          <th class="py-2 px-4">Company</th>
        </tr>
      </thead>
      <Draggable
        v-if="canDrag"
        :list="contacts"
        item-key="id"
        tag="tbody"
        :animation="300"
        ghost-class="bg-blue-100"
        chosen-class="bg-blue-200"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <tr class="hover:bg-white hover:text-black border-t">
            <td class="py-2 px-4">{{ element.name }}</td>
            <td class="py-2 px-4">{{ element.email }}</td>
            <td class="py-2 px-4">{{ element.company }}</td>
          </tr>
        </template>
      </Draggable>
      <tbody v-else>
        <tr v-for="element in filteredContacts" :key="element.id" class="hover:bg-white hover:text-black border-t">
          <td class="py-2 px-4">{{ element.name }}</td>
          <td class="py-2 px-4">{{ element.email }}</td>
          <td class="py-2 px-4">{{ element.company }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Card View -->
    <Draggable
      v-if="currentView === 'card' && filteredContacts.length > 0 && canDrag"
      :list="contacts"
      item-key="id"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      :animation="300"
      ghost-class="bg-blue-100"
      chosen-class="bg-blue-200"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div class="border rounded-lg p-4 shadow hover:shadow-md transition hover:bg-white hover:text-black">
          <h2 class="text-xl font-semibold">{{ element.name }}</h2>
          <p class="text-gray-600">{{ element.email }}</p>
          <p class="text-gray-500">{{ element.company }}</p>
        </div>
      </template>
    </Draggable>
    <div
      v-if="currentView === 'card' && filteredContacts.length > 0 && !canDrag"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <div v-for="element in filteredContacts" :key="element.id"
        class="border rounded-lg p-4 shadow hover:shadow-md transition hover:bg-white hover:text-black">
        <h2 class="text-xl font-semibold">{{ element.name }}</h2>
        <p class="text-gray-600">{{ element.email }}</p>
        <p class="text-gray-500">{{ element.company }}</p>
      </div>
    </div>

    <!-- List View -->
    <Draggable
      v-if="currentView === 'list' && filteredContacts.length > 0 && canDrag"
      :list="contacts"
      item-key="id"
      class="flex flex-col gap-2"
      :animation="300"
      ghost-class="bg-blue-100"
      chosen-class="bg-blue-200"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div class="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-black hover:bg-gray-50 hover:text-black transition">
          <div>
            <h2 class="text-xl font-semibold">{{ element.name }}</h2>
            <p class="text-gray-600">{{ element.email }}</p>
            <p class="text-gray-500">{{ element.company }}</p>
          </div>
          <div class="text-sm text-right text-gray-400">
            <span>ID: {{ element.id }}</span>
          </div>
        </div>
      </template>
    </Draggable>
    <div
      v-if="currentView === 'list' && filteredContacts.length > 0 && !canDrag"
      class="flex flex-col gap-2"
    >
      <div v-for="element in filteredContacts" :key="element.id"
        class="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-black hover:bg-gray-50 hover:text-black transition">
        <div>
          <h2 class="text-xl font-semibold">{{ element.name }}</h2>
          <p class="text-gray-600">{{ element.email }}</p>
          <p class="text-gray-500">{{ element.company }}</p>
        </div>
        <div class="text-sm text-right text-gray-400">
          <span>ID: {{ element.id }}</span>
        </div>
      </div>
    </div>
    <div v-if="!canDrag" class="text-red-600 mt-4">
      No allow drag when sorting/filtering
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Draggable from 'vuedraggable';
// remove local storage
localStorage.removeItem('contacts')

// dataset local storage
const DEFAULT_CONTACTS = [
  { id: 1, name: "Alice Smith", email: "alice@mail.com", company: "Alpha Corp" },
  { id: 2, name: "Bob Johnson", email: "bob@mail.com", company: "Beta LLC" },
  { id: 3, name: "Charlie Lee", email: "charlie@mail.com", company: "Gamma Ltd" },
  { id: 4, name: "Daisy Ray", email: "daisy@mail.com", company: "Delta Inc" },
  { id: 5, name: "Edward Fox", email: "edward@mail.com", company: "Epsilon GmbH" },
  { id: 6, name: "Fiona Brown", email: "fiona@mail.com", company: "Fiona Inc" },
  { id: 7, name: "George White", email: "george@mail.com", company: "George Ltd" },
  { id: 8, name: "Helen Green", email: "helen@mail.com", company: "Helen Inc" },
  { id: 9, name: "Ivy Black", email: "ivy@mail.com", company: "Ivy Ltd" },
  { id: 10, name: "John Doe", email: "john@mail.com", company: "John Inc" },
  { id: 11, name: "Kelvin Tan", email: "kelvin@mail.com", company: "Kelvin Inc" },
  { id: 12, name: "Lena Ng", email: "lena@mail.com", company: "Lena Ltd" },
  { id: 13, name: "Michael Chua", email: "michael@mail.com", company: "Michael Inc" },
  { id: 14, name: "Nina Lim", email: "nina@mail.com", company: "Nina Ltd" },
  { id: 15, name: "Oliver Tan", email: "oliver@mail.com", company: "Oliver Inc" },
  { id: 16, name: "Pauline Chua", email: "pauline@mail.com", company: "Pauline Inc" },
  { id: 17, name: "Qiang Li", email: "qiang@mail.com", company: "Qiang Ltd" },
  { id: 18, name: "Rita Ng", email: "rita@mail.com", company: "Rita Inc" },
  { id: 19, name: "Sam Tan", email: "sam@mail.com", company: "Sam Ltd" },
  { id: 20, name: "Tina Lim", email: "tina@mail.com", company: "Tina Inc" },
];

const contacts = ref(
  (() => {
    try {
      const saved = JSON.parse(localStorage.getItem('contacts'));
      if (Array.isArray(saved) && saved.every(item => item.id)) {
        return saved;
      }
    } catch (e) {}
    return DEFAULT_CONTACTS;
  })()
);

const search = ref('');
const sortKey = ref('');
const sortAsc = ref(true);
const currentView = ref('table');

const sortOrderSymbol = computed(() => (sortAsc.value ? '▲' : '▼'));

// only allow drag when no search/sort
const canDrag = computed(() => !search.value && !sortKey.value);

//for UI display
const filteredContacts = computed(() => {
  let arr = contacts.value;
  if (search.value) {
    arr = arr.filter((c) =>
      c.name.toLowerCase().includes(search.value.toLowerCase()) ||
      c.email.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  if (sortKey.value) {
    arr = arr.slice().sort((a, b) => {
      const valA = a[sortKey.value].toLowerCase();
      const valB = b[sortKey.value].toLowerCase();
      return sortAsc.value ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }
  return arr;
});

function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
}

function onDragEnd() {
  // save after drag
  localStorage.setItem('contacts', JSON.stringify(contacts.value));
  console.log('新顺序:', contacts.value.map(c => c.name));
}

function exportCSV() {
  const rows = [['Name', 'Email', 'Company']];
  filteredContacts.value.forEach((c) => {
    rows.push([c.name, c.email, c.company]);
  });
  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', 'contacts.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

watch(contacts, () => {
  console.log('contacts order changed:', contacts.value.map(c => c.name));
});
</script>
