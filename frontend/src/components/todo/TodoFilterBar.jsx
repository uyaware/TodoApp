import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

export default function TodoFilterBar({
  searchTerm,
  onSearch,
  statusFilter,
  onFilterChange,
  onReset,
  loading,
}) {
  const [localSearch, setLocalSearch] = useState(searchTerm || '');

  // Đồng bộ lại ô input nếu searchTerm ở cha bị reset (vd sau khi bấm nút Đặt lại)
  useEffect(() => {
    setLocalSearch(searchTerm || '');
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearch); // Chỉ kích hoạt search khi Submit Form (Enter / Click Icon)
  };

  const handleReset = () => {
    setLocalSearch('');
    onReset();
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-3">
      {/* Form Search ép buộc kích hoạt bằng Enter hoặc Click button */}
      <form onSubmit={handleSubmit} className="relative flex-1 flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề (Ấn Enter hoặc nút Tìm)..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Search size={16} />
          <span>Tìm</span>
        </button>
      </form>

      {/* Khu vực Lọc Trạng thái & Reset */}
      <div className="flex gap-2 min-w-[200px]">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <select
            value={statusFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-slate-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="false">Chưa hoàn thành</option>
            <option value="true">Đã hoàn thành</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="p-2 border border-slate-300 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50"
          title="Đặt lại bộ lọc"
        >
          <RotateCcw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
    </div>
  );
}