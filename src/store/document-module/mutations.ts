import IDocument from 'src/interfaces/document.interface';
import { MutationTree } from 'vuex';
import { DocumentStateInterface } from './state';

const mutation: MutationTree<DocumentStateInterface> = {
  setacademicYear(state: DocumentStateInterface, acadYear: string[]) {
    state.acadYear = [];
    state.acadYear.push(...acadYear);
  },
  addDocument(state, result: IDocument) {
    state.documents.push(result);
  },
  updateInstTable(state: DocumentStateInterface, recipient: IDocument[]) {
    state.newDocuments = [];
    state.newDocuments.push(...recipient);
  },
  getDocuments(state, result: IDocument[]) {
    state.documents = [];
    state.documents.push(...result);
  }
};

export default mutation;
