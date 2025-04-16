import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Meal from '@/models/Meal';

// GET /api/meals - Listar todas as refeições (com suporte a filtro por tipo)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Obter parâmetros da URL
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const date = searchParams.get('date');

    // Construir query baseada nos filtros
    let query: any = {};

    // Filtrar por tipo de refeição se especificado
    if (type) {
      query.type = type;
    }

    // Filtrar por data se especificada
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.dateTime = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    // Buscar refeições com os filtros aplicados
    const meals = await Meal.find(query).sort({ dateTime: -1 });

    return NextResponse.json(meals);
  } catch (error) {
    console.error('Erro ao buscar refeições:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar refeições' },
      { status: 500 }
    );
  }
}

// POST /api/meals - Criar uma nova refeição
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Obter dados do corpo da requisição
    const data = await request.json();

    // Criar nova refeição
    const meal = await Meal.create(data);

    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar refeição:', error);
    return NextResponse.json(
      { error: 'Erro ao criar refeição' },
      { status: 500 }
    );
  }
}