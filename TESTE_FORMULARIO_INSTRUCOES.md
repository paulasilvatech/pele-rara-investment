# 📧 INSTRUÇÕES PARA TESTE DO FORMULÁRIO DE INVESTIDOR

## 🚀 SERVIDOR JÁ ESTÁ RODANDO
O servidor de desenvolvimento está ativo em: http://localhost:5173

## 📝 PASSO A PASSO PARA TESTAR O FORMULÁRIO

### 1️⃣ **Acessar o Formulário**
1. Abra o navegador em: http://localhost:5173
2. Role a página até encontrar o botão **"Quero Investir"** ou **"Faça Parte Desta História"**
3. Clique para abrir o formulário de registro

### 2️⃣ **Preencher o Formulário (5 Etapas)**

#### **Etapa 1 - Informações Pessoais**
- Nome Completo: `João Teste Silva`
- Email: `teste@exemplo.com`
- Telefone: `(11) 99999-9999`
- CPF: `123.456.789-00`
- RG: `12.345.678-9` (opcional)
- Data de Nascimento: `01/01/1980` (opcional)
- Nacionalidade: `Brasileiro`

#### **Etapa 2 - Endereço**
- Endereço: `Rua Teste, 123`
- Cidade: `São Paulo`
- Estado: `SP`
- CEP: `01234-567`
- País: `Brasil`

#### **Etapa 3 - Informações Financeiras**
- Ocupação: `Empresário`
- Empresa: `Empresa Teste` (opcional)
- Cargo: `CEO` (opcional)
- Renda Mensal: `R$ 50.001 - R$ 100.000`
- Patrimônio Total: `R$ 1.000.001 - R$ 5.000.000`

#### **Etapa 4 - Detalhes do Investimento**
- Valor Pretendido: `R$ 500.001 - R$ 1.000.000`
- Horizonte: `3-5 anos`
- Status Investidor: `Possuo patrimônio financeiro de pelo menos R$ 1.000.000`

#### **Etapa 5 - Termos e Confirmação**
- ✅ Marcar todas as 4 caixas de confirmação
- Como conheceu: `LinkedIn`

### 3️⃣ **TESTAR O ENVIO**

Clique em **"Finalizar Registro"**

## 🔍 O QUE VERIFICAR

### ✅ **Cenário 1: EmailJS Funcionando**
Se o EmailJS estiver configurado corretamente:
1. Aparecerá um toast verde: "✅ Formulário enviado com sucesso!"
2. O formulário será substituído pela **TELA DE SUCESSO** com:
   - Ícone verde de confirmação ✅
   - Título: "Registro Enviado com Sucesso!"
   - Texto confirmando envio para `cynthia@pelerara.com.br`
   - Lista dos próximos passos
   - Botão "Fazer Novo Registro"

### ⚠️ **Cenário 2: EmailJS com Erro (Fallback)**
Se o EmailJS falhar:
1. Aparecerá um toast: "📧 Abrindo seu cliente de email..."
2. Seu cliente de email (Outlook, Mail, etc.) abrirá automaticamente
3. Email pré-preenchido com todos os dados do formulário
4. A tela de sucesso ainda aparecerá

## 🛠️ VERIFICAR NO CONSOLE DO NAVEGADOR

Abra o Console (F12) e verifique:

```javascript
// Mensagens esperadas:
🔧 EMAILJS CONFIG DEBUG:
SERVICE_ID: pele_rara_service
TEMPLATE_ID: template_517ipek
PUBLIC_KEY: ***fVwd

// Ao enviar:
Iniciando envio do formulário...
Resultado do EmailJS: {success: true, message: "..."}
Email enviado com sucesso, mostrando tela de sucesso
Estado final - isSubmitted: true
```

## ⚠️ POSSÍVEIS PROBLEMAS E SOLUÇÕES

### Problema 1: "EmailJS não configurado"
**Solução:** Verifique se o arquivo `.env` existe e contém as credenciais

### Problema 2: Email não chega
**Verificar no painel EmailJS:**
1. Acesse https://www.emailjs.com/
2. Verifique se o serviço `pele_rara_service` está ativo
3. Verifique se o template `template_517ipek` existe
4. Verifique o histórico de emails enviados

### Problema 3: Erro 401 ou 403
**Solução:** As credenciais do EmailJS estão incorretas ou o domínio não está autorizado

## 📊 TELA DE CONFIRMAÇÃO PÓS-ENVIO

A tela de sucesso mostra:
- ✅ Grande ícone de confirmação
- Título: **"Registro Enviado com Sucesso!"**
- Confirmação do email de destino
- **Próximos Passos:**
  - Análise em 24h úteis
  - Envio de NDA
  - Agendamento de reunião
  - Processo de due diligence
- Informações de contato
- Botão para novo registro

## 🎯 TESTE RÁPIDO SEM EMAILJS

Para testar apenas a interface sem enviar email:
1. Comente temporariamente a linha 105 em `investorEmailService.ts`
2. Retorne sempre `{success: false}` para forçar o fallback
3. Isso abrirá apenas o cliente de email local

---

**📌 IMPORTANTE:** Após os testes, o formulário está pronto para produção!