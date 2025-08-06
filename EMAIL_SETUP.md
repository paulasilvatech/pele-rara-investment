# 📧 Configuração do Sistema de Email - Formulário de Investidores

## 🎯 Visão Geral

Sistema profissional de envio de emails com duas opções:

1. **EmailJS** (Recomendado) - Envio automático direto do navegador
2. **Fallback com mailto** - Abre o cliente de email do usuário

## 🚀 Configuração do EmailJS (Método Principal)

### Passo 1: Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita (200 emails/mês grátis)
3. Confirme seu email de cadastro

### Passo 2: Configurar Serviço de Email

1. No dashboard, clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor:
   - **Gmail** (recomendado)
   - Outlook
   - Outros

4. Para Gmail:
   - Nome do serviço: `pele_rara_service`
   - Conecte sua conta Gmail
   - Autorize o EmailJS
5. **IMPORTANTE:** Copie e salve o **Service ID**

### Passo 3: Criar Template Profissional

1. Vá para **"Email Templates"**
2. Clique em **"Create New Template"**
3. Configure os campos:

**To Email:**
```
cynthia@pelerara.com.br
```

**Subject:**
```
{{subject}}
```

**Content:** Use este template HTML com TODOS os campos do formulário:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333;
        }
        .header { 
            background: #667eea;
            color: white;
            padding: 20px; 
            text-align: center;
        }
        .section { 
            margin: 20px 0; 
            padding: 15px; 
            border-left: 3px solid #667eea; 
            background: #f8f9fa; 
        }
        .label { 
            font-weight: bold; 
            color: #555; 
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>NOVO INVESTIDOR - PELE RARA</h2>
    </div>
    
    <div class="section">
        <h3>INFORMAÇÕES PESSOAIS</h3>
        <p><span class="label">Nome:</span> {{full_name}}</p>
        <p><span class="label">Email:</span> {{email}}</p>
        <p><span class="label">Telefone:</span> {{phone}}</p>
        <p><span class="label">CPF:</span> {{cpf}}</p>
        <p><span class="label">RG:</span> {{rg}}</p>
        <p><span class="label">Data Nascimento:</span> {{birth_date}}</p>
        <p><span class="label">Nacionalidade:</span> {{nationality}}</p>
    </div>

    <div class="section">
        <h3>ENDEREÇO</h3>
        <p>{{full_address}}</p>
    </div>

    <div class="section">
        <h3>INFORMAÇÕES PROFISSIONAIS</h3>
        <p><span class="label">Ocupação:</span> {{occupation}}</p>
        <p><span class="label">Empresa:</span> {{company}}</p>
        <p><span class="label">Cargo:</span> {{position}}</p>
        <p><span class="label">Experiência:</span> {{work_experience}}</p>
    </div>

    <div class="section">
        <h3>INFORMAÇÕES FINANCEIRAS</h3>
        <p><span class="label">Renda Mensal:</span> {{monthly_income}}</p>
        <p><span class="label">Patrimônio:</span> {{total_assets}}</p>
        <p><span class="label">Experiência Investimentos:</span> {{investment_experience}}</p>
        <p><span class="label">Perfil de Risco:</span> {{risk_profile}}</p>
    </div>

    <div class="section">
        <h3>INTENÇÃO DE INVESTIMENTO</h3>
        <p><span class="label">Valor Pretendido:</span> <strong>{{intended_investment}}</strong></p>
        <p><span class="label">Horizonte:</span> {{investment_horizon}}</p>
        <p><span class="label">Motivações:</span> {{motivations}}</p>
    </div>

    <div class="section">
        <h3>QUALIFICAÇÃO INVESTIDOR (CVM)</h3>
        <p><span class="label">Status:</span> {{accredited_status}}</p>
        <p><span class="label">Comprovação:</span> {{accreditation_proof}}</p>
        <p><span class="label">Certificações:</span> {{professional_certification}}</p>
    </div>

    <div class="section">
        <h3>INFORMAÇÕES ADICIONAIS</h3>
        <p><span class="label">Como conheceu:</span> {{how_did_you_hear}}</p>
        <p><span class="label">Comentários:</span> {{additional_comments}}</p>
    </div>

    <div class="section">
        <p><strong>Data/Hora:</strong> {{timestamp}}</p>
        <p><strong>Origem:</strong> {{source}}</p>
    </div>
</body>
</html>
```

**IMPORTANTE - Lista de TODAS as variáveis do template:**
```
{{subject}} - Assunto do email
{{full_name}} - Nome completo
{{email}} - Email
{{phone}} - Telefone
{{cpf}} - CPF
{{rg}} - RG
{{birth_date}} - Data de nascimento
{{nationality}} - Nacionalidade
{{full_address}} - Endereço completo
{{occupation}} - Ocupação
{{company}} - Empresa
{{position}} - Cargo
{{work_experience}} - Experiência profissional
{{monthly_income}} - Renda mensal
{{total_assets}} - Patrimônio total
{{investment_experience}} - Experiência em investimentos
{{risk_profile}} - Perfil de risco
{{intended_investment}} - Valor pretendido de investimento
{{investment_horizon}} - Horizonte de investimento
{{motivations}} - Motivações
{{accredited_status}} - Status de investidor qualificado
{{accreditation_proof}} - Comprovação de qualificação
{{professional_certification}} - Certificações profissionais
{{how_did_you_hear}} - Como conheceu a Pele Rara
{{additional_comments}} - Comentários adicionais
{{timestamp}} - Data e hora do envio
{{source}} - Origem (Website)
```

4. **IMPORTANTE:** Salve e copie o **Template ID**

### Passo 4: Obter Public Key

1. Vá para **"Account"** > **"API Keys"**
2. Copie sua **Public Key**

### Passo 5: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas credenciais:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=seu_template_id_aqui  
VITE_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

## Testando

1. **Com EmailJS configurado**: Os emails serão enviados automaticamente para cynthia@pelerara.com.br
2. **Sem EmailJS**: O sistema usará o mailto fallback (abre o cliente de email padrão)

## Estrutura do Email

O email enviado contém:
- ✅ Assunto padronizado: `[NOVO INVESTIDOR] Nome - Tipo - Ticket`
- ✅ Dados estruturados em formato profissional
- ✅ Timestamp com horário de Brasília
- ✅ Todas as informações do formulário organizadas
- ✅ Próximos passos sugeridos

## Mensagem de Sucesso

Após envio, o usuário vê:
- ✅ Confirmação visual de sucesso
- ✅ Informações de contato (email e WhatsApp)
- ✅ Opção para enviar novo interesse
- ✅ Reset automático do formulário

## Destinatário

📧 **Email principal**: cynthia@pelerara.com.br
📞 **WhatsApp**: +55 31 9 9994-0277
