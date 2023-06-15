import CoursePage from "./components/CoursePage/CoursePage"
import SiteHeader from './SiteHeader'
import CourseSearch from "./components/CourseSearch/CourseSearch"
import {Route,Routes} from 'react-router-dom'
import HomePage from "./components/HomePage/HomePage"
function App() {

  return (
    <div>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App
