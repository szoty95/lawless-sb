import { Box, Card, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 345,
    margin: 32,
    cursor: "pointer",
  },

  media: {
    width: "100%",
    height: "100%",
  },

  mediaFooter: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

interface Props {
  title: string;
  createdBy: string;
  id: number;
}

const CaffCard: React.FC<Props> = ({ id, title, createdBy }) => {
  const styles = useStyles();
  const history = useHistory();
  return (
    <Card className={styles.root} onClick={() => history.push(`/caffs/${id}`)}>
      <CardMedia
        image="https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg?w=590&h=800&62C6A28D-D2CA-4635-AA7017C94E6DDB72"
        title={title}
        className={styles.media}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          height="100%"
        >
          <Box className={styles.mediaFooter}>
            <Typography variant="h4">{title}</Typography>
            <Typography>{createdBy}</Typography>
          </Box>
        </Box>
      </CardMedia>
    </Card>
  );
};

export default CaffCard;
