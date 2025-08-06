import emailjs from '@emailjs/browser';

// Configurações do EmailJS (você precisa configurar no site do EmailJS)
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  investorType: string;
  investmentTicket: string;
  experience: string;
  interests?: string;
}

export const sendInvestmentEmail = async (formData: FormData): Promise<boolean> => {
  // Por enquanto, retorna false para sempre usar o fallback
  // Quando configurar o EmailJS, remova esta linha e descomente o código abaixo
  return false;
  
  /*
  try {
    const templateParams = {
      to_email: 'cynthia@pelerara.com.br',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company || 'Não informado',
      position: formData.position || 'Não informado',
      investor_type: formData.investorType,
      investment_ticket: formData.investmentTicket,
      experience: formData.experience,
      interests: formData.interests || 'Não informado',
      subject: `[NOVO INVESTIDOR] ${formData.name} - ${formData.investorType} - ${formData.investmentTicket}`,
      timestamp: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return response.status === 200;
  } catch (error) {
    console.error('Erro ao enviar email via EmailJS:', error);
    return false;
  }
  */
};

// Função para abrir cliente de email diretamente
export const openEmailClient = (formData: FormData): void => {
  const now = new Date();
  const dateTime = now.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const emailBody = `=================================
CADASTRO DE INVESTIDOR - PELE RARA
=================================

Data/Hora: ${dateTime} (Horário de Brasília)

DADOS PESSOAIS:
───────────────────────────────────
▪ Nome Completo: ${formData.name}
▪ Email: ${formData.email}
▪ Telefone: ${formData.phone}
▪ Empresa: ${formData.company || 'Não informado'}
▪ Cargo/Função: ${formData.position || 'Não informado'}

PERFIL DE INVESTIMENTO:
───────────────────────────────────
▪ Tipo de Investidor: ${formData.investorType}
▪ Ticket de Interesse: ${formData.investmentTicket}
▪ Experiência em Investimentos: ${formData.experience}

INTERESSES ESPECÍFICOS:
───────────────────────────────────
${formData.interests || 'Não informado'}

PRÓXIMOS PASSOS:
───────────────────────────────────
1. Enviar NDA para assinatura
2. Agendar apresentação completa
3. Due diligence e documentação
4. Estruturação do investimento

OBSERVAÇÕES:
───────────────────────────────────
▪ Solicitação via site oficial: www.pelerara.com.br
▪ Investimento mínimo: R$ 500.000
▪ Modalidade: Mútuo Conversível
▪ Valuation Cap: R$ 200.000.000

=================================
Gerado automaticamente pelo sistema
=================================`;

  const structuredSubject = `[NOVO INVESTIDOR] ${formData.name} - ${formData.investorType} - ${formData.investmentTicket}`;
  
  const mailtoUrl = `mailto:cynthia@pelerara.com.br?subject=${encodeURIComponent(structuredSubject)}&body=${encodeURIComponent(emailBody)}`;
  
  // Abre em nova aba para não redirecionar a página principal
  window.open(mailtoUrl, '_blank');
};

// Função fallback usando mailto (retorna a URL ao invés de redirecionar)
export const createEmailFallback = (formData: FormData): string => {
  const now = new Date();
  const dateTime = now.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const emailBody = `
=================================
CADASTRO DE INVESTIDOR - PELE RARA
=================================

Data/Hora: ${dateTime} (Horário de Brasília)

DADOS PESSOAIS:
───────────────────────────────────
▪ Nome Completo: ${formData.name}
▪ Email: ${formData.email}
▪ Telefone: ${formData.phone}
▪ Empresa: ${formData.company || 'Não informado'}
▪ Cargo/Função: ${formData.position || 'Não informado'}

PERFIL DE INVESTIMENTO:
───────────────────────────────────
▪ Tipo de Investidor: ${formData.investorType}
▪ Ticket de Interesse: ${formData.investmentTicket}
▪ Experiência em Investimentos: ${formData.experience}

INTERESSES ESPECÍFICOS:
───────────────────────────────────
${formData.interests || 'Não informado'}

PRÓXIMOS PASSOS:
───────────────────────────────────
1. Enviar NDA para assinatura
2. Agendar apresentação completa
3. Due diligence e documentação
4. Estruturação do investimento

OBSERVAÇÕES:
───────────────────────────────────
▪ Solicitação via site oficial: www.pelerara.com.br
▪ Investimento mínimo: R$ 500.000
▪ Modalidade: Mútuo Conversível
▪ Valuation Cap: R$ 200.000.000

=================================
Gerado automaticamente pelo sistema
=================================`;

  const structuredSubject = `[NOVO INVESTIDOR] ${formData.name} - ${formData.investorType} - ${formData.investmentTicket}`;
  
  return `mailto:cynthia@pelerara.com.br?subject=${encodeURIComponent(structuredSubject)}&body=${encodeURIComponent(emailBody)}`;
};
