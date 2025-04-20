// src/models/Profile.ts
import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Empresa é obrigatória'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Cargo é obrigatório'],
    trim: true
  },
  period: {
    type: String,
    required: [true, 'Período é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, {
  _id: false
});

const EducationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'Instituição é obrigatória'],
    trim: true
  },
  degree: {
    type: String,
    required: [true, 'Grau é obrigatório'],
    trim: true
  },
  period: {
    type: String,
    required: [true, 'Período é obrigatório'],
    trim: true
  }
}, {
  _id: false
});

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    trim: true
  },
  linkedin: {
    type: String,
    required: false,
    trim: true
  },
  github: {
    type: String,
    required: false,
    trim: true
  },
  website: {
    type: String,
    required: false,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  }
}, {
  _id: false
});

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Resumo é obrigatório'],
    trim: true
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [{
    type: String,
    trim: true
  }],
  contact: ContactSchema,
  isPublished: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);