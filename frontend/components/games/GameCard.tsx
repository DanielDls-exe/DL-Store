import React, { useMemo, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardContent, Button, Typography, makeStyles } from '@material-ui/core';
import { CartContext } from '../../lib/context/CartContext';

export interface GameInterface {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  releaseDate: string;
  developer: string;
  genre: string; // Añadido el campo de género
  video: string;
}

const useStyles = makeStyles({
  card: {
    maxWidth: 275,
  },
  mediaContainer: {
    height: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  media: {
    width: '100%',
    position: 'absolute',
    top: '0',
    transition: 'top 0.5s ease-in-out',
    '&:hover': {
      top: '-50px',
    },
  },
  bold: {
    fontWeight: 'bold',
  },
});

export const GameCard: React.FC<{ game: GameInterface }> = ({ game }) => {
  const classes = useStyles();
  const { _id, title, description, img, price, releaseDate, developer, genre } = game;
  const { dispatch } = useContext(CartContext);
  const router = useRouter();

  const handleAddToCart = () => {
    console.log('Adding to cart:', game); 
    dispatch({ type: 'ADD_ITEM', item: game });
  };
  

  const formattedReleaseDate = useMemo(() => {
    const date = new Date(releaseDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }, [releaseDate]);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link href={`/games/${_id}`} passHref>
          <div className={classes.mediaContainer}>
            <img className={classes.media} alt={title} src={img} />
          </div>
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="subtitle2">
            <span className={classes.bold}>Developer:</span> {developer}
          </Typography>
          <Typography variant="subtitle2">
            <span className={classes.bold}>Release Date:</span> {formattedReleaseDate}
          </Typography>
          <Typography variant="subtitle2">
            <span className={classes.bold}>Price:</span> ${price.toFixed(2)}
          </Typography>
          <Typography variant="subtitle2">
            <span className={classes.bold}>Genre:</span> {genre} 
          </Typography>
        </CardContent>
      </CardActionArea>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Link href={`/games/${_id}`} passHref>
          <Button variant="outlined" color="primary">
            View More
          </Button>
        </Link>
      </div>
    </Card>
  );
};
