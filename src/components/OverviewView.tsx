import { ArrowRight, CalendarCheck, CheckCircle2, Clock, MapPin, Megaphone, Users } from 'lucide-react';
import { TODAY_ISO } from '../data/seedData';
import {
  Apprentice,
  AttendanceRecord,
  CampusLab,
  CampusNotice,
  LabBooking,
  NavSection,
} from '../types/campus';

interface OverviewViewProps {
  apprentices: Apprentice[];
  attendance: AttendanceRecord[];
  labs: CampusLab[];
  bookings: LabBooking[];
  notices: CampusNotice[];
  onNavigate: (section: NavSection) => void;
}

export function OverviewView({
  apprentices,
  attendance,
  labs,
  bookings,
  notices,
  onNavigate,
}: OverviewViewProps) {
  const activeApprentices = apprentices.filter((a) => a.status === 'Active');
  const todayRecords = attendance.filter((r) => r.date === TODAY_ISO);
  const presentToday = todayRecords.filter((r) => r.status === 'Present').length;
  const lateToday = todayRecords.filter((r) => r.status === 'Late').length;
  const availableLabs = labs.filter((l) => l.status === 'Available').length;
  const totalSeats = labs.reduce((sum, l) => sum + l.capacity, 0);

  const attendancePct =
    activeApprentices.length > 0
      ? Math.round(((presentToday + lateToday) / activeApprentices.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <section aria-label="Campus Key Metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Active Apprentices</span>
            <Users className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-semibold tabular-nums text-slate-900">
              {activeApprentices.length}
            </span>
            <span className="text-xs text-slate-500">
              of {apprentices.length} enrolled
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Cohort 2026-A &middot; Cohort 2026-B
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Today&apos;s Check-Ins</span>
            <CalendarCheck className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-semibold tabular-nums text-slate-900">
              {attendancePct}%
            </span>
            <span className="text-xs font-medium text-emerald-700 tabular-nums">
              {presentToday} on time
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 tabular-nums">
            {lateToday} late &middot; {Math.max(0, activeApprentices.length - presentToday - lateToday)} pending/absent
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Campus Labs Open</span>
            <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-semibold tabular-nums text-slate-900">
              {availableLabs} / {labs.length}
            </span>
            <span className="text-xs text-slate-500 tabular-nums">
              {totalSeats} total seats
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 tabular-nums">
            {bookings.length} scheduled reservations
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Campus Notices</span>
            <Megaphone className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-semibold tabular-nums text-slate-900">
              {notices.length}
            </span>
            <span className="text-xs text-slate-500">
              {notices.filter((n) => n.pinned).length} pinned
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Updated for today&apos;s sprint
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="rounded-lg border border-slate-200 bg-white lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Today&apos;s Lab Schedule
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Active workstation pods and guild rooms reserved across campus
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('labs')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
            >
              <span>Manage Labs</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-slate-700">
                No lab reservations scheduled
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Reserve a lab or pair-programming pod for cohort workshops.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('labs')}
                className="mt-4 rounded-md bg-blue-700 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-800 transition-colors whitespace-nowrap"
              >
                Book Space
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookings.slice(0, 5).map((booking) => {
                const lab = labs.find((l) => l.id === booking.labId);
                return (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-1.5 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {booking.purpose}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {lab ? lab.name : booking.labId} &middot; {booking.reservedBy}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap shrink-0">
                      <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      <span>{booking.date}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{booking.timeSlot}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Notices
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Academic updates, workshops, and IT advisories
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('notices')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {notices.slice(0, 4).map((notice) => (
              <article key={notice.id} className="px-5 py-3.5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{notice.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{notice.publishedAt}</span>
                  {notice.pinned && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <span className="font-medium text-blue-700">Pinned</span>
                    </>
                  )}
                </div>
                <h3 className="mt-1 text-sm font-medium text-slate-900">
                  {notice.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {notice.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Cohort Roster Snapshot
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Recent apprentice check-in status and assigned workstations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('attendance')}
              className="text-xs font-medium text-slate-700 hover:text-slate-900 whitespace-nowrap shrink-0"
            >
              Open Roll Call
            </button>
            <button
              type="button"
              onClick={() => onNavigate('apprentices')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
            >
              <span>Full Directory</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                <th className="px-5 py-2.5">ID</th>
                <th className="px-5 py-2.5">Apprentice</th>
                <th className="px-5 py-2.5">Track</th>
                <th className="px-5 py-2.5">Desk</th>
                <th className="px-5 py-2.5">Today</th>
                <th className="px-5 py-2.5 text-right">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {apprentices.slice(0, 6).map((apprentice) => {
                const record = todayRecords.find(
                  (r) => r.apprenticeId === apprentice.id
                );
                const todayLabel = record ? record.status : 'Unmarked';
                return (
                  <tr key={apprentice.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap">
                      {apprentice.id}
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-900 whitespace-nowrap">
                      {apprentice.name}
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-600 whitespace-nowrap">
                      {apprentice.track}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                      {apprentice.workstation}
                    </td>
                    <td className="px-5 py-3 text-xs whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 font-medium ${
                          todayLabel === 'Present'
                            ? 'text-emerald-700'
                            : todayLabel === 'Late'
                            ? 'text-amber-700'
                            : todayLabel === 'Absent'
                            ? 'text-red-700'
                            : 'text-slate-500'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{todayLabel}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-xs font-medium text-slate-700 tabular-nums whitespace-nowrap">
                      {apprentice.attendanceRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
