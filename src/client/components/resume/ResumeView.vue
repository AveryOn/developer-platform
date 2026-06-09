<script setup lang="ts">
import { UseI18n } from '~/client/composables/useI18n'

const { $t, plural } = UseI18n()

const count = 101
</script>

<template>
  <div class="example-314231">
    RESUME
    <div>
      <p>{{ $t('Hello World!') }}</p>
      <p>{{ $t('Example 123') }}</p>
      <p>{{ plural('Project', count) }}</p>
      <p>{{ plural('You have {count} project', count) }}</p>
    </div>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit maxime voluptatem, numquam tenetur repudiandae praesentium earum culpa voluptatum dignissimos et blanditiis illo aspernatur ea exercitationem alias magnam neque nemo rem harum ipsum non repellat, voluptates est enim! Dolorem neque minus, laboriosam nulla sit cumque sequi expedita modi obcaecati exercitationem odio quae recusandae iste officiis, corporis tempore beatae illo dolorum adipisci voluptatibus eaque blanditiis. Aut, illo quos accusantium blanditiis veniam deleniti, nemo architecto harum quia, modi totam nostrum sequi assumenda molestias dicta laudantium cupiditate reiciendis ratione vero dolorum soluta. Quae officiis fugit pariatur eius adipisci tempore quia vero maiores quibusdam nihil!
  </div>
</template>

<style scoped></style>
