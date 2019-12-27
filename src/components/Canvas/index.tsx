import React, { useState, useEffect } from 'react';
import { Upload, Icon, Button, message, Spin } from 'antd';
import { fabric } from 'fabric';
import Libgif from 'libgif';
import { canvasToFile } from '../../utils/utils';
import styles from './index.less';

export default function Canvas() {
  const [file, setFile]: any = useState(null);
  let imgList: Array<any> = [];
  let canvas: any = null;

  function drawerGIF(): void {
    message.success({ content: '加载完成!', key: 'updatable', duration: 2 });
    let i: number = 0;

    setInterval(() => {
      if (i >= imgList.length) i = 0;
      fabric.Image.fromURL(
        imgList[i++].url,
        oImg => {
          canvas.add(oImg);
        },
        {
          centeredScaling: true,
          selectable: false,
        },
      );
    }, 200);
  }

  function initCanvas(): void {
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'rgb(43,45,55)',
      selectionColor: 'rgba(0,160,233,0.5)',
      selectionLineWidth: 1,
    });
  }

  function resolveGIF(source: File): void {
    const imgEl = document.createElement('img');
    // gif库需要img标签配置下面两个属性
    imgEl.setAttribute('rel:animated_src', URL.createObjectURL(source));
    imgEl.setAttribute('rel:auto_play', '0');
    const div = document.createElement('div');
    div.appendChild(imgEl); //防止报错
    // 新建gif实例

    const gif = new Libgif({ gif: imgEl });
    gif.load(() => {
      for (let i: number = 1; i <= gif.get_length(); i++) {
        // 遍历gif实例的每一帧
        gif.move_to(i);
        const file = canvasToFile(gif.get_canvas(), `gif-${i}`);
        // 将每一帧的canvas转换成file对象
        imgList.push({
          name: file.name,
          url: URL.createObjectURL(file),
          file,
        });
      }
      drawerGIF();
    });
  }

  useEffect(() => {}, []);

  function handleSelectImg({ file }: any) {
    if (file.status !== 'uploading') {
      message.loading({ content: '加载中...', key: 'updatable' });
      setFile(file);
      initCanvas();
      resolveGIF(file.originFileObj);
    }
  }

  const uploadProps = { multiple: false, showUploadList: false, onChange: handleSelectImg };

  return (
    <div>
      {file ? (
        <div>
          <canvas id="canvas" width={420} height={420} />
          <Upload {...uploadProps}>
            <Button className={styles.uploadLine} type="primary" size="large">
              <Icon type="upload" />
              更换图片
            </Button>
          </Upload>
        </div>
      ) : (
        <div className={styles.upload}>
          <Upload.Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖动文件到此上传</p>
          </Upload.Dragger>
        </div>
      )}
    </div>
  );
}
