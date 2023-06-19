import CoursePage from "./components/CoursePage/CoursePage"
import SiteHeader from './SiteHeader'
import CourseSearch from "./components/CourseSearch/CourseSearch"
import {Route,Routes} from 'react-router-dom'
import Courses from './components/Courses/Courses'
import HomePage from "./components/HomePage/HomePage"
function App() {
  localStorage.getItem('user','test')

  return (
    <div className='App'>
      <div>
        <SiteHeader/>
      </div>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<CourseSearch/>}/>
        <Route path='/course' element={<CoursePage/>}/>
        <Route path='/courses' element={<Courses/>}/>
      </Routes>
    </div>
  )
}

export default App
