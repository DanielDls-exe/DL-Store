import { useRouter } from 'next/router';
import useSWR from 'swr';
import { GameInterface } from '@/types/game';
import { Typography, Card, CardContent } from '@material-ui/core';
import { backendFetcher } from '../../lib/api/api_main'; 
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start', 
  },
  coverImage: {
    width: '30%',
    height: '100vh',
  },
  content: {
    width: '70%', 
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
    marginTop: -40, 
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3), 
  },
  video: {
    width: '100%',
    height: '450px',
  },
}));


const GamePage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { data: game, error } = useSWR<GameInterface>(id ? `/games/${id}` : null, backendFetcher);

  if (error) return <div>Error loading game.</div>;
  if (!game) return <div>Loading...</div>;

  return (
    <div className={classes.container}>
      <img src={game.img} alt={game.title} className={classes.coverImage} />
      <div className={classes.content}>
        <Typography variant="h2" className={classes.title}>{game.title}</Typography>
        <Typography variant="subtitle1" className={classes.description}>{game.description}</Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>Developer: {game.developer}</Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>Release Date: {game.releaseDate}</Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>Price: ${game.price.toFixed(2)}</Typography>
        <div className={classes.video}>
          <iframe src={game.video} title="Trailer" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

