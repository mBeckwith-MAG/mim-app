<template>
  <div :class="['base-grid-layout', cssName]">
    <div 
      v-for="(section, index) in sections"
      :key="`${section.id}-section-${index + 1}`"
      :class="[`${section.id}-section`, { 'hidden': !section.visible }]"  
    >
      <slot :name="`section-${index + 1}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
type Section = {
  id: String
  visible: Boolean
}

defineProps({
  cssName: {
    type: String,
    default: 'layout'
  },
  sections: {
    type: Array<Section>,
    default: [{ id: 'grid', visible: true }]
  },
});
</script>
