import Head from 'next/head'
import Layout from 'components/Layout'
import React, { CSSProperties, useState } from 'react'
import Users from 'components/Users'
import Announcements from 'components/Announcements'
import ProfileViewPicker from 'components/ProfileViewPicker';
import { AnnouncementRow } from 'graphql/db'
import AnnouncementCard from 'components/AnnouncementCard'
import { Announcement } from 'dataaccessobjects/types'

interface Map {
    [key: string]: string[]
  }

const interestSettings: Map = {
    writers: ['writers'],
    angels: ['angels', 'founders'],
    founders: ['angels', 'founders']
}



const newsContainer: CSSProperties = {
    margin: '1rem',
}

export default function Home() {
    const [interestTarget, setInterestTarget] = useState({ profile: 'N/A', interestedOn: new Array()});


    function handleViewChange(event: string){
        setInterestTarget({
            profile: event,
            interestedOn: interestSettings[event]
        })
    }

    const renderAnnouncement = (item: AnnouncementRow) => <AnnouncementCard announcement={item as Announcement}/>

    return (
        <Layout>
            <Head>
                <title>On Deck Newsfeed</title>
            </Head>
            <h1>Hello there!</h1>
            <p>The most important news and contacts based on your profile</p>
            <ProfileViewPicker onViewProfileChange={handleViewChange} />
            {
                interestTarget && interestTarget.profile !== 'N/A'
                && 
                <div style={newsContainer}> 
                    <Announcements fellowships={['all', interestTarget.profile]} pageSize={2} />
                    <Users fellowships={interestTarget.interestedOn} pageSize={3}/>
                </div>
            }
            {
                interestTarget.profile === 'N/A' &&
                <h3>Select a profile view to see related events, projects and people</h3>
            }
        </Layout>
    )
}

