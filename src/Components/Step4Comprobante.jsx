import { useFormContext } from "../context/FormContext";

export const Step4Comprobante = () => {
    const { formData } = useFormContext();
  
    return (
      <div>
        <h2>¡Pago Exitoso!</h2>
        <p>Gracias por pagar tu resumen, DNI: {formData.dni}</p>
        <p>Importe: ${formData.resumen.importe.toLocaleString()}</p>
        <p>Fecha de pago: {new Date().toLocaleDateString()}</p>
      </div>
    );
  };