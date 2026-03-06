import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Smartphone, Sparkles, User, Sun, X, ShieldCheck, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface InstructionPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const InstructionPopup: React.FC<InstructionPopupProps> = ({ onConfirm, onCancel }) => {
  const [agreed, setAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState<'none' | 'privacy' | 'terms'>('none');

  const instructions = [
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
      text: "Giữ chặt điện thoại trong khi chụp"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      text: "Tẩy trang & làm sạch da trước khi sử dụng ứng dụng"
    },
    {
      icon: <User className="w-5 h-5 text-emerald-500" />,
      text: "Cột/búi tóc lên cao và cởi mắt kính (nếu có)"
    },
    {
      icon: <Sun className="w-5 h-5 text-emerald-500" />,
      text: "Kiểm tra ánh sáng của phòng để camera trước phân tích làn da bạn tốt nhất"
    }
  ];

  const PrivacyPolicy = () => (
    <div className="text-xs text-slate-600 space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
      <section>
        <h4 className="font-bold text-slate-900 mb-1">1. Giới thiệu</h4>
        <p>Chính sách bảo mật này mô tả cách Công ty TLG Việt Nam (“Chúng tôi”) thu thập, sử dụng và bảo vệ dữ liệu cá nhân khi người dùng sử dụng ứng dụng Soida.vn. Khi sử dụng ứng dụng, bạn xác nhận đã đọc và đồng ý với các điều khoản trong chính sách này.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">2. Loại dữ liệu được thu thập</h4>
        <div className="space-y-2">
          <p><strong>a. Dữ liệu người dùng cung cấp:</strong> Họ và tên, Số điện thoại, Email, Thông tin về tình trạng da, Hình ảnh khuôn mặt do người dùng tải lên để phân tích da.</p>
          <p><strong>b. Dữ liệu kỹ thuật:</strong> Thiết bị sử dụng, Địa chỉ IP, Hành vi sử dụng ứng dụng, Lịch sử truy cập và tương tác trong ứng dụng.</p>
          <p><strong>c. Dữ liệu giao dịch:</strong> Lịch sử mua hàng, Thông tin thanh toán (nếu có).</p>
        </div>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">3. Mục đích sử dụng dữ liệu</h4>
        <p>Chúng tôi sử dụng dữ liệu cho các mục đích: Phân tích tình trạng da bằng công nghệ AI; Đưa ra gợi ý chăm sóc da và sản phẩm phù hợp; Cung cấp dịch vụ chăm sóc khách hàng; Xử lý đơn hàng và giao dịch; Cải thiện chất lượng ứng dụng; Gửi thông tin khuyến mãi khi người dùng đồng ý.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">4. Cơ sở xử lý dữ liệu</h4>
        <p>Dữ liệu cá nhân được xử lý dựa trên: Sự đồng ý của người dùng; Nghĩa vụ pháp lý theo quy định pháp luật; Nhu cầu cung cấp dịch vụ theo yêu cầu của người dùng.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">5. Lưu trữ dữ liệu</h4>
        <p>Dữ liệu cá nhân được lưu trữ trong thời gian cần thiết. Dự kiến: Dữ liệu phân tích da (tối đa 24 tháng); Dữ liệu tài khoản (đến khi người dùng yêu cầu xóa).</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">6. Chia sẻ dữ liệu</h4>
        <p>Chúng tôi có thể chia sẻ dữ liệu với nhà cung cấp dịch vụ lưu trữ, đơn vị xử lý thanh toán, đối tác vận chuyển. Công ty TLG Việt Nam cam kết không bán dữ liệu cá nhân cho bên thứ ba.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">7. Bảo mật dữ liệu</h4>
        <p>Chúng áp dụng: Mã hóa dữ liệu, Kiểm soát truy cập nội bộ, Bảo mật hệ thống máy chủ, Giám sát truy cập dữ liệu.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">8. Quyền của người dùng</h4>
        <p>Người dùng có quyền: Yêu cầu truy cập, chỉnh sửa, xóa dữ liệu hoặc rút lại sự đồng ý. Liên hệ yêu cầu qua email: tlgvn123@gmail.com</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">9. Thay đổi chính sách</h4>
        <p>Công ty TLG Việt Nam có thể cập nhật chính sách bảo mật khi cần thiết. Các thay đổi sẽ được thông báo trên ứng dụng Soida.vn.</p>
      </section>
    </div>
  );

  const TermsOfService = () => (
    <div className="text-xs text-slate-600 space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
      <section>
        <h4 className="font-bold text-slate-900 mb-1">1. Phạm vi dịch vụ</h4>
        <p>Ứng dụng Soida.vn cung cấp: Công cụ phân tích da bằng công nghệ trí tuệ nhân tạo (AI); Gợi ý quy trình chăm sóc da; Đề xuất sản phẩm mỹ phẩm phù hợp với tình trạng da.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">2. Điều kiện sử dụng</h4>
        <p>Người dùng cam kết: Cung cấp thông tin chính xác; Không sử dụng ứng dụng cho mục đích vi phạm pháp luật; Không tải lên hình ảnh của người khác khi chưa có sự cho phép.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">3. Quyền sở hữu trí tuệ</h4>
        <p>Toàn bộ nội dung, thuật toán, công nghệ, thiết kế hệ thống thuộc quyền sở hữu của Công ty TLG Việt Nam. Nghiêm cấm sao chép, reverse engineer, khai thác thương mại trái phép.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">4. Giới hạn trách nhiệm</h4>
        <p>Ứng dụng Soida.vn cung cấp kết quả phân tích dựa trên thuật toán AI. Chúng tôi không chịu trách nhiệm đối với: Quyết định sử dụng sản phẩm của người dùng; Các phản ứng cá nhân đối với mỹ phẩm; Việc sử dụng thông tin sai mục đích.</p>
      </section>
      <section>
        <h4 className="font-bold text-slate-900 mb-1">5. Chấm dứt tài khoản</h4>
        <p>Công ty TLG Việt Nam có quyền tạm khóa tài khoản hoặc chấm dứt quyền truy cập nếu phát hiện hành vi vi phạm điều khoản sử dụng.</p>
      </section>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative my-8"
      >
        <button 
          onClick={onCancel}
          className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 md:p-10">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Hướng dẫn & Đồng ý</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Vui lòng đọc kỹ hướng dẫn và xác nhận đồng ý để bắt đầu.
            </p>
          </div>

          <div className="space-y-2 mb-6">
            {instructions.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="mt-0.5">{item.icon}</div>
                <p className="text-[11px] font-medium text-slate-700 leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Policy Toggles */}
          <div className="space-y-2 mb-6">
            <button 
              onClick={() => setShowPolicy(showPolicy === 'privacy' ? 'none' : 'privacy')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Chính sách bảo mật
              </div>
              {showPolicy === 'privacy' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {showPolicy === 'privacy' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-slate-50/50 rounded-xl p-4 border border-slate-100"
                >
                  <PrivacyPolicy />
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setShowPolicy(showPolicy === 'terms' ? 'none' : 'terms')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Điều khoản dịch vụ
              </div>
              {showPolicy === 'terms' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {showPolicy === 'terms' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-slate-50/50 rounded-xl p-4 border border-slate-100"
                >
                  <TermsOfService />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Consent Section */}
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-600 leading-relaxed">
                <p className="mb-2">Ứng dụng sử dụng công nghệ AI để phân tích hình ảnh khuôn mặt. Kết quả chỉ mang tính tham khảo và không thay thế tư vấn y khoa.</p>
                <p>Tôi đồng ý cho phép <strong>soida.vn</strong> xử lý hình ảnh và dữ liệu cá nhân của tôi theo Chính sách bảo mật và Điều khoản dịch vụ.</p>
              </div>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-emerald-200 bg-white transition-all checked:border-emerald-500 checked:bg-emerald-500"
                />
                <CheckCircle2 className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">Tôi đồng ý</span>
            </label>
          </div>

          <button 
            onClick={onConfirm}
            disabled={!agreed}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg uppercase tracking-wider ${
              agreed 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            BẮT ĐẦU PHÂN TÍCH
          </button>
        </div>
      </motion.div>
    </div>
  );
};
