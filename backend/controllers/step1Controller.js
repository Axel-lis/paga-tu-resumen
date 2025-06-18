export const verificarResumen = async (req, res, next) => {
    try {
      const { dni, tarjeta, captcha } = req.body;
  
      // Validaciones simples
      if (!dni || !/^\d{8}$/.test(dni)) {
        return res.status(400).json({ error: 'DNI inválido' });
      }
  
      if (!tarjeta || !/^\d{16}$/.test(tarjeta)) {
        return res.status(400).json({ error: 'Número de tarjeta inválido' });
      }
  
      if (captcha !== '5') {
        return res.status(400).json({ error: 'Captcha incorrecto' });
      }
  
      // Lógica simulada (ejemplo: podrías buscar en la base si querés)
      const resumen = {
        importe: 14500.75,
        vencimiento: '2025-06-10'
      };
  
      return res.json({ resumen });
  
    } catch (error) {
      next(error);
    }
  };
  