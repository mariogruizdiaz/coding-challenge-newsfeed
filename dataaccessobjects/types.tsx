export type Project = {
    id: number;
    name: string;
    description: string;
    icon_url: string;
    users: User[];
};

export type User = {
    id: number;
    name: string;
    bio: string;
    fellowship: "fellows" | "angels" | "writers";
    avatar_url: string;
    projects: Project[];
};

export type Announcement = {
    id: number;
    fellowship: "fellows" | "angels" | "writers";
    title: string;
    body: string;
    created_ts: Date;
    updated_ts: Date;
};


