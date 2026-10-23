import { Request, Response } from 'express';
import { LeadService } from '../services/leadService.js';

export class LeadController {
  public static async createLead(req: Request, res: Response) {
    try {
      const { carId, customerName, phone, lineId, financingOption, note } = req.body;

      if (!customerName || !phone) {
        return res.status(400).json({
          success: false,
          message: 'กรุณากรอกชื่อและเบอร์โทรศัพท์สำหรับติดต่อกลับ',
        });
      }

      const result = await LeadService.createLead({
        carId,
        customerName,
        phone,
        lineId,
        financingOption,
        note,
      });

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error('Error in createLead controller:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลการติดต่อ',
      });
    }
  }
}
