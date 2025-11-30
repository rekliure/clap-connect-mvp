import type { Circle, Event, Journey, Notification, Post, User } from "@/lib/types";

export const me: User = {
  id: "u_me",
  name: "Shashank",
  handle: "@shashank",
  bio: "Building learning-first communities. Small circles, big progress.",
  avatarColor: "#7C3AED",
  mode: "simple"
};

export const circles: Circle[] = [
  {
    id: "c_english",
    name: "English Speaking • Daily",
    description: "Daily prompts + 10 min practice. Kind feedback only.",
    tags: ["speaking", "confidence", "daily"],
    membersCount: 1482,
    isPrivate: false
  },
  {
    id: "c_cat",
    name: "CAT Prep • Quant + DILR",
    description: "Warm-ups, mini tests, and doubt-solving threads.",
    tags: ["cat", "quant", "dilr"],
    membersCount: 932,
    isPrivate: false
  },
  {
    id: "c_creators",
    name: "Creators Circle • Arts & Learning",
    description: "Share artifacts, iterate fast, grow together.",
    tags: ["creator", "design", "story"],
    membersCount: 407,
    isPrivate: true
  }
];

export const journeys: Journey[] = [
  {
    id: "j_english",
    title: "Speak English clearly",
    goal: "10 minutes speaking practice daily",
    streakDays: 6,
    milestone: "Record a 60-sec intro video",
    visibility: "circle"
  },
  {
    id: "j_cat",
    title: "CAT 2025 Consistency",
    goal: "15 questions daily (LOD1/LOD2)",
    streakDays: 4,
    milestone: "Percentages: Mixed set • 30 Qs",
    visibility: "me"
  }
];

export const events: Event[] = [
  {
    id: "e_1",
    circleId: "c_english",
    title: "10-min Speaking Sprint (Online)",
    startsAtISO: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    durationMin: 20,
    location: "online"
  },
  {
    id: "e_2",
    circleId: "c_cat",
    title: "DILR Mini-Set Jam",
    startsAtISO: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    durationMin: 45,
    location: "online"
  }
];

export const posts: Post[] = [
  {
    id: "p1",
    type: "progress",
    authorId: "u_me",
    circleId: "c_english",
    body: "Did 10 mins: described my morning routine. I struggle with pauses—trying 'short sentences' technique.\n\nNeed: feedback on pronunciation of “comfortable” and “development”.",
    tags: ["daily", "speaking"],
    createdAtISO: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    likeCount: 12,
    commentCount: 3
  },
  {
    id: "p2",
    type: "question",
    authorId: "u_other1",
    circleId: "c_cat",
    title: "Percentages: quick mental math trick?",
    body: "How do you compute 17% of 360 fast without calculator? Share shortcuts please.",
    tags: ["quant", "percentages"],
    createdAtISO: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    likeCount: 29,
    commentCount: 9
  },
  {
    id: "p3",
    type: "resource",
    authorId: "u_other2",
    circleId: "c_creators",
    title: "Moodboard pack: minimalist UI + learning vibes",
    body: "Shared a curated pack of layouts, typography, and micro-interactions to keep learning apps calm and premium.",
    tags: ["ui", "inspiration"],
    createdAtISO: new Date(Date.now() - 1000 * 60 * 900).toISOString(),
    likeCount: 18,
    commentCount: 2
  }
];

export const notificationsSeed: Notification[] = [
  {
    id: "n1",
    createdAtISO: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
    text: "New reply on your progress update in English Speaking • Daily.",
    href: "/circles/c_english"
  },
  {
    id: "n2",
    createdAtISO: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: false,
    text: "Event reminder: 10-min Speaking Sprint starts in 6 hours.",
    href: "/circles/c_english"
  },
  {
    id: "n3",
    createdAtISO: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    read: true,
    text: "Welcome! Start your first Journey to unlock better feed suggestions.",
    href: "/onboarding"
  }
];

export const usersById: Record<string, { name: string; handle: string; avatarColor: string }> = {
  u_me: { name: me.name, handle: me.handle, avatarColor: me.avatarColor },
  u_other1: { name: "Aanya", handle: "@aanya", avatarColor: "#F97316" },
  u_other2: { name: "Rohan", handle: "@rohan", avatarColor: "#22C55E" }
};
