import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import Step1DNI from './Components/Step1DNI';
import { Step2Resumen } from './Components/Step2Resumen';
import { Step3Pago } from './Components/Step3Pago';
import { Step4Comprobante } from './Components/Step4Comprobante';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <Router>
      <FormProvider>
        <Routes>
          <Route path="/step1" element={<Step1DNI />} />
          <Route path="/step2" element={<ProtectedRoute element={Step2Resumen} stepRequired={2} />} />
          <Route path="/step3" element={<ProtectedRoute element={Step3Pago} stepRequired={3} />} />
          <Route path="/step4" element={<ProtectedRoute element={Step4Comprobante} stepRequired={4} />} />
          <Route path="*" element={<Step1DNI />} />
        </Routes>
      </FormProvider>
    </Router>
  );
}

export default App;