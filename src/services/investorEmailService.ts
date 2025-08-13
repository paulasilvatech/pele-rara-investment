import emailjs from '@emailjs/browser';

// Configuração do EmailJS - IMPORTANTE: Configure estas variáveis com suas credenciais
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Debug: Verificar se as variáveis estão sendo carregadas
console.log('🔧 EMAILJS CONFIG DEBUG:');
console.log('SERVICE_ID:', EMAILJS_SERVICE_ID);
console.log('TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
console.log('PUBLIC_KEY:', EMAILJS_PUBLIC_KEY ? '***' + EMAILJS_PUBLIC_KEY.slice(-4) : 'NOT_SET');

// Interface completa para dados do investidor
interface InvestorFormData {
  // Informações Pessoais
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  nationality: string;
  
  // Endereço
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Informações Profissionais
  occupation: string;
  company: string;
  position: string;
  workExperience: string;
  
  // Informações Financeiras
  monthlyIncome: string;
  totalAssets: string;
  investmentExperience: string;
  riskProfile: string;
  
  // Detalhes do Investimento
  intendedInvestment: string;
  investmentHorizon: string;
  motivations: string;
  
  // Verificação de Investidor Qualificado
  accreditedStatus: string;
  accreditationProof: string;
  professionalCertification: string;
  
  // Informações Adicionais
  howDidYouHear: string;
  additionalComments: string;
}

// Função para formatar valores monetários
const formatCurrency = (value: string): string => {
  const ranges: { [key: string]: string } = {
    // Renda mensal
    '0-5k': 'Até R$ 5.000',
    '5k-10k': 'R$ 5.001 - R$ 10.000',
    '10k-20k': 'R$ 10.001 - R$ 20.000',
    '20k-50k': 'R$ 20.001 - R$ 50.000',
    '50k-100k': 'R$ 50.001 - R$ 100.000',
    '100k+': 'Acima de R$ 100.000',
    
    // Patrimônio total
    '0-100k': 'Até R$ 100.000',
    '100k-300k': 'R$ 100.001 - R$ 300.000',
    '300k-1M': 'R$ 300.001 - R$ 1.000.000',
    '1M-5M': 'R$ 1.000.001 - R$ 5.000.000',
    '5M-10M': 'R$ 5.000.001 - R$ 10.000.000',
    '10M+': 'Acima de R$ 10.000.000',
    
    // Investimento pretendido
    '300k-500k': 'R$ 300.000 - R$ 500.000',
    '500k-700k': 'R$ 500.001 - R$ 700.000',
    '700k-1M': 'R$ 700.001 - R$ 1.000.000',
    '1M-2M': 'R$ 1.000.001 - R$ 2.000.000',
    '2M+': 'Acima de R$ 2.000.000'
  };
  return ranges[value] || value;
};

// Função para traduzir status de investidor
const translateAccreditedStatus = (status: string): string => {
  const translations: { [key: string]: string } = {
    'patrimonio': 'Patrimônio > R$ 1.000.000',
    'certificacao': 'Certificação Profissional',
    'profissional': 'Profissional do Mercado',
    'verificar': 'Necessita Verificação'
  };
  return translations[status] || status;
};

// Função principal para enviar email via EmailJS
export const sendInvestorEmail = async (formData: InvestorFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Verifica se as credenciais estão configuradas
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS não configurado. Usando fallback.');
      return { 
        success: false, 
        message: 'Serviço de email não configurado. Usando método alternativo.' 
      };
    }

    // Formata a data/hora atual
    const timestamp = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Prepara os parâmetros do template
    const templateParams = {
      // Destinatário
      to_email: 'cynthia@pelerara.com.br',
      
      // Assunto estruturado
      subject: `[NOVO INVESTIDOR] ${formData.fullName} - ${formatCurrency(formData.intendedInvestment)}`,
      
      // Informações do investidor
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      cpf: formData.cpf,
      rg: formData.rg || 'Não informado',
      birth_date: formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('pt-BR') : 'Não informado',
      nationality: formData.nationality,
      
      // Endereço completo
      full_address: `${formData.address}, ${formData.city}/${formData.state} - CEP: ${formData.zipCode} - ${formData.country}`,
      
      // Informações profissionais
      occupation: formData.occupation,
      company: formData.company || 'Não informado',
      position: formData.position || 'Não informado',
      work_experience: formData.workExperience || 'Não informado',
      
      // Informações financeiras
      monthly_income: formatCurrency(formData.monthlyIncome),
      total_assets: formatCurrency(formData.totalAssets),
      investment_experience: formData.investmentExperience || 'Não informado',
      risk_profile: formData.riskProfile || 'Não informado',
      
      // Detalhes do investimento
      intended_investment: formatCurrency(formData.intendedInvestment),
      investment_horizon: formData.investmentHorizon || 'Não informado',
      motivations: formData.motivations || 'Não informado',
      
      // Qualificação
      accredited_status: translateAccreditedStatus(formData.accreditedStatus),
      accreditation_proof: formData.accreditationProof || 'Não informado',
      professional_certification: formData.professionalCertification || 'Não informado',
      
      // Informações adicionais
      how_did_you_hear: formData.howDidYouHear || 'Não informado',
      additional_comments: formData.additionalComments || 'Nenhum comentário adicional',
      
      // Metadados
      timestamp: timestamp,
      source: 'Website Oficial - Formulário de Investidores'
    };

    // Envia o email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return { 
        success: true, 
        message: 'Email enviado com sucesso!' 
      };
    } else {
      throw new Error(`Erro no envio: ${response.text}`);
    }
    
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { 
      success: false, 
      message: 'Erro ao enviar email. Tentando método alternativo...' 
    };
  }
};

