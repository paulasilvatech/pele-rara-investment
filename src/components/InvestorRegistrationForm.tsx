import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { 
  User, 
  Envelope, 
  Phone, 
  MapPin, 
  CurrencyDollar, 
  Certificate, 
  Building,
  CheckCircle,
  Warning,
  Calendar,
  Lock,
  ArrowRight
} from "@phosphor-icons/react"

interface FormData {
  // Personal Information
  fullName: string
  email: string
  phone: string
  cpf: string
  rg: string
  birthDate: string
  nationality: string
  
  // Address
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Professional Information
  occupation: string
  company: string
  position: string
  workExperience: string
  
  // Financial Information
  monthlyIncome: string
  totalAssets: string
  investmentExperience: string
  riskProfile: string
  
  // Investment Details
  intendedInvestment: string
  investmentHorizon: string
  motivations: string
  
  // Accredited Investor Verification
  accreditedStatus: string
  accreditationProof: string
  professionalCertification: string
  
  // Legal Compliance
  agreeTerms: boolean
  agreePrivacy: boolean
  confirmAccuracy: boolean
  authorizeContact: boolean
  
  // Additional Information
  howDidYouHear: string
  additionalComments: string
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  cpf: "",
  rg: "",
  birthDate: "",
  nationality: "Brasileiro",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "Brasil",
  occupation: "",
  company: "",
  position: "",
  workExperience: "",
  monthlyIncome: "",
  totalAssets: "",
  investmentExperience: "",
  riskProfile: "",
  intendedInvestment: "",
  investmentHorizon: "",
  motivations: "",
  accreditedStatus: "",
  accreditationProof: "",
  professionalCertification: "",
  agreeTerms: false,
  agreePrivacy: false,
  confirmAccuracy: false,
  authorizeContact: false,
  howDidYouHear: "",
  additionalComments: ""
}

