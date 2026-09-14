<script setup lang="ts">
const copy = useCopy('hero')
const localePath = useLocalePath()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__pin frame">
      <div class="hero__mark">
        <PhoenixMark variant="line" />
      </div>
      <div class="hero__text">
        <h1 id="hero-title" class="hero__title">
          <span>{{ copy.line1 }}</span>
          <span>{{ copy.line2 }}</span>
        </h1>
        <p class="hero__lede">{{ copy.lede }}</p>
        <div class="cluster hero__actions">
          <AppButton :to="`${localePath('/')}#contact`">{{ copy.primary }}</AppButton>
          <AppButton :to="localePath('/aabenforms')" variant="quiet">{{ copy.secondary }}</AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
