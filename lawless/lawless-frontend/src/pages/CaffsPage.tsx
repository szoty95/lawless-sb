import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import CaffCard from '../components/CaffCard';

import Page from './Page';

const testData = [
  {
    id: 1,
    title: 'asd',
    createdBy: 'Alma Korte',
  },

  {
    id: 2,
    title: 'flavio',
    createdBy: 'orte',
  },

  {
    id: 3,
    title: 'cincin',
    createdBy: 'Alma Korte',
  },

  {
    id: 4,
    title: 'asd',
    createdBy: 'Alma Korte',
  },

  {
    id: 5,
    title: 'asd',
    createdBy: 'béta',
  },

  {
    id: 6,
    title: 'cékla',
    createdBy: 'barack Korte',
  },

  {
    id: 7,
    title: 'iphone',
    createdBy: 'uuid la',
  },

  {
    id: 8,
    title: 'asd',
    createdBy: 'Alma Korte',
  },

  {
    id: 9,
    title: 'baka',
    createdBy: 'bakas Korte',
  },

  {
    id: 10,
    title: 'bala',
    createdBy: 'la Korte',
  },

  {
    id: 11,
    title: 'is',
    createdBy: 'Alma Korte',
  },

  {
    id: 12,
    title: 'baba',
    createdBy: 'baba',
  },
];

const CaffsPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const filterdCaffs = testData.filter(
    (data) =>
      data.createdBy.toLowerCase().includes(filter.toLowerCase()) ||
      data.title.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Page title="">
      <Box display="flex" alignItems="center" flexDirection="column" flex={1}>
        <Box marginTop={4}>
          <TextField value={filter} onChange={(e) => setFilter(e.target.value)} label="Keresés" variant="outlined" />
        </Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {testData.map((card) => (
            <CaffCard
              key={card.id}
              id={card.id}
              title={card.title}
              createdBy={card.createdBy}
              show={filterdCaffs.includes(card)}
            />
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default CaffsPage;
