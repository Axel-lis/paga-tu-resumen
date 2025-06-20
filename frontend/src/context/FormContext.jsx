import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormContext = createContext();

// FormContext.js
export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const next = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    // Navega después de actualizar el estado
    setTimeout(() => navigate(`/step${nextStep}`), 0);
  };

  const back = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    // Navega después de actualizar el estado
    setTimeout(() => navigate(prevStep === 1 ? '/step1' : `/step${prevStep}`), 0);
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ 
      step, 
      setStep, 
      formData, 
      updateFormData,
      next,
      back
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);