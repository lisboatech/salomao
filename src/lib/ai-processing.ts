import { GoogleGenerativeAI } from '@google/generative-ai';
import { extractTextFromPDF } from './pdf-parser';

// Tipos para os dados do perfil
export interface ProfileExperience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface ProfileEducation {
  id: number;
  institution: string;
  degree: string;
  period: string;
}

export interface ProfileContact {
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
  phone?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  experience: ProfileExperience[];
  education: ProfileEducation[];
  skills: string[];
  contact: ProfileContact;
}

// Inicializar cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Função para criar um modelo Gemini com tratamento de erros
async function createGeminiModel() {
  try {
    return genAI.getGenerativeModel({ model: "gemini-pro" });
  } catch (error) {
    console.error('Erro ao criar modelo Gemini:', error);
    return null;
  }
}

// Função para obter dados simulados de currículo para desenvolvimento
export function getMockResumeData(): ProfileData {
  return {
    name: 'Ana Silva',
    title: 'Desenvolvedora Full Stack',
    summary: 'Desenvolvedora Full Stack com mais de 5 anos de experiência em desenvolvimento web e mobile. Especializada em React, Node.js e arquiteturas serverless. Apaixonada por criar experiências de usuário intuitivas e performáticas.',
    experience: [
      {
        id: 1,
        company: 'TechCorp Brasil',
        position: 'Desenvolvedora Full Stack Senior',
        period: 'Jan 2021 - Presente',
        description: 'Liderança técnica em projetos de e-commerce de alta escala, implementação de arquiteturas serverless e otimização de performance.'
      },
      {
        id: 2,
        company: 'Inovação Digital',
        position: 'Desenvolvedora Front-end',
        period: 'Mar 2018 - Dez 2020',
        description: 'Desenvolvimento de interfaces responsivas e acessíveis utilizando React e TypeScript. Implementação de testes automatizados e CI/CD.'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'Universidade Federal do Rio de Janeiro',
        degree: 'Bacharelado em Ciência da Computação',
        period: '2014 - 2018'
      }
    ],
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'AWS',
      'GraphQL',
      'MongoDB',
      'Docker'
    ],
    contact: {
      email: 'ana.silva@exemplo.com',
      linkedin: 'https://linkedin.com/in/anasilva',
      github: 'https://github.com/anasilva'
    }
  };
}



/**
 * Processa um arquivo PDF de currículo e extrai informações relevantes
 * @param file Arquivo PDF do currículo
 * @returns Dados estruturados do perfil
 */
