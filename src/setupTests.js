import '@testing-library/jest-dom/extend-expect';

window.scrollTo = jest.fn();
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

const localStorage = new LocalStorageMock();

Object.defineProperty(window, 'localStorage', {
  value: localStorage,
});

window.matchMedia = window.matchMedia
  || function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
