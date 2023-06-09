import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

//Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js';
//Import third party plugins
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Import and use Vue Froala lib.
import VueFroala from 'froala-wysiwyg-vue3';

// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(VueFroala);

app.mount('#app')
