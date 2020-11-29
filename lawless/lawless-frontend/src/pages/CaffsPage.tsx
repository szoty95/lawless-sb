import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@material-ui/core';

import Page from './Page';
import CaffCard from '../components/CaffCard';
import useAnimationsList from '../hooks/useAnimationsList';

const CaffsPage: React.FC = () => {
  const [result, getAnnimationsList] = useAnimationsList();

  useEffect(() => {
    getAnnimationsList({});
  }, [getAnnimationsList]);

  const annimationsList = result.data?.detailsAllCaffResponse || [];
  const [filter, setFilter] = useState('');
  const filterdCaffs = annimationsList.filter(
    (data) =>
      data.name?.toLowerCase().includes(filter.toLowerCase()) ||
      data.description?.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Page title="">
      <Box display="flex" alignItems="center" flexDirection="column" flex={1}>
        <Box marginTop={4}>
          <TextField value={filter} onChange={(e) => setFilter(e.target.value)} label="Keresés" variant="outlined" />
        </Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {annimationsList.map((card) => (
            <CaffCard
              key={card.id}
              id={card.id || 0}
              title={card.name || ''}
              createdBy={card.userPersonalData?.username || ''}
              price={card.price || 0}
              show={filterdCaffs.includes(card)}
            />
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default CaffsPage;
