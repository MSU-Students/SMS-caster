import { MutationTree } from 'vuex';
import { UINavModule } from './state';

const mutation: MutationTree<UINavModule> = {
  dialogPopup(state, payload: boolean) {
    state.isShow = payload;
  },

  isAdminLogin(state, payload: boolean) {
    state.adminLoggedIn = payload;
  }
};

export default mutation;
