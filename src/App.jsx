import Step1DNI from './Components/Step1DNI';
import {Step2Resumen} from './Components/Step2Resumen';
import {Step3Pago} from './Components/Step3Pago';
import {Step4Comprobante} from './Components/Step4Comprobante';
import { FormProvider, useFormContext } from './context/FormContext';

const StepManager = () => {
  const { step } = useFormContext();
  switch (step) {
    case 1:  return <Step1DNI />;
    case 2 : return <Step2Resumen />;
    case 3 : return <Step3Pago />;
    case 4 : return <Step4Comprobante />;
    default: return <Step1DNI />;
  }
};
function App() {
return (
      <FormProvider>
      <StepManager />
      </FormProvider>
    );
}

export default App