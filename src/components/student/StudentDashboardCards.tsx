import Link from "next/link";
import { ArrowUpRight, Search, UserRound, Users } from "lucide-react";

const cards = [
    {
        title: "Lost & Found",
        description: "Itirilmis ve tapilmis esyalari rahat sekilde izleyin.",
        href: "/student/lost-found",
        accent: "from-rose-500 to-orange-400",
        icon: Search,
    },
    {
        title: "Team Finder",
        description: "Hackathon ve layihələr ucun dogru komanda yoldasini tapin.",
        href: "/student/team-finder",
        accent: "from-blue-600 to-cyan-400",
        icon: Users,
    },
    {
        title: "Profile",
        description: "Telebe melumatlarini ve hesab ayarlarini idare edin.",
        href: "/profile",
        accent: "from-violet-600 to-fuchsia-400",
        icon: UserRound,
    },
];

export default function StudentDashboardCards() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200"
                    >
                        <div
                            className={`absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br ${card.accent} opacity-15 blur-2xl transition group-hover:opacity-30`}
                        />

                        <div className="relative flex items-start justify-between gap-4">
                            <div
                                className={`grid size-13 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg shadow-slate-200`}
                            >
                                <Icon className="size-6" />
                            </div>
                            <div className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-slate-950 group-hover:text-white">
                                <ArrowUpRight className="size-5" />
                            </div>
                        </div>

                        <div className="relative mt-7">
                            <h2 className="text-xl font-black tracking-tight text-slate-950">
                                {card.title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {card.description}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
