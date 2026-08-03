import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index.ts'

import FileDownloadIcon from '@iconify-vue/system-uicons/file-download'
import LinkAltIcon from '@iconify-vue/system-uicons/link-alt'
import FilterIcon from '@iconify-vue/system-uicons/filter'
import WriteIcon from '@iconify-vue/system-uicons/write'
import ButtonAddIcon from '@iconify-vue/system-uicons/button-add'

const app = createApp(App)

app.use(router)

app.component('FileDownloadIcon', FileDownloadIcon)
app.component('LinkAltIcon', LinkAltIcon)
app.component('FilterIcon', FilterIcon)
app.component('WriteIcon', WriteIcon)
app.component('ButtonAddIcon', ButtonAddIcon)

app.mount('#app')
