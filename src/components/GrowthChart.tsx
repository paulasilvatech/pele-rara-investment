import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendUp, Calendar, CurrencyDollar, Play, Pause, ArrowRight } from "@phosphor-icons/react"

interface DataPoint {
  year: string
  revenue: number
  formattedRevenue: string
  isProjection?: boolean
  milestone?: string
  description?: string
}

const revenueData: DataPoint[] = [
  { 
    year: "2022", 
    revenue: 25, 
    formattedRevenue: "R$ 25k", 
    isProjection: false,
    milestone: "Início da Jornada",
    description: "Primeiros produtos no mercado com tecnologia BIOCIC/BIOBLOC"
  },
  { 
    year: "2023", 
    revenue: 85, 
    formattedRevenue: "R$ 85k", 
    isProjection: false,
    milestone: "Validação Clínica",
    description: "Parcerias com hospitais renomados confirmam eficácia"
  },
  { 
    year: "2024", 
    revenue: 150, 
    formattedRevenue: "R$ 150k", 
    isProjection: false,
    milestone: "Expansão Atual",
    description: "11 produtos ANVISA, crescimento sustentado"
  },
  { 
    year: "2025", 
    revenue: 300, 
    formattedRevenue: "R$ 300k", 
    isProjection: true,
    milestone: "Meta de Investimento",
    description: "Dobrar receita com recursos da rodada"
  },
  { 
    year: "2026", 
    revenue: 650, 
    formattedRevenue: "R$ 650k", 
    isProjection: true,
    milestone: "Aceleração",
    description: "34 formulações no mercado farmacêutico"
  },
  { 
    year: "2027", 
    revenue: 1200, 
    formattedRevenue: "R$ 1.2M", 
    isProjection: true,
    milestone: "Consolidação",
    description: "Líder em pele sensível no Brasil"
  },
]

