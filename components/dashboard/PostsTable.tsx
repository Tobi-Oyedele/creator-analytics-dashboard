// components/dashboard/PostsTable.tsx

import { Post } from "@/lib/mockPosts";

const platformColors: Record<Post["platform"], string> = {
  YouTube: "bg-red-500/10 text-red-400",
  Instagram: "bg-pink-500/10 text-pink-400",
  TikTok: "bg-cyan-500/10 text-cyan-400",
};

const PostsTable = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-gray-400">
            <th className="text-left px-4 py-3 font-medium">Title</th>
            <th className="text-left px-4 py-3 font-medium">Platform</th>
            <th className="text-right px-4 py-3 font-medium">Views</th>
            <th className="text-right px-4 py-3 font-medium">Likes</th>
            <th className="text-right px-4 py-3 font-medium">Comments</th>
            <th className="text-right px-4 py-3 font-medium">Engagement</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr
              key={post.id}
              className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                index % 2 === 0 ? "bg-transparent" : "bg-white/2"
              }`}
            >
              <td className="px-4 py-3 text-white font-medium max-w-60 truncate">
                {post.title}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${platformColors[post.platform]}`}
                >
                  {post.platform}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {post.views.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {post.likes.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {post.comments.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                <span
                  className={`font-medium ${
                    post.engagementRate >= 10
                      ? "text-green-400"
                      : "text-orange-400"
                  }`}
                >
                  {post.engagementRate}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
