'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock de validação do 2FA
    await new Promise(r => setTimeout(r, 1500));
    router.push('/dashboard');
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      
      <h2 className="text-xl font-bold text-zinc-900 mb-2">Autenticação em Duas Etapas</h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xs">
        Insira o código de segurança gerado no seu aplicativo autenticador.
      </p>

      <form onSubmit={handleVerification} className="w-full flex flex-col gap-6">
        <input 
          type="text" 
          maxLength={6}
          required
          disabled={isProcessing}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] font-bold bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E50000] focus:border-transparent transition-all"
          placeholder="000000"
        />

        <button 
          type="submit" 
          disabled={isProcessing || code.length < 6}
          className="w-full bg-[#E50000] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-12"
        >
          {isProcessing ? 'Validando Dispositivo...' : 'Confirmar Acesso'}
        </button>
      </form>
    </div>
  );
}