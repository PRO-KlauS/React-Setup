const getToken = async () => {
  try {
    const token = await localStorage.getItem('TOKEN');
    return token || '';
  } catch (e) {
    return e;
  }
};

const saveToken = async (token) => {
  try {
    await localStorage.setItem('TOKEN', token);
  } catch (e) {
    return e;
  }
};

const removeToken = async () => {
  try {
    await localStorage.removeItem('TOKEN');
  } catch (e) {
    return e;
  }
};

export { getToken, saveToken, removeToken };
