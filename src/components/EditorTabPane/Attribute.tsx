import React, { Component } from 'react';
import { Slider, Select } from 'antd';
import styles from './Attribute.less';
const marks: any = {
  0.25: '0.25 x',
  1: '1 x',
  2: '2 x',
  3: '3 x',
  4: '4 x',
};

class Attribute extends Component {
  state: object = {};

  render() {
    return (
      <div className={styles.attribute}>
        <div className={styles.speedSlider}>
          <h3>播放速度</h3>
          <Slider
            defaultValue={1}
            min={0.25}
            max={4}
            step={0.25}
            marks={marks}
            tipFormatter={(val: any) => `${val} x`}
          />
        </div>

        <div className={styles.select}>
          <div className={styles.measure}>
            <h3>尺寸选择</h3>
            <Select defaultValue="lucy" style={{ width: 180 }}>
              <Select.Option value="jack">240P(适合表情分享)</Select.Option>
              <Select.Option value="lucy">360P(适合公众号素材)</Select.Option>
              <Select.Option value="jack">720P(适合高清海报)</Select.Option>
              <Select.Option value="jack">原图尺寸(最大1280P)</Select.Option>
            </Select>
          </div>
          <div>
            <h3>画质选择</h3>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Select.Option value="jack">压缩</Select.Option>
              <Select.Option value="lucy">标清</Select.Option>
              <Select.Option value="jack">高清</Select.Option>
              <Select.Option value="jack">原图</Select.Option>
            </Select>
          </div>
        </div>
      </div>
    );
  }
}

export default Attribute;
