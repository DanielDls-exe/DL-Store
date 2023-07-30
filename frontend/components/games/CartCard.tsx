import { Card, CardMedia, CardContent, Typography, IconButton, makeStyles } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 50,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
});

const CartCard = ({ item, onRemove, onAdd }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cover} image={item.img} title={item.title} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="subtitle1">Price: ${item.price.toFixed(2)}</Typography>
          <Typography variant="subtitle2">Quantity: {item.quantity}</Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton color="primary" onClick={() => onAdd(item._id)}>
            <AddIcon />
          </IconButton>
          <Typography variant="subtitle2">${(item.price * item.quantity).toFixed(2)}</Typography>
          <IconButton color="secondary" onClick={() => onRemove(item._id)}>
            <RemoveIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default CartCard;
