import React , { useState,useEffect } from 'react';
import { Container , Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
// import ChipInput from 'material-ui-chip-input';
// import Pagination from '../Pagination/pagination';
import Form from '../Form/Form';
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }
const Home = () => {
  const classes = useStyles();
  // const query = useQuery();
  // const navigate = useNavigate();
  // const location = useLocation();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  // const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');
  // const [search, setSearch] = useState('');
  // const [tags, setTags] = useState([]);
  useEffect(()=> {
    dispatch(getPosts());
  }, [currentId,dispatch]);

  // const searchPost = () => {
  //   if (search.trim() || tags) {
  //     dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
  //     navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
  //   } else {
  //     navigate('/');
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     searchPost();
  //   }
  // };
  // const handleAddChip = (tag) => setTags([...tags, tag]);
  //
  // const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
            <Container maxwidth="xl">
              <Grid container  justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                      <Grid item xs={12} sm={6} md={9}>
                           <Posts setCurrentId={setCurrentId}/>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>

                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                      </Grid>

              </Grid>
            </Container>
          </Grow>
  )
}

export default Home
