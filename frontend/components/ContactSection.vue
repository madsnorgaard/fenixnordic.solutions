<script setup lang="ts">
const t = useT()
const { el, isVisible } = useReveal()

const form = reactive({ name: '', company: '', email: '', message: '' })
const submitted = ref(false)
const submitting = ref(false)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  submitting.value = true

  const subject = `Enquiry from ${form.name}${form.company ? ` at ${form.company}` : ''}`
  const body = [
    `From: ${form.name}`,
    form.company ? `Company: ${form.company}` : null,
    `Email: ${form.email}`,
    '',
    form.message,
  ]
    .filter(Boolean)
    .join('\n')

  window.location.href = `mailto:phoenixnorgaard@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 400)
}
</script>

<template>
  <section id="contact" :ref="el" :class="['contact-section reveal', { 'in-view': isVisible }]">
    <div class="container">
      <div class="contact-grid">
        <!-- Left: details -->
        <div class="contact-info">
          <p class="label">{{ t.contact.label }}</p>
          <h2 class="contact-heading">{{ t.contact.heading }}</h2>
          <p class="contact-sub">{{ t.contact.subheading }}</p>

          <div class="contact-details">
            <a :href="`tel:${t.contact.phone.replace(/\s/g, '')}`" class="detail-item">
              <span class="detail-icon" aria-hidden="true">T</span>
              <span>{{ t.contact.phone }}</span>
            </a>
            <a :href="`mailto:${t.contact.email}`" class="detail-item">
              <span class="detail-icon" aria-hidden="true">E</span>
              <span>{{ t.contact.email }}</span>
            </a>
            <div class="detail-item">
              <span class="detail-icon" aria-hidden="true">A</span>
              <span>{{ t.contact.address }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon" aria-hidden="true">R</span>
              <span>{{ t.contact.cvr }}</span>
            </div>
          </div>
        </div>

        <!-- Right: form -->
        <div class="contact-form-wrap">
          <Transition name="fade" mode="out-in">
            <div v-if="submitted" class="form-success">
              <div class="success-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5" />
                  <path d="M7.5 12l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <p>{{ t.contact.form.success }}</p>
            </div>

            <form v-else class="contact-form" @submit.prevent="handleSubmit" novalidate>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="name">{{ t.contact.form.name }}</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="form-input"
                    :placeholder="t.contact.form.name"
                    required
                    autocomplete="name"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="company">{{ t.contact.form.company }}</label>
                  <input
                    id="company"
                    v-model="form.company"
                    type="text"
                    class="form-input"
                    :placeholder="t.contact.form.company"
                    autocomplete="organization"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="email">{{ t.contact.form.email }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :placeholder="t.contact.form.email"
                  required
                  autocomplete="email"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="message">{{ t.contact.form.message }}</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-textarea"
                  :placeholder="t.contact.form.message"
                  required
                />
              </div>

              <button type="submit" class="btn-primary submit-btn" :disabled="submitting">
                <span>{{ t.contact.form.submit }}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: var(--section-py) 0;
  border-top: 1px solid var(--border);
  position: relative;
}

/* Subtle ember glow at bottom of page */
.contact-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--accent), transparent);
  opacity: 0.4;
}

.contact-grid {
  display: grid;
  grid-template-columns: 44fr 56fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
}

/* Left */
.contact-heading {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  color: var(--text);
  margin-bottom: 1rem;
}

.contact-sub {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 36ch;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 300;
  color: var(--text-muted);
  transition: color 0.2s ease;
}
a.detail-item:hover { color: var(--text); }

.detail-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border: 1px solid var(--border-light);
  border-radius: 2px;
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-dim);
  margin-top: 1px;
}

/* Right: form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.submit-btn {
  align-self: flex-start;
  margin-top: 0.5rem;
}

.form-success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 3rem 2.5rem;
  background: var(--surface);
  border: 1px solid var(--border-light);
  border-radius: 2px;
}

.success-icon {
  color: var(--accent);
}

.form-success p {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-muted);
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
