import React, { useEffect } from 'react';
import usePreview from '../hooks/usePreview';

interface Props {
  height: number;
  width: number;
  id: number;
}

const Preview: React.FC<Props> = ({ height: h, width: w, id }) => {
  const [response, getPreview] = usePreview();
  useEffect(() => {
    getPreview({ data: { id } });
  }, [getPreview, id]);

  if (!response) {
    return <></>;
  }

  return <img width={w} height={h} src={`data:image/jpeg;base64,${response.data?.previewPicture ?? ''}`} alt="" />;
};

export default Preview;
