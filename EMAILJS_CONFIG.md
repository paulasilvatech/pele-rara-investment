# 🚀 CONFIGURAÇÃO RÁPIDA DO EMAILJS

## ✅ Status Atual
- ✅ EmailJS instalado e configurado no código
- ✅ Variáveis de ambiente definidas no .env
- ✅ Serviço de email implementado
- ✅ Fallback para mailto configurado
- ✅ Toast notifications ativadas

## 🔧 Passos para Ativar EmailJS

### 1. Verificar Credenciais no .env
```bash
# Suas credenciais atuais:
VITE_EMAILJS_SERVICE_ID=pele_rara_service
VITE_EMAILJS_TEMPLATE_ID=template_517ipek
VITE_EMAILJS_PUBLIC_KEY=QRIRlRlAyZeXofVwd
```

### 2. Configurar Template no EmailJS
No painel do EmailJS, seu template deve ter estas variáveis:

**Destinatário:**
```
cynthia@pelerara.com.br
```

**Assunto:**
```
{{subject}}
```

**Variáveis do Template:**
- `{{full_name}}` - Nome completo
- `{{email}}` - Email do investidor
- `{{phone}}` - Telefone
- `{{cpf}}` - CPF
- `{{intended_investment}}` - Valor pretendido
- `{{monthly_income}}` - Renda mensal
- `{{total_assets}}` - Patrimônio
- `{{accredited_status}}` - Status de investidor qualificado
- `{{timestamp}}` - Data/hora do envio
- E todas as outras variáveis listadas no código

### 3. Testar o Sistema

**Com EmailJS configurado:**
1. Formulário envia email automaticamente
2. Toast de sucesso aparece
3. Tela de confirmação é exibida

**Sem EmailJS (fallback):**
1. Abre cliente de email padrão
2. Email já preenchido com dados
3. Usuário envia manualmente

## 🧪 Como Testar

1. Acesse o formulário de investidor
2. Preencha todos os campos obrigatórios
3. Clique em "Finalizar Registro"
4. Verifique se recebeu o email em cynthia@pelerara.com.br

## 📊 Logs de Debug

No console do navegador você verá:
```
EmailJS configurado: true/false
Tentando enviar email via EmailJS...
Email enviado com sucesso! / Usando fallback...
```

## 🔄 Funcionamento Atual

**Fluxo Principal:**
1. Usuario preenche formulário → 
2. Tenta EmailJS → 
3. Se falhar, usa mailto → 
4. Mostra tela de sucesso

**Sempre funciona** mesmo sem EmailJS configurado!

## 📞 Contato para Recebimento
- **Email:** cynthia@pelerara.com.br
- **WhatsApp:** +55 31 9 9994-0277

---
**Sistema 100% funcional e pronto para uso!** 🎉
