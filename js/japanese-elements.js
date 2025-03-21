/**
 * ジャパンランナー - 日本文化要素の定義
 * 日本文化に関連するゲーム要素を定義するファイル
 */

// 背景テーマの定義
const BACKGROUNDS = {
    // 東京の街並み
    TOKYO: {
        name: '東京',
        description: '東京タワーが見える都市風景',
        elements: [
            { name: 'tokyo_skyline', path: 'assets/images/backgrounds/tokyo_skyline.png' },
            { name: 'tokyo_streets', path: 'assets/images/backgrounds/tokyo_streets.png' },
            { name: 'tokyo_tower', path: 'assets/images/backgrounds/tokyo_tower.png' }
        ],
        color: '#87CEEB'  // 空色
    },
    
    // 富士山と田園風景
    FUJI: {
        name: '富士山',
        description: '富士山を背景にした田園風景',
        elements: [
            { name: 'mount_fuji', path: 'assets/images/backgrounds/mount_fuji.png' },
            { name: 'rice_fields', path: 'assets/images/backgrounds/rice_fields.png' },
            { name: 'sakura_trees', path: 'assets/images/backgrounds/sakura_trees.png' }
        ],
        color: '#E0F7FA'  // 薄い水色
    },
    
    // 寺社仏閣
    TEMPLE: {
        name: '寺社仏閣',
        description: '日本の寺院や神社の風景',
        elements: [
            { name: 'temple_gate', path: 'assets/images/backgrounds/temple_gate.png' },
            { name: 'shrine_path', path: 'assets/images/backgrounds/shrine_path.png' },
            { name: 'stone_lanterns', path: 'assets/images/backgrounds/stone_lanterns.png' }
        ],
        color: '#FFF9C4'  // 薄い黄色
    }
};

// 障害物の定義
const OBSTACLES = {
    // 乗り物系
    VEHICLES: [
        { 
            name: '路面電車', 
            type: 'high', 
            width: 100, 
            height: 80, 
            path: 'assets/images/obstacles/tram.png',
            jumpable: true,
            slidable: false
        },
        { 
            name: '人力車', 
            type: 'low', 
            width: 80, 
            height: 60, 
            path: 'assets/images/obstacles/rickshaw.png',
            jumpable: true,
            slidable: true
        },
        { 
            name: '観光バス', 
            type: 'high', 
            width: 120, 
            height: 90, 
            path: 'assets/images/obstacles/tour_bus.png',
            jumpable: true,
            slidable: false
        }
    ],
    
    // 構造物系
    STRUCTURES: [
        { 
            name: '鳥居', 
            type: 'high', 
            width: 80, 
            height: 100, 
            path: 'assets/images/obstacles/torii.png',
            jumpable: true,
            slidable: false
        },
        { 
            name: '石灯籠', 
            type: 'low', 
            width: 60, 
            height: 70, 
            path: 'assets/images/obstacles/stone_lantern.png',
            jumpable: true,
            slidable: false
        },
        { 
            name: '竹垣', 
            type: 'low', 
            width: 100, 
            height: 50, 
            path: 'assets/images/obstacles/bamboo_fence.png',
            jumpable: true,
            slidable: true
        },
        { 
            name: '屋台', 
            type: 'high', 
            width: 90, 
            height: 80, 
            path: 'assets/images/obstacles/food_stall.png',
            jumpable: true,
            slidable: false
        },
        { 
            name: '提灯', 
            type: 'hanging', 
            width: 50, 
            height: 60, 
            path: 'assets/images/obstacles/lantern.png',
            jumpable: false,
            slidable: true
        }
    ],
    
    // 自然系
    NATURE: [
        { 
            name: '盆栽', 
            type: 'low', 
            width: 50, 
            height: 40, 
            path: 'assets/images/obstacles/bonsai.png',
            jumpable: true,
            slidable: true
        },
        { 
            name: '岩', 
            type: 'low', 
            width: 70, 
            height: 50, 
            path: 'assets/images/obstacles/rock.png',
            jumpable: true,
            slidable: false
        },
        { 
            name: '池', 
            type: 'ground', 
            width: 120, 
            height: 20, 
            path: 'assets/images/obstacles/pond.png',
            jumpable: true,
            slidable: false
        }
    ]
};

// 収集アイテムの定義
const COLLECTIBLES = {
    // 基本コイン
    COINS: {
        REGULAR: {
            name: '五円玉',
            value: 1,
            width: 30,
            height: 30,
            path: 'assets/images/items/five_yen.png'
        },
        SPECIAL: {
            name: '小判',
            value: 5,
            width: 40,
            height: 25,
            path: 'assets/images/items/koban.png'
        }
    },
    
    // 特殊アイテム
    TOKENS: {
        NINJA: {
            name: '忍者の巻物',
            width: 35,
            height: 35,
            path: 'assets/images/items/ninja_scroll.png'
        },
        SAMURAI: {
            name: '侍の刀',
            width: 40,
            height: 40,
            path: 'assets/images/items/samurai_sword.png'
        },
        MIKO: {
            name: '巫女の鈴',
            width: 35,
            height: 35,
            path: 'assets/images/items/miko_bell.png'
        },
        STUDENT: {
            name: '学生の教科書',
            width: 35,
            height: 40,
            path: 'assets/images/items/student_book.png'
        }
    }
};

