import { body, param } from 'express-validator';

class VehicleValidator {
	
    checkCreateVehicle() {
		return [
			body('id')
				.optional()
				.isUUID(4)
				.withMessage('The "id" field must be UUID v4'),
            body('placa')
                .notEmpty()
                .isString()
                .isLength({ min: 7, max: 7 })
                .withMessage('The "placa" field must be a string with 7 characters'),
            body('chassi')
                .notEmpty()
                .isString()
                .isLength({ min: 17, max: 17 })
                .withMessage('The "chassi" field must be a string with 17 characters'),
            body('renavam')
                .notEmpty()
                .isNumeric()
                .isLength({ min: 9, max: 11 })
                .withMessage('The "renavam" field must be a number between 9 and 11 characters'),
            body('modelo')
                .notEmpty()
                .isString()
                .withMessage('The "modelo" field must be a string'),
            body('marca')
                .notEmpty()
                .isString()
                .withMessage('The "marca" field must be a string'),
            body('ano')
                .notEmpty()
                .isNumeric()
                .isLength({ min: 4, max: 4 })
                .withMessage('The "ano" field must be a number with 4 characters'),      
		];
	}

    checkUpdateVehicle() {
		return [
			body('id')
				.notEmpty()
				.isUUID(4)
				.withMessage('The "id" field must be UUID v4'),
            body('placa')
				.optional()
                .isString()
                .isLength({ min: 7, max: 7 })
                .withMessage('The "placa" field must be a string with 7 characters'),
            body('chassi')
				.optional()
                .isString()
                .isLength({ min: 17, max: 17 })
                .withMessage('The "chassi" field must be a string with 17 characters'),
            body('renavam')
				.optional()
                .isNumeric()
                .isLength({ min: 9, max: 11 })
                .withMessage('The "renavam" field must be a number between 9 and 11 characters'),
            body('modelo')
				.optional()
                .isString()
                .withMessage('The "modelo" field must be a string'),
            body('marca')
				.optional()
                .isString()
                .withMessage('The "marca" field must be a string'),
            body('ano')
				.optional()
                .isNumeric()
                .isLength({ min: 4, max: 4 })
                .withMessage('The "ano" field must be a number with 4 characters'),      
		];
	}

	checkIdParam() {
		return [
			param('id')
				.notEmpty()
				.isUUID(4)
				.withMessage('The "id" field must be UUID v4'),
		];
	}

}

export default new VehicleValidator();
