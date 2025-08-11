import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { sendInvestorEmail } from './services/investorEmailService';

// Get base path from Vite configuration for GitHub Pages compatibility
const getBasePath = () => {
  return '';
};

// Helper function to create correct image paths
const createImagePath = (path: string) => {
  const basePath = getBasePath();
  return `${basePath}${path}`;
};

// Use public folder paths with correct base path for production
const IMAGE_PATHS = {
  cynthia: createImagePath('/images/Cynthia-Nara.JPG'),
  biocic: createImagePath('/images/biobloc.JPG'),
  biobloc: createImagePath('/images/biocic.JPG'),
  peleRara02: createImagePath('/images/pele-rara-02.png'),
  logo1: createImagePath('/images/Logo_1.png'),
  customer1: createImagePath('/images/depoimento01.png'),
  customer2: createImagePath('/images/depoimento02.png'),
  customer3: createImagePath('/images/depoimento03.png'),
  customer4: createImagePath('/images/depoimento04.png')
};

// Fallback paths (same as primary now)
const PUBLIC_IMAGE_PATHS = IMAGE_PATHS;

// Debug log
console.log('Base path:', getBasePath());
console.log('IMAGE_PATHS:', IMAGE_PATHS);
console.log('Environment mode:', import.meta.env.MODE);

// Note: All images must be in the /public/images/ folder for production deployment
// This ensures they are served correctly by the static file server

// Enhanced Image Component with automatic fallback
const RobustImage: React.FC<{
  imageKey: keyof typeof IMAGE_PATHS;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}> = ({ imageKey, alt, className, loading = 'lazy', onLoad }) => {
  const [hasError, setHasError] = useState(false);
  const imageSrc = IMAGE_PATHS[imageKey];

  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    setHasError(true);
  };

  const handleSuccess = () => {
    if (onLoad) onLoad();
    console.log(`Image loaded successfully: ${imageSrc}`);
  };

  if (hasError) {
    return (
      <div 
        className={`${className} image-error-placeholder`}
      >
        <span>Imagem não disponível: {alt}</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={handleSuccess}
    />
  );
};

// Currency conversion rates (mock data - in production you'd fetch from an API)
const exchangeRates = {
  'pt-BR': { symbol: 'R$', rate: 1, code: 'BRL' },
  'en': { symbol: '$', rate: 0.20, code: 'USD' },
  'es': { symbol: '$', rate: 0.20, code: 'USD' }
};

// Format currency based on language
const formatCurrency = (amount: number, language: string) => {
  const currency = exchangeRates[language as keyof typeof exchangeRates] || exchangeRates['pt-BR'];
  const convertedAmount = amount * currency.rate;
  
  // For large amounts (millions), use abbreviated format
  if (convertedAmount >= 1000000) {
    const millions = convertedAmount / 1000000;
    if (language === 'pt-BR') {
      return `${currency.symbol} ${millions.toFixed(0)}M`;
    } else {
      return `${currency.symbol}${millions.toFixed(0)}M`;
    }
  }
  
  if (language === 'pt-BR') {
    return `${currency.symbol} ${convertedAmount.toLocaleString('pt-BR')}`;
  } else if (language === 'en') {
    return `${currency.symbol}${convertedAmount.toLocaleString('en-US')}`;
  } else if (language === 'es') {
    return `${currency.symbol}${convertedAmount.toLocaleString('es-ES')}`;
  }
  return `${currency.symbol} ${convertedAmount.toLocaleString()}`;
};

// Format market size for different regions
const formatMarketSize = (language: string) => {
  if (language === 'pt-BR') {
    return '57M';
  } else if (language === 'en') {
    return '150M'; // North American market
  } else if (language === 'es') {
    return '120M'; // Latin American market
  }
  return '57M';
};

