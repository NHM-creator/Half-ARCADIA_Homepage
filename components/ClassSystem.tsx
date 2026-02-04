import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { CLASSES } from '../constants';
import { RoleType, NationType } from '../types';
import { Shield, Swords, Heart, ChevronLeft, ChevronRight, Info, Mountain, Cog, Skull, Users, X } from 'lucide-react';

interface ClassSystemProps {
  selectedRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

// Stats descriptions
const STAT_DESCRIPTIONS: Record<RoleType, Record<string, string[]>> = {
  TANK: {
    '공격력': ["위협 수준이 낮아 어그로 관리에 주의가 필요합니다.", "기본적인 견제가 가능한 수준의 무력입니다.", "방어태세 속에서도 준수한 반격이 가능합니다.", "적의 진형을 붕괴시키는 강력한 한 방이 있습니다.", "딜러에 버금가는 파괴력으로 전장을 휩씁니다."],
    '방어력': ["방어보다는 체력으로 버티는 스타일입니다.", "가벼운 장비로 흘려내는 회피형 탱킹입니다.", "균형 잡힌 방어 기제로 안정적인 생존을 보장합니다.", "대부분의 공격을 정면에서 받아낼 수 있습니다.", "절대 뚫리지 않는 불굴의 요새 그 자체입니다."],
    '지원력': ["오직 본인의 생존과 전투에 집중합니다.", "위기 시, 인접한 아군 하나를 보호할 수 있습니다.", "파티원에게 간헐적으로 방어 효과를 공유합니다.", "전선의 아군들을 보호하는 광역 스킬을 보유합니다.", "파티 전체의 생존을 책임지는 리더입니다."],
    '기동성': ["자리를 지키며 싸우는 부동의 성벽입니다.", "느리지만 묵직하게 전진하며 압박합니다.", "표준적인 이동 속도로 전장에 합류합니다.", "위협적인 적에게 즉시 도약하여 진입합니다.", "전장을 종횡무진 누비며 어그로를 장악합니다."],
    '조작 난이도': ["단순하고 직관적인 스킬 구성을 가졌습니다.", "기본적인 역할 수행이 쉬운 편입니다.", "적절한 상황 판단과 스킬 활용이 필요합니다.", "정확한 방어 타이밍과 위치 선정이 중요합니다.", "극한의 반응속도와 판단력이 요구되는 상급자용입니다."]
  },
  DEALER: {
    '공격력': ["지속적인 누적 딜링에 특화되어 있습니다.", "평범하지만 안정적인 피해를 입힙니다.", "준수한 화력으로 적을 제압합니다.", "폭발적인 순간 화력으로 적을 녹여버립니다.", "모든 것을 파괴하는 최상위권의 살상력입니다."],
    '방어력': ["스치면 사망. 극한의 회피 컨트롤이 필요합니다.", "생존기가 부족하여 위치 선정이 중요합니다.", "최소한의 생존을 위한 보호막을 가졌습니다.", "딜러치고는 단단하여 근접 교전에 유리합니다.", "적의 공격을 버티며 맞딜이 가능한 수준입니다."],
    '지원력': ["오로지 적을 죽이는 것에만 집중합니다.", "적에게 디버프를 걸어 아군을 돕습니다.", "파티의 화력을 높이는 시너지를 보유했습니다.", "위급 시 아군을 지원할 유틸리티가 있습니다.", "공격과 지원이 동시에 가능한 하이브리드입니다."],
    '기동성': ["고정 포대처럼 한 자리에서 화력을 투사합니다.", "이동기가 적어 신중한 진입이 필요합니다.", "치고 빠지는 히트 앤 런이 가능합니다.", "화려한 이동기로 적을 교란합니다.", "눈으로 쫓을 수 없는 속도로 전장을 지배합니다."],
    '조작 난이도': ["입문자도 쉽게 강력한 딜을 낼 수 있습니다.", "딜 사이클이 단순하여 운영이 편합니다.", "자원 관리와 스킬 연계에 이해가 필요합니다.", "복잡한 메커니즘과 빠른 손놀림을 요구합니다.", "실수 하나가 딜로스로 이어지는 초고난도 클래스."]
  },
  SUPPORT: {
    '공격력': ["전투 능력은 거의 없습니다.", "최소한의 호신용 스킬만 보유했습니다.", "솔로 플레이가 가능한 정도의 화력입니다.", "서브 딜러로서도 손색없는 피해량입니다.", "적을 직접 심판하는 전투형 서포터입니다."],
    '방어력': ["아군의 보호가 절실히 필요합니다.", "스스로를 지키기 위한 보호막이 있습니다.", "적절한 생존기로 끈질기게 살아남습니다.", "튼튼한 맷집으로 전방 지원이 가능합니다.", "탱커 못지않은 생존력으로 전선을 유지합니다."],
    '지원력': ["기초적인 버프와 치유를 제공합니다.", "단일 대상 케어에 특화되어 있습니다.", "공격과 수비 밸런스가 잡힌 지원가입니다.", "강력한 버프와 힐로 파티를 캐리합니다.", "파티를 불사신으로 만드는 신의 대리인입니다."],
    '기동성': ["시전 시간이 길어 움직임이 제한적입니다.", "안전한 위치를 잡기 위한 이동기가 있습니다.", "아군을 따라다니기에 부족함이 없습니다.", "위기에 처한 아군에게 즉시 날아갑니다.", "전장 전체를 커버하는 압도적 기동성입니다."],
    '조작 난이도': ["힐과 버프만 주면 되는 쉬운 난이도입니다.", "아군의 체력바만 잘 보면 됩니다.", "적의 패턴을 끊는 센스가 필요합니다.", "자원 관리와 버프 타이밍이 핵심입니다.", "전황 전체를 읽고 지휘해야 하는 사령관입니다."]
  }
};

// Role Details for Modal
const ROLE_INFO: Record<RoleType, { label: string; engLabel: string; icon: React.ElementType; desc: string }> = {
  TANK: {
    label: '탱커',
    engLabel: 'Tanker',
    icon: Shield,
    desc: `
      <span class="hidden md:block">
        최전선에서 적의 공격을 받아내며<br/>아군을 보호하는 든든한 방패입니다.<br/>높은 생존력과 군중 제어기로 전선을 유지합니다.
      </span>
      <span class="md:hidden">
        최전선에서 적의 공격을 받아내며<br/>
        아군을 보호하는 든든한 방패입니다.<br/>
        높은 생존력과 군중 제어기로<br/>
        전선을 유지합니다.
      </span>
    `
  },
  DEALER: {
    label: '딜러',
    engLabel: 'Dealer',
    icon: Swords,
    desc: `
      <span class="hidden md:block">
        강력한 공격으로 적을 제압하는<br/>파티의 핵심 공격수입니다.<br/>다양한 거리와 방식의 전투 스타일로 적을 섬멸합니다.
      </span>
      <span class="md:hidden">
        강력한 공격으로 적을 제압하는<br/>
        파티의 핵심 공격수입니다.<br/>
        다양한 거리와 방식의 전투 스타일로<br/>
        적을 섬멸합니다.
      </span>
    `
  },
  SUPPORT: {
    label: '서포터',
    engLabel: 'Supporter',
    icon: Heart,
    desc: `
      <span class="hidden md:block">
        치유와 강화를 통해 아군을 돕는<br/>전장의 지휘자입니다.<br/>파티원의 생존을 책임지고 능력을 극대화합니다.
      </span>
      <span class="md:hidden">
        치유와 강화를 통해 아군을 돕는<br/>
        전장의 지휘자입니다.<br/>
        파티원의 생존을 책임지고<br/>
        능력을 극대화합니다.
      </span>
    `
  }
};

type FilterMode = 'ROLE' | 'NATION';

const ClassSystem: React.FC<ClassSystemProps> = ({ selectedRole, onRoleChange }) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('ROLE');
  const [selectedNation, setSelectedNation] = useState<NationType>('WEST');
  const [selectedClassId, setSelectedClassId] = useState<string>('iron-fort'); 
  const [viewingNation, setViewingNation] = useState<NationType | null>(null);
  const [viewingRole, setViewingRole] = useState<RoleType | null>(null);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<{ subject: string; value: number; description: string } | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Generate random stars for this section
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() < 0.4 ? 2 : 1.5,
      animationDelay: `${Math.random() * 4}s`,
      opacity: 0.2 + Math.random() * 0.6
    }));
  }, []);

  // Sync initial class when role changes from props (e.g. initial load)
  useEffect(() => {
    if (filterMode === 'ROLE') {
      const firstInRole = CLASSES.find(c => c.role === selectedRole);
      if (firstInRole && selectedClassId !== firstInRole.id) {
         const currentClass = CLASSES.find(c => c.id === selectedClassId);
         if (currentClass?.role !== selectedRole) {
            setSelectedClassId(firstInRole.id);
         }
      }
    }
  }, [selectedRole, filterMode]);

  const filteredClasses = filterMode === 'ROLE'
    ? CLASSES.filter(c => c.role === selectedRole)
    : CLASSES.filter(c => c.nation === selectedNation);

  useEffect(() => {
    const currentClass = CLASSES.find(c => c.id === selectedClassId);
    let isValid = false;

    if (filterMode === 'ROLE') {
      isValid = currentClass?.role === selectedRole;
    } else {
      isValid = currentClass?.nation === selectedNation;
    }

    if (!isValid && filteredClasses.length > 0) {
      setSelectedClassId(filteredClasses[0].id);
    }
  }, [filterMode, selectedRole, selectedNation, filteredClasses]);

  const selectedClass = CLASSES.find(c => c.id === selectedClassId) || filteredClasses[0] || CLASSES[0];

  useEffect(() => {
    setCurrentImageIndex(0);
    setHoveredStat(null);
  }, [selectedClassId]);

  const handleClassClick = (id: string) => {
    setSelectedClassId(id);
    if (window.innerWidth < 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateClass = (direction: 'prev' | 'next') => {
    if (filteredClasses.length <= 1) return;
    const currentIndex = filteredClasses.findIndex(c => c.id === selectedClassId);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredClasses.length;
    } else {
      newIndex = (currentIndex - 1 + filteredClasses.length) % filteredClasses.length;
    }
    setSelectedClassId(filteredClasses[newIndex].id);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedClass.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedClass.imageUrls.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedClass.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedClass.imageUrls.length) % selectedClass.imageUrls.length);
    }
  };

  // Touch Handlers for Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Priority: Image/Gender Swipe (if multiple)
    if (selectedClass.imageUrls.length > 1) {
       if (isLeftSwipe) {
          setCurrentImageIndex((prev) => (prev + 1) % selectedClass.imageUrls.length);
          return; 
       }
       if (isRightSwipe) {
          setCurrentImageIndex((prev) => (prev - 1 + selectedClass.imageUrls.length) % selectedClass.imageUrls.length);
          return;
       }
    }

    // Fallback: Class Swipe (only if single image, or use arrows at bottom for class)
    if (isLeftSwipe) navigateClass('next');
    if (isRightSwipe) navigateClass('prev');
  };

  // --- Theme Logic ---

  // Determine colors based on active filter mode
  const getTheme = (mode: FilterMode, role: RoleType, nation: NationType) => {
    if (mode === 'ROLE') {
      // Original Role Colors
      switch (role) {
        case 'TANK': 
          return {
            main: 'bg-blue-600',
            text: 'text-blue-400',
            border: 'border-blue-500',
            glow: 'bg-blue-600',
            shadow: 'shadow-[inset_0_0_20px_rgba(59,130,246,0.5)]',
            radarFill: '#3b82f6',
            radarStroke: '#3b82f6',
            badgeBg: 'bg-blue-600',
            badgeBorder: 'border-blue-400'
          };
        case 'DEALER': 
          return {
            main: 'bg-red-600',
            text: 'text-red-400',
            border: 'border-red-600',
            glow: 'bg-red-600',
            shadow: 'shadow-[inset_0_0_20px_rgba(220,38,38,0.5)]',
            radarFill: '#dc2626',
            radarStroke: '#dc2626',
            badgeBg: 'bg-red-600',
            badgeBorder: 'border-red-400'
          };
        case 'SUPPORT': 
          return {
            main: 'bg-yellow-500',
            text: 'text-yellow-400',
            border: 'border-yellow-500',
            glow: 'bg-yellow-500',
            shadow: 'shadow-[inset_0_0_20px_rgba(234,179,8,0.5)]',
            radarFill: '#FFD700',
            radarStroke: '#FFD700',
            badgeBg: 'bg-yellow-500',
            badgeBorder: 'border-yellow-400'
          };
      }
    } else {
      // Nation Colors
      switch (nation) {
        case 'EAST': // Green (Emerald)
          return {
            main: 'bg-emerald-600',
            text: 'text-emerald-400',
            border: 'border-emerald-500',
            glow: 'bg-emerald-600',
            shadow: 'shadow-[inset_0_0_20px_rgba(16,185,129,0.5)]',
            radarFill: '#10b981',
            radarStroke: '#10b981',
            badgeBg: 'bg-emerald-600',
            badgeBorder: 'border-emerald-400'
          };
        case 'WEST': // Blue
          return {
            main: 'bg-blue-600',
            text: 'text-blue-400',
            border: 'border-blue-500',
            glow: 'bg-blue-600',
            shadow: 'shadow-[inset_0_0_20px_rgba(59,130,246,0.5)]',
            radarFill: '#3b82f6',
            radarStroke: '#3b82f6',
            badgeBg: 'bg-blue-600',
            badgeBorder: 'border-blue-400'
          };
        case 'SOUTH': // Purple (Violet)
          return {
            main: 'bg-violet-600',
            text: 'text-violet-400',
            border: 'border-violet-600',
            glow: 'bg-violet-600',
            shadow: 'shadow-[inset_0_0_20px_rgba(139,92,246,0.5)]',
            radarFill: '#8b5cf6',
            radarStroke: '#8b5cf6',
            badgeBg: 'bg-violet-600',
            badgeBorder: 'border-violet-400'
          };
      }
    }
  };

  const theme = getTheme(filterMode, selectedRole, selectedNation);
  
  // --- Navigation Items ---

  const ROLE_NAV_ITEMS = [
    { id: 'TANK' as RoleType, label: '탱커', icon: Shield, color: 'bg-blue-600', text: 'text-blue-400' },
    { id: 'DEALER' as RoleType, label: '딜러', icon: Swords, color: 'bg-red-600', text: 'text-red-400' },
    { id: 'SUPPORT' as RoleType, label: '서포터', icon: Heart, color: 'bg-yellow-500', text: 'text-yellow-400' },
  ];

  const NATION_NAV_ITEMS = [
    { id: 'EAST' as NationType, label: '동방 제국', icon: Mountain, color: 'bg-emerald-600', text: 'text-emerald-400' },
    { id: 'WEST' as NationType, label: '서부 연방', icon: Cog, color: 'bg-blue-600', text: 'text-blue-400' },
    { id: 'SOUTH' as NationType, label: '남부 왕국', icon: Skull, color: 'bg-violet-600', text: 'text-violet-400' },
  ];

  const handleNavClick = (type: 'ROLE' | 'NATION', id: string) => {
    setFilterMode(type);
    if (type === 'ROLE') {
      onRoleChange(id as RoleType);
    } else {
      setSelectedNation(id as NationType);
      
      // Update role state mainly for data purposes, but background will be handled by Nation mode logic now
      if (id === 'WEST') onRoleChange('TANK');
      else if (id === 'SOUTH') onRoleChange('DEALER');
      else if (id === 'EAST') onRoleChange('SUPPORT');
    }
  };

  // --- Radar Chart Data ---
  const radarData = [
    { subject: '공격력', A: selectedClass.stats.attack, fullMark: 100 },
    { subject: '방어력', A: selectedClass.stats.defense, fullMark: 100 },
    { subject: '지원력', A: selectedClass.stats.support, fullMark: 100 },
    { subject: '기동성', A: selectedClass.stats.mobility, fullMark: 100 },
    { subject: '조작 난이도', A: selectedClass.stats.difficulty, fullMark: 100 },
  ];

  const getLevelIndex = (value: number) => {
    if (value <= 20) return 0;
    if (value <= 40) return 1;
    if (value <= 60) return 2;
    if (value <= 80) return 3;
    return 4; 
  };

  const CustomTick = ({ payload, x, y, textAnchor, ...props }: any) => {
    const dataEntry = radarData.find(d => d.subject === payload.value);
    const value = dataEntry ? dataEntry.A : 0;
    const isHovered = hoveredStat?.subject === payload.value;
    const isMultiLine = payload.value === '조작 난이도';
    
    return (
      <g 
        className="group cursor-help"
        onMouseEnter={() => {
           const descriptions = STAT_DESCRIPTIONS[selectedClass.role][payload.value];
           const desc = descriptions ? descriptions[getLevelIndex(value)] : '';
           setHoveredStat({ subject: payload.value, value, description: desc });
        }}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <text
          {...props}
          x={x}
          y={y}
          textAnchor={textAnchor}
          stroke="none"
          fill="#ffffff"
          className={`text-xs md:text-sm font-bold transition-colors duration-200 ${isHovered ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`}
        >
          {isMultiLine ? <><tspan x={x} dy="-0.4em">조작</tspan><tspan x={x} dy="1.2em">난이도</tspan></> : payload.value}
        </text>
        <rect x={x - 20} y={y - 10} width="40" height="20" fill="transparent" />
      </g>
    );
  };

  // Background layers
  const ROLE_BG_LAYERS = {
    TANK: "bg-gradient-to-b from-midnight via-[#0a1533] to-[#1c3d8a]",    
    DEALER: "bg-gradient-to-b from-midnight via-[#260505] to-[#450a0a]",  
    SUPPORT: "bg-gradient-to-b from-midnight via-[#1f1a05] to-[#423805]"  
  };

  const NATION_BG_LAYERS = {
    WEST: "bg-gradient-to-b from-midnight via-[#0a1533] to-[#1c3d8a]", // Blue
    SOUTH: "bg-gradient-to-b from-midnight via-[#1a051a] to-[#3b0764]", // Purple/Violet
    EAST: "bg-gradient-to-b from-midnight via-[#062c19] to-[#064e3b]" // Green
  };

  const getNationInfo = (nation: NationType) => {
    switch(nation) {
      case 'EAST': return { icon: Mountain, name: '동방 제국', color: 'text-emerald-400' };
      case 'WEST': return { icon: Cog, name: '서부 연방', color: 'text-blue-400' };
      case 'SOUTH': return { icon: Skull, name: '남부 왕국', color: 'text-violet-400' };
    }
  };
  const nationInfo = getNationInfo(selectedClass.nation);
  const roleInfo = ROLE_INFO[selectedClass.role];
  
  const hasMultipleImages = selectedClass.imageUrls.length > 1;

  // Render Sidebar Helper
  const renderSidebar = (type: 'ROLE' | 'NATION') => {
    const items = type === 'ROLE' ? ROLE_NAV_ITEMS : NATION_NAV_ITEMS;
    const activeId = type === 'ROLE' ? selectedRole : selectedNation;
    const isModeActive = filterMode === type;

    return (
      <div className={`hidden lg:flex flex-col items-center gap-4 relative py-4 px-2 transition-opacity duration-500 ${isModeActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
        
        {items.map((item) => {
          const isActive = item.id === activeId && isModeActive;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(type, item.id)}
              className={`
                group relative h-14 flex items-center justify-center rounded-full transition-all duration-300 z-10 overflow-hidden
                ${isActive ? 'w-40' : 'w-14 hover:w-40'}
                ${isActive ? '' : 'bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/30'}
              `}
            >
              {/* Icon Container - Always centered relative to its flex box, but margin applied if text visible */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                ${isActive ? `${item.color} text-white shadow-[0_0_15px_rgba(255,255,255,0.5)]` : `text-gray-400 group-hover:text-white`}
              `}>
                <item.icon size={20} />
              </div>

              {/* Text Container - Centered Alignment */}
              <div className={`
                whitespace-nowrap overflow-hidden transition-all duration-300 flex flex-col items-start justify-center
                ${isActive ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0 ml-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-3'}
              `}>
                <span className={`text-sm font-bold font-serif ${isActive ? 'text-white' : item.text}`}>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // Helper to render nation detail modal
  const renderNationModal = () => {
    if (!viewingNation) return null;

    let content = {
        icon: Mountain,
        name: '',
        engName: '',
        desc: '',
        colorClass: '',
        borderClass: '',
        shadowClass: '',
        glowClass: '',
        textClass: '',
        iconColor: '',
    };

    if (viewingNation === 'EAST') {
        content = {
            icon: Mountain,
            name: '동방 제국',
            engName: 'Eastern Empire',
            desc: `
                <span class="hidden md:block">
                    자연과 조화를 이루는 무술과 정령술의 본고장.<br/>
                    울창한 산림 속에 가려진 신비로운 힘을 숭상하며,<br/>
                    고대의 전통을 지키는 무인들의 나라입니다.
                </span>
                <span class="md:hidden">
                    자연과 조화를 이루는<br/>
                    무술과 정령술의 본고장.<br/>
                    울창한 산림 속에 가려진<br/>
                    신비로운 힘을 숭상하며,<br/>
                    고대의 전통을 지키는<br/>
                    무인들의 나라입니다.
                </span>
            `,
            colorClass: 'bg-emerald-500',
            borderClass: 'border-emerald-400/80',
            shadowClass: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
            glowClass: 'bg-emerald-500/40',
            textClass: 'text-emerald-400',
            iconColor: 'text-emerald-500',
        };
    } else if (viewingNation === 'WEST') {
        content = {
            icon: Cog,
            name: '서부 연방',
            engName: 'Western Federation',
            desc: `
                <span class="hidden md:block">
                    증기기관과 마도공학이 융합된 강철의 대지.<br/>
                    하늘을 뒤덮은 공장 연기와<br/>
                    거대한 톱니바퀴가 돌아가는,<br/>
                    혁신과 이성의 산업 국가입니다.
                </span>
                <span class="md:hidden">
                    증기기관과 마도공학이 융합된<br/>
                    강철의 대지.<br/>
                    하늘을 뒤덮은 공장 연기와<br/>
                    거대한 톱니바퀴가 돌아가는,<br/>
                    혁신과 이성의 산업 국가입니다.
                </span>
            `,
            colorClass: 'bg-blue-500',
            borderClass: 'border-blue-400/80',
            shadowClass: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
            glowClass: 'bg-blue-500/40',
            textClass: 'text-blue-400',
            iconColor: 'text-blue-500',
        };
    } else if (viewingNation === 'SOUTH') {
        content = {
            icon: Skull,
            name: '남부 왕국',
            engName: 'Southern Kingdom',
            desc: `
                <span class="hidden md:block">
                    흑마법과 고딕 양식이 지배하는 어둠의 대륙.<br/>
                    악마의 힘마저 통제하여 힘으로 승화시킨,<br/>
                    귀족들의 냉혹하지만 강력한 국가입니다.
                </span>
                <span class="md:hidden">
                    흑마법과 고딕 양식이 지배하는<br/>
                    어둠의 대륙.<br/>
                    악마의 힘마저 통제하여 힘으로 승화시킨,<br/>
                    귀족들의 냉혹하지만 강력한 국가입니다.
                </span>
            `,
            colorClass: 'bg-violet-600',
            borderClass: 'border-violet-500/80',
            shadowClass: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
            glowClass: 'bg-violet-600/40',
            textClass: 'text-violet-500',
            iconColor: 'text-violet-600',
        };
    }

    const nationClasses = CLASSES.filter(c => c.nation === viewingNation);
    const gridCols = 'grid-cols-2';

    const handleModalClassClick = (classId: string) => {
        setFilterMode('NATION');
        setSelectedNation(viewingNation);
        setSelectedClassId(classId);
        setViewingNation(null);
    };

    return (
        <div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setViewingNation(null)}
        >
             <div 
                className="relative w-full max-w-md group"
                onClick={(e) => e.stopPropagation()}
             >
                 {/* Undulating Glow Effect */}
                 <div className={`absolute -inset-1 rounded-xl blur-xl opacity-100 animate-pulse ${content.glowClass}`}></div>
                 
                 {/* Card Content */}
                 <div className={`relative w-full h-auto overflow-hidden rounded-xl bg-black border p-8 shadow-lg ${content.borderClass} ${content.shadowClass} flex flex-col`}>
                    {/* Close Button */}
                    <button 
                        onClick={() => setViewingNation(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
                    >
                        <X size={24} />
                    </button>

                    <div className={`absolute top-0 right-0 p-4 opacity-30 scale-110 pointer-events-none`}>
                      <content.icon size={80} className={content.iconColor} />
                    </div>
                    <div className="relative z-10">
                        <h4 className={`${content.textClass} font-bold text-2xl mb-1 flex items-center gap-3`}>
                            <content.icon size={24} />
                            {content.name}
                        </h4>
                        <p className={`text-xs uppercase tracking-[0.2em] mb-6 font-sans opacity-60 text-white`}>{content.engName}</p>
                        <div className={`h-px mb-6 w-full ${content.colorClass}`}></div>
                        <p className="text-base leading-relaxed font-sans text-gray-200" dangerouslySetInnerHTML={{ __html: content.desc }}></p>
                        
                        {/* Class List Section */}
                        <div className="mt-8">
                             <h5 className={`text-xs font-bold uppercase tracking-widest mb-3 ${content.textClass} border-b border-white/10 pb-2`}>
                                소속 클래스
                             </h5>
                             <div className={`grid ${gridCols} gap-3`}>
                                {nationClasses.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => handleModalClassClick(c.id)}
                                        className={`
                                            text-left px-3 py-2 rounded border border-white/5 bg-white/5 
                                            hover:bg-white/10 hover:border-white/20 transition-all duration-200
                                            flex items-center gap-2 group/btn
                                        `}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            c.role === 'TANK' ? 'bg-blue-500' : 
                                            c.role === 'DEALER' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}></div>
                                        <span className="text-gray-300 group-hover/btn:text-white text-xs md:text-sm font-serif truncate">
                                            {c.name}
                                        </span>
                                    </button>
                                ))}
                             </div>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    );
  };

  // Helper to render role detail modal
  const renderRoleModal = () => {
    if (!viewingRole) return null;

    const info = ROLE_INFO[viewingRole];
    let themeColors = {
      bg: 'bg-gray-800',
      border: 'border-gray-600',
      text: 'text-gray-200',
      glow: 'bg-gray-500/40',
      shadow: 'shadow-lg'
    };

    switch(viewingRole) {
      case 'TANK':
        themeColors = {
          bg: 'bg-blue-600',
          border: 'border-blue-400/80',
          text: 'text-blue-400',
          glow: 'bg-blue-600/40',
          shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]'
        };
        break;
      case 'DEALER':
        themeColors = {
          bg: 'bg-red-600',
          border: 'border-red-500/80',
          text: 'text-red-500',
          glow: 'bg-red-600/40',
          shadow: 'shadow-[0_0_30px_rgba(220,38,38,0.3)]'
        };
        break;
      case 'SUPPORT':
        themeColors = {
          bg: 'bg-yellow-500',
          border: 'border-yellow-400/80',
          text: 'text-yellow-400',
          glow: 'bg-yellow-500/40',
          shadow: 'shadow-[0_0_30px_rgba(234,179,8,0.3)]'
        };
        break;
    }

    return (
      <div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setViewingRole(null)}
      >
           <div 
              className="relative w-full max-w-md group"
              onClick={(e) => e.stopPropagation()}
           >
               {/* Undulating Glow Effect */}
               <div className={`absolute -inset-1 rounded-xl blur-xl opacity-100 animate-pulse ${themeColors.glow}`}></div>
               
               {/* Card Content */}
               <div className={`relative w-full h-auto overflow-hidden rounded-xl bg-black border p-8 shadow-lg ${themeColors.border} ${themeColors.shadow} flex flex-col`}>
                  {/* Close Button */}
                  <button 
                      onClick={() => setViewingRole(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
                  >
                      <X size={24} />
                  </button>

                  <div className={`absolute top-0 right-0 p-4 opacity-30 scale-110 pointer-events-none`}>
                    <info.icon size={80} className={themeColors.text} />
                  </div>
                  <div className="relative z-10">
                      <h4 className={`${themeColors.text} font-bold text-2xl mb-1 flex items-center gap-3`}>
                          <info.icon size={24} />
                          {info.label}
                      </h4>
                      <p className={`text-xs uppercase tracking-[0.2em] mb-6 font-sans opacity-60 text-white`}>{info.engLabel}</p>
                      <div className={`h-px mb-6 w-full ${themeColors.bg}`}></div>
                      <p className="text-base leading-relaxed font-sans text-gray-200" dangerouslySetInnerHTML={{ __html: info.desc }}></p>
                  </div>
               </div>
           </div>
      </div>
    );
  };

  return (
    <section id="class" className="py-24 px-4 md:px-12 relative border-t border-white/5 overflow-hidden">
       {/* Background Layer Container */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-midnight"></div>
          
          {/* Render Backgrounds based on Mode */}
          {filterMode === 'ROLE' ? (
            (['TANK', 'DEALER', 'SUPPORT'] as RoleType[]).map((role) => (
              <div
                key={role}
                className={`
                  absolute inset-0 ${ROLE_BG_LAYERS[role]} 
                  transition-opacity duration-[2000ms] ease-in-out will-change-[opacity]
                  ${selectedRole === role ? 'opacity-100' : 'opacity-0'}
                `}
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent animate-pulse duration-[4000ms]"></div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-y-full animate-[fadeInUp_8s_infinite_ease-in-out] opacity-30"></div>
              </div>
            ))
          ) : (
            (['EAST', 'WEST', 'SOUTH'] as NationType[]).map((nation) => (
              <div
                key={nation}
                className={`
                  absolute inset-0 ${NATION_BG_LAYERS[nation]} 
                  transition-opacity duration-[2000ms] ease-in-out will-change-[opacity]
                  ${selectedNation === nation ? 'opacity-100' : 'opacity-0'}
                `}
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent animate-pulse duration-[4000ms]"></div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-y-full animate-[fadeInUp_8s_infinite_ease-in-out] opacity-30"></div>
              </div>
            ))
          )}
       </div>

       {/* Stars Layer */}
       <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
           <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.animationDelay,
              opacity: star.opacity,
            }}
          />
        ))}
       </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-gold font-serif text-sm tracking-[0.3em] uppercase mb-2">Class System</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white font-bold">운명을 선택하라</h3>
          {/* Diamond Divider with Animation */}
          <div className="flex items-center justify-center gap-4 mt-6">
             <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-right" style={{ animationDelay: '600ms' }}></div>
             <div className="w-1.5 h-1.5 bg-gold opacity-0 animate-diamond-pop" style={{ animationDelay: '400ms' }}></div>
             <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 animate-[expandX_1s_ease-out_forwards] origin-left" style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>

        {/* Mobile/Tablet Controls Container */}
        <div className="lg:hidden flex flex-col items-center mb-8 gap-4 w-full px-4">
            
            {/* 1. Mode Switcher (Nation vs Role) */}
            <div className="flex bg-black/40 rounded-full p-1 border border-white/10">
                <button 
                    onClick={() => setFilterMode('NATION')} 
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filterMode === 'NATION' ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                    대륙별
                </button>
                <button 
                    onClick={() => setFilterMode('ROLE')} 
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filterMode === 'ROLE' ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                    직업별
                </button>
            </div>

            {/* 2. Sub-Selection Buttons (Specific Nations or Roles) */}
            <div className="flex flex-wrap justify-center gap-2 w-full">
                {filterMode === 'ROLE' ? (
                    ROLE_NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick('ROLE', item.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300
                                ${selectedRole === item.id 
                                    ? `${item.color} text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]` 
                                    : 'bg-black/40 text-gray-500 border-white/5 hover:bg-black/60 hover:text-gray-300'}
                            `}
                        >
                            <item.icon size={16} />
                            <span className="text-xs font-bold">{item.label}</span>
                        </button>
                    ))
                ) : (
                    NATION_NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick('NATION', item.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300
                                ${selectedNation === item.id 
                                    ? `${item.color} text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]` 
                                    : 'bg-black/40 text-gray-500 border-white/5 hover:bg-black/60 hover:text-gray-300'}
                            `}
                        >
                            <item.icon size={16} />
                            <span className="text-xs font-bold">{item.label}</span>
                        </button>
                    ))
                )}
            </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 relative">
          
          {/* Nation Modal Overlay */}
          {renderNationModal()}
          
          {/* Role Modal Overlay */}
          {renderRoleModal()}

          {/* Left Sidebar: Nations */}
          <div className="hidden lg:block sticky top-24">
             {renderSidebar('NATION')}
          </div>

          {/* Center Content Area - Applied theme.shadow here */}
          <div className="flex-1 w-full max-w-7xl">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 glass-panel rounded-xl overflow-hidden min-h-[600px] transition-all duration-500 ${theme.shadow}`}>
              
              {/* Middle: Character Image */}
              <div 
                ref={detailRef} 
                className="lg:col-span-5 lg:order-2 relative flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] group order-1 touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                {/* Glow matches the Theme color */}
                <div className={`absolute w-[400px] h-[400px] rounded-full filter blur-[80px] opacity-20 z-0 transition-colors duration-1000 ${theme.glow}`}></div>
                
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img 
                    key={selectedClass.imageUrls[currentImageIndex]} 
                    src={selectedClass.imageUrls[currentImageIndex]} 
                    alt={selectedClass.name}
                    className="max-h-[500px] w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in-up transition-opacity duration-300"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in'
                    }}
                  />
                  
                  {hasMultipleImages && (
                    <>
                      <button 
                        onClick={prevImage}
                        className={`
                          absolute left-2 top-1/2 -translate-y-1/2 
                          p-2 md:p-3 
                          rounded-full border-2 ${theme.border} ${theme.text} 
                          hover:bg-white hover:text-black 
                          transition-all backdrop-blur-md z-30 shadow-lg
                          lg:opacity-0 lg:group-hover:opacity-100
                        `}
                      >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className={`
                          absolute right-2 top-1/2 -translate-y-1/2 
                          p-2 md:p-3 
                          rounded-full border-2 ${theme.border} ${theme.text} 
                          hover:bg-white hover:text-black 
                          transition-all backdrop-blur-md z-30 shadow-lg
                          lg:opacity-0 lg:group-hover:opacity-100
                        `}
                      >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                      </button>
                      
                      {/* Gender/Image Indicators - Enhanced for visibility */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                          {selectedClass.imageUrls.map((_, idx) => (
                            <button 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                              className={`
                                h-4 rounded-full border-[3px] border-white shadow-lg transition-all duration-300 
                                ${idx === currentImageIndex 
                                  ? `w-12 ${theme.main}` 
                                  : 'w-4 bg-black/60 hover:bg-white/80'}
                              `}
                              aria-label={`Select image ${idx + 1}`}
                            />
                          ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Class Navigation Arrows (Visible only on < lg) */}
                <div className="lg:hidden absolute bottom-4 w-full px-4 flex justify-between items-center z-30 pointer-events-none">
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateClass('prev'); }}
                    className={`pointer-events-auto w-10 h-10 rounded-full bg-black/60 border ${theme.border} flex items-center justify-center ${theme.text} hover:bg-white hover:text-black transition-colors`}
                    aria-label="Previous Class"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateClass('next'); }}
                    className={`pointer-events-auto w-10 h-10 rounded-full bg-black/60 border ${theme.border} flex items-center justify-center ${theme.text} hover:bg-white hover:text-black transition-colors`}
                    aria-label="Next Class"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

              </div>

              {/* Right: Info & Stats */}
              <div className="lg:col-span-4 lg:order-3 p-8 flex flex-col justify-center bg-gradient-to-bl from-white/5 to-transparent order-2">
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-4">
                    {/* Role Badge - Clickable for popup */}
                    <button
                        onClick={() => setViewingRole(selectedClass.role)}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white rounded-sm ${theme.badgeBg} hover:brightness-110 hover:scale-105 transition-all shadow-md cursor-pointer`}
                        title="직업 정보 보기"
                    >
                       <span>{selectedClass.role === 'TANK' ? '탱커' : selectedClass.role === 'DEALER' ? '딜러' : '서포터'}</span>
                       <roleInfo.icon size={14} className="text-white" />
                    </button>

                    {hasMultipleImages && (
                        <span className={`inline-block px-3 py-1 text-xs font-bold border rounded-sm ${theme.text} ${theme.border} bg-black/40 flex items-center gap-1`}>
                          <Users size={12} />
                          Gender Selectable
                        </span>
                    )}
                  </div>
                  
                  <div className="flex items-end gap-3 mb-1">
                    <h2 className="text-4xl font-serif text-white font-bold">{selectedClass.name}</h2>
                    
                    {/* Nation Icon with Tooltip & Click Handler */}
                    <div 
                      className="group relative mb-1 cursor-pointer hover:scale-110 transition-transform duration-300"
                      onClick={() => setViewingNation(selectedClass.nation)}
                      title="국가 정보 보기"
                    >
                        <nationInfo.icon className={`w-6 h-6 ${nationInfo.color}`} />
                        <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-black/90 border border-white/20 text-white text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                          {nationInfo.name}
                        </div>
                    </div>
                  </div>
                  
                  <h3 className={`text-lg italic font-serif mb-6 opacity-80 ${theme.text}`}>"{selectedClass.tagline}"</h3>
                  <p className="text-gray-300 leading-relaxed mb-8 border-l-2 border-white/20 pl-4">
                    {selectedClass.description}
                  </p>
                </div>

                <div className="w-full h-64 relative">
                  {hoveredStat && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-fade-in-up">
                        <div className="bg-midnight/95 backdrop-blur-md p-6 rounded-full border border-white/20 text-center max-w-[280px] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                          <div className={`text-xs font-bold mb-1 uppercase tracking-widest ${theme.text}`}>
                            {hoveredStat.subject} Lv.{getLevelIndex(hoveredStat.value) + 1}
                          </div>
                          <div className="w-8 h-1 mx-auto mb-3 bg-white/20 rounded-full"></div>
                          <p className="text-white text-sm font-medium leading-relaxed break-keep">
                            "{hoveredStat.description}"
                          </p>
                        </div>
                    </div>
                  )}
                  
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" tick={<CustomTick />} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={selectedClass.name}
                        dataKey="A"
                        stroke={theme.radarStroke}
                        strokeWidth={2}
                        fill={theme.radarFill}
                        fillOpacity={hoveredStat ? 0.1 : 0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  
                  {!hoveredStat && (
                    <div className="absolute bottom-0 right-0 text-xs text-gray-600 flex items-center gap-1 opacity-50">
                      <Info size={12} />
                      <span>항목에 마우스를 올려보세요</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                    <span className="text-gray-500">주무기</span>
                    <span className={`font-serif ${theme.text}`}>{selectedClass.weapon}</span>
                </div>
              </div>

              {/* Left: Class List */}
              <div className="lg:col-span-3 lg:order-1 bg-black/20 p-4 lg:border-r border-t lg:border-t-0 border-white/5 overflow-y-auto max-h-[600px] order-3">
                 <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                       {filterMode === 'ROLE' ? 'Class List' : 'Nation List'}
                    </span>
                    <span className={`text-xs font-bold ${theme.text}`}>
                       {filterMode === 'ROLE' 
                          ? (selectedRole === 'TANK' ? '탱커' : selectedRole === 'DEALER' ? '딜러' : '서포터') 
                          : nationInfo.name
                       }
                    </span>
                 </div>
                 {/* Changed to 1 column layout for all modes */}
                 <div className="grid grid-cols-1 gap-2">
                   {filteredClasses.length > 0 ? (
                     filteredClasses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleClassClick(c.id)}
                        className={`
                          w-full text-left p-3 rounded-lg transition-all border-l-4
                          flex flex-col justify-center min-h-[80px]
                          ${selectedClassId === c.id 
                            ? `border-${theme.border.replace('border-', '')} bg-white/10 text-white` 
                            : 'border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}
                        `}
                      >
                        <span className="font-serif font-bold text-sm md:text-base flex items-center gap-1 mb-1">
                          {c.name}
                          {c.imageUrls.length > 1 && <Users size={12} className={theme.text} />}
                        </span>
                        <span className="text-[10px] md:text-xs font-sans uppercase tracking-wider opacity-60 truncate w-full">{c.weapon}</span>
                      </button>
                     ))
                   ) : (
                     <div className="col-span-2 p-8 text-center text-gray-500 text-sm">
                       해당 분류에 클래스가 없습니다.
                     </div>
                   )}
                 </div>
              </div>

            </div>
          </div>

          {/* Right Sidebar: Roles */}
          <div className="hidden lg:block sticky top-24">
             {renderSidebar('ROLE')}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClassSystem;