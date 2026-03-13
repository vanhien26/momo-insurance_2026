import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, productSlug, typeSlug } = body;

    // Log lead for now (can integrate CRM/DB later)
    console.log('[LEAD]', new Date().toISOString(), {
      fullName,
      phone,
      email,
      productSlug,
      typeSlug,
    });

    return NextResponse.json({ success: true, message: 'Lead captured' });
  } catch (error) {
    console.error('[LEADS API ERROR]', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
