import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Mail, Clock, AlertCircle } from 'lucide-react';

interface DataDeletionPolicyProps {
  onBack: () => void;
}

export const DataDeletionPolicy: React.FC<DataDeletionPolicyProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Chính sách xóa dữ liệu</h1>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <p className="text-lg">
                Người dùng có quyền yêu cầu xóa dữ liệu cá nhân đã cung cấp cho ứng dụng <strong>Soida.vn</strong>. Chúng tôi cam kết tôn trọng quyền riêng tư và quyền kiểm soát dữ liệu của bạn.
              </p>
            </section>

            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                Cách thức yêu cầu
              </h2>
              <p>Yêu cầu xóa dữ liệu có thể gửi qua email chính thức của chúng tôi:</p>
              <a 
                href="mailto:tlgvn123@gmail.com" 
                className="text-emerald-600 font-bold hover:underline mt-2 inline-block text-lg"
              >
                tlgvn123@gmail.com
              </a>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Quy trình xử lý
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                  <span>Xác nhận danh tính người yêu cầu để đảm bảo an toàn thông tin.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                  <span>Tiến hành xóa dữ liệu trong vòng <strong>72 giờ</strong> kể từ khi xác nhận.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                  <span>Thông báo hoàn tất xử lý cho người dùng qua email.</span>
                </li>
              </ul>
              <p className="mt-4 text-sm italic">
                * Một số dữ liệu có thể được lưu trữ nếu pháp luật yêu cầu hoặc để phục vụ mục đích tuân thủ quy định hiện hành.
              </p>
            </section>

            <section className="border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Sau khi dữ liệu bị xóa
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Tài khoản người dùng có thể bị vô hiệu hóa hoàn toàn.</li>
                <li>Một số chức năng của ứng dụng sẽ không còn khả dụng đối với bạn.</li>
                <li>Lịch sử soi da và các kết quả phân tích trước đó sẽ không thể khôi phục.</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
