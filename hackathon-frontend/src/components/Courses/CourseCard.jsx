// import { Card, CardContent, CardActions, Button, Typography } from "@material-ui/core"
import  Card  from '@mui/material/Card';
import  CardActions  from '@mui/material/CardActions';
import  CardContent  from '@mui/material/CardContent';
import Typography  from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import './Courses.css'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * 
 * @param info in the following structure:
 * info = {
 *  title: [title],
 *  description: [desc],
 *  playlistId: [youtube playlist id]
 * }
 * @returns 
 */
function CourseCard(props) {
  const classes = useStyles()
  var course = props.courseInfo
  return (
    <div style={{'display': 'inline-block'}}>
      <Card className={classes.root} > 
      {/* className='course' */}
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {course.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={'#'+course._id} onClick={() => props.onSelectCourse(course)}>Continue</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CourseCard;