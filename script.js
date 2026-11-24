(() => {
  const STORAGE_KEY = 'smart_campus_vanilla_v1';
  const TODAY_ISO = new Date().toISOString().slice(0, 10);

  const ICONS = {
    users:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    calendarCheck:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/></svg>',
    mapPin:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    megaphone:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 11 18-5v12L3 14v-3Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    checkCircle:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    wrench:
      '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>',
    calendarPlus:
      '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M10 16h4M12 14v4"/></svg>',
    trash:
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  };

  const DEFAULT_DATA = {
    apprentices: [
      {
        id: 'APP-2601',
        name: 'Aarav Kulkarni',
        email: 'aarav.k@campus-guild.org',
        track: 'Full-Stack',
        cohort: 'Cohort 2026-B',
        mentor: 'Meera Nair',
        workstation: 'B2-14',
        status: 'Active',
        attendanceRate: 96,
        sprintScore: 'Sprint 4 · On Track',
      },
      {
        id: 'APP-2602',
        name: 'Sofia Lindqvist',
        email: 'sofia.l@campus-guild.org',
        track: 'Cloud & DevOps',
        cohort: 'Cohort 2026-B',
        mentor: 'Daniel Okafor',
        workstation: 'C1-08',
        status: 'Active',
        attendanceRate: 94,
        sprintScore: 'Sprint 4 · On Track',
      },
      {
        id: 'APP-2603',
        name: 'Rohan Deshmukh',
        email: 'rohan.d@campus-guild.org',
        track: 'Data Engineering',
        cohort: 'Cohort 2026-B',
        mentor: 'Priya Subramanian',
        workstation: 'D3-21',
        status: 'Active',
        attendanceRate: 88,
        sprintScore: 'Sprint 4 · Review Due',
      },
      {
        id: 'APP-2604',
        name: 'Hannah Takahashi',
        email: 'hannah.t@campus-guild.org',
        track: 'QA Automation',
        cohort: 'Cohort 2026-B',
        mentor: 'Lucas Meyer',
        workstation: 'A1-05',
        status: 'Active',
        attendanceRate: 98,
        sprintScore: 'Sprint 4 · On Track',
      },
      {
        id: 'APP-2605',
        name: 'Mateo Alvarez',
        email: 'mateo.a@campus-guild.org',
        track: 'Full-Stack',
        cohort: 'Cohort 2026-B',
        mentor: 'Meera Nair',
        workstation: 'B2-19',
        status: 'On Leave',
        attendanceRate: 82,
        sprintScore: 'Sprint 4 · Excused',
      },
      {
        id: 'APP-2606',
        name: 'Nadia Mensah',
        email: 'nadia.m@campus-guild.org',
        track: 'Cloud & DevOps',
        cohort: 'Cohort 2026-A',
        mentor: 'Daniel Okafor',
        workstation: 'C1-12',
        status: 'Active',
        attendanceRate: 95,
        sprintScore: 'Capstone · In Progress',
      },
      {
        id: 'APP-2607',
        name: 'Ethan Brooks',
        email: 'ethan.b@campus-guild.org',
        track: 'Data Engineering',
        cohort: 'Cohort 2026-A',
        mentor: 'Priya Subramanian',
        workstation: 'D3-04',
        status: 'Active',
        attendanceRate: 91,
        sprintScore: 'Capstone · On Track',
      },
      {
        id: 'APP-2608',
        name: 'Kavya Reddy',
        email: 'kavya.r@campus-guild.org',
        track: 'QA Automation',
        cohort: 'Cohort 2026-A',
        mentor: 'Lucas Meyer',
        workstation: 'A1-11',
        status: 'Graduated',
        attendanceRate: 99,
        sprintScore: 'Placed · Partner Team',
      },
    ],
    attendance: [
      { date: TODAY_ISO, apprenticeId: 'APP-2601', status: 'Present', checkInTime: '08:54' },
      { date: TODAY_ISO, apprenticeId: 'APP-2602', status: 'Present', checkInTime: '08:58' },
      { date: TODAY_ISO, apprenticeId: 'APP-2603', status: 'Late', checkInTime: '09:19' },
      { date: TODAY_ISO, apprenticeId: 'APP-2604', status: 'Present', checkInTime: '08:47' },
      { date: TODAY_ISO, apprenticeId: 'APP-2605', status: 'Absent' },
      { date: TODAY_ISO, apprenticeId: 'APP-2606', status: 'Present', checkInTime: '08:52' },
      { date: TODAY_ISO, apprenticeId: 'APP-2607', status: 'Present', checkInTime: '09:01' },
    ],
    labs: [
      {
        id: 'LAB-A1',
        name: 'Lab A · Backend Guild',
        wing: 'North Wing, Floor 2',
        capacity: 24,
        equipment: '24 Dual-Display Workstations, Local Postgres Sandbox',
        status: 'Occupied',
      },
      {
        id: 'LAB-B2',
        name: 'Lab B · Cloud & CI Sandbox',
        wing: 'East Wing, Floor 3',
        capacity: 18,
        equipment: '18 Linux Nodes, Container Registry Mirror, 10Gbps Uplink',
        status: 'Available',
      },
      {
        id: 'POD-01',
        name: 'Pair Programming Pod 01',
        wing: 'Central Atrium, Floor 1',
        capacity: 4,
        equipment: '4K Shared Monitor, Whiteboard Wall, USB-C Dock',
        status: 'Available',
      },
      {
        id: 'POD-02',
        name: 'QA Device Bench',
        wing: 'West Wing, Floor 2',
        capacity: 8,
        equipment: 'Mobile Test Farm (12 Devices), Network Throttling Router',
        status: 'Maintenance',
      },
      {
        id: 'AUD-01',
        name: 'Demo Day Studio',
        wing: 'South Wing, Floor 1',
        capacity: 60,
        equipment: 'Dual Projectors, Stage Audio, Hybrid Stream Rig',
        status: 'Available',
      },
    ],
    bookings: [
      {
        id: 'BK-1041',
        labId: 'LAB-A1',
        date: TODAY_ISO,
        timeSlot: '09:30 – 11:30',
        reservedBy: 'Cohort 2026-B · Full-Stack',
        purpose: 'REST API Integration Code Review',
      },
      {
        id: 'BK-1042',
        labId: 'POD-01',
        date: TODAY_ISO,
        timeSlot: '13:00 – 14:30',
        reservedBy: 'Aarav Kulkarni & Sofia Lindqvist',
        purpose: 'Docker Compose Debugging Session',
      },
      {
        id: 'BK-1043',
        labId: 'AUD-01',
        date: TODAY_ISO,
        timeSlot: '16:00 – 17:30',
        reservedBy: 'All Cohorts',
        purpose: 'Sprint 4 Architecture Demo & Retro',
      },
    ],
    notices: [
      {
        id: 'NOT-301',
        title: 'Sprint 4 Demo Day Schedule & Room Assignments',
        category: 'Academic',
        author: 'Meera Nair · Lead Mentor',
        publishedAt: 'Today · 08:30',
        body: 'Cohort 2026-B teams will present their Sprint 4 deliverables in Demo Day Studio starting at 16:00. Please push your latest branch and verify seed scripts 30 minutes prior.',
        pinned: true,
      },
      {
        id: 'NOT-302',
        title: 'QA Device Bench Firmware Upgrade Window',
        category: 'Facilities',
        author: 'Campus Operations',
        publishedAt: 'Yesterday · 17:15',
        body: 'The West Wing QA Device Bench is offline until tomorrow morning for iOS and Android test harness updates. Use Lab B stations for browser automation runs.',
        pinned: false,
      },
      {
        id: 'NOT-303',
        title: 'Hands-on Workshop: PostgreSQL Query Plans & Indexing',
        category: 'Workshop',
        author: 'Priya Subramanian · Data Lead',
        publishedAt: '2 days ago',
        body: 'Open to all apprentices across tracks. Bring your local project schema if you want live EXPLAIN ANALYZE feedback during the second half.',
        pinned: false,
      },
      {
        id: 'NOT-304',
        title: 'Badge Reader Renewal for After-Hours Atrium Access',
        category: 'IT & Access',
        author: 'Campus Security & IT',
        publishedAt: '3 days ago',
        body: 'Apprentices needing Central Atrium Pod access after 19:00 should tap their NFC badge at the Floor 1 kiosk before Friday.',
        pinned: false,
      },
    ],
  };

  function cloneDefaults() {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          Array.isArray(parsed.apprentices) &&
          Array.isArray(parsed.attendance) &&
          Array.isArray(parsed.labs) &&
          Array.isArray(parsed.bookings) &&
          Array.isArray(parsed.notices)
        ) {
          return parsed;
        }
      }
    } catch {
      // Fall back to defaults when storage is unavailable
    }
    return cloneDefaults();
  }

  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let state = loadState();
  const ui = {
    section: 'overview',
    apprenticeSearch: '',
    apprenticeTrack: 'All',
    apprenticeStatus: 'All',
    selectedApprenticeId: null,
    editingApprenticeId: null,
    attendanceDate: TODAY_ISO,
    attendanceSearch: '',
    attendanceTrack: 'All',
    noticeSearch: '',
    noticeCategory: 'All',
  };

  const SECTION_META = {
    overview: { title: 'Overview', primaryLabel: 'Take Roll Call' },
    apprentices: { title: 'Apprentices', primaryLabel: 'Enroll Apprentice' },
    attendance: { title: 'Attendance', primaryLabel: 'Reserve Lab' },
    labs: { title: 'Labs & Spaces', primaryLabel: 'Book Space' },
    notices: { title: 'Campus Notices', primaryLabel: 'Post Notice' },
  };

  const sidebar = document.getElementById('sidebar');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const pageTitleEl = document.getElementById('page-title');
  const topbarPrimaryBtn = document.getElementById('topbar-primary-btn');

  function setMobileMenu(open) {
    sidebar.classList.toggle('open', open);
    mobileBackdrop.classList.toggle('hidden', !open);
  }

  function navigateTo(section) {
    if (!SECTION_META[section]) return;
    ui.section = section;

    document.querySelectorAll('.view-section').forEach((el) => {
      el.classList.toggle('active', el.id === `view-${section}`);
    });

    document.querySelectorAll('[data-nav]').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-nav') === section);
    });

    pageTitleEl.textContent = SECTION_META[section].title;
    topbarPrimaryBtn.textContent = SECTION_META[section].primaryLabel;
    setMobileMenu(false);

    if (window.location.hash !== `#${section}`) {
      history.replaceState(null, '', `#${section}`);
    }
    renderAll();
  }

  function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('hidden');
  }

  function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('hidden');
  }

  function openBookingModal(preselectedLabId) {
    const select = document.getElementById('input-book-lab');
    const availableLabs = state.labs.filter((l) => l.status !== 'Maintenance');
    select.innerHTML = availableLabs
      .map(
        (lab) =>
          `<option value="${escapeHtml(lab.id)}">${escapeHtml(lab.name)} (${lab.capacity} seats)</option>`
      )
      .join('');

    if (preselectedLabId && availableLabs.some((l) => l.id === preselectedLabId)) {
      select.value = preselectedLabId;
    }
    document.getElementById('input-book-date').value = TODAY_ISO;
    document.getElementById('error-booking').classList.add('hidden');
    openModal('modal-booking');
  }

  // Renderers
  function renderOverview() {
    const activeApprentices = state.apprentices.filter((a) => a.status === 'Active');
    const todayRecords = state.attendance.filter((r) => r.date === TODAY_ISO);
    const presentToday = todayRecords.filter((r) => r.status === 'Present').length;
    const lateToday = todayRecords.filter((r) => r.status === 'Late').length;
    const attendancePct =
      activeApprentices.length > 0
        ? Math.round(((presentToday + lateToday) / activeApprentices.length) * 100)
        : 0;
    const openLabs = state.labs.filter((l) => l.status === 'Available').length;
    const totalSeats = state.labs.reduce((sum, l) => sum + l.capacity, 0);
    const pinnedCount = state.notices.filter((n) => n.pinned).length;

    document.getElementById('overview-metrics').innerHTML = `
      <div class="metric-card">
        <div class="metric-top">
          <p class="metric-label">Active Apprentices</p>
          ${ICONS.users}
        </div>
        <div class="metric-value-row">
          <span class="metric-value">${activeApprentices.length}</span>
          <span class="metric-note">of ${state.apprentices.length} enrolled</span>
        </div>
        <p class="metric-sub">Cohort 2026-A &middot; Cohort 2026-B</p>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <p class="metric-label">Today&apos;s Check-Ins</p>
          ${ICONS.calendarCheck}
        </div>
        <div class="metric-value-row">
          <span class="metric-value">${attendancePct}%</span>
          <span class="metric-note status-text present">${presentToday} on time</span>
        </div>
        <p class="metric-sub">${lateToday} late &middot; ${Math.max(0, activeApprentices.length - presentToday - lateToday)} pending/absent</p>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <p class="metric-label">Campus Labs Open</p>
          ${ICONS.mapPin}
        </div>
        <div class="metric-value-row">
          <span class="metric-value">${openLabs} / ${state.labs.length}</span>
          <span class="metric-note">${totalSeats} total seats</span>
        </div>
        <p class="metric-sub">${state.bookings.length} scheduled reservations</p>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <p class="metric-label">Campus Notices</p>
          ${ICONS.megaphone}
        </div>
        <div class="metric-value-row">
          <span class="metric-value">${state.notices.length}</span>
          <span class="metric-note">${pinnedCount} pinned</span>
        </div>
        <p class="metric-sub">Updated for today&apos;s sprint</p>
      </div>
    `;

    const bookingsContainer = document.getElementById('overview-bookings-list');
    if (state.bookings.length === 0) {
      bookingsContainer.innerHTML = `
        <div class="empty-state">
          <p class="empty-title">No lab reservations scheduled</p>
          <p class="empty-desc">Reserve a lab or pair-programming pod for cohort workshops.</p>
          <button type="button" data-action="open-booking" class="btn btn-primary">Book Space</button>
        </div>
      `;
    } else {
      bookingsContainer.innerHTML = state.bookings
        .slice(0, 5)
        .map((b) => {
          const lab = state.labs.find((l) => l.id === b.labId);
          return `
            <div class="schedule-row">
              <div>
                <p class="row-title">${escapeHtml(b.purpose)}</p>
                <p class="row-meta">${escapeHtml(lab ? lab.name : b.labId)} &middot; ${escapeHtml(b.reservedBy)}</p>
              </div>
              <span class="row-time">${ICONS.clock}<span>${escapeHtml(b.date)} &middot; ${escapeHtml(b.timeSlot)}</span></span>
            </div>
          `;
        })
        .join('');
    }

    const noticesContainer = document.getElementById('overview-notices-list');
    noticesContainer.innerHTML = state.notices
      .slice(0, 4)
      .map(
        (n) => `
          <article class="notice-snippet">
            <p class="meta-line">
              <strong>${escapeHtml(n.category)}</strong>
              &middot; ${escapeHtml(n.publishedAt)}
              ${n.pinned ? '&middot; <span class="pinned-text">Pinned</span>' : ''}
            </p>
            <h3 class="notice-snippet-title">${escapeHtml(n.title)}</h3>
            <p class="notice-snippet-body">${escapeHtml(n.body)}</p>
          </article>
        `
      )
      .join('');

    const rosterBody = document.getElementById('overview-roster-body');
    rosterBody.innerHTML = state.apprentices
      .slice(0, 6)
      .map((a) => {
        const rec = todayRecords.find((r) => r.apprenticeId === a.id);
        const status = rec ? rec.status : 'Unmarked';
        const cls =
          status === 'Present'
            ? 'present'
            : status === 'Late'
            ? 'late'
            : status === 'Absent'
            ? 'absent'
            : 'unmarked';
        return `
          <tr>
            <td class="mono-cell">${escapeHtml(a.id)}</td>
            <td>
              <button type="button" class="name-btn" data-jump-apprentice="${escapeHtml(a.id)}">
                <span class="person-name">${escapeHtml(a.name)}</span>
              </button>
            </td>
            <td>${escapeHtml(a.track)}</td>
            <td class="mono-cell">${escapeHtml(a.workstation)}</td>
            <td><span class="status-text ${cls}">${ICONS.checkCircle}<span>${escapeHtml(status)}</span></span></td>
            <td class="mono-cell text-right">${a.attendanceRate}%</td>
          </tr>
        `;
      })
      .join('');
  }

  function renderApprentices() {
    const q = ui.apprenticeSearch.trim().toLowerCase();
    const filtered = state.apprentices.filter((a) => {
      const matchesTrack = ui.apprenticeTrack === 'All' || a.track === ui.apprenticeTrack;
      const matchesStatus = ui.apprenticeStatus === 'All' || a.status === ui.apprenticeStatus;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.mentor.toLowerCase().includes(q) ||
        a.workstation.toLowerCase().includes(q);
      return matchesTrack && matchesStatus && matchesQuery;
    });

    document.getElementById(
      'apprentice-count-label'
    ).textContent = `Showing ${filtered.length} of ${state.apprentices.length} apprentices`;

    const tbody = document.getElementById('apprentices-table-body');
    const emptyEl = document.getElementById('apprentices-empty');

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      emptyEl.classList.remove('hidden');
    } else {
      emptyEl.classList.add('hidden');
      tbody.innerHTML = filtered
        .map((a) => {
          const statusCls =
            a.status === 'Active'
              ? 'is-active'
              : a.status === 'On Leave'
              ? 'is-leave'
              : 'is-graduated';
          return `
            <tr>
              <td class="mono-cell">${escapeHtml(a.id)}</td>
              <td>
                <button type="button" class="name-btn" data-inspect-apprentice="${escapeHtml(a.id)}">
                  <span class="person-name">${escapeHtml(a.name)}</span>
                  <span class="person-email">${escapeHtml(a.email)}</span>
                </button>
              </td>
              <td>${escapeHtml(a.track)} &middot; <span class="row-meta">${escapeHtml(a.cohort)}</span></td>
              <td>${escapeHtml(a.mentor)}</td>
              <td class="mono-cell">${escapeHtml(a.workstation)}</td>
              <td>
                <select class="status-select ${statusCls}" data-status-apprentice="${escapeHtml(a.id)}" aria-label="Status for ${escapeHtml(a.name)}">
                  <option value="Active" ${a.status === 'Active' ? 'selected' : ''}>Active</option>
                  <option value="On Leave" ${a.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                  <option value="Graduated" ${a.status === 'Graduated' ? 'selected' : ''}>Graduated</option>
                </select>
              </td>
              <td class="mono-cell text-right">${a.attendanceRate}%</td>
              <td class="text-right">
                <button type="button" class="icon-btn danger" data-remove-apprentice="${escapeHtml(a.id)}" aria-label="Remove ${escapeHtml(a.name)}">
                  ${ICONS.trash}
                </button>
              </td>
            </tr>
          `;
        })
        .join('');
    }

    const detailPanel = document.getElementById('apprentice-detail-panel');
    const selected = state.apprentices.find((a) => a.id === ui.selectedApprenticeId);
    if (!selected) {
      detailPanel.classList.add('hidden');
      detailPanel.innerHTML = '';
    } else {
      detailPanel.classList.remove('hidden');
      const isEditing = ui.editingApprenticeId === selected.id;
      const statusIcon = selected.status === 'Active' ? ICONS.checkCircle : ICONS.clock;
      detailPanel.innerHTML = `
        <div class="detail-header">
          <div>
            <p class="meta-line mono-cell">${escapeHtml(selected.id)} &middot; ${escapeHtml(selected.cohort)}</p>
            <h3 class="card-title">${escapeHtml(selected.name)}</h3>
            <p class="row-meta">${escapeHtml(selected.email)}</p>
          </div>
          <div class="detail-actions">
            <button type="button" data-toggle-edit-apprentice="${escapeHtml(selected.id)}" class="btn btn-secondary">
              ${isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button type="button" data-close-detail="true" class="icon-btn" aria-label="Close apprentice details">
              ${ICONS.close}
            </button>
          </div>
        </div>
        <div class="detail-grid">
          <div>
            <span class="detail-label">Specialization</span>
            <p class="detail-value">${escapeHtml(selected.track)}</p>
          </div>
          <div>
            <span class="detail-label">Assigned Mentor</span>
            <p class="detail-value">${escapeHtml(selected.mentor)}</p>
          </div>
          <div>
            <span class="detail-label">Workstation</span>
            <p class="detail-value mono-cell">${escapeHtml(selected.workstation)}</p>
          </div>
          <div>
            <span class="detail-label">Milestone Status</span>
            <p class="detail-value inline-icon-text">${statusIcon}<span>${escapeHtml(selected.sprintScore)}</span></p>
          </div>
        </div>
        ${
          isEditing
            ? `
          <form id="form-edit-apprentice" class="detail-edit-form" data-edit-id="${escapeHtml(selected.id)}">
            <div class="form-grid-3">
              <div class="form-field">
                <label for="edit-app-track">Track</label>
                <select id="edit-app-track">
                  <option value="Full-Stack" ${selected.track === 'Full-Stack' ? 'selected' : ''}>Full-Stack</option>
                  <option value="Cloud & DevOps" ${selected.track === 'Cloud & DevOps' ? 'selected' : ''}>Cloud &amp; DevOps</option>
                  <option value="Data Engineering" ${selected.track === 'Data Engineering' ? 'selected' : ''}>Data Engineering</option>
                  <option value="QA Automation" ${selected.track === 'QA Automation' ? 'selected' : ''}>QA Automation</option>
                </select>
              </div>
              <div class="form-field">
                <label for="edit-app-mentor">Assigned Mentor</label>
                <input id="edit-app-mentor" type="text" value="${escapeHtml(selected.mentor)}" required />
              </div>
              <div class="form-field">
                <label for="edit-app-desk">Workstation</label>
                <input id="edit-app-desk" type="text" value="${escapeHtml(selected.workstation)}" class="mono-input" required />
              </div>
            </div>
            <div class="form-grid-2">
              <div class="form-field">
                <label for="edit-app-cohort">Cohort</label>
                <input id="edit-app-cohort" type="text" value="${escapeHtml(selected.cohort)}" required />
              </div>
              <div class="form-field">
                <label for="edit-app-milestone">Milestone Status</label>
                <input id="edit-app-milestone" type="text" value="${escapeHtml(selected.sprintScore)}" required />
              </div>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        `
            : ''
        }
      `;
    }
  }

  function renderAttendance() {
    const activeCohort = state.apprentices.filter((a) => a.status !== 'Graduated');
    const dayRecords = state.attendance.filter((r) => r.date === ui.attendanceDate);

    let present = 0;
    let late = 0;
    let absent = 0;
    let unmarked = 0;
    activeCohort.forEach((a) => {
      const rec = dayRecords.find((r) => r.apprenticeId === a.id);
      if (!rec) unmarked += 1;
      else if (rec.status === 'Present') present += 1;
      else if (rec.status === 'Late') late += 1;
      else absent += 1;
    });

    document.getElementById('attendance-counters').innerHTML = `
      <div class="metric-card">
        <p class="metric-label">Present</p>
        <div class="metric-value-row"><span class="metric-value status-text present">${present}</span></div>
      </div>
      <div class="metric-card">
        <p class="metric-label">Late</p>
        <div class="metric-value-row"><span class="metric-value status-text late">${late}</span></div>
      </div>
      <div class="metric-card">
        <p class="metric-label">Absent</p>
        <div class="metric-value-row"><span class="metric-value status-text absent">${absent}</span></div>
      </div>
      <div class="metric-card">
        <p class="metric-label">Unmarked</p>
        <div class="metric-value-row"><span class="metric-value">${unmarked}</span></div>
      </div>
    `;

    const q = ui.attendanceSearch.trim().toLowerCase();
    const visible = activeCohort.filter((a) => {
      const matchesTrack = ui.attendanceTrack === 'All' || a.track === ui.attendanceTrack;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.workstation.toLowerCase().includes(q);
      return matchesTrack && matchesQuery;
    });

    const tbody = document.getElementById('attendance-table-body');
    const emptyEl = document.getElementById('attendance-empty');
    document.getElementById('mark-all-present-btn').disabled = visible.length === 0;
    document.getElementById('export-attendance-btn').disabled = visible.length === 0;

    if (visible.length === 0) {
      tbody.innerHTML = '';
      emptyEl.classList.remove('hidden');
      return;
    }

    emptyEl.classList.add('hidden');
    tbody.innerHTML = visible
      .map((a) => {
        const rec = dayRecords.find((r) => r.apprenticeId === a.id);
        const st = rec ? rec.status : '';
        return `
          <tr>
            <td class="mono-cell">${escapeHtml(a.id)}</td>
            <td>
              <span class="person-name">${escapeHtml(a.name)}</span>
              <span class="person-email">Desk ${escapeHtml(a.workstation)} &middot; ${escapeHtml(a.cohort)}</span>
            </td>
            <td>${escapeHtml(a.track)}</td>
            <td class="mono-cell">${escapeHtml(rec && rec.checkInTime ? rec.checkInTime : '--:--')}</td>
            <td class="text-right">
              <div class="roll-group" role="group" aria-label="Attendance status for ${escapeHtml(a.name)}">
                ${['Present', 'Late', 'Absent']
                  .map((option) => {
                    const cls =
                      st === option
                        ? option === 'Present'
                          ? 'selected-present'
                          : option === 'Late'
                          ? 'selected-late'
                          : 'selected-absent'
                        : '';
                    return `<button type="button" class="roll-btn ${cls}" data-mark-id="${escapeHtml(a.id)}" data-mark-status="${option}">${option}</button>`;
                  })
                  .join('')}
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  function renderLabs() {
    const labsGrid = document.getElementById('labs-grid');
    labsGrid.innerHTML = state.labs
      .map((lab) => {
        const statusCls =
          lab.status === 'Available'
            ? 'present'
            : lab.status === 'Occupied'
            ? 'late'
            : 'absent';
        return `
          <article class="lab-card">
            <div>
              <div class="lab-card-top">
                <span class="mono-cell">${escapeHtml(lab.id)} &middot; ${escapeHtml(lab.wing)}</span>
                <span class="status-text ${statusCls}">${escapeHtml(lab.status)}</span>
              </div>
              <h3 class="card-title">${escapeHtml(lab.name)}</h3>
              <p class="card-desc">${escapeHtml(lab.equipment)}</p>
            </div>
            <div class="lab-card-footer">
              <span class="mono-cell inline-icon-text">${ICONS.users}<span>${lab.capacity} seats</span></span>
              <div class="lab-card-actions">
                <button type="button" class="btn btn-secondary" data-cycle-lab="${escapeHtml(lab.id)}">
                  ${ICONS.wrench}<span>Set Status</span>
                </button>
                <button type="button" class="btn btn-primary" data-book-lab="${escapeHtml(lab.id)}" ${lab.status === 'Maintenance' ? 'disabled' : ''}>
                  ${ICONS.calendarPlus}<span>Reserve</span>
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    const tbody = document.getElementById('bookings-table-body');
    const emptyEl = document.getElementById('bookings-empty');
    if (state.bookings.length === 0) {
      tbody.innerHTML = '';
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');
    tbody.innerHTML = state.bookings
      .map((b) => {
        const lab = state.labs.find((l) => l.id === b.labId);
        return `
          <tr>
            <td class="mono-cell">${escapeHtml(b.id)}</td>
            <td><strong class="inline-icon-text">${ICONS.mapPin}<span>${escapeHtml(lab ? lab.name : b.labId)}</span></strong></td>
            <td>${escapeHtml(b.purpose)}</td>
            <td>${escapeHtml(b.reservedBy)}</td>
            <td class="mono-cell"><span class="inline-icon-text">${ICONS.clock}<span>${escapeHtml(b.date)} &middot; ${escapeHtml(b.timeSlot)}</span></span></td>
            <td class="text-right">
              <button type="button" class="icon-btn danger" data-cancel-booking="${escapeHtml(b.id)}" aria-label="Cancel booking ${escapeHtml(b.id)}">
                ${ICONS.trash}<span>Cancel</span>
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  function renderNotices() {
    const q = ui.noticeSearch.trim().toLowerCase();
    const filtered = state.notices
      .filter((n) => {
        const matchesCat = ui.noticeCategory === 'All' || n.category === ui.noticeCategory;
        const matchesQuery =
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

    const feed = document.getElementById('notices-feed');
    const emptyEl = document.getElementById('notices-empty');

    if (filtered.length === 0) {
      feed.innerHTML = '';
      emptyEl.classList.remove('hidden');
      return;
    }

    emptyEl.classList.add('hidden');
    feed.innerHTML = filtered
      .map(
        (n) => `
          <article class="notice-card">
            <div class="notice-card-top">
              <div>
                <p class="meta-line">
                  <span class="mono-cell">${escapeHtml(n.id)}</span>
                  &middot; <strong>${escapeHtml(n.category)}</strong>
                  &middot; ${escapeHtml(n.author)}
                  &middot; ${escapeHtml(n.publishedAt)}
                  ${n.pinned ? `&middot; <span class="pinned-text">${ICONS.pin}<span>Pinned</span></span>` : ''}
                </p>
                <h2 class="card-title">${escapeHtml(n.title)}</h2>
              </div>
              <div class="notice-card-actions">
                <button type="button" class="icon-btn ${n.pinned ? 'active-pin' : ''}" data-toggle-pin="${escapeHtml(n.id)}" aria-label="${n.pinned ? 'Unpin' : 'Pin'} notice ${escapeHtml(n.title)}" title="${n.pinned ? 'Unpin notice' : 'Pin notice'}">
                  ${ICONS.pin}
                </button>
                <button type="button" class="icon-btn danger" data-delete-notice="${escapeHtml(n.id)}" aria-label="Delete notice ${escapeHtml(n.title)}">
                  ${ICONS.trash}
                </button>
              </div>
            </div>
            <p class="notice-body">${escapeHtml(n.body)}</p>
          </article>
        `
      )
      .join('');
  }

  function renderAll() {
    renderOverview();
    renderApprentices();
    renderAttendance();
    renderLabs();
    renderNotices();
  }

  function downloadAttendanceCsv() {
    const activeCohort = state.apprentices.filter((a) => a.status !== 'Graduated');
    const dayRecords = state.attendance.filter((r) => r.date === ui.attendanceDate);
    const rows = [['Date', 'ID', 'Name', 'Track', 'Cohort', 'Workstation', 'Status', 'CheckInTime']];

    activeCohort.forEach((a) => {
      const rec = dayRecords.find((r) => r.apprenticeId === a.id);
      const status = rec ? rec.status : 'Unmarked';
      const checkIn = rec && rec.checkInTime ? rec.checkInTime : '';
      rows.push([
        ui.attendanceDate,
        a.id,
        a.name,
        a.track,
        a.cohort,
        a.workstation,
        status,
        checkIn,
      ]);
    });

    const csv = rows
      .map((cols) => cols.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `campus-attendance-${ui.attendanceDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Event Wiring
  openMenuBtn.addEventListener('click', () => setMobileMenu(true));
  closeMenuBtn.addEventListener('click', () => setMobileMenu(false));
  mobileBackdrop.addEventListener('click', () => setMobileMenu(false));

  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.getAttribute('data-nav'));
    });
  });

  topbarPrimaryBtn.addEventListener('click', () => {
    if (ui.section === 'apprentices') {
      document.getElementById('error-apprentice').classList.add('hidden');
      openModal('modal-apprentice');
    } else if (ui.section === 'labs') {
      openBookingModal('');
    } else if (ui.section === 'notices') {
      document.getElementById('error-notice').classList.add('hidden');
      openModal('modal-notice');
    } else if (ui.section === 'overview') {
      navigateTo('attendance');
    } else {
      navigateTo('labs');
    }
  });

  document.getElementById('reset-demo-btn').addEventListener('click', () => {
    state = cloneDefaults();
    ui.selectedApprenticeId = null;
    ui.editingApprenticeId = null;
    saveState();
    renderAll();
  });

  document.addEventListener('click', (e) => {
    const gotoTarget = e.target.closest('[data-goto]');
    if (gotoTarget) {
      navigateTo(gotoTarget.getAttribute('data-goto'));
      return;
    }

    const closeModalTarget = e.target.closest('[data-close-modal]');
    if (closeModalTarget) {
      closeModal(closeModalTarget.getAttribute('data-close-modal'));
      return;
    }

    const bookLabTarget = e.target.closest('[data-book-lab]');
    if (bookLabTarget) {
      openBookingModal(bookLabTarget.getAttribute('data-book-lab'));
      return;
    }

    if (e.target.closest('[data-action="open-booking"]')) {
      openBookingModal('');
      return;
    }

    const jumpTarget = e.target.closest('[data-jump-apprentice]');
    if (jumpTarget) {
      ui.selectedApprenticeId = jumpTarget.getAttribute('data-jump-apprentice');
      ui.editingApprenticeId = null;
      navigateTo('apprentices');
      return;
    }

    const inspectTarget = e.target.closest('[data-inspect-apprentice]');
    if (inspectTarget) {
      ui.selectedApprenticeId = inspectTarget.getAttribute('data-inspect-apprentice');
      ui.editingApprenticeId = null;
      renderApprentices();
      return;
    }

    const toggleEditTarget = e.target.closest('[data-toggle-edit-apprentice]');
    if (toggleEditTarget) {
      const id = toggleEditTarget.getAttribute('data-toggle-edit-apprentice');
      ui.editingApprenticeId = ui.editingApprenticeId === id ? null : id;
      renderApprentices();
      return;
    }

    if (e.target.closest('[data-close-detail]')) {
      ui.selectedApprenticeId = null;
      ui.editingApprenticeId = null;
      renderApprentices();
      return;
    }

    const removeAppTarget = e.target.closest('[data-remove-apprentice]');
    if (removeAppTarget) {
      const id = removeAppTarget.getAttribute('data-remove-apprentice');
      state.apprentices = state.apprentices.filter((a) => a.id !== id);
      state.attendance = state.attendance.filter((r) => r.apprenticeId !== id);
      if (ui.selectedApprenticeId === id) {
        ui.selectedApprenticeId = null;
        ui.editingApprenticeId = null;
      }
      saveState();
      renderAll();
      return;
    }

    const markTarget = e.target.closest('[data-mark-id]');
    if (markTarget) {
      const apprenticeId = markTarget.getAttribute('data-mark-id');
      const status = markTarget.getAttribute('data-mark-status');
      const nowTime = new Date().toTimeString().slice(0, 5);
      const existing = state.attendance.find(
        (r) => r.date === ui.attendanceDate && r.apprenticeId === apprenticeId
      );
      if (existing) {
        existing.status = status;
        existing.checkInTime =
          status === 'Absent' ? undefined : existing.checkInTime || nowTime;
      } else {
        state.attendance.push({
          date: ui.attendanceDate,
          apprenticeId,
          status,
          checkInTime: status === 'Absent' ? undefined : nowTime,
        });
      }
      saveState();
      renderAll();
      return;
    }

    const cycleLabTarget = e.target.closest('[data-cycle-lab]');
    if (cycleLabTarget) {
      const labId = cycleLabTarget.getAttribute('data-cycle-lab');
      const order = ['Available', 'Occupied', 'Maintenance'];
      const lab = state.labs.find((l) => l.id === labId);
      if (lab) {
        lab.status = order[(order.indexOf(lab.status) + 1) % order.length];
        saveState();
        renderAll();
      }
      return;
    }

    const cancelBookingTarget = e.target.closest('[data-cancel-booking]');
    if (cancelBookingTarget) {
      const bookingId = cancelBookingTarget.getAttribute('data-cancel-booking');
      const target = state.bookings.find((b) => b.id === bookingId);
      state.bookings = state.bookings.filter((b) => b.id !== bookingId);
      if (target && !state.bookings.some((b) => b.labId === target.labId)) {
        const lab = state.labs.find((l) => l.id === target.labId);
        if (lab && lab.status === 'Occupied') lab.status = 'Available';
      }
      saveState();
      renderAll();
      return;
    }

    const togglePinTarget = e.target.closest('[data-toggle-pin]');
    if (togglePinTarget) {
      const id = togglePinTarget.getAttribute('data-toggle-pin');
      const notice = state.notices.find((n) => n.id === id);
      if (notice) {
        notice.pinned = !notice.pinned;
        saveState();
        renderAll();
      }
      return;
    }

    const deleteNoticeTarget = e.target.closest('[data-delete-notice]');
    if (deleteNoticeTarget) {
      const id = deleteNoticeTarget.getAttribute('data-delete-notice');
      state.notices = state.notices.filter((n) => n.id !== id);
      saveState();
      renderAll();
    }
  });

  document.addEventListener('change', (e) => {
    const select = e.target.closest('[data-status-apprentice]');
    if (select) {
      const id = select.getAttribute('data-status-apprentice');
      const apprentice = state.apprentices.find((a) => a.id === id);
      if (apprentice) {
        apprentice.status = select.value;
        saveState();
        renderAll();
      }
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id === 'form-edit-apprentice') {
      e.preventDefault();
      const id = e.target.getAttribute('data-edit-id');
      const apprentice = state.apprentices.find((a) => a.id === id);
      if (apprentice) {
        apprentice.track = document.getElementById('edit-app-track').value;
        apprentice.mentor = document.getElementById('edit-app-mentor').value.trim() || apprentice.mentor;
        apprentice.workstation =
          document.getElementById('edit-app-desk').value.trim().toUpperCase() ||
          apprentice.workstation;
        apprentice.cohort = document.getElementById('edit-app-cohort').value.trim() || apprentice.cohort;
        apprentice.sprintScore =
          document.getElementById('edit-app-milestone').value.trim() || apprentice.sprintScore;
        ui.editingApprenticeId = null;
        saveState();
        renderAll();
      }
    }
  });

  // Filter & Search Controls
  document.getElementById('apprentice-search').addEventListener('input', (e) => {
    ui.apprenticeSearch = e.target.value;
    renderApprentices();
  });

  document.getElementById('apprentice-status-filter').addEventListener('change', (e) => {
    ui.apprenticeStatus = e.target.value;
    renderApprentices();
  });

  document.querySelectorAll('#track-filter-bar [data-track]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ui.apprenticeTrack = btn.getAttribute('data-track');
      document
        .querySelectorAll('#track-filter-bar [data-track]')
        .forEach((b) => b.classList.toggle('active', b === btn));
      renderApprentices();
    });
  });

  document.getElementById('clear-apprentice-filters-btn').addEventListener('click', () => {
    ui.apprenticeSearch = '';
    ui.apprenticeTrack = 'All';
    ui.apprenticeStatus = 'All';
    document.getElementById('apprentice-search').value = '';
    document.getElementById('apprentice-status-filter').value = 'All';
    document
      .querySelectorAll('#track-filter-bar [data-track]')
      .forEach((b) => b.classList.toggle('active', b.getAttribute('data-track') === 'All'));
    renderApprentices();
  });

  document.getElementById('inline-enroll-btn').addEventListener('click', () => {
    document.getElementById('error-apprentice').classList.add('hidden');
    openModal('modal-apprentice');
  });

  const attendanceDateInput = document.getElementById('attendance-date');
  attendanceDateInput.value = TODAY_ISO;
  attendanceDateInput.addEventListener('change', (e) => {
    ui.attendanceDate = e.target.value || TODAY_ISO;
    renderAttendance();
  });

  document.getElementById('attendance-search').addEventListener('input', (e) => {
    ui.attendanceSearch = e.target.value;
    renderAttendance();
  });

  document.getElementById('attendance-track-filter').addEventListener('change', (e) => {
    ui.attendanceTrack = e.target.value;
    renderAttendance();
  });

  document.getElementById('export-attendance-btn').addEventListener('click', downloadAttendanceCsv);

  document.getElementById('mark-all-present-btn').addEventListener('click', () => {
    const q = ui.attendanceSearch.trim().toLowerCase();
    const nowTime = new Date().toTimeString().slice(0, 5);
    const visibleIds = state.apprentices
      .filter((a) => {
        if (a.status === 'Graduated') return false;
        const matchesTrack = ui.attendanceTrack === 'All' || a.track === ui.attendanceTrack;
        const matchesQuery =
          !q ||
          a.name.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.workstation.toLowerCase().includes(q);
        return matchesTrack && matchesQuery;
      })
      .map((a) => a.id);

    visibleIds.forEach((id) => {
      const existing = state.attendance.find(
        (r) => r.date === ui.attendanceDate && r.apprenticeId === id
      );
      if (existing) {
        existing.status = 'Present';
        existing.checkInTime = existing.checkInTime || nowTime;
      } else {
        state.attendance.push({
          date: ui.attendanceDate,
          apprenticeId: id,
          status: 'Present',
          checkInTime: nowTime,
        });
      }
    });
    saveState();
    renderAll();
  });

  document.getElementById('inline-book-btn').addEventListener('click', () => {
    openBookingModal('');
  });

  document.getElementById('notice-search').addEventListener('input', (e) => {
    ui.noticeSearch = e.target.value;
    renderNotices();
  });

  document.querySelectorAll('#notice-filter-bar [data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ui.noticeCategory = btn.getAttribute('data-category');
      document
        .querySelectorAll('#notice-filter-bar [data-category]')
        .forEach((b) => b.classList.toggle('active', b === btn));
      renderNotices();
    });
  });

  document.getElementById('empty-post-notice-btn').addEventListener('click', () => {
    document.getElementById('error-notice').classList.add('hidden');
    openModal('modal-notice');
  });

  // Modal Form Submissions
  document.getElementById('form-apprentice').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-app-name').value.trim();
    const email = document.getElementById('input-app-email').value.trim();
    const track = document.getElementById('input-app-track').value;
    const cohort = document.getElementById('input-app-cohort').value.trim() || 'Cohort 2026-B';
    const mentor = document.getElementById('input-app-mentor').value.trim() || 'Meera Nair';
    const workstation =
      document.getElementById('input-app-desk').value.trim().toUpperCase() || 'B2-20';
    const errEl = document.getElementById('error-apprentice');

    if (!name || !email) {
      errEl.textContent = 'Full name and campus email are required.';
      errEl.classList.remove('hidden');
      return;
    }

    const nextNum =
      state.apprentices.reduce((max, item) => {
        const n = Number.parseInt(item.id.replace('APP-', ''), 10);
        return Number.isFinite(n) && n > max ? n : max;
      }, 2600) + 1;

    state.apprentices.unshift({
      id: `APP-${nextNum}`,
      name,
      email,
      track,
      cohort,
      mentor,
      workstation,
      status: 'Active',
      attendanceRate: 100,
      sprintScore: 'Sprint 4 · Onboarding',
    });

    e.target.reset();
    document.getElementById('input-app-cohort').value = 'Cohort 2026-B';
    document.getElementById('input-app-mentor').value = 'Meera Nair';
    errEl.classList.add('hidden');
    closeModal('modal-apprentice');
    saveState();
    renderAll();
  });

  document.getElementById('form-booking').addEventListener('submit', (e) => {
    e.preventDefault();
    const labId = document.getElementById('input-book-lab').value;
    const date = document.getElementById('input-book-date').value || TODAY_ISO;
    const timeSlot = document.getElementById('input-book-slot').value;
    const reservedBy = document.getElementById('input-book-owner').value.trim();
    const purpose = document.getElementById('input-book-purpose').value.trim();
    const errEl = document.getElementById('error-booking');

    if (!reservedBy || !purpose) {
      errEl.textContent = 'Team/apprentice name and session purpose are required.';
      errEl.classList.remove('hidden');
      return;
    }

    const conflict = state.bookings.some(
      (b) => b.labId === labId && b.date === date && b.timeSlot === timeSlot
    );
    if (conflict) {
      errEl.textContent =
        'This space is already reserved for that date and time window. Please pick another slot or room.';
      errEl.classList.remove('hidden');
      return;
    }

    const nextNum =
      state.bookings.reduce((max, item) => {
        const n = Number.parseInt(item.id.replace('BK-', ''), 10);
        return Number.isFinite(n) && n > max ? n : max;
      }, 1040) + 1;

    state.bookings.unshift({
      id: `BK-${nextNum}`,
      labId,
      date,
      timeSlot,
      reservedBy,
      purpose,
    });

    const lab = state.labs.find((l) => l.id === labId);
    if (lab && lab.status === 'Available') lab.status = 'Occupied';

    e.target.reset();
    errEl.classList.add('hidden');
    closeModal('modal-booking');
    saveState();
    renderAll();
  });

  document.getElementById('form-notice').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('input-notice-title').value.trim();
    const category = document.getElementById('input-notice-category').value;
    const author =
      document.getElementById('input-notice-author').value.trim() || 'Campus Coordinator';
    const body = document.getElementById('input-notice-body').value.trim();
    const pinned = document.getElementById('input-notice-pinned').checked;
    const errEl = document.getElementById('error-notice');

    if (!title || !body) {
      errEl.textContent = 'Notice title and message body are required.';
      errEl.classList.remove('hidden');
      return;
    }

    const nextNum =
      state.notices.reduce((max, item) => {
        const n = Number.parseInt(item.id.replace('NOT-', ''), 10);
        return Number.isFinite(n) && n > max ? n : max;
      }, 300) + 1;

    state.notices.unshift({
      id: `NOT-${nextNum}`,
      title,
      category,
      author,
      publishedAt: `Today · ${new Date().toTimeString().slice(0, 5)}`,
      body,
      pinned,
    });

    e.target.reset();
    document.getElementById('input-notice-author').value = 'Campus Coordinator';
    errEl.classList.add('hidden');
    closeModal('modal-notice');
    saveState();
    renderAll();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('modal-apprentice');
      closeModal('modal-booking');
      closeModal('modal-notice');
      setMobileMenu(false);
    }
  });

  const initialHash = window.location.hash.replace('#', '');
  if (SECTION_META[initialHash]) {
    navigateTo(initialHash);
  } else {
    renderAll();
  }
})();
