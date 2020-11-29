import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

interface Comment {
  text: string;
  createdAt: string;
}

interface CommentProps {
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Card raised>
      <CardContent>
        <Typography>{comment.text}</Typography>
        <Grid container direction="column" alignItems="flex-end">
          <Typography variant="caption">{comment.createdAt}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Comment;
