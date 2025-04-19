import { MongoClient } from 'mongodb';

// Conexão com o MongoDB
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/jane";
const client = new MongoClient(uri);

export async function getUserDatabase(userId: string) {
  await client.connect();
  const database = client.db('jane');
  
  // Verificar se o usuário existe no banco de dados
  const usersCollection = database.collection('users');
  const user = await usersCollection.findOne({ userId });
  
  if (!user) {
    // Criar um novo usuário se não existir
    await usersCollection.insertOne({ 
      userId, 
      createdAt: new Date(),
      plan: 'free' 
    });
  }
  
  return database;
}

// Função para obter as refeições do usuário
export async function getUserMeals(userId: string, date?: string) {
  const database = await getUserDatabase(userId);
  const mealsCollection = database.collection('meals');
  
  const query = date 
    ? { userId, date: { $regex: `^${date}` } }
    : { userId };
    
  return mealsCollection.find(query).toArray();
}

// Função para adicionar uma refeição
export async function addMeal(userId: string, meal: any) {
  const database = await getUserDatabase(userId);
  const mealsCollection = database.collection('meals');
  
  const result = await mealsCollection.insertOne({
    ...meal,
    userId,
    createdAt: new Date()
  });
  
  return result;
}

// Função para atualizar uma refeição
export async function updateMeal(userId: string, mealId: string, meal: any) {
  const database = await getUserDatabase(userId);
  const mealsCollection = database.collection('meals');
  
  const result = await mealsCollection.updateOne(
    { _id: mealId, userId },
    { $set: meal }
  );
  
  return result;
}

// Função para excluir uma refeição
export async function deleteMeal(userId: string, mealId: string) {
  const database = await getUserDatabase(userId);
  const mealsCollection = database.collection('meals');
  
  const result = await mealsCollection.deleteOne({ _id: mealId, userId });
  
  return result;
}
