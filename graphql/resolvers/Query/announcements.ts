import db, { AnnouncementRow, UserRow } from '../../db'
import user from './user';

type Args = {
    limit: number,
    page: number,
    fellowships: string[];
}

export default async function announcements(parent: unknown, { limit, page, fellowships }: Args): Promise<AnnouncementRow[]> {
    const announcements: AnnouncementRow[] | undefined = await db.getAll(
        `SELECT * FROM announcements WHERE fellowship in (${fellowships.map(item => `'${item}'`).join()}) ORDER BY created_ts DESC LIMIT ? OFFSET ?`,
        [limit, page * limit]
    )
    if (!announcements) {
        throw new Error(`Not announcements found bellowning to the felloship(s): ${fellowships}`)
    }
    return announcements
}
