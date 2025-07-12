package com.example.Jobportal.utility;

public class Data {
    public static String getMessageBody(String otp) {
        return "<html>\n" +
                "<head>\n" +
                "    <title>OTP Verification</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n" +
                "            background-color: #f9f9f9;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 50px auto;\n" +
                "            background-color: #ffffff;\n" +
                "            padding: 30px;\n" +
                "            border-radius: 10px;\n" +
                "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                "        }\n" +
                "        h1 {\n" +
                "            color: #333333;\n" +
                "            font-size: 28px;\n" +
                "            margin-bottom: 20px;\n" +
                "        }\n" +
                "        p {\n" +
                "            color: #555555;\n" +
                "            font-size: 16px;\n" +
                "            line-height: 1.6;\n" +
                "        }\n" +
                "        .otp-box {\n" +
                "            background-color: #e0f7fa;\n" +
                "            padding: 15px;\n" +
                "            margin: 20px 0;\n" +
                "            text-align: center;\n" +
                "            border-radius: 8px;\n" +
                "            font-size: 22px;\n" +
                "            letter-spacing: 3px;\n" +
                "            color: #00796b;\n" +
                "            font-weight: bold;\n" +
                "        }\n" +
                "        .footer {\n" +
                "            margin-top: 30px;\n" +
                "            font-size: 14px;\n" +
                "            color: #999999;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h1>Email Verification</h1>\n" +
                "        <p>Hi there,</p>\n" +
                "        <p>Thank you for registering with <strong>Job Portal</strong>. To complete your sign-up, please verify your email address using the OTP below:</p>\n" +
                "        <div class=\"otp-box\">" + otp + "</div>\n" +
                "        <p>This OTP is valid for the next 10 minutes. If you didn’t request this, please ignore this email or contact our support team.</p>\n" +
                "        <p>Thanks & regards,<br/>The Job Portal Team</p>\n" +
                "        <div class=\"footer\">&copy; 2025 Job Portal. All rights reserved.</div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
