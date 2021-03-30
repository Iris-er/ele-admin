<template>
  <div>
   <input type="text"
         :value="value1"
         @input="$emit('input', $event.target.value)"
  >
  </div>
</template>
<script>
export default {
  name: 'BaseInput',
  model: {
    prop: 'value1',
    event: 'input'
  },
  props: ['value1']
}
</script>