// Language translations
const translations = {
  'pt-BR': {
    // Hero section
    heroTitle: 'Tecnologias <strong>Patenteadas</strong><br />Revolucionando o Cuidado<br />com a Pele Sensível',
    heroSubtitle: 'Nanotecnologia brasileira com validação científica internacional',
    investmentBadge: 'Rodada de Investimento Aberta',
    ctaButton: 'Conhecer Oportunidade',
    
    // Numbers section
    numbersTitle: 'Números que Definem o Futuro',
    numbersSubtitle: 'Uma trajetória consistente de crescimento e inovação',
    marketBrazilian: 'Mercado Brasileiro',
    marketValuation: 'Valuation',
    patents: 'Patentes INPI',
    growth: 'Crescimento 3 Anos',
    globalMarket: 'Mercado Global Fitoterápicos: US$ 13,75 bilhões (CAGR 25% | 2023-2033)',
    
    // Problem section
    problemTitle: 'O Problema',
    problemSubtitle: 'Um mercado gigantesco completamente desatendido',
    problemDescription: 'Milhões de brasileiros com necessidades especiais de cuidados dermatológicos',
    problemList: [
      'Produtos convencionais não atendem necessidades específicas',
      'Tratamentos especializados com alto custo e baixa acessibilidade',
      'Mercado subatendido com poucas soluções tecnológicas',
      'Falta de conhecimento sobre preparo adequado da pele'
    ],
    
    // Solution section
    solutionTitle: 'Nossa Solução',
    solutionSubtitle: 'Ecossistema que alinha tecnologia farmacêutica,<br />tecnologia digital e acolhimento emocional',
    solutionPatents: 'Duas patentes avaliadas em R$ 183M',
    biocicName: 'BIOCIC',
    biocicTitle: 'Nanotecnologia Regenerativa',
    biocicDescription: 'Biomimética que garante absorção a nível celular e regeneração 2x mais rápida',
    bioblocName: 'BIOBLOC',
    bioblocTitle: 'Limpeza Sensível',
    bioblocDescription: 'Tecnologia de limpeza com pH syndet que preserva a barreira cutânea',
    iaName: 'IA NARA',
    iaTitle: 'Inteligência Artificial',
    iaDescription: 'Acompanhamento personalizado da evolução da pele do paciente',
    
    // Validation section
    validationTitle: 'Validação Científica e Mercado',
    validationSubtitle: 'Comprovação em instituições de referência internacional',
    hospitalsPartners: 'Hospitais Parceiros',
    hospitalsDescription: 'Hospital do Amor, HC-UFMG/USP, Hospital da Baleia',
    publications: 'Publicações Internacionais',
    publicationsDescription: 'Artigos científicos em periódicos de alto impacto',
    patients: 'Pacientes Atendidos',
    patientsDescription: 'Validação clínica com resultados comprovados',
    products: 'Produtos no Mercado',
    productsDescription: 'Portfolio completo registrado na ANVISA',
    
    // Investment section
    investmentTitle: 'Oportunidade de Investimento',
    investmentSubtitle: 'Participe da revolução do cuidado dermatológico brasileiro',
    modality: 'Modalidade',
    modalityValue: 'Mútuo Conversível',
    captureGoal: 'Meta de Captação',
    minimumTicket: 'Ticket Mínimo',
    investmentFormat: 'Formato',
    investmentFormatValue: '20 cotas de R$ 500k',
    term: 'Prazo da Rodada',
    termValue: '10/08 até 10/09',
    
    // Timeline section
    timelineTitle: 'Cronograma de Execução',
    timelineSubtitle: 'Estratégia clara para os próximos 24 meses',
    timeline1Title: 'Mês 1-2: Preparação para Captação',
    timeline1Description: 'Finalização da documentação, ajuste de expectativas de avaliação, e preparação do pitch deck e data room.',
    timeline2Title: 'Mês 3-4: Roadshow e Negociação',
    timeline2Description: 'Apresentações para investidores, negociação de termos, e due diligence.',
    timeline3Title: 'Mês 5-6: Fechamento e Planejamento',
    timeline3Description: 'Assinatura de documentos, recebimento de recursos e detalhamento do plano de execução.',
    timeline4Title: 'Mês 7-12: Construção da Fábrica',
    timeline4Description: 'Início da construção da fábrica, aquisição de equipamentos, e contratação de equipe técnica.',
    timeline5Title: 'Mês 13-18: Expansão Comercial',
    timeline5Description: 'Lançamento de novos produtos, expansão de canais de distribuição, e início de operação da fábrica.',
    timeline6Title: 'Mês 18-24: Preparação para Série A',
    timeline6Description: 'Consolidação de métricas de crescimento, expansão internacional, e preparação para próxima rodada de captação.',
    
    // CTA section
    ctaTitle: 'Faça Parte Desta História',
    ctaDescription: 'Invista em tecnologia patenteada com +10 anos de pesquisa<br />Rodada limitada: 01/08 até 15/08 • Ticket mínimo: R$ 500 mil',
    ctaPrimary: 'Quero Investir',
    downloadPresentation: 'Baixar Apresentações e Material Gráfico',
    
    // Footer
    footerText: 'Nossa pele é nossa história',
    footerMotto: 'Celebramos cada marca',
    footerAdditional: 'AFINAL, SÓ TEM CICATRIZES QUEM SOBREVIVEU',
    
    // Email subjects
    investmentEmailSubject: 'Interesse em Investir - Pele Rara',
    presentationEmailSubject: '[INVESTIDOR] Cadastro - Pele Rara',
    investmentEmailBody: 'Gostaria de agendar uma reunião para conhecer a oportunidade de investimento.%0A%0ANome:%0ATelefone:%0AEmpresa:%0ATicket de Interesse:',
    presentationEmailBody: 'Solicitação de apresentação completa da oportunidade de investimento.',
    whatsappMessage: 'Olá! Tenho interesse na oportunidade de investimento da Pele Rara. Gostaria de agendar uma reunião para conhecer mais detalhes.',
    
    // Form fields
    formName: 'Nome Completo',
    formEmail: 'Email',
    formPhone: 'Telefone',
    formCompany: 'Empresa',
    formPosition: 'Cargo/Função',
    formInvestorType: 'Tipo de Investidor',
    formInvestmentTicket: 'Ticket de Interesse',
    formExperience: 'Experiência em Investimentos',
    formInterests: 'Interesses Específicos',
    formSubmit: 'Quero Investir',
    formSuccess: '✅ Obrigado pelo seu interesse! Recebemos suas informações e nossa equipe entrará em contato em até 24 horas para agendar uma reunião personalizada.',
    
    // Form options
    investorTypes: [
      'Pessoa Física',
      'Family Office',
      'Fundo de Investimento',
      'Corporate Venture',
      'Angel Investor',
      'Outro'
    ],
    ticketRanges: [
      'R$ 500k - R$ 1M',
      'R$ 1M - R$ 2M',
      'R$ 2M - R$ 5M',
      'R$ 5M+',
      'A definir'
    ],
    experienceLevels: [
      'Primeiro investimento',
      '1-5 investimentos',
      '5-20 investimentos',
      '20+ investimentos',
      'Investidor profissional'
    ],
    
    // Founder section
    founderTitle: 'Liderança Científica',
    founderSubtitle: 'PhD com expertise comprovada em nanotecnologia',
    founderName: 'Dra. Cynthia Nara Oliveira',
    founderRole: 'Fundadora & CEO',
    founderDescription: 'Doutora em Ciências Farmacêuticas com especialização em nanotecnologia. Líder em pesquisa e desenvolvimento de sistemas de encapsulação para dermocosméticos, com publicações internacionais e parcerias com as principais universidades do Brasil.',
    
    // Testimonials section
    testimonialsTitle: 'Depoimentos Médicos',
    testimonialsSubtitle: 'Validação científica reconhecida por especialistas renomados',
    testimonials: [
      {
        name: 'Dr. Marco Andrey',
        position: 'CHEFE DO DEPARTAMENTO DE DERMATOLOGIA',
        institution: 'Faculdade de Medicina - USP',
        testimonial: 'As tecnologias BIOCIC e BIOBLOC representam um avanço significativo no tratamento de pele sensível. Os resultados clínicos demonstram eficácia superior aos produtos convencionais, com regeneração celular comprovadamente mais rápida.',
        photo: null
      },
      {
        name: 'Dra. Raquel Vilela',
        position: 'PROFESSORA ADJUNTA',
        institution: 'Hospital das Clínicas - UFMG\nFaculdade de Farmácia - UFMG\nMichigan State University - MSU\nInstituto Superior de Medicina - ISMD',
        testimonial: 'Em nossos estudos clínicos, observamos que os produtos Pele Rara apresentam resultados excepcionais em pacientes com dermatite atópica e pele sensível. A nanotecnologia desenvolvida é verdadeiramente inovadora.',
        photo: null
      },
      {
        name: 'Profa. Claudia Lincoln',
        position: 'Pesquisadora Sênior',
        institution: 'Instituto de Ciências Biomédicas - USP\nHospital das Clínicas - HC-USP',
        testimonial: 'A pesquisa desenvolvida pela Dra. Cynthia Nara representa um marco na nanotecnologia farmacêutica brasileira. Os sistemas de encapsulação BIOCIC e BIOBLOC são únicos e com aplicações de grande impacto clínico.',
        photo: null
      }
    ],
    
    // FAQ section
    faqTitle: 'Perguntas Frequentes dos Investidores',
    faqSubtitle: 'Esclarecemos as principais dúvidas sobre a oportunidade',
    faqContact: 'Tem outras dúvidas?',
    faqContactLink: 'Entre em contato conosco',
    
    // Achievements section
    achievementsTitle: 'O que Conquistamos Até Aqui',
    achievementsSubtitle: 'Mais de 10 anos de pesquisa transformados em inovação comercial',
    
    // Achievement items
    achievementResearch: 'Anos de Pesquisa',
    achievementResearchDesc: '+10 anos P&D, +20 publicações midiáticas (UOL, CNN, Veja Saúde)',
    achievementPatents: 'Propriedade Intelectual',
    achievementPatentsDesc: '3 pedidos de patente + 3 marcas registradas - Valor: R$ 95-187M',
    achievementProducts: 'Portfólio Comercial',
    achievementProductsDesc: '36 fórmulas desenvolvidas + 13 já registradas na ANVISA',
    achievementStudies: 'Validação Científica',
    achievementStudiesDesc: '2 artigos nacionais + 1 internacional + 5 estudos clínicos em andamento',
    achievementImpact: 'Impacto no Mercado',
    achievementImpactDesc: '+40K pacientes utilizaram as tecnologias - Investimento R$ 5M em estudos',
    achievementProjection: 'Projeção Financeira',
    achievementProjectionDesc: '2025: 3X faturamento → 2030: 30X acumulado',
    
    // New sections for expansion and protection
    expansionTitle: 'Plano de Expansão Nacional',
    expansionSubtitle: 'Crescimento estratégico em 5 anos - Pontos de Venda',
    
    competitiveTitle: 'Diferenciais Competitivos',
    competitiveSubtitle: 'Por que investir na Pele Rara',
    
    protectionTitle: 'Proteção ao Investidor',
    protectionSubtitle: 'Governança sólida e direitos garantidos',
    
    riskTitle: 'Gestão de Riscos',
    riskSubtitle: 'Estratégias de mitigação para principais riscos identificados',
    
    // Expansion items
    year1: 'ANO 1',
    year1Target: '535 PDVs',
    year1Description: 'Principais capitais nas redes já atendidas',
    
    year2: 'ANO 2',
    year2Target: '1.594 PDVs',
    year2Description: 'SP, RJ, MG, DF + início exportações América Latina',
    
    year3: 'ANO 3',
    year3Target: '4.221 PDVs',
    year3Description: 'Sul e Centro-Oeste + fábrica própria + licenciamento',
    
    year5: 'ANO 5',
    year5Target: '10.525 PDVs',
    year5Description: 'Cobertura nacional completa - 90K farmácias no Brasil',
    
    // Competitive advantages
    specializedNiche: 'Nicho Especializado',
    specializedNicheDesc: 'Foco em condições dermatológicas raras pouco atendidas por grandes marcas',
    
    growthPlan: 'Plano de Crescimento',
    growthPlanDesc: 'Expansão nacional e internacional com estratégia sólida validada',
    
    digitalBranding: 'Branding Digital',
    digitalBrandingDesc: 'Presença online consolidada com comunidade ativa e produto validado',
    
    strategicPartnerships: 'Parcerias Estratégicas',
    strategicPartnershipsDesc: 'Interesse ativo de investidores e grandes distribuidores',
    
    // Investor protections
    governance: 'Governança',
    governanceDesc: 'Assento no Conselho + direitos de veto para investimentos >R$ 1M',
    
    informationRights: 'Direitos de Informação',
    informationRightsDesc: 'Relatórios mensais + acesso a métricas operacionais',
    
    tagAlong: 'Tag Along',
    tagAlongDesc: 'Direito de vender nas mesmas condições dos fundadores',
    
    vestingFounders: 'Vesting Fundadores',
    vestingFoundersDesc: 'Cronograma 4 anos garantindo comprometimento',
    
    antiDilution: 'Anti-Diluição',
    antiDilutionDesc: 'Proteção full-ratchet contra down rounds',
    
    monitoring: 'Acompanhamento',
    monitoringDesc: 'Entrada no grupo de investidores e acesso ao painel trimestral de performance',
    
    // Risk management
    factoryRisk: 'Atrasos na Construção da Fábrica',
    factoryRiskMitigation: 'Contrato com penalidades por atraso • Terceirização parcial da produção como backup • Cronograma com margem de segurança de 3 meses',
    
    marketRisk: 'Adoção pelo Mercado',
    marketRiskMitigation: 'Expansão gradual de canais • Testes de mercado em regiões piloto • Parcerias com formadores de opinião para validação de produtos',
    
    ipRisk: 'Proteção de Propriedade Intelectual',
    ipRiskMitigation: 'Depósito de patentes em mercados estratégicos • Proteção de segredos industriais • Monitoramento contínuo de violações potenciais',
    
    talentRisk: 'Retenção de Talentos-Chave',
    talentRiskMitigation: 'Plano de incentivos de longo prazo • Programa de stock options para posições estratégicas • Documentação de processos críticos',
    
    regulatoryRisk: 'Regulatório',
    regulatoryRiskMitigation: 'Consultoria especializada em regulação • Monitoramento contínuo de mudanças regulatórias • Relacionamento proativo com ANVISA',
    
    fundingRisk: 'Captação de Recursos Adicionais',
    fundingRiskMitigation: 'Planejamento financeiro conservador • Relacionamento com múltiplos investidores • Marcos claros para destravar próximas rodadas',
    
    // Use of funds detailed
    fundsTitle: 'Uso Detalhado dos Recursos',
    fundsSubtitle: 'Transparência total na aplicação do capital',
    fundsOverview: 'Investimento estratégico para acelerar crescimento e consolidar liderança tecnológica',
    
    // Fund allocation cards
    factoryTitle: 'Fábrica & Tecnologia',
    factoryItems: [
      'Equipamentos nanotecnologia',
      'Sistemas GMP',
      'Certificações internacionais'
    ],
    commercialExpansionTitle: 'Expansão Comercial',
    expansionItems: [
      'B2C: Consumidor final via 5.000+ farmácias',
      'B2B: Clínicas e consultórios médicos',
      'B2G: Licitações SUS e hospitais públicos'
    ],
    productsTitle: 'Novos Produtos',
    productsItems: [
      'Registro de 34 SKUs desenvolvidos na ANVISA',
      'Desenvolvimento de embalagens e marketing',
      'Estudos de estabilidade e validação'
    ],
    
    // Summary labels
    operationMonths: 'Meses para Operação',
    roiProjected: 'ROI Médio Projetado',
    countriesFirstYear: 'Países no Primeiro Ano',
    directJobs: 'Empregos Diretos',
    
    // ROI Calculator
    roiCalculatorTitle: 'Calculadora de ROI',
    roiCalculatorSubtitle: 'Projete seu retorno sobre investimento baseado em premissas fixas',
    roiCalculatorInputs: 'Parâmetros do Investimento',
    roiCalculatorResults: 'Projeção de Retorno',
    investmentValue: 'Valor do Investimento',
    investmentPeriod: 'Período de Investimento',
    growthScenario: 'Cenário de Crescimento',
    realistic: 'Cenário Base',
    optimistic: 'Cenário Ascendente',
    scenarioAssumptions: 'Premissas do Cenário Selecionado:',
    
    // Realistic scenario (now Base scenario)
    realisticAssumptions: [
      'ROI Total: 99,31% (5 anos)',
      'Múltiplo de saída: 1,9931x',
      'Retorno anualizado: 14,79% a.a.',
      'Valuation Post-Money: R$ 145,4M'
    ],
    
    // Optimistic scenario (now Ascending scenario)
    optimisticAssumptions: [
      'ROI Total: 199% (5 anos)',
      'Múltiplo de saída: 2,99x',
      'Retorno anualizado: 24,48% a.a.',
      'Valuation Post-Money: R$ 145,4M'
    ],
    
    // ROI Results
    finalValueEstimated: 'Valor Final Estimado',
    totalReturn: 'Retorno Total',
    totalROI: 'ROI Total',
    annualizedReturn: 'Retorno Anualizado',
    capitalMultiple: 'Múltiplo do Capital',
    comparisonOtherInvestments: 'Comparação com Outros Investimentos',
    investmentEvolution: 'Evolução do Investimento',
    importantWarning: '⚠️ Aviso Importante',
    riskDisclaimer: 'As projeções apresentadas são estimativas baseadas em premissas de mercado e desempenho esperado. Investimentos em startups envolvem riscos significativos e os retornos não são garantidos. Past performance is not indicative of future results.',
    
    // Time periods
    years: 'anos',
    year: 'Ano',
    minimumInvestment: 'Investimento mínimo: R$ 500 mil',
    equityParticipation: 'Participação Societária',
    
    // Form sections
    personalInfoSection: 'Informações Pessoais',
    addressSection: 'Endereço',
    professionalInfoSection: 'Informações Profissionais',
    financialInfoSection: 'Informações Financeiras',
    investmentIntentionSection: 'Intenção de Investimento',
    investorQualificationSection: 'Qualificação como Investidor (CVM)',
    additionalInfoSection: 'Informações Adicionais',
    termsSection: 'Termos e Condições',
    
    // Form field labels
    fullName: 'Nome Completo',
    email: 'Email',
    phone: 'Telefone',
    cpf: 'CPF',
    rg: 'RG',
    birthDate: 'Data de Nascimento',
    nationality: 'Nacionalidade',
    address: 'Endereço Completo',
    city: 'Cidade',
    state: 'Estado',
    zipCode: 'CEP',
    occupation: 'Ocupação',
    company: 'Empresa',
    position: 'Cargo',
    workExperience: 'Anos de Experiência',
    monthlyIncome: 'Renda Mensal',
    totalAssets: 'Patrimônio Total',
    investmentExperience: 'Experiência em Investimentos',
    riskProfile: 'Perfil de Risco',
    intendedInvestment: 'Valor Pretendido de Investimento',
    investmentHorizon: 'Horizonte de Investimento',
    motivations: 'Motivações para Investir',
    accreditedStatus: 'Status de Investidor Qualificado',
    accreditationProof: 'Comprovação de Qualificação',
    professionalCertification: 'Certificações Profissionais',
    howDidYouHear: 'Como soube da Pele Rara?',
    additionalComments: 'Comentários Adicionais',
    
    // Form placeholders
    phonePlaceholder: '(11) 99999-9999',
    cpfPlaceholder: '000.000.000-00',
    rgPlaceholder: '00.000.000-0',
    addressPlaceholder: 'Rua, número, complemento',
    occupationPlaceholder: 'Sua profissão',
    zipCodePlaceholder: '00000-000',
    motivationsPlaceholder: 'Descreva suas motivações e expectativas para este investimento',
    certificationPlaceholder: 'Ex: CPA-20, CFA, CNPI (se aplicável)',
    commentsPlaceholder: 'Informações adicionais, dúvidas ou comentários',
    
    // Form options
    selectOption: 'Selecione...',
    selectState: 'Selecione o estado',
    selectIncomeRange: 'Selecione sua faixa de renda',
    selectAssetsRange: 'Selecione sua faixa de patrimônio',
    selectInvestmentValue: 'Selecione o valor',
    selectQualificationProof: 'Como pode comprovar?',
    
    // Experience levels options
    workExperienceOptions: [
      '0-2 anos',
      '3-5 anos', 
      '6-10 anos',
      '11-15 anos',
      '16-20 anos',
      'Mais de 20 anos'
    ],
    
    // Income options
    incomeOptions: [
      'Até R$ 5.000',
      'R$ 5.001 - R$ 10.000',
      'R$ 10.001 - R$ 20.000',
      'R$ 20.001 - R$ 50.000',
      'R$ 50.001 - R$ 100.000',
      'Acima de R$ 100.000'
    ],
    
    // Assets options
    assetsOptions: [
      'Até R$ 100.000',
      'R$ 100.001 - R$ 300.000',
      'R$ 300.001 - R$ 1.000.000',
      'R$ 1.000.001 - R$ 5.000.000',
      'R$ 5.000.001 - R$ 10.000.000',
      'Acima de R$ 10.000.000'
    ],
    
    // Investment experience options
    investmentExperienceOptions: [
      'Iniciante (poupança, CDB)',
      'Intermediário (fundos, ações)',
      'Avançado (derivativos, FIPs)',
      'Profissional (gestão de recursos)'
    ],
    
    // Risk profile options
    riskProfileOptions: [
      'Conservador',
      'Moderado',
      'Arrojado',
      'Super Arrojado'
    ],
    
    // Investment value options  
    investmentValueOptions: [
      'R$ 50.000 - R$ 100.000',
      'R$ 100.001 - R$ 250.000',
      'R$ 250.001 - R$ 500.000',
      'R$ 500.001 - R$ 1.000.000',
      'R$ 1.000.001 - R$ 2.000.000',
      'Acima de R$ 2.000.000'
    ],
    
    // Investment horizon options
    investmentHorizonOptions: [
      '5-10 anos',
      'Mais de 10 anos'
    ],
    
    // Accredited status options
    accreditedStatusOptions: [
      'Possuo patrimônio financeiro de pelo menos R$ 1.000.000',
      'Possuo certificação profissional (CPA-20, CFA, CNPI, etc.)',
      'Sou profissional do mercado financeiro',
      'Preciso verificar minha qualificação'
    ],
    
    // Accreditation proof options
    accreditationProofOptions: [
      'Extrato de corretora',
      'Declaração de Imposto de Renda',
      'Certificado profissional',
      'Carta do empregador',
      'Outros documentos'
    ],
    
    // How did you hear options
    howDidYouHearOptions: [
      'LinkedIn',
      'Google',
      'Indicação',
      'Mídia (jornal, revista)',
      'Evento',
      'Site da empresa',
      'Outros'
    ],
    
    // Terms and conditions
    agreeTerms: 'Concordo com os Termos de Uso e declaro estar ciente dos riscos associados a investimentos em empresas de capital fechado',
    agreePrivacy: 'Concordo com a Política de Privacidade e autorizo o tratamento dos meus dados conforme a LGPD',
    confirmAccuracy: 'Declaro que todas as informações fornecidas são verdadeiras e precisas',
    authorizeContact: 'Autorizo contato da Pele Rara para apresentação de oportunidades de investimento',
    
    // Form buttons
    submitNewInterest: 'Enviar Novo Interesse',
    
    // Success messages
    interestRegistered: 'Interesse Registrado com Sucesso!',
    emailOpenedAutomatically: 'Seu cliente de email foi aberto automaticamente com todas as informações preenchidas.',
    recipientEmail: 'Destinatário:',
    whatsappContact: 'WhatsApp:',
    emailNotOpened: 'Se o email não abriu automaticamente, clique no botão abaixo:',
    openEmailButton: 'Abrir Email para Cynthia',
    
    // Form placeholders and options
    formPlaceholderInterests: 'Conte-nos sobre seus interesses específicos, setores de preferência, etc.',
    submitting: 'Enviando...',
    
    // Risk levels
    riskHigh: 'ALTO',
    riskMedium: 'MÉDIO',
    riskLow: 'BAIXO',
    
    // States
    stateSP: 'São Paulo',
    faqQuestions: [
      {
        question: 'E se vocês não atingirem R$ 10M na captação?',
        answer: 'Seguiremos com execução parcial a partir de R$ 3M, mantendo contratos válidos e abrindo nova rodada futura. Nossa estratégia é flexível e permite crescimento gradual mesmo com captação parcial.'
      },
      {
        question: 'O que acontece se houver nova rodada de investimento?',
        answer: 'Investidores desta rodada terão participação com base no valuation ajustado (R$ 200M), ganhando vantagem caso a próxima rodada seja com valuation superior. Temos cláusulas de anti-diluição para proteger investidores iniciais.'
      },
      {
        question: 'Qual é o diferencial competitivo da Pele Rara?',
        answer: 'Possuímos duas tecnologias patenteadas (BIOCIC e BIOBLOC) com validação científica internacional, foco em nicho especializado pouco atendido por grandes marcas, e mais de 10 anos de pesquisa. Nossa nanotecnologia proprietária oferece resultados 2x mais rápidos que produtos convencionais.'
      },
      {
        question: 'Como funciona o mútuo conversível?',
        answer: 'O investimento será realizado via mútuo conversível com valuation cap de R$ 200 milhões (30% desconto sobre valuation pre-money de R$ 290M). Na próxima rodada (Série A), o valor se converte automaticamente em participação societária com condições vantajosas para o investidor.'
      },
      {
        question: 'Quais são as garantias para o investidor?',
        answer: 'Oferecemos governança sólida com assento no Conselho para investimentos >R$ 1M, direitos de veto, tag along, vesting de fundadores (4 anos), cláusulas anti-diluição e relatórios mensais. Patentes avaliadas em R$ 95-187M e 13 produtos já registrados na ANVISA garantem solidez do negócio.'
      },
      {
        question: 'Qual é a estratégia de saída para investidores?',
        answer: 'Planejamos crescimento orgânico com possibilidade de aquisição estratégica por multinacionais farmacêuticas ou IPO em 5-7 anos. O mercado de dermocosméticos tem múltiplos históricos de 15-25x EBITDA. Nossa estratégia de expansão para 10.525 PDVs em 5 anos maximiza o valor para saída.'
      }
    ]
  },
  
  'en': {
    // Hero section
    heroTitle: '<strong>Patented</strong> Technologies<br />Revolutionizing<br />Sensitive Skin Care',
    heroSubtitle: 'Brazilian nanotechnology with international scientific validation',
    investmentBadge: 'Investment Round Open',
    ctaButton: 'Learn About Opportunity',
    
    // Numbers section
    numbersTitle: 'Numbers That Define the Future',
    numbersSubtitle: 'A consistent trajectory of growth and innovation',
    marketBrazilian: 'North American Market',
    marketValuation: 'Valuation',
    patents: 'INPI Patents',
    growth: '3-Year Growth',
    globalMarket: 'Global Herbal Medicine Market: $13.75 billion (CAGR 25% | 2023-2033)',
    
    // Problem section
    problemTitle: 'The Problem',
    problemSubtitle: 'A gigantic market completely underserved',
    problemDescription: 'Millions of Brazilians with special dermatological care needs',
    problemList: [
      'Conventional products do not meet specific needs',
      'Specialized treatments with high cost and low accessibility',
      'Underserved market with few technological solutions',
      'Lack of knowledge about proper skin preparation'
    ],
    
    // Solution section
    solutionTitle: 'Our Solution',
    solutionSubtitle: 'Ecosystem that aligns pharmaceutical technology,<br />digital technology and emotional support',
    solutionPatents: 'Two patents valued at $37M',
    biocicName: 'BIOCIC',
    biocicTitle: 'Regenerative Nanotechnology',
    biocicDescription: 'Biomimetics that guarantees cellular-level absorption and 2x faster regeneration',
    bioblocName: 'BIOBLOC',
    bioblocTitle: 'Sensitive Cleansing',
    bioblocDescription: 'Cleansing technology with syndet pH that preserves the skin barrier',
    iaName: 'NARA AI',
    iaTitle: 'Artificial Intelligence',
    iaDescription: 'Personalized monitoring of patient skin evolution',
    
    // Validation section
    validationTitle: 'Scientific and Market Validation',
    validationSubtitle: 'Proof from internationally recognized institutions',
    hospitalsPartners: 'Partner Hospitals',
    hospitalsDescription: 'Hospital do Amor, HC-UFMG/USP, Hospital da Baleia',
    publications: 'International Publications',
    publicationsDescription: 'Scientific articles in high-impact journals',
    patients: 'Patients Treated',
    patientsDescription: 'Clinical validation with proven results',
    products: 'Products in Market',
    productsDescription: 'Complete portfolio registered with ANVISA',
    
    // Investment section
    investmentTitle: 'Investment Opportunity',
    investmentSubtitle: 'Participate in the Brazilian dermatological care revolution',
    modality: 'Type',
    modalityValue: 'Convertible Note',
    captureGoal: 'Funding Target',
    minimumTicket: 'Minimum Ticket',
    investmentFormat: 'Format',
    investmentFormatValue: '20 tickets of $100k',
    term: 'Round Period',
    termValue: '08/10 to 09/10',
    
    // Timeline section
    timelineTitle: 'Execution Timeline',
    timelineSubtitle: 'Clear strategy for the next 24 months',
    timeline1Title: 'Month 1-2: Fundraising Preparation',
    timeline1Description: 'Documentation finalization, valuation expectations adjustment, and pitch deck and data room preparation.',
    timeline2Title: 'Month 3-4: Roadshow and Negotiation',
    timeline2Description: 'Investor presentations, term negotiations, and due diligence.',
    timeline3Title: 'Month 5-6: Closing and Planning',
    timeline3Description: 'Document signing, resource receipt and detailed execution plan.',
    timeline4Title: 'Month 7-12: Factory Construction',
    timeline4Description: 'Factory construction start, equipment acquisition, and technical team hiring.',
    timeline5Title: 'Month 13-18: Commercial Expansion',
    timeline5Description: 'New product launches, distribution channel expansion, and factory operation start.',
    timeline6Title: 'Month 18-24: Series A Preparation',
    timeline6Description: 'Growth metrics consolidation, international expansion, and next funding round preparation.',
    
    // CTA section
    ctaTitle: 'Be Part of This Story',
    ctaDescription: 'Invest in patented technology with +10 years of research<br />Limited round: 08/01 to 08/15 • Minimum ticket: $100k',
    ctaPrimary: 'I Want to Invest',
    downloadPresentation: 'Download Presentations & Graphic Materials',
    
    // Footer
    footerText: 'Our skin is our story',
    footerMotto: 'We celebrate every mark',
    footerAdditional: 'AFTER ALL, ONLY THOSE WHO SURVIVED HAVE SCARS',
    
    // Email subjects
    investmentEmailSubject: 'Investment Interest - Pele Rara',
    presentationEmailSubject: '[INVESTOR] Registration - Pele Rara',
    investmentEmailBody: 'I would like to schedule a meeting to learn about the investment opportunity.%0A%0AName:%0APhone:%0ACompany:%0AInterest Ticket:',
    presentationEmailBody: 'Request for complete presentation of the investment opportunity.',
    whatsappMessage: 'Hello! I am interested in Pele Rara investment opportunity. I would like to schedule a meeting to learn more details.',
    
    // Form fields
    formName: 'Full Name',
    formEmail: 'Email',
    formPhone: 'Phone',
    formCompany: 'Company',
    formPosition: 'Position/Role',
    formInvestorType: 'Investor Type',
    formInvestmentTicket: 'Investment Ticket',
    formExperience: 'Investment Experience',
    formInterests: 'Specific Interests',
    formSubmit: 'I Want to Invest',
    formSuccess: '✅ Thank you for your interest! We received your information and our team will contact you within 24 hours to schedule a personalized meeting.',
    
    // Form options
    investorTypes: [
      'Individual',
      'Family Office',
      'Investment Fund',
      'Corporate Venture',
      'Angel Investor',
      'Other'
    ],
    ticketRanges: [
      '$100k - $200k',
      '$200k - $400k',
      '$400k - $1M',
      '$1M+',
      'To be defined'
    ],
    experienceLevels: [
      'First investment',
      '1-5 investments',
      '5-20 investments',
      '20+ investments',
      'Professional investor'
    ],
    
    // Founder section
    founderTitle: 'Scientific Leadership',
    founderSubtitle: 'PhD with proven expertise in nanotechnology',
    founderName: 'Dr. Cynthia Nara Oliveira',
    founderRole: 'Founder & CEO',
    founderDescription: 'PhD in Pharmaceutical Sciences specializing in nanotechnology. Leader in research and development of encapsulation systems for dermocosmetics, with international publications and partnerships with Brazil\'s leading universities.',
    
    // Testimonials section
    testimonialsTitle: 'Medical Testimonials',
    testimonialsSubtitle: 'Scientific validation recognized by renowned specialists',
    testimonials: [
      {
        name: 'Dr. Marco Andrey',
        position: 'HEAD OF DERMATOLOGY DEPARTMENT',
        institution: 'Faculty of Medicine - USP',
        testimonial: 'BIOCIC and BIOBLOC technologies represent a significant advancement in sensitive skin treatment. Clinical results demonstrate superior efficacy to conventional products, with provably faster cellular regeneration.',
        photo: null
      },
      {
        name: 'Dr. Raquel Vilela',
        position: 'ADJUNCT PROFESSOR',
        institution: 'Clinical Hospital - UFMG\nFaculty of Pharmacy - UFMG\nMichigan State University - MSU\nSuperior Institute of Medicine - ISMD',
        testimonial: 'In our clinical studies, we observed that Pele Rara products show exceptional results in patients with atopic dermatitis and sensitive skin. The developed nanotechnology is truly innovative.',
        photo: null
      },
      {
        name: 'Prof. Claudia Lincoln',
        position: 'Senior Researcher',
        institution: 'Institute of Biomedical Sciences - USP\nClinical Hospital - HC-USP',
        testimonial: 'The research developed by Dr. Cynthia Nara represents a milestone in Brazilian pharmaceutical nanotechnology. The BIOCIC and BIOBLOC encapsulation systems are unique with high clinical impact applications.',
        photo: null
      }
    ],
    
    // FAQ section
    faqTitle: 'Frequently Asked Questions from Investors',
    faqSubtitle: 'We clarify the main questions about the opportunity',
    faqContact: 'Have other questions?',
    faqContactLink: 'Contact us',
    
    // Achievements section
    achievementsTitle: 'What We Have Achieved So Far',
    achievementsSubtitle: 'A solid trajectory of achievements and important milestones',
    
    // Achievement items
    achievementResearch: 'Years of Research',
    achievementResearchDesc: '+10 years R&D, +20 media publications (UOL, CNN, Veja Saúde)',
    achievementPatents: 'Intellectual Property',
    achievementPatentsDesc: '3 patent filings + 3 registered trademarks - Value: $19-37M',
    achievementProducts: 'Commercial Portfolio',
    achievementProductsDesc: '36 formulations developed + 13 already registered with ANVISA',
    achievementStudies: 'Scientific Validation',
    achievementStudiesDesc: '2 national articles + 1 international + 5 ongoing clinical studies',
    achievementImpact: 'Market Impact',
    achievementImpactDesc: '+40K patients used the technologies - Investment $1M in studies',
    achievementProjection: 'Financial Projection',
    achievementProjectionDesc: '2025: 3X revenue → 2030: 30X accumulated',
    
    // New sections for expansion and protection
    expansionTitle: 'National Expansion Plan',
    expansionSubtitle: 'Strategic 5-year growth - Sales Points',
    
    competitiveTitle: 'Competitive Advantages',
    competitiveSubtitle: 'Why invest in Pele Rara',
    
    protectionTitle: 'Investor Protection',
    protectionSubtitle: 'Solid governance and guaranteed rights',
    
    riskTitle: 'Risk Management',
    riskSubtitle: 'Mitigation strategies for identified main risks',
    
    // Expansion items
    year1: 'YEAR 1',
    year1Target: '535 PDVs',
    year1Description: 'Main capitals in networks already served',
    
    year2: 'YEAR 2',
    year2Target: '1,594 PDVs',
    year2Description: 'SP, RJ, MG, DF + start Latin America exports',
    
    year3: 'YEAR 3',
    year3Target: '4,221 PDVs',
    year3Description: 'South and Midwest + own factory + licensing',
    
    year5: 'YEAR 5',
    year5Target: '10,525 PDVs',
    year5Description: 'Complete national coverage - 90K pharmacies in Brazil',
    
    // Competitive advantages
    specializedNiche: 'Specialized Niche',
    specializedNicheDesc: 'Focus on rare dermatological conditions underserved by major brands',
    
    growthPlan: 'Growth Plan',
    growthPlanDesc: 'National and international expansion with validated solid strategy',
    
    digitalBranding: 'Digital Branding',
    digitalBrandingDesc: 'Consolidated online presence with active community and validated product',
    
    strategicPartnerships: 'Strategic Partnerships',
    strategicPartnershipsDesc: 'Active interest from investors and major distributors',
    
    // Investor protections
    governance: 'Governance',
    governanceDesc: 'Board seat + veto rights for investments >$200k',
    
    informationRights: 'Information Rights',
    informationRightsDesc: 'Monthly reports + access to operational metrics',
    
    tagAlong: 'Tag Along',
    tagAlongDesc: 'Right to sell under same conditions as founders',
    
    vestingFounders: 'Founders Vesting',
    vestingFoundersDesc: '4-year schedule ensuring commitment',
    
    antiDilution: 'Anti-Dilution',
    antiDilutionDesc: 'Full-ratchet protection against down rounds',
    
    monitoring: 'Monitoring',
    monitoringDesc: 'Entry to investor group and access to quarterly performance dashboard',
    
    // Risk management
    factoryRisk: 'Factory Construction Delays',
    factoryRiskMitigation: 'Contracts with delay penalties • Partial production outsourcing as backup • 3-month safety margin in schedule',
    
    marketRisk: 'Market Adoption',
    marketRiskMitigation: 'Gradual channel expansion • Market tests in pilot regions • Partnerships with opinion leaders for product validation',
    
    ipRisk: 'Intellectual Property Protection',
    ipRiskMitigation: 'Patent filing in strategic markets • Trade secret protection • Continuous monitoring of potential violations',
    
    talentRisk: 'Key Talent Retention',
    talentRiskMitigation: 'Long-term incentive plan • Stock options program for strategic positions • Critical process documentation',
    
    regulatoryRisk: 'Regulatory',
    regulatoryRiskMitigation: 'Specialized regulatory consulting • Continuous monitoring of regulatory changes • Proactive relationship with ANVISA',
    
    fundingRisk: 'Additional Funding',
    fundingRiskMitigation: 'Conservative financial planning • Multi-investor relationships • Clear milestones to unlock next rounds',
    
    // Use of funds detailed
    fundsTitle: 'Detailed Use of Resources',
    fundsSubtitle: 'Complete transparency in capital application',
    fundsOverview: 'Strategic investment to accelerate growth and consolidate technological leadership',
    
    // Fund allocation cards
    factoryTitle: 'Factory & Technology',
    factoryItems: [
      'Nanotechnology equipment',
      'GMP systems',
      'International certifications'
    ],
    commercialExpansionTitle: 'Commercial Expansion',
    expansionItems: [
      'B2C: Direct to consumer via 5,000+ pharmacies',
      'B2B: Clinics and medical offices',
      'B2G: SUS tenders and public hospitals'
    ],
    productsTitle: 'New Products',
    productsItems: [
      'Register 34 developed SKUs with ANVISA',
      'Packaging and marketing development',
      'Stability studies and validation'
    ],
    
    // Summary labels
    operationMonths: 'Months to Operation',
    roiProjected: 'Average Projected ROI',
    countriesFirstYear: 'Countries in First Year',
    directJobs: 'Direct Jobs',
    
    // ROI Calculator
    roiCalculatorTitle: 'ROI Calculator',
    roiCalculatorSubtitle: 'Project your return on investment based on fixed assumptions',
    roiCalculatorInputs: 'Investment Parameters',
    roiCalculatorResults: 'Return Projection',
    investmentValue: 'Investment Amount',
    investmentPeriod: 'Investment Period',
    growthScenario: 'Growth Scenario',
    realistic: 'Base Scenario',
    optimistic: 'Ascending Scenario',
    scenarioAssumptions: 'Selected Scenario Assumptions:',
    
    // Realistic scenario (now Base scenario)
    realisticAssumptions: [
      'Total ROI: 99.31% (5 years)',
      'Exit multiple: 1.9931x',
      'Annualized return: 14.79% p.a.',
      'Post-Money Valuation: $29.1M'
    ],
    
    // Optimistic scenario (now Ascending scenario)
    optimisticAssumptions: [
      'Total ROI: 199% (5 years)',
      'Exit multiple: 2.99x',
      'Annualized return: 24.48% p.a.',
      'Post-Money Valuation: $29.1M'
    ],
    
    // ROI Results
    finalValueEstimated: 'Estimated Final Value',
    totalReturn: 'Total Return',
    totalROI: 'Total ROI',
    annualizedReturn: 'Annualized Return',
    capitalMultiple: 'Capital Multiple',
    comparisonOtherInvestments: 'Comparison with Other Investments',
    investmentEvolution: 'Investment Evolution',
    importantWarning: '⚠️ Important Warning',
    riskDisclaimer: 'The projections presented are estimates based on market assumptions and expected performance. Startup investments involve significant risks and returns are not guaranteed. Past performance is not indicative of future results.',
    
    // Time periods
    years: 'years',
    year: 'Year',
    minimumInvestment: 'Minimum investment: $100k',
    equityParticipation: 'Equity Participation',
    
    // Form sections
    personalInfoSection: 'Personal Information',
    addressSection: 'Address',
    professionalInfoSection: 'Professional Information',
    financialInfoSection: 'Financial Information',
    investmentIntentionSection: 'Investment Intention',
    investorQualificationSection: 'Investor Qualification (CVM)',
    additionalInfoSection: 'Additional Information',
    termsSection: 'Terms and Conditions',
    
    // Form field labels
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    cpf: 'CPF',
    rg: 'RG',
    birthDate: 'Birth Date',
    nationality: 'Nationality',
    address: 'Complete Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    occupation: 'Occupation',
    company: 'Company',
    position: 'Position',
    workExperience: 'Years of Experience',
    monthlyIncome: 'Monthly Income',
    totalAssets: 'Total Assets',
    investmentExperience: 'Investment Experience',
    riskProfile: 'Risk Profile',
    intendedInvestment: 'Intended Investment Amount',
    investmentHorizon: 'Investment Horizon',
    motivations: 'Investment Motivations',
    accreditedStatus: 'Qualified Investor Status',
    accreditationProof: 'Qualification Proof',
    professionalCertification: 'Professional Certifications',
    howDidYouHear: 'How did you hear about Pele Rara?',
    additionalComments: 'Additional Comments',
    
    // Form placeholders
    phonePlaceholder: '(11) 99999-9999',
    cpfPlaceholder: '000.000.000-00',
    rgPlaceholder: '00.000.000-0',
    addressPlaceholder: 'Street, number, complement',
    occupationPlaceholder: 'Your profession',
    zipCodePlaceholder: '00000-000',
    motivationsPlaceholder: 'Describe your motivations and expectations for this investment',
    certificationPlaceholder: 'Ex: CPA-20, CFA, CNPI (if applicable)',
    commentsPlaceholder: 'Additional information, questions or comments',
    
    // Form options
    selectOption: 'Select...',
    selectState: 'Select state',
    selectIncomeRange: 'Select your income range',
    selectAssetsRange: 'Select your assets range',
    selectInvestmentValue: 'Select amount',
    selectQualificationProof: 'How can you prove it?',
    
    // Experience levels options
    workExperienceOptions: [
      '0-2 years',
      '3-5 years', 
      '6-10 years',
      '11-15 years',
      '16-20 years',
      'More than 20 years'
    ],
    
    // Income options
    incomeOptions: [
      'Up to $1,000',
      '$1,001 - $2,000',
      '$2,001 - $4,000',
      '$4,001 - $10,000',
      '$10,001 - $20,000',
      'Above $20,000'
    ],
    
    // Assets options
    assetsOptions: [
      'Up to $20,000',
      '$20,001 - $60,000',
      '$60,001 - $200,000',
      '$200,001 - $1,000,000',
      '$1,000,001 - $2,000,000',
      'Above $2,000,000'
    ],
    
    // Investment experience options
    investmentExperienceOptions: [
      'Beginner (savings, CDs)',
      'Intermediate (funds, stocks)',
      'Advanced (derivatives, FIPs)',
      'Professional (asset management)'
    ],
    
    // Risk profile options
    riskProfileOptions: [
      'Conservative',
      'Moderate',
      'Aggressive',
      'Super Aggressive'
    ],
    
    // Investment value options  
    investmentValueOptions: [
      '$10,000 - $20,000',
      '$20,001 - $50,000',
      '$50,001 - $100,000',
      '$100,001 - $200,000',
      '$200,001 - $400,000',
      'Above $400,000'
    ],
    
    // Investment horizon options
    investmentHorizonOptions: [
      '5-10 years',
      'More than 10 years'
    ],
    
    // Accredited status options
    accreditedStatusOptions: [
      'I have financial assets of at least $200,000',
      'I have professional certification (CPA-20, CFA, CNPI, etc.)',
      'I am a financial market professional',
      'I need to verify my qualification'
    ],
    
    // Accreditation proof options
    accreditationProofOptions: [
      'Brokerage statement',
      'Tax return',
      'Professional certificate',
      'Employer letter',
      'Other documents'
    ],
    
    // How did you hear options
    howDidYouHearOptions: [
      'LinkedIn',
      'Google',
      'Referral',
      'Media (newspaper, magazine)',
      'Event',
      'Company website',
      'Others'
    ],
    
    // Terms and conditions
    agreeTerms: 'I agree to the Terms of Use and declare that I am aware of the risks associated with investments in private companies',
    agreePrivacy: 'I agree to the Privacy Policy and authorize the processing of my data in accordance with LGPD',
    confirmAccuracy: 'I declare that all information provided is true and accurate',
    authorizeContact: 'I authorize Pele Rara to contact me to present investment opportunities',
    
    // Form buttons
    submitNewInterest: 'Submit New Interest',
    
    // Success messages
    interestRegistered: 'Interest Successfully Registered!',
    emailOpenedAutomatically: 'Your email client was automatically opened with all information pre-filled.',
    recipientEmail: 'Recipient:',
    whatsappContact: 'WhatsApp:',
    emailNotOpened: 'If the email didn\'t open automatically, click the button below:',
    openEmailButton: 'Open Email to Cynthia',
    
    // Form placeholders and options
    formPlaceholderInterests: 'Tell us about your specific interests, preferred sectors, etc.',
    submitting: 'Submitting...',
    
    // Risk levels
    riskHigh: 'HIGH',
    riskMedium: 'MEDIUM',
    riskLow: 'LOW',
    
    // States
    stateSP: 'São Paulo',
    faqQuestions: [
      {
        question: 'What is Pele Rara\'s competitive advantage?',
        answer: 'We have two patented technologies (BIOCIC and BIOBLOC) with international scientific validation, partnerships with leading hospitals, and a $3.7 trillion global market. Our proprietary nanotechnology delivers 2x faster results than conventional products.'
      },
      {
        question: 'How does the convertible note work?',
        answer: 'Investment will be made via convertible note with 24-month term, $40M valuation cap and 30% discount. In the next round (Series A), the amount automatically converts to equity with advantageous conditions for the investor.'
      },
      {
        question: 'What are the guarantees for investors?',
        answer: 'We offer solid guarantees: patents filed with INPI (value between $19-37M), products already registered with ANVISA, proven recurring revenue, hospital contracts, and a detailed business plan with clear growth targets.'
      },
      {
        question: 'What is the exit strategy for investors?',
        answer: 'We plan Series A in 24 months, with possibility of IPO in 5-7 years or strategic acquisition by pharmaceutical multinationals. The dermocosmetics market has historical multiples of 15-25x EBITDA in similar transactions.'
      },
      {
        question: 'How will the raised capital be used?',
        answer: '$800k for nanoparticle factory construction, $800k for commercial expansion (B2C/B2B/B2G), and $400k for launching the 34 SKUs already developed. With minimum ticket of $100k, each dollar invested has projected ROI above 10x in 5 years.'
      },
      {
        question: 'What is the regulatory status of the products?',
        answer: 'We already have 11 products registered with ANVISA and 34 more formulations developed ready for registration. Our patents are filed with INPI and we have clinical studies approved by ethics committees of university hospitals.'
      }
    ]
  },
  
  'es': {
    // Hero section
    heroTitle: 'Tecnologías <strong>Patentadas</strong><br />Revolucionando el Cuidado<br />de la Piel Sensible',
    heroSubtitle: 'Nanotecnología brasileña con validación científica internacional',
    investmentBadge: 'Ronda de Inversión Abierta',
    ctaButton: 'Conocer Oportunidad',
    
    // Numbers section
    numbersTitle: 'Números que Definen el Futuro',
    numbersSubtitle: 'Una trayectoria consistente de crecimiento e innovación',
    marketBrazilian: 'Mercado Latinoamericano',
    marketValuation: 'Valuación',
    patents: 'Patentes INPI',
    growth: 'Crecimiento 3 Años',
    globalMarket: 'Mercado Global Fitoterapéuticos: $13.75 billones (CAGR 25% | 2023-2033)',
    
    // Problem section
    problemTitle: 'El Problema',
    problemSubtitle: 'Un mercado gigantesco completamente desatendido',
    problemDescription: 'Millones de brasileños con necesidades especiales de cuidados dermatológicos',
    problemList: [
      'Los productos convencionales no satisfacen necesidades específicas',
      'Tratamientos especializados con alto costo y baja accesibilidad',
      'Mercado desatendido con pocas soluciones tecnológicas',
      'Falta de conocimiento sobre preparación adecuada de la piel'
    ],
    
    // Solution section
    solutionTitle: 'Nuestra Solución',
    solutionSubtitle: 'Ecosistema que alinea tecnología farmacéutica,<br />tecnología digital y apoyo emocional',
    solutionPatents: 'Dos patentes valoradas en $37M',
    biocicName: 'BIOCIC',
    biocicTitle: 'Nanotecnología Regenerativa',
    biocicDescription: 'Biomimética que garantiza absorción a nivel celular y regeneración 2x más rápida',
    bioblocName: 'BIOBLOC',
    bioblocTitle: 'Limpieza Sensible',
    bioblocDescription: 'Tecnología de limpieza con pH syndet que preserva la barrera cutánea',
    iaName: 'IA NARA',
    iaTitle: 'Inteligencia Artificial',
    iaDescription: 'Seguimiento personalizado de la evolución de la piel del paciente',
    
    // Validation section
    validationTitle: 'Validación Científica y de Mercado',
    validationSubtitle: 'Comprobación en instituciones de referencia internacional',
    hospitalsPartners: 'Hospitales Socios',
    hospitalsDescription: 'Hospital do Amor, HC-UFMG/USP, Hospital da Baleia',
    publications: 'Publicaciones Internacionales',
    publicationsDescription: 'Artículos científicos en revistas de alto impacto',
    patients: 'Pacientes Atendidos',
    patientsDescription: 'Validación clínica con resultados comprobados',
    products: 'Productos en el Mercado',
    productsDescription: 'Portafolio completo registrado en ANVISA',
    
    // Investment section
    investmentTitle: 'Oportunidad de Inversión',
    investmentSubtitle: 'Participa en la revolución del cuidado dermatológico brasileño',
    modality: 'Modalidad',
    modalityValue: 'Pagaré Convertible',
    captureGoal: 'Meta de Captación',
    valuationCap: 'Valuación Cap',
    valuationPreMoney: 'Valuación Pre-Money',
    valuationPreMoneyValue: '$58M<br/>(+30% descuento)',
    participation: 'Participación',
    participationValue: '5% estimado',
    minimumTicket: 'Ticket Mínimo',
    investmentFormat: 'Formato',
    investmentFormatValue: '20 tickets de $100k',
    term: 'Período de Ronda',
    termValue: '01/08 hasta 15/08',
    
    // Timeline section
    timelineTitle: 'Cronograma de Ejecución',
    timelineSubtitle: 'Estrategia clara para los próximos 24 meses',
    timeline1Title: 'Mes 1-2: Preparación para Captación',
    timeline1Description: 'Finalización de documentación, ajuste de expectativas de valoración, y preparación del pitch deck y data room.',
    timeline2Title: 'Mes 3-4: Roadshow y Negociación',
    timeline2Description: 'Presentaciones a inversores, negociación de términos, y due diligence.',
    timeline3Title: 'Mes 5-6: Cierre y Planificación',
    timeline3Description: 'Firma de documentos, recepción de recursos y detallado del plan de ejecución.',
    timeline4Title: 'Mes 7-12: Construcción de Fábrica',
    timeline4Description: 'Inicio de construcción de fábrica, adquisición de equipos, y contratación de equipo técnico.',
    timeline5Title: 'Mes 13-18: Expansión Comercial',
    timeline5Description: 'Lanzamiento de nuevos productos, expansión de canales de distribución, e inicio de operación de fábrica.',
    timeline6Title: 'Mes 18-24: Preparación para Serie A',
    timeline6Description: 'Consolidación de métricas de crecimiento, expansión internacional, y preparación para próxima ronda de captación.',
    
    // CTA section
    ctaTitle: 'Sé Parte de Esta Historia',
    ctaDescription: 'Invierte en tecnología patentada con +10 años de investigación<br />Ronda limitada: 01/08 hasta 15/08 • Ticket mínimo: $100k',
    ctaPrimary: 'Quiero Invertir',
    downloadPresentation: 'Descargar Presentaciones y Material Gráfico',
    
    // Footer
    footerText: 'Nuestra piel es nuestra historia',
    footerMotto: 'Celebramos cada marca',
    footerAdditional: 'AL FINAL, SOLO TIENEN CICATRICES QUIENES SOBREVIVIERON',
    
    // Email subjects
    investmentEmailSubject: 'Interés en Invertir - Pele Rara',
    presentationEmailSubject: '[INVERSOR] Registro - Pele Rara',
    investmentEmailBody: 'Me gustaría programar una reunión para conocer la oportunidad de inversión.%0A%0ANombre:%0ATeléfono:%0AEmpresa:%0ATicket de Interés:',
    presentationEmailBody: 'Solicitud de presentación completa de la oportunidad de inversión.',
    whatsappMessage: '¡Hola! Tengo interés en la oportunidad de inversión de Pele Rara. Me gustaría programar una reunión para conocer más detalles.',
    
    // Form fields
    formName: 'Nombre Completo',
    formEmail: 'Email',
    formPhone: 'Teléfono',
    formCompany: 'Empresa',
    formPosition: 'Cargo/Función',
    formInvestorType: 'Tipo de Inversor',
    formInvestmentTicket: 'Ticket de Inversión',
    formExperience: 'Experiencia en Inversiones',
    formInterests: 'Intereses Específicos',
    formSubmit: 'Quiero Invertir',
    formSuccess: '✅ ¡Gracias por su interés! Recibimos su información y nuestro equipo se pondrá en contacto en 24 horas para agendar una reunión personalizada.',
    
    // Form options
    investorTypes: [
      'Persona Física',
      'Family Office',
      'Fondo de Inversión',
      'Corporate Venture',
      'Inversor Ángel',
      'Otro'
    ],
    ticketRanges: [
      '$100k - $200k',
      '$200k - $400k',
      '$400k - $1M',
      '$1M+',
      'A definir'
    ],
    experienceLevels: [
      'Primera inversión',
      '1-5 inversiones',
      '5-20 inversiones',
      '20+ inversiones',
      'Inversor profesional'
    ],
    
    // Founder section
    founderTitle: 'Liderazgo Científico',
    founderSubtitle: 'PhD con experiencia comprobada en nanotecnología',
    founderName: 'Dra. Cynthia Nara Oliveira',
    founderRole: 'Fundadora y CEO',
    founderDescription: 'Doctora en Ciencias Farmacéuticas especializada en nanotecnología. Líder en investigación y desarrollo de sistemas de encapsulación para dermocosméticos, con publicaciones internacionales y alianzas con las principales universidades de Brasil.',
    
    // Testimonials section
    testimonialsTitle: 'Testimonios Médicos',
    testimonialsSubtitle: 'Validación científica reconocida por especialistas de renombre',
    testimonials: [
      {
        name: 'Dr. Marco Andrey',
        position: 'JEFE DEL DEPARTAMENTO DE DERMATOLOGÍA',
        institution: 'Facultad de Medicina - USP',
        testimonial: 'Las tecnologías BIOCIC y BIOBLOC representan un avance significativo en el tratamiento de piel sensible. Los resultados clínicos demuestran eficacia superior a productos convencionales, con regeneración celular comprobadamente más rápida.',
        photo: null
      },
      {
        name: 'Dra. Raquel Vilela',
        position: 'PROFESORA ADJUNTA',
        institution: 'Hospital das Clínicas - UFMG\nFacultad de Farmacia - UFMG\nMichigan State University - MSU\nInstituto Superior de Medicina - ISMD',
        testimonial: 'En nuestros estudios clínicos, observamos que los productos Pele Rara presentan resultados excepcionales en pacientes con dermatitis atópica y piel sensible. La nanotecnología desarrollada es verdaderamente innovadora.',
        photo: null
      },
      {
        name: 'Prof. Claudia Lincoln',
        position: 'Investigadora Senior',
        institution: 'Instituto de Ciencias Biomédicas - USP\nHospital das Clínicas - HC-USP',
        testimonial: 'La investigación desarrollada por la Dra. Cynthia Nara representa un hito en la nanotecnología farmacéutica brasileña. Los sistemas de encapsulación BIOCIC y BIOBLOC son únicos con aplicaciones de gran impacto clínico.',
        photo: null
      }
    ],
    
    // FAQ section
    faqTitle: 'Preguntas Frecuentes de Inversores',
    faqSubtitle: 'Aclaramos las principales dudas sobre la oportunidad',
    faqContact: '¿Tienes otras preguntas?',
    faqContactLink: 'Contáctanos',
    
    // Achievements section
    achievementsTitle: 'Lo que Hemos Logrado Hasta Ahora',
    achievementsSubtitle: 'Una trayectoria sólida de logros e hitos importantes',
    
    // Achievement items
    achievementResearch: 'Años de Investigación',
    achievementResearchDesc: '+10 años I+D, +20 publicaciones mediáticas (UOL, CNN, Veja Saúde)',
    achievementPatents: 'Propiedad Intelectual',
    achievementPatentsDesc: '3 solicitudes de patente + 3 marcas registradas - Valor: $19-37M',
    achievementProducts: 'Portafolio Comercial',
    achievementProductsDesc: '36 formulaciones desarrolladas + 13 ya registradas en ANVISA',
    achievementStudies: 'Validación Científica',
    achievementStudiesDesc: '2 artículos nacionales + 1 internacional + 5 estudios clínicos en curso',
    achievementImpact: 'Impacto en el Mercado',
    achievementImpactDesc: '+40K pacientes utilizaron las tecnologías - Inversión $1M en estudios',
    achievementProjection: 'Proyección Financiera',
    achievementProjectionDesc: '2025: 3X facturación → 2030: 30X acumulado',
    
    // New sections for expansion and protection
    expansionTitle: 'Plan de Expansión Nacional',
    expansionSubtitle: 'Crecimiento estratégico en 5 años - Puntos de Venta',
    
    competitiveTitle: 'Ventajas Competitivas',
    competitiveSubtitle: 'Por qué invertir en Pele Rara',
    
    protectionTitle: 'Protección al Inversor',
    protectionSubtitle: 'Gobernanza sólida y derechos garantizados',
    
    riskTitle: 'Gestión de Riesgos',
    riskSubtitle: 'Estrategias de mitigación para principales riesgos identificados',
    
    // Expansion items
    year1: 'AÑO 1',
    year1Target: '535 PDVs',
    year1Description: 'Principales capitales en redes ya atendidas',
    
    year2: 'AÑO 2',
    year2Target: '1.594 PDVs',
    year2Description: 'SP, RJ, MG, DF + inicio exportaciones América Latina',
    
    year3: 'AÑO 3',
    year3Target: '4.221 PDVs',
    year3Description: 'Sur y Centro-Oeste + fábrica propia + licenciamiento',
    
    year5: 'AÑO 5',
    year5Target: '10.525 PDVs',
    year5Description: 'Cobertura nacional completa - 90K farmacias en Brasil',
    
    // Competitive advantages
    specializedNiche: 'Nicho Especializado',
    specializedNicheDesc: 'Enfoque en condiciones dermatológicas raras desatendidas por grandes marcas',
    
    growthPlan: 'Plan de Crecimiento',
    growthPlanDesc: 'Expansión nacional e internacional con estrategia sólida validada',
    
    digitalBranding: 'Branding Digital',
    digitalBrandingDesc: 'Presencia online consolidada con comunidad activa y producto validado',
    
    strategicPartnerships: 'Alianzas Estratégicas',
    strategicPartnershipsDesc: 'Interés activo de inversores y grandes distribuidores',
    
    // Investor protections
    governance: 'Gobernanza',
    governanceDesc: 'Asiento en Consejo + derechos de veto para inversiones >$200k',
    
    informationRights: 'Derechos de Información',
    informationRightsDesc: 'Reportes mensuales + acceso a métricas operacionales',
    
    tagAlong: 'Tag Along',
    tagAlongDesc: 'Derecho a vender en mismas condiciones que fundadores',
    
    vestingFounders: 'Vesting Fundadores',
    vestingFoundersDesc: 'Cronograma 4 años garantizando compromiso',
    
    antiDilution: 'Anti-Dilución',
    antiDilutionDesc: 'Protección full-ratchet contra down rounds',
    
    monitoring: 'Seguimiento',
    monitoringDesc: 'Entrada al grupo de inversores y acceso al panel trimestral de performance',
    
    // Risk management
    factoryRisk: 'Retrasos en Construcción de Fábrica',
    factoryRiskMitigation: 'Contratos con penalizaciones por retraso • Tercerización parcial de producción como respaldo • Cronograma con margen de seguridad de 3 meses',
    
    marketRisk: 'Adopción del Mercado',
    marketRiskMitigation: 'Expansión gradual de canales • Pruebas de mercado en regiones piloto • Alianzas con formadores de opinión para validación de productos',
    
    ipRisk: 'Protección de Propiedad Intelectual',
    ipRiskMitigation: 'Depósito de patentes en mercados estratégicos • Protección de secretos industriales • Monitoreo continuo de violaciones potenciales',
    
    talentRisk: 'Retención de Talentos Clave',
    talentRiskMitigation: 'Plan de incentivos a largo plazo • Programa de stock options para posiciones estratégicas • Documentación de procesos críticos',
    
    regulatoryRisk: 'Regulatorio',
    regulatoryRiskMitigation: 'Consultoría especializada en regulación • Monitoreo continuo de cambios regulatorios • Relación proactiva con ANVISA',
    
    fundingRisk: 'Captación de Recursos Adicionales',
    fundingRiskMitigation: 'Planificación financiera conservadora • Relación con múltiples inversores • Hitos claros para desbloquear próximas rondas',
    
    // Use of funds detailed
    fundsTitle: 'Uso Detallado de los Recursos',
    fundsSubtitle: 'Transparencia total en la aplicación del capital',
    fundsOverview: 'Inversión estratégica para acelerar crecimiento y consolidar liderazgo tecnológico',
    
    // Fund allocation cards
    factoryTitle: 'Fábrica y Tecnología',
    factoryItems: [
      'Equipos de nanotecnología',
      'Sistemas GMP',
      'Certificaciones internacionales'
    ],
    commercialExpansionTitle: 'Expansión Comercial',
    expansionItems: [
      'B2C: Consumidor final via 5.000+ farmacias',
      'B2B: Clínicas y consultorios médicos',
      'B2G: Licitaciones SUS y hospitales públicos'
    ],
    productsTitle: 'Nuevos Productos',
    productsItems: [
      'Registro de 34 SKUs desarrollados en ANVISA',
      'Desarrollo de envases y marketing',
      'Estudios de estabilidad y validación'
    ],
    
    // Summary labels
    operationMonths: 'Meses para Operación',
    roiProjected: 'ROI Medio Proyectado',
    countriesFirstYear: 'Países en Primer Año',
    directJobs: 'Empleos Directos',
    
    // ROI Calculator
    roiCalculatorTitle: 'Calculadora de ROI',
    roiCalculatorSubtitle: 'Proyecta tu retorno sobre la inversión basado en premisas fijas',
    roiCalculatorInputs: 'Parámetros de Inversión',
    roiCalculatorResults: 'Proyección de Retorno',
    investmentValue: 'Monto de Inversión',
    investmentPeriod: 'Período de Inversión',
    growthScenario: 'Escenario de Crecimiento',
    realistic: 'Escenario Base',
    optimistic: 'Escenario Ascendente',
    scenarioAssumptions: 'Premisas del Escenario Seleccionado:',
    
    // Realistic scenario (now Base scenario)
    realisticAssumptions: [
      'ROI Total: 99,31% (5 años)',
      'Múltiplo de salida: 1,9931x',
      'Retorno anualizado: 14,79% a.a.',
      'Valuación Post-Money: $29,1M'
    ],
    
    // Optimistic scenario (now Ascending scenario)
    optimisticAssumptions: [
      'ROI Total: 199% (5 años)',
      'Múltiplo de salida: 2,99x',
      'Retorno anualizado: 24,48% a.a.',
      'Valuación Post-Money: $29,1M'
    ],
    
    // ROI Results
    finalValueEstimated: 'Valor Final Estimado',
    totalReturn: 'Retorno Total',
    totalROI: 'ROI Total',
    annualizedReturn: 'Retorno Anualizado',
    capitalMultiple: 'Múltiplo del Capital',
    comparisonOtherInvestments: 'Comparación con Otras Inversiones',
    investmentEvolution: 'Evolución de la Inversión',
    importantWarning: '⚠️ Aviso Importante',
    riskDisclaimer: 'Las proyecciones presentadas son estimaciones basadas en premisas de mercado y desempeño esperado. Las inversiones en startups involucran riesgos significativos y los retornos no están garantizados. El rendimiento pasado no es indicativo de resultados futuros.',
    
    // Time periods
    years: 'años',
    year: 'Año',
    minimumInvestment: 'Inversión mínima: $100k',
    equityParticipation: 'Participación Societaria',
    
    // Form sections
    personalInfoSection: 'Información Personal',
    addressSection: 'Dirección',
    professionalInfoSection: 'Información Profesional',
    financialInfoSection: 'Información Financiera',
    investmentIntentionSection: 'Intención de Inversión',
    investorQualificationSection: 'Calificación como Inversor (CVM)',
    additionalInfoSection: 'Información Adicional',
    termsSection: 'Términos y Condiciones',
    
    // Form field labels
    fullName: 'Nombre Completo',
    email: 'Email',
    phone: 'Teléfono',
    cpf: 'CPF',
    rg: 'RG',
    birthDate: 'Fecha de Nacimiento',
    nationality: 'Nacionalidad',
    address: 'Dirección Completa',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    occupation: 'Ocupación',
    company: 'Empresa',
    position: 'Cargo',
    workExperience: 'Años de Experiencia',
    monthlyIncome: 'Ingresos Mensuales',
    totalAssets: 'Patrimonio Total',
    investmentExperience: 'Experiencia en Inversiones',
    riskProfile: 'Perfil de Riesgo',
    intendedInvestment: 'Monto de Inversión Previsto',
    investmentHorizon: 'Horizonte de Inversión',
    motivations: 'Motivaciones para Invertir',
    accreditedStatus: 'Estado de Inversor Calificado',
    accreditationProof: 'Comprobación de Calificación',
    professionalCertification: 'Certificaciones Profesionales',
    howDidYouHear: '¿Cómo supiste de Pele Rara?',
    additionalComments: 'Comentarios Adicionales',
    
    // Form placeholders
    phonePlaceholder: '(11) 99999-9999',
    cpfPlaceholder: '000.000.000-00',
    rgPlaceholder: '00.000.000-0',
    addressPlaceholder: 'Calle, número, complemento',
    occupationPlaceholder: 'Tu profesión',
    zipCodePlaceholder: '00000-000',
    motivationsPlaceholder: 'Describe tus motivaciones y expectativas para esta inversión',
    certificationPlaceholder: 'Ej: CPA-20, CFA, CNPI (si aplica)',
    commentsPlaceholder: 'Información adicional, preguntas o comentarios',
    
    // Form options
    selectOption: 'Seleccionar...',
    selectState: 'Seleccionar estado',
    selectIncomeRange: 'Selecciona tu rango de ingresos',
    selectAssetsRange: 'Selecciona tu rango de patrimonio',
    selectInvestmentValue: 'Seleccionar monto',
    selectQualificationProof: '¿Cómo puedes comprobarlo?',
    
    // Experience levels options
    workExperienceOptions: [
      '0-2 años',
      '3-5 años', 
      '6-10 años',
      '11-15 años',
      '16-20 años',
      'Más de 20 años'
    ],
    
    // Income options
    incomeOptions: [
      'Hasta $1,000',
      '$1,001 - $2,000',
      '$2,001 - $4,000',
      '$4,001 - $10,000',
      '$10,001 - $20,000',
      'Más de $20,000'
    ],
    
    // Assets options
    assetsOptions: [
      'Hasta $20,000',
      '$20,001 - $60,000',
      '$60,001 - $200,000',
      '$200,001 - $1,000,000',
      '$1,000,001 - $2,000,000',
      'Más de $2,000,000'
    ],
    
    // Investment experience options
    investmentExperienceOptions: [
      'Principiante (ahorros, CDT)',
      'Intermedio (fondos, acciones)',
      'Avanzado (derivados, FIPs)',
      'Profesional (gestión de recursos)'
    ],
    
    // Risk profile options
    riskProfileOptions: [
      'Conservador',
      'Moderado',
      'Agresivo',
      'Súper Agresivo'
    ],
    
    // Investment value options  
    investmentValueOptions: [
      '$10,000 - $20,000',
      '$20,001 - $50,000',
      '$50,001 - $100,000',
      '$100,001 - $200,000',
      '$200,001 - $400,000',
      'Más de $400,000'
    ],
    
    // Investment horizon options
    investmentHorizonOptions: [
      '5-10 años',
      'Más de 10 años'
    ],
    
    // Accredited status options
    accreditedStatusOptions: [
      'Poseo patrimonio financiero de al menos $200,000',
      'Poseo certificación profesional (CPA-20, CFA, CNPI, etc.)',
      'Soy profesional del mercado financiero',
      'Necesito verificar mi calificación'
    ],
    
    // Accreditation proof options
    accreditationProofOptions: [
      'Estado de cuenta de corretaje',
      'Declaración de impuestos',
      'Certificado profesional',
      'Carta del empleador',
      'Otros documentos'
    ],
    
    // How did you hear options
    howDidYouHearOptions: [
      'LinkedIn',
      'Google',
      'Referencia',
      'Medios (periódico, revista)',
      'Evento',
      'Sitio web de la empresa',
      'Otros'
    ],
    
    // Terms and conditions
    agreeTerms: 'Acepto los Términos de Uso y declaro estar consciente de los riesgos asociados con inversiones en empresas de capital cerrado',
    agreePrivacy: 'Acepto la Política de Privacidad y autorizo el tratamiento de mis datos conforme a LGPD',
    confirmAccuracy: 'Declaro que toda la información proporcionada es verdadera y precisa',
    authorizeContact: 'Autorizo a Pele Rara a contactarme para presentar oportunidades de inversión',
    
    // Form buttons
    submitNewInterest: 'Enviar Nuevo Interés',
    
    // Success messages
    interestRegistered: '¡Interés Registrado con Éxito!',
    emailOpenedAutomatically: 'Su cliente de email se abrió automáticamente con toda la información completada.',
    recipientEmail: 'Destinatario:',
    whatsappContact: 'WhatsApp:',
    emailNotOpened: 'Si el email no se abrió automáticamente, haga clic en el botón de abajo:',
    openEmailButton: 'Abrir Email para Cynthia',
    
    // Form placeholders and options
    formPlaceholderInterests: 'Cuéntanos sobre tus intereses específicos, sectores de preferencia, etc.',
    submitting: 'Enviando...',
    
    // Risk levels
    riskHigh: 'ALTO',
    riskMedium: 'MEDIO',
    riskLow: 'BAJO',
    
    // States
    stateSP: 'São Paulo',
    faqQuestions: [
      {
        question: '¿Cuál es la ventaja competitiva de Pele Rara?',
        answer: 'Tenemos dos tecnologías patentadas (BIOCIC y BIOBLOC) con validación científica internacional, alianzas con hospitales de referencia y un mercado de $3.7 billones globalmente. Nuestra nanotecnología propietaria ofrece resultados 2x más rápidos que productos convencionales.'
      },
      {
        question: '¿Cómo funciona el pagaré convertible?',
        answer: 'La inversión se realizará vía pagaré convertible con plazo de 24 meses, valuación cap de $40M y descuento del 30%. En la próxima ronda (Serie A), el monto se convierte automáticamente en participación accionaria con condiciones ventajosas para el inversor.'
      },
      {
        question: '¿Cuáles son las garantías para el inversor?',
        answer: 'Ofrecemos garantías sólidas: patentes depositadas en INPI (valor entre $19-37M), productos ya registrados en ANVISA, ingresos recurrentes comprobados, contratos con hospitales y un plan de negocios detallado con metas claras de crecimiento.'
      },
      {
        question: '¿Cuál es la estrategia de salida para inversores?',
        answer: 'Planeamos Serie A en 24 meses, con posibilidad de IPO en 5-7 años o adquisición estratégica por multinacionales farmacéuticas. El mercado de dermocosméticos tiene múltiplos históricos de 15-25x EBITDA en transacciones similares.'
      },
      {
        question: '¿Cómo se utilizará el capital recaudado?',
        answer: '$800k para construcción de fábrica de nanopartículas, $800k para expansión comercial (B2C/B2B/B2G) y $400k para lanzamiento de los 34 SKUs ya desarrollados. Con ticket mínimo de $100k, cada dólar invertido tiene ROI proyectado superior a 10x en 5 años.'
      },
      {
        question: '¿Cuál es el estatus regulatorio de los productos?',
        answer: 'Ya tenemos 11 productos registrados en ANVISA y 34 formulaciones más desarrolladas listas para registro. Nuestras patentes están depositadas en INPI y tenemos estudios clínicos aprobados en comités de ética de hospitales universitarios.'
      }
    ]
  }
};

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'pt-BR';
  });
  
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = translations[language as keyof typeof translations] || translations['pt-BR'];

  useEffect(() => {
    // Debug image paths
    console.log('Using direct public image paths for production compatibility');
    
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Number animation
    const animateValue = (element: HTMLElement, start: number, end: number, duration: number, suffix = '') => {
      const startTimestamp = Date.now();
      const step = () => {
        const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = end + suffix;
        }
      };
      window.requestAnimationFrame(step);
    };

    // Animate numbers on scroll
    const numberObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const text = element.textContent || '';
          
          // Skip currency values as they're already formatted
          if (text.includes('$') || text.includes('R$')) {
            numberObserver.unobserve(element);
            return;
          }
          
          if (text === '2') {
            animateValue(element, 0, 2, 1000);
          } else if (text === '176K') {
            animateValue(element, 0, 176, 1500, 'K');
          } else if (text === '40K+') {
            animateValue(element, 0, 40, 1500, 'K+');
          } else if (text === '11') {
            animateValue(element, 0, 11, 1000);
          } else if (text === '6+') {
            animateValue(element, 0, 6, 1000, '+');
          } else if (text === '3') {
            animateValue(element, 0, 3, 1000);
          } else if (text === '34') {
            animateValue(element, 0, 34, 1000);
          } else if (text === 'PhD') {
            // Skip PhD as it's text
          } else if (text.includes('M') && !text.includes('$')) {
            // Animate market size numbers
            const number = parseInt(text.replace(/\D/g, ''));
            if (number > 0) {
              animateValue(element, 0, number, 1500, 'M');
            }
          }
          
          numberObserver.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.number-value, .validation-number, .achievement-number').forEach(el => {
      const element = el as HTMLElement;
      const text = element.textContent || '';
      
      // Skip currency values as they're already formatted
      if (text.includes('$') || text.includes('R$')) {
        return;
      }
      
      numberObserver.observe(element);
    });

    return () => {
      observer.disconnect();
      numberObserver.disconnect();
    };
  }, []);

  const handleInvestClick = () => {
    window.location.href = `mailto:contato@pelerara.com.br?subject=${t.investmentEmailSubject}&body=${t.investmentEmailBody}`;
  };

  const [formData, setFormData] = useState({
    // Informações Pessoais
    full_name: '',
    email: '',
    phone: '',
    cpf: '',
    rg: '',
    birth_date: '',
    nationality: 'Brasileiro',
    
    // Endereço
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil',
    
    // Informações Profissionais
    occupation: '',
    company: '',
    position: '',
    work_experience: '',
    
    // Informações Financeiras
    monthly_income: '',
    total_assets: '',
    investment_experience: '',
    risk_profile: '',
    
    // Intenção de Investimento
    intended_investment: '',
    investment_horizon: '',
    motivations: '',
    
    // Qualificação Investidor (CVM)
    accredited_status: '',
    accreditation_proof: '',
    professional_certification: '',
    
    // Informações Adicionais
    how_did_you_hear: '',
    additional_comments: '',
    
    // Termos e Privacidade
    agree_terms: false,
    agree_privacy: false,
    confirm_accuracy: false,
    authorize_contact: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [emailFallbackUrl, setEmailFallbackUrl] = useState<string>('');
  
  // ROI Calculator State
  const [roiData, setRoiData] = useState({
    investmentAmount: 500000, // R$ 500k default (minimum ticket)
    scenario: 'realistic' // realistic, optimistic - periodo fixo de 5 anos
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('=== FORM SUBMIT INICIADO ===');
    console.log('Form data:', formData);
    
    // Verificar campos obrigatórios
    if (!formData.full_name?.trim()) {
      toast.error('Por favor, preencha o campo Nome');
      return;
    }
    
    if (!formData.email?.trim()) {
      toast.error('Por favor, preencha o campo Email');
      return;
    }
    
    if (!formData.phone?.trim()) {
      toast.error('Por favor, preencha o campo Telefone');
      return;
    }
    
    if (!formData.cpf?.trim()) {
      toast.error('Por favor, preencha o campo CPF');
      return;
    }
    
    if (!formData.intended_investment) {
      toast.error('Por favor, selecione o valor pretendido de investimento');
      return;
    }
    
    if (!formData.agree_terms || !formData.agree_privacy || !formData.confirm_accuracy || !formData.authorize_contact) {
      toast.error('Por favor, aceite todos os termos obrigatórios');
      return;
    }
    
    console.log('=== VALIDAÇÃO OK - PROCESSANDO COM EMAILJS ===');
    setIsSubmitting(true);
    
    try {
      // Mapear os dados do formulário para o formato esperado pelo serviço
      const investorData = {
        fullName: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        rg: formData.rg || '',
        birthDate: formData.birth_date || '',
        nationality: formData.nationality || 'Brasileira',
        
        address: formData.address || '',
        city: formData.city || '',
        state: formData.state || '',
        zipCode: formData.zipCode || '',
        country: formData.country || 'Brasil',
        
        occupation: formData.occupation || '',
        company: formData.company || '',
        position: formData.position || '',
        workExperience: formData.work_experience || '',
        
        monthlyIncome: formData.monthly_income || '',
        totalAssets: formData.total_assets || '',
        investmentExperience: formData.investment_experience || '',
        riskProfile: formData.risk_profile || '',
        
        intendedInvestment: formData.intended_investment,
        investmentHorizon: formData.investment_horizon || '',
        motivations: formData.motivations || '',
        
        accreditedStatus: formData.accredited_status || '',
        accreditationProof: formData.accreditation_proof || '',
        professionalCertification: formData.professional_certification || '',
        
        howDidYouHear: formData.how_did_you_hear || '',
        additionalComments: formData.additional_comments || ''
      };
      
      console.log('Enviando dados via EmailJS:', investorData);
      
      // Enviar via EmailJS usando as configurações do .env
      const result = await sendInvestorEmail(investorData);
      
      if (result.success) {
        console.log('✅ Email enviado com sucesso via EmailJS');
        toast.success('Formulário enviado com sucesso! Entraremos em contato em breve.');
        
        // Reset do formulário
        setFormData({
          // Informações Pessoais
          full_name: '',
          email: '',
          phone: '',
          cpf: '',
          rg: '',
          birth_date: '',
          nationality: '',
          
          // Endereço
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Brasil',
          
          // Informações Profissionais
          occupation: '',
          company: '',
          position: '',
          work_experience: '',
          
          // Informações Financeiras
          monthly_income: '',
          total_assets: '',
          investment_experience: '',
          risk_profile: '',
          
          // Intenção de Investimento
          intended_investment: '',
          investment_horizon: '',
          motivations: '',
          
          // Qualificação Investidor
          accredited_status: '',
          accreditation_proof: '',
          professional_certification: '',
          
          // Informações Adicionais
          how_did_you_hear: '',
          additional_comments: '',
          
          // Termos e Condições
          agree_terms: false,
          agree_privacy: false,
          confirm_accuracy: false,
          authorize_contact: false
        });
        
      } else {
        console.warn('⚠️ EmailJS falhou, tentando método alternativo');
        toast.warning('Enviando por método alternativo...');
        
        // Fallback: abrir cliente de email
        const agora = new Date();
        const dataHora = agora.toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        const assunto = `[NOVO INVESTIDOR] ${formData.full_name} - ${formData.intended_investment}`;
        
        const corpoEmail = `NOVO CADASTRO DE INVESTIDOR - PELE RARA
        
Data/Hora: ${dataHora} (Horário de Brasília)

=== INFORMAÇÕES PESSOAIS ===
Nome: ${formData.full_name}
Email: ${formData.email}
Telefone: ${formData.phone}
CPF: ${formData.cpf}
RG: ${formData.rg || 'Não informado'}
Data Nascimento: ${formData.birth_date ? new Date(formData.birth_date).toLocaleDateString('pt-BR') : 'Não informado'}
Nacionalidade: ${formData.nationality || 'Brasileira'}

=== ENDEREÇO ===
Endereço: ${formData.address || 'Não informado'}
Cidade: ${formData.city || 'Não informado'}
Estado: ${formData.state || 'Não informado'}
CEP: ${formData.zipCode || 'Não informado'}
País: ${formData.country || 'Brasil'}

=== INFORMAÇÕES PROFISSIONAIS ===
Ocupação: ${formData.occupation || 'Não informado'}
Empresa: ${formData.company || 'Não informado'}
Cargo: ${formData.position || 'Não informado'}
Experiência: ${formData.work_experience || 'Não informado'}

=== INFORMAÇÕES FINANCEIRAS ===
Renda Mensal: ${formData.monthly_income || 'Não informado'}
Patrimônio Total: ${formData.total_assets || 'Não informado'}
Experiência Investimentos: ${formData.investment_experience || 'Não informado'}
Perfil de Risco: ${formData.risk_profile || 'Não informado'}

=== INTENÇÃO DE INVESTIMENTO ===
Valor Pretendido: ${formData.intended_investment}
Horizonte: ${formData.investment_horizon || 'Não informado'}
Motivações: ${formData.motivations || 'Não informado'}

=== QUALIFICAÇÃO (CVM) ===
Status: ${formData.accredited_status || 'Não informado'}
Comprovação: ${formData.accreditation_proof || 'Não informado'}
Certificações: ${formData.professional_certification || 'Não informado'}

=== INFORMAÇÕES ADICIONAIS ===
Como conheceu: ${formData.how_did_you_hear || 'Não informado'}
Comentários: ${formData.additional_comments || 'Nenhum comentário'}

Este formulário foi enviado através do site oficial da Pele Rara.
Todos os dados estão protegidos conforme a LGPD.`;
        
        const urlEmail = `mailto:cynthia@pelerara.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;
        window.open(urlEmail, '_blank');
        
        toast.success('Cliente de email aberto! Complete o envio manualmente.');
      }
      
    } catch (error) {
      console.error('❌ Erro ao processar formulário:', error);
      toast.error('Erro ao processar o formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // ROI Calculator Functions
  const calculateROI = () => {
    const valuationPostMoney = 145409069; // R$ 145.409.069
    const participacao = (roiData.investmentAmount / valuationPostMoney) * 100;
    
    const scenarios = {
      realistic: {
        multiplo: 1.9931,
        roiTotal: 99.31,
        roiAnual: 14.79
      },
      optimistic: {
        multiplo: 2.99,
        roiTotal: 199,
        roiAnual: 24.48
      }
    };

    const scenario = scenarios[roiData.scenario as keyof typeof scenarios];
    const finalValue = roiData.investmentAmount * scenario.multiplo;
    const totalReturn = finalValue - roiData.investmentAmount;

    return {
      finalValue,
      totalReturn,
      roiPercentage: scenario.roiTotal,
      annualizedReturn: scenario.roiAnual,
      participacao,
      scenario: scenario
    };
  };

  const handleRoiChange = (field: string, value: number | string) => {
    setRoiData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const LanguageSelector = () => (
    <div className="language-selector">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
        aria-label="Selecionar idioma"
      >
        <option value="pt-BR">🇧🇷 Português</option>
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Español</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Language Selector */}
      <LanguageSelector />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-image-overlay">
            <RobustImage
              imageKey="peleRara02"
              alt="Pele Rara Technology"
              className="hero-background-image"
              loading="eager"
            />
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-logo">
            <RobustImage
              imageKey="logo1"
              alt="Pele Rara Logo"
              className="hero-logo-image"
              loading="eager"
            />
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: t.heroTitle }}></h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <div className="investment-badge">{t.investmentBadge}</div>
          <br />
          <button onClick={() => document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' })} className="cta-button">
            {t.ctaButton}
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.problemTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.problemSubtitle}</p>
          
          <div className="problem-content">
            <div className="problem-visual animate-on-scroll">{formatMarketSize(language)}</div>
            <div className="problem-text animate-on-scroll">
              <h3>{t.problemDescription}</h3>
              <ul className="problem-list">
                {t.problemList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* Solution Section - Header */}
      <section className="solution-header">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.solutionTitle}</h2>
          <p className="section-subtitle animate-on-scroll" dangerouslySetInnerHTML={{ __html: t.solutionSubtitle }}></p>
          <p className="patents-highlight animate-on-scroll">
            <strong>{t.solutionPatents}</strong>
          </p>
        </div>
      </section>

      {/* BIOCIC Product Section */}
      <section className="product-showcase biocic-showcase">
        <div className="container">
          <div className="product-image-block animate-on-scroll">
            <RobustImage
              imageKey="biocic"
              alt="BIOCIC Technology"
              className="product-full-image"
            />
          </div>
          
          <div className="product-info-block animate-on-scroll">
            <div className="product-header">
              <div className="product-badge">Tecnologia Patenteada</div>
              <div className="product-name">{t.biocicName}</div>
              <div className="product-title">{t.biocicTitle}</div>
              <p className="product-description">{t.biocicDescription}</p>
            </div>

            <div className="scientific-results">
              <h4>
                {language === 'pt-BR' ? 'Resultados Científicos Comprovados' :
                 language === 'en' ? 'Proven Scientific Results' :
                 'Resultados Científicos Comprobados'}
              </h4>
              <div className="results-grid">
                <div className="result-item">
                  <div className="result-number">&lt;20</div>
                  <div className="result-text">
                    {language === 'pt-BR' ? 'MINUTOS' :
                     language === 'en' ? 'MINUTES' :
                     'MINUTOS'}
                  </div>
                  <div className="result-description">
                    {language === 'pt-BR' ? 'Para penetração intra-celular' :
                     language === 'en' ? 'For intracellular penetration' :
                     'Para penetración intracelular'}
                  </div>
                </div>
                <div className="result-item">
                  <div className="result-number">2x</div>
                  <div className="result-text">
                    {language === 'pt-BR' ? 'MAIS RÁPIDA' :
                     language === 'en' ? 'FASTER' :
                     'MÁS RÁPIDA'}
                  </div>
                  <div className="result-description">
                    {language === 'pt-BR' ? 'Regeneração da pele' :
                     language === 'en' ? 'Skin regeneration' :
                     'Regeneración de la piel'}
                  </div>
                </div>
                <div className="result-item">
                  <div className="result-number">48h</div>
                  <div className="result-text">
                    {language === 'pt-BR' ? 'SEM INDUÇÃO DE CITOCINAS PRÓ-INFLAMATÓRIAS' :
                     language === 'en' ? 'WITHOUT INDUCTION OF PRO-INFLAMMATORY CYTOKINES' :
                     'SIN INDUCCIÓN DE CITOCINAS PRO-INFLAMATORIAS'}
                  </div>
                  <div className="result-description">
                    {language === 'pt-BR' ? 'Ação ultra-calmante' :
                     language === 'en' ? 'Ultra-soothing action' :
                     'Acción ultra-calmante'}
                  </div>
                </div>
                <div className="result-item">
                  <div className="result-number">1h</div>
                  <div className="result-text">
                    {language === 'pt-BR' ? 'PARA ABSORÇÃO' :
                     language === 'en' ? 'FOR ABSORPTION' :
                     'PARA ABSORCIÓN'}
                  </div>
                  <div className="result-description-nowrap">
                    {language === 'pt-BR' ? 'Em camadas profundas da pele' :
                     language === 'en' ? 'In deep skin layers' :
                     'En capas profundas de la piel'}
                  </div>
                </div>
              </div>
            </div>

            <div className="biomimetic-features">
              <h4>
                {language === 'pt-BR' ? 'Ação Biomimética' :
                 language === 'en' ? 'Biomimetic Action' :
                 'Acción Biomimética'}
              </h4>
              <p>
                {language === 'pt-BR' ? 'Formulações com BioCic alcançam as camadas mais profundas da pele através de nanopartículas que imitam processos naturais, garantindo absorção celular eficaz e regeneração acelerada comprovada em testes ex-vivo.' :
                 language === 'en' ? 'BioCic formulations reach the deepest layers of skin through nanoparticles that mimic natural processes, ensuring effective cellular absorption and accelerated regeneration proven in ex-vivo tests.' :
                 'Las formulaciones con BioCic alcanzan las capas más profundas de la piel a través de nanopartículas que imitan procesos naturales, garantizando absorción celular eficaz y regeneración acelerada comprobada en pruebas ex-vivo.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BIOBLOC Product Section */}
      <section className="product-showcase biobloc-showcase">
        <div className="container">
          <div className="product-image-block animate-on-scroll">
            <RobustImage
              imageKey="biobloc"
              alt="BIOBLOC Technology"
              className="product-full-image"
            />
          </div>
          
          <div className="product-info-block animate-on-scroll">
            <div className="product-header">
              <div className="product-badge">Tecnologia Complementar</div>
              <div className="product-name">{t.bioblocName}</div>
              <div className="product-title">{t.bioblocTitle}</div>
              <p className="product-description">{t.bioblocDescription}</p>
            </div>

            <div className="technical-differentials">
              <h4>
                {language === 'pt-BR' ? 'Diferenciais Técnicos dos Produtos' :
                 language === 'en' ? 'Product Technical Differentials' :
                 'Diferenciales Técnicos de los Productos'}
              </h4>
              <div className="differentials-grid">
                <div className="differential-item">
                  <h5>PH SYNDET</h5>
                  <p>
                    {language === 'pt-BR' ? 'Fórmula com o mesmo pH da pele - entre 5 e 6. Proporciona uma limpeza segura e preserva a hidratação. Mantém a proteção mesmo após a lavagem.' :
                     language === 'en' ? 'Formula with the same pH as skin - between 5 and 6. Provides safe cleansing and preserves hydration. Maintains protection even after washing.' :
                     'Fórmula con el mismo pH de la piel - entre 5 y 6. Proporciona una limpieza segura y preserva la hidratación. Mantiene la protección incluso después del lavado.'}
                  </p>
                </div>
                <div className="differential-item">
                  <h5>
                    {language === 'pt-BR' ? 'EXTRATO DE MATRICARIA CHAMOMILLA' :
                     language === 'en' ? 'MATRICARIA CHAMOMILLA EXTRACT' :
                     'EXTRACTO DE MATRICARIA CHAMOMILLA'}
                  </h5>
                  <p>
                    {language === 'pt-BR' ? 'Ativo que ajuda a acalmar a pele durante o processo de limpeza. Redução de irritações e vermelhidão.' :
                     language === 'en' ? 'Active ingredient that helps soothe skin during the cleansing process. Reduces irritation and redness.' :
                     'Activo que ayuda a calmar la piel durante el proceso de limpieza. Reducción de irritaciones y enrojecimiento.'}
                  </p>
                </div>
                <div className="differential-item">
                  <h5>
                    {language === 'pt-BR' ? 'AÇÃO BIOMIMÉTICA' :
                     language === 'en' ? 'BIOMIMETIC ACTION' :
                     'ACCIÓN BIOMIMÉTICA'}
                  </h5>
                  <p>
                    {language === 'pt-BR' ? 'Tensoativos naturais de estrutura química semelhante aos lipídios presentes na pele. Limpam suavemente e retiram as impurezas sem irritar.' :
                     language === 'en' ? 'Natural surfactants with chemical structure similar to lipids present in skin. Gently cleanse and remove impurities without irritation.' :
                     'Tensioactivos naturales con estructura química similar a los lípidos presentes en la piel. Limpian suavemente y eliminan las impurezas sin irritar.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IA NARA Product Section */}
      <section className="product-showcase ia-showcase">
        <div className="container">
          <div className="product-info-block animate-on-scroll">
            <div className="product-header">
              <div className="product-badge ia-badge">
                {language === 'pt-BR' ? 'Em Desenvolvimento' :
                 language === 'en' ? 'In Development' :
                 'En Desarrollo'}
              </div>
              <div className="product-name-title-inline">
                <span className="product-name ia-name">{t.iaName}</span>
                <span className="product-title ia-title">{t.iaTitle}</span>
              </div>
              <p className="product-description ia-description">{t.iaDescription}</p>
            </div>

            <div className="ia-benefits">
              <h4>
                {language === 'pt-BR' ? 'Benefícios Revolucionários da IA NARA' :
                 language === 'en' ? 'Revolutionary Benefits of NARA AI' :
                 'Beneficios Revolucionarios de IA NARA'}
              </h4>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <h5>
                    {language === 'pt-BR' ? 'Análise Inteligente e Personalizada' :
                     language === 'en' ? 'Intelligent and Personalized Analysis' :
                     'Análisis Inteligente y Personalizado'}
                  </h5>
                  <p>
                    {language === 'pt-BR' ? 'NARA examina as texturas da sua pele em detalhes, identificando suas necessidades específicas para um tratamento realmente eficaz.' :
                     language === 'en' ? 'NARA examines your skin textures in detail, identifying your specific needs for truly effective treatment.' :
                     'NARA examina las texturas de su piel en detalle, identificando sus necesidades específicas para un tratamiento realmente eficaz.'}
                  </p>
                </div>
                <div className="benefit-card">
                  <h5>
                    {language === 'pt-BR' ? 'Visualização do Antes e Depois' :
                     language === 'en' ? 'Before and After Visualization' :
                     'Visualización del Antes y Después'}
                  </h5>
                  <p>
                    {language === 'pt-BR' ? 'Visualize o progresso da sua pele. NARA aponta e demonstra as melhorias significativas alcançadas com o uso contínuo dos produtos Pele Rara.' :
                     language === 'en' ? 'Visualize your skin progress. NARA points out and demonstrates significant improvements achieved with continuous use of Pele Rara products.' :
                     'Visualice el progreso de su piel. NARA señala y demuestra las mejoras significativas logradas con el uso continuo de los productos Pele Rara.'}
                  </p>
                </div>
                <div className="benefit-card">
                  <h5>
                    {language === 'pt-BR' ? 'Suporte Pós-Venda Inteligente' :
                     language === 'en' ? 'Intelligent After-Sales Support' :
                     'Soporte Postventa Inteligente'}
                  </h5>
                  <p>
                    {language === 'pt-BR' ? 'NARA atua no pós-venda da marca, oferecendo acompanhamento contínuo e personalizado. Ela estará presente para tirar dúvidas e oferecer dicas.' :
                     language === 'en' ? 'NARA acts in brand after-sales, offering continuous and personalized follow-up. She will be present to answer questions and offer tips.' :
                     'NARA actúa en la postventa de la marca, ofreciendo seguimiento continuo y personalizado. Estará presente para responder preguntas y ofrecer consejos.'}
                  </p>
                </div>
                <div className="benefit-card">
                  <h5>
                    {language === 'pt-BR' ? 'Resultados Comprovados e Acompanhados' :
                     language === 'en' ? 'Proven and Monitored Results' :
                     'Resultados Comprobados y Monitoreados'}
                  </h5>
                  <p>
                    {language === 'pt-BR' ? 'Com a análise constante de NARA, você terá a certeza de que sua pele está recebendo o cuidado ideal, com resultados monitorados em tempo real.' :
                     language === 'en' ? 'With NARA\'s constant analysis, you will be assured that your skin is receiving ideal care, with results monitored in real time.' :
                     'Con el análisis constante de NARA, tendrá la seguridad de que su piel está recibiendo el cuidado ideal, con resultados monitoreados en tiempo real.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Achievements Section */}
      <section className="achievements">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.achievementsTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.achievementsSubtitle}</p>
          
          <div className="achievements-timeline animate-on-scroll">
            <h3>
              {language === 'pt-BR' ? 'Marcos Importantes' : 
               language === 'en' ? 'Important Milestones' : 
               'Hitos Importantes'}
            </h3>
            <div className="timeline-achievements">
              <div className="timeline-achievement">
                <div className="timeline-year">2021</div>
                <div className="timeline-event">
                  {language === 'pt-BR' ? 'Depósito das patentes BIOCIC e BIOBLOC no INPI' :
                   language === 'en' ? 'BIOCIC and BIOBLOC patents filed with INPI' :
                   'Depósito de patentes BIOCIC y BIOBLOC en INPI'}
                </div>
              </div>
              <div className="timeline-achievement">
                <div className="timeline-year">2022</div>
                <div className="timeline-event">
                  {language === 'pt-BR' ? 'Primeiros produtos registrados na ANVISA' :
                   language === 'en' ? 'First products registered with ANVISA' :
                   'Primeros productos registrados en ANVISA'}
                </div>
              </div>
              <div className="timeline-achievement">
                <div className="timeline-year">2023</div>
                <div className="timeline-event">
                  {language === 'pt-BR' ? 'Parcerias com hospitais de referência - Faturamento R$ 50.927,90' :
                   language === 'en' ? 'Partnerships with reference hospitals - Revenue $10.2k' :
                   'Alianzas con hospitales de referencia - Ingresos $10.2k'}
                </div>
              </div>
              <div className="timeline-achievement">
                <div className="timeline-year">2024</div>
                <div className="timeline-event">
                  {language === 'pt-BR' ? 'Expansão para 11 produtos - Faturamento R$ 112.370,32' :
                   language === 'en' ? 'Expansion to 11 products - Revenue $22.5k' :
                   'Expansión a 11 productos - Ingresos $22.5k'}
                </div>
              </div>
              <div className="timeline-achievement">
                <div className="timeline-year">2025</div>
                <div className="timeline-event">
                  <div>
                    {language === 'pt-BR' ? 'Rodada de investimento aberta - R$ 176.128.' :
                     language === 'en' ? 'Investment round opened - $35.2k' :
                     'Ronda de inversión abierta - $35.2k'}
                  </div>
                  <div className="timeline-period">
                    {language === 'pt-BR' ? '(de abril até agosto)' :
                     language === 'en' ? '(from April to August)' :
                     '(de abril hasta agosto)'}
                  </div>
                </div>
              </div>
            </div>

            <div className="press-section animate-on-scroll">
              <h4>
                {language === 'pt-BR' ? 'Reconhecimento na Mídia' : 
                 language === 'en' ? 'Media Recognition' : 
                 'Reconocimiento en los Medios'}
              </h4>
              <p>
                {language === 'pt-BR' ? 'Nossa inovação tem ganhado destaque em veículos de comunicação nacionais e internacionais' :
                 language === 'en' ? 'Our innovation has been featured in national and international media outlets' :
                 'Nuestra innovación ha sido destacada en medios de comunicación nacionales e internacionales'}
              </p>
              <a 
                href="https://pelerara.com.br/pages/imprensa-pele-rara" 
                target="_blank" 
                rel="noopener noreferrer"
                className="press-button"
              >
                {language === 'pt-BR' ? 'Ver Todas as Matérias' :
                 language === 'en' ? 'View All Articles' :
                 'Ver Todos los Artículos'}
                <span className="button-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Section */}
      <section className="validation">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.validationTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.validationSubtitle}</p>
          
          <div className="validation-cards">
            <div className="validation-card animate-on-scroll">
              <div className="validation-number">6+</div>
              <h4>{t.hospitalsPartners}</h4>
              <p>{t.hospitalsDescription}</p>
            </div>
            <div className="validation-card animate-on-scroll">
              <div className="validation-number">3</div>
              <h4>{t.publications}</h4>
              <p>{t.publicationsDescription}</p>
            </div>
            <div className="validation-card animate-on-scroll">
              <div className="validation-number">40K+</div>
              <h4>{t.patients}</h4>
              <p>{t.patientsDescription}</p>
            </div>
            <div className="validation-card animate-on-scroll">
              <div className="validation-number">11</div>
              <h4>{t.products}</h4>
              <p>{t.productsDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - Clean & Professional */}
      <section className="founder-section">
        <div className="container">
          {/* Section Header */}
          <div className="founder-header animate-on-scroll">
            <div className="section-badge">
              {language === 'pt-BR' ? 'LIDERANÇA' :
               language === 'en' ? 'LEADERSHIP' :
               'LIDERAZGO'}
            </div>
            <h2 className="section-title">
              {language === 'pt-BR' ? 'A Mente por Trás da Inovação' :
               language === 'en' ? 'The Mind Behind Innovation' :
               'La Mente Detrás de la Innovación'}
            </h2>
            <p className="section-subtitle">
              {language === 'pt-BR' ? 'PhD especialista em nanotecnologia com 10+ anos transformando pesquisa em produtos comerciais' :
               language === 'en' ? 'PhD specialist in nanotechnology with 10+ years transforming research into commercial products' :
               'PhD especialista en nanotecnología con 10+ años transformando investigación en productos comerciales'}
            </p>
          </div>

          {/* Main Founder Card */}
          <div className="founder-card animate-on-scroll">
            <div className="founder-image-container">
              <div className="founder-image">
                <RobustImage
                  imageKey="cynthia"
                  alt="Dra. Cynthia Nara Oliveira"
                />
              </div>
            </div>

            <div className="founder-content">
              <div className="founder-info">
                <h3 className="founder-name">{t.founderName}</h3>
                <div className="founder-role">
                  <span className="role-title">{t.founderRole}</span>
                  <span className="role-company">Pele Rara • Sympol Biotecnologia</span>
                </div>
                <p className="founder-description">{t.founderDescription}</p>
                
                <a 
                  href="https://www.linkedin.com/in/cynthia-nara-oliveira-18812966/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="linkedin-button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Ver Perfil Completo
                </a>
              </div>

              {/* Credentials */}
              <div className="founder-credentials">
                <div className="credential-item">
                  <div className="credential-degree">PhD</div>
                  <div className="credential-details">
                    <div className="credential-title">
                      {language === 'pt-BR' ? 'Ciências Farmacêuticas' :
                       language === 'en' ? 'Pharmaceutical Sciences' :
                       'Ciencias Farmacéuticas'}
                    </div>
                    <div className="credential-institution">UFMG (2021-2025)</div>
                  </div>
                </div>

                <div className="credential-item">
                  <div className="credential-degree">MSc</div>
                  <div className="credential-details">
                    <div className="credential-title">
                      {language === 'pt-BR' ? 'Farmácia' :
                       language === 'en' ? 'Pharmacy' :
                       'Farmacia'}
                    </div>
                    <div className="credential-institution">USP (2017-2020)</div>
                  </div>
                </div>

                <div className="credential-item">
                  <div className="credential-degree">Int'l</div>
                  <div className="credential-details">
                    <div className="credential-title">Molecular Genetics</div>
                    <div className="credential-institution">Michigan State University</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="founder-achievements animate-on-scroll">
            <h3 className="achievements-title">
              {language === 'pt-BR' ? 'Principais Conquistas' :
               language === 'en' ? 'Key Achievements' :
               'Principales Logros'}
            </h3>
            
            <div className="achievements-grid">
              <div className="achievement-item">
                <div className="achievement-number">2</div>
                <div className="achievement-text">
                  {language === 'pt-BR' ? 'Patentes Depositadas' :
                   language === 'en' ? 'Patents Filed' :
                   'Patentes Presentadas'}
                </div>
              </div>

              <div className="achievement-item">
                <div className="achievement-number">3</div>
                <div className="achievement-text">
                  {language === 'pt-BR' ? 'Publicações Internacionais' :
                   language === 'en' ? 'International Publications' :
                   'Publicaciones Internacionales'}
                </div>
              </div>

              <div className="achievement-item">
                <div className="achievement-number">6+</div>
                <div className="achievement-text">
                  {language === 'pt-BR' ? 'Parcerias Hospitalares' :
                   language === 'en' ? 'Hospital Partnerships' :
                   'Alianzas Hospitalarias'}
                </div>
              </div>

              <div className="achievement-item">
                <div className="achievement-number">10+</div>
                <div className="achievement-text">
                  {language === 'pt-BR' ? 'Anos de Pesquisa' :
                   language === 'en' ? 'Years of Research' :
                   'Años de Investigación'}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Recognition */}
          <div className="founder-recognition animate-on-scroll">
            <h3 className="recognition-title">
              {language === 'pt-BR' ? 'Reconhecimento Profissional' :
               language === 'en' ? 'Professional Recognition' :
               'Reconocimiento Profesional'}
            </h3>
            
            <div className="recognition-list">
              <div className="recognition-item">
                <div className="recognition-role">
                  {language === 'pt-BR' ? 'Membro' :
                   language === 'en' ? 'Member' :
                   'Miembro'}
                </div>
                <div className="recognition-org">CRS-Brazil (Control Release Society)</div>
              </div>

              <div className="recognition-item">
                <div className="recognition-role">
                  {language === 'pt-BR' ? 'Conselheira' :
                   language === 'en' ? 'Board Member' :
                   'Consejera'}
                </div>
                <div className="recognition-org">BH-TEC Parque Tecnológico</div>
              </div>

              <div className="recognition-item">
                <div className="recognition-role">
                  {language === 'pt-BR' ? 'Colunista' :
                   language === 'en' ? 'Columnist' :
                   'Columnista'}
                </div>
                <div className="recognition-org">Estado de Minas - Caderno Saúde</div>
              </div>

              <div className="recognition-item">
                <div className="recognition-role">
                  {language === 'pt-BR' ? 'MEMBRO' :
                   language === 'en' ? 'MEMBER' :
                   'MIEMBRO'}
                </div>
                <div className="recognition-org">
                  {language === 'pt-BR' ? 'GTT/CRF - Grupo Técnico de Trabalho/Conselho Regional de Farmácia' :
                   language === 'en' ? 'GTT/CRF - Technical Working Group/Regional Council of Pharmacy' :
                   'GTT/CRF - Grupo Técnico de Trabajo/Consejo Regional de Farmacia'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.testimonialsTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.testimonialsSubtitle}</p>
          
          <div className="testimonials-grid">
            {(t as any).testimonials?.map((testimonial: any, index: number) => (
              <div key={index} className="testimonial-card animate-on-scroll">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.testimonial}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-position">{testimonial.position}</p>
                    <p className="author-institution">{testimonial.institution}</p>
                  </div>
                </div>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="numbers">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.numbersTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.numbersSubtitle}</p>
          
          <div className="numbers-grid">
            <div className="number-card animate-on-scroll">
              <div className="number-value">{formatMarketSize(language)}</div>
              <div className="number-label">{t.marketBrazilian}</div>
            </div>
            <div className="number-card animate-on-scroll">
              <div className="number-value">{formatCurrency(290000000, language)}</div>
              <div className="number-label">{t.marketValuation}</div>
            </div>
            <div className="number-card animate-on-scroll">
              <div className="number-value">2</div>
              <div className="number-label">{t.patents}</div>
            </div>
            <div className="number-card animate-on-scroll">
              <div className="number-value">+1100%</div>
              <div className="number-label">{t.growth}</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-medium font-light text-lg">{t.globalMarket}</p>
          </div>
        </div>
      </section>

      {/* Revenue Growth Section */}
      <section className="revenue-growth">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            {language === 'pt-BR' ? 'Trajetória de Crescimento' :
             language === 'en' ? 'Growth Trajectory' :
             'Trayectoria de Crecimiento'}
          </h2>
          <p className="section-subtitle animate-on-scroll">
            {language === 'pt-BR' ? 'Crescimento exponencial comprovado ano após ano' :
             language === 'en' ? 'Proven exponential growth year after year' :
             'Crecimiento exponencial comprobado año tras año'}
          </p>
          
          <div className="revenue-timeline animate-on-scroll">
            <div className="revenue-year">
              <div className="year-label">2023</div>
              <div className="revenue-amount">
                {language === 'pt-BR' ? 'R$ 50.927,90' :
                 language === 'en' ? '$10.185' :
                 '$10.185'}
              </div>
              <div className="growth-note">
                {language === 'pt-BR' ? 'Ano base' :
                 language === 'en' ? 'Base year' :
                 'Año base'}
              </div>
            </div>
            
            <div className="growth-arrow">→</div>
            
            <div className="revenue-year">
              <div className="year-label">2024</div>
              <div className="revenue-amount">
                {language === 'pt-BR' ? 'R$ 112.370,32' :
                 language === 'en' ? '$22.474' :
                 '$22.474'}
              </div>
              <div className="growth-note growth-positive">+120%</div>
            </div>
            
            <div className="growth-arrow">→</div>
            
            <div className="revenue-year current">
              <div className="year-label">2025</div>
              <div className="revenue-amount">
                {language === 'pt-BR' ? 'R$ 176.128' :
                 language === 'en' ? '$35.226' :
                 '$35.226'}
              </div>
              <div className="growth-note">
                {language === 'pt-BR' ? '(de abril a agosto de 2025)' :
                 language === 'en' ? '(from April to August 2025)' :
                 '(de abril a agosto de 2025)'}
              </div>
            </div>
            
            <div className="growth-arrow projection">→</div>
            
            <div className="revenue-year projection">
              <div className="year-label">
                {language === 'pt-BR' ? '2025 (Meta)' :
                 language === 'en' ? '2025 (Goal)' :
                 '2025 (Meta)'}
              </div>
              <div className="revenue-amount">
                {language === 'pt-BR' ? 'R$ 300.000' :
                 language === 'en' ? '$60.000' :
                 '$60.000'}
              </div>
              <div className="growth-note growth-positive">+70%</div>
            </div>
          </div>
          
          <div className="growth-insights animate-on-scroll">
            <div className="insight-card">
              <div className="insight-title">
                {language === 'pt-BR' ? 'Taxa de Crescimento' :
                 language === 'en' ? 'Growth Rate' :
                 'Tasa de Crecimiento'}
              </div>
              <div className="insight-value">189%</div>
              <div className="insight-description">
                {language === 'pt-BR' ? 'CAGR médio 2023-2025' :
                 language === 'en' ? 'Average CAGR 2023-2025' :
                 'CAGR promedio 2023-2025'}
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-title">
                {language === 'pt-BR' ? 'Aceleração' :
                 language === 'en' ? 'Acceleration' :
                 'Aceleración'}
              </div>
              <div className="insight-value">6x</div>
              <div className="insight-description">
                {language === 'pt-BR' ? 'Multiplicação em 2 anos' :
                 language === 'en' ? 'Multiplication in 2 years' :
                 'Multiplicación en 2 años'}
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-title">
                {language === 'pt-BR' ? 'Previsibilidade' :
                 language === 'en' ? 'Predictability' :
                 'Previsibilidad'}
              </div>
              <div className="insight-value">Alta</div>
              <div className="insight-description">
                {language === 'pt-BR' ? 'Receita recorrente B2B' :
                 language === 'en' ? 'B2B recurring revenue' :
                 'Ingresos recurrentes B2B'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.timelineTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.timelineSubtitle}</p>
          
          <div className="timeline-container">
            <div className="timeline-item animate-on-scroll">
              <h4>{t.timeline1Title}</h4>
              <p>{t.timeline1Description}</p>
            </div>
            <div className="timeline-item animate-on-scroll">
              <h4>{t.timeline2Title}</h4>
              <p>{t.timeline2Description}</p>
            </div>
            <div className="timeline-item animate-on-scroll">
              <h4>{t.timeline3Title}</h4>
              <p>{t.timeline3Description}</p>
            </div>
            <div className="timeline-item animate-on-scroll">
              <h4>{t.timeline4Title}</h4>
              <p>{t.timeline4Description}</p>
            </div>
            <div className="timeline-item animate-on-scroll">
              <h4>{t.timeline5Title}</h4>
              <p>{t.timeline5Description}</p>
            </div>
            <div className="timeline-item animate-on-scroll">
              <h4>{t.timeline6Title}</h4>
              <p>{t.timeline6Description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="investment" id="investment">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.investmentTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.investmentSubtitle}</p>
          
          <div className="investment-grid">
            <div className="investment-item animate-on-scroll">
              <h4>{t.modality}</h4>
              <p>{t.modalityValue}</p>
            </div>
            <div className="investment-item animate-on-scroll">
              <h4>{t.captureGoal}</h4>
              <p>{formatCurrency(6000000, language)}</p>
            </div>
            <div className="investment-item animate-on-scroll">
              <h4>{t.minimumTicket}</h4>
              <p>{formatCurrency(500000, language)}</p>
            </div>
            <div className="investment-item animate-on-scroll">
              <h4>{t.investmentFormat}</h4>
              <p>{t.investmentFormatValue}</p>
            </div>
            <div className="investment-item animate-on-scroll">
              <h4>{t.term}</h4>
              <p>{t.termValue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Plan Section */}
      <section className="expansion-plan">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.expansionTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.expansionSubtitle}</p>
          
          <div className="expansion-timeline animate-on-scroll">
            <div className="expansion-year">
              <div className="year-badge">{t.year1}</div>
              <div className="year-target">{t.year1Target}</div>
              <div className="year-description">{t.year1Description}</div>
            </div>
            
            <div className="expansion-arrow">→</div>
            
            <div className="expansion-year">
              <div className="year-badge">{t.year2}</div>
              <div className="year-target">{t.year2Target}</div>
              <div className="year-description">{t.year2Description}</div>
            </div>
            
            <div className="expansion-arrow">→</div>
            
            <div className="expansion-year">
              <div className="year-badge">{t.year3}</div>
              <div className="year-target">{t.year3Target}</div>
              <div className="year-description">{t.year3Description}</div>
            </div>
            
            <div className="expansion-arrow">→</div>
            
            <div className="expansion-year">
              <div className="year-badge">{t.year5}</div>
              <div className="year-target">{t.year5Target}</div>
              <div className="year-description">{t.year5Description}</div>
            </div>
          </div>
          
          <div className="expansion-context animate-on-scroll">
            <p>
              {language === 'pt-BR' ? 'Contexto: 90 mil farmácias em operação no Brasil' :
               language === 'en' ? 'Context: 90 thousand pharmacies operating in Brazil' :
               'Contexto: 90 mil farmacias operando en Brasil'}
            </p>
          </div>
        </div>
      </section>

      {/* Competitive Advantages Section */}
      <section className="competitive-advantages">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.competitiveTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.competitiveSubtitle}</p>
          
          <div className="advantages-grid">
            <div className="advantage-card animate-on-scroll">
              <h3>{t.specializedNiche}</h3>
              <p>{t.specializedNicheDesc}</p>
            </div>
            
            <div className="advantage-card animate-on-scroll">
              <h3>{t.growthPlan}</h3>
              <p>{t.growthPlanDesc}</p>
            </div>
            
            <div className="advantage-card animate-on-scroll">
              <h3>{t.digitalBranding}</h3>
              <p>{t.digitalBrandingDesc}</p>
            </div>
            
            <div className="advantage-card animate-on-scroll">
              <h3>{t.strategicPartnerships}</h3>
              <p>{t.strategicPartnershipsDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Protection Section */}
      <section className="investor-protection">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.protectionTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.protectionSubtitle}</p>
          
          <div className="protection-grid">
            <div className="protection-card animate-on-scroll">
              <h3>{t.governance}</h3>
              <p>{t.governanceDesc}</p>
            </div>
            
            <div className="protection-card animate-on-scroll">
              <h3>{t.informationRights}</h3>
              <p>{t.informationRightsDesc}</p>
            </div>
            
            <div className="protection-card animate-on-scroll">
              <h3>{t.tagAlong}</h3>
              <p>{t.tagAlongDesc}</p>
            </div>
            
            <div className="protection-card animate-on-scroll">
              <h3>{t.vestingFounders}</h3>
              <p>{t.vestingFoundersDesc}</p>
            </div>
            
            <div className="protection-card animate-on-scroll">
              <h3>{t.antiDilution}</h3>
              <p>{t.antiDilutionDesc}</p>
            </div>
            
            <div className="protection-card animate-on-scroll">
              <h3>{t.monitoring}</h3>
              <p>{t.monitoringDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Section */}
      <section className="risk-management">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.riskTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.riskSubtitle}</p>
          
          <div className="risk-grid">
            <div className="risk-card animate-on-scroll">
              <div className="risk-level high">{t.riskHigh}</div>
              <h3>{t.factoryRisk}</h3>
              <p>{t.factoryRiskMitigation}</p>
            </div>
            
            <div className="risk-card animate-on-scroll">
              <div className="risk-level high">{t.riskHigh}</div>
              <h3>{t.marketRisk}</h3>
              <p>{t.marketRiskMitigation}</p>
            </div>
            
            <div className="risk-card animate-on-scroll">
              <div className="risk-level medium">{t.riskMedium}</div>
              <h3>{t.ipRisk}</h3>
              <p>{t.ipRiskMitigation}</p>
            </div>
            
            <div className="risk-card animate-on-scroll">
              <div className="risk-level medium">{t.riskMedium}</div>
              <h3>{t.talentRisk}</h3>
              <p>{t.talentRiskMitigation}</p>
            </div>
            
            <div className="risk-card animate-on-scroll">
              <div className="risk-level medium">{t.riskMedium}</div>
              <h3>{t.regulatoryRisk}</h3>
              <p>{t.regulatoryRiskMitigation}</p>
            </div>
            
            <div className="risk-card animate-on-scroll">
              <div className="risk-level low">{t.riskLow}</div>
              <h3>{t.fundingRisk}</h3>
              <p>{t.fundingRiskMitigation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use of Funds Section */}
      <section className="funds-usage">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.fundsTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.fundsSubtitle}</p>
          
          <div className="funds-overview animate-on-scroll">
            <h3>{formatCurrency(10000000, language)}</h3>
            <p>{t.fundsOverview}</p>
          </div>

          <div className="funds-grid animate-on-scroll">
            <div className="fund-card factory-card">
              <div className="fund-percentage">40%</div>
              <div className="fund-amount">{formatCurrency(4000000, language)}</div>
              <h4 className="fund-title">{t.factoryTitle}</h4>
              <ul className="fund-highlights">
                {t.factoryItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="fund-impact">
                <span className="impact-label">
                  {language === 'pt-BR' ? 'Capacidade de produção' :
                   language === 'en' ? 'Production capacity' :
                   'Capacidad de producción'}
                </span>
                <span className="impact-value">1M+ unidades/ano</span>
              </div>
            </div>

            <div className="fund-card expansion-card">
              <div className="fund-percentage">30%</div>
              <div className="fund-amount">{formatCurrency(3000000, language)}</div>
              <h4 className="fund-title">{t.commercialExpansionTitle}</h4>
              <ul className="fund-highlights">
                {t.expansionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="fund-impact">
                <span className="impact-label">
                  {language === 'pt-BR' ? 'Pontos de venda' :
                   language === 'en' ? 'Sales points' :
                   'Puntos de venta'}
                </span>
                <span className="impact-value">5.000+ farmácias</span>
              </div>
            </div>

            <div className="fund-card products-card">
              <div className="fund-percentage">20%</div>
              <div className="fund-amount">{formatCurrency(2000000, language)}</div>
              <h4 className="fund-title">{t.productsTitle}</h4>
              <ul className="fund-highlights">
                {t.productsItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="fund-impact">
                <span className="impact-label">
                  {language === 'pt-BR' ? 'Portfolio completo' :
                   language === 'en' ? 'Complete portfolio' :
                   'Portafolio completo'}
                </span>
                <span className="impact-value">34 SKUs novos</span>
              </div>
            </div>

            <div className="fund-card strategic-card">
              <div className="fund-percentage">10%</div>
              <div className="fund-amount">{formatCurrency(1000000, language)}</div>
              <h4 className="fund-title">
                {language === 'pt-BR' ? 'Estratégico & Reserva' :
                 language === 'en' ? 'Strategic & Reserve' :
                 'Estratégico y Reserva'}
              </h4>
              <ul className="fund-highlights">
                <li>
                  {language === 'pt-BR' ? 'Capital de giro e contingência' :
                   language === 'en' ? 'Working capital and contingency' :
                   'Capital de trabajo y contingencia'}
                </li>
                <li>
                  {language === 'pt-BR' ? 'Oportunidades estratégicas' :
                   language === 'en' ? 'Strategic opportunities' :
                   'Oportunidades estratégicas'}
                </li>
                <li>
                  {language === 'pt-BR' ? 'Preparação para Série A' :
                   language === 'en' ? 'Series A preparation' :
                   'Preparación para Serie A'}
                </li>
              </ul>
              <div className="fund-impact">
                <span className="impact-label">
                  {language === 'pt-BR' ? 'Flexibilidade' :
                   language === 'en' ? 'Flexibility' :
                   'Flexibilidad'}
                </span>
                <span className="impact-value">
                  {language === 'pt-BR' ? 'Alta' :
                   language === 'en' ? 'High' :
                   'Alta'}
                </span>
              </div>
            </div>
          </div>

          <div className="funds-summary animate-on-scroll">
            <div className="summary-item">
              <div className="summary-value">12</div>
              <div className="summary-label">{t.operationMonths}</div>
            </div>
            <div className="summary-item">
              <div className="summary-value">15x</div>
              <div className="summary-label">{t.roiProjected}</div>
            </div>
            <div className="summary-item">
              <div className="summary-value">3</div>
              <div className="summary-label">{t.countriesFirstYear}</div>
            </div>
            <div className="summary-item">
              <div className="summary-value">200+</div>
              <div className="summary-label">{t.directJobs}</div>
            </div>
          </div>
        </div>
      </section>



      {/* ROI Calculator Section - Simplified */}
      <section className="roi-calculator-simple">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.roiCalculatorTitle}</h2>
          <p className="section-subtitle animate-on-scroll">
            {t.roiCalculatorSubtitle}
          </p>
          
          <div className="calculator-simple animate-on-scroll">
            <div className="calculator-inputs">
              <div className="input-row-grid">
                <div className="input-group">
                  <label>{t.investmentValue}</label>
                  <div className="amount-display">
                    <input
                      type="range"
                      min="500000"
                      max="10000000"
                      step="100000"
                      value={roiData.investmentAmount}
                      aria-label="Valor do investimento"
                      onChange={(e) => handleRoiChange('investmentAmount', Math.max(500000, Math.round(Number(e.target.value) / 100000) * 100000))}
                      className="simple-slider"
                    />
                    <div className="amount-value">{formatCurrency(roiData.investmentAmount, language)}</div>
                  </div>
                </div>

                <div className="input-group">
                  <label>{t.equityParticipation}</label>
                  <div className="amount-display">
                    <div className="amount-value">
                      {((roiData.investmentAmount / 145409069) * 100).toFixed(4)}%
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>{t.investmentPeriod}</label>
                  <div className="amount-display">
                    <div className="amount-value">5 {t.years}</div>
                  </div>
                </div>

                <div className="input-group">
                  <label>{t.growthScenario}</label>
                  <div className="scenario-selector">
                    {[
                      { key: 'realistic', label: t.realistic },
                      { key: 'optimistic', label: t.optimistic }
                    ].map(scenario => (
                      <button
                        key={scenario.key}
                        className={`scenario-option ${roiData.scenario === scenario.key ? 'active' : ''}`}
                        onClick={() => handleRoiChange('scenario', scenario.key)}
                      >
                        {scenario.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="calculator-results">
              {(() => {
                const results = calculateROI();
                return (
                  <>
                    <div className="result-main">
                      <div className="result-flow">
                        <div className="initial-value">
                          <span className="label">Investimento Inicial</span>
                          <span className="value">{formatCurrency(roiData.investmentAmount, language)}</span>
                        </div>
                        <div className="arrow">→</div>
                        <div className="final-value">
                          <span className="label">Valor Final (5 anos)</span>
                          <span className="value highlight">{formatCurrency(results.finalValue, language)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="result-metrics">
                      <div className="metric">
                        <span className="metric-label">{t.totalReturn}</span>
                        <span className="metric-value">{formatCurrency(results.totalReturn, language)}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">ROI Total</span>
                        <span className="metric-value">{results.roiPercentage.toFixed(0)}%</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">{t.annualizedReturn}</span>
                        <span className="metric-value">{results.annualizedReturn.toFixed(1)}% a.a.</span>
                      </div>
                    </div>

                    <div className="result-note">
                      <p><strong>⚠️ Aviso:</strong> Projeções baseadas em premissas de mercado. Investimentos envolvem riscos.</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="animate-on-scroll">{t.ctaTitle}</h2>
          <p className="animate-on-scroll" dangerouslySetInnerHTML={{ __html: t.ctaDescription }}></p>
          
          {/* Download Presentation Button */}
          <div className="download-section animate-on-scroll">
            <a 
              href="https://drive.google.com/drive/folders/1EG8ASKLsmkevH9GkI0D-ZlWBr47CjV67?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              {t.downloadPresentation}
            </a>
          </div>
          
          {showSuccessMessage ? (
            <div className="success-message animate-on-scroll">
              <div className="success-icon">✓</div>
              <h3>{t.interestRegistered}</h3>
              <p>✅ {t.emailOpenedAutomatically}</p>
              <p>📧 <strong>{t.recipientEmail}</strong> cynthia@pelerara.com.br</p>
              <p>📞 <strong>{t.whatsappContact}</strong> +55 31 9 9994-0277</p>
              
              <div style={{margin: '20px 0', padding: '15px', backgroundColor: '#f0f9ff', border: '1px solid #0284c7', borderRadius: '8px'}}>
                <p style={{margin: 0, color: '#0284c7'}}>
                  <strong>👆 {t.emailNotOpened}</strong>
                </p>
              </div>
              
              <button 
                onClick={() => window.open(emailFallbackUrl, '_blank')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#0284c7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginRight: '10px',
                  fontWeight: 'bold'
                }}
              >
                📧 {t.openEmailButton}
              </button>
              
              <button 
                onClick={() => {
                  setShowSuccessMessage(false);
                  setEmailFallbackUrl('');
                }}
                className="reset-button"
                style={{marginLeft: '10px'}}
              >
                {t.submitNewInterest}
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="investor-form animate-on-scroll">
              {/* INFORMAÇÕES PESSOAIS */}
              <div className="form-section">
                <h3 className="section-title">{t.personalInfoSection}</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="full_name">{t.fullName} *</label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t.email} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">{t.phone} *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder={t.phonePlaceholder}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpf">{t.cpf} *</label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder={t.cpfPlaceholder}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="rg">{t.rg}</label>
                    <input
                      type="text"
                      id="rg"
                      name="rg"
                      value={formData.rg}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t.rgPlaceholder}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="birth_date">{t.birthDate}</label>
                    <input
                      type="date"
                      id="birth_date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="nationality">{t.nationality}</label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* ENDEREÇO */}
              <div className="form-section">
                <h3 className="section-title">{t.addressSection}</h3>
                
                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="address">{t.address}</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t.addressPlaceholder}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">{t.city}</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">{t.state}</label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectState}</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">{t.stateSP}</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="zipCode">{t.zipCode}</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t.zipCodePlaceholder}
                    />
                  </div>
                  <div className="form-group">
                    {/* Campo vazio para manter grid consistente */}
                  </div>
                </div>
              </div>

              {/* INFORMAÇÕES PROFISSIONAIS */}
              <div className="form-section">
                <h3 className="section-title">{t.professionalInfoSection}</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="occupation">{t.occupation}</label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t.occupationPlaceholder}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">{t.company}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="position">{t.position}</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work_experience">{t.workExperience}</label>
                    <select
                      id="work_experience"
                      name="work_experience"
                      value={formData.work_experience}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectOption}</option>
                      {t.workExperienceOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* INFORMAÇÕES FINANCEIRAS */}
              <div className="form-section">
                <h3 className="section-title">{t.financialInfoSection}</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="monthly_income">{t.monthlyIncome}</label>
                    <select
                      id="monthly_income"
                      name="monthly_income"
                      value={formData.monthly_income}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectIncomeRange}</option>
                      {t.incomeOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="total_assets">{t.totalAssets}</label>
                    <select
                      id="total_assets"
                      name="total_assets"
                      value={formData.total_assets}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectAssetsRange}</option>
                      {t.assetsOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="investment_experience">{t.investmentExperience}</label>
                    <select
                      id="investment_experience"
                      name="investment_experience"
                      value={formData.investment_experience}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectOption}</option>
                      {t.investmentExperienceOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="risk_profile">{t.riskProfile}</label>
                    <select
                      id="risk_profile"
                      name="risk_profile"
                      value={formData.risk_profile}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectOption}</option>
                      {t.riskProfileOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* INTENÇÃO DE INVESTIMENTO */}
              <div className="form-section">
                <h3 className="section-title">{t.investmentIntentionSection}</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="intended_investment">{t.intendedInvestment} *</label>
                    <select
                      id="intended_investment"
                      name="intended_investment"
                      value={formData.intended_investment}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">{t.selectInvestmentValue}</option>
                      {t.investmentValueOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="investment_horizon">{t.investmentHorizon}</label>
                    <select
                      id="investment_horizon"
                      name="investment_horizon"
                      value={formData.investment_horizon}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectOption}</option>
                      {t.investmentHorizonOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="motivations">{t.motivations}</label>
                  <textarea
                    id="motivations"
                    name="motivations"
                    value={formData.motivations}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows={3}
                    placeholder={t.motivationsPlaceholder}
                  ></textarea>
                </div>
              </div>

              {/* QUALIFICAÇÃO INVESTIDOR (CVM) */}
              <div className="form-section">
                <h3 className="section-title">{t.investorQualificationSection}</h3>
                
                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="accredited_status">{t.accreditedStatus}</label>
                    <select
                      id="accredited_status"
                      name="accredited_status"
                      value={formData.accredited_status}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectOption}</option>
                      {t.accreditedStatusOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="accreditation_proof">{t.accreditationProof}</label>
                    <select
                      id="accreditation_proof"
                      name="accreditation_proof"
                      value={formData.accreditation_proof}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t.selectQualificationProof}</option>
                      {t.accreditationProofOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="professional_certification">{t.professionalCertification}</label>
                    <input
                      type="text"
                      id="professional_certification"
                      name="professional_certification"
                      value={formData.professional_certification}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t.certificationPlaceholder}
                    />
                  </div>
                </div>
              </div>

              {/* INFORMAÇÕES ADICIONAIS */}
              <div className="form-section">
                <h3 className="section-title">{t.additionalInfoSection}</h3>
                
                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="how_did_you_hear">{t.howDidYouHear}</label>
                    <select
                      id="how_did_you_hear"
                      name="how_did_you_hear"
                      value={formData.how_did_you_hear}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                    <option value="">{t.selectOption}</option>
                    {t.howDidYouHearOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="additional_comments">{t.additionalComments}</label>
                    <textarea
                      id="additional_comments"
                      name="additional_comments"
                      value={formData.additional_comments}
                      onChange={handleInputChange}
                    className="form-textarea"
                      rows={3}
                      placeholder={t.commentsPlaceholder}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* TERMOS E CONDIÇÕES */}
              <div className="form-section">
                <h3 className="section-title">{t.termsSection}</h3>
                
                <div className="privacy-section">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="agree_terms"
                      name="agree_terms"
                      checked={formData.agree_terms}
                      onChange={(e) => setFormData(prev => ({ ...prev, agree_terms: e.target.checked }))}
                      required
                    />
                    <label htmlFor="agree_terms">
                      {t.agreeTerms} *
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="agree_privacy"
                      name="agree_privacy"
                      checked={formData.agree_privacy}
                      onChange={(e) => setFormData(prev => ({ ...prev, agree_privacy: e.target.checked }))}
                      required
                    />
                    <label htmlFor="agree_privacy">
                      {t.agreePrivacy} *
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="confirm_accuracy"
                      name="confirm_accuracy"
                      checked={formData.confirm_accuracy}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirm_accuracy: e.target.checked }))}
                      required
                    />
                    <label htmlFor="confirm_accuracy">
                      {t.confirmAccuracy} *
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="authorize_contact"
                      name="authorize_contact"
                      checked={formData.authorize_contact}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorize_contact: e.target.checked }))}
                      required
                    />
                    <label htmlFor="authorize_contact">
                      {t.authorizeContact} *
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="form-submit-button"
              >
                {isSubmitting ? t.submitting : t.formSubmit}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title animate-on-scroll">{t.faqTitle}</h2>
          <p className="section-subtitle animate-on-scroll">{t.faqSubtitle}</p>
          
          <div className="faq-container">
            {t.faqQuestions.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index ? "true" : "false"}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="faq-contact animate-on-scroll">
            <p>{t.faqContact} <a href="mailto:contato@pelerara.com.br">{t.faqContactLink}</a></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p className="footer-text">{t.footerText}</p>
          <p className="footer-motto">{t.footerMotto}</p>
          <p className="footer-additional">{t.footerAdditional}</p>
          <div className="contact-info">
            <p><a href="mailto:contato@pelerara.com.br">contato@pelerara.com.br</a> | <a href="tel:+5531999940277">+55 31 9 9994-0277</a></p>
            <p><a href="https://pelerara.com.br" target="_blank" rel="noopener noreferrer">www.pelerara.com.br</a></p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <button 
        className="whatsapp-float"
        title={language === 'pt-BR' ? 'Contato via WhatsApp' : language === 'en' ? 'Contact via WhatsApp' : 'Contacto vía WhatsApp'}
        onClick={() => {
          const message = encodeURIComponent(t.whatsappMessage);
          const phone = '5531999940277';
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          // Priority order: Mobile app > Desktop app > Web WhatsApp > Fallback
          if (isMobile) {
            // Try mobile WhatsApp app first
            const mobileUrl = `whatsapp://send?phone=${phone}&text=${message}`;
            const fallbackUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
            
            // Create a temporary link to test if WhatsApp app is available
            const tempLink = document.createElement('a');
            tempLink.href = mobileUrl;
            tempLink.click();
            
            // Fallback to web after a short delay if app doesn't open
            setTimeout(() => {
              window.open(fallbackUrl, '_blank');
            }, 1500);
          } else {
            // Desktop: Try WhatsApp Desktop app first, then web
            const desktopUrl = `whatsapp://send?phone=${phone}&text=${message}`;
            const webUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
            
            try {
              window.location.href = desktopUrl;
              // Fallback to web after delay
              setTimeout(() => {
                window.open(webUrl, '_blank');
              }, 1000);
            } catch (error) {
              // Direct fallback to web
              window.open(webUrl, '_blank');
            }
          }
        }}
      >
        <div className="whatsapp-tooltip">
          {language === 'pt-BR' ? 'Contato via WhatsApp' : 
           language === 'en' ? 'Contact via WhatsApp' : 
           'Contacto vía WhatsApp'}
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 2c-5.49 0-9.96 4.47-9.96 9.96 0 1.76.46 3.41 1.27 4.84L2 22l5.2-1.37c1.39.76 2.96 1.17 4.62 1.17h.01c5.48 0 9.95-4.47 9.95-9.96S17.51 2 12.017 2zm5.68 14.24c-.24.68-1.39 1.24-1.91 1.32-.47.08-.87.06-2.81-.59-1.66-.56-3.01-1.98-4.22-3.38-.35-.4-.92-1.21-.92-2.32s.58-1.65.79-1.87c.2-.23.44-.29.59-.29s.29 0 .42.01c.13.01.31-.05.48.37.18.44.6 1.46.65 1.57.05.11.09.24.02.39-.07.15-.11.24-.22.37-.11.13-.23.29-.33.39-.11.11-.22.23-.1.45.13.22.57.94 1.22 1.52.84.75 1.55 1 1.77 1.11.22.11.35.09.48-.05.13-.15.55-.64.7-.86.15-.22.29-.18.49-.11.2.07 1.28.6 1.5.71.22.11.37.17.42.26.06.09.06.52-.18 1.02z"/>
        </svg>
      </button>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
      />
    </div>
  )
}

export default App