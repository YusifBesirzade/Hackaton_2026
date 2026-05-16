import LostFoundList from "@/components/student/LostFoundList";
import type { LostFoundItem } from "@/types/student";

const lostFoundItems: LostFoundItem[] = [
    {
        Id: "1",
        Title: "Qara çanta",
        Description: "Kitabxana yaxınlığında qara çanta itirilib.",
        Location: "Kitabxana",
        Type: "Lost",
        CreatedAt: "2026-05-15T10:00:00.000Z",
    },
    {
        Id: "2",
        Title: "Tələbə kartı",
        Description: "Kafeteriyada tələbə kartı tapılıb.",
        Location: "Kafeteriya",
        Type: "Found",
        CreatedAt: "2026-05-14T12:30:00.000Z",
    },
];

export default function LostFoundPage() {
    const sortedItems = lostFoundItems.sort(
        (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
                <p className="mt-1 text-gray-500">
                    İtirilmiş və tapılmış əşyaların siyahısı.
                </p>
            </div>

            <LostFoundList items={sortedItems} />
        </div>
    );
}
