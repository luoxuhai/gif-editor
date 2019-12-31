import { setCanvasText } from '../utils/helper';

export default {
  namespace: 'global',

  state: {
    GIFInfo: { name: '', width: 420, height: 420, outWidth: 360, quality: 10, interval: 41 },
    GIFOptions: {
      filter: {
        filterObject: null,
        css: 'none',
      },
    },
    activeObject: null,
    images: [],
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

    saveGIFImages(state: any, { payload: { images, canvasImages } }: any) {
      return {
        ...state,
        images: images || state.images,
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
        images: [],
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
