import { createGIF } from '../utils/utils';
import { createText } from '../utils/helper';

export default {
  namespace: 'global',

  state: {
    gifFile: '',
    texts: [],
    markOptions: [],
    options: {},
    activeObject: null,
  },

  subscriptions: {},

  effects: {
    *generateGIF({ payload }: any) {
      try {
        const result = yield createGIF(payload, {});
      } catch (e) {}
    },
  },

  reducers: {
    saveGIF(state: any, { payload }: any) {
      return { ...state, currentHref: payload };
    },

    saveActiveObject(state: any, { payload }: any) {
      return { ...state, activeObject: payload };
    },

    saveAttributeOptions(state: any, { payload }: any) {
      return { ...state, options: payload };
    },

    addText(state: any, { payload }: any) {
      createText(payload.content, payload.options);
      state.texts.push(payload);
      return { ...state, texts: state.texts, activeObject: window.canvas.getActiveObject() };
    },

    setTextOptions(state: any, { payload }: any) {
      return { ...state, texts: payload };
    },
  },
};
