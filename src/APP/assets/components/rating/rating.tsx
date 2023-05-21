import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { RatingProps } from './ratingProps';

export const HalfRating:React.FC<RatingProps> = (props) => {
  return (
    <Stack spacing={0.5}>
      <Rating name="size-small" defaultValue={props.rating} color="#fbfd0f" precision={0.5} readOnly />
    </Stack>
  )
}

export const HalfRatingMutalvel:React.FC<RatingProps> = (props) => {
    return (
      <Stack spacing={1}>
        <Rating name="half-rating" defaultValue={props.rating} precision={0.5} />
      </Stack>
    )
  }