<template>
  <section class="data-wrapper">
    <div class="data-wrapper__head">
      <div class="data-wrapper__head-search">
        <slot name="data-wrapper-search"></slot>
      </div>

      <div class="data-wrapper__head-buttons">
        <slot name="data-wrapper-add-button"></slot>
        <slot name="data-wrapper-filter"></slot>
      </div>
    </div>

    <div class="data-wrapper__main">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.data-wrapper {
  padding: 20px;
  border-radius: var(--corner-radius-10);
  border: 1px solid var(--color-gray-20);
}

.data-wrapper__head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.data-wrapper__head-search {
  max-width: 330px;
  width: 100%;
}

.data-wrapper__head-buttons {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--spacing-l);
  flex-wrap: wrap;
}

.data-wrapper__main {
  margin: 30px 0;
}
</style>
