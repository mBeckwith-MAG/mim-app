<template>
  <div class="m-2 p-5 shadow-lg rounded">
    <div class="text-2xl">
      <slot name="title" />
    </div>
    <div class="grid gap-5 mt-5 pb-5">
      <slot name="content" />
    </div>
  </div>
</template>
