import StudentDashboardCards from "@/components/student/StudentDashboardCards";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Dashboard
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Student workspace
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            CampusConnect telebe paneline xos gelmisiniz. Lazimli bolmeleri
            secerek campus emeliyyatlarini suretle idare edin.
          </p>
        </div>
      </div>

      <StudentDashboardCards />
    </div>
  );
}
