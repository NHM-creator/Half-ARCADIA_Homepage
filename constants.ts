import { ClassData, FeatureData } from './types';

export const HERO_VIDEO_PLACEHOLDER = "https://i.postimg.cc/7Pm9n7Rb/aleukadia-mein-beulleo.png"; 

export const FEATURES: FeatureData[] = [
  {
    id: 'raid',
    title: '군단장 레이드',
    subtitle: '아르카디아의 꽃이자, 도전의 끝\n"실수는 용납되지 않습니다. 증명하십시오."',
    description: '차원의 균열을 뚫고 세상을 멸망시키려는 혼돈의 군단이 침공합니다. 군단장들에 맞서 4인 수호자 혹은 8인의 수호자들로 구성된 공격대를 결성하십시오. 숨 막히는 패턴, 치명적인 즉사 기믹 파훼, 압도적인 연출. 생존과 승리는 오직 동료들을 향한 완벽한 신뢰에 달려있습니다.',
    icon: 'Sword',
    imageUrl: 'https://i.postimg.cc/4xFJ4mC9/군단장_레이드_1.png',
    hoverImageUrl: 'https://i.postimg.cc/NjPgG5hL/군단장_레이드_2.png'
  },
  {
    id: 'guild',
    title: '길드 & 영지',
    subtitle: '전설이 시작되는 거점\n"혼자서는 영웅이지만, 함께라면 신화가 됩니다."',
    description: '플레이어들의 독립 조직인 \'길드\'를 창설하고, 길드원들만이 방문할 수 있는 독립된 섬을 하사받으십시오. 단순한 친목을 넘어, 상위 길드를 목표로 한다면 치열한 \'길드 대항전\'의 핵심 거점이 될 것입니다.',
    icon: 'Home',
    imageUrl: 'https://i.postimg.cc/mg6bZtxr/길드영지_1.png',
    hoverImageUrl: 'https://i.postimg.cc/W1f2phRh/길드영지_2.png'
  },
  {
    id: 'avatar',
    title: '아바타 공방 & 마켓',
    subtitle: '상상 그 이상의 스타일\n"당신의 모습 그 자체가 또 하나의 무기입니다."',
    description: '\'아바타 공방\'에서 의상의 질감, 패턴, 염색까지 세밀하게 조정하여 세상에 단 하나뿐인 디자인을 완성하십시오. 직접 제작한 아바타는 \'패션 마켓\'을 통해 다른 수호자들과 거래할 수 있습니다.',
    icon: 'Palette',
    imageUrl: 'https://i.postimg.cc/x1T343LF/공방_3.png',
    hoverImageUrl: 'https://i.postimg.cc/Njfkzk1B/공방_2.png'
  }
];

