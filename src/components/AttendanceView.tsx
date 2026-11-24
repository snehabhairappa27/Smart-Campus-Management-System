import { useMemo, useState } from 'react';
import { Calendar, CheckCheck, Search } from 'lucide-react';
import { TODAY_ISO } from '../data/seedData';
import { Apprentice, AttendanceRecord, AttendanceStatus, Track } from '../types/campus';

interface AttendanceViewProps {
  apprentices: Apprentice[];
  attendance: AttendanceRecord[];
  onMarkAttendance: (
    date: string,
    apprenticeId: string,
    status: AttendanceStatus
  ) => void;
  onMarkAllPresent: (date: string, apprenticeIds: string[]) => void;
}

export function AttendanceView({
  apprentices,
  attendance,
  onMarkAttendance,
  onMarkAllPresent,
}: AttendanceViewProps) {
  const [selectedDate, setSelectedDate] = useState(TODAY_ISO);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<'All' | Track>('All');

  const activeCohort = useMemo(
    () => apprentices.filter((a) => a.status !== 'Graduated'),
    [apprentices]
  );

  const visibleApprentices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activeCohort.filter((a) => {
      const matchesTrack = trackFilter === 'All' || a.track === trackFilter;
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.workstation.toLowerCase().includes(q);
      return matchesTrack && matchesSearch;
    });
  }, [activeCohort, searchQuery, trackFilter]);

  const dayRecords = useMemo(
    () => attendance.filter((r) => r.date === selectedDate),
    [attendance, selectedDate]
  );

  const counts = useMemo(() => {
    let present = 0;
    let late = 0;
    let absent = 0;
    let unmarked = 0;
    for (const apprentice of activeCohort) {
      const rec = dayRecords.find((r) => r.apprenticeId === apprentice.id);
      if (!rec) unmarked += 1;
      else if (rec.status === 'Present') present += 1;
      else if (rec.status === 'Late') late += 1;
      else absent += 1;
    }
    return { present, late, absent, unmarked };
  }, [activeCohort, dayRecords]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
          <span className="text-xs font-medium text-slate-500">Present</span>
          <p className="mt-1 font-mono text-xl font-semibold text-emerald-700 tabular-nums">
            {counts.present}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
          <span className="text-xs font-medium text-slate-500">Late</span>
          <p className="mt-1 font-mono text-xl font-semibold text-amber-700 tabular-nums">
            {counts.late}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
          <span className="text-xs font-medium text-slate-500">Absent</span>
          <p className="mt-1 font-mono text-xl font-semibold text-red-700 tabular-nums">
            {counts.absent}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
          <span className="text-xs font-medium text-slate-500">Unmarked</span>
          <p className="mt-1 font-mono text-xl font-semibold text-slate-700 tabular-nums">
            {counts.unmarked}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
            <Calendar className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              aria-label="Attendance date"
              className="bg-transparent font-mono text-xs text-slate-900 focus:outline-none"
            />
          </label>

          <div className="relative min-w-[220px]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter apprentice..."
              aria-label="Filter apprentices in roll call"
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          <select
            aria-label="Filter by track"
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value as 'All' | Track)}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-blue-600 focus:outline-none"
          >
            <option value="All">All Tracks</option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
            <option value="Data Engineering">Data Engineering</option>
            <option value="QA Automation">QA Automation</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() =>
            onMarkAllPresent(
              selectedDate,
              visibleApprentices.map((a) => a.id)
            )
          }
          disabled={visibleApprentices.length === 0}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <CheckCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          <span>Mark Visible Present</span>
        </button>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white">
        {visibleApprentices.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-slate-800">
              No apprentices match your current filters
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Clear the track filter or search query to resume roll call.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Apprentice</th>
                  <th className="px-5 py-3">Track</th>
                  <th className="px-5 py-3">Check-In</th>
                  <th className="px-5 py-3 text-right">Roll Call Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleApprentices.map((apprentice) => {
                  const rec = dayRecords.find(
                    (r) => r.apprenticeId === apprentice.id
                  );
                  const currentStatus = rec?.status;

                  return (
                    <tr
                      key={apprentice.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-5 py-3 font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap">
                        {apprentice.id}
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-medium text-slate-900">
                          {apprentice.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          Desk {apprentice.workstation} &middot; {apprentice.cohort}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-600 whitespace-nowrap">
                        {apprentice.track}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap">
                        {rec?.checkInTime ?? '--:--'}
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 rounded-md bg-slate-100 p-1">
                          {(['Present', 'Late', 'Absent'] as AttendanceStatus[]).map(
                            (option) => {
                              const isSelected = currentStatus === option;
                              const activeStyle =
                                option === 'Present'
                                  ? 'bg-emerald-700 text-white'
                                  : option === 'Late'
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-red-700 text-white';

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() =>
                                    onMarkAttendance(
                                      selectedDate,
                                      apprentice.id,
                                      option
                                    )
                                  }
                                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                                    isSelected
                                      ? activeStyle
                                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                                  }`}
                                >
                                  {option}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
