<script setup lang="ts">
const copy = useCopy('how')
</script>

<template>
  <SiteSection id="how" :heading="copy.heading" :lede="copy.lede">
    <Rows>
      <Row v-for="step in copy.steps" :key="step.term" :term="step.term">
        <p>{{ step.body }}</p>
      </Row>
    </Rows>
  </SiteSection>
</template>
