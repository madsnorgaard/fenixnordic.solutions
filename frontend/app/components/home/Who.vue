<script setup lang="ts">
const copy = useCopy('who')
</script>

<template>
  <SiteSection id="who" :heading="copy.heading" :lede="copy.lede">
    <div class="pair">
      <div v-for="person in copy.people" :key="person.name" class="stack">
        <h3 class="person__name">{{ person.name }}</h3>
        <p v-for="(paragraph, i) in person.paragraphs" :key="i">{{ paragraph }}</p>
      </div>
    </div>
    <p class="muted">{{ copy.closing }}</p>
  </SiteSection>
</template>
