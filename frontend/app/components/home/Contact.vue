<script setup lang="ts">
const copy = useCopy('contact')

const form = reactive({ name: '', company: '', email: '', message: '', website: '' })
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function submit() {
  if (state.value === 'sending') return
  state.value = 'sending'
  try {
    const res = await fetch(site.contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        email: form.email,
        message: form.message,
        // Honeypot. People never see this field; bots fill it in.
        website: form.website,
      }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || data?.status !== 'ok') throw new Error('send failed')
    state.value = 'sent'
  }
  catch {
    state.value = 'error'
  }
}
</script>

<template>
  <SiteSection id="contact" :heading="copy.heading" :lede="copy.lede">
    <div class="pair">
      <div class="stack">
        <p class="muted">{{ copy.sub }}</p>
        <div class="contact-lines">
          <a :href="site.phoneHref">{{ site.phone }}</a>
          <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          <span>{{ copy.address }}</span>
          <span>{{ copy.cvr }} {{ site.cvr }}</span>
        </div>
      </div>

      <form class="form" @submit.prevent="submit">
        <div class="hp" aria-hidden="true">
          <label for="website">Website</label>
          <input id="website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
        </div>

        <div class="form__row">
          <div class="field">
            <label class="field__label" for="name">{{ copy.form.name }}</label>
            <input id="name" v-model="form.name" class="field__input" type="text" required autocomplete="name">
          </div>
          <div class="field">
            <label class="field__label" for="company">{{ copy.form.company }}</label>
            <input id="company" v-model="form.company" class="field__input" type="text" autocomplete="organization">
          </div>
        </div>

        <div class="field">
          <label class="field__label" for="email">{{ copy.form.email }}</label>
          <input id="email" v-model="form.email" class="field__input" type="email" required autocomplete="email">
        </div>

        <div class="field">
          <label class="field__label" for="message">{{ copy.form.message }}</label>
          <textarea id="message" v-model="form.message" class="field__input" required />
        </div>

        <p
          :class="['form__status', { 'form__status--error': state === 'error' }]"
          role="status"
          aria-live="polite"
        >
          <template v-if="state === 'sent'">{{ copy.form.success }}</template>
          <template v-else-if="state === 'error'">{{ copy.form.error }}</template>
        </p>

        <div v-if="state !== 'sent'" class="cluster">
          <AppButton type="submit" :disabled="state === 'sending'" :aria-busy="state === 'sending'">
            {{ state === 'sending' ? copy.form.sending : copy.form.submit }}
          </AppButton>
        </div>
      </form>
    </div>
  </SiteSection>
</template>
