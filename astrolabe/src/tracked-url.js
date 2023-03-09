import {
  createStorage,
  getValue,
  setValue,
} from 'ember-tracked-storage-polyfill';

export default class TrackedURL {

  constructor(url, base) {
    let clone = new URL(url, base);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;

    return new Proxy(clone, {
      get(target, prop) {
        self.#readStorageFor(prop);

        return target[prop];
      },

      has(target, prop) {
        self.#readStorageFor(prop);

        return prop in target;
      },

      ownKeys(target) {
        getValue(self.#collection);

        return Reflect.ownKeys(target);
      },

      set(target, prop, value) {
        target[prop] = value;

        self.#dirtyStorageFor(prop);
        self.#dirtyCollection();

        return true;
      },

      deleteProperty(target, prop) {
        if (prop in target) {
          delete target[prop];
          self.#dirtyStorageFor(prop);
          self.#dirtyCollection();
        }

        return true;
      },

      getPrototypeOf() {
        return URL.prototype;
      },
    });
  }

  #storages = new Map();

  #collection = createStorage(null, () => false);

  #readStorageFor(key) {
    let storage = this.#storages.get(key);

    if (storage === undefined) {
      storage = createStorage(null, () => false);
      this.#storages.set(key, storage);
    }

    getValue(storage);
  }

  #dirtyStorageFor(key) {
    const storage = this.#storages.get(key);

    if (storage) {
      setValue(storage, null);
    }
  }

  #dirtyCollection() {
    setValue(this.#collection, null);
  }
}
