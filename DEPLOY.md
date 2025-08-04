# 🚀 Deploy da Landing Page Pele Rara

Este guia explica como configurar e fazer deploy automático da landing page no **GitHub Pages** usando **GitHub Actions**.

## 📋 Pré-requisitos

1. Repositório no GitHub
2. Node.js 18+ instalado localmente
3. Todas as imagens na pasta `public/images/`

## ⚙️ Configuração do GitHub Pages

### 1. Habilitar GitHub Pages

1. Vá para **Settings** do seu repositório
2. Navegue até **Pages** na sidebar esquerda
3. Em **Source**, selecione **GitHub Actions**
4. Clique em **Save**

### 2. Ajustar Base Path (se necessário)

Se o nome do seu repositório for diferente de `pele-rara-investment-main`, edite o arquivo `vite.config.ts`:

```typescript
// Altere esta linha com o nome do seu repositório
base: process.env.NODE_ENV === 'production' ? '/SEU-REPO-AQUI/' : '/',
```

## 🔄 Deploy Automático

### Workflow Principal (deploy.yml)
- **Trigger**: Push para branch `main` ou `master`
- **Ações**: 
  - ✅ Instala dependências
  - ✅ Executa build de produção
  - ✅ Faz deploy no GitHub Pages

### Workflow de Qualidade (lint-and-test.yml)
- **Trigger**: Push e Pull Requests
- **Ações**:
  - ✅ Executa ESLint
  - ✅ Verifica TypeScript
  - ✅ Testa build

## 🌐 URLs de Acesso

Após o deploy, sua landing page estará disponível em:

```
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

Exemplo:
```
https://paulasilva.github.io/pele-rara-investment-main/
```

## 📝 Como Fazer Deploy

### Deploy Automático
1. Faça commit das suas alterações
2. Push para a branch `main`:
   ```bash
   git add .
   git commit -m "feat: atualizar landing page"
   git push origin main
   ```
3. O GitHub Actions executará automaticamente
4. Acompanhe o progresso na aba **Actions** do GitHub

### Deploy Manual
1. Vá para **Actions** no GitHub
2. Selecione **Deploy to GitHub Pages**
3. Clique em **Run workflow**
4. Selecione a branch e clique em **Run workflow**

## 🔍 Monitoramento

### Verificar Status do Deploy
1. Vá para **Actions** no GitHub
2. Veja o status dos workflows
3. Clique em qualquer workflow para ver detalhes

### Logs e Debug
- ✅ **Verde**: Deploy bem-sucedido
- ❌ **Vermelho**: Erro no deploy (clique para ver logs)
- 🟡 **Amarelo**: Em execução

## 🐛 Solução de Problemas

### Erro de Build
```bash
# Teste localmente primeiro
npm install
npm run build
```

### Imagens não carregam
- Verifique se estão em `public/images/`
- Confirme os paths no código: `/images/nome-da-imagem.jpg`

### Base path incorreto
- Verifique o nome do repositório no `vite.config.ts`
- Deve ser exatamente igual ao nome no GitHub

## 📊 Performance

### Otimizações Incluídas
- ✅ Compressão de assets
- ✅ Cache busting com hash
- ✅ Separação de imagens e CSS
- ✅ Lazy loading de imagens
- ✅ Minificação de JS/CSS

### Métricas de Performance
- **Lighthouse Score**: 90+ (após deploy)
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s

## 🔒 Segurança

### Permissões do Workflow
```yaml
permissions:
  contents: read    # Ler código do repositório
  pages: write      # Escrever no GitHub Pages
  id-token: write   # Autenticação segura
```

### Boas Práticas
- ✅ Usa GITHUB_TOKEN (não precisa configurar secrets)
- ✅ Permissões mínimas necessárias
- ✅ Concorrência controlada (1 deploy por vez)

---

## 🚀 Comandos Rápidos

```bash
# Desenvolvimento local
npm run dev

# Build de produção (teste antes do deploy)
npm run build

# Preview da build local
npm run preview

# Check de qualidade
npm run lint
```

**🎉 Sua landing page estará online automaticamente após cada push!**