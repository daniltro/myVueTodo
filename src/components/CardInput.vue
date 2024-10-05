<template>
  <div class="input-container">
    <input class="title-input" v-model="title" @keydown.enter="handleAddTodo" placeholder="Заголовок" type="text">
    <button class="add-button" @click="handleAddTodo">Добавить<img src="../images/add-button-logo.svg" alt=""></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['onAddTodo'],
  setup(props, { emit }) {
    const title = ref('');

    const handleAddTodo = () => {
      if (title.value === ''
      ) {
        alert('Заполните поля');
        return;
      }
      emit('onAddTodo', {
        title: title.value,
      });
      title.value = '';
    };

    return {
      title,

      handleAddTodo
    };
  }
});
</script>

<style scoped></style>
