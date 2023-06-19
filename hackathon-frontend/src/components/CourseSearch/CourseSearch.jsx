import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Playlist from './Playlist';
import api from '../../api';
import './CourseSearch.css';

function CourseSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('');
  const [playlists, setPlaylists] = useState({ err: 0, playlists: [] });
  const [gotResults, setGotResults] = useState(false);

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const getResultsKey = (e) => {
    if (e.code === 'Enter') {
      getResults(e);
    }
  };

  const getResults = (e) => {
    console.log('Querying for \'' + query + '\'');
    api.sendQuery(query).then((lists) => {
      if (lists.status < 400) {
        setPlaylists(lists.data);
      } else {
        setPlaylists({ err: 1, playlists: [] });
        console.log('failed');
      }
      setGotResults(true);
    });
  };

  const redirectToCourses = () => {
    navigate('/courses');
  };

  return (
    <div>
      {gotResults ? redirectToCourses() : <p></p>}
      <div className='title'>
        <Container>
          <Typography variant='h6'>What do you want to learn about today?</Typography>
          <TextField onChange={onQueryChange} onKeyPress={getResultsKey} id='finder' />
          <Button onClick={getResults}><KeyboardReturnIcon /></Button>
        </Container>
        {playlists.err === 0 ? 
          <Typography>Get started by entering a search term above. A course will be generated for you.</Typography> :
          <Typography color='error'>Either nothing was found or an error occurred. Please try again.</Typography>
        }
      </div>
      <div className='courses'>
        <Container>
          <table>
            {/* {playlists.playlists.map((playlist) => {
              console.log(playlist);
              return (<Playlist key={playlist.id} playlist={playlist} />);
            })} */}
          </table>
        </Container>
      </div>
    </div>
  );
}

export default CourseSearch;
