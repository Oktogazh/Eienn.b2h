<template>
  <div class="center">
    <EmailForm/>
  </div>
</template>

<script>
import EmailForm from '@/components/emailForm/EmailForm'

export default {
  name: 'Gwiriekaat',
  components: {
    EmailForm
  }
}
</script>

<style media="screen">
.center {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
