import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Step1DNI from './Components/Step1DNI';
import { Step2Resumen } from './Components/Step2Resumen';
import { Step3Pago } from './Components/Step3Pago';
import { Step4Comprobante } from './Components/Step4Comprobante';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/step1" element={<Step1DNI />} />
          <Route path="/step2" element={<Step2Resumen />} />
          <Route path="/step3" element={<Step3Pago />} />
          <Route path="/step4" element={<Step4Comprobante />} />
          <Route path="*" element={<Step1DNI />} /> {/* Ruta por defecto */}
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
 