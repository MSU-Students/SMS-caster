import { MutationTree } from 'vuex';
import { DocumentStateInterface } from './state';

const mutation: MutationTree<DocumentStateInterface> = {
  addDocument(state, result) {
    console.log(result);
    state.documents.push(result.data);
  },
  getDocuments(state, result) {
    state.documents.push(...result);
  }
};

export default mutation;