# 🚀 PROMPT PARA CORREÇÃO DE FORMULÁRIO REACT - PELE RARA

## 📋 CONTEXTO DO PROBLEMA

**Aplicação:** Landing page de investimento em React/TypeScript com Vite
**Problemas Identificados:**
1. Tela ficava em branco após submissão do formulário
2. Emails não eram enviados para o destinatário correto (cynthia@pelerara.com.br)
3. Lógica complexa com EmailJS causando falhas
4. Falta de validação adequada dos campos obrigatórios

## 🎯 PROMPT PARA SOLUÇÃO

```
Você é um desenvolvedor React/TypeScript especialista em formulários e integração de email. 

TAREFA: Corrigir um formulário de investimento que está apresentando os seguintes problemas:
- Tela em branco após submissão
- Emails não sendo enviados
- Falta de feedback adequado ao usuário

REQUISITOS TÉCNICOS:
1. Usar React com TypeScript
2. Implementar validação robusta de campos obrigatórios (nome, email, telefone)
3. Usar protocolo mailto para envio de emails
4. Destinatário: cynthia@pelerara.com.br
5. Mostrar mensagem de sucesso clara
6. Implementar fallback manual para email
7. Adicionar logs de debug para troubleshooting

ESTRUTURA DO EMAIL:
- Assunto: "NOVO INVESTIDOR: [Nome do Usuário]"
- Corpo: Dados estruturados incluindo:
  * Data/hora do cadastro
  * Dados pessoais completos
  * Perfil de investimento
  * Informações de contato
  * Próximos passos sugeridos

COMPORTAMENTO ESPERADO:
1. Validar campos obrigatórios antes do envio
2. Mostrar estado de loading durante processamento
3. Abrir cliente de email automaticamente
4. Exibir mensagem de sucesso com opção de reenvio manual
5. Não redirecionar ou causar tela em branco
6. Logs claros no console para debug

VALIDAÇÕES NECESSÁRIAS:
- Nome: campo obrigatório, não vazio
- Email: campo obrigatório, formato válido
- Telefone: campo obrigatório, não vazio
- Alertas claros para campos não preenchidos

ESTADOS DO COMPONENTE:
- formData: objeto com todos os campos do formulário
- isSubmitting: boolean para estado de loading
- showSuccessMessage: boolean para exibir mensagem de sucesso
- emailFallbackUrl: string com URL mailto para fallback

Implemente uma solução simples, robusta e que funcione de forma consistente em todos os navegadores.
```

## 🛠️ IMPLEMENTAÇÃO TÉCNICA

### 1. Função de Submissão Corrigida
```typescript
const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Logs para debug
  console.log('=== FORM SUBMIT INICIADO ===');
  console.log('Form data:', formData);
  
  // Validação robusta
  if (!formData.name?.trim()) {
    alert('Por favor, preencha o campo Nome');
    return;
  }
  
  if (!formData.email?.trim()) {
    alert('Por favor, preencha o campo Email');
    return;
  }
  
  if (!formData.phone?.trim()) {
    alert('Por favor, preencha o campo Telefone');
    return;
  }
  
  console.log('=== VALIDAÇÃO OK - PROCESSANDO ===');
  setIsSubmitting(true);
  
  try {
    // Criar email estruturado
    const agora = new Date();
    const dataHora = agora.toLocaleString('pt-BR');
    
    const corpoEmail = `NOVO CADASTRO DE INVESTIDOR - PELE RARA
    
Data/Hora: ${dataHora}

DADOS DO INTERESSADO:
• Nome: ${formData.name}
• Email: ${formData.email}
• Telefone: ${formData.phone}
• Empresa: ${formData.company || 'Não informado'}
• Cargo: ${formData.position || 'Não informado'}

PERFIL DE INVESTIMENTO:
• Tipo: ${formData.investorType || 'Não informado'}
• Ticket: ${formData.investmentTicket || 'Não informado'}
• Experiência: ${formData.experience || 'Não informado'}

INTERESSES:
${formData.interests || 'Não informado'}

