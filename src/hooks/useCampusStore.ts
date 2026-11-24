import { useEffect, useState } from 'react';
import {
  INITIAL_APPRENTICES,
  INITIAL_ATTENDANCE,
  INITIAL_BOOKINGS,
  INITIAL_LABS,
  INITIAL_NOTICES,
} from '../data/seedData';
import {
  Apprentice,
  ApprenticeStatus,
  AttendanceRecord,
  AttendanceStatus,
  CampusLab,
  CampusNotice,
  LabBooking,
  LabStatus,
  NoticeCategory,
  Track,
} from '../types/campus';

const STORAGE_KEY = 'smart_campus_state_v1';

interface CampusState {
  apprentices: Apprentice[];
  attendance: AttendanceRecord[];
  labs: CampusLab[];
  bookings: LabBooking[];
  notices: CampusNotice[];
}

function getInitialState(): CampusState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CampusState>;
      if (
        Array.isArray(parsed.apprentices) &&
        Array.isArray(parsed.attendance) &&
        Array.isArray(parsed.labs) &&
        Array.isArray(parsed.bookings) &&
        Array.isArray(parsed.notices)
      ) {
        return {
          apprentices: parsed.apprentices,
          attendance: parsed.attendance,
          labs: parsed.labs,
          bookings: parsed.bookings,
          notices: parsed.notices,
        };
      }
    }
  } catch {
    // Fallback to defaults if localStorage is unavailable or corrupted
  }
  return {
    apprentices: INITIAL_APPRENTICES,
    attendance: INITIAL_ATTENDANCE,
    labs: INITIAL_LABS,
    bookings: INITIAL_BOOKINGS,
    notices: INITIAL_NOTICES,
  };
}

