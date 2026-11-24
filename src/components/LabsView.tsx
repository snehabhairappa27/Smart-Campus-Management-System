import { useState } from 'react';
import { CalendarPlus, Clock, MapPin, Trash2, Users, Wrench, X } from 'lucide-react';
import { TODAY_ISO } from '../data/seedData';
import { CampusLab, LabBooking } from '../types/campus';

interface LabsViewProps {
  labs: CampusLab[];
  bookings: LabBooking[];
  isModalOpen: boolean;
  onOpenModal: (preselectedLabId?: string) => void;
  onCloseModal: () => void;
  preselectedLabId: string;
  onCreateBooking: (input: {
    labId: string;
    date: string;
    timeSlot: string;
    reservedBy: string;
    purpose: string;
  }) => void;
  onCancelBooking: (bookingId: string) => void;
  onCycleLabStatus: (labId: string) => void;
}

export function LabsView({
  labs,
  bookings,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  preselectedLabId,
  onCreateBooking,
  onCancelBooking,
  onCycleLabStatus,
}: LabsViewProps) {
  const [labId, setLabId] = useState(preselectedLabId || labs[0]?.id || 'LAB-B2');
  const [date, setDate] = useState(TODAY_ISO);
  const [timeSlot, setTimeSlot] = useState('14:00 – 16:00');
  const [reservedBy, setReservedBy] = useState('');
  const [purpose, setPurpose] = useState('');
  const [formError, setFormError] = useState('');

  const effectiveLabId = preselectedLabId || labId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservedBy.trim() || !purpose.trim()) {
      setFormError('Team/apprentice name and session purpose are required.');
      return;
    }
    onCreateBooking({
      labId: effectiveLabId,
      date,
      timeSlot,
      reservedBy,
      purpose,
    });
    setReservedBy('');
    setPurpose('');
    setFormError('');
    onCloseModal();
  };

  return (
    <div className="space-y-6">
      <section aria-label="Campus Labs and Pods" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {labs.map((lab) => {
          const statusColor =
            lab.status === 'Available'
              ? 'text-emerald-700'
              : lab.status === 'Occupied'
              ? 'text-amber-700'
              : 'text-red-700';

          return (
            <article
              key={lab.id}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-mono font-medium text-slate-600">
                    {lab.id} &middot; {lab.wing}
                  </span>
                  <span className={`font-semibold ${statusColor}`}>
                    {lab.status}
                  </span>
                </div>

                <h2 className="mt-2 text-base font-semibold text-slate-900">
                  {lab.name}
                </h2>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {lab.equipment}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-600 tabular-nums">
                  <Users className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  <span>{lab.capacity} seats</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onCycleLabStatus(lab.id)}
                    title="Switch room status"
                    className="inline-flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <Wrench className="h-3 w-3 text-slate-400" aria-hidden="true" />
                    <span>Set Status</span>
                  </button>
                  <button
                    type="button"
                    disabled={lab.status === 'Maintenance'}
                    onClick={() => {
                      setLabId(lab.id);
                      onOpenModal(lab.id);
                    }}
                    className="inline-flex items-center gap-1 rounded bg-blue-700 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 whitespace-nowrap"
                  >
                    <CalendarPlus className="h-3 w-3" aria-hidden="true" />
                    <span>Reserve</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Scheduled Reservations
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Upcoming pair-programming, sprint review, and lab sessions
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenModal()}
            className="rounded-md bg-blue-700 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
          >
            Book Space
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-slate-800">
              No active lab reservations
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Select any available lab above to book a workshop or study slot.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                  <th className="px-5 py-3">Booking</th>
                  <th className="px-5 py-3">Space</th>
                  <th className="px-5 py-3">Session Purpose</th>
                  <th className="px-5 py-3">Reserved By</th>
                  <th className="px-5 py-3">Date &amp; Time</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => {
                  const lab = labs.find((l) => l.id === booking.labId);
                  return (
                    <tr key={booking.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap">
                        {booking.id}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-medium text-slate-900 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          <span>{lab ? lab.name : booking.labId}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-800">
                        {booking.purpose}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap">
                        {booking.reservedBy}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          <span>
                            {booking.date} &middot; {booking.timeSlot}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onCancelBooking(booking.id)}
                          aria-label={`Cancel booking ${booking.id}`}
                          className="inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Cancel</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-lab-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        >
          <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 id="book-lab-title" className="text-base font-semibold text-slate-900">
                Reserve Campus Lab or Pod
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

              <div>
                <label htmlFor="booking-lab" className="block text-xs font-medium text-slate-700">
                  Campus Space
                </label>
                <select
                  id="booking-lab"
                  value={effectiveLabId}
                  onChange={(e) => setLabId(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                >
                  {labs
                    .filter((l) => l.status !== 'Maintenance')
                    .map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} ({l.capacity} seats)
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-date" className="block text-xs font-medium text-slate-700">
                    Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
                <div>
                  <label htmlFor="booking-slot" className="block text-xs font-medium text-slate-700">
                    Time Window
                  </label>
                  <select
                    id="booking-slot"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  >
                    <option value="09:00 – 11:00">09:00 – 11:00</option>
                    <option value="11:30 – 13:00">11:30 – 13:00</option>
                    <option value="14:00 – 16:00">14:00 – 16:00</option>
                    <option value="16:30 – 18:30">16:30 – 18:30</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="booking-owner" className="block text-xs font-medium text-slate-700">
                  Reserved By (Apprentice or Squad)
                </label>
                <input
                  id="booking-owner"
                  type="text"
                  required
                  value={reservedBy}
                  onChange={(e) => setReservedBy(e.target.value)}
                  placeholder="e.g. Squad 3 · Cloud & DevOps"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </div>

              <div>
                <label htmlFor="booking-purpose" className="block text-xs font-medium text-slate-700">
                  Session Purpose
                </label>
                <input
                  id="booking-purpose"
                  type="text"
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Kubernetes Deployment Dry Run"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
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
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
