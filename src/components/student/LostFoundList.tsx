import type { LostFoundItem } from "@/types/student";

interface LostFoundListProps {
    items: LostFoundItem[];
}

export default function LostFoundList({ items }: LostFoundListProps) {
    return (
        <div className="grid gap-4">
            {items.map((item) => (
                <div key={item.Id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">{item.Title}</h2>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${item.Type === "Lost"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-green-50 text-green-700"
                                }`}
                        >
                            {item.Type === "Lost" ? "İtirilib" : "Tapılıb"}
                        </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">{item.Description}</p>

                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                        <span>{item.Location}</span>
                        <span>{new Date(item.CreatedAt).toLocaleDateString("az-AZ")}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
