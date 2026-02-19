import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Simple test route is working' 
  });
}

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    console.log('Test route received:', text);
    
    return NextResponse.json({ 
      received: text,
      success: true 
    });
  } catch (error) {
    console.error('Test route error:', error);
    return NextResponse.json({ 
      error: error.message,
      success: false 
    });
  }
}