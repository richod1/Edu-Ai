import React from 'react'
import Button from '@mui/material/Button';

const SiteHeader = () => {
  return (
    <div>
    <Button href='/'>Home</Button>
      <Button href='search'>Generate a Course</Button>
      <Button href='courses'>Your Courses</Button>
      <Button disabled>Profile (Under Construction)</Button>
    </div>
  )
}

export default SiteHeader