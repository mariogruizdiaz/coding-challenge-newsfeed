import { Announcement } from 'dataaccessobjects/types'
import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'

type Props = {
    announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: Props) {
    return (
        <Card>
            <Content>
                <h2>{announcement.title}</h2>
                <Markdown>{announcement.body}</Markdown>
                <p><strong>Date: </strong>{announcement.created_ts}</p>
            </Content>
        </Card>
    )
}



const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`

