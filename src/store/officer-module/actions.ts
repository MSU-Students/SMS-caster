import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { OfficerStateInterface } from './state';
import officerService from 'src/services/officer.service';

const actions: ActionTree<OfficerStateInterface, StateInterface> = {
  async addAccount(context, payload: any) {
    const result = await officerService.addAccount(payload);
    context.commit('addAccount', result);
  },
  async getOfficers(context): Promise<any> {
    const result = await officerService.getAll();
    context.commit('getOfficers', result);
  },
  changePassword(context, payload: { [key: string]: string }) {
    context.commit('changePassword', payload);
  },
  async updateOfficer({}, payload): Promise<any> {
    await officerService.update(payload);
  },
  async deleteOfficer({}, payload): Promise<any> {
    await officerService.delete(payload);
  },
};

export default actions;
