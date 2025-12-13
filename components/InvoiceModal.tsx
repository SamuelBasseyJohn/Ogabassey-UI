
import React, { useState } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import { Logo } from './Logo';
import { Product } from '../types';

// Define interface to match the structure in data/orders
export interface InvoiceOrderData {
    id: string;
    date: string;
    time: string;
    total: string;
    status: string;
    paymentMethod: string;
    shippingAddress: string;
    items: Product[];
    walletDeduction?: number;
    // For Invoice
    companyName?: string;
}

interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: InvoiceOrderData | null;
    mode?: 'order' | 'proforma'; // Keep prop name for internal distinction of context
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order, mode = 'order' }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [copiedAccount, setCopiedAccount] = useState(false);

    if (!isOpen || !order) return null;

    const handleDownload = () => {
        setIsDownloading(true);
        // Simulate PDF generation and download delay
        setTimeout(() => {
            setIsDownloading(false);
            alert(`${mode === 'proforma' ? 'Invoice' : 'Invoice'} #${order.id} downloaded successfully.`);
            if (mode === 'order') onClose();
        }, 1500);
    };

    const handleCopyAccount = () => {
        navigator.clipboard.writeText("8146978921");
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2000);
    };

    // Calculate dynamic totals if wallet was used
    const totalVal = parseFloat(order.total.replace(/[^0-9.]/g, ''));
    const walletDed = order.walletDeduction || 0;
    const amountDue = totalVal - walletDed;

    // Document Configuration
    const isProForma = mode === 'proforma';
    const docTitle = "INVOICE";
    
    // Status Logic
    const statusText = isProForma ? "Pending" : (walletDed > 0 && amountDue > 0 ? 'Partially Paid' : (amountDue <= 0 ? 'Paid' : 'Unpaid'));
    
    // Colors: Pro Forma/Pending is Slate/Professional, Paid is Green, Unpaid is Red
    const statusColor = isProForma 
        ? "text-gray-700 border-gray-300 bg-gray-100" 
        : (amountDue <= 0 ? "text-green-600 border-green-100 bg-green-50" : "text-red-600 border-red-100 bg-red-50");
    
    const watermarkText = isProForma ? "INVOICE" : (amountDue <= 0 ? "PAID" : "UNPAID");
    
    const watermarkColor = isProForma 
        ? "text-gray-300 border-gray-200" 
        : (amountDue <= 0 ? "text-green-500/10 border-green-500/20" : "text-red-500/10 border-red-500/20");

    const topBarColor = isProForma ? 'bg-gray-800' : 'bg-red-600';

    // Calculate Due Date (7 days)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);
    const validUntilStr = validUntil.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl shrink-0">
                    <h3 className="font-bold text-gray-900">Invoice Preview</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Preview Area - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100">
                    {/* A4 Paper Container */}
                    <div className="bg-white shadow-xl border border-gray-200 p-8 md:p-12 min-h-[1000px] relative mx-auto max-w-[794px] flex flex-col"> 
                        
                        {/* Decorative Top Bar */}
                        <div className={`absolute top-0 left-0 right-0 h-3 ${topBarColor}`}></div>

                        {/* Watermark */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] border-[6px] border-dashed rounded-xl px-4 py-2 text-5xl md:text-7xl font-black uppercase pointer-events-none whitespace-nowrap z-0 select-none ${watermarkColor}`}>
                            {watermarkText}
                        </div>

                        {/* Invoice Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start mb-12 mt-4 gap-6 relative z-10">
                            <div>
                                <Logo className="h-10 w-auto text-gray-900 mb-4" />
                                <div className="text-sm text-gray-500 leading-relaxed font-medium">
                                    <p className="font-bold text-gray-900 text-base mb-1">Ogabassey Ltd.</p>
                                    <p>2 Olaide Tomori St, Ikeja</p>
                                    <p>Lagos, Nigeria</p>
                                    <p>+234 814 697 8921</p>
                                    <p>support@ogabassey.com</p>
                                    <p>RC: 12345678</p>
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2 uppercase">{docTitle}</h1>
                                <p className="text-gray-500 font-medium text-lg">#{order.id}</p>
                                <div className={`mt-2 inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded border ${statusColor}`}>
                                    {statusText}
                                </div>
                            </div>
                        </div>

                        {/* Bill To & Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b border-gray-100 pb-12 relative z-10">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Billed To</p>
                                {order.companyName && (
                                    <p className="font-bold text-gray-900 text-xl mb-1">{order.companyName}</p>
                                )}
                                {/* If company name exists, name goes below, otherwise Name is primary */}
                                <p className={`${order.companyName ? 'text-gray-600 font-medium' : 'font-bold text-gray-900 text-xl mb-1'}`}>
                                    Alex Doe
                                </p>
                                <p className="text-gray-600 leading-relaxed max-w-xs text-sm mt-1">{order.shippingAddress}</p>
                                <p className="text-gray-600 text-sm">Lagos, Nigeria</p>
                            </div>
                            <div className="md:text-right flex flex-col md:items-end justify-between space-y-4">
                                <div className="grid grid-cols-2 gap-8 md:gap-4 text-left md:text-right">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Date Issued</p>
                                        <p className="font-medium text-gray-900">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Due Date</p>
                                        <p className="font-medium text-gray-900">{isProForma ? validUntilStr : order.date}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block min-w-[200px] text-center md:text-right">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                                    <p className="font-bold text-2xl text-gray-900">₦{amountDue.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-auto relative z-10">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-[50%]">Item Description</th>
                                        <th className="pb-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Qty</th>
                                        <th className="pb-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                        <th className="pb-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {order.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-6 pr-4 align-top">
                                                <p className="font-bold text-gray-900 text-base mb-1">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.condition} - {item.brand} {item.selectedStorage ? `- ${item.selectedStorage}` : ''}</p>
                                            </td>
                                            <td className="py-6 text-center text-gray-600 font-medium text-sm align-top pt-7">1</td>
                                            <td className="py-6 text-right text-gray-600 font-medium text-sm align-top pt-7">
                                                ₦{(item.negotiatedPrice || item.rawPrice).toLocaleString()}
                                            </td>
                                            <td className="py-6 text-right font-bold text-gray-900 text-base align-top pt-7">
                                                ₦{(item.negotiatedPrice || item.rawPrice).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex flex-col md:flex-row justify-end mt-12 mb-8 pt-6 border-t border-gray-100 relative z-10">
                            <div className="w-full md:w-5/12 space-y-3">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">{order.total}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Tax (0%)</span>
                                    <span className="font-medium text-gray-900">₦0.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                
                                {/* Wallet Deduction */}
                                {walletDed > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600 font-medium">Wallet Payment</span>
                                        <span className="text-green-600 font-bold">-₦{walletDed.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="border-t-2 border-gray-900 pt-4 mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total Due</span>
                                    <span className="text-2xl font-extrabold text-gray-900">₦{amountDue.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* BANK DETAILS & FOOTER */}
                        <div className="mt-auto border-t border-gray-100 pt-10 relative z-10">
                            
                            {/* Bank Details Section */}
                            {isProForma && (
                                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Bank Details for Payment</p>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Bank Name</p>
                                            <p className="font-bold text-gray-900">Wema Bank</p>
                                        </div>
                                        <div className="mt-3 space-y-1">
                                            <p className="text-sm text-gray-500">Account Name</p>
                                            <p className="font-bold text-gray-900">Ogabassey Limited</p>
                                        </div>
                                        <div className="mt-3 flex items-end justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Account Number</p>
                                                <p className="font-mono font-bold text-gray-900 text-lg">8146978921</p>
                                            </div>
                                            <button 
                                                onClick={handleCopyAccount}
                                                className="text-xs font-bold text-gray-600 hover:bg-gray-200 px-2 py-1 rounded transition-colors flex items-center gap-1 border border-gray-300"
                                            >
                                                {copiedAccount ? <Check size={12} className="text-green-600" /> : <Copy size={12} />} {copiedAccount ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-red-50 p-5 rounded-xl border border-red-100 flex flex-col justify-center">
                                        <p className="text-red-900 font-bold mb-2">Instant Payment</p>
                                        <p className="text-red-700 text-xs mb-4 leading-relaxed">
                                            Ready to proceed? Use the link below to pay immediately via card or transfer.
                                        </p>
                                        <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 px-4 rounded-lg transition-colors shadow-sm w-full">
                                            Pay Now (Secure Link)
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!isProForma && (
                                <div className="mb-8 p-4 bg-red-50/50 rounded-xl border border-red-100 inline-block text-center w-full">
                                    <p className="text-sm text-gray-800 font-medium">
                                        Click on <a href="#" className="text-red-600 underline font-bold hover:text-red-700 decoration-2 underline-offset-4">this link</a> to complete payment if pending.
                                    </p>
                                </div>
                            )}

                            <div className="text-center">
                                <p className="text-sm text-gray-400 italic">Thank you for choosing Ogabassey!</p>
                                <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                                    We want you to be happy with your purchase. If you have any issues, please contact us at <span className="font-bold">support@ogabassey.com</span> within 14 days.
                                </p>
                                <p className="text-[10px] text-gray-300 mt-2 uppercase tracking-widest">
                                    Generated via Ogabassey Platform
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Download Button */}
                <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl flex justify-center shrink-0">
                    <button 
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`${isProForma ? 'bg-gray-800 hover:bg-gray-900' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-3.5 px-10 rounded-xl shadow-lg transition-all flex items-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto justify-center`}
                    >
                        {isDownloading ? (
                            <span className="flex items-center gap-2">Processing...</span>
                        ) : (
                            <>
                                <Download size={20} /> Download Invoice PDF
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
