export interface Post {
  id: string;
  title: string;
  platform: "YouTube" | "Instagram" | "TikTok";
  views: number;
  likes: number;
  comments: number;
  engagementRate: number;
  publishedAt: string;
}

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "How I grew to 10K subscribers in 3 months",
    platform: "YouTube",
    views: 482000,
    likes: 21400,
    comments: 1830,
    engagementRate: 4.8,
    publishedAt: "2026-01-03",
  },
  {
    id: "2",
    title: "Morning routine that changed my life",
    platform: "Instagram",
    views: 94000,
    likes: 12600,
    comments: 743,
    engagementRate: 14.2,
    publishedAt: "2026-01-07",
  },
  {
    id: "3",
    title: "Honest review: Is this worth it?",
    platform: "TikTok",
    views: 215000,
    likes: 38900,
    comments: 2100,
    engagementRate: 19.1,
    publishedAt: "2026-01-10",
  },
  {
    id: "4",
    title: "Day in my life as a content creator",
    platform: "YouTube",
    views: 310000,
    likes: 14200,
    comments: 980,
    engagementRate: 4.9,
    publishedAt: "2026-01-13",
  },
  {
    id: "5",
    title: "5 mistakes every beginner makes",
    platform: "Instagram",
    views: 67000,
    likes: 8900,
    comments: 412,
    engagementRate: 13.9,
    publishedAt: "2026-01-16",
  },
  {
    id: "6",
    title: "What nobody tells you about going viral",
    platform: "TikTok",
    views: 890000,
    likes: 134000,
    comments: 7200,
    engagementRate: 16.0,
    publishedAt: "2026-01-19",
  },
  {
    id: "7",
    title: "Behind the scenes of my most viewed video",
    platform: "YouTube",
    views: 175000,
    likes: 9100,
    comments: 654,
    engagementRate: 5.6,
    publishedAt: "2026-01-22",
  },
  {
    id: "8",
    title: "I tried this for 30 days — here's what happened",
    platform: "Instagram",
    views: 112000,
    likes: 15800,
    comments: 1020,
    engagementRate: 15.0,
    publishedAt: "2026-01-25",
  },
  {
    id: "9",
    title: "Responding to your most asked questions",
    platform: "TikTok",
    views: 340000,
    likes: 58000,
    comments: 4300,
    engagementRate: 18.3,
    publishedAt: "2026-01-28",
  },
  {
    id: "10",
    title: "The strategy that 10x'd my engagement",
    platform: "YouTube",
    views: 520000,
    likes: 27800,
    comments: 2140,
    engagementRate: 5.8,
    publishedAt: "2026-02-01",
  },
];
