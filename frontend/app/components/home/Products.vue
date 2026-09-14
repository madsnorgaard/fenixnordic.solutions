<script setup lang="ts">
const copy = useCopy('products')
const localePath = useLocalePath()

const external: Record<string, string> = {
  AabenForms: site.aabenforms,
  AabenIntra: site.aabenintra,
}
</script>

<template>
  <SiteSection id="products" :heading="copy.heading" :lede="copy.lede">
    <template v-for="product in copy.items" :key="product.name">
      <div class="product__head">
        <p class="ash">{{ product.kicker }}</p>
        <h3 class="product__name">{{ product.name }}</h3>
        <p class="product__claim">{{ product.claim }}</p>
      </div>

      <FlowVideo
        v-if="product.video"
        :name="product.video.name"
        :alt="product.video.alt"
        :demo="product.video.demo"
        width="1440"
        height="900"
      >
        {{ product.video.caption }}
      </FlowVideo>
      <CaseFigure
        v-else-if="product.image"
        :src="product.image.src"
        :src2x="product.image.src.replace('.webp', '@2x.webp')"
        :width="product.image.width"
        :height="product.image.height"
        :alt="product.image.alt"
      >
        {{ product.image.caption }}
      </CaseFigure>

      <MarginNote :term="product.status.term">
        {{ product.status.body }}
      </MarginNote>
      <Fact>{{ product.facts }}</Fact>

      <div class="stack">
        <p v-for="(paragraph, i) in product.paragraphs" :key="i">{{ paragraph }}</p>
      </div>

      <div class="cluster product__links">
        <AppButton :to="localePath(`/${product.name.toLowerCase()}`)" variant="quiet">{{ product.links.study }}</AppButton>
        <AppButton :to="external[product.name]" variant="quiet">{{ product.links.site }}</AppButton>
      </div>
    </template>
  </SiteSection>
</template>
