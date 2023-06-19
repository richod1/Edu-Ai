// var {google} = require('googleapis');
// var youtube = google.youtube('v3');
// var utilities = require('./utilities')

// /**
//  * 
//  * @param {string} topic the topic on which to generate a course.
//  * @returns a "course" comprising of a list of youtube videos.
//  * The output will look EXACTLY like the following object:
//  * {
//  *  err: 0 | 1,
//  *  playlist:
//     * [
//     * video1 = {
//     *  id: video_id,
//     *  title: video_title,
//     *  description: video_description
//     * },
//     * video2 = {
//     *  id: video_id,
//     *  title: video_title,
//     *  description: video_description
//     * },
//     * ...
//     * ]
//  * }
//  * 
//  * The ordering of the videos matters;
//  * The array can have 0 elements in the event of an error;
//  * 
//  * The steps this algorithm takes are outlined in the README in this directory.
//  */
// async function CourseInit(topic) {
//   // only search MIT OCW for now - TODO others can be added as necessary but this is easier
//   var playlist = await youtube.search.list({
//     part: 'snippet',
//     q: topic,
//     // later add more channel from reg universities 
//     channelId: 'UCEBb1b_L6zDS3xTUrIALZOw',
//     type: 'playlist',
//     maxResults: 1
//   },).then(resOnFulfill => {
//     console.log(resOnFulfill.data.items)
//     var playlists = resOnFulfill.data.items
//     // TODO perhaps add a model here to determine "best pick" courses from the list
//     /*for (var i = 0; i < items.length; i++) {
//       var playlist = items[i]
//       var title = playlist.snippet.title
//       var description = playlist.snippet.description
//     }*/
//     var playlist = playlists[0]
//     return youtube.playlistItems.list(
//         { 
//           'part': 'snippet', 
//           'playlistId': playlist.id.playlistId, 
//           'maxResults': 25}
//         ).then(fulfill => {
//       return { err: 0, playlist: fulfill.data.items }
//     }, reject => {
//       return { err: 1, playlist: [] }
//     })
//   }, resOnReject => {
//     console.log(resOnReject)
//     return { err: 1, playlist: [] }
//   })
//   return playlist
// }

// /**
//  * 
//  * @param {string} topic the topic on which to generate a course.
//  * @returns a "course" comprising of a list of youtube videos.
//  * The output will look EXACTLY like the following object:
//  * {
//  *  err: 0 | 1,
//  *  playlist:
//     * [
//     * video1 = {
//     *  id: video_id,
//     *  title: video_title,
//     *  description: video_description
//     * },
//     * video2 = {
//     *  id: video_id,
//     *  title: video_title,
//     *  description: video_description
//     * },
//     * ...
//     * ]
//  * }
//  * 
//  * The ordering of the videos matters;
//  * The array can have 0 elements in the event of an error;
//  */
// async function CourseUpdate(topic) {
//   var playlist = await youtube.search.list({
//     part: 'snippet',
//     q: topic,
//     type: 'video',
//     maxResults: 1 // currently set to 1 but this is in theory a hyperparameter n that should update based on the user's behavior
//   },).then(resOnFulfill => {
//     var playlist = resOnFulfill.data.items
//     // TODO model here to determine n "best pick" follow-up videos from the list
//     /*for (var i = 0; i < items.length; i++) {
//       var playlist = items[i]
//       var title = playlist.snippet.title
//       var description = playlist.snippet.description
//     }*/
//     return { err: 0, playlist: playlist }
//   }, resOnReject => {
//     console.log(resOnReject)
//     return { err: 1, playlist: [] }
//   })
//   return playlist
// }

// /**
//  * iterative portion of algorithm. provide feedback on current video.
//  * this it the ONLY way to progress through a course
//  * @param {*} understood boolean. true if user understood, false if not
//  * @param {*} feedback actual text feedback from user
//  * @returns the updated course after user feedback is saved and taken into account
//  */
// async function CourseFeedback(understood, feedback, courseid) {
//   // what this function does:
//   // 1. update course with understanding and feedback
//   // 2. insert new videos for them to understand their current lecture if they don't understand something
//   // 3. set current progress by setting/updating "curr" lecture number
//   // 4. update database with new feedback/videos

