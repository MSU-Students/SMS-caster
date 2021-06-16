import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { OfficerStateInterface } from './state';

const getters: GetterTree<OfficerStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
