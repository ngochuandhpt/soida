import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  Calendar, 
  Phone, 
  ExternalLink, 
  Filter,
  RefreshCw,
  LogOut,
  ChevronRight,
  UserCheck,
  Clock,
  Trash2,
  CheckSquare,
  Square
} from 'lucide-react';
import { motion } from 'motion/react';
import { SkinScanHistory } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [scans, setScans] = useState<SkinScanHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNewOnly, setFilterNewOnly] = useState(false);
  const [filterConsultation, setFilterConsultation] = useState<'all' | 'yes' | 'no'>('all');
  const [filterProcessed, setFilterProcessed] = useState<'all' | 'yes' | 'no'>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedUserPhone, setSelectedUserPhone] = useState<string | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const fetchScans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/scans');
      if (response.ok) {
        const data = await response.json();
        setScans(data);
      }
    } catch (error) {
      console.error("Failed to fetch scans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleConsulted = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/scans/consulted', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isConsulted: !currentStatus })
      });
      if (response.ok) {
        setScans(prev => prev.map(s => s.id === id ? { ...s, isConsulted: !currentStatus } : s));
      }
    } catch (error) {
      console.error("Failed to toggle consulted status:", error);
    }
  };

  const deleteScan = async (id: string) => {
    console.log("Attempting to delete scan:", id);
    if (!window.confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) {
      console.log("Delete cancelled by user");
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/scans/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        console.log("Delete successful for id:", id);
        setScans(prev => prev.filter(s => s.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Delete failed on server:", errorData);
        alert("Xóa thất bại: " + (errorData.error || "Lỗi không xác định"));
      }
    } catch (error) {
      console.error("Failed to delete scan (network error):", error);
      alert("Lỗi kết nối khi xóa dữ liệu");
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.phoneNumber.includes(searchTerm);
    
    // Date filter
    let matchesDate = true;
    const scanDate = new Date(scan.timestamp);
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      matchesDate = matchesDate && scanDate >= start;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && scanDate <= end;
    }

    let matchesFilter = true;
    
    // Consultation filter
    if (filterConsultation === 'yes') {
      matchesFilter = matchesFilter && !!scan.consultationRequested;
    } else if (filterConsultation === 'no') {
      matchesFilter = matchesFilter && !scan.consultationRequested;
    }

    // Processed filter
    if (filterProcessed === 'yes') {
      matchesFilter = matchesFilter && !!scan.isConsulted;
    } else if (filterProcessed === 'no') {
      matchesFilter = matchesFilter && !scan.isConsulted;
    }

    // New customers filter
    if (filterNewOnly) {
      // A scan is a "new customer" scan if it's the earliest scan for that phone number
      const userScans = scans.filter(s => s.phoneNumber === scan.phoneNumber);
      const firstScan = userScans.reduce((prev, curr) => 
        new Date(curr.timestamp) < new Date(prev.timestamp) ? curr : prev
      );
      matchesFilter = matchesFilter && firstScan.id === scan.id;
    }
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  const stats = {
    totalScans: scans.length,
    uniqueUsers: new Set(scans.map(s => s.phoneNumber)).size,
    consultationRequests: scans.filter(s => s.consultationRequested).length
  };

  const userHistory = selectedUserPhone 
    ? scans.filter(s => s.phoneNumber === selectedUserPhone).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Quản trị Soida.vn</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Hệ thống quản lý dữ liệu</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchScans}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              title="Làm mới"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all"
            >
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              setFilterNewOnly(false);
              setFilterConsultation('all');
              setFilterProcessed('all');
            }}
            className={`p-6 rounded-3xl border shadow-sm cursor-pointer transition-all ${(!filterNewOnly && filterConsultation === 'all' && filterProcessed === 'all') ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${(!filterNewOnly && filterConsultation === 'all' && filterProcessed === 'all') ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <RefreshCw className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${(!filterNewOnly && filterConsultation === 'all' && filterProcessed === 'all') ? 'text-white/70' : 'text-slate-400'}`}>Tổng lượt soi</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalScans}</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setFilterNewOnly(!filterNewOnly)}
            className={`p-6 rounded-3xl border shadow-sm cursor-pointer transition-all ${filterNewOnly ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${filterNewOnly ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                <UserCheck className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${filterNewOnly ? 'text-white/70' : 'text-slate-400'}`}>Khách hàng mới</span>
            </div>
            <div className="text-3xl font-bold">{stats.uniqueUsers}</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setFilterConsultation(filterConsultation === 'yes' ? 'all' : 'yes')}
            className={`p-6 rounded-3xl border shadow-sm cursor-pointer transition-all ${filterConsultation === 'yes' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${filterConsultation === 'yes' ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'}`}>
                <Phone className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${filterConsultation === 'yes' ? 'text-white/70' : 'text-slate-400'}`}>Yêu cầu tư vấn</span>
            </div>
            <div className="text-3xl font-bold">{stats.consultationRequests}</div>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
              <div className="relative w-full md:w-80">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text"
                  placeholder="Tìm số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-sm"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-full md:w-auto">
                <div className="flex items-center gap-2 px-3 text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm text-slate-600 outline-none"
                />
                <span className="text-slate-300">→</span>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm text-slate-600 outline-none"
                />
                {(startDate || endDate) && (
                  <button 
                    onClick={() => { setStartDate(''); setEndDate(''); }}
                    className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 overflow-x-auto">
                <button 
                  onClick={() => {
                    setFilterNewOnly(false);
                    setFilterConsultation('all');
                    setFilterProcessed('all');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${(!filterNewOnly && filterConsultation === 'all' && filterProcessed === 'all') ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Tất cả
                </button>
                <button 
                  onClick={() => setFilterNewOnly(!filterNewOnly)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filterNewOnly ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Khách mới
                </button>
                <button 
                  onClick={() => setFilterConsultation(filterConsultation === 'yes' ? 'all' : 'yes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filterConsultation === 'yes' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Cần tư vấn
                </button>
                <button 
                  onClick={() => setFilterProcessed(filterProcessed === 'no' ? 'all' : 'no')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filterProcessed === 'no' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Chưa xử lý
                </button>
                <button 
                  onClick={() => setFilterProcessed(filterProcessed === 'yes' ? 'all' : 'yes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filterProcessed === 'yes' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Đã xử lý
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Khách hàng</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ảnh</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Thời gian</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Loại da</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Điểm da</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tư vấn</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Đã xử lý</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                        <p className="text-slate-500 font-medium">Đang tải dữ liệu...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredScans.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                          <Users className="w-8 h-8" />
                        </div>
                        <p className="text-slate-500 font-medium">Không tìm thấy dữ liệu phù hợp</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredScans.map((scan) => (
                    <tr 
                      key={scan.id} 
                      className="hover:bg-slate-50 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedUserPhone(scan.phoneNumber);
                        setIsHistoryModalOpen(true);
                      }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                            {scan.phoneNumber.slice(-2)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{scan.phoneNumber}</div>
                            <div className="text-xs text-slate-400">ID: {scan.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                          <img 
                            src={scan.imageUrl} 
                            alt="Scan" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {new Date(scan.timestamp).toLocaleString('vi-VN')}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                          {scan.result.skinType}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500" 
                              style={{ width: `${scan.result.score}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-900 text-sm">{scan.result.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {scan.consultationRequested ? (
                          <span className="flex items-center gap-1 text-orange-600 font-bold text-xs">
                            <Phone className="w-3 h-3" />
                            CẦN TƯ VẤN
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs font-bold">KHÔNG</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleConsulted(scan.id, !!scan.isConsulted);
                          }}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold transition-all ${scan.isConsulted ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}
                        >
                          {scan.isConsulted ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                          {scan.isConsulted ? 'ĐÃ TƯ VẤN' : 'CHƯA XỬ LÝ'}
                        </button>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUserPhone(scan.phoneNumber);
                              setIsHistoryModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Xem chi tiết"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteScan(scan.id);
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Xóa dữ liệu"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div>Hiển thị {filteredScans.length} / {scans.length} bản ghi</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">Trước</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all">Sau</button>
            </div>
          </div>
        </div>
      </main>

      {/* History Modal */}
      {isHistoryModalOpen && selectedUserPhone && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsHistoryModalOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                  {selectedUserPhone.slice(-2)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Lịch sử soi da</h2>
                  <p className="text-sm text-slate-500 font-medium">{selectedUserPhone}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-600"
              >
                <LogOut className="w-6 h-6 rotate-180" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {userHistory.map((historyItem, idx) => (
                <div key={historyItem.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      {historyItem.imageUrl ? (
                        <img 
                          src={historyItem.imageUrl} 
                          alt="Skin scan" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Users className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lần soi #{userHistory.length - idx}</span>
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase">
                            {historyItem.result.skinType}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-slate-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(historyItem.timestamp).toLocaleString('vi-VN')}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Điểm số</div>
                          <div className="text-lg font-bold text-slate-900">{historyItem.result.score}/100</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tuổi ước tính</div>
                          <div className="text-lg font-bold text-slate-900">{historyItem.result.estimatedAge}</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Độ ẩm</div>
                          <div className="text-lg font-bold text-slate-900">{historyItem.result.overview.hydration}/10</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Mụn</div>
                          <div className="text-lg font-bold text-slate-900">{historyItem.result.issues.acne}/10</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tư vấn</div>
                          <div className={`text-sm font-bold ${historyItem.consultationRequested ? 'text-orange-600' : 'text-slate-400'}`}>
                            {historyItem.consultationRequested ? 'CẦN TƯ VẤN' : 'KHÔNG'}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            Phân tích chi tiết:
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                              <span className="text-slate-500">Lỗ chân lông:</span>
                              <span className="font-bold text-slate-700">{historyItem.result.issues.largePores}/10</span>
                            </div>
                            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                              <span className="text-slate-500">Sắc tố/Nám:</span>
                              <span className="font-bold text-slate-700">{historyItem.result.issues.darkSpots}/10</span>
                            </div>
                            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                              <span className="text-slate-500">Quầng thâm:</span>
                              <span className="font-bold text-slate-700">{historyItem.result.issues.darkCircles}/10</span>
                            </div>
                            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                              <span className="text-slate-500">Lão hóa:</span>
                              <span className="font-bold text-slate-700">{historyItem.result.issues.overallAging}/10</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            Gợi ý chăm sóc:
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                              <span className="font-bold text-emerald-700 block mb-1">Sáng:</span>
                              <p className="text-slate-600">{historyItem.result.careSuggestions.morningRoutine}</p>
                            </div>
                            <div className="p-2 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                              <span className="font-bold text-indigo-700 block mb-1">Tối:</span>
                              <p className="text-slate-600">{historyItem.result.careSuggestions.nightRoutine}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900">Kết luận chuyên gia:</h4>
                        <p className="text-sm text-slate-600 leading-relaxed italic">
                          "{historyItem.result.detailedConclusion}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 text-center">
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Đóng lịch sử
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