export const CLASSES: ClassData[] = [
  // TANKS
  {
    id: 'iron-fort',
    name: '아이언 포트',
    role: 'TANK',
    nation: 'WEST',
    tagline: '강철의 절대 요새',
    weapon: '타워 실드 & 건랜스',
    description: '기동성을 포기한 대신 불굴의 방어력을 손에 넣었습니다. 거대한 마도 방패로 적의 맹공을 막아내고 건랜스의 포격으로 반격하며, 아군에게는 든든한 철옹성이 되어 전선을 사수합니다.',
    stats: { attack: 40, defense: 100, support: 50, mobility: 10, difficulty: 60 },
    imageUrls: ['https://i.postimg.cc/QtdL3CRT/아이언_포트_1.png']
  },
  {
    id: 'crusader',
    name: '크루세이더',
    role: 'TANK',
    nation: 'WEST',
    tagline: '성스러운 선봉장',
    weapon: '성검 & 성물',
    description: '검의 무력과 신성한 치유력을 겸비한 전장의 지휘관입니다. 자가 회복 능력과 광역 보호막으로 최전선에서 아군을 보호하며 끈질기게 적을 압박합니다.',
    stats: { attack: 50, defense: 80, support: 80, mobility: 40, difficulty: 40 },
    imageUrls: [
      'https://i.postimg.cc/tT40jJL6/크루세이더_남성_1.png',
      'https://i.postimg.cc/Px5GjJBZ/크루세이더_여성_1.png'
    ]
  },
  // DEALERS
  {
    id: 'phantom-blade',
    name: '환영검사',
    role: 'DEALER',
    nation: 'EAST',
    tagline: '피로 흩날리는 벚꽃',
    weapon: '일본도',
    description: '눈에 보이지 않는 신속의 검사입니다. 차원을 베어내는 발도술로 적의 공격을 회피하며 쉴 새 없이 몰아칩니다.',
    stats: { attack: 100, defense: 10, support: 10, mobility: 100, difficulty: 95 },
    imageUrls: ['https://i.postimg.cc/mDBLFTKt/환영검사_2.png']
  },
  {
    id: 'archmage',
    name: '아크메이지',
    role: 'DEALER',
    nation: 'SOUTH',
    tagline: '원소의 지배자',
    weapon: '원소 스태프',
    description: '4대 원소의 힘을 자유자재로 다루며 전장에 재앙을 불러옵니다. 주문 영창에는 시간이 걸리지만, 마법이 완성되는 순간 전장은 초토화될 것입니다.',
    stats: { attack: 100, defense: 20, support: 30, mobility: 20, difficulty: 50 },
    imageUrls: ['https://i.postimg.cc/Y9Rp6Jwm/아크메이지_1.png']
  },
  {
    id: 'dual-trigger',
    name: '듀얼 트리거',
    role: 'DEALER',
    nation: 'WEST',
    tagline: '탄환의 춤',
    weapon: '쌍권총 & 라이플',
    description: '쌍권총의 기동성과 라이플의 저격 능력을 모두 갖춘 테크니션입니다. 빗발치는 마탄의 소나기로 적에게 접근할 틈조차 주지 않습니다.',
    stats: { attack: 80, defense: 30, support: 10, mobility: 80, difficulty: 80 },
    imageUrls: ['https://i.postimg.cc/63tWGBFq/듀얼_트리거_2.png']
  },
  {
    id: 'night-walker',
    name: '어쎄신',
    role: 'DEALER',
    nation: 'EAST',
    tagline: '죽음의 그림자',
    weapon: '단검 & 그림자',
    description: '그림자 속에 숨어들어 적의 숨통을 끊는 암살자입니다. 배후 습격과 은신에 특화되어 있으며, 누구도 눈치채지 못하게 핵심 표적을 제거합니다.',
    stats: { attack: 90, defense: 20, support: 10, mobility: 90, difficulty: 85 },
    imageUrls: ['https://i.postimg.cc/26GzQPfL/어쎄신_2.png']
  },
  {
    id: 'grim-reaper',
    name: '그림 리퍼',
    role: 'DEALER',
    nation: 'SOUTH',
    tagline: '영혼의 수확자',
    weapon: '대형 낫',
    description: '거대한 낫으로 영혼을 수확하여 악마의 형상으로 각성합니다. 사신과도 같은 위압감으로 적의 전의를 상실케 하는 중거리 딜러입니다.',
    stats: { attack: 85, defense: 40, support: 20, mobility: 60, difficulty: 50 },
    imageUrls: ['https://i.postimg.cc/4dsfhXjn/그림_리퍼_1.png']
  },
  // SUPPORTS
  {
    id: 'high-priest',
    name: '하이 프리스트',
    role: 'SUPPORT',
    nation: 'EAST',
    tagline: '구원의 빛',
    weapon: '지팡이 & 성서',
    description: '신의 대리인으로서 아군을 보살핍니다. 강력한 치유 주문과 정화 능력으로 위기에 빠진 파티를 구원하는, 공격대의 없어서는 안 될 심장입니다.',
    stats: { attack: 10, defense: 50, support: 100, mobility: 30, difficulty: 20 },
    imageUrls: [
      'https://i.postimg.cc/ZnF4b2wr/하이_프리스트_남성_1.png',
      'https://i.postimg.cc/KjrxGw0P/하이_프리스트_여성_1.png'
    ]
  },
  {
    id: 'ink-weaver',
    name: '잉크 위버',
    role: 'SUPPORT',
    nation: 'SOUTH',
    tagline: '현실을 그리는 자',
    weapon: '거대 붓',
    description: '거대한 붓으로 전장이라는 캔버스 위에 그림을 그립니다. 먹물로 칠한 영역 위에서 아군을 치유하거나 차원문을 열어 전략적인 위치 선정을 돕습니다.',
    stats: { attack: 30, defense: 40, support: 85, mobility: 60, difficulty: 80 },
    imageUrls: [
      'https://i.postimg.cc/brHpyWmv/잉크_위버_남성_1.png',
      'https://i.postimg.cc/fyjDzp8V/잉크_위버_여성_1.png'
    ]
  },
  {
    id: 'star-gazer',
    name: '스타 게이저',
    role: 'SUPPORT',
    nation: 'SOUTH',
    tagline: '운명을 엮는 자',
    weapon: '천구의 & 카드',
    description: '별의 흐름을 읽고 타로 카드로 운명을 점칩니다. 뽑는 카드에 따라 무작위하지만 강력한 효과를 부여하여, 순식간에 불리한 전황을 뒤집을 수 있습니다.',
    stats: { attack: 25, defense: 30, support: 95, mobility: 40, difficulty: 90 },
    imageUrls: [
      'https://i.postimg.cc/hvbcD62v/스타_게이저_남성_1.png',
      'https://i.postimg.cc/qqX4JS1R/스타_게이저_여성_1.png'
    ]
  }
];