<script setup lang="ts">
const copy = useCopy('services')
</script>

<template>
  <SiteSection id="services" :heading="copy.heading" :lede="copy.lede">
    <Rows>
      <Row v-for="item in copy.items" :key="item.term" :term="item.term" :title="item.title">
        <p>{{ item.body }}</p>
      </Row>
    </Rows>
  </SiteSection>
</template>
