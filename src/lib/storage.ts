import { ProfileData } from './ai-processing';
import dbConnect from './dbConnect';
import Profile from '@/models/Profile';
import mongoose from 'mongoose';

/**
 * Salva os dados do perfil no MongoDB
 * @param profileData Dados do perfil a serem salvos
 * @returns ID único do perfil salvo
 */
export async function saveProfileData(profileData: ProfileData): Promise<string> {
  try {
    // Verificar se estamos em ambiente de desenvolvimento com mock ativado
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_PDF_PROCESSING === 'true') {
      console.log('Usando armazenamento simulado em ambiente de desenvolvimento');
      // Retornar um ID simulado
      return `mock_${Date.now()}`;
    }

    await dbConnect();

    // Criar novo perfil
    const profile = await Profile.create(profileData);

    return profile._id.toString();
  } catch (error) {
    console.error('Erro ao salvar dados do perfil:', error);

    // Em ambiente de desenvolvimento, retornar um ID simulado em caso de erro
    if (process.env.NODE_ENV === 'development') {
      console.log('Usando armazenamento simulado após erro de conexão');
      return `mock_error_${Date.now()}`;
    }

    throw new Error('Falha ao salvar dados do perfil');
  }
}

/**
 * Obtém os dados do perfil pelo ID
 * @param profileId ID do perfil
 * @returns Dados do perfil
 */
export async function getProfileData(profileId: string): Promise<ProfileData | null> {
  try {
    // Verificar se é um ID simulado
    if (profileId.startsWith('mock_')) {
      console.log('Retornando dados simulados para ID:', profileId);
      // Importar a função getMockResumeData do módulo ai-processing
      const { getMockResumeData } = require('./ai-processing');
      return getMockResumeData();
    }

    await dbConnect();

    // Verificar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      throw new Error('ID de perfil inválido');
    }

    // Buscar perfil
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return null;
    }

    return profile.toObject() as ProfileData;
  } catch (error) {
    console.error('Erro ao obter dados do perfil:', error);

    // Em ambiente de desenvolvimento, retornar dados simulados em caso de erro
    if (process.env.NODE_ENV === 'development') {
      console.log('Retornando dados simulados após erro');
      // Importar a função getMockResumeData do módulo ai-processing
      const { getMockResumeData } = require('./ai-processing');
      return getMockResumeData();
    }

    throw new Error('Falha ao obter dados do perfil');
  }
}

/**
 * Atualiza os dados do perfil
 * @param profileId ID do perfil
 * @param profileData Novos dados do perfil
 * @returns Sucesso da operação
 */
export async function updateProfileData(profileId: string, profileData: Partial<ProfileData>): Promise<boolean> {
  try {
    // Verificar se é um ID simulado
    if (profileId.startsWith('mock_')) {
      console.log('Atualizando perfil simulado:', profileId);
      return true;
    }

    await dbConnect();

    // Verificar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      throw new Error('ID de perfil inválido');
    }

    // Atualizar perfil
    const result = await Profile.findByIdAndUpdate(
      profileId,
      { ...profileData, updatedAt: new Date() },
      { new: true }
    );

    return !!result;
  } catch (error) {
    console.error('Erro ao atualizar dados do perfil:', error);

    // Em ambiente de desenvolvimento, retornar sucesso em caso de erro
    if (process.env.NODE_ENV === 'development') {
      console.log('Simulando sucesso na atualização em ambiente de desenvolvimento');
      return true;
    }

    throw new Error('Falha ao atualizar dados do perfil');
  }
}

/**
 * Publica um perfil
 * @param profileId ID do perfil a ser publicado
 * @returns Sucesso da operação
 */
export async function publishProfile(profileId: string): Promise<boolean> {
  try {
    // Verificar se é um ID simulado
    if (profileId.startsWith('mock_')) {
      console.log('Publicando perfil simulado:', profileId);
      return true;
    }

    await dbConnect();

    // Verificar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      throw new Error('ID de perfil inválido');
    }

    // Publicar perfil
    const result = await Profile.findByIdAndUpdate(
      profileId,
      { isPublished: true, updatedAt: new Date() },
      { new: true }
    );

    return !!result;
  } catch (error) {
    console.error('Erro ao publicar perfil:', error);

    // Em ambiente de desenvolvimento, retornar sucesso em caso de erro
    if (process.env.NODE_ENV === 'development') {
      console.log('Simulando sucesso na publicação em ambiente de desenvolvimento');
      return true;
    }

    throw new Error('Falha ao publicar perfil');
  }
}

/**
 * Exclui um perfil
 * @param profileId ID do perfil a ser excluído
 * @returns Sucesso da operação
 */
export async function deleteProfile(profileId: string): Promise<boolean> {
  try {
    // Verificar se é um ID simulado
    if (profileId.startsWith('mock_')) {
      console.log('Excluindo perfil simulado:', profileId);
      return true;
    }

    await dbConnect();

    // Verificar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      throw new Error('ID de perfil inválido');
    }

    // Excluir perfil
    const result = await Profile.findByIdAndDelete(profileId);

    return !!result;
  } catch (error) {
    console.error('Erro ao excluir perfil:', error);

    // Em ambiente de desenvolvimento, retornar sucesso em caso de erro
    if (process.env.NODE_ENV === 'development') {
      console.log('Simulando sucesso na exclusão em ambiente de desenvolvimento');
      return true;
    }

    throw new Error('Falha ao excluir perfil');
  }
}