export function InvestorRegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const totalSteps = 5

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.phone && formData.cpf)
      case 2:
        return !!(formData.address && formData.city && formData.state && formData.zipCode)
      case 3:
        return !!(formData.occupation && formData.monthlyIncome && formData.totalAssets)
      case 4:
        return !!(formData.intendedInvestment && formData.accreditedStatus)
      case 5:
        return !!(formData.agreeTerms && formData.agreePrivacy && formData.confirmAccuracy && formData.authorizeContact)
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    } else {
      toast.error("Por favor, preencha todos os campos obrigatórios antes de continuar.")
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast.error("Por favor, aceite todos os termos obrigatórios.")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create email body with form data
      const emailBody = `
FORMULÁRIO DE REGISTRO DE INVESTIDOR
=====================================

INFORMAÇÕES PESSOAIS:
Nome Completo: ${formData.fullName}
Email: ${formData.email}
Telefone: ${formData.phone}
CPF: ${formData.cpf}
RG: ${formData.rg}
Data de Nascimento: ${formData.birthDate}
Nacionalidade: ${formData.nationality}

ENDEREÇO:
${formData.address}
${formData.city}, ${formData.state} - ${formData.zipCode}
${formData.country}

INFORMAÇÕES PROFISSIONAIS:
Ocupação: ${formData.occupation}
Empresa: ${formData.company}
Cargo: ${formData.position}
Experiência Profissional: ${formData.workExperience}

INFORMAÇÕES FINANCEIRAS:
Renda Mensal: ${formData.monthlyIncome}
Patrimônio Total: ${formData.totalAssets}
Experiência em Investimentos: ${formData.investmentExperience}
Perfil de Risco: ${formData.riskProfile}

DETALHES DO INVESTIMENTO:
Valor Pretendido: ${formData.intendedInvestment}
Horizonte de Investimento: ${formData.investmentHorizon}
Motivações: ${formData.motivations}

VERIFICAÇÃO DE INVESTIDOR QUALIFICADO:
Status: ${formData.accreditedStatus}
Comprovação: ${formData.accreditationProof}
Certificação Profissional: ${formData.professionalCertification}

INFORMAÇÕES ADICIONAIS:
Como soube da Pele Rara: ${formData.howDidYouHear}
Comentários: ${formData.additionalComments}

Data do Envio: ${new Date().toLocaleString('pt-BR')}
      `.trim()

      // Open email client with pre-filled data
      const mailtoLink = `mailto:contato@pelerara.com.br?subject=Registro de Investidor - ${formData.fullName}&body=${encodeURIComponent(emailBody)}`
      window.location.href = mailtoLink

      toast.success("Formulário enviado! Verifique seu cliente de email.")
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData(initialFormData)
        setCurrentStep(1)
      }, 2000)
      
    } catch (error) {
      toast.error("Erro ao enviar formulário. Tente novamente.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Informações Pessoais"
      case 2: return "Endereço"
      case 3: return "Informações Financeiras"
      case 4: return "Detalhes do Investimento"
      case 5: return "Termos e Confirmação"
      default: return ""
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Nome Completo *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Seu nome completo"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-foreground">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => updateFormData("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rg" className="text-foreground">RG</Label>
                <Input
                  id="rg"
                  value={formData.rg}
                  onChange={(e) => updateFormData("rg", e.target.value)}
                  placeholder="00.000.000-0"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-foreground">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateFormData("birthDate", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-foreground">Nacionalidade</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => updateFormData("nationality", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-foreground">Endereço Completo *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="Rua, número, complemento"
                className="bg-input border-border text-foreground"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-foreground">Cidade *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  placeholder="Sua cidade"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-foreground">Estado *</Label>
                <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-foreground">CEP *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  placeholder="00000-000"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country" className="text-foreground">País</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => updateFormData("country", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-foreground">Ocupação *</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => updateFormData("occupation", e.target.value)}
                  placeholder="Sua profissão"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData("company", e.target.value)}
                  placeholder="Nome da empresa"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position" className="text-foreground">Cargo</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => updateFormData("position", e.target.value)}
                  placeholder="Seu cargo"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workExperience" className="text-foreground">Anos de Experiência</Label>
                <Select value={formData.workExperience} onValueChange={(value) => updateFormData("workExperience", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 anos</SelectItem>
                    <SelectItem value="3-5">3-5 anos</SelectItem>
                    <SelectItem value="6-10">6-10 anos</SelectItem>
                    <SelectItem value="11-15">11-15 anos</SelectItem>
                    <SelectItem value="16-20">16-20 anos</SelectItem>
                    <SelectItem value="20+">Mais de 20 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome" className="text-foreground">Renda Mensal *</Label>
                <Select value={formData.monthlyIncome} onValueChange={(value) => updateFormData("monthlyIncome", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione sua faixa de renda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5k">Até R$ 5.000</SelectItem>
                    <SelectItem value="5k-10k">R$ 5.001 - R$ 10.000</SelectItem>
                    <SelectItem value="10k-20k">R$ 10.001 - R$ 20.000</SelectItem>
                    <SelectItem value="20k-50k">R$ 20.001 - R$ 50.000</SelectItem>
                    <SelectItem value="50k-100k">R$ 50.001 - R$ 100.000</SelectItem>
                    <SelectItem value="100k+">Acima de R$ 100.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAssets" className="text-foreground">Patrimônio Total *</Label>
                <Select value={formData.totalAssets} onValueChange={(value) => updateFormData("totalAssets", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione sua faixa de patrimônio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100k">Até R$ 100.000</SelectItem>
                    <SelectItem value="100k-300k">R$ 100.001 - R$ 300.000</SelectItem>
                    <SelectItem value="300k-1M">R$ 300.001 - R$ 1.000.000</SelectItem>
                    <SelectItem value="1M-5M">R$ 1.000.001 - R$ 5.000.000</SelectItem>
                    <SelectItem value="5M-10M">R$ 5.000.001 - R$ 10.000.000</SelectItem>
                    <SelectItem value="10M+">Acima de R$ 10.000.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentExperience" className="text-foreground">Experiência em Investimentos</Label>
                <Select value={formData.investmentExperience} onValueChange={(value) => updateFormData("investmentExperience", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante (poupança, CDB)</SelectItem>
                    <SelectItem value="intermediario">Intermediário (fundos, ações)</SelectItem>
                    <SelectItem value="avancado">Avançado (derivativos, FIPs)</SelectItem>
                    <SelectItem value="profissional">Profissional (gestão de recursos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskProfile" className="text-foreground">Perfil de Risco</Label>
                <Select value={formData.riskProfile} onValueChange={(value) => updateFormData("riskProfile", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservador">Conservador</SelectItem>
                    <SelectItem value="moderado">Moderado</SelectItem>
                    <SelectItem value="arrojado">Arrojado</SelectItem>
                    <SelectItem value="super-arrojado">Super Arrojado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Warning size={20} className="text-warning mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-warning">Verificação de Investidor Qualificado</h4>
                  <p className="text-sm text-muted-foreground">
                    De acordo com a CVM, investimentos em empresas de capital fechado são restritos a investidores qualificados. 
                    É necessário comprovar patrimônio mínimo de R$ 1.000.000 ou certificação profissional.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="intendedInvestment" className="text-foreground">Valor Pretendido de Investimento *</Label>
                <Select value={formData.intendedInvestment} onValueChange={(value) => updateFormData("intendedInvestment", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione o valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                    <SelectItem value="100k-250k">R$ 100.001 - R$ 250.000</SelectItem>
                    <SelectItem value="250k-500k">R$ 250.001 - R$ 500.000</SelectItem>
                    <SelectItem value="500k-1M">R$ 500.001 - R$ 1.000.000</SelectItem>
                    <SelectItem value="1M-2M">R$ 1.000.001 - R$ 2.000.000</SelectItem>
                    <SelectItem value="2M+">Acima de R$ 2.000.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investmentHorizon" className="text-foreground">Horizonte de Investimento</Label>
                <Select value={formData.investmentHorizon} onValueChange={(value) => updateFormData("investmentHorizon", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 anos</SelectItem>
                    <SelectItem value="3-5">3-5 anos</SelectItem>
                    <SelectItem value="5-10">5-10 anos</SelectItem>
                    <SelectItem value="10+">Mais de 10 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motivations" className="text-foreground">Motivações para Investir</Label>
              <Textarea
                id="motivations"
                value={formData.motivations}
                onChange={(e) => updateFormData("motivations", e.target.value)}
                placeholder="Descreva suas motivações e expectativas para este investimento"
                className="bg-input border-border text-foreground min-h-20"
              />
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Certificate size={20} className="text-warning" />
                Qualificação como Investidor (CVM)
              </h4>
              
              <div className="space-y-3">
                <Label className="text-foreground">Status de Investidor Qualificado *</Label>
                <RadioGroup value={formData.accreditedStatus} onValueChange={(value) => updateFormData("accreditedStatus", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patrimonio" id="patrimonio" />
                    <Label htmlFor="patrimonio" className="text-sm text-foreground">
                      Possuo patrimônio financeiro de pelo menos R$ 1.000.000
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="certificacao" id="certificacao" />
                    <Label htmlFor="certificacao" className="text-sm text-foreground">
                      Possuo certificação profissional (CPA-20, CFA, CNPI, etc.)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="profissional" id="profissional" />
                    <Label htmlFor="profissional" className="text-sm text-foreground">
                      Sou profissional do mercado financeiro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="verificar" id="verificar" />
                    <Label htmlFor="verificar" className="text-sm text-foreground">
                      Preciso verificar minha qualificação
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accreditationProof" className="text-foreground">Comprovação de Qualificação</Label>
                <Select value={formData.accreditationProof} onValueChange={(value) => updateFormData("accreditationProof", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Como pode comprovar?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="extrato-corretora">Extrato de corretora</SelectItem>
                    <SelectItem value="declaracao-ir">Declaração de Imposto de Renda</SelectItem>
                    <SelectItem value="certificado">Certificado profissional</SelectItem>
                    <SelectItem value="carta-empregador">Carta do empregador</SelectItem>
                    <SelectItem value="outros">Outros documentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="professionalCertification" className="text-foreground">Certificações Profissionais</Label>
                <Input
                  id="professionalCertification"
                  value={formData.professionalCertification}
                  onChange={(e) => updateFormData("professionalCertification", e.target.value)}
                  placeholder="Ex: CPA-20, CFA, CNPI (se aplicável)"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="howDidYouHear" className="text-foreground">Como soube da Pele Rara?</Label>
                <Select value={formData.howDidYouHear} onValueChange={(value) => updateFormData("howDidYouHear", value)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="indicacao">Indicação</SelectItem>
                    <SelectItem value="midia">Mídia (jornal, revista)</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="site">Site da empresa</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalComments" className="text-foreground">Comentários Adicionais</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => updateFormData("additionalComments", e.target.value)}
                placeholder="Informações adicionais, dúvidas ou comentários"
                className="bg-input border-border text-foreground min-h-20"
              />
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Lock size={20} className="text-warning" />
                Termos e Condições
              </h4>
              
              <div className="space-y-4 bg-muted/20 p-4 rounded-lg border border-border/50">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => updateFormData("agreeTerms", !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-foreground leading-relaxed">
                    Concordo com os <strong>Termos de Uso</strong> e declaro estar ciente dos riscos associados 
                    a investimentos em empresas de capital fechado *
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onCheckedChange={(checked) => updateFormData("agreePrivacy", !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="agreePrivacy" className="text-sm text-foreground leading-relaxed">
                    Concordo com a <strong>Política de Privacidade</strong> e autorizo o tratamento dos meus dados 
                    conforme a LGPD *
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="confirmAccuracy"
                    checked={formData.confirmAccuracy}
                    onCheckedChange={(checked) => updateFormData("confirmAccuracy", !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="confirmAccuracy" className="text-sm text-foreground leading-relaxed">
                    Declaro que todas as informações fornecidas são <strong>verdadeiras e precisas</strong> *
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="authorizeContact"
                    checked={formData.authorizeContact}
                    onCheckedChange={(checked) => updateFormData("authorizeContact", !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="authorizeContact" className="text-sm text-foreground leading-relaxed">
                    Autorizo contato da Pele Rara para apresentação de oportunidades de investimento *
                  </Label>
                </div>
              </div>
              
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Warning size={20} className="text-warning mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h5 className="font-semibold text-warning">Aviso Importante</h5>
                    <p className="text-sm text-muted-foreground">
                      Este investimento envolve riscos significativos e pode resultar na perda total do capital investido. 
                      Leia atentamente todos os documentos antes de tomar sua decisão de investimento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6" data-section="investor-registration">
      <Card className="bg-card/40 backdrop-blur border-border/50">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold text-foreground">
            Registro de Investidor
          </CardTitle>
          <p className="text-muted-foreground">
            Preencha suas informações para participar das oportunidades de investimento da Pele Rara
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 pt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i + 1 === currentStep
                    ? "bg-primary scale-125"
                    : i + 1 < currentStep
                    ? "bg-success"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Etapa {currentStep} de {totalSteps}</span>
            <span>{getStepTitle(currentStep)}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {renderStep()}
          
          <div className="flex justify-between pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-secondary text-secondary-foreground border-border hover:bg-secondary/80"
            >
              Anterior
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Próximo
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !validateStep(5)}
                className="bg-success text-background hover:bg-success/90"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="mr-2" />
                    Finalizar Registro
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Contato:</strong> contato@pelerara.com.br | +55 31 9 9994-0277
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Investimento mínimo: R$ 50.000 | Apenas para investidores qualificados (CVM)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}