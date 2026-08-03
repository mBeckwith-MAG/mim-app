<template>
  <div class="w-full space-y-4">
    <label 
    for="dropzone-file" 
    :class="[
      'flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors px-4 text-center',
      isDragging 
      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' 
      : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
    ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      >
      <div class="flex flex-col items-center justify-center py-4">
        <svg :class="['w-8 h-8 mb-2 transition-colors', isDragging ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400']" aria-hidden="true" xmlns="http://w3.org" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload multiple files</span> or drag and drop
        </p>
      </div>
      <input id="dropzone-file" type="file" multiple class="hidden" @change="handleFileChange" />
    </label>


    <div v-if="fileList.length > 0" class="fixed top-0 m-2 right-0 grid gap-3 max-h-dvh overflow-y-scroll [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
      <div 
      v-for="item in fileList" 
      :key="item.id" 
      class="relative flex flex-col items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
      >
        <img v-if="item.previewUrl" :src="item.previewUrl" class="w-16 h-16 object-cover rounded mb-2 shadow-inner" />
        
        <div v-else class="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-2xl mb-2">
          📄
        </div>

        <p class="w-full text-xs font-medium text-gray-700 dark:text-gray-300 text-center truncate px-1">
          {{ item.file.name }}
        </p>
        <p class="text-[10px] text-gray-400 dark:text-gray-500">
          {{ (item.file.size / 1024).toFixed(1) }} KB
        </p>

        <button 
        type="button" 
        @click.stop.prevent="removeFile(item.id)" 
        class="absolute top-1 right-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
        aria-label="Remove item"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

interface ExtendedFile {
  id: string
  file: File
  previewUrl: string | null
}

const emit = defineEmits<{
  (e: 'update:files', files: File[]): void
}>()


const fileList: Ref<ExtendedFile[]> = ref([])
const isDragging = ref(false)

const addFiles = (rawFiles: FileList | null) => {
  if (!rawFiles) return

  for (let i = 0; i < rawFiles.length; i++) {
    const currentFile = rawFiles[i]
    
    const isDuplicate = fileList.value.some(
      (f) => f.file.name === currentFile.name && f.file.size === currentFile.size
    )
    if (isDuplicate) continue

    let previewUrl: string | null = null
    if (currentFile.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(currentFile)
    }

    fileList.value.push({
      id: crypto.randomUUID(),
      file: currentFile,
      previewUrl
    })
  }

  notifyParent()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target && target.files) {
    addFiles(target.files)
  }
  target.value = '' 
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e && e.dataTransfer) {
    addFiles(e.dataTransfer.files)
  }
}


const removeFile = (idToRemove: string) => {
  const index = fileList.value.findIndex(item => item.id === idToRemove)
  if (index !== -1) {
    if (fileList.value[index].previewUrl) {
      URL.revokeObjectURL(fileList.value[index].previewUrl!)
    }
    fileList.value.splice(index, 1)
  }
  notifyParent()
}

const notifyParent = () => {
  const plainFilesArray = fileList.value.map(item => item.file)
  emit('update:files', plainFilesArray)
}
</script>