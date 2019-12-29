import React from 'react';
import { Button, Upload, Icon } from 'antd';
import styles from './Watermark.less';

interface Props {}

const watermarks: Array<string> = [
  require('../../assets/HMPcMDDHzqXH5VhLy6Y880TlFWxHnjFD.png'),
  require('../../assets/6xLqZTO3Jv5eXbZtbyKblGUbE69giIWh.png'),
  require('../../assets/fCrr5jm1m4OEsauFfXNptLxE4ltjrWvS.png'),
  require('../../assets/FXcllDAiQJHeX8nZCnYMfqIo9Hyc5jWt.png'),
  require('../../assets/JHf6pzeI6gme7yKoRntjUNTPmuyeusCT.png'),
  require('../../assets/y5pp5nUYHvZYr8ONtumKGkC2G9z8VWz5.png'),
  require('../../assets/YAIZYrcau4THNJs8VgvmQ8Pd57DUHE19.png'),
  require('../../assets/WOWRh2f1BsSrh1ysRsyDGhjPLY2Tfeh8.png'),
];

function Watermark({}: Props): JSX.Element {
  return (
    <div className={styles.watermark}>
      <div>
        <h3>内置贴纸</h3>
        <ul className={styles.watermark_list}>
          {watermarks.map((item, index) => (
            <li className={styles.watermark__item} key={index}>
              <img src={item} alt="贴纸" />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>自定义贴纸</h3>
        <Upload multiple={false}>
          <Button className={styles.uploadLine} type="primary">
            <Icon type="upload" />
            点击上传图片
          </Button>
        </Upload>
      </div>
    </div>
  );
}

export default Watermark;
