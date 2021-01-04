<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <span class="is-size-4">
            <slot />
          </span>
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span class="is-size-7">
            {{ footer }}
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    footer: {
      type: String,
      required: true
    }
  }
}
</script>
