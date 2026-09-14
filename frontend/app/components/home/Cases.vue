<script setup lang="ts">
const copy = useCopy('cases')
</script>

<template>
  <SiteSection id="cases" :heading="copy.heading" :lede="copy.lede">
    <template v-for="item in copy.items" :key="item.name">
      <div>
        <h3 class="case-item__name">{{ item.name }}</h3>
        <p class="case-item__tag">{{ item.tag }}</p>
      </div>
      <MarginNote :term="item.note.term" tone="ash">
        {{ item.note.body }}
      </MarginNote>
      <div class="stack">
        <p v-for="(paragraph, i) in item.paragraphs" :key="i">{{ paragraph }}</p>
      </div>
      <div class="cluster">
        <AppButton :to="site.sahistory" variant="quiet">{{ item.link }}</AppButton>
      </div>
    </template>
  </SiteSection>
</template>
