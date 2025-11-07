import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let { name, email, company, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Sanitize inputs
        name = sanitizeInput(name);
        email = sanitizeInput(email).toLowerCase();
        company = company ? sanitizeInput(company) : '';
        message = sanitizeInput(message);

        // Validate email format
        if (!validateEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Validate length limits
        if (name.length > 100) {
            return NextResponse.json(
                { error: 'Name is too long (max 100 characters)' },
                { status: 400 }
            );
        }

        if (email.length > 255) {
            return NextResponse.json(
                { error: 'Email is too long' },
                { status: 400 }
            );
        }

        if (company.length > 100) {
            return NextResponse.json(
                { error: 'Company name is too long (max 100 characters)' },
                { status: 400 }
            );
        }

        if (message.length > 5000) {
            return NextResponse.json(
                { error: 'Message is too long (max 5000 characters)' },
                { status: 400 }
            );
        }

        if (message.length < 10) {
            return NextResponse.json(
                { error: 'Message is too short (min 10 characters)' },
                { status: 400 }
            );
        }

        // Get recipient email from environment variable
        const recipientEmail = process.env.CONTACT_EMAIL || 'hello@kanopylabs.com';
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

        // Validate environment variables
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not set');
            return NextResponse.json(
                { error: 'Email service is not configured. Please contact support.' },
                { status: 500 }
            );
        }

        // Email subject
        const emailSubject = `New Contact Form Submission from ${name}`;

        // Plain text version
        const emailBody = `
New contact form submission from Kanopy Labs website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : 'Company: Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from the Kanopy Labs contact form.
Please respond directly to: ${email}
`;

        // HTML version for email clients
        const emailBodyHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 0; }
    .header { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #FFA07A 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 25px; }
    .label { font-weight: 600; color: #0EA5E9; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #1f2937; margin-bottom: 12px; font-size: 15px; }
    .value strong { color: #111827; }
    .value a { color: #0EA5E9; text-decoration: none; }
    .value a:hover { text-decoration: underline; }
    .message-box { background: white; padding: 20px; border-left: 4px solid #0EA5E9; border-radius: 4px; margin-top: 10px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
    .footer a { color: #0EA5E9; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>From Kanopy Labs Website</p>
    </div>
    <div class="content">
      <div class="section">
        <div class="label">Contact Information</div>
        <div class="value"><strong>Name:</strong> ${escapeHtml(name)}</div>
        <div class="value"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
        <div class="value"><strong>Company:</strong> ${company ? escapeHtml(company) : 'Not provided'}</div>
      </div>
      
      <div class="section">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
      </div>
      
      <div class="footer">
        <p>This message was sent from the Kanopy Labs contact form.</p>
        <p>Please respond directly to: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      </div>
    </div>
  </div>
</body>
</html>
`;

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: recipientEmail,
            replyTo: email,
            subject: emailSubject,
            text: emailBody,
            html: emailBodyHTML,
        });

        if (error) {
            console.error('Resend API error:', error);
            return NextResponse.json(
                { error: 'Failed to send message. Please try again later.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Message sent successfully',
                id: data?.id,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);

        // Don't expose internal errors to client
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
