import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  company: 150,
  email: 254,
  subject: 200,
  message: 5000,
} as const;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  submissions.set(ip, recent);

  if (recent.length >= RATE_LIMIT_MAX) return true;

  recent.push(now);
  submissions.set(ip, recent);

  return false;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const quotedName = (value: string) =>
  singleLine(value).replace(/["\\]/g, '');

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many messages sent. Please try again later.',
        },
        { status: 429 },
      );
    }

    let body: Record<string, unknown>;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 },
      );
    }

    const firstName = asString(body.firstName).trim();
    const lastName = asString(body.lastName).trim();
    const company = asString(body.company).trim();
    const email = asString(body.email).trim();
    const subject = asString(body.subject).trim();
    const message = asString(body.message).trim();
    const agreed = body.agreed === true;

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

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const tooLong = Object.entries(MAX_LENGTHS).find(
      ([field, max]) =>
        asString(body[field as keyof typeof MAX_LENGTHS]).trim().length > max,
    );

    if (tooLong) {
      return NextResponse.json(
        { success: false, message: `The ${tooLong[0]} field is too long.` },
        { status: 400 },
      );
    }

    if (!agreed) {
      return NextResponse.json(
        { success: false, message: 'You must agree before sending the form.' },
        { status: 400 },
      );
    }

    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_FROM } =
      process.env;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL;

    if (
      !EMAIL_HOST ||
      !EMAIL_PORT ||
      !EMAIL_USERNAME ||
      !EMAIL_PASSWORD ||
      !EMAIL_FROM ||
      !receiver
    ) {
      console.error(
        '[contact] SMTP is not configured - set EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_FROM and CONTACT_RECEIVER_EMAIL.',
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'The contact form is not configured yet. Please email me directly in the meantime.',
        },
        { status: 503 },
      );
    }

    const port = Number(EMAIL_PORT);

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port,
      secure: port === 465,
      auth: { user: EMAIL_USERNAME, pass: EMAIL_PASSWORD },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${EMAIL_FROM}>`,
      to: receiver,
      replyTo: `"${quotedName(`${firstName} ${lastName}`)}" <${email}>`,
      subject: `Contact Form: ${singleLine(subject)}`,
      text: `First Name: ${firstName}
Last Name: ${lastName}
Company: ${company || 'N/A'}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>First Name:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Last Name:</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company) || 'N/A'}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
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
