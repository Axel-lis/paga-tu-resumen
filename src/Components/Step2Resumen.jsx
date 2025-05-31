import { useFormContext} from '../context/FormContext';

export const Step2Resumen = () => {
    const {formData, next, back} = useFormContext();
    const resumen = formData.resumen;

  return (
    <div>
        <h2>Resumen Encontrado</h2>
        <p>Importe: ${resumen.importe.toLocaleString()}</p>
        <p>Vencimiento: {resumen.vencimiento}</p>
        <button onClick={next}>Pagar Resumen</button>
        <button onClick={back}>Volver</button>
    </div>
  );
};
