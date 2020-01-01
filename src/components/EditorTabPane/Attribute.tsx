import React, { Component } from 'react';
import { Slider, Select, Button } from 'antd';
import { connect } from 'dva';
import styles from './Attribute.less';

const marks: any = {
  0.25: '0.25x',
  1: '1x',
  2: '2x',
  3: '3x',
};

const measures: any[] = [
  {
    title: '240P(适合表情分享)',
    width: 240,
  },
  {
    title: '360P(适合公众号素材)',
    width: 360,
  },
  {
    title: '720P(适合高清海报)',
    width: 720,
  },
  {
    title: '原图尺寸(最大1280P)',
    width: 1280,
  },
];

const qualitys: any[] = [
  {
    title: '压缩',
    value: 500,
  },
  {
    title: '标清',
    value: 250,
  },
  {
    title: '高清',
    value: 10,
  },
  {
    title: '原图',
    value: 1,
  },
];

const playEffects: any[] = [
  {
    title: '正常',
    playEffect: 'normal',
  },
  {
    title: '倒放',
    playEffect: 'upend',
  },
];

export default connect(({ global }: any) => ({ ...global }))(
  ({ canvasImages, GIFInfo, speed, dispatch }: Props): JSX.Element => {
    let i: number = 0;
    function drawerGIFInterval() {
      if (i >= canvasImages.length) i = 0;
      // TODO: 防止闪烁
      for (const index of canvasImages.keys()) {
        let visible: boolean = false;
        if (index === i) visible = true;
        canvasImages[index].setOptions({
          visible,
        });
      }
      i++;

      try {
        window.canvas?.renderAll();
      } catch (e) {}
    }

    function handleChangeSpeed(speed: number) {
      dispatch({
        type: 'global/setSpeed',
        payload: speed,
      });

      clearInterval(window.interval);
      window.interval = setInterval(drawerGIFInterval, GIFInfo.interval / speed);
    }

    function handlePlayEffectClick(playEffect: string) {
      dispatch({
        type: 'global/saveGIFInfo',
        payload: { playEffect },
      });
      dispatch({
        type: 'global/saveGIFImages',
        payload: { canvasImages: canvasImages.reverse() },
      });

      clearInterval(window.interval);
      window.interval = setInterval(drawerGIFInterval, GIFInfo.interval / speed);
    }

    measures[3].width = GIFInfo.width;

    return (
      <div className={styles.attribute}>
        <div className={styles.speedSlider}>
          <h3>播放速度</h3>
          <Slider
            onChange={handleChangeSpeed}
            value={speed}
            min={0.25}
            max={3}
            step={0.25}
            marks={marks}
            tipFormatter={(val: any) => `${val} x`}
          />
        </div>

        <div className={styles.select}>
          {/* FIXME: 尺寸选择 */}
          <div className={styles.measure}>
            <h3>尺寸选择</h3>
            <Select
              onSelect={(outWidth: number) =>
                dispatch({
                  type: 'global/saveGIFInfo',
                  payload: { outWidth },
                })
              }
              value={GIFInfo.outWidth}
              style={{ width: 180 }}
            >
              {measures.map(measure => (
                <Select.Option value={measure.width} key={measure.title}>
                  {measure.title}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <h3>画质选择</h3>
            <Select
              onSelect={(quality: number) =>
                dispatch({
                  type: 'global/saveGIFInfo',
                  payload: { quality },
                })
              }
              defaultValue={250}
              style={{ width: 120 }}
            >
              {qualitys.map(quality => (
                <Select.Option value={quality.value} key={quality.value}>
                  {quality.title}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <h3>播放效果</h3>
        <div>
          <ul className={styles.playEffect__list}>
            {playEffects.map(item => (
              <li
                className={styles.playEffect__item}
                style={{
                  backgroundColor:
                    GIFInfo.playEffect === item.playEffect ? 'var(--antd-wave-shadow-color)' : '',
                }}
                onClick={() => handlePlayEffectClick(item.playEffect)}
                key={item.playEffect}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
