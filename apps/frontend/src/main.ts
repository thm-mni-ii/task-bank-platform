import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { setupApollo } from './plugins/apollo';
import { router } from './app/router';

const app = createApp(App);

setupApollo();

app.use(vuetify);
app.use(router);
app.mount('#app');
