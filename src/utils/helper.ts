import { fabric } from 'fabric';

export function createText(content: string, options: any) {
  const text = new fabric.Textbox(content, {
    left: 20,
    top: 20,
    fontSize: 18,
    fill: '#ff0000',
    editable: true,
    lockUniScaling: true,
    borderColor: '#1890ff',
    cornerColor: '#1890ff',
    ...options,
  });

  window.canvas.add(text);
  window.canvas.setActiveObject(text);
}
