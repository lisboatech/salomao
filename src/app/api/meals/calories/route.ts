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

    console.log('Buscando calorias para:', dateParam);

    try {
      // Buscar todas as refeições para debug
      const allMeals = await Meal.find({});
      console.log(`Total de refeições no banco: ${allMeals.length}`);

      // Filtrar manualmente as refeições do dia
      const meals = allMeals.filter(meal => {
        try {
          // Converter a data da refeição para o formato YYYY-MM-DD no fuso horário do Brasil
          const mealDate = new Date(meal.dateTime);

          // Ajustar para o fuso horário do Brasil (UTC-3)
          const mealDateBR = new Date(mealDate.getTime() - (mealDate.getTimezoneOffset() * 60000));
          const mealDateString = mealDateBR.toISOString().split('T')[0];

          // Data alvo (a que estamos buscando)
          const targetDateString = dateParam;

          const isMatch = mealDateString === targetDateString;

          console.log(`Comparando: ${mealDate.toISOString()} (${mealDateString}) com ${targetDateString} - Match: ${isMatch}`);

          return isMatch;
        } catch (err) {
          console.error('Erro ao processar data da refeição:', err, meal);
          return false;
        }
      });

      console.log(`Encontradas ${meals.length} refeições para o dia ${dateParam}`);

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
      console.error('Erro ao processar dados do banco:', dbError);
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
    console.error('Erro ao calcular calorias:', error);
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