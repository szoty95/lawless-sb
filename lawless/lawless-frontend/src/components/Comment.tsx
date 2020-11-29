import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

interface IComment {
  text: string;
  createdBy: string;
  createdAt: string;
}

interface CommentProps {
  comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Card raised>
      <CardContent>
        <Typography>{comment.text}</Typography>
        <Grid container direction="column" alignItems="flex-end">
          <Typography variant="subtitle1">{comment.createdBy}</Typography>
          <Typography variant="caption">{comment.createdAt}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Comment;
