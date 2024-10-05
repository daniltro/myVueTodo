<template>
  <main>
    <div class="header-wrapper">
      <img class="logo" src="./images/Logo.svg" alt="">
    </div>
    <div class="content">
      <div class="content-wrapper">
        <CardInput @onAddTodo="addTodo"></CardInput>
        <ul class="card-list">
          <div class="list-info">
            <span> Всего дел: {{ todoList.length }}</span>
            <span>Выполнено: {{ completedTodos.length }} </span>
          </div>
          <li class="list-item" v-for="item in todoList" :key="item.id">
            <CardItem @onDone="setDoneTodo" @onRemove="removeTodo(item.id)" :model="item"></CardItem>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import CardItem from './components/CardItem.vue';
import CardInput from './components/CardInput.vue';
import { Todo } from '../types/types'

export default defineComponent({
  name: 'App',
  components: { CardItem, CardInput },
  setup() {
    const getTodos = (): Todo[] => {
      const todos = localStorage.getItem('todos');
      const parsedTodos = todos ? JSON.parse(todos) : [];
      return parsedTodos
    };

    const todoList = ref<Todo[]>(getTodos());
    const saveToLocalStorage = (todos: Todo[]) => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    const completedTodos = computed(() => {
      return todoList.value.filter(todo => todo.status);
    });


    const addTodo = ({ title, description }: { title: string; description: string }) => {
      const newTodo: Todo = {
        id: todoList.value.length + 1,
        title,
        status: false
      };
      todoList.value.push(newTodo);
      saveToLocalStorage(todoList.value);
    };

    const setDoneTodo = (id: number, status: boolean) => {
      todoList.value = todoList.value.map((el) => {
        if (el.id === id) {
          el.status = status; 
        }
        return el;
      });
      saveToLocalStorage(todoList.value);
    };

    const removeTodo = (id: number) => {
      todoList.value = todoList.value.filter((el) => el.id !== id);
      saveToLocalStorage(todoList.value);
    };

    return {
      todoList,
      addTodo,
      completedTodos,
      setDoneTodo,
      removeTodo,
    };
  },
});
</script>

<style scoped></style>
