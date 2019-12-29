import React, { useState } from 'react';
import { Button, Popover, Select, Upload, Icon } from 'antd';
import { SketchPicker } from 'react-color';
import { connect } from 'dva';
import styles from './Text.less';

export default connect(({ global }: any) => ({
  ...global,
}))(
  ({ texts, dispatch }: Props): JSX.Element => {
    const [color, setColor] = useState('#f00');

    function handleChangeColor(color: any) {
      setColor(color.hex);
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

    return (
      <div className={styles.textWrapper}>
        <Button onClick={handleAddText} type="primary" icon="plus">
          添加文字
        </Button>
        <Button style={{ marginLeft: 20 }} type="danger" icon="delete">
          删除
        </Button>

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
              <div className={styles.colorPicker} style={{ backgroundColor: color }} />
            </Popover>
          </div>
        </div>
        <div className={styles.text__font}>
          <h3>字体</h3>
          <Select className={styles.font__select} defaultValue="lucy" style={{ width: 180 }}>
            <Select.Option value="jack">默认</Select.Option>
            <Select.Option value="lucy">宋体</Select.Option>
            <Select.Option value="jack">楷体</Select.Option>
            <Select.Option value="jack">宋体</Select.Option>
          </Select>
          <Upload multiple={false}>
            <Button className={styles.uploadLine} type="primary">
              <Icon type="upload" />
              本地字体
            </Button>
          </Upload>
        </div>
        <div className={styles.text__effect}>
          <h3>字体动效</h3>
          <ul className={styles.effect__list}>
            <li className={styles.effect__item}>无</li>
            <li className={styles.effect__item}>缩放</li>
            <li className={styles.effect__item}>闪烁</li>
            <li className={styles.effect__item}>抖动</li>
          </ul>
        </div>
      </div>
    );
  },
);
