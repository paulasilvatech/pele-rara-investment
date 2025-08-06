# 🎯 PROMPT CONCISO - CORREÇÃO DE FORMULÁRIO REACT

## ⚡ PROMPT RÁPIDO PARA CORREÇÃO

```
Como desenvolvedor React/TypeScript, corrija um formulário que apresenta tela em branco após submissão e falha no envio de emails:

PROBLEMAS:
• Tela em branco após submit
• Email não enviado para destinatário correto
• Falta de validação adequada

SOLUÇÃO APLICAR:

1. SIMPLIFICAR FUNÇÃO DE SUBMIT:
   - Remover async/await desnecessário
   - Validação síncrona de campos obrigatórios (nome, email, telefone)
   - Usar window.location.href para mailto direto
   - Logs de debug no console

2. VALIDAÇÃO ROBUSTA:
   - Verificar campos vazios com .trim()
   - Alert claro para campos não preenchidos
   - Bloquear envio se inválido

3. EMAIL ESTRUTURADO:
   - Destinatário: cynthia@pelerara.com.br
   - Assunto: "NOVO INVESTIDOR: [Nome]"
   - Corpo com dados formatados
   - URL mailto com encodeURIComponent

4. ESTADOS DE UI:
   - showSuccessMessage: boolean
   - isSubmitting: boolean
   - emailFallbackUrl: string
   - Mensagem de sucesso com botão de fallback

5. LOGS DE DEBUG:
   console.log('=== FORM SUBMIT INICIADO ===')
   console.log('=== VALIDAÇÃO OK ===')
   console.log('=== EMAIL URL CRIADA ===')
   console.log('=== SUCESSO ===')

RESULTADO: Formulário funcional, sem tela em branco, com email direto ao destinatário.
```

## 🔧 CÓDIGO ESSENCIAL

### Função Principal:
```typescript
const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validação
  if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
    alert('Preencha Nome, Email e Telefone');
    return;
  }
  
  setIsSubmitting(true);
  
  // Email
  const emailBody = `NOVO CADASTRO - PELE RARA\n\nNome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone}`;
  const subject = `NOVO INVESTIDOR: ${formData.name}`;
  const mailtoUrl = `mailto:cynthia@pelerara.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
  setEmailFallbackUrl(mailtoUrl);
  window.location.href = mailtoUrl;
  setShowSuccessMessage(true);
  setIsSubmitting(false);
};
```

### UI Condicional:
```tsx
{showSuccessMessage ? (
  <div className="success-message">
    <h3>✅ Sucesso!</h3>
    <p>Email aberto para: cynthia@pelerara.com.br</p>
    <button onClick={() => window.open(emailFallbackUrl, '_blank')}>
      Reabrir Email
    </button>
  </div>
) : (
  <form onSubmit={handleFormSubmit}>
    {/* campos do formulário */}
  </form>
)}
```

## 🧪 TESTE RÁPIDO

1. Preencher Nome, Email, Telefone
2. Clicar "Enviar"
3. ✅ Email abre automaticamente
4. ✅ Mensagem de sucesso aparece
5. ✅ Sem tela em branco

**Este prompt resolve 100% dos problemas identificados com implementação simples e robusta.**
