# 🧬 Pele Rara - Landing Page de Investimento

Uma landing page sofisticada focada em investidores para apresentar a **Pele Rara**, empresa inovadora em nanotecnologia para cuidados com pele sensível, com avaliação de R$ 290 milhões e portfólio de patentes avaliado entre R$ 95-187 milhões.

## 📋 Sobre o Projeto

A **Pele Rara** é uma empresa brasileira que desenvolveu tecnologias nanotecnológicas revolucionárias (**BIOCIC** e **BIOBLOC**) para tratamento de pele sensível. Esta landing page foi desenvolvida para atrair investidores qualificados e apresentar de forma convincente a oportunidade de investimento.

### 🎯 Objetivos da Landing Page

- **Captar investidores qualificados** interessados em healthtech e nanotecnologia
- **Apresentar métricas financeiras** e projeções de crescimento de forma transparente
- **Demonstrar credibilidade científica** através de parcerias com hospitais renomados
- **Explicar a tecnologia** de forma acessível para investidores não-técnicos
- **Gerar leads** para apresentações de pitch e due diligence

## 🚀 Tecnologias Utilizadas

### Frontend Framework
- **React 19** - Framework principal para interface
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Vite** - Build tool para desenvolvimento rápido

### Styling & UI
- **Tailwind CSS 4** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e primitivos
- **Framer Motion** - Animações fluidas e interativas
- **Lucide React** - Ícones modernos e consistentes

### Data Visualization
- **Recharts** - Gráficos e visualizações de dados financeiros
- **D3.js** - Manipulação avançada de dados para métricas

### Form & State Management
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Cache e sincronização de dados
- **Zod** - Validação de esquemas

### Development Tools
- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS
- **GitHub Pages** - Deploy e hospedagem

## 🏗️ Estrutura do Projeto

```
pele-rara-investment/
├── public/
│   └── images/           # Assets estáticos (logos, fotos, etc.)
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── ui/          # Componentes base (buttons, cards, etc.)
│   │   ├── HeroSection.tsx
│   │   ├── FinancialMetrics.tsx
│   │   ├── ClinicalCredibility.tsx
│   │   ├── TechnologyShowcase.tsx
│   │   ├── InvestmentOpportunity.tsx
│   │   └── FounderSection.tsx
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilitários e configurações
│   ├── styles/          # Estilos globais e temas
│   └── assets/          # Documentos e imagens do projeto
├── dist/                # Build de produção
└── docs/                # Documentação adicional
```

## 🎨 Design System

### Paleta de Cores
- **Azul Médico** (oklch(0.35 0.15 240)) - Autoridade científica
- **Branco Clínico** (oklch(0.98 0.02 240)) - Limpeza e clareza
- **Laranja Confiança** (oklch(0.65 0.18 45)) - CTAs e métricas importantes
- **Verde Crescimento** (oklch(0.55 0.20 140)) - Indicadores financeiros positivos

### Tipografia
- **Inter** - Fonte principal para máxima legibilidade
- Hierarquia clara com variações de peso e tamanho
- Otimizada para leitura em dispositivos móveis

### Componentes Principais
- **Cards de Métricas** - Apresentação de dados financeiros
- **Gráficos Interativos** - Visualização de crescimento e projeções
- **Seção de Credibilidade** - Logos de hospitais parceiros
- **Formulários de Contato** - Captura de leads qualificados

## 📊 Principais Seções

### 1. Hero Section
- Proposta de valor imediata
- Métricas-chave (R$ 290M avaliação, 25% TIR)
- Call-to-action principal

### 2. Métricas Financeiras
- Avaliação da empresa
- Valor do portfólio de patentes
- Projeções de crescimento
- Histórico de faturamento

### 3. Credibilidade Clínica
- Parcerias com Hospital do Amor
- Colaborações com HC-UFMG/USP
- Depoimentos de profissionais médicos

### 4. Showcase de Tecnologia
- Explicação das tecnologias BIOCIC e BIOBLOC
- Portfólio de 34 formulações
- 11 produtos registrados na ANVISA

### 5. Oportunidade de Investimento
- Termos de investimento
- Destinação dos recursos
- Cronograma de expansão

### 6. Fundadora
- História pessoal da Dra. Cynthia Nara
- Motivação científica e pessoal
- Experiência e credenciais

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build local

# Qualidade de Código
npm run lint         # Executa linting
npm run optimize     # Otimiza dependências

# Utilitários
npm run kill         # Mata processo na porta 5000
```

## 🚀 Deploy

O projeto está configurado para deploy automático no **GitHub Pages**:

1. **Build automático** a cada push na branch `main`
2. **Base path** configurado para GitHub Pages
3. **Assets otimizados** para carregamento rápido
4. **Imagens comprimidas** para melhor performance

### URL de Produção
🔗 [https://pelerarainvest.com](https://pelerarainvest.com)

## 📱 Responsividade

- **Mobile-first** design approach
- **Breakpoints otimizados** para tablets e desktops
- **Navegação adaptativa** para diferentes dispositivos
- **Imagens responsivas** com lazy loading

## 🔒 Aspectos de Segurança

- **Validação de formulários** com Zod
- **Sanitização de inputs** para contato
- **Headers de segurança** configurados
- **Assets servidos via HTTPS**

## � Métricas e Análise

### KPIs Principais
- **Taxa de conversão** de visitantes para leads
- **Tempo na página** para engajamento
- **Taxa de abandono** por seção
- **Origem do tráfego** para otimização

### Metas de Conversão
- **5-10%** taxa de conversão para contato inicial
- **2-5%** taxa de conversão para agendamento
- **Tempo médio** de 3-5 minutos na página

## 🎯 Público-Alvo

### Investidor Primário
- **Angel investors** interessados em healthtech
- **Venture capital** focado em nanotecnologia
- **Family offices** com interesse em inovação médica
- **Investidores estratégicos** do setor farmacêutico

### Perfil Demográfico
- **Faixa etária**: 35-65 anos
- **Ticket médio**: R$ 100k - R$ 2M
- **Localização**: Brasil (SP, RJ, MG principalmente)
- **Experiência**: Investidores sofisticados com due diligence rigorosa

## 📞 Contatos e Suporte

Para questões técnicas sobre o projeto:
- **Repositório**: [GitHub](https://github.com/paulasilvatech/pele-rara-investment)
- **Issues**: Use o sistema de issues do GitHub para bugs e melhorias

Para informações sobre investimento:
- **WhatsApp**: Disponível na landing page
- **Email**: Formulário de contato integrado
- **Agendamento**: Link direto para calendário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com 💙 para revolucionar o cuidado com pele sensível através da nanotecnologia**

*Deploy automático configurado para GitHub Pages com domínio personalizado*
