import { useState, useRef } from 'react';
import useToast from '../../hooks/useToast';
import { img_url } from "../../pages/members/news/[news_detail]";
import { Box, TextField, Button } from '@mui/material';

type Prop = {
  submit: (submitedValue: string) => void;
};

const CommentInputWIthLabel = ({ submit }: Prop): React.ReactElement => {
  const [comment, setComment] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);
  const { notify } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) {
      notify('Please fill the comment box', 'error');
      return;
    }
    submit(comment);
    setComment('');
    if (ref.current) {
      ref.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" gap={2}>
        <img src={img_url} alt="User" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <TextField
          inputRef={ref}
          variant="outlined"
          fullWidth
          placeholder="Write a comment"
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSubmit(e);
          }}
        />
      </Box>
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>
        Comment
      </Button>
    </form>
  );
};

export default CommentInputWIthLabel;
