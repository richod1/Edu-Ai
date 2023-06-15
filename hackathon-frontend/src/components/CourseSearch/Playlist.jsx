import './Playlist.css'


function Playlist(video) {
  //console.log(playlist.playlist.id)
  return (
    <tr>
      <th>
        <iframe 
          width="230" 
          height="150" 
          src={"https://www.youtube.com/embed/"+video.id}
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </th>
      <th className='info'>
        <div>
          <p>{video.title}</p>
          <p>{video.description}</p>
        </div>
      </th>
    </tr>
  )
}

export default Playlist;

/*

          <a href={'/course?id='+playlist.playlist.id.playlistId}><span className='linkspan'></span></a>
        <iframe
          width='230'
          height='150'
          src={'https://www.youtube.com/embed/videoseries?list='+playlist.playlist.id.playlistId}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen>
        </iframe>
*/