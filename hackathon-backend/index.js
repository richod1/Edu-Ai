const express=require("express")
const app=express()
const cors=require('cors')
const port=3000;
const path=require('path')
const utilities=require('./utilities')
const algo=require('./algorithm')

require("dotenv").config()
app.use(cors())
app.use(express.json())

utilities.initializeYoutubeApi()
utilities.initializeMongoDB()

app.get('/auth', function(req, res) {
    utilities.authYouTubeApi(decodeURIComponent(req.query.code))
    res.send('successfully authenticated! you may now return to the app')
  })

app.post('/api/gen/:topic', async function(req, res) {
    var user = req.body.user
    var topic = req.params.topic
    var courseInit = await algo.CourseInit(topic)
    // create random course number and adds course to db
    // and yes, i'm aware that this has an n in 1000000 chance to fail.
    var random = Math.floor(Math.random()*1000000).toString(16)
    utilities.userdb.findOneAndUpdate({'_id': user}, {'$addToSet': {'courses': random}})
    utilities.coursedb.insertOne({ '_id': random, 'curr': 0, 'title': topic, 'user': user, ...courseInit })
    res.send(courseInit)
  })


  app.post('/api/feedback/:courseid', async function(req, res) {
    var courseid = req.params.courseid
    var understood = req.body.understood
    var feedback = req.body.feedback
    var courseFeedback = await algo.CourseFeedback(understood, feedback, courseid) // using "test" user
    res.send(courseFeedback)
  })
  

  // i dont know y this gives me error
  // course update
  // app.post('/api/courses', async function(req, res) {
  //   var user = req.body.user
  //   var userInfo = await utilities.userdb.findOne({'_id': user})
  //   var courses = userInfo.courses
  //   var courseInfos = []
  //   for (var i = 0; i < courses.length; i++) {
  //     var course = courses[i]
  //     var courseInfo = await utilities.coursedb.findOne({'_id': course})
  //     courseInfos.push(courseInfo)
  //   }
  //   res.send(courseInfos)
  // })

  app.post('/api/courses', async function(req, res) {
    var user = req.body.user;
    var userInfo = await utilities.userdb.findOne({'_id': user});
    if (!userInfo || !userInfo.courses) {
      res.send([]);
      return;
    }
    
    var courses = userInfo.courses;
    var courseInfos = [];
    
    for (var i = 0; i < courses.length; i++) {
      var course = courses[i];
      var courseInfo = await utilities.coursedb.findOne({'_id': course});
      if (courseInfo) {
        courseInfos.push(courseInfo);
      }
    }
    
    res.send(courseInfos);
  });
  

  app.use('/', express.static(path.join(__dirname, './public')))
  app.use('*', express.static(path.join(__dirname, './public')))

app.listen(port,(err)=>{
    if(err) throw new Error(`server is sleeping ${err}`)
    console.log(`server is up on port ${port}`)
})