import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, company, email, subject, message, agreed } =
      body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            'First name, last name, email, subject, and message are required.',
        },
        { status: 400 },
      );
    }

    if (!agreed) {
      return NextResponse.json(
        {
          success: false,
          message: 'You must agree before sending the form.',
        },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: `
First Name: ${firstName}
Last Name: ${lastName}
Company: ${company || 'N/A'}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully.',
    });
  } catch (error) {
    console.error('CONTACT FORM ERROR:', error);

    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 },
    );
  }
}
