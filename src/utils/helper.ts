import { fabric } from 'fabric';

/**
 * 设置文本
 * @param options 配置
 * @param content 内容
 */
export function setCanvasText(options: any = null, content: string = '') {
  const defaultOptions = {
    left: 20,
    top: 20,
    fontSize: 18,
    fontFamily: 'default',
    fill: '#ff0000',
    editable: true,
    // lockUniScaling: true,
    borderColor: '#1890ff',
    cornerColor: '#1890ff',
  };

  // 删除文本
  if (!options && !content) {
    window.canvas?.remove(window.canvas.getActiveObject());
    return;
  }

  // 新增文本
  if (content) {
    const text = new fabric.Textbox(content, {
      ...defaultOptions,
      ...options,
    });
    window.canvas?.add(text)?.setActiveObject(text);
  } else {
    // 修改文本
    window.canvas?.getActiveObject()?.setOptions(options);
    try {
      window.canvas?.renderAll();
    } catch (e) {}
  }
}
/**
 * 设置图片
 * @param options 配置
 * @param src 内容
 */
export function setCanvasImage(src: string = '') {
  if (src) {
    // 新增图片
    fabric.Image.fromURL(
      src,
      (oImg: any) => {
        window.canvas?.add(oImg)?.setActiveObject(oImg);
        window.g_app._store.dispatch({
          type: 'global/saveActiveObject',
          payload: window.canvas?.getActiveObject(),
        });
      },
      {
        left: 300,
        top: 20,
        scaleX: 0.3,
        scaleY: 0.3,
      },
    );

    // 删除图片
  } else window.canvas?.remove(window.canvas.getActiveObject());
}
