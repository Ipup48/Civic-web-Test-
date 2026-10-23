import { Request, Response } from 'express';
import { CarService } from '../services/carService.js';
import { Generation, PaymentType, ConditionStyle } from '../types/index.js';

export class CarController {
  public static async getCars(req: Request, res: Response) {
    try {
      const { gen, paymentType, conditionStyle, search } = req.query;

      const cars = await CarService.getCars({
        gen: gen as Generation,
        paymentType: paymentType as PaymentType,
        conditionStyle: conditionStyle as ConditionStyle,
        search: search as string,
      });

      return res.status(200).json({
        success: true,
        count: cars.length,
        data: cars,
      });
    } catch (error: any) {
      console.error('Error in getCars controller:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error retrieving cars',
      });
    }
  }

  public static async getCarBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const car = await CarService.getCarBySlug(slug);

      if (!car) {
        return res.status(404).json({
          success: false,
          message: `Car with slug '${slug}' not found`,
        });
      }

      return res.status(200).json({
        success: true,
        data: car,
      });
    } catch (error: any) {
      console.error('Error in getCarBySlug controller:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error retrieving car',
      });
    }
  }
}
