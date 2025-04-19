import { stackServerApp } from '@/stack';
import { NextRequest } from 'next/server';

// Rota de API para o Stack Auth
export async function GET(
  request: NextRequest,
  { params }: { params: { stack: string[] } }
) {
  return stackServerApp.handleRequest(request, params.stack);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { stack: string[] } }
) {
  return stackServerApp.handleRequest(request, params.stack);
}
