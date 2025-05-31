import React, { useState, useEffect } from 'react';
import { CheckCircle, Download, Home, Receipt, Calendar, CreditCard, User, DollarSign, Sparkles, Star, Shield, Trophy, Zap } from 'lucide-react';

// Simulando el contexto para la demo
const useFormContext = () => ({
  formData: {
    dni: '12345678',
    resumen: {
      importe: 14500.75
    }
  }
});

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
  </div>
);

const FloatingParticles = () => {
  const particles = React.useMemo(() =>
    Array.from({ length: 15 }).map(() => ({
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
          className="absolute w-2 h-2 mt-15 bg-white/30 rounded-full animate-float"
          style={style}
        />
      ))}
    </div>
  );
};

const SuccessAnimation = () => {
  const [showCheck, setShowCheck] = useState(false);
  const [showSparks, setShowSparks] = useState(false);

  useEffect(() => {
    const checkTimer = setTimeout(() => setShowCheck(true), 500);
    const sparksTimer = setTimeout(() => setShowSparks(true), 1000);
    return () => {
      clearTimeout(checkTimer);
      clearTimeout(sparksTimer);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center mb-8">
      <div className={`w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-1000 ${showCheck ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
        <CheckCircle className="w-12 h-12 text-white animate-bounce" />
      </div>
      
      {showSparks && (
        <>
          <div className="absolute -top-2 -left-2 animate-bounce" style={{ animationDelay: '0.2s' }}>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0.4s' }}>
            <Star className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '0.6s' }}>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 animate-bounce" style={{ animationDelay: '0.8s' }}>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
        </>
      )}
      
      <div className="absolute inset-0 w-24 h-24 border-4 border-green-400/30 rounded-full animate-ping"></div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value, gradient }) => (
  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
    <div className={`absolute inset-0 ${gradient} opacity-50 rounded-2xl`}></div>
    
    <div className="relative z-10">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-600 mb-1">{title}</h4>
          <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

export const Step4Comprobante = () => {
  const { formData } = useFormContext();
  const [showContent, setShowContent] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 800);
    const actionsTimer = setTimeout(() => setShowActions(true), 1500);
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(actionsTimer);
    };
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadComprobante = () => {
    console.log('Descargando comprobante...');
    // Aquí iría la lógica para descargar el PDF
  };

  const goToHome = () => {
    console.log('Volviendo al inicio...');
    // Aquí iría la lógica para volver al inicio
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-800 to-green-600 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      
      <div className="w-full max-w-4xl relative z-10">
        {/* Success Header */}
        <div className="text-center mb-10">
          <SuccessAnimation />
          
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            ¡Pago <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">Exitoso</span>!
          </h1>
          <p className="text-gray-200 text-xl font-medium">
            Tu transacción se ha procesado correctamente
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Comprobante Principal */}
        <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-green-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Receipt className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Comprobante de Pago</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-green-600 fill-current" />
                <span className="text-sm font-semibold text-gray-600">Verificado</span>
              </div>
            </div>
            
            {/* Monto Pagado */}
            <div className="text-center py-8 mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <p className="text-lg font-semibold text-gray-600 mb-2">Monto Pagado</p>
              <div className="text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent mb-2">
                {formatCurrency(formData.resumen.importe)}
              </div>
              <p className="text-gray-600 font-medium">Pago procesado exitosamente</p>
            </div>

            {/* Detalles de la Transacción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard
                icon={User}
                title="DNI"
                value={formData.dni}
                gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
              />
              
              <InfoCard
                icon={Calendar}
                title="Fecha y Hora"
                value={getCurrentDate()}
                gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
              />
              
              <InfoCard
                icon={CreditCard}
                title="Método de Pago"
                value="Tarjeta de Crédito"
                gradient="bg-gradient-to-br from-orange-500 to-red-600"
              />
              
              <InfoCard
                icon={DollarSign}
                title="Estado"
                value="Aprobado"
                gradient="bg-gradient-to-br from-green-500 to-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden transform transition-all duration-700 ${showActions ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 rounded-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <button
              onClick={downloadComprobante}
              className="w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 hover:from-green-700 hover:via-emerald-600 hover:to-green-800 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl relative overflow-hidden group animate-pulse-border"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-center space-x-4">
                <Download className="w-7 h-7 group-hover:bounce transition-transform duration-200" />
                <span className="text-xl">Descargar Comprobante</span>
              </div>
            </button>

            <button
              onClick={goToHome}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
            >
              <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-lg">Volver al Inicio</span>
            </button>

            {/* Información Adicional */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 shadow-lg mt-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-blue-900 mb-2">
                    Transacción Completada
                  </h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Tu pago ha sido procesado exitosamente. Recibirás un email de confirmación en los próximos minutos. Puedes descargar tu comprobante en cualquier momento.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-blue-600 font-semibold">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Pago Confirmado</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Transacción Segura</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Proceso Exitoso</span>
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
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-10px); }
          70% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }
        
        .group:hover .group-hover\\:bounce {
          animation: bounce 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};