import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { OfficerStateInterface } from './state';

const actions: ActionTree<OfficerStateInterface, StateInterface> = {
  addOfficer(context, payload: { [key: string]: string }) {
    console.log(payload);
    if (payload) {
      const { name, fName, lName, contactNum } = payload;
      const officer = {
        name: name,
        firstName: fName,
        lastName: lName,
        contactNumber: contactNum,
        password: lName,
        accountType: 'Officer'
      };
      context.commit('addOfficer', officer);
    } else {
      alert('something wrong in paylaod!');
    }
  }
};

export default actions;
