import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import recipient from './recipient-module';
import { RecipientStateInterface } from './recipient-module/state';
import officer from './officer-module';
import { OfficerStateInterface } from './officer-module/state';
import uiNav from './ui-navigation-module';
import { UiNavStateInterface } from './ui-navigation-module/state';
import { DocumentStateInterface } from './document-module/state';
import document from './document-module';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  recipient: RecipientStateInterface;
  officer: OfficerStateInterface;
  uiNav: UiNavStateInterface;
  document: DocumentStateInterface;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      recipient,
      officer,
      uiNav,
      document
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
