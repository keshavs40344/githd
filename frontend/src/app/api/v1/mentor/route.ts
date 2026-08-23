import { NextResponse } from 'next/server';
import type { MentorRequest, MentorResponse, SevenLayerMentorDiagnosis, AIModelOption } from '@/types/mentor';
import { saveMentorSession } from '@/lib/supabase';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Dharma.OS Mentor API active' });
}

export async function POST(req: Request) {
  try {
    const body: MentorRequest = await req.json();
    return NextResponse.json({ status: 'ok', received: body });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
