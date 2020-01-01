import { fabric } from 'fabric';

/**
 * 设置文本
 *
 * @param {*} [options=null] 配置
 * @param {string} [content=''] 内容
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

  const { canvas } = window;

  // 删除文本
  if (!options && !content) {
    // 清除遗留定时器
    clearInterval(canvas?.getActiveObject()?.animateInterval);
    canvas?.remove(canvas?.getActiveObject());
    return;
  }

  // 新增文本
  if (content) {
    const text = new fabric.Textbox(content, {
      ...defaultOptions,
      ...options,
    });
    canvas?.add(text)?.setActiveObject(text);
  } else {
    // 修改文本
    canvas?.getActiveObject()?.setOptions(options);
    try {
      canvas?.renderAll();
    } catch (e) {}
  }
}

/**
 * 设置图片
 *
 * @param {string} [src=''] 图片资源
 */
export function setCanvasImage(src: string = '') {
  const { canvas, g_app } = window;
  if (src) {
    // 新增图片
    fabric.Image.fromURL(
      src,
      (oImg: any) => {
        canvas?.add(oImg)?.setActiveObject(oImg);
        g_app._store.dispatch({
          type: 'global/saveActiveObject',
          payload: canvas?.getActiveObject(),
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
  } else canvas?.remove(canvas?.getActiveObject());
}
