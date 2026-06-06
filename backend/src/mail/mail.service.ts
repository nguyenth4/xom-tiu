import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    // Cấu hình transporter cho Gmail
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, otp: string) {
    const mailOptions = {
      from: `"Xóm Tíu Store" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Xóm Tíu - Mã xác thực OTP đặt lại mật khẩu',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
          <h2 style="color: #d4a373; text-align: center;">Xóm Tíu Store</h2>
          <p>Xin chào,</p>
          <p>Bạn nhận được email này vì đã yêu cầu đặt lại mật khẩu cho tài khoản Xóm Tíu của mình.</p>
          <p>Dưới đây là mã xác thực (OTP) của bạn:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background-color: #f3f4f6; padding: 15px 30px; border-radius: 8px;">
              ${otp}
            </span>
          </div>
          <p style="color: #ef4444; font-size: 14px;">* Mã bảo mật này sẽ hết hạn trong vòng 15 phút.</p>
          <p style="font-size: 14px;">Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888; text-align: center;">Trân trọng,<br/>Đội ngũ Xóm Tíu</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Password reset email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error);
      throw new Error('Không thể gửi email đặt lại mật khẩu');
    }
  }
}
