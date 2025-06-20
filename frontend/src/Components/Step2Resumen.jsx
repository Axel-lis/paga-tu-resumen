import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Calendar, DollarSign, CheckCircle, Sparkles, Lock, AlertCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-700/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
  </div>
);

const FloatingParticles = () => {
  const particles = React.useMemo(() =>
    Array.from({ length: 8 }).map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    })), []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 mt-15 bg-white/20 rounded-full animate-float"
          style={style}
        />
      ))}
    </div>
  );
};

const ResumenCard = ({ icon: Icon, label, value, highlight = false, prefix = '', suffix = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden group transform transition-all duration-500 hover:scale-[1.02] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ${
              highlight 
                ? 'bg-gradient-to-br from-purple-500 to-indigo-700' 
                : 'bg-gradient-to-br from-purple-500 to-indigo-600'
            }`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{label}</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          {highlight && (
            <div className="animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
          )}
        </div>
        
        <div className={`text-4xl font-bold mb-2 ${
          highlight 
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent' 
            : 'text-gray-800'
        }`}>
          {prefix}{value}{suffix}
        </div>
      </div>
    </div>
  );
};

export const Step2Resumen = () => {
  const { formData, setStep } = useFormContext();
  const navigate = useNavigate();
  
  const next = () => {
    setStep(3);
    navigate('/step3');
  };
  
  const back = () => navigate('/step1');
  
  
  const resumen = formData.resumen;
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSuccess(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // Usa mes base 0
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };
  

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (!resumen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="w-full max-w-lg relative z-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Resumen no <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Disponible</span>
            </h1>
            <p className="text-gray-300 text-lg">
              No se pudo encontrar el resumen solicitado
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10">
            <button
              onClick={back}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-lg">Volver al Inicio</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-800  to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      
      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className={`w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 rounded-3xl shadow-2xl flex items-center justify-center transform transition-all duration-700 ${showSuccess ? 'rotate-0 scale-100' : 'rotate-180 scale-75'}`}>
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            {showSuccess && (
              <div className="absolute -top-1 -right-1 animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            ¡Resumen <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Encontrado</span>!
          </h1>
          <p className="text-gray-300 text-lg font-medium">
            Revisa los detalles de tu resumen antes de continuar
          </p>
        </div>

        {/* Resumen Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <ResumenCard
            icon={DollarSign}
            label="Importe a Pagar"
            value={formatCurrency(resumen.importe)}
            highlight={true}
          />
          
          <ResumenCard
            icon={Calendar}
            label="Fecha de Vencimiento"
            value={formatDate(resumen.vencimiento)}
          />
        </div>

        {/* Estado del Resumen */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-green-50/50 rounded-3xl"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Estado del Resumen</h3>
                <p className="text-emerald-600 font-semibold">Activo y listo para pago</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 rounded-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <button
              onClick={next}
              className="w-full bg-gradient-to-r from-purple-800 via-indigo-500 to-indigo-700 hover:from-purple-700-700 hover:via-indigo-600 hover:to-indigo-800 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl relative overflow-hidden group animate-pulse-border cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-center space-x-4">
                <CreditCard className="w-7 h-7 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-xl">Proceder al Pago</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </button>

            <button
              onClick={back}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-lg">Volver al Inicio</span>
            </button>

            {/* Información de Seguridad */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 shadow-lg mt-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-blue-900 mb-2">
                    Pago 100% Seguro
                  </h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Tu transacción está protegida con los más altos estándares de seguridad bancaria y encriptación SSL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(3deg); }
          66% { transform: translateY(5px) rotate(-2deg); }
        }
        
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }
      `}</style>
    </div>
  );
};