import pool from '../db.js';

export const verificarResumen = async (req, res, next) => {
  try {
    const { dni, tarjeta, captcha } = req.body;

    // Validaciones básicas
    if (!dni || !/^\d{8}$/.test(dni)) {
      return res.status(400).json({ error: 'DNI inválido' });
    }
    if (!tarjeta || !/^\d{4}$/.test(tarjeta)) {
      return res.status(400).json({ error: 'Últimos 4 números de tarjeta inválidos.' });
    }
    if (captcha !== '5') {
      return res.status(400).json({ error: 'Captcha incorrecto' });
    }

    // Convertimos el DNI al formato que usa la base (relleno con ceros hasta 11 dígitos)
    const dniConCeros = dni.padStart(11, '0');

    // Buscar la cuenta en la tabla `cuentas` y obtener el número de usuario
    const [cuentas] = await pool.query(
      'SELECT numrusuar FROM cuentas WHERE numrdocmn = ? AND numrtarjt = ?',
      [dniConCeros, tarjeta]
    );

    if (cuentas.length === 0) {
      return res.status(404).json({ error: 'No se encontró ninguna cuenta con los datos ingresados.' });
    }

    const numrusuar = cuentas[0].numrusuar;

    // Consultar la tabla `usu` para obtener el resumen (último registro)
    const [resumenes] = await pool.query(
      'SELECT numrusuar, numrresmn, fechvactl FROM usu WHERE numrusuar = ? ORDER BY numrresmn DESC LIMIT 1',
      [numrusuar]
    );

    if (resumenes.length === 0) {
      return res.status(404).json({ error: 'No se encontró resumen para esta cuenta.' });
    }

    const { numrresmn, fechvactl } = resumenes[0];

    // Consultar la tabla `r1` para obtener el importe del resumen a pagar
    const [r1Rows] = await pool.query(
      'SELECT imprsactp FROM r1 WHERE numrusuar = ? LIMIT 1',
      [numrusuar]
    );

    if (r1Rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró resumen de pago en r1 para esta cuenta.' });
    }

    const { imprsactp } = r1Rows[0];

    // Preparar el resumen final con todos los datos obtenidos
    const resumen = {
      numeroResumen: numrresmn,
      vencimiento: fechvactl,
      importe: imprsactp,
    };

    return res.json({ success: true, resumen });
    
  } catch (error) {
    next(error);
  }
};
