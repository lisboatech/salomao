// jane-front/models/Meal.js
import mongoose from 'mongoose';

// Verificar se o modelo já existe para evitar redefinição
const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, adicione um nome'],
    trim: true,
    maxlength: [50, 'Nome não pode ter mais de 50 caracteres']
  },
  description: {
    type: String,
    required: false,
    maxlength: [500, 'Descrição não pode ter mais de 500 caracteres']
  },
  calories: {
    type: Number,
    required: [true, 'Por favor, adicione a quantidade de calorias'],
    min: [0, 'Calorias não podem ser negativas']
  },
  dateTime: {
    type: Date,
    required: [true, 'Por favor, adicione a data e hora da refeição'],
    default: Date.now
  },
  type: {
    type: String,
    required: [true, 'Por favor, selecione o tipo de refeição'],
    enum: ['Café da manhã', 'Almoço', 'Lanche da tarde', 'Janta'],
  }
}, {
  timestamps: true,
});

// Verificar se o modelo já existe para evitar redefinição durante hot reloading
export default mongoose.models.Meal || mongoose.model('Meal', MealSchema);