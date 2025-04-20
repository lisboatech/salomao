// Importação condicional para evitar problemas com o módulo pdf-parse
let pdfParse: any = null;

// Função para extrair texto de um PDF
export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  try {
    // Se estamos em ambiente de desenvolvimento e não queremos processar PDFs reais
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_PDF_PROCESSING === 'true') {
      console.log('Usando processamento simulado de PDF em ambiente de desenvolvimento');
      return mockExtractTextFromPDF();
    }

    // Importação dinâmica do pdf-parse apenas quando necessário
    if (!pdfParse) {
      try {
        const module = await import('pdf-parse');
        pdfParse = module.default;
      } catch (importError) {
        console.error('Erro ao importar pdf-parse:', importError);
        return mockExtractTextFromPDF();
      }
    }

    // Processamento real do PDF
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error);

    // Em caso de erro, usar o mock em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('Usando processamento simulado após erro');
      return mockExtractTextFromPDF();
    }

    throw new Error('Falha ao extrair texto do PDF');
  }
}

// Função que simula a extração de texto de um PDF para desenvolvimento
function mockExtractTextFromPDF(): string {
  return `CURRÍCULO

Ana Silva
Desenvolvedora Full Stack

Contato:
Email: ana.silva@exemplo.com
Telefone: (11) 98765-4321
LinkedIn: linkedin.com/in/anasilva
GitHub: github.com/anasilva

Resumo Profissional:
Desenvolvedora Full Stack com mais de 5 anos de experiência em desenvolvimento web e mobile. Especializada em React, Node.js e arquiteturas serverless. Apaixonada por criar experiências de usuário intuitivas e performáticas.

Experiência Profissional:

TechCorp Brasil
Desenvolvedora Full Stack Senior
Jan 2021 - Presente
• Liderança técnica em projetos de e-commerce de alta escala
• Implementação de arquiteturas serverless na AWS
• Otimização de performance e experiência do usuário
• Mentoria de desenvolvedores juniores e plenos

Inovação Digital
Desenvolvedora Front-end
Mar 2018 - Dez 2020
• Desenvolvimento de interfaces responsivas e acessíveis utilizando React e TypeScript
• Implementação de testes automatizados e CI/CD
• Colaboração com equipes de design e UX

Formação Acadêmica:

Universidade Federal do Rio de Janeiro
Bacharelado em Ciência da Computação
2014 - 2018

Habilidades Técnicas:
• JavaScript/TypeScript
• React/React Native
• Node.js
• AWS (Lambda, S3, DynamoDB)
• GraphQL
• MongoDB
• Docker
• Git
• CI/CD
• Metodologias Ágeis`;
}
