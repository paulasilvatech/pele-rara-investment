import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InvestorRegistrationForm } from "./InvestorRegistrationForm"
import { 
  TrendUp, 
  WhatsappLogo, 
  Envelope, 
  CalendarCheck,
  Calculator,
  Globe,
  ArrowRight,
  Phone,
  UserPlus
} from "@phosphor-icons/react"

interface InvestmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InvestmentModal({ isOpen, onClose }: InvestmentModalProps) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  
  const quickActions = [
    {
      title: "Registro Completo de Investidor",
      description: "Formulário completo com verificação de investidor qualificado",
      icon: <UserPlus size={24} className="text-primary" />,
      action: () => {
        setShowRegistrationForm(true)
      },
      variant: "primary" as const,
      featured: true
    },
    {
      title: "WhatsApp Direto",
      description: "Falar agora mesmo com nossa equipe",
      icon: <WhatsappLogo size={24} className="text-success" />,
      action: () => {
        window.open('https://wa.me/5531999940277?text=Olá! Tenho interesse em investir na Pele Rara. Gostaria de mais informações sobre as oportunidades disponíveis.', '_blank')
        onClose()
      },
      variant: "success" as const
    },
    {
      title: "Email para Reunião",
      description: "Enviar interesse por email",
      icon: <Envelope size={24} className="text-warning" />,
      action: () => {
        window.location.href = 'mailto:contato@pelerara.com.br?subject=Interesse em Investimento - Pele Rara&body=Olá! Tenho interesse em conhecer mais sobre as oportunidades de investimento na Pele Rara. Gostaria de agendar uma reunião para discutir os detalhes.'
        onClose()
      },
      variant: "warning" as const
    },
    {
      title: "Site Oficial",
      description: "Conhecer mais sobre a empresa",
      icon: <Globe size={24} className="text-accent" />,
      action: () => {
        window.open('https://pelerara.com.br/', '_blank')
        onClose()
      },
      variant: "secondary" as const
    }
  ]

  const getButtonStyle = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-primary hover:bg-primary/90 text-primary-foreground border-primary/50"
      case "success":
        return "bg-success hover:bg-success/90 text-background border-success/50"
      case "warning":
        return "bg-warning hover:bg-warning/90 text-background border-warning/50"
      case "secondary":
        return "bg-accent hover:bg-accent/90 text-background border-accent/50"
      default:
        return "bg-primary hover:bg-primary/90 text-primary-foreground border-primary/50"
    }
  }

  if (showRegistrationForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader className="text-center space-y-2 pb-4">
            <Button
              variant="ghost"
              onClick={() => setShowRegistrationForm(false)}
              className="absolute left-4 top-4 text-muted-foreground hover:text-foreground"
            >
              ← Voltar
            </Button>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Registro de Investidor Qualificado
            </DialogTitle>
          </DialogHeader>
          <InvestorRegistrationForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader className="text-center space-y-4 pb-6">
          <DialogTitle className="text-3xl font-bold text-foreground">
            Como deseja investir?
          </DialogTitle>
          <div className="space-y-2">
            <p className="text-muted-foreground text-lg">
              Escolha a melhor forma de entrar em contato conosco
            </p>
            <Badge variant="secondary" className="text-sm px-4 py-2 bg-success/10 text-success border-success/30">
              <Calculator size={16} className="mr-2" />
              Investimento mínimo: R$ 300.000
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className={`bg-card/40 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group ${
                action.featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 ${
                      action.featured ? 'bg-primary/20' : 'bg-primary/10'
                    }`}>
                      {action.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground text-lg">{action.title}</h3>
                        {action.featured && (
                          <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                            Recomendado
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-all duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="border-t border-border/50 pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-success">R$ 183M</div>
              <div className="text-xs text-muted-foreground">Valuation</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-warning">25%</div>
              <div className="text-xs text-muted-foreground">TMA</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Contato oficial:</strong> contato@pelerara.com.br | +55 31 9 9994-0277
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}