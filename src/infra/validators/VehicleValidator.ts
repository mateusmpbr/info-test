import { body, param } from "express-validator";
import { Vehicle } from "../models/Vehicle";

class VehicleValidator {
  checkCreateVehicle() {
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The --- id --- field must be UUID v4")
        .custom((value) => {
          return Vehicle.findOne({ where: { id: value } }).then((vehicle) => {
            if (vehicle)
              return Promise.reject(
                "The informed --- id --- already exists in another vehicle"
              );
          });
        }),
      body("placa")
        .notEmpty()
        .isString()
        .isLength({ min: 7, max: 7 })
        .withMessage(
          "The --- placa --- field must be a string with 7 characters"
        )
        .custom((value) => {
          return Vehicle.findOne({ where: { placa: value } }).then(
            (vehicle) => {
              if (vehicle)
                return Promise.reject(
                  "The informed --- placa --- already exists in another vehicle"
                );
            }
          );
        }),
      body("chassi")
        .notEmpty()
        .isString()
        .isLength({ min: 17, max: 17 })
        .withMessage(
          "The --- chassi --- field must be a string with 17 characters"
        )
        .custom((value) => {
          return Vehicle.findOne({ where: { chassi: value } }).then(
            (vehicle) => {
              if (vehicle)
                return Promise.reject(
                  "The informed --- chassi --- already exists in another vehicle"
                );
            }
          );
        }),
      body("renavam")
        .notEmpty()
        .isNumeric()
        .isLength({ min: 9, max: 11 })
        .withMessage(
          "The --- renavam --- field must be a number between 9 and 11 characters"
        )
        .custom((value) => {
          return Vehicle.findOne({ where: { renavam: value } }).then(
            (vehicle) => {
              if (vehicle)
                return Promise.reject(
                  "The informed --- renavam --- already exists in another vehicle"
                );
            }
          );
        }),
      body("modelo")
        .notEmpty()
        .isString()
        .withMessage("The --- modelo --- field must be a string"),
      body("marca")
        .notEmpty()
        .isString()
        .withMessage("The --- marca --- field must be a string"),
      body("ano")
        .notEmpty()
        .isNumeric()
        .isLength({ min: 4, max: 4 })
        .withMessage(
          "The --- ano --- field must be a number with 4 characters"
        ),
    ];
  }

  checkUpdateVehicle() {
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The --- id --- field must be UUID v4")
        .custom((value) => {
          return Vehicle.findOne({ where: { id: value } }).then((vehicle) => {
            if (vehicle)
              return Promise.reject(
                "The informed --- id --- already exists in another vehicle"
              );
          });
        }),
      body("placa")
        .optional()
        .isString()
        .isLength({ min: 7, max: 7 })
        .withMessage(
          "The --- placa --- field must be a string with 7 characters"
        )
        .custom((value) => {
          return Vehicle.findOne({ where: { placa: value } }).then(
            (vehicle) => {
              if (vehicle)
                return Promise.reject(
                  "The informed --- placa --- already exists in another vehicle"
                );
            }
          );
        }),
      body("chassi")
        .optional()
        .isString()
        .isLength({ min: 17, max: 17 })
        .withMessage(
          "The --- chassi --- field must be a string with 17 characters"
        )
        .custom((value) => {
          return Vehicle.findOne({ where: { chassi: value } }).then(
            (vehicle) => {
              if (vehicle)
                return Promise.reject(
                  "The informed --- chassi --- already exists in another vehicle"
                );
            }
          );
        }),
      body("renavam")
        .optional()
        .isNumeric()
        .isLength({ min: 9, max: 11 })
        .withMessage(
          "The --- renavam --- field must be a number between 9 and 11 characters"
        )
        .custom((value) => {
          return Vehicle.findOne({ where: { renavam: value } }).then(
            (vehicle) => {
              if (vehicle)
                return Promise.reject(
                  "The informed --- renavam --- already exists in another vehicle"
                );
            }
          );
        }),
      body("modelo")
        .optional()
        .isString()
        .withMessage("The --- modelo --- field must be a string"),
      body("marca")
        .optional()
        .isString()
        .withMessage("The --- marca --- field must be a string"),
      body("ano")
        .optional()
        .isNumeric()
        .isLength({ min: 4, max: 4 })
        .withMessage(
          "The --- ano --- field must be a number with 4 characters"
        ),
    ];
  }

  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .isUUID(4)
        .withMessage("The --- id --- field must be UUID v4"),
    ];
  }
}

export default new VehicleValidator();
