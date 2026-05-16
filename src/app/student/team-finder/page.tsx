import TeamFinderList from "@/components/student/TeamFinderList";
import type { TeamFinderPost } from "@/types/student";

const teamPosts: TeamFinderPost[] = [
    {
        Id: "1",
        Title: "Frontend developer axtarılır",
        Description: "Hackathon layihəsi üçün React bilən tələbə lazımdır.",
        NeededMembers: 1,
        Skill: "React / Next.js",
        CreatedAt: "2026-05-15T09:00:00.000Z",
    },
    {
        Id: "2",
        Title: "UI/UX designer lazımdır",
        Description: "Campus layihəsi üçün dizayn bacarığı olan komanda üzvü axtarılır.",
        NeededMembers: 1,
        Skill: "Figma",
        CreatedAt: "2026-05-13T15:20:00.000Z",
    },
];

export default function TeamFinderPage() {
    const sortedPosts = teamPosts.sort(
        (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Team Finder</h1>
                <p className="mt-1 text-gray-500">
                    Komanda tap və ya mövcud komandaya qoşul.
                </p>
            </div>

            <TeamFinderList posts={sortedPosts} />
        </div>
    );
}