// Função para criar o corpo do email estruturado
export const createEmailBody = (formData: InvestorFormData): string => {
  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
╔════════════════════════════════════════════════════════════════╗
║          FORMULÁRIO DE REGISTRO DE INVESTIDOR - PELE RARA          ║
╚════════════════════════════════════════════════════════════════╝

📅 Data/Hora: ${timestamp} (Horário de Brasília)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 INFORMAÇÕES PESSOAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Nome Completo: ${formData.fullName}
▪ Email: ${formData.email}
▪ Telefone: ${formData.phone}
▪ CPF: ${formData.cpf}
▪ RG: ${formData.rg || 'Não informado'}
▪ Data de Nascimento: ${formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('pt-BR') : 'Não informado'}
▪ Nacionalidade: ${formData.nationality}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 ENDEREÇO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Endereço: ${formData.address}
▪ Cidade: ${formData.city}
▪ Estado: ${formData.state}
▪ CEP: ${formData.zipCode}
▪ País: ${formData.country}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 INFORMAÇÕES PROFISSIONAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Ocupação: ${formData.occupation}
▪ Empresa: ${formData.company || 'Não informado'}
▪ Cargo: ${formData.position || 'Não informado'}
▪ Experiência: ${formData.workExperience || 'Não informado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 INFORMAÇÕES FINANCEIRAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Renda Mensal: ${formatCurrency(formData.monthlyIncome)}
▪ Patrimônio Total: ${formatCurrency(formData.totalAssets)}
▪ Experiência em Investimentos: ${formData.investmentExperience || 'Não informado'}
▪ Perfil de Risco: ${formData.riskProfile || 'Não informado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 DETALHES DO INVESTIMENTO PRETENDIDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Valor Pretendido: ${formatCurrency(formData.intendedInvestment)}
▪ Horizonte de Investimento: ${formData.investmentHorizon || 'Não informado'}
▪ Motivações: ${formData.motivations || 'Não informado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 QUALIFICAÇÃO COMO INVESTIDOR (CVM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Status: ${translateAccreditedStatus(formData.accreditedStatus)}
▪ Comprovação: ${formData.accreditationProof || 'Não informado'}
▪ Certificações: ${formData.professionalCertification || 'Não informado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 INFORMAÇÕES ADICIONAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Como conheceu: ${formData.howDidYouHear || 'Não informado'}
▪ Comentários: ${formData.additionalComments || 'Nenhum comentário adicional'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PRÓXIMOS PASSOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ✉️ Envio de NDA para assinatura
2. 📅 Agendamento de apresentação detalhada
3. 📋 Processo de due diligence
4. 📄 Estruturação da documentação
5. 💼 Formalização do investimento

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ INFORMAÇÕES IMPORTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▪ Investimento Mínimo: R$ 300.000
▪ Modalidade: Mútuo Conversível / Equity
▪ Setor: Beleza Tech / Consumo
▪ Estágio: Scale-up em expansão
▪ Website: www.pelerara.com.br

╔════════════════════════════════════════════════════════════════╗
║  Este formulário foi enviado através do site oficial da Pele Rara  ║
║         Todos os dados estão protegidos conforme a LGPD            ║
╚════════════════════════════════════════════════════════════════╝
`;
};

// Função fallback para abrir cliente de email
export const openEmailClientFallback = (formData: InvestorFormData): void => {
  const emailBody = createEmailBody(formData);
  const subject = `[NOVO INVESTIDOR] ${formData.fullName} - ${formatCurrency(formData.intendedInvestment)}`;
  
  const mailtoUrl = `mailto:cynthia@pelerara.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
  // Abre em nova aba
  window.open(mailtoUrl, '_blank');
};