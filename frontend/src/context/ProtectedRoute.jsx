// ProtectedRoute.jsx
import { useFormContext } from '../context/FormContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ element: Element, stepRequired }) {
  const { step } = useFormContext();
  const location = useLocation();

  // Si el step actual es menor al requerido, redirige a step1
  if (step < stepRequired) {
    return <Navigate to="/step1" replace state={{ from: location }} />;
  }

  return <Element />;
}