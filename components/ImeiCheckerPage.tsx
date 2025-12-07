
import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Smartphone, Loader2, ScanBarcode, ArrowRight } from 'lucide-react';

export const ImeiCheckerPage: React.FC = () => {
  const [imei, setImei] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imei.trim()) return;
    
    setIsLoading(true);
    setResult(null);

    // Mock API simulation
    setTimeout(() => {
        setIsLoading(false);
        // Mock result: if IMEI ends in 0, it's 'Blacklisted' for demo purposes
        const isClean = !imei.endsWith('0');
        
        setResult({
            imei: imei,
            device: 'iPhone 15 Pro Max 1TB',
            status: isClean ? 'Clean' : 'Blacklisted',
            icloud: isClean ? 'Clean' : 'Lost Mode',
            simLock: 'Unlocked',
            blacklistStatus: isClean ? 'Clean' : 'Reported Stolen',
            warranty: 'Active until Dec 2024'
        });
    }, 2000);
  };

  return (
      <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 pt-4 md:pt-8 flex flex-col">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full flex-1">
              <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3">
                          <ScanBarcode size={32} />
                      </div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">IMEI Checker</h1>
                      <p className="text-gray-500">Check the status of any device instantly. Verify if it's clean, unlocked, and authentic.</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                      <form onSubmit={handleCheck} className="relative">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Enter IMEI Number</label>
                          <div className="flex gap-2">
                              <div className="relative flex-1">
                                  <input 
                                    type="text" 
                                    value={imei}
                                    onChange={(e) => setImei(e.target.value.replace(/\D/g, '').slice(0, 15))}
                                    placeholder="e.g. 3569..." 
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none text-lg font-mono tracking-widest transition-all"
                                  />
                                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                              </div>
                              <button 
                                disabled={isLoading || imei.length < 15}
                                type="submit"
                                className="bg-gray-900 text-white font-bold px-6 md:px-8 rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                              >
                                {isLoading ? <Loader2 className="animate-spin" /> : <>Check <ArrowRight size={18} /></>}
                              </button>
                          </div>
                          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                             <AlertTriangle size={12} /> Dial *#06# on your device to see your IMEI
                          </p>
                      </form>
                  </div>

                  {result && (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                          <div className={`p-6 border-b border-gray-100 flex items-center justify-between ${result.status === 'Clean' ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
                              <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${result.status === 'Clean' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                      {result.status === 'Clean' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-gray-900 text-lg">{result.device}</h3>
                                      <p className={`text-sm font-medium ${result.status === 'Clean' ? 'text-green-600' : 'text-red-600'}`}>
                                          Status: {result.status}
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                      <span className="text-gray-500 text-sm">IMEI</span>
                                      <span className="font-mono font-medium text-gray-900">{result.imei}</span>
                                  </div>
                                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                      <span className="text-gray-500 text-sm">Find My iPhone</span>
                                      <span className={`font-medium text-sm ${result.icloud === 'Clean' ? 'text-green-600' : 'text-red-600'}`}>{result.icloud === 'Clean' ? 'OFF' : 'ON'}</span>
                                  </div>
                              </div>
                              <div className="space-y-4">
                                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                      <span className="text-gray-500 text-sm">Sim Lock</span>
                                      <span className="font-medium text-gray-900 text-sm">{result.simLock}</span>
                                  </div>
                                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                      <span className="text-gray-500 text-sm">Blacklist Status</span>
                                      <span className={`font-medium text-sm ${result.blacklistStatus === 'Clean' ? 'text-green-600' : 'text-red-600'}`}>{result.blacklistStatus}</span>
                                  </div>
                              </div>
                          </div>
                          {result.status === 'Clean' && (
                              <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                                  <p className="text-sm text-gray-500">This device is clean and ready for use.</p>
                              </div>
                          )}
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};