//   // 1. update course
//   var course = await utilities.coursedb.findOne({ '_id': courseid })
//   var currCourse = course
//   var parentCourse = course
//   // find current lecture to tag feedback onto
//   // dont touch this code else all what i spaent 5hrs will go waste!!! by degraft
//   while (currCourse.playlist != undefined) {
//     var currUnderstood = currCourse.playlist[currCourse.curr].understood
//     if (currUnderstood == false) {
//       parentCourse = currCourse
//       currCourse = currCourse.playlist[currCourse.curr]
//     } else
//       break
//   }
//   // tag feedback onto current lecture
//   currCourse.playlist[currCourse.curr].understood = understood
//   currCourse.playlist[currCourse.curr].feedback = feedback

//   // 2. insert new videos
//   if (!understood) {
//     // TODO interpret user feedback and search for right video instead of plugging in their feedback into search
//     var result = await CourseUpdate(feedback)
//     if (result.err == 0) {
//       playlist = result.playlist
//     }
//     currCourse.playlist[currCourse.curr].playlist = playlist
//     //currCourse.value
//   }

//   // 3. set current progress
//   if (!understood) {
//     currCourse.playlist[currCourse.curr].curr = 0
//   }
//   else {
//     if (parentCourse != currCourse)
//       parentCourse.curr = parentCourse.curr + 1
//     currCourse.curr = currCourse.curr + 1
//     currCourse.understood = true
//   }

//   // 4. update database
//   var result = utilities.coursedb.updateOne({'_id': courseid}, {'$set': {...course}})

//   return result
// }

// var algo = {
//   CourseInit: CourseInit,
//   CourseFeedback: CourseFeedback
// }










//from gpt
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const utilities = require('./utilities');

/**
 * 
 * @param {string} topic - The topic on which to generate a course.
 * @returns {Object} - A "course" comprising a list of YouTube videos.
 */
async function CourseInit(topic) {
  try {
    const searchResult = await youtube.search.list({
      part: 'snippet',
      q: topic,
      channelId: 'UCEBb1b_L6zDS3xTUrIALZOw',
      type: 'playlist',
      maxResults: 1,
      key: process.env.YOUTUBE_API,
    });

    const playlists = searchResult.data.items;
    if (playlists.length === 0) {
      return { err: 1, playlist: [] };
    }

    const playlist = playlists[0];
    const playlistItems = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId: playlist.id.playlistId,
      maxResults: 25,
      key: process.env.YOUTUBE_API,

    });

    return { err: 0, playlist: playlistItems.data.items };
  } catch (error) {
    console.error(error);
    return { err: 1, playlist: [] };
  }
}

/**
 * 
 * @param {string} topic - The topic on which to generate a course.
 * @returns {Object} - A "course" comprising a list of YouTube videos.
 */
async function CourseUpdate(topic) {
  try {
    const searchResult = await youtube.search.list({
      part: 'snippet',
      q: topic,
      type: 'video',
      maxResults: 1,
      key: process.env.YOUTUBE_API,

    });

    return { err: 0, playlist: searchResult.data.items };
  } catch (error) {
    console.error(error);
    return { err: 1, playlist: [] };
  }
}

/**
 * 
 * @param {boolean} understood - Boolean indicating if the user understood the video.
 * @param {string} feedback - Feedback from the user.
 * @param {string} courseid - Course ID.
 * @returns {Promise} - Promise that resolves with the updated course.
 */
async function CourseFeedback(understood, feedback, courseid) {
  try {
    const course = await utilities.coursedb.findOne({ '_id': courseid });
    let currCourse = course;
    let parentCourse = course;

    // Find the current lecture to tag feedback onto
    while (currCourse.playlist !== undefined) {
      const currUnderstood = currCourse.playlist[currCourse.curr].understood;
      if (currUnderstood === false) {
        parentCourse = currCourse;
        currCourse = currCourse.playlist[currCourse.curr];
      } else {
        break;
      }
    }

    // Tag feedback onto the current lecture
    currCourse.playlist[currCourse.curr].understood = understood;
    currCourse.playlist[currCourse.curr].feedback = feedback;

    // Insert new videos if the user didn't understand
    if (!understood) {
      const result = await CourseUpdate(feedback);
      if (result.err === 0) {
        const playlist = result.playlist;
        currCourse.playlist[currCourse.curr].playlist = playlist;
      }
    }

    // Set current progress
    if (!understood) {
      currCourse.playlist[currCourse.curr].curr = 0;
    } else {
      if (parentCourse !== currCourse) {
        parentCourse.curr += 1;
      }
      currCourse.curr += 1;
      currCourse.understood = true;
    }

    // Update database
    await utilities.coursedb.updateOne({ '_id': courseid }, { '$set': { ...course } });
    return course;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const algo = {
  CourseInit: CourseInit,
  CourseUpdate: CourseUpdate,
  CourseFeedback: CourseFeedback
};

module.exports = algo;


