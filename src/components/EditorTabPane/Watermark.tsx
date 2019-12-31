import React from 'react';
import { Button, Upload, Icon, message } from 'antd';
import { connect } from 'dva';
import { setCanvasImage } from '../../utils/helper';
import styles from './Watermark.less';

const watermarks: Array<string> = [
  require('../../assets/HMPcMDDHzqXH5VhLy6Y880TlFWxHnjFD.png'),
  require('../../assets/6xLqZTO3Jv5eXbZtbyKblGUbE69giIWh.png'),
  require('../../assets/fCrr5jm1m4OEsauFfXNptLxE4ltjrWvS.png'),
  require('../../assets/FXcllDAiQJHeX8nZCnYMfqIo9Hyc5jWt.png'),
  require('../../assets/JHf6pzeI6gme7yKoRntjUNTPmuyeusCT.png'),
  require('../../assets/y5pp5nUYHvZYr8ONtumKGkC2G9z8VWz5.png'),
  require('../../assets/YAIZYrcau4THNJs8VgvmQ8Pd57DUHE19.png'),
  require('../../assets/WOWRh2f1BsSrh1ysRsyDGhjPLY2Tfeh8.png'),
  require('../../assets/7Vk54sptmQlX3Hb3IyWyLYZm02ACPQp2.png'),
  require('../../assets/NdTFpVM7LLmmyPVSLCYVLgzmYzWrDpEb.png'),
  require('../../assets/r5FeCCbfaHCihmECfReW9QQ9GeUIwbmd.png'),
  require('../../assets/kZNp8wH9L8iDa0iwK4gRVG2cuF5S0wEj.png'),
  require('../../assets/SGlLT8FSJq8pOROuyGq4JpPK1gvzkW6M.png'),
  require('../../assets/qzfNZbrYWke5aRD6Apt3iJQ1zLNGcY2I.png'),
  require('../../assets/oIcqat8225e3Xw2LrDpEWi24f9C9fgBh.png'),
  require('../../assets/4VYo5yIEiNdspMXliG3DREGDeoD3lCGn.png'),
  require('../../assets/jKQWQqeiDZQK7brkC0DqRuHKEKDCANIN.png'),
  require('../../assets/ZI825hsKBenxL9GtMkwMEsPwkV5C7VfP.png'),
];

export default connect(({ global }: any) => ({ ...global }))(
  ({ activeObject, dispatch }: Props): JSX.Element => {
    function handleSelectImg(src: string) {
      setCanvasImage(src);
    }

    function handleRemoveImage() {
      setCanvasImage();
      dispatch({
        type: 'global/saveActiveObject',
        payload: null,
      });
    }

    function handleUploadImage({ file }: any) {
      if (file.status !== 'uploading') {
        const { originFileObj } = file;
        if (!/(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.bmp$)/.test(originFileObj.name))
          message.error('仅支持jpg/jpeg/png/bmp格式的照片！');
        else {
          setCanvasImage(URL.createObjectURL(originFileObj));
          message.success({ content: '加载成功' });
        }
      }
    }

    return (
      <div className={styles.watermark}>
        <div>
          <Button
            style={{ marginBottom: 15 }}
            onClick={handleRemoveImage}
            disabled={activeObject?.type !== 'image'}
            type="danger"
            icon="delete"
          >
            删除
          </Button>
          <h3>内置贴纸</h3>
          <ul className={styles.watermark_list}>
            {watermarks.map((item, index) => (
              <li
                className={styles.watermark__item}
                onClick={() => handleSelectImg(item)}
                key={index}
              >
                <img src={item} alt="贴纸" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>自定义贴纸</h3>
          <Upload showUploadList={false} onChange={handleUploadImage}>
            <Button className={styles.uploadLine} type="primary">
              <Icon type="upload" />
              使用本地贴纸
            </Button>
          </Upload>
        </div>
      </div>
    );
  },
);
