import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: { 
        source,
      },
      create: {
        email,
        source,
      },
    });

  
    try {
      await resend.emails.send({
        from: 'Ayush <onboarding@resend.dev>', // Use resend.dev for testing mode
        to: email, 
        subject: 'Welcome to ProWorkflow Hub',
        react: WelcomeEmail(),
      });
    } catch (emailError) {
      console.error("Resend Error:", emailError);
    }

    return NextResponse.json({ success: true, subscriber });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}