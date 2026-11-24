import { useMemo, useState } from 'react';
import { Pin, PlusCircle, Search, Trash2, X } from 'lucide-react';
import { CampusNotice, NoticeCategory } from '../types/campus';

interface NoticesViewProps {
  notices: CampusNotice[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onPostNotice: (input: {
    title: string;
    category: NoticeCategory;
    author: string;
    body: string;
    pinned: boolean;
  }) => void;
  onDeleteNotice: (id: string) => void;
}

const CATEGORIES: Array<'All' | NoticeCategory> = [
  'All',
  'Academic',
  'Workshop',
  'Facilities',
  'IT & Access',
];

export function NoticesView({
  notices,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onPostNotice,
  onDeleteNotice,
}: NoticesViewProps) {
  const [categoryFilter, setCategoryFilter] = useState<'All' | NoticeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Academic');
  const [author, setAuthor] = useState('Campus Coordinator');
  const [body, setBody] = useState('');
  const [pinned, setPinned] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredNotices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return notices
      .filter((n) => {
        const matchesCategory =
          categoryFilter === 'All' || n.category === categoryFilter;
        const matchesSearch =
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));
  }, [notices, categoryFilter, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setFormError('Notice title and message body are required.');
      return;
    }
    onPostNotice({
      title,
      category,
      author,
      body,
      pinned,
    });
    setTitle('');
    setBody('');
    setPinned(false);
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
            placeholder="Search campus notices..."
            aria-label="Search campus notices"
            className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-md bg-slate-100 p-1">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategoryFilter(item)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                categoryFilter === item
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredNotices.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-800">
            No notices match your filter
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Post a new announcement or switch category filters.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-800 whitespace-nowrap"
          >
            <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Post Notice</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotices.map((notice) => (
            <article
              key={notice.id}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono text-slate-500">{notice.id}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="font-medium text-slate-800">
                      {notice.category}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{notice.author}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{notice.publishedAt}</span>
                    {notice.pinned && (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <span className="inline-flex items-center gap-1 font-medium text-blue-700">
                          <Pin className="h-3 w-3" aria-hidden="true" />
                          <span>Pinned</span>
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-2 text-base font-semibold text-slate-900">
                    {notice.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteNotice(notice.id)}
                  aria-label={`Delete notice ${notice.title}`}
                  className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 transition-colors shrink-0"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600">
                {notice.body}
              </p>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-notice-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        >
          <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 id="post-notice-title" className="text-base font-semibold text-slate-900">
                Publish Campus Notice
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
                <label htmlFor="notice-title" className="block text-xs font-medium text-slate-700">
                  Notice Title
                </label>
                <input
                  id="notice-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Friday Architecture Review Room Update"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="notice-category" className="block text-xs font-medium text-slate-700">
                    Category
                  </label>
                  <select
                    id="notice-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Facilities">Facilities</option>
                    <option value="IT & Access">IT &amp; Access</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="notice-author" className="block text-xs font-medium text-slate-700">
                    Published By
                  </label>
                  <input
                    id="notice-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notice-body" className="block text-xs font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="notice-body"
                  rows={4}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Provide clear schedule, room, or action details for apprentices..."
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </div>

              <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                />
                <span>Pin notice to top of campus feed</span>
              </label>

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
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