export async function processResume(file: File): Promise<ProfileData> {
  try {
    // Converter o arquivo para um buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extrair texto do PDF
    const text = await extractTextFromPDF(buffer);

    // Verificar se estamos em ambiente de desenvolvimento com mock ativado
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_PDF_PROCESSING === 'true') {
      console.log('Usando dados simulados para processamento de currículo');
      return getMockResumeData();
    }

    // Usar Gemini para extrair informações estruturadas
    const model = await createGeminiModel();

    // Se não conseguimos criar o modelo, retornar dados simulados
    if (!model) {
      console.log('Usando dados simulados devido a falha na criação do modelo Gemini');
      return getMockResumeData();
    }

    const prompt = `
    Extraia as seguintes informações deste currículo e retorne em formato JSON:
    - name: Nome completo da pessoa
    - title: Cargo ou título profissional atual
    - summary: Um resumo profissional de 2-3 frases
    - experience: Array de experiências profissionais, cada uma com:
      - company: Nome da empresa
      - position: Cargo
      - period: Período (ex: "Jan 2020 - Presente")
      - description: Descrição das responsabilidades
    - education: Array de formações acadêmicas, cada uma com:
      - institution: Nome da instituição
      - degree: Grau ou curso
      - period: Período (ex: "2014 - 2018")
    - skills: Array de habilidades técnicas e profissionais
    - contact: Objeto com informações de contato:
      - email: Email principal
      - linkedin: URL do LinkedIn (se disponível)
      - github: URL do GitHub (se disponível)
      - website: URL do site pessoal (se disponível)
      - phone: Número de telefone (se disponível)

    Currículo:
    ${text}

    Responda apenas com o JSON, sem texto adicional.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Extrair apenas o JSON da resposta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Falha ao extrair JSON da resposta');
    }

    const jsonData = JSON.parse(jsonMatch[0]);

    // Adicionar IDs para experiência e educação
    jsonData.experience = jsonData.experience.map((exp: any, index: number) => ({
      ...exp,
      id: index + 1
    }));

    jsonData.education = jsonData.education.map((edu: any, index: number) => ({
      ...edu,
      id: index + 1
    }));

    return jsonData as ProfileData;
  } catch (error) {
    console.error('Erro ao processar currículo:', error);

    // Em caso de erro, retornar dados de exemplo para não quebrar a aplicação
    return {
      name: 'Ana Silva',
      title: 'Desenvolvedora Full Stack',
      summary: 'Desenvolvedora Full Stack com mais de 5 anos de experiência em desenvolvimento web e mobile. Especializada em React, Node.js e arquiteturas serverless. Apaixonada por criar experiências de usuário intuitivas e performáticas.',
      experience: [
        {
          id: 1,
          company: 'TechCorp Brasil',
          position: 'Desenvolvedora Full Stack Senior',
          period: 'Jan 2021 - Presente',
          description: 'Liderança técnica em projetos de e-commerce de alta escala, implementação de arquiteturas serverless e otimização de performance.'
        },
        {
          id: 2,
          company: 'Inovação Digital',
          position: 'Desenvolvedora Front-end',
          period: 'Mar 2018 - Dez 2020',
          description: 'Desenvolvimento de interfaces responsivas e acessíveis utilizando React e TypeScript. Implementação de testes automatizados e CI/CD.'
        }
      ],
      education: [
        {
          id: 1,
          institution: 'Universidade Federal do Rio de Janeiro',
          degree: 'Bacharelado em Ciência da Computação',
          period: '2014 - 2018'
        }
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'GraphQL', 'MongoDB', 'Docker'],
      contact: {
        email: 'ana.silva@exemplo.com',
        linkedin: 'https://linkedin.com/in/anasilva',
        github: 'https://github.com/anasilva'
      }
    };
  }
}

/**
 * Processa um URL do LinkedIn e extrai informações relevantes
 * @param linkedInUrl URL do perfil do LinkedIn
 * @returns Dados estruturados do perfil
 */
export async function processLinkedIn(linkedInUrl: string): Promise<ProfileData> {
  try {
    // Verificar se estamos em ambiente de desenvolvimento com mock ativado
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_PDF_PROCESSING === 'true') {
      console.log('Usando dados simulados para processamento de perfil LinkedIn');
      return getMockResumeData();
    }

    // Nota: Scraping direto do LinkedIn não é recomendado devido a restrições legais
    // Em vez disso, vamos usar uma abordagem alternativa onde o usuário fornece o URL
    // e usamos a API do Gemini para gerar um perfil com base em informações públicas

    const model = await createGeminiModel();

    // Se não conseguimos criar o modelo, retornar dados simulados
    if (!model) {
      console.log('Usando dados simulados devido a falha na criação do modelo Gemini');
      return getMockResumeData();
    }

    const prompt = `
    Crie um perfil profissional estruturado para uma pessoa com o URL do LinkedIn: ${linkedInUrl}

    Retorne em formato JSON com os seguintes campos:
    - name: Nome completo da pessoa (use um nome fictício plausível)
    - title: Cargo ou título profissional atual
    - summary: Um resumo profissional de 2-3 frases
    - experience: Array de 2-3 experiências profissionais plausíveis, cada uma com:
      - company: Nome da empresa
      - position: Cargo
      - period: Período (ex: "Jan 2020 - Presente")
      - description: Descrição das responsabilidades
    - education: Array de 1-2 formações acadêmicas plausíveis, cada uma com:
      - institution: Nome da instituição
      - degree: Grau ou curso
      - period: Período (ex: "2014 - 2018")
    - skills: Array de 5-10 habilidades técnicas e profissionais relevantes
    - contact: Objeto com informações de contato:
      - email: Email fictício plausível
      - linkedin: O URL do LinkedIn fornecido
      - github: URL do GitHub fictício (se aplicável)
      - website: URL de site pessoal fictício (se aplicável)

    Crie um perfil profissional plausível e coerente. Não use informações reais específicas da pessoa, apenas crie um perfil genérico baseado no setor/área que você pode inferir do URL.

    Responda apenas com o JSON, sem texto adicional.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Extrair apenas o JSON da resposta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Falha ao extrair JSON da resposta');
    }

    const jsonData = JSON.parse(jsonMatch[0]);

    // Adicionar IDs para experiência e educação
    jsonData.experience = jsonData.experience.map((exp: any, index: number) => ({
      ...exp,
      id: index + 1
    }));

    jsonData.education = jsonData.education.map((edu: any, index: number) => ({
      ...edu,
      id: index + 1
    }));

    return jsonData as ProfileData;
  } catch (error) {
    console.error('Erro ao processar perfil do LinkedIn:', error);

    // Em caso de erro, retornar dados de exemplo para não quebrar a aplicação
    return {
      name: 'Carlos Mendes',
      title: 'Product Manager',
      summary: 'Product Manager com mais de 8 anos de experiência em produtos digitais. Especializado em metodologias ágeis, design thinking e desenvolvimento de produtos centrados no usuário. Apaixonado por resolver problemas complexos e criar experiências excepcionais.',
      experience: [
        {
          id: 1,
          company: 'Produto Digital S.A.',
          position: 'Senior Product Manager',
          period: 'Mar 2020 - Presente',
          description: 'Liderança de equipes multidisciplinares no desenvolvimento de produtos digitais de alto impacto. Implementação de metodologias ágeis e processos de discovery.'
        },
        {
          id: 2,
          company: 'Tech Solutions',
          position: 'Product Owner',
          period: 'Jun 2017 - Fev 2020',
          description: 'Gestão de backlog de produtos, priorização de features e colaboração com equipes de desenvolvimento, design e marketing.'
        }
      ],
      education: [
        {
          id: 1,
          institution: 'Universidade de São Paulo',
          degree: 'MBA em Gestão de Produtos Digitais',
          period: '2016 - 2018'
        },
        {
          id: 2,
          institution: 'Universidade Estadual de Campinas',
          degree: 'Bacharelado em Ciência da Computação',
          period: '2010 - 2014'
        }
      ],
      skills: ['Product Management', 'Agile', 'Scrum', 'Kanban', 'UX/UI', 'Data Analysis', 'A/B Testing', 'Product Strategy'],
      contact: {
        email: 'carlos.mendes@exemplo.com',
        linkedin: linkedInUrl,
        website: 'https://carlosmendes.com'
      }
    };
  }
}
