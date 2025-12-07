
import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, History, PiggyBank, TrendingUp, Copy, Check, Smartphone, Wifi, Tv, Zap, Gamepad2 } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { useWallet } from '../contexts/WalletContext';

export const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'earnings' | 'savings'>('earnings');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { earningsBalance, savingsBalance } = useWallet();

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 pt-4 md:pt-8 flex flex-col">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full flex-1 flex flex-col">
        
        {/* Header with Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 shrink-0">
                <Wallet className="text-red-600 fill-red-600" />
                Wallet
            </h1>

            {/* Segmented Control */}
            <div className="bg-white p-1 rounded-xl border border-gray-200 flex w-full md:w-auto shadow-sm">
                <button 
                    onClick={() => setActiveTab('earnings')}
                    className={`flex-1 md:flex-none px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === 'earnings' ? 'bg-red-50 text-red-600 shadow-sm ring-1 ring-red-100' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    Earnings
                </button>
                <button 
                    onClick={() => setActiveTab('savings')}
                    className={`flex-1 md:flex-none px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === 'savings' ? 'bg-green-50 text-green-600 shadow-sm ring-1 ring-green-100' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    Savings
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Balance & Actions */}
            <div className="lg:col-span-5 space-y-6">
                
                {/* Balance Card - Dynamic Style based on Tab */}
                <div className={`rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden group transition-colors duration-500 ${activeTab === 'earnings' ? 'bg-[#1a1a1a]' : 'bg-green-700'}`}>
                     {/* Pattern Background */}
                     <div className="absolute inset-0 opacity-10" 
                        style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}>
                    </div>

                    <div className="relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300" key={activeTab}>
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-white/70 text-sm font-medium uppercase tracking-wider">
                                {activeTab === 'earnings' ? 'Total Balance' : 'Total Savings'}
                            </p>
                            {activeTab === 'savings' && <PiggyBank className="text-green-200" />}
                        </div>
                        
                        <div className="text-4xl md:text-5xl font-bold mb-8">
                            {activeTab === 'earnings' ? `₦${earningsBalance.toLocaleString()}.00` : `₦${savingsBalance.toLocaleString()}.00`}
                        </div>
                        
                        <div className="flex gap-3">
                            <button className={`flex-1 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${activeTab === 'earnings' ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/20' : 'bg-white text-green-700 hover:bg-green-50 shadow-green-900/20'}`}>
                                <Plus size={20} /> {activeTab === 'earnings' ? 'Start Saving' : 'Add Savings'}
                            </button>
                            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all backdrop-blur-sm active:scale-95 border border-white/10">
                                <ArrowUpRight size={20} /> Withdraw
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account Details Section (Always Visible) */}
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* Designated Account */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Designated Account</span>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Wema</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-mono font-bold text-gray-900 text-lg tracking-tight">8146978921</p>
                            <button 
                                onClick={() => handleCopy('8146978921', 'account')}
                                className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                            >
                                {copiedField === 'account' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 leading-tight">
                            Money sent here reflects in your balance instantly.
                        </p>
                    </div>

                    {/* Referral Code */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="mb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Referral Code</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-mono font-bold text-gray-900 text-lg tracking-tight">OGA-ALEX</p>
                            <button 
                                onClick={() => handleCopy('OGA-ALEX', 'referral')}
                                className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                            >
                                {copiedField === 'referral' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 leading-tight">
                            Share code to earn bonuses.
                        </p>
                    </div>
                </div>

                {/* Quick Actions / Pay Bills (Always Visible) */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Zap size={18} className="text-yellow-500 fill-yellow-500" />
                            Pay Bills
                        </h3>
                        <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">Cashback</span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2">
                        {[
                            { name: 'Airtime', icon: Smartphone, color: 'text-orange-600', bg: 'bg-orange-50' },
                            { name: 'Data', icon: Wifi, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { name: 'TV', icon: Tv, color: 'text-purple-600', bg: 'bg-purple-50' },
                            { name: 'Power', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                            { name: 'Betting', icon: Gamepad2, color: 'text-green-600', bg: 'bg-green-50' }
                        ].map((item, idx) => (
                            <button key={idx} className="flex flex-col items-center gap-2 group p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${item.bg} ${item.color}`}>
                                    <item.icon size={18} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-600 group-hover:text-gray-900">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Transaction History */}
            <div className="lg:col-span-7 flex flex-col h-full min-h-[400px]">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-1 h-full overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <History size={18} className="text-gray-400" />
                            {activeTab === 'earnings' ? 'Recent Transactions' : 'Savings History'}
                        </h3>
                        <button className="text-xs font-bold text-red-600 hover:text-red-700">View All</button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative border border-gray-100">
                            <Wallet className="text-gray-300" size={32} strokeWidth={1.5} />
                            <div className="absolute top-5 right-5 w-4 h-4 bg-red-50 rounded-full flex items-center justify-center border border-red-100 shadow-sm">
                                <Plus className="text-red-500 w-2.5 h-2.5" strokeWidth={3} />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {activeTab === 'earnings' ? "No transactions yet" : "No savings history"}
                        </h3>
                        <p className="text-gray-500 text-sm max-w-[280px] leading-relaxed">
                            {activeTab === 'earnings' 
                                ? "Your recent wallet top-ups and purchases will appear here." 
                                : "Start saving to see your history grow."}
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
