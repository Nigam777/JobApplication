import React from 'react'
import Profile from '../Profile/Profile'
import {profile} from '../Data/TalentData'
const ProfilePage = () => {
  return (
    <div>
      <Profile  profile={profile} />
    </div>
  )
}

export default ProfilePage
