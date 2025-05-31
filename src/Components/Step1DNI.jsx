  import React, { useState } from 'react';
  import { Eye, EyeOff, CreditCard, User, Shield, Loader2, CheckCircle, AlertCircle, Sparkles, Lock } from 'lucide-react';

  // Simulando el contexto para la demo
  const useFormContext = () => ({
    updateFormData: (data) => console.log('Form data updated:', data),
    setStep: (stepFn) => console.log('Step updated:', stepFn(1))
  });

  // Validación personalizada
  const validateField = {
    dni: (value) => {
      if (!value) return 'El DNI es requerido';
      if (!/^\d{8}$/.test(value)) return 'Debe contener exactamente 8 dígitos';
      return null;
    },
    tarjeta: (value) => {
      if (!value) return 'El número de tarjeta es requerido';
      if (!/^\d{16}$/.test(value)) return 'Debe contener exactamente 16 dígitos';
      return null;
    },
    captcha: (value) => {
      if (!value) return 'Debe completar el captcha';
      if (value !== '5') return 'Respuesta incorrecta';
      return null;
    }
  };

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );

  const FloatingParticles = () => {
    // Genera posiciones y delays solo una vez
    const particles = React.useMemo(() =>
      Array.from({ length: 10 }).map(() => ({
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

  const InputField = ({ 
    
    label, 
    icon: Icon, 
    type = 'text', 
    placeholder, 
    maxLength, 
    value, 
    onChange, 
    onBlur,
    error, 
    touched,
    showToggle = false,
    onToggleShow,
    showValue = false 
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = error && touched;
    const isValid = value && !error;

    return (
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-3 shadow-lg">
            {Icon ? <Icon className="w-4 h-4 text-white" /> : null}
          </div>
          {label}
        </label>
        <div className="relative group">
          <input
            type={showToggle && !showValue ? 'password' : type}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium
              ${hasError 
                ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:shadow-lg focus:shadow-red-200/50' 
                : isValid 
                ? 'border-emerald-400 bg-emerald-50/80 focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-200/50'
                : 'border-gray-200 bg-white/80 hover:border-gray-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200/50'
              }
              backdrop-blur-sm focus:outline-none placeholder-gray-400
              ${isFocused ? 'transform scale-[1.02]' : ''}
            `}
          />
          
          {showToggle && (
            <button
              type="button"
              onClick={onToggleShow}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
            >
              {showValue ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          
          {isValid && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-emerald-500 animate-scale-in" />
            </div>
          )}
          
          {hasError && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500 animate-shake" />
            </div>
          )}
          
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 pointer-events-none ${isFocused ? 'opacity-100' : ''}`} />
        </div>
        
        {hasError && (
          <div className="flex items-center space-x-2 text-red-600 text-sm animate-slide-down">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>
    );
  };

  export default function Step1DNI() {
    const { updateFormData, setStep } = useFormContext();
    const [formData, setFormData] = useState({ dni: '', tarjeta: '', captcha: '' });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showCardNumber, setShowCardNumber] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const formatCardNumber = (value) => {
      return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    };

    const formatDNI = (value) => {
      return value.replace(/\D/g, '').slice(0, 8);
    };

    const handleChange = (field, value) => {
      let formattedValue = value;
      if (field === 'dni') {
        formattedValue = formatDNI(value);
      } else if (field === 'tarjeta') {
        formattedValue = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
      } else if (field === 'captcha') {
        formattedValue = value.replace(/\D/g, '').slice(0, 2);
      }
      setFormData(prev => ({ ...prev, [field]: formattedValue }));

      // Solo validar si el campo ya fue tocado o si ya se intentó enviar
      if (touched[field] || submitAttempted) {
        const error = validateField[field](formattedValue);
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    };

    const handleBlur = (field) => {
      setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitAttempted(true);
      
      // Validar todos los campos
      const newErrors = {};
      Object.keys(formData).forEach(field => {
        newErrors[field] = validateField[field](formData[field]);
      });
      
      setErrors(newErrors);
      setTouched({ dni: true, tarjeta: true, captcha: true });
      
      // Si hay errores, no enviar
      if (Object.values(newErrors).some(error => error)) {
        return;
      }
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        updateFormData({ 
          ...formData, 
          resumen: { 
            importe: 14500.75, 
            vencimiento: '2025-06-10' 
          } 
        });
        setStep((prev) => prev + 1);
        setIsSubmitting(false);
      }, 2500);
    };

    const isFormValid = Object.values(formData).every(value => value) && 
                      Object.values(errors).every(error => !error);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedBackground />
        <FloatingParticles />
        
        <div className="w-full max-w-lg relative z-10">
          {/* Header mejorado */}
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              Consulta tu <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Resumen</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              Ingresa tus datos para acceder de forma segura
            </p>
          </div>

          {/* Formulario mejorado */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 rounded-3xl"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <InputField
                name="dni"
                label="Documento Nacional de Identidad"
                icon={User}
                placeholder="12345678"
                maxLength="8"
                value={formData.dni}
                onChange={(e) => handleChange('dni', e.target.value)}
                onBlur={() => handleBlur('dni')}
                error={errors.dni}
                touched={touched.dni}
              />

              <InputField
                name="tarjeta"
                label="Número de Tarjeta"
                icon={CreditCard}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={showCardNumber ? formatCardNumber(formData.tarjeta) : formData.tarjeta}
                onChange={(e) => handleChange('tarjeta', e.target.value)}
                onBlur={() => handleBlur('tarjeta')}
                error={errors.tarjeta}
                touched={touched.tarjeta}
                showToggle={true}
                onToggleShow={() => setShowCardNumber(!showCardNumber)}
                showValue={showCardNumber}
              />

              {/* Captcha mejorado */}
              <div className="space-y-4">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg mr-3 shadow-lg">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  Verificación de Seguridad
                </label>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-6 shadow-inner">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-2 font-mono">
                      2 + 3 = ?
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      Resuelve esta operación matemática
                    </p>
                  </div>
                </div>
                
                <InputField
                  name="captcha"
                  label=""
                  icon={null}
                  placeholder="Ingresa tu respuesta"
                  maxLength="2"
                  value={formData.captcha}
                  onChange={(e) => handleChange('captcha', e.target.value)}
                  onBlur={() => handleBlur('captcha')}
                  error={errors.captcha}
                  touched={touched.captcha}
                />
              </div>

              {/* Botón mejorado */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl relative overflow-hidden group ${
                  isFormValid ? 'animate-pulse-border' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-lg">Procesando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-lg">Buscar Resumen</span>
                    <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                  </div>
                )}
              </button>

              {/* Información de seguridad mejorada */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-blue-900 mb-2">
                      Información 100% Segura
                    </h4>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Tus datos están protegidos con encriptación de nivel bancario y tecnología SSL de última generación.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(3deg); }
            66% { transform: translateY(5px) rotate(-2deg); }
          }
          
          @keyframes scale-in {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
          }
          
          @keyframes slide-down {
            0% { transform: translateY(-10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes pulse-border {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
          }
          
          .animate-float {
            animation: float linear infinite;
          }
          
          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
          
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
          
          .animate-slide-down {
            animation: slide-down 0.3s ease-out;
          }
          
          .animate-pulse-border {
            animation: pulse-border 2s infinite;
          }
        `}</style>
      </div>
    );
  }