import { MutationTree } from 'vuex';
import { OfficerStateInterface } from './state';

const mutation: MutationTree<OfficerStateInterface> = {
  addOfficer(state, payload) {
    state.officers.push(payload);
  }
};

export default mutation;
