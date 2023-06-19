import { Button, TextField, Typography, Grid, Switch } from "@mui/material"
// import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react"

function Feedback(props) {
  const [understood, setUnderstood] = useState(null)
  const [feedback, setFeedback] = useState(null)
  var onChangeFeedback = (e)  => {
    console.log(e.target.value)
    setFeedback(e.target.value)
  }
  var understoodYes = () => {
    setUnderstood(true)
  }
  var understoodNo = () => {
    setUnderstood(false)
  }
  var submitFeedback = () => {
    props.onSubmitFeedback(understood, feedback)
  }
  return (
    <div>
      <Typography>
        Answer the following in order to move on to the next video.
      </Typography>
      <Grid component='label' container spacing={1}>
        <Grid item>
          <Typography variant='caption'>
            Did you understand this material?
          </Typography>
        </Grid>
        <Grid item><Button onClick={understoodYes}><CheckIcon /></Button></Grid>
        <Grid item><Button onClick={understoodNo}><ClearIcon /></Button></Grid>
      </Grid>
      <br />
      {(understood == false) ? 
        <div>
          <Typography>
            We're sorry to hear that - what was confusing?
          </Typography>
        </div> :
        ((understood == true) ? 
        <div>
          <Typography>
            That's great! Any comments?
          </Typography>
        </div> :
        <p></p>)
      }
      {(understood != null) ? 
        <TextField onChange={onChangeFeedback}/> :
        <p></p>
      }
      <br />
      {(understood == true || (understood == false && feedback != null)) ? 
        <Button onClick={submitFeedback}>
          <KeyboardReturnIcon />
          Move on!
        </Button> :
        <p></p>
      }
    </div>
  )
}

export default Feedback;