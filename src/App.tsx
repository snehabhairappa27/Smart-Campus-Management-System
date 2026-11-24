import { useState } from 'react';
import {
  Building2,
  CalendarCheck,
  LayoutDashboard,
  Megaphone,
  Menu,
  RotateCcw,
  Users,
  X,
} from 'lucide-react';
import { ApprenticesView } from './components/ApprenticesView';
import { AttendanceView } from './components/AttendanceView';
import { LabsView } from './components/LabsView';
import { NoticesView } from './components/NoticesView';
import { OverviewView } from './components/OverviewView';
import { useCampusStore } from './hooks/useCampusStore';
import { NavSection } from './types/campus';

const NAV_ITEMS: Array<{
  id: NavSection;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'apprentices', label: 'Apprentices', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  { id: 'labs', label: 'Labs & Spaces', icon: Building2 },
  { id: 'notices', label: 'Campus Notices', icon: Megaphone },
];

export function App() {
  const store = useCampusStore();
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [apprenticeModalOpen, setApprenticeModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedLabId, setPreselectedLabId] = useState('');
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);

  const activeNav = NAV_ITEMS.find((item) => item.id === activeSection) ?? NAV_ITEMS[0];

  const handlePrimaryAction = () => {
    if (activeSection === 'apprentices') {
      setApprenticeModalOpen(true);
    } else if (activeSection === 'labs') {
      setPreselectedLabId('');
      setBookingModalOpen(true);
    } else if (activeSection === 'notices') {
      setNoticeModalOpen(true);
    } else if (activeSection === 'overview') {
      setActiveSection('attendance');
    } else {
      setActiveSection('labs');
    }
  };

  const primaryActionLabel =
    activeSection === 'apprentices'
      ? 'Enroll Apprentice'
      : activeSection === 'labs'
      ? 'Book Space'
      : activeSection === 'notices'
      ? 'Post Notice'
      : activeSection === 'overview'
      ? 'Take Roll Call'
      : 'Reserve Lab';

  const navigateTo = (section: NavSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-150 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-5">
          <button
            type="button"
            onClick={() => navigateTo('overview')}
            className="text-left text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Smart Campus
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="rounded p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Primary Sidebar" className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    isActive ? 'text-blue-700' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-700">
            Software Apprenticeship Hub
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            North &amp; East Engineering Wings
          </p>
          <button
            type="button"
            onClick={store.resetDemoData}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset Campus Data</span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className="hidden text-slate-500 sm:inline whitespace-nowrap">
                Smart Campus
              </span>
              <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
                /
              </span>
              <h1 className="truncate font-semibold text-slate-900">
                {activeNav.label}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrimaryAction}
            className="rounded-md bg-blue-700 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            {primaryActionLabel}
          </button>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
          {activeSection === 'overview' && (
            <OverviewView
              apprentices={store.apprentices}
              attendance={store.attendance}
              labs={store.labs}
              bookings={store.bookings}
              notices={store.notices}
              onNavigate={navigateTo}
            />
          )}

          {activeSection === 'apprentices' && (
            <ApprenticesView
              apprentices={store.apprentices}
              isModalOpen={apprenticeModalOpen}
              onOpenModal={() => setApprenticeModalOpen(true)}
              onCloseModal={() => setApprenticeModalOpen(false)}
              onAddApprentice={store.addApprentice}
              onUpdateStatus={store.updateApprenticeStatus}
              onRemoveApprentice={store.removeApprentice}
            />
          )}

          {activeSection === 'attendance' && (
            <AttendanceView
              apprentices={store.apprentices}
              attendance={store.attendance}
              onMarkAttendance={store.markAttendance}
              onMarkAllPresent={store.markAllPresent}
            />
          )}

          {activeSection === 'labs' && (
            <LabsView
              labs={store.labs}
              bookings={store.bookings}
              isModalOpen={bookingModalOpen}
              preselectedLabId={preselectedLabId}
              onOpenModal={(labId) => {
                setPreselectedLabId(labId ?? '');
                setBookingModalOpen(true);
              }}
              onCloseModal={() => setBookingModalOpen(false)}
              onCreateBooking={store.createBooking}
              onCancelBooking={store.cancelBooking}
              onCycleLabStatus={store.cycleLabStatus}
            />
          )}

          {activeSection === 'notices' && (
            <NoticesView
              notices={store.notices}
              isModalOpen={noticeModalOpen}
              onOpenModal={() => setNoticeModalOpen(true)}
              onCloseModal={() => setNoticeModalOpen(false)}
              onPostNotice={store.postNotice}
              onDeleteNotice={store.deleteNotice}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
