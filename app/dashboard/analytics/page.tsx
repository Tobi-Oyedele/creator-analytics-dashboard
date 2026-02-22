import PostsTable from "@/components/dashboard/PostsTable";
import { mockPosts } from "@/lib/mockPosts";

const page = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Performance Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">
          Track how your posts are performing across platforms
        </p>
      </div>

      <PostsTable posts={mockPosts} />
    </div>
  );
};

export default page;
