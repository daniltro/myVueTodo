<template>
  <div class="card-item">
    <button class="button" :class="{ 'set-done-button': true, 'done': model.status }" @click="toggleDone">
    </button>
    <div class="todo-item">
      <h4 class="todo-item__title" :class="{ completedTodo: model.status }">{{ model.title }}</h4>
    </div>
    <button class="remove-button button" @click="emitOnRemove">
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Todo } from '../../types/types'

export default defineComponent({
  emits: ['onDone', 'onRemove'],
  props: {
    model: {
      type: Object as PropType<Todo>,
      required: true,
    }
  },
  setup(props, { emit }) {

    const toggleDone = () => {
      emit('onDone', props.model.id, !props.model.status);
    };

    const emitOnRemove = () => {
      emit('onRemove');
    };

    return {
      toggleDone,
      emitOnRemove
    };
  }
});
</script>

<style scoped></style>
