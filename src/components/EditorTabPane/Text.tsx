import React, { useState } from 'react';
import { Button, Popover, Select, Upload, Icon, message } from 'antd';
import { SketchPicker } from 'react-color';
import { fabric } from 'fabric';
import { connect } from 'dva';
import { setCanvasText } from '../../utils/helper';
import styles from './Text.less';

const { util: fabricUtil } = fabric;

const defaultFont: any[] = [
  {
    name: '默认',
    fontFamily: 'default',
  },
  {
    name: '宋体',
    fontFamily: 'serif',
  },
  {
    name: '楷体',
    fontFamily: 'cursive',
  },
  {
    name: 'monospace',
    fontFamily: 'monospace',
  },
  {
    name: 'Lucida Console',
    fontFamily: '"Lucida Console"',
  },
  {
    name: 'sans-serif',
    fontFamily: 'sans-serif',
  },
];

const fontStyles: any[] = [
  {
    name: '正常',
    fontStyle: 'normal',
  },
  {
    name: '斜体',
    fontStyle: 'italic',
  },
  {
    name: '加粗',
    fontStyle: 'bold',
  },
];

export default connect(({ global }: any) => ({
  ...global,
}))(
  ({ activeObject, dispatch }: Props): JSX.Element => {
    const [color, setColor] = useState('#f00');
    const [customFont, setCustomFont]: any = useState([]);

    function handleChangeColor({ hex }: any) {
      setColor(hex);
      setCanvasText({ fill: hex });
    }

    function handleAddText() {
      dispatch({
        type: 'global/addText',
        payload: {
          content: '新增文字',
          options: {},
        },
      });
    }

    function handleRemoveText() {
      setCanvasText();
      dispatch({
        type: 'global/saveActiveObject',
        payload: null,
      });
    }

    function handleSelectFontFamily(fontFamily: string) {
      setCanvasText({ fontFamily });
      dispatch({
        type: 'global/saveActiveObject',
        payload: { ...activeObject, fontFamily },
      });
    }

    function handleUploadFont({ file }: any) {
      if (file.status !== 'uploading') {
        const { originFileObj } = file;
        if (!/(\.*.ttf$)/.test(originFileObj.name)) message.error('仅支持ttf格式的字体文件！');
        else {
          const newStyle: Element = document.createElement('style');
          const fontFamily: string = file.name.split('.')[0];

          newStyle.appendChild(
            document.createTextNode(`
            @font-face {
                font-family: "${fontFamily}";
                src: url("${URL.createObjectURL(originFileObj)}") format("truetype");
            }`),
          );
          document.head.appendChild(newStyle);

          setCustomFont([...customFont, { name: fontFamily, fontFamily }]);
          // 选中字体
          handleSelectFontFamily(fontFamily);
          message.success({ content: '加载成功' });
        }
      }
    }

    function SelectOption(fontFamily: string, name: string): JSX.Element {
      return (
        <Select.Option style={{ fontFamily }} value={fontFamily} key={name}>
          {name}
        </Select.Option>
      );
    }

    function handleTextEffectClick(_animate?: MouseEvent) {
      setInterval(() => {
        window.canvas?.getActiveObject()?.animate(
          {
            scaleX: '+=0.3',
            scaleY: '+=0.3',
          },
          {
            duration: 600,
            by: 0.3,
            onChange: window.canvas.renderAll.bind(window.canvas),
            onComplete: () => {},
          },
        );
      }, 600);
    }

    function handleSelectFontStyle(fontStyle: string) {
      let options: any = { fontWeight: 400, fontStyle };

      if (fontStyle === 'bold') options = { fontWeight: 600, fontStyle: 'normal' };

      setCanvasText(options);
      dispatch({
        type: 'global/saveActiveObject',
        payload: { ...activeObject, ...options },
      });
    }

    return (
      <div className={styles.textWrapper}>
        <Button onClick={handleAddText} type="primary" icon="plus">
          添加文字
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          onClick={handleRemoveText}
          disabled={activeObject?.type !== 'textbox'}
          type="danger"
          icon="delete"
        >
          删除
        </Button>

        <div className={styles.text__style}>
          <div className={styles.text__color}>
            <h3>颜色</h3>
            <div>
              <Popover
                placement="rightTop"
                content={
                  <SketchPicker
                    color={color}
                    onSwatchHover={handleChangeColor}
                    onChangeComplete={handleChangeColor}
                  />
                }
              >
                <div
                  className={styles.colorPicker}
                  style={{ backgroundColor: activeObject?.fill || color }}
                />
              </Popover>
            </div>
          </div>
          <div>
            <h3>风格</h3>
            <div>
              <Select
                className={styles.font__select}
                style={{ width: 100 }}
                onSelect={handleSelectFontStyle}
                value={
                  activeObject?.fontWeight === 600 ? 'bold' : activeObject?.fontStyle || 'normal'
                }
              >
                {fontStyles.map(({ fontStyle, name }: any) => (
                  <Select.Option
                    style={{ fontStyle, fontWeight: fontStyle === 'bold' ? 700 : 400 }}
                    value={fontStyle}
                    key={name}
                  >
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className={styles.text__font}>
          <h3>字体</h3>
          <Select
            className={styles.font__select}
            style={{ width: 180 }}
            onSelect={handleSelectFontFamily}
            value={activeObject?.fontFamily || 'default'}
          >
            <Select.OptGroup label="自定义字体">
              {customFont.map((font: any) => SelectOption(font.fontFamily, font.name))}
            </Select.OptGroup>
            <Select.OptGroup label="内置字体">
              {defaultFont.map(font => SelectOption(font.fontFamily, font.name))}
            </Select.OptGroup>
          </Select>
          <Upload onChange={handleUploadFont} multiple={false} showUploadList={false}>
            <Button className={styles.uploadLine} type="primary">
              <Icon type="upload" />
              本地字体
            </Button>
          </Upload>
        </div>
        <div className={styles.text__effect}>
          <h3>字体动效</h3>
          <ul className={styles.effect__list}>
            <li
              className={styles.effect__item}
              style={{ backgroundColor: 'var(--antd-wave-shadow-color)' }}
              onClick={handleTextEffectClick}
            >
              无
            </li>
            <li className={styles.effect__item} onClick={handleTextEffectClick}>
              <p>缩放</p>
            </li>
            <li className={styles.effect__item}>
              <p>闪烁</p>
            </li>
            <li className={styles.effect__item}>
              <p>抖动</p>
            </li>
          </ul>
        </div>
      </div>
    );
  },
);
