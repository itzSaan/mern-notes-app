// import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import NotesList from '../components/NotesList'
import RightSidebar from '../components/RightSidebar'
import SingleNote from '../components/SingleNote'
import TabletHeader from '../components/TabletHeader'
import TabletNav from '../components/TabletNav'
import TopNav from '../components/TopNav'

const Home = () => {
  return (
    <div className='xl:grid relativ h-screen app'>
      <LeftSidebar />
      <TopNav />
      <TabletHeader />
      <NotesList />
      <SingleNote />
      <RightSidebar />
      <TabletNav />
    </div>
  )
}

export default Home