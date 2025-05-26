// <!-- for now no use because i make sure all data and UI is from App.vue only-->

import { ref } from 'vue';

export const contacts = ref([
  { id: 1, name: "Alice", email: "alice@mail.com", company: "Alpha" },
  { id: 2, name: "Bob", email: "bob@mail.com", company: "Beta" },
  { id: 3, name: "Charlie", email: "charlie@mail.com", company: "Gamma" },
  { id: 4, name: "Daisy", email: "daisy@mail.com", company: "Delta" },
  { id: 5, name: "Edward", email: "edward@mail.com", company: "Epsilon" },
]);
