import { setCanvasText } from '../utils/helper';

export default {
  namespace: 'global',

  state: {
    GIFInfo: {
      name: '',
      width: 420,
      height: 420,
      outWidth: 360,
      quality: 250,
      interval: 41,
      playEffect: 'normal',
    },
    GIFOptions: {
      filter: {
        filterObject: null,
        css: 'none',
      },
    },
    activeObject: null,
    canvasImages: [],
    speed: 1,
  },

  subscriptions: {},

  effects: {},

  reducers: {
    setSpeed(state: any, { payload }: any) {
      return { ...state, speed: payload };
    },

    saveGIFInfo(state: any, { payload }: any) {
      return { ...state, GIFInfo: { ...state.GIFInfo, ...payload } };
    },

    saveActiveObject(state: any, { payload }: any) {
      return { ...state, activeObject: payload };
    },

    addText(state: any, { payload }: any) {
      setCanvasText(payload.options, payload.content);
      return { ...state, activeObject: window.canvas.getActiveObject() };
    },

    saveGIFImages(state: any, { payload: { canvasImages } }: any) {
      return {
        ...state,
        canvasImages: canvasImages || state.canvasImages,
      };
    },

    setGIFOptions(state: any, { payload }: any) {
      return { ...state, GIFOptions: { ...state.GIFOptions, ...payload } };
    },

    clear(state: any) {
      return {
        ...state,
        canvasImages: [],
        GIFOptions: {
          filter: {
            filterObject: null,
            css: 'none',
          },
        },
        activeObject: null,
        speed: 1,
      };
    },
  },
};
