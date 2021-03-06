import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { OfficerStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const officerModule: Module<OfficerStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default officerModule;
