import React, { Component } from 'react';
import { Row, Col, Tabs, Button, Modal, Spin } from 'antd';
import PropTypes from 'prop-types';
import Attribute from '../components/EditorTabPane/Attribute';
import Canvas from '../components/Canvas';
import styles from './index.less';

export class Index extends Component {
  static propTypes: object = {};

  state = { visible: false };

  componentDidMount() {}

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Row className={styles.container}>
          <Col lg={10}>
            <Canvas />
          </Col>
          <Col lg={14}>
            <Tabs style={{ height: 420 }} defaultActiveKey="1">
              <Tabs.TabPane tab="图片属性" key="1">
                <Attribute />
              </Tabs.TabPane>
              <Tabs.TabPane tab="GIF滤镜" key="3">
                Content of Tab Pane 3
              </Tabs.TabPane>
              <Tabs.TabPane tab="文字动效" key="4">
                Content of Tab Pane 2
              </Tabs.TabPane>
              <Tabs.TabPane tab="贴纸水印" key="5">
                Content of Tab Pane 3
              </Tabs.TabPane>
            </Tabs>
            <Button
              className={styles.btnGenerator}
              onClick={this.showModal}
              type="primary"
              block
              size="large"
            >
              生成GIF
            </Button>
          </Col>
        </Row>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className={styles.preview}>
            <Spin tip="生成GIF中..." />
            <img className={styles.preview__img} src="" alt="" />
          </div>
        </Modal>
      </>
    );
  }
}

export default Index;
