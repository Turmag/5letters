import { createStore } from 'vuex';

import main from './modules/main';
import modal from './modules/modal';

export const store = createStore({
    modules: {
        main,
        modal,
    },
});
