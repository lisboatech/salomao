import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Calcular data de uma semana atrás
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // Buscar refeições da última semana
    const meals = await db
      .collection('meals')
      .find({
        dateTime: { $gte: oneWeekAgo.toISOString() }
      })
      .sort({ dateTime: -1 })
      .toArray();
    
    // Converter _id para string
    const formattedMeals = meals.map(meal => ({
      ...meal,
      _id: meal._id.toString()
    }));
    
    return NextResponse.json(formattedMeals);
  } catch (error) {
    console.error('Erro ao buscar refeições da semana:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar refeições da semana' },
      { status: 500 }
    );
  }
}
