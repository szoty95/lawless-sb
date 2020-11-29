import { Box, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import { useHistory } from 'react-router';
import Preview from './Preview';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 345,
    margin: 32,
    cursor: 'pointer',
    display: (show) => (show ? '' : 'none'),
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    bottom: '345px',
    position: 'relative',
    zIndex: 1000,
  },

  mediaFooter: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});

interface Props {
  title: string;
  createdBy: string;
  id: number;
  price: number;
  show: boolean;
}

const CaffCard: React.FC<Props> = ({ id, title, createdBy, price, show }) => {
  const styles = useStyles(show);
  const history = useHistory();
  return (
    <Card className={styles.root} onClick={() => history.push(`/animation/${id}`)}>
      <Preview height={345} width={345} id={id} />
      <Box className={styles.container}>
        <Box className={styles.mediaFooter}>
          <Typography variant="h4">{title}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography>{createdBy}</Typography>
            <Typography variant="h4">{price}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CaffCard;
