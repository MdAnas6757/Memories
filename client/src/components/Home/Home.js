import React ,{useState,useEffect}from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Forms';
import Pagination from '../Paginantion';
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts,getPostsBySearch } from '../../actions/posts';
import { Grow,Grid,Container,Paper,TextField,AppBar,Button} from '@material-ui/core';
import useStyles from './styles';
function useQuery(){
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
    const query=useQuery();
    const navigate=useNavigate();
    const classes=useStyles();
    const page=query.get('page')||1;
    const searchQuery=query.get('searchQuery');
    
   const searchPost=()=>{
    if(search.trim()|| tags)
    {
       dispatch(getPostsBySearch({search,tags:tags.join(',')}));
       navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else
    {
       navigate('/');
    }
   }
    const handleKeyDown=(e)=>{
      if(e.key=== '13')
      {
           searchPost();
      } 
          
    }
    const handleAdd=(tag)=>setTags([...tags,tag]);
    const handleDelete=(tagtoDelete)=>setTags(tags.filter((tag)=>tag!==tagtoDelete));
  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField
                name="search"
                variant='outlined'
                label="Sarch Memories"
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(e) =>setSearch(e.target.value)}
                />
                <ChipInput
                style={{margin:'10px 0'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color='primary'>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6}>
                <Pagination page={page}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home
