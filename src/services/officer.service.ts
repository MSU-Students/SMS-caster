import { OfficerControllerApi, Configuration, OfficersReq as IOfficer } from './rest-api';

const dev = 'http://localhost:9000';

const restConfig = new Configuration({
  basePath: dev,
  baseOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

const restApi = new OfficerControllerApi(restConfig);

class OfficerService extends OfficerControllerApi {
  async getAll() {
    const response = await restApi.getOfficers();
    return response.data;
  }

  async insert(payload: IOfficer) {
    const response = await restApi.addAccount(payload);
    return response.data;
  }
  async update(payload: IOfficer) {
    const response = await restApi.updateOfficer(payload._id as string, payload);
    console.log(response)
    return response.data;
  }
  async delete(payload: IOfficer) {
    const response = await restApi.deleteOfficer(payload._id as string, payload);
    console.log(response)
    return response.data;
  }

}

const documentService = new OfficerService();
export default documentService;