export function useCampusStore() {
  const [state, setState] = useState<CampusState>(getInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const addApprentice = (input: {
    name: string;
    email: string;
    track: Track;
    cohort: string;
    mentor: string;
    workstation: string;
  }) => {
    const nextNumber =
      state.apprentices.reduce((max, item) => {
        const numeric = Number.parseInt(item.id.replace('APP-', ''), 10);
        return Number.isFinite(numeric) && numeric > max ? numeric : max;
      }, 2600) + 1;

    const created: Apprentice = {
      id: `APP-${nextNumber}`,
      name: input.name.trim(),
      email: input.email.trim(),
      track: input.track,
      cohort: input.cohort.trim() || 'Cohort 2026-B',
      mentor: input.mentor.trim() || 'Meera Nair',
      workstation: input.workstation.trim().toUpperCase() || 'B2-20',
      status: 'Active',
      attendanceRate: 100,
      sprintScore: 'Sprint 4 · Onboarding',
    };

    setState((prev) => ({
      ...prev,
      apprentices: [created, ...prev.apprentices],
    }));
  };

  const updateApprenticeStatus = (id: string, status: ApprenticeStatus) => {
    setState((prev) => ({
      ...prev,
      apprentices: prev.apprentices.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    }));
  };

  const removeApprentice = (id: string) => {
    setState((prev) => ({
      ...prev,
      apprentices: prev.apprentices.filter((a) => a.id !== id),
      attendance: prev.attendance.filter((r) => r.apprenticeId !== id),
    }));
  };

  const markAttendance = (
    date: string,
    apprenticeId: string,
    status: AttendanceStatus
  ) => {
    const nowTime = new Date().toTimeString().slice(0, 5);
    setState((prev) => {
      const exists = prev.attendance.some(
        (r) => r.date === date && r.apprenticeId === apprenticeId
      );
      const nextAttendance = exists
        ? prev.attendance.map((r) =>
            r.date === date && r.apprenticeId === apprenticeId
              ? {
                  ...r,
                  status,
                  checkInTime: status === 'Absent' ? undefined : r.checkInTime ?? nowTime,
                }
              : r
          )
        : [
            ...prev.attendance,
            {
              date,
              apprenticeId,
              status,
              checkInTime: status === 'Absent' ? undefined : nowTime,
            },
          ];

      return { ...prev, attendance: nextAttendance };
    });
  };

  const markAllPresent = (date: string, apprenticeIds: string[]) => {
    const nowTime = new Date().toTimeString().slice(0, 5);
    setState((prev) => {
      const remaining = prev.attendance.filter(
        (r) => !(r.date === date && apprenticeIds.includes(r.apprenticeId))
      );
      const added: AttendanceRecord[] = apprenticeIds.map((id) => {
        const existing = prev.attendance.find(
          (r) => r.date === date && r.apprenticeId === id
        );
        return {
          date,
          apprenticeId: id,
          status: 'Present',
          checkInTime: existing?.checkInTime ?? nowTime,
        };
      });
      return { ...prev, attendance: [...remaining, ...added] };
    });
  };

  const createBooking = (input: {
    labId: string;
    date: string;
    timeSlot: string;
    reservedBy: string;
    purpose: string;
  }) => {
    const nextNumber =
      state.bookings.reduce((max, item) => {
        const numeric = Number.parseInt(item.id.replace('BK-', ''), 10);
        return Number.isFinite(numeric) && numeric > max ? numeric : max;
      }, 1040) + 1;

    const booking: LabBooking = {
      id: `BK-${nextNumber}`,
      labId: input.labId,
      date: input.date,
      timeSlot: input.timeSlot,
      reservedBy: input.reservedBy.trim(),
      purpose: input.purpose.trim(),
    };

    setState((prev) => ({
      ...prev,
      bookings: [booking, ...prev.bookings],
      labs: prev.labs.map((lab) =>
        lab.id === input.labId && lab.status === 'Available'
          ? { ...lab, status: 'Occupied' }
          : lab
      ),
    }));
  };

  const cancelBooking = (bookingId: string) => {
    setState((prev) => {
      const target = prev.bookings.find((b) => b.id === bookingId);
      const nextBookings = prev.bookings.filter((b) => b.id !== bookingId);
      const stillHasBooking =
        target && nextBookings.some((b) => b.labId === target.labId);

      return {
        ...prev,
        bookings: nextBookings,
        labs: prev.labs.map((lab) =>
          target && lab.id === target.labId && !stillHasBooking && lab.status === 'Occupied'
            ? { ...lab, status: 'Available' }
            : lab
        ),
      };
    });
  };

  const cycleLabStatus = (labId: string) => {
    const order: LabStatus[] = ['Available', 'Occupied', 'Maintenance'];
    setState((prev) => ({
      ...prev,
      labs: prev.labs.map((lab) => {
        if (lab.id !== labId) return lab;
        const nextStatus = order[(order.indexOf(lab.status) + 1) % order.length];
        return { ...lab, status: nextStatus };
      }),
    }));
  };

  const postNotice = (input: {
    title: string;
    category: NoticeCategory;
    author: string;
    body: string;
    pinned: boolean;
  }) => {
    const nextNumber =
      state.notices.reduce((max, item) => {
        const numeric = Number.parseInt(item.id.replace('NOT-', ''), 10);
        return Number.isFinite(numeric) && numeric > max ? numeric : max;
      }, 300) + 1;

    const notice: CampusNotice = {
      id: `NOT-${nextNumber}`,
      title: input.title.trim(),
      category: input.category,
      author: input.author.trim() || 'Campus Coordinator',
      publishedAt: `Today · ${new Date().toTimeString().slice(0, 5)}`,
      body: input.body.trim(),
      pinned: input.pinned,
    };

    setState((prev) => ({
      ...prev,
      notices: [notice, ...prev.notices],
    }));
  };

  const deleteNotice = (id: string) => {
    setState((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id),
    }));
  };

  const resetDemoData = () => {
    const fresh: CampusState = {
      apprentices: INITIAL_APPRENTICES,
      attendance: INITIAL_ATTENDANCE,
      labs: INITIAL_LABS,
      bookings: INITIAL_BOOKINGS,
      notices: INITIAL_NOTICES,
    };
    setState(fresh);
  };

  return {
    ...state,
    addApprentice,
    updateApprenticeStatus,
    removeApprentice,
    markAttendance,
    markAllPresent,
    createBooking,
    cancelBooking,
    cycleLabStatus,
    postNotice,
    deleteNotice,
    resetDemoData,
  };
}
