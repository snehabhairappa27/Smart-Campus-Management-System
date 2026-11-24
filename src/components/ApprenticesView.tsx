import { useMemo, useState } from 'react';
import { CheckCircle2, Clock, Search, Trash2, UserPlus, X } from 'lucide-react';
import { Apprentice, ApprenticeStatus, Track } from '../types/campus';

interface ApprenticesViewProps {
  apprentices: Apprentice[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onAddApprentice: (input: {
    name: string;
    email: string;
    track: Track;
    cohort: string;
    mentor: string;
    workstation: string;
  }) => void;
  onUpdateStatus: (id: string, status: ApprenticeStatus) => void;
  onRemoveApprentice: (id: string) => void;
}

const TRACK_FILTERS: Array<'All' | Track> = [
  'All',
  'Full-Stack',
  'Cloud & DevOps',
  'Data Engineering',
  'QA Automation',
];

export function ApprenticesView({
  apprentices,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onAddApprentice,
  onUpdateStatus,
  onRemoveApprentice,
}: ApprenticesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<'All' | Track>('All');
  const [selectedApprentice, setSelectedApprentice] = useState<Apprentice | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState<Track>('Full-Stack');
  const [cohort, setCohort] = useState('Cohort 2026-B');
  const [mentor, setMentor] = useState('Meera Nair');
  const [workstation, setWorkstation] = useState('');
  const [formError, setFormError] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return apprentices.filter((a) => {
      const matchesTrack = trackFilter === 'All' || a.track === trackFilter;
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.mentor.toLowerCase().includes(q) ||
        a.workstation.toLowerCase().includes(q);
      return matchesTrack && matchesSearch;
    });
  }, [apprentices, searchQuery, trackFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setFormError('Full name and campus email are required.');
      return;
    }
    onAddApprentice({
      name,
      email,
      track,
      cohort,
      mentor,
      workstation,
    });
    setName('');
    setEmail('');
    setWorkstation('');
    setFormError('');
    onCloseModal();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID, mentor, or desk..."
            aria-label="Search apprentices"
            className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-md bg-slate-100 p-1">
          {TRACK_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTrackFilter(item)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                trackFilter === item
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
          <p className="text-xs font-medium text-slate-600 tabular-nums">
            Showing {filtered.length} of {apprentices.length} apprentices
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
          >
            <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Enroll Apprentice</span>
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-slate-800">
              No matching apprentices found
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try clearing your search filter or enroll a new software apprentice.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setTrackFilter('All');
              }}
              className="mt-4 rounded-md border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Apprentice</th>
                  <th className="px-5 py-3">Track &amp; Cohort</th>
                  <th className="px-5 py-3">Mentor</th>
                  <th className="px-5 py-3">Desk</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Attendance</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => setSelectedApprentice(item)}
                        className="text-left group"
                      >
                        <div className="font-medium text-slate-900 group-hover:text-blue-700">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500">{item.email}</div>
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                      <span>{item.track}</span>
                      <span className="mx-1.5 text-slate-300" aria-hidden="true">
                        &middot;
                      </span>
                      <span className="text-slate-500">{item.cohort}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                      {item.mentor}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                      {item.workstation}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <select
                        aria-label={`Status for ${item.name}`}
                        value={item.status}
                        onChange={(e) =>
                          onUpdateStatus(item.id, e.target.value as ApprenticeStatus)
                        }
                        className={`rounded border px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                          item.status === 'Active'
                            ? 'border-emerald-200 bg-emerald-50/60 text-emerald-800'
                            : item.status === 'On Leave'
                            ? 'border-amber-200 bg-amber-50/60 text-amber-800'
                            : 'border-slate-200 bg-slate-100 text-slate-700'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Graduated">Graduated</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs font-medium text-slate-700 tabular-nums whitespace-nowrap">
                      {item.attendanceRate}%
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedApprentice?.id === item.id) {
                            setSelectedApprentice(null);
                          }
                          onRemoveApprentice(item.id);
                        }}
                        aria-label={`Remove ${item.name}`}
                        className="inline-flex items-center justify-center rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedApprentice && (
        <aside className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <p className="font-mono text-xs text-slate-500">
                {selectedApprentice.id} &middot; {selectedApprentice.cohort}
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">
                {selectedApprentice.name}
              </h3>
              <p className="text-xs text-slate-500">{selectedApprentice.email}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedApprentice(null)}
              aria-label="Close apprentice details"
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-4">
            <div>
              <span className="text-xs text-slate-500">Specialization</span>
              <p className="mt-0.5 font-medium text-slate-900">
                {selectedApprentice.track}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Assigned Mentor</span>
              <p className="mt-0.5 font-medium text-slate-900">
                {selectedApprentice.mentor}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Workstation</span>
              <p className="mt-0.5 font-mono font-medium text-slate-900 tabular-nums">
                {selectedApprentice.workstation}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Milestone Status</span>
              <p className="mt-0.5 inline-flex items-center gap-1.5 font-medium text-slate-900">
                {selectedApprentice.status === 'Active' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                )}
                <span>{selectedApprentice.sprintScore}</span>
              </p>
            </div>
          </div>
        </aside>
      )}

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-apprentice-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        >
          <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 id="add-apprentice-title" className="text-base font-semibold text-slate-900">
                Enroll Software Apprentice
              </h2>
              <button
                type="button"
                onClick={onCloseModal}
                aria-label="Close modal"
                className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              {formError && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  {formError}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="apprentice-name" className="block text-xs font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="apprentice-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
                <div>
                  <label htmlFor="apprentice-email" className="block text-xs font-medium text-slate-700">
                    Campus Email
                  </label>
                  <input
                    id="apprentice-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya.s@campus-guild.org"
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="apprentice-track" className="block text-xs font-medium text-slate-700">
                    Engineering Track
                  </label>
                  <select
                    id="apprentice-track"
                    value={track}
                    onChange={(e) => setTrack(e.target.value as Track)}
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                    <option value="Data Engineering">Data Engineering</option>
                    <option value="QA Automation">QA Automation</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="apprentice-cohort" className="block text-xs font-medium text-slate-700">
                    Cohort
                  </label>
                  <input
                    id="apprentice-cohort"
                    type="text"
                    value={cohort}
                    onChange={(e) => setCohort(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="apprentice-mentor" className="block text-xs font-medium text-slate-700">
                    Assigned Mentor
                  </label>
                  <input
                    id="apprentice-mentor"
                    type="text"
                    value={mentor}
                    onChange={(e) => setMentor(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
                <div>
                  <label htmlFor="apprentice-desk" className="block text-xs font-medium text-slate-700">
                    Workstation Desk
                  </label>
                  <input
                    id="apprentice-desk"
                    type="text"
                    value={workstation}
                    onChange={(e) => setWorkstation(e.target.value)}
                    placeholder="e.g. B2-22"
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-700 px-4 py-2 text-xs font-medium text-white hover:bg-blue-800 whitespace-nowrap"
                >
                  Save Apprentice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
