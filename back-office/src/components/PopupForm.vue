<template>
  <teleport to="body">
    <div class="popup-container" v-if="isFormOpen">
      <div class="popup-content">
        <!-- Form content goes here -->
        <form>
          <!-- Your form fields go here -->
          <input type="text" placeholder="Name" v-model="name" />
          <input type="email" placeholder="Email" v-model="email" />
          <button @click="submitForm">Submit</button>
          <button @click="closeForm">Close</button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isFormOpen = ref(false);
    const name = ref('');
    const email = ref('');

    const openForm = () => {
      isFormOpen.value = true;
    };

    const closeForm = () => {
      isFormOpen.value = false;
    };

    const submitForm = () => {
      // Handle form submission logic here
      console.log('Name:', name.value);
      console.log('Email:', email.value);
      closeForm();
    };

    return {
      isFormOpen,
      name,
      email,
      openForm,
      closeForm,
      submitForm
    };
  }
};
</script>

<style>
.popup-container {
  /* Styles for the pop-up container go here */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  /* Styles for the pop-up content go here */
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}
</style>
