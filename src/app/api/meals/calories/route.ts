import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Meal from '@/models/Meal';

// Evitar cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/meals/calories - Obter total de calorias por dia
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Obter parâmetros da URL
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0];

    try {
      // Buscar refeições do dia especificado
      const startDate = new Date(dateParam);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(dateParam);
      endDate.setHours(23, 59, 59, 999);

      // Buscar refeições dentro do intervalo de datas
      const meals = await Meal.find({
        dateTime: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString()
        }
      });

      // Calcular total de calorias
      const totalCalories = meals.reduce((sum, meal) => {
        // Verificar se calories é um número válido
        const calories = typeof meal.calories === 'number' ? meal.calories : 0;
        return sum + calories;
      }, 0);

      // Agrupar por tipo de refeição
      const caloriesByType = meals.reduce((acc, meal) => {
        if (!acc[meal.type]) {
          acc[meal.type] = 0;
        }
        // Verificar se calories é um número válido
        const calories = typeof meal.calories === 'number' ? meal.calories : 0;
        acc[meal.type] += calories;
        return acc;
      }, {});

      // Definir headers para evitar cache
      const headers = new Headers({
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      return NextResponse.json({
        date: dateParam,
        totalCalories,
        caloriesByType,
        meals
      }, { headers });
    } catch (dbError) {
      // Retornar um valor padrão em caso de erro
      return NextResponse.json({
        date: dateParam,
        totalCalories: 0,
        caloriesByType: {},
        meals: [],
        error: 'Erro ao processar dados'
      }, { status: 200 }); // Retornar 200 mesmo com erro para não quebrar o frontend
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro ao calcular calorias',
        totalCalories: 0,
        caloriesByType: {},
        meals: []
      },
      { status: 200 } // Retornar 200 mesmo com erro para não quebrar o frontend
    );
  }
}