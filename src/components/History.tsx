import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';
import { SkinScanHistory } from '../types';

interface HistoryProps {
  history: SkinScanHistory[];
  onBack: () => void;
  onSelectRecord: (record: SkinScanHistory) => void;
}

export const History: React.FC<HistoryProps> = ({ history, onBack, onSelectRecord }) => {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Lịch sử soi da</h1>
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Chưa có lịch sử</h3>
            <p className="text-slate-500 mt-2">Bạn chưa thực hiện lần soi da nào.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {history.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectRecord(record)}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img 
                    src={record.imageUrl} 
                    alt="Skin scan" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(record.timestamp).toLocaleString('vi-VN')}
                  </div>
                  <h4 className="font-bold text-slate-900">
                    Loại da: {typeof record.result.skinType === 'string' ? record.result.skinType : 
                             record.result.skinType.type === 'da_dau' ? 'Da dầu' : 
                             record.result.skinType.type === 'da_kho' ? 'Da khô' : 
                             record.result.skinType.type === 'da_hon_hop' ? 'Da hỗn hợp' : 
                             record.result.skinType.type === 'da_nhay_cam' ? 'Da nhạy cảm' : 'Da bình thường'}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500" 
                        style={{ width: `${(record.result.healthScore?.score ?? record.result.score ?? 0)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{(record.result.healthScore?.score ?? record.result.score ?? 0)} điểm</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
