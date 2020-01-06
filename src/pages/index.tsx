import React, { Component } from 'react';
import { Row, Col, Tabs, Button, Modal, Spin } from 'antd';
import { connect } from 'dva';
import { fabric } from 'fabric';
import Attribute from '../components/EditorTabPane/Attribute';
import TextEffect from '../components/EditorTabPane/Text';
import Filter from '../components/EditorTabPane/Filter';
import Watermark from '../components/EditorTabPane/Watermark';
import Canvas from '../components/Canvas';
import { createGIF, download } from '../utils/utils';
import styles from './index.less';

enum Status {
  cut,
  generate,
}
interface State {
  visible: boolean;
  GIFImage: string;
  status: Status;
  progress: number;
}

@connect(({ global }: any) => ({
  ...global,
}))
class Index extends Component<Props> {
  state: State = { visible: false, GIFImage: '', progress: 0, status: Status.cut };

  tempInterval: any = null;
  i: number = 0;

  componentDidMount() {
    const catchEvent = (e: Event) => {
      if (!this.props.canvasImages.length) {
        if (e.type === 'click')
          Modal.warning({
            title: '提示',
            content: window.canvas ? '图片正在上传中, 请稍后再试!' : '请上传GIF动图!',
          });
        e.stopPropagation();
      }
    };
    document.querySelectorAll('.ant-tabs-tabpane').forEach(el => {
      el.addEventListener('click', catchEvent, true);
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });

    this.generateGIF();
  };

  handleDownload = () => {
    this.handleCancel();
    download(this.state.GIFImage, `${this.props.GIFInfo.name}-${Date.now()}.gif`);
  };

  drawerGIFInterval = () => {
    const { canvasImages } = this.props;
    if (this.i >= canvasImages.length) this.i = 0;
    // TODO: 防止闪烁
    for (const index of canvasImages.keys()) {
      let visible: boolean = false;
      if (index === this.i) visible = true;
      canvasImages[index].setOptions({
        visible,
      });
    }
    this.i++;

    try {
      window.canvas?.renderAll();
    } catch (e) {}
  };

  handleCancel = () => {
    const {
      GIFInfo: { interval },
      speed,
    } = this.props;
    this.setState({
      visible: false,
      GIFImage: '',
    });
    clearInterval(this.tempInterval);
    window.interval = setInterval(this.drawerGIFInterval, interval / speed);
  };

  generateGIF = () => {
    const {
      GIFInfo: { width, height, outWidth, interval, quality },
      speed,
      canvasImages,
    } = this.props;
    const dataImages: Array<any> = [];
    let i: number = 0;

    clearInterval(window.interval);

    this.tempInterval = setInterval(() => {
      if (i >= canvasImages.length) {
        clearInterval(this.tempInterval);
        this.setState({
          status: Status.generate,
        });
        createGIF(dataImages, {
          gifWidth: outWidth,
          gifHeight: (height * outWidth) / width,
          interval: interval / speed / 1000,
          sampleInterval: quality,
          progressCallback: (progress: number) =>
            this.setState({
              progress,
            }),
        }).then(value => {
          this.setState({
            GIFImage: value,
            progress: 0,
            status: Status.cut,
          });
          dataImages.slice(0);
        });
        return;
      }
      // TODO: 防止闪烁
      for (const index of canvasImages.keys()) {
        let visible: boolean = false;
        if (index === i) visible = true;
        canvasImages[index].set('visible', visible);
      }
      i++;

      try {
        dataImages.push(window.canvas.toDataURL());
      } catch (e) {}
    }, 40);
  };

  render() {
    const { canvasImages } = this.props;
    const { GIFImage, visible, progress, status } = this.state;
    return (
      <>
        <Row className={styles.container}>
          <Col lg={10} md={24}>
            <Canvas />
          </Col>
          <Col id="editor" className={styles.editor} lg={14} md={24}>
            <Tabs style={{ minHeight: 450 }} defaultActiveKey="1">
              <Tabs.TabPane tab="GIF属性" key="1">
                <Attribute />
              </Tabs.TabPane>
              <Tabs.TabPane tab="GIF滤镜" key="3">
                <Filter />
              </Tabs.TabPane>
              <Tabs.TabPane tab="文字动效" key="4">
                <TextEffect />
              </Tabs.TabPane>
              <Tabs.TabPane tab="贴纸水印" key="5">
                <Watermark />
              </Tabs.TabPane>
            </Tabs>
            <Button
              className={styles.btnGenerator}
              onClick={this.showModal}
              disabled={!canvasImages.length}
              type="primary"
              block
              size="large"
            >
              导出GIF动图
            </Button>
          </Col>
        </Row>
        <Modal
          title="预览"
          visible={visible}
          onOk={this.handleDownload}
          onCancel={this.handleCancel}
          okText="下载"
          cancelText="取消"
          confirmLoading={!GIFImage}
          destroyOnClose
        >
          <div className={styles.preview}>
            {GIFImage ? (
              <img className={styles.preview__img} src={GIFImage} />
            ) : (
              <Spin
                tip={
                  status === Status.cut
                    ? '截取图片中...'
                    : `生成GIF中 ${(progress * 100).toFixed()}%`
                }
              />
            )}
          </div>
        </Modal>
      </>
    );
  }
}

export default Index;
