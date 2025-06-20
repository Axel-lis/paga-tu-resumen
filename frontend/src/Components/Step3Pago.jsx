import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Shield, DollarSign, CheckCircle, Sparkles, Lock, Loader2, Clock, Star, Zap } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
  </div>
);

const FloatingParticles = () => {
  const particles = React.useMemo(() =>
    Array.from({ length: 12 }).map(() => ({
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

const PaymentMethodCard = ({ icon: Icon, title, description, selected, onClick, premium = false }) => (
  <div 
    onClick={onClick}
    className={`relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group ${
      selected 
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50/80 to-amber-50/80' 
        : 'border-white/20 hover:border-yellow-200'
    }`}
  >
    {premium && (
      <div className="absolute -top-3 -right-3">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          RECOMENDADO
        </div>
      </div>
    )}
    
    <div className="flex items-center space-x-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ${
        selected 
          ? 'bg-gradient-to-br from-yellow-500 to-orange-600' 
          : 'bg-gradient-to-br from-gray-500 to-gray-600'
      }`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {selected && (
        <CheckCircle className="w-6 h-6 text-yellow-500 animate-scale-in" />
      )}
    </div>
  </div>
);

const ProcessingAnimation = () => (
  <div className="flex flex-col items-center space-y-6">
    <div className="relative">
      <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
      <div className="absolute inset-0 w-20 h-20 border-4 border-yellow-400/30 rounded-full animate-ping"></div>
    </div>
    
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">Procesando Pago...</h3>
      <p className="text-gray-300">Por favor, no cierres esta ventana</p>
    </div>
    
    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-progress-bar"></div>
    </div>
  </div>
);

export const Step3Pago = () => {
  const { formData, next, back } = useFormContext();
  const [selectedMethod, setSelectedMethod] = useState('tarjeta');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const pagar = () => {
    setIsProcessing(true);
    setTimeout(() => {
      next();
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedBackground />
        <FloatingParticles />
        
        <div className="relative z-10">
          <ProcessingAnimation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500  via-indigo-800 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      
      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className={`w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 rounded-3xl shadow-2xl flex items-center justify-center transform transition-all duration-700 ${showDetails ? 'rotate-0 scale-100' : 'rotate-180 scale-75'}`}>
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            {showDetails && (
              <div className="absolute -top-1 -right-1 animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Pasarela de <span className="bg-gradient-to-r from-emerald-500 via-teal-600 to-green-700 bg-clip-text text-transparent">Pago</span>
          </h1>
          <p className="text-gray-300 text-lg font-medium">
            Selecciona tu método de pago preferido y confirma la transacción
          </p>
        </div>

        {/* Resumen del Pago */}
        <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden transform transition-all duration-500 ${showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-amber-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Total a Pagar</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 via-teal-600 to-green-700 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-indigo-700 fill-current" />
                <span className="text-sm font-semibold text-gray-600">Pago Seguro</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-500 via-teal-600 to-green-700 bg-clip-text text-transparent mb-2">
                {formatCurrency(formData.resumen.importe)}
              </div>
              <p className="text-gray-600 font-medium">Importe final con todos los impuestos incluidos</p>
            </div>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Método de Pago</h3>
                <p className="text-gray-600">Elige cómo quieres realizar el pago</p>
              </div>
            </div>

            <div className="grid gap-4">
              <PaymentMethodCard
                icon={CreditCard}
                title="Pagá con Mercado Pago"
                description="Pago inmediato y seguro con tu billetera virtual"
                selected={selectedMethod === 'tarjeta'}
                onClick={() => setSelectedMethod('tarjeta')}
                premium={true}
              />
              
              <PaymentMethodCard
                icon={Clock}
                title="Pagá con otras billeteras Virtuales"
                description="xxxxxxx"
                selected={selectedMethod === 'transferencia'}
                onClick={() => setSelectedMethod('transferencia')}
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-amber-50/50 rounded-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <button
              onClick={pagar}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-800 via-indigo-500 to-indigo-700 hover:from-purple-700-700 hover:via-indigo-600 hover:to-indigo-800 text-white disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl relative overflow-hidden group animate-pulse-border cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-center space-x-4">
                <Zap className="w-7 h-7 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-xl">Confirmar Pago</span>
                <span className="text-lg opacity-80">{formatCurrency(formData.resumen.importe)}</span>
              </div>
            </button>

            <button
              onClick={back}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-lg">Volver al Resumen</span>
            </button>

            {/* Información de Seguridad */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 shadow-lg mt-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-green-900 mb-2">
                    Transacción 100% Segura
                  </h4>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Utilizamos la tecnología de encriptación más avanzada para proteger tu información financiera. Tu pago está garantizado por los estándares PCI DSS.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-green-600 font-semibold">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>SSL 256-bit</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Verificado</span>
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
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-progress-bar {
          animation: progress-bar 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};