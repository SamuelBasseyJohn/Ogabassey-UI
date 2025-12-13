
import React, { useEffect } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Wrench, Clock, Zap } from 'lucide-react';

export const WarrantyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-4">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/security.png')]"></div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
             <ShieldCheck size={32} className="text-green-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Warranty Policy</h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            We stand behind the quality of our gadgets. Here is everything you need to know about your coverage.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-10 relative z-20">
        <div className="space-y-8">
            
            {/* Coverage Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-600">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Brand New Devices</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Covered by the official manufacturer's warranty.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-900 bg-gray-50 p-2 rounded-lg w-fit">
                        <Clock size={14} /> 12 Months Coverage
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">UK Used / Pre-owned</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Covered by Ogabassey's limited service warranty.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-900 bg-gray-50 p-2 rounded-lg w-fit">
                        <Clock size={14} /> 3 - 6 Months Coverage
                    </div>
                </div>
            </div>

            {/* What's Covered vs Not Covered */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <CheckCircle2 className="text-green-600" /> What is Covered
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Factory defects (screen touch issues, camera failure)",
                                "Network/Connectivity failures not caused by damage",
                                "Battery failure (if health drops below 50% in 1 month)",
                                "Motherboard issues occurring spontaneously",
                                "Software malfunctions (boot loops)"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-gray-600">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 bg-red-50/10">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <XCircle className="text-red-600" /> What is NOT Covered
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Physical damage (cracked screens, dents, bent frames)",
                                "Liquid damage (water, oil, chemical ingress)",
                                "Burn-in or screen bleeding due to pressure",
                                "Wear and tear (scratches, peeling paint)",
                                "Devices repaired by unauthorized third-party technicians"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-gray-600">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Important Notice */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-start gap-4">
                <AlertTriangle className="text-orange-600 shrink-0" />
                <div>
                    <h4 className="font-bold text-orange-900 text-sm uppercase tracking-wide mb-1">Warranty Void If Removed</h4>
                    <p className="text-sm text-orange-800 leading-relaxed">
                        Every device sold by Ogabassey comes with a tamper-proof warranty seal (usually on one of the screws or inside the device). 
                        If this seal is broken, removed, or tampered with, <strong>your warranty is instantly voided</strong>, regardless of the issue.
                    </p>
                </div>
            </div>

            {/* Claims Process */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">How to Claim Warranty</h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">1</div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Contact Support</h4>
                            <p className="text-sm text-gray-600 mt-1">Send a message to support@ogabassey.com with your Order ID and a clear description/video of the fault.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Return Device</h4>
                            <p className="text-sm text-gray-600 mt-1">Once approved, ship the device to our Lagos office or drop it off in person. Ensure you back up your data and remove iCloud/Google accounts.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">3</div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Diagnosis & Resolution</h4>
                            <p className="text-sm text-gray-600 mt-1">Our technicians will inspect the device (24-48 hours). If the fault is covered, we will repair it free of charge or replace the unit if irreparable.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
