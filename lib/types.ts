export type ID = string;

export type Mode = "simple" | "power";

export type PostType = "progress" | "question" | "resource" | "event";

export type Visibility = "me" | "circle" | "public";

export type User = {
  id: ID;
  name: string;
  handle: string;
  bio: string;
  avatarColor: string;
  mode: Mode;
};

export type Circle = {
  id: ID;
  name: string;
  description: string;
  tags: string[];
  membersCount: number;
  isPrivate: boolean;
};

export type Journey = {
  id: ID;
  title: string;
  goal: string;
  streakDays: number;
  milestone: string;
  visibility: Visibility;
};

export type Post = {
  id: ID;
  type: PostType;
  authorId: ID;
  circleId?: ID;
  title?: string;
  body: string;
  tags: string[];
  createdAtISO: string;
  likeCount: number;
  commentCount: number;
};

export type Event = {
  id: ID;
  circleId: ID;
  title: string;
  startsAtISO: string;
  durationMin: number;
  location: "online" | "offline";
};

export type Notification = {
  id: ID;
  createdAtISO: string;
  read: boolean;
  text: string;
  href?: string;
};
