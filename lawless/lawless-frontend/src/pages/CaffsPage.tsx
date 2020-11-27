import React from "react";
import { Box } from "@material-ui/core";
import CaffCard from "../components/CaffCard";

import Page from "./Page";

const testData = [
  {
    id: 1,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 2,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 3,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 4,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 5,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 6,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 7,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 8,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 9,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 10,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 11,
    title: "asd",
    createdBy: "Alma Korte",
  },

  {
    id: 12,
    title: "asd",
    createdBy: "Alma Korte",
  },
];

const CaffsPage: React.FC = () => {
  return (
    <Page title="">
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {testData.map((card) => (
          <CaffCard
            key={card.id}
            id={card.id}
            title={card.title}
            createdBy={card.createdBy}
          />
        ))}
      </Box>
    </Page>
  );
};

export default CaffsPage;
