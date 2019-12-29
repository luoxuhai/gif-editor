import React, { useState, useEffect } from 'react';
import { Upload, Icon, Button, message, Spin } from 'antd';
import { connect } from 'dva';
import { fabric } from 'fabric';
import Libgif from 'libgif';
import { canvasToFile, containImg, loadedImg } from '../../utils/utils';
import styles from './index.less';

const CANVAS_WIDTH: number = 420;
let canvasHeight: number = CANVAS_WIDTH;

export default connect(({ global }: any) => ({ ...global }))(
  ({ dispatch }: Props): JSX.Element => {
    const [file, setFile]: any = useState(null);
    const imgOptions: any = {
      selectable: false,
      visible: false,
      originX: 'left',
      originY: 'top',
    };
    const gifInfo: any = { interval: 41 };
    let imgList: Array<any> = [];
    let interval: any = null;
    let canvasImgs: Array<any> = [];
    let i: number = 0;

    function drawerGIFInterval() {
      if (i >= imgList.length) i = 0;
      // TODO: 防止闪烁
      canvasImgs.forEach((item, index) => {
        let visible: boolean = false;
        if (index === i) visible = true;
        canvasImgs[index].setOptions({
          ...imgOptions,
          visible,
        });
      });
      i++;

      window.canvas.renderAll();
    }

    async function drawerGIF() {
      message.success({ content: '加载完成!', key: 'updatable', duration: 2 });

      canvasImgs = await Promise.all(
        imgList.map((img: any) => {
          return new Promise(resolve => {
            fabric.Image.fromURL(
              img.url,
              oImg => {
                resolve(oImg);
                window.canvas.add(oImg);
              },
              imgOptions,
            );
          });
        }),
      );

      interval = setInterval(drawerGIFInterval, gifInfo.interval);
    }

    function initCanvas(): void {
      window.canvas = new fabric.Canvas('canvas', {
        backgroundColor: 'rgb(43,45,55)',
        selectionColor: 'rgba(0,160,233,0.5)',
        selectionLineWidth: 1,
      });

      window.canvas.setHeight(canvasHeight);
      // 保存当前活动对象
      window.canvas.on('mouse:down', (e: any) => {
        dispatch({
          type: 'global/saveActiveObject',
          payload: window.canvas.getActiveObject(),
        });
      });

      // canvas.on('mouse:up:before', (e: any) => {
      //   interval = setInterval(drawerGIFInterval, 200);
      // });
    }

    async function resolveGIF(source: File) {
      const imgEl = document.createElement('img');
      // gif库需要img标签配置下面两个属性
      imgEl.setAttribute('rel:animated_src', URL.createObjectURL(source));
      imgEl.setAttribute('rel:auto_play', '0');
      const div = document.createElement('div');
      div.appendChild(imgEl); //防止报错
      // 获取原图信息
      const image = new Image();
      image.src = URL.createObjectURL(source);
      await loadedImg(image);
      const { width, height } = image;
      const scale: number = CANVAS_WIDTH / width;
      canvasHeight = (height * 420) / width;
      // TODO: 缩放图片不能修改width, height属性
      Object.assign(imgOptions, { scaleX: scale, scaleY: scale });

      const gif = new Libgif({ gif: imgEl });
      gif.load(() => {
        gifInfo.interval = gif.get_duration_ms() / gif.get_length();
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

    async function handleSelectImg({ file }: any) {
      if (file.status !== 'uploading') {
        message.loading({ content: '加载中...', key: 'updatable' });
        await resolveGIF(file.originFileObj);
        setFile(file);
        initCanvas();
      }
    }

    const uploadProps = { multiple: false, showUploadList: false, onChange: handleSelectImg };

    return (
      <div>
        {file ? (
          <div>
            <canvas id="canvas" width={CANVAS_WIDTH} height={CANVAS_WIDTH} />
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
  },
);
