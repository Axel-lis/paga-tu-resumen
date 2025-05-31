import {useFormContext} from '../context/FormContext';


export const Step3Pago = () =>{
    const {formData, next, back} = useFormContext();

    const pagar = () => {
        setTimeout(() => {
          next();
        }, 1500);
      };
    return (
        <div>
            <h2>Pasela de Pago</h2>
            <p>Total a pagar : ${formData.resumen.importe.toLocaleString()}</p>
            <button onClick={pagar}>Confirmar Pago</button>
            <buttton onClick={back}>Volver</buttton>
        </div>
    );
};
