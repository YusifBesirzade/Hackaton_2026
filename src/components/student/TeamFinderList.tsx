import type { TeamFinderPost } from "@/types/student";

interface TeamFinderListProps {
    posts: TeamFinderPost[];
}

export default function TeamFinderList({ posts }: TeamFinderListProps) {
    return (
        <div className="grid gap-4">
            {posts.map((post) => (
                <div key={post.Id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-gray-900">{post.Title}</h2>

                    <p className="mt-2 text-sm text-gray-600">{post.Description}</p>

                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                            {post.Skill}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                            {post.NeededMembers} nəfər lazımdır
                        </span>

                        <span className="text-gray-500">
                            {new Date(post.CreatedAt).toLocaleDateString("az-AZ")}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