// パワーアップの定義
const POWERUPS = [
    {
        name: '招き猫',
        type: 'MAGNET',
        description: 'コインを引き寄せる',
        duration: 10000,
        width: 40,
        height: 40,
        path: 'assets/images/items/maneki_neko.png'
    },
    {
        name: '紙風船',
        type: 'JETPACK',
        description: '空を飛ぶ',
        duration: 5000,
        width: 40,
        height: 40,
        path: 'assets/images/items/paper_balloon.png'
    },
    {
        name: 'だるま',
        type: 'MULTIPLIER',
        description: 'スコア倍増',
        duration: 8000,
        width: 40,
        height: 40,
        path: 'assets/images/items/daruma.png'
    },
    {
        name: '雲雀の草履',
        type: 'SNEAKERS',
        description: '高くジャンプできる',
        duration: 12000,
        width: 40,
        height: 30,
        path: 'assets/images/items/cloud_sandals.png'
    },
    {
        name: '竹とんぼ',
        type: 'POGOSTICK',
        description: '連続ジャンプ',
        duration: 7000,
        width: 35,
        height: 45,
        path: 'assets/images/items/bamboo_copter.png'
    },
    {
        name: '風神',
        type: 'HEADSTART',
        description: '一気に前進',
        duration: 3000,
        width: 45,
        height: 45,
        path: 'assets/images/items/wind_god.png'
    },
    {
        name: '七福神',
        type: 'SCOREBOOSTER',
        description: 'スコア大幅アップ',
        duration: 0,  // 即時効果
        width: 45,
        height: 45,
        path: 'assets/images/items/seven_gods.png'
    }
];

// ホバーボード（特殊アイテム）の定義
const HOVERBOARDS = [
    {
        name: '雲に乗った如意棒',
        description: '一回の衝突から守る',
        duration: 30000,
        cooldown: 60000,
        width: 80,
        height: 20,
        path: 'assets/images/items/cloud_staff.png'
    },
    {
        name: '飛行する鯉のぼり',
        description: '一回の衝突から守る',
        duration: 30000,
        cooldown: 60000,
        width: 80,
        height: 25,
        path: 'assets/images/items/flying_koinobori.png'
    },
    {
        name: '浮遊する畳',
        description: '一回の衝突から守る',
        duration: 30000,
        cooldown: 60000,
        width: 80,
        height: 15,
        path: 'assets/images/items/floating_tatami.png'
    },
    {
        name: '風神の風袋',
        description: '一回の衝突から守る',
        duration: 30000,
        cooldown: 60000,
        width: 70,
        height: 30,
        path: 'assets/images/items/wind_bag.png'
    }
];

// キャラクターの定義
const CHARACTERS = [
    {
        name: '忍者',
        description: '素早い動きが特徴',
        abilities: {
            speed: 1.2,
            jump: 1.0,
            slide: 1.1
        },
        width: 60,
        height: 90,
        path: 'assets/images/characters/ninja.png'
    },
    {
        name: '侍',
        description: 'パワフルな動きが特徴',
        abilities: {
            speed: 1.0,
            jump: 1.2,
            slide: 1.0
        },
        width: 65,
        height: 95,
        path: 'assets/images/characters/samurai.png'
    },
    {
        name: '巫女',
        description: '特別なパワーアップ効果が長続き',
        abilities: {
            speed: 1.0,
            jump: 1.0,
            slide: 1.0,
            powerupDuration: 1.3
        },
        width: 60,
        height: 90,
        path: 'assets/images/characters/miko.png'
    },
    {
        name: '現代の学生',
        description: 'バランス型キャラクター',
        abilities: {
            speed: 1.1,
            jump: 1.1,
            slide: 1.1
        },
        width: 60,
        height: 90,
        path: 'assets/images/characters/student.png'
    }
];

// 季節イベントの定義
const SEASONAL_EVENTS = [
    {
        name: '春（花見）',
        background: 'assets/images/backgrounds/sakura_festival.png',
        obstacles: ['屋台', '提灯', '人力車'],
        collectibles: ['桜餅', '団子']
    },
    {
        name: '夏（花火大会）',
        background: 'assets/images/backgrounds/fireworks_festival.png',
        obstacles: ['屋台', '提灯', '観光バス'],
        collectibles: ['風鈴', 'うちわ']
    },
    {
        name: '秋（紅葉）',
        background: 'assets/images/backgrounds/autumn_leaves.png',
        obstacles: ['石灯籠', '竹垣', '池'],
        collectibles: ['もみじ', '栗']
    },
    {
        name: '冬（雪祭り）',
        background: 'assets/images/backgrounds/snow_festival.png',
        obstacles: ['雪だるま', '雪像', '路面電車'],
        collectibles: ['雪の結晶', '温泉マーク']
    }
];

// ゲーム内で使用する日本語のテキスト
const JAPANESE_TEXT = {
    START_GAME: 'ゲームスタート',
    GAME_OVER: 'ゲームオーバー',
    SCORE: 'スコア',
    COINS: 'コイン',
    DISTANCE: '距離',
    HIGH_SCORE: 'ハイスコア',
    PLAY_AGAIN: 'もう一度プレイ',
    LOADING: '読み込み中...',
    PAUSE: '一時停止',
    RESUME: '再開',
    SETTINGS: '設定',
    CHARACTERS: 'キャラクター',
    SHOP: 'ショップ',
    MISSIONS: 'ミッション'
};

// エクスポート
export {
    BACKGROUNDS,
    OBSTACLES,
    COLLECTIBLES,
    POWERUPS,
    HOVERBOARDS,
    CHARACTERS,
    SEASONAL_EVENTS,
    JAPANESE_TEXT
};
