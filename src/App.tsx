import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Scanner } from './components/Scanner';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { InstructionPopup } from './components/InstructionPopup';
import { DataDeletionPolicy } from './components/DataDeletionPolicy';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { Login } from './components/Login';
import { AnalysisCompletionPopup } from './components/AnalysisCompletionPopup';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { History } from './components/History';
import { AppState, SkinAnalysisResult, SkinScanHistory } from './types';
import { generateMockAnalysis } from './utils';
import { analyzeSkin } from './services/geminiService';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2, X } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>('home');
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(localStorage.getItem('userPhone'));
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [history, setHistory] = useState<SkinScanHistory[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPostAnalysisLogin, setShowPostAnalysisLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userPhone) {
      const savedHistory = localStorage.getItem(`history_${userPhone}`);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, [userPhone]);

  const handleLogin = (phone: string) => {
    setUserPhone(phone);
    localStorage.setItem('userPhone', phone);
    setState('home');
  };

  const handleLogout = () => {
    setUserPhone(null);
    localStorage.removeItem('userPhone');
    setState('home');
  };

  const handleStartScan = () => {
    setState('instructions');
  };

  const handleConfirmInstructions = () => {
    setState('scanning');
  };

  const handleScanComplete = async (imageUrl: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeSkin(imageUrl);
      result.imageUrl = imageUrl;
      
      setAnalysisResult(result);
      
      if (userPhone) {
        // Already logged in, save history and show results directly
        const newRecord: SkinScanHistory = {
          id: Date.now().toString(),
          phoneNumber: userPhone,
          result: result,
          imageUrl: imageUrl,
          timestamp: result.timestamp,
          consultationRequested: result.consultationRequested
        };

        // Save to server
        try {
          await fetch('/api/scans', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord),
          });
        } catch (err) {
          console.error("Failed to save scan to server:", err);
        }

        const updatedHistory = [newRecord, ...history];
        setHistory(updatedHistory);
        localStorage.setItem(`history_${userPhone}`, JSON.stringify(updatedHistory));
        
        setState('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Not logged in, show the login popup
        setShowPostAnalysisLogin(true);
      }
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Không thể phân tích da. Vui lòng thử lại sau.");
      setState('home');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePostAnalysisLogin = async (phone: string) => {
    setUserPhone(phone);
    localStorage.setItem('userPhone', phone);
    setShowPostAnalysisLogin(false);
    
    if (analysisResult) {
      const newRecord: SkinScanHistory = {
        id: Date.now().toString(),
        phoneNumber: phone,
        result: analysisResult,
        imageUrl: analysisResult.imageUrl || '',
        timestamp: analysisResult.timestamp, // Use the timestamp from analysisResult
        consultationRequested: analysisResult.consultationRequested
      };
      
      // Save to server
      try {
        await fetch('/api/scans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        });
      } catch (err) {
        console.error("Failed to save scan to server:", err);
      }

      // Get existing history for this phone
      const savedHistory = localStorage.getItem(`history_${phone}`);
      const existingHistory = savedHistory ? JSON.parse(savedHistory) : [];
      const updatedHistory = [newRecord, ...existingHistory];
      
      setHistory(updatedHistory);
      localStorage.setItem(`history_${phone}`, JSON.stringify(updatedHistory));
    }
    
    setState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryRecord = (record: SkinScanHistory) => {
    setAnalysisResult({
      ...record.result,
      consultationRequested: record.consultationRequested
    });
    setState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setState('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultation = async (requested: boolean) => {
    if (analysisResult) {
      setAnalysisResult({ ...analysisResult, consultationRequested: requested });
      
      // Update on server
      if (userPhone) {
        try {
          await fetch('/api/scans/consultation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phoneNumber: userPhone,
              timestamp: analysisResult.timestamp,
              requested
            }),
          });
        } catch (err) {
          console.error("Failed to update consultation on server:", err);
        }
      }
    }

    if (userPhone && history.length > 0) {
      // Find the record matching the current analysis result timestamp
      const updatedHistory = history.map(record => {
        if (record.result.timestamp === analysisResult?.timestamp) {
          return { 
            ...record, 
            consultationRequested: requested,
            result: { ...record.result, consultationRequested: requested }
          };
        }
        return record;
      });
      
      setHistory(updatedHistory);
      localStorage.setItem(`history_${userPhone}`, JSON.stringify(updatedHistory));
    }
  };

  const handleAdminLogin = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
    setState('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
    setState('home');
  };

  if (state === 'admin-dashboard' && adminToken) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        onStartScan={handleStartScan} 
        onNavigate={(page) => setState(page)} 
        userPhone={userPhone}
        onLogout={handleLogout}
        onLoginClick={() => setState('login')}
      />
      
      <main className="flex-grow">
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center"
            >
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Đang phân tích da bằng AI...</h2>
              <p className="text-slate-400 max-w-md">
                Hệ thống đang quét các đặc điểm da, nếp nhăn, lỗ chân lông và các vấn đề khác. Vui lòng đợi trong giây lát.
              </p>
            </motion.div>
          )}

          {showPostAnalysisLogin && (
            <AnalysisCompletionPopup 
              onLogin={handlePostAnalysisLogin} 
              initialPhone={userPhone}
            />
          )}
        </AnimatePresence>

        {error && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="p-1 hover:bg-white/20 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {state === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero onStart={handleStartScan} />
              
              {/* Features Section */}
              <section className="py-20 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Tại sao phái đẹp nên chọn soi da online bằng công nghệ AI?</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                      Soida.vn là trợ lý AI tin cậy giúp phụ nữ thấu hiểu làn da của mình chỉ trong vài giây. <br />
                      Bằng công nghệ phân tích hình ảnh kết hợp trí tuệ nhân tạo, hệ thống sẽ đánh giá các đặc điểm da và đưa ra gợi ý chăm sóc phù hợp nhất.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard 
                      title="Chính xác 95%" 
                      desc="Thuật toán AI được huấn luyện trên 1 triệu hình ảnh da liễu thực tế."
                      icon="🎯"
                    />
                    <FeatureCard 
                      title="Kết quả tức thì" 
                      desc="Phân tích và đưa ra kết quả chỉ trong vòng chưa đầy 5 giây."
                      icon="⚡"
                    />
                    <FeatureCard 
                      title="Bảo mật tuyệt đối" 
                      desc="Hình ảnh của bạn được mã hóa và bảo mật ngay sau khi phân tích xong."
                      icon="🔒"
                    />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {state === 'results' && analysisResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Results 
                data={analysisResult} 
                onReset={handleReset} 
                onConsultation={handleConsultation}
              />
            </motion.div>
          )}

          {state === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <History 
                history={history} 
                onBack={() => setState('home')} 
                onSelectRecord={handleSelectHistoryRecord}
              />
            </motion.div>
          )}

          {state === 'data-deletion' && (
            <motion.div
              key="data-deletion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <DataDeletionPolicy onBack={() => setState('home')} />
            </motion.div>
          )}

          {state === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PrivacyPolicy onBack={() => setState('home')} />
            </motion.div>
          )}

          {state === 'terms' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TermsOfUse onBack={() => setState('home')} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state === 'instructions' && (
            <InstructionPopup 
              onConfirm={handleConfirmInstructions}
              onCancel={() => setState('home')}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state === 'scanning' && (
            <Scanner 
              onScanComplete={handleScanComplete} 
              onCancel={() => setState('home')} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state === 'login' && (
            <Login 
              onLogin={handleLogin}
              onClose={() => setState('home')}
            />
          )}
          {state === 'admin-login' && (
            <AdminLogin 
              onLogin={handleAdminLogin}
              onClose={() => setState('home')}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer 
        onNavigate={(page) => setState(page)} 
        onAdminClick={() => setState(adminToken ? 'admin-dashboard' : 'admin-login')}
      />
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
