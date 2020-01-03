import gifshot from 'gifshot';

export function base64ToBlob(base64: string) {
  var arr = base64.split(',');
  let mime: any = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return URL.createObjectURL(new Blob([u8arr], { type: mime }));
}

export function canvasToFile(canvas: any, filename: string): File {
  const arr = canvas.toDataURL('image/png').split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

export function createGIF(images: Array<string>, options: object): Promise<Function> {
  return new Promise((resolve, reject) => {
    gifshot.createGIF(
      {
        images,
        ...options,
      },
      (res: any) => {
        if (!res.error) resolve(res.image);
        else reject(res.error);
      },
    );
  });
}

export function loadedImg(image: any) {
  return new Promise(resolve => {
    image.onload = (e: any) => {
      resolve(e);
    };
  });
}

/**
 * @param {Number} sx 固定盒子的x坐标,sy 固定盒子的y左标
 * @param {Number} boxW 固定盒子的宽, boxH 固定盒子的高
 * @param {Number} sourceW 原图片的宽, sourceH 原图片的高
 * @return {Object} {drawImage的参数，缩放后图片的x坐标，y坐标，宽和高},对应drawImage(imageResource, dx, dy, dWidth, dHeight)
 */

export function containImg(
  sx: number,
  sy: number,
  boxW: number,
  boxH: number,
  sourceW: number,
  sourceH: number,
) {
  let dx = sx,
    dy = sy,
    dWidth = boxW,
    dHeight = boxH;
  if (sourceW > sourceH || (sourceW === sourceH && boxW < boxH)) {
    dHeight = (sourceH * dWidth) / sourceW;
    dy = sy + (boxH - dHeight) / 2;
  } else if (sourceW < sourceH || (sourceW === sourceH && boxW > boxH)) {
    dWidth = (sourceW * dHeight) / sourceH;
    dx = sx + (boxW - dWidth) / 2;
  }
  return {
    dx,
    dy,
    dWidth,
    dHeight,
  };
}

/**
 * 下载文件
 * @param {String} src 资源地址
 * @param {String} fileName 文件名
 */
export function download(src: string, fileName: string) {
  const el = document.createElement('a');
  el.href = base64ToBlob(src);
  el.download = fileName;
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

export function setTimeoutSync(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, time);
  });
}