export function GrowthChart() {
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1
        if (next >= revenueData.length) {
          setIsPlaying(false)
          return 0
        }
        setActivePoint(next)
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
  
  const getBarHeight = (value: number) => {
    return (value / maxRevenue) * 100
  }

  const getGrowthRate = (currentIndex: number) => {
    if (currentIndex === 0) return null
    const current = revenueData[currentIndex].revenue
    const previous = revenueData[currentIndex - 1].revenue
    const growth = ((current - previous) / previous) * 100
    return Math.round(growth)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setCurrentStep(0)
      setActivePoint(0)
    }
  }

  return (
    <div className="max-w-6xl mx-auto mb-24">
      <Card className="card-gradient overflow-hidden">
        <CardContent className="p-0">
          {/* Modern Header */}
          <div className="text-center py-16 px-8">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl"></div>
                <div className="relative p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
                  <TrendUp className="text-zinc-300" size={28} />
                </div>
              </div>
            </div>
            <h3 className="text-5xl font-light text-white mb-6 tracking-tight">
              Trajetória de Crescimento
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto mb-8"></div>
            <p className="text-zinc-400 font-light max-w-4xl mx-auto mb-8 text-lg">
              De <span className="text-white font-medium">R$ 25k</span> para 
              <span className="text-zinc-300 font-medium"> R$ 300k</span> - 
              uma jornada de inovação e crescimento sustentável
            </p>
            <Button
              onClick={handlePlayPause}
              variant="outline"
              size="lg"
              className="border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 font-medium tracking-wide rounded-xl px-8 py-4"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span className="ml-3">{isPlaying ? 'Pausar' : 'Animar'}</span>
            </Button>
          </div>
          
          {/* Active Point Details */}
          {activePoint !== null && (
            <div className="bg-zinc-950/50 border-y border-zinc-800 py-10 px-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    <div>
                      <h4 className="text-2xl font-medium text-white mb-2">
                        {revenueData[activePoint].milestone}
                      </h4>
                      <p className="text-zinc-400 font-light text-lg">
                        {revenueData[activePoint].description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-light text-white">
                      {revenueData[activePoint].formattedRevenue}
                    </div>
                    <div className="text-sm text-zinc-500 font-medium">
                      {revenueData[activePoint].year}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Modern Chart Area */}
          <div className="p-16">
            <div className="relative">
              {/* Chart Container */}
              <div className="relative h-80 flex items-end justify-between gap-8 mb-16">
                {revenueData.map((data, index) => {
                  const barHeight = getBarHeight(data.revenue)
                  const growthRate = getGrowthRate(index)
                  const isActive = activePoint === index
                  const isHighlighted = currentStep >= index && isPlaying
                  
                  return (
                    <div
                      key={data.year}
                      className="flex-1 relative group cursor-pointer"
                      onMouseEnter={() => setActivePoint(index)}
                      onMouseLeave={() => !isPlaying && setActivePoint(null)}
                    >
                      {/* Modern Tooltip */}
                      {isActive && (
                        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 z-20">
                          <div className="bg-zinc-900/95 backdrop-blur border border-zinc-700 rounded-2xl p-8 shadow-2xl min-w-60">
                            <div className="text-center space-y-4">
                              <div className="text-3xl font-light text-white">
                                {data.formattedRevenue}
                              </div>
                              <div className="text-sm font-semibold text-zinc-300">
                                {data.milestone}
                              </div>
                              <div className="text-xs text-zinc-500 font-medium">
                                {data.year}
                              </div>
                              {growthRate && (
                                <div className="text-xs px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                                  +{growthRate}% vs ano anterior
                                </div>
                              )}
                              {data.isProjection && (
                                <div className="text-xs text-zinc-400 bg-zinc-800/50 rounded-full px-4 py-2 border border-zinc-700">
                                  Projeção
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Modern Bar */}
                      <div className="relative h-full flex flex-col justify-end">
                        <div
                          className={`relative w-full rounded-t-2xl transition-all duration-1000 ease-out ${
                            data.isProjection 
                              ? 'bg-gradient-to-t from-zinc-600 to-zinc-400' 
                              : 'bg-gradient-to-t from-white to-zinc-300'
                          } ${
                            isActive || isHighlighted 
                              ? 'opacity-100 scale-105 shadow-2xl' 
                              : 'opacity-80 hover:opacity-95'
                          }`}
                          style={{
                            height: `${(barHeight * animationProgress) / 100}%`,
                          }}
                        >
                          {/* Subtle glow for active */}
                          {(isActive || isHighlighted) && (
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse rounded-t-2xl"></div>
                          )}
                        </div>
                      </div>
                      
                      {/* Modern Year label */}
                      <div className="text-center mt-8 space-y-3">
                        <div className={`text-sm font-semibold transition-colors ${
                          isActive || isHighlighted ? 'text-white' : 'text-zinc-300'
                        }`}>
                          {data.year}
                        </div>
                        <div className="text-xs text-zinc-500 font-medium">
                          {data.formattedRevenue}
                        </div>
                        {data.isProjection && (
                          <div className="text-xs text-zinc-600 font-medium">
                            Projeção
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Modern Legend */}
              <div className="flex items-center justify-center gap-16 py-8 border-t border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-gradient-to-t from-white to-zinc-300 rounded-lg"></div>
                  <span className="text-sm text-zinc-400 font-medium">Dados Históricos</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-gradient-to-t from-zinc-600 to-zinc-400 rounded-lg"></div>
                  <span className="text-sm text-zinc-400 font-medium">Projeções</span>
                </div>
              </div>
            </div>
            
            {/* Modern Key Insights */}
            <div className="grid gap-10 md:grid-cols-3 mt-16 pt-16 border-t border-zinc-800">
              <div className="text-center space-y-6 group cursor-pointer transition-all duration-300 hover:transform hover:scale-105" onClick={() => setActivePoint(3)}>
                <div className="w-20 h-20 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto group-hover:border-zinc-700 transition-all duration-500">
                  <TrendUp className="text-zinc-300" size={28} />
                </div>
                <div className="text-4xl font-light text-white">1.100%</div>
                <div className="text-sm text-zinc-500 font-medium">
                  Crescimento total 2022-2025
                </div>
              </div>
              
              <div className="text-center space-y-6 group cursor-pointer transition-all duration-300 hover:transform hover:scale-105" onClick={() => setActivePoint(5)}>
                <div className="w-20 h-20 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto group-hover:border-zinc-700 transition-all duration-500">
                  <CurrencyDollar className="text-zinc-300" size={28} />
                </div>
                <div className="text-4xl font-light text-white">R$ 1.2M</div>
                <div className="text-sm text-zinc-500 font-medium">
                  Meta de receita 2027
                </div>
              </div>
              
              <div className="text-center space-y-6 group cursor-pointer transition-all duration-300 hover:transform hover:scale-105" onClick={() => handlePlayPause()}>
                <div className="w-20 h-20 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto group-hover:border-zinc-700 transition-all duration-500">
                  <Calendar className="text-zinc-300" size={28} />
                </div>
                <div className="text-4xl font-light text-white">5 anos</div>
                <div className="text-sm text-zinc-500 font-medium">
                  Trajetória completa
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}