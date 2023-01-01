const Alumno = require("../models/alumno");
const express = require("express");
const router = express.Router();

router.post("/iniciaSesionAlumno", (req, res) => {
  let { codigo, clave } = req.body;
  codigo = codigo.toString().trim();
  clave = clave.toString().trim();
  if (codigo == "" || clave == "") {
    res.json({
      status: "FAILED",
      message: "Hay campos vacios",
    });
  } else {
    Alumno.find({ codigo: codigo })
      .then((result) => {
        if (result.length == 0) {
          res.json({
            status: "FAILED",
            message: "codigo no existe",
          });
        } else {
          const clavec = result[0].clave;

          if (clavec == clave) {
            res.json({
              status: "SUCCESS",
              message: "Inicio de sesión satisfactorio",
            });
          } else {
            res.json({
              status: "FAILED",
              message: "Contraseña inválida!",
            });
          }
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "error comparando codigo",
        });
      });
  }
});

router.post("/creaUsuarioAlumno", (req, res) => {
    let { nombre, apellido, email, codigo, clave } = req.body;
    nombre = nombre.toString().trim();
    if (nombre == "" || email == "" || clave == "") {
      res.json({
        status: "FAILED",
        message: "Campo Vacio",
      });
    } else if(!email.includes("@uni")){
      res.json({
        status: "FAILED",
        message: "Solo se permiten correos Uni",
      });
    }else {
      Alumno.find({ "codigo": codigo })
        .then((result) => {
          if (result.length != 0) {
            res.json({
              status: "FAILED",
              message: "codigo registrado",
            });
          } else {
            const alumno = new Alumno({
              codigo: codigo,
              nombre: nombre,
              apellido: apellido,
              email: email,
              clave: clave,

            });
            alumno
              .save()
              .then((result) => {
                res.json({
                  status: "SUCCESS",
                  message: "Registro satisfactorio",
                  data: result,
                });
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "Error al guardar.",
                });
              });
          }
        })
        .catch((err) => {
          res.json({
            status: "FAILED",
            message: "error al buscar",
          });
        });
    }
  });

module.exports = router;