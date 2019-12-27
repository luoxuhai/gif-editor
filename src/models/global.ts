import { createGIF } from '../utils/utils';

export default {
  namespace: 'global',

  state: {
    gifFile: '',
    options: {},
  },

  subscriptions: {},

  effects: {
    *generateGIF({ payload }: any) {
      try {
        const result = yield createGIF(payload, {});
        console.log(result);;2
      } catch (e) {}
    },
  },

  reducers: {
    saveGIF(state: object, { payload }: any) {
      return { ...state, currentHref: payload };
    },

    saveAttributeOptions(state: object, { payload }: any) {
      return { ...state, options: payload };
    },
  },
};
