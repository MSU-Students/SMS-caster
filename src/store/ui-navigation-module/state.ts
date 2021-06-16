export interface UINavModule {
  isShow: boolean;
  adminLoggedIn: boolean;
}

function state(): UINavModule {
  return {
    isShow: false,
    adminLoggedIn: false
  };
}

export default state;
