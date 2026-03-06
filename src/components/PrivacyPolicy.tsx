import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Chính sách bảo mật</h1>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Giới thiệu</h2>
              <p>
                Chính sách bảo mật này mô tả cách Công ty TLG Việt Nam (“Chúng tôi”) thu thập, sử dụng và bảo vệ dữ liệu cá nhân khi người dùng sử dụng ứng dụng <strong>Soida.vn</strong>.
              </p>
              <p className="mt-2">
                Khi sử dụng ứng dụng, bạn xác nhận đã đọc và đồng ý với các điều khoản trong chính sách này.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Loại dữ liệu được thu thập</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">a. Dữ liệu người dùng cung cấp</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Họ và tên</li>
                    <li>Số điện thoại</li>
                    <li>Email</li>
                    <li>Thông tin về tình trạng da</li>
                    <li>Hình ảnh khuôn mặt do người dùng tải lên để phân tích da</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">b. Dữ liệu kỹ thuật</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Thiết bị sử dụng</li>
                    <li>Địa chỉ IP</li>
                    <li>Hành vi sử dụng ứng dụng</li>
                    <li>Lịch sử truy cập và tương tác trong ứng dụng</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">c. Dữ liệu giao dịch</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Lịch sử mua hàng</li>
                    <li>Thông tin thanh toán (nếu có)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Mục đích sử dụng dữ liệu</h2>
              <p>Chúng tôi sử dụng dữ liệu cho các mục đích sau:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Phân tích tình trạng da bằng công nghệ AI</li>
                <li>Đưa ra gợi ý chăm sóc da và sản phẩm phù hợp</li>
                <li>Cung cấp dịch vụ chăm sóc khách hàng</li>
                <li>Xử lý đơn hàng và giao dịch</li>
                <li>Cải thiện chất lượng ứng dụng</li>
                <li>Gửi thông tin khuyến mãi khi người dùng đồng ý</li>
              </ul>
              <p className="mt-4 font-medium text-slate-800 italic">
                Chúng tôi không sử dụng dữ liệu cho mục đích khác ngoài các mục đích đã nêu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Cơ sở xử lý dữ liệu</h2>
              <p>Dữ liệu cá nhân được xử lý dựa trên:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Sự đồng ý của người dùng</li>
                <li>Nghĩa vụ pháp lý theo quy định pháp luật</li>
                <li>Nhu cầu cung cấp dịch vụ theo yêu cầu của người dùng</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Lưu trữ dữ liệu</h2>
              <p>Dữ liệu cá nhân được lưu trữ trong thời gian cần thiết để phục vụ mục đích đã nêu hoặc theo quy định pháp luật.</p>
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 mb-2">Thời gian lưu trữ dự kiến:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Dữ liệu phân tích da: tối đa 24 tháng</li>
                  <li>Dữ liệu tài khoản: đến khi người dùng yêu cầu xóa</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">6. Chia sẻ dữ liệu</h2>
              <p>Chúng tôi có thể chia sẻ dữ liệu với:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Nhà cung cấp dịch vụ lưu trữ máy chủ</li>
                <li>Đơn vị xử lý thanh toán</li>
                <li>Đối tác vận chuyển</li>
              </ul>
              <p className="mt-4">Tất cả các bên này đều phải tuân thủ nghĩa vụ bảo mật dữ liệu.</p>
              <p className="mt-2 font-bold text-emerald-600">Công ty TLG Việt Nam cam kết không bán dữ liệu cá nhân cho bên thứ ba.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">7. Bảo mật dữ liệu</h2>
              <p>Chúng tôi áp dụng các biện pháp bảo mật sau:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Mã hóa dữ liệu</li>
                <li>Kiểm soát truy cập nội bộ</li>
                <li>Bảo mật hệ thống máy chủ</li>
                <li>Giám sát truy cập dữ liệu</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">8. Quyền của người dùng</h2>
              <p>Người dùng có quyền:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Yêu cầu truy cập dữ liệu cá nhân</li>
                <li>Yêu cầu chỉnh sửa thông tin</li>
                <li>Yêu cầu xóa dữ liệu</li>
                <li>Rút lại sự đồng ý xử lý dữ liệu</li>
              </ul>
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="font-bold text-slate-800">Liên hệ yêu cầu qua email:</p>
                <a href="mailto:tlgvn123@gmail.com" className="text-emerald-600 font-bold hover:underline">tlgvn123@gmail.com</a>
              </div>
            </section>

            <section className="border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">9. Thay đổi chính sách</h2>
              <p>
                Công ty TLG Việt Nam có thể cập nhật chính sách bảo mật khi cần thiết. Các thay đổi sẽ được thông báo trên ứng dụng <strong>Soida.vn</strong>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