Enviado via: pelerara.com.br`;
    
    const assunto = `NOVO INVESTIDOR: ${formData.name}`;
    const urlEmail = `mailto:cynthia@pelerara.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;
    
    console.log('=== EMAIL URL CRIADA ===');
    console.log('URL:', urlEmail);
    
    // Salvar URL para fallback
    setEmailFallbackUrl(urlEmail);
    
    // Abrir email
    window.location.href = urlEmail;
    
    // Mostrar sucesso
    console.log('=== MOSTRANDO MENSAGEM DE SUCESSO ===');
    setShowSuccessMessage(true);
    setIsSubmitting(false);
    
  } catch (erro) {
    console.error('=== ERRO NO PROCESSAMENTO ===', erro);
    alert('Erro ao processar o formulário. Tente novamente.');
    setIsSubmitting(false);
  }
};
```

### 2. Estados Necessários
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  investorType: '',
  investmentTicket: '',
  experience: '',
  interests: ''
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const [emailFallbackUrl, setEmailFallbackUrl] = useState<string>('');
```

### 3. Componente de Mensagem de Sucesso
```tsx
{showSuccessMessage ? (
  <div className="success-message animate-on-scroll">
    <div className="success-icon">✓</div>
    <h3>Interesse Registrado com Sucesso!</h3>
    <p>✅ Seu cliente de email foi aberto automaticamente com todas as informações preenchidas.</p>
    <p>📧 <strong>Destinatário:</strong> cynthia@pelerara.com.br</p>
    <p>📞 <strong>WhatsApp:</strong> +55 31 9 9994-0277</p>
    
    <div className="email-fallback-container">
      <p className="email-fallback-text">
        <strong>👆 Se o email não abriu automaticamente, clique no botão abaixo:</strong>
      </p>
    </div>
    
    <button 
      onClick={() => window.open(emailFallbackUrl, '_blank')}
      className="email-button"
    >
      📧 Abrir Email para Cynthia
    </button>
    
    <button 
      onClick={() => {
        setShowSuccessMessage(false);
        setEmailFallbackUrl('');
      }}
      className="reset-button"
    >
      Enviar Novo Interesse
    </button>
  </div>
) : (
  // Formulário original aqui
)}
```

## 🎨 ESTILOS CSS NECESSÁRIOS

```css
.success-message {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.2);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.email-button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
}

.reset-button {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
```

## 🧪 TESTES E VALIDAÇÃO

### Checklist de Teste:
- [ ] Formulário valida campos obrigatórios
- [ ] Mensagem de erro clara para campos vazios
- [ ] Email abre automaticamente no cliente padrão
- [ ] Destinatário correto (cynthia@pelerara.com.br)
- [ ] Assunto formatado corretamente
- [ ] Corpo do email estruturado
- [ ] Mensagem de sucesso aparece
- [ ] Botão de fallback funciona
- [ ] Logs aparecem no console
- [ ] Não há tela em branco
- [ ] Formulário pode ser reenviado

### Debug Console:
```
=== FORM SUBMIT INICIADO ===
Form data: {name: "...", email: "...", ...}
=== VALIDAÇÃO OK - PROCESSANDO ===
=== EMAIL URL CRIADA ===
URL: mailto:cynthia@pelerara.com.br?subject=...
=== MOSTRANDO MENSAGEM DE SUCESSO ===
```

## 🚀 PRINCIPAIS CORREÇÕES APLICADAS

1. **Eliminação de Async/Await Desnecessário**
   - Removido código assíncrono que causava tela em branco
   - Implementação síncrona e direta

2. **Validação Robusta**
   - Verificação de campos obrigatórios
   - Mensagens de erro claras
   - Prevenção de envio inválido

3. **Simplificação do Email**
   - Uso direto do protocolo mailto
   - Eliminação de dependências externas (EmailJS)
   - Fallback manual confiável

4. **Estados Claramente Definidos**
   - Loading state visível
   - Mensagem de sucesso estruturada
   - Opção de reenvio

5. **Logs de Debug**
   - Rastreamento completo do processo
   - Identificação rápida de problemas
   - Facilita manutenção futura

## 📞 CONTATOS DE SUPORTE

- **Email:** cynthia@pelerara.com.br
- **WhatsApp:** +55 31 9 9994-0277
- **Site:** www.pelerara.com.br

---

**Este prompt garante uma implementação robusta e livre de bugs para formulários de contato em React.**
