import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  height: number;
  width: number;
  id: number;
}

const ShowPPM: React.FC<Props> = ({ height: h, width: w, id }) => {
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);
  const [pixels, setPixels] = useState(['']);

  const loadPPM = useCallback(() => {
    axios({
      url: 'https://raw.githubusercontent.com/szoty95/lawless-sb/webapp/lawless/src/main/resources/caff-test/pista.ppm',
      baseURL: 'https://cors-anywhere.herokuapp.com',
    }).then((response) => {
      const data = (response.data as string).split(/\r?\n/);
      setWidth(parseInt(data[1], 10));
      setHeight(parseInt(data[2], 10));
      setPixels(data.slice(4));
    });
  }, []);

  useEffect(() => {
    loadPPM();
  }, [loadPPM]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }
    if (context) {
      const imageData = context.createImageData(width, height);
      pixels.forEach((pixel, index) => {
        const pixelIndex = index * 4;
        const rgb = pixel.split(' ');
        imageData.data[pixelIndex] = parseInt(rgb[0], 10);
        imageData.data[pixelIndex + 1] = parseInt(rgb[1], 10);
        imageData.data[pixelIndex + 2] = parseInt(rgb[2], 10);
        imageData.data[pixelIndex + 3] = 255;
      });
      createImageBitmap(imageData).then((imgBitmap) => {
        context.drawImage(imgBitmap, 0, 0, 345, 345);
      });
    }
  }, [context, height, width, pixels]);

  return <canvas id={`canvas${id}`} ref={canvasRef} width={w} height={h} />;
};

export default ShowPPM;
