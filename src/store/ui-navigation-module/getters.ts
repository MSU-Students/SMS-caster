import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UINavModule } from './state';

const getters: GetterTree<UINavModule, StateInterface> = {
  someAction(/* context */) {
    // your code
  }
};

export default getters;
