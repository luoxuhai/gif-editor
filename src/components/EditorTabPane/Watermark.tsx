import React from 'react';
import { Button, Upload, Icon, message } from 'antd';
import { connect } from 'dva';
import { setCanvasImage } from '../../utils/helper';
import styles from './Watermark.less';

const watermarks: Array<string> = [
  require('../../assets/56dbfbd8-3ddf-4be3-9037-e23d8f6a748d_medium_thumb.jpg'),
  require('../../assets/f915ebfe-b410-4fa5-99dd-a0e387293666_medium_thumb.jpg'),
  require('../../assets/c910a066-4927-4039-835f-b559ee2dd066_medium_thumb.jpg'),
  require('../../assets/0cef5f7c-eb4d-4923-ab58-9b9bde50a1e6_medium_thumb.png'),
  require('../../assets/de4fccf4-39f9-4cdf-a44f-5d32a5e1900a_medium_thumb.jpg'),
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

    function handleUploadImage(file: File) {
      if (!/(\.*.jpg$)|(\.*.jpeg$)|(\.*.png$)|(\.*.bmp$)|(\.*.tif$)|(\.*.tiff$)/i.test(file.name)) {
        message.error({
          content: '仅支持jpg/jpeg/png/bmp/tif/tiff格式',
        });
        return false;
      }

      setCanvasImage(URL.createObjectURL(file));
      message.success({ content: '加载成功' });
      return false;
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
          <Upload
            showUploadList={false}
            beforeUpload={handleUploadImage}
            accept=".jpg, .jpeg, .png, .bmp, .tif, .tiff"
          >
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
