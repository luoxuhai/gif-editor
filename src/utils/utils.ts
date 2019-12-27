import gifshot from 'gifshot';

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
      (obj: any) => {
        if (!obj.error) resolve(obj.image);
        else reject(obj.error);
      },
    );
  });
}
