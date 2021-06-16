export interface OfficerStateInterface {
  officers: { [key: string]: string }[];
}

function state(): OfficerStateInterface {
  return {
    officers: [
      {
        name: '2015',
        firstName: 'Abs',
        lastName: 'Talib',
        contactNumber: '0999999999',
        password: 'Talib',
        accountType: 'Admin'
      }
    ]
  };
}

export default state;
