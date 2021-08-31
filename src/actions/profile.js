import { getProfile, updateProfile } from '../apis/profile';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

const setProfileData = () => (dispatch) => {
  return getProfile().then((res) => {
    if (res.data.status) {
      dispatch(profileDataAction(res.data.data.user));
    }
    return res;
  });
};

const updateProfileData = (id, body) => (dispatch) => {
  return updateProfile(id, body).then((res) => {
    if (res.data.status) {
      dispatch(profileDataAction(res.data.data.user));
    }
    return res;
  });
};

const profileDataAction = (profile) => ({
  type: SET_PROFILE_DATA,
  payload: profile,
});

export { setProfileData, updateProfileData, SET_PROFILE_DATA };
