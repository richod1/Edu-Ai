// import { Button, Typography } from "@material-ui/core"
import Button from "@mui/material/Button"
import Typography  from "@mui/material/Typography"
import './HomePage.css'



function HomePage() {
  return (
    <div className='content'>
      <img src='icon.png'/>
      <br />

      <Typography variant='overline'>
        <p style={{fontSize: '23px'}}>
          Welcome Back. Use the Navigation Bar at the top of the page to begin.
        </p>
      </Typography>

      <Typography variant='caption' style={{position: 'absolute', bottom: '0%', left: '0%'}}>
{/* get  footer here*/}
      </Typography>
    </div>
  )
}

export default HomePage;