import db, { UserRow } from '../../db'

type Args = {
    limit: number,
    page: number,
    fellowships: string[];
}

export default async function users(parent: unknown, { limit, page, fellowships }: Args): Promise<UserRow[]> {
    const users: UserRow[] | undefined = await db.getAll(
        `SELECT * FROM users WHERE fellowship in (${fellowships.map(item => `'${item}'`).join()}) ORDER BY created_ts DESC LIMIT ? OFFSET ?`,
        [limit, page * limit]
    )
    if (!users) {
        throw new Error(`Not users found bellowning to the felloship(s): ${fellowships}`)
    }
    return users
}
