import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: games, error } = await supabase
      .from('games') // Assuming your table name is 'games'
      .select('*');

    if (error) {
      console.error('Error fetching games from Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(games);
  } catch (error: any) {
    console.error('Unexpected error fetching games:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 