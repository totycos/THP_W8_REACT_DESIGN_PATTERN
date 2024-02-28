// Kata written by Matthieu BRAULT for the next-react formation from TheHackingProject
import React, { useState } from 'react';
import Publications from './components/Publications';
import Profile from './components/Profile';
import profileDataJson from './datas/profileData.json'

const App = () => {
  const [profileData, setProfileData] = useState(profileDataJson)

  return (
    <div style={{ margin: 50 }}>
      <Profile profileData={profileData} setProfileData={setProfileData} />
      <Publications profileData={profileData} setProfileData={setProfileData} />
    </div>
  )

}

export default App;
