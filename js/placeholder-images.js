// プレースホルダー画像を作成するための簡易スクリプト
// 実際のゲームでは、これらのプレースホルダーを本物の画像に置き換えます

// 背景画像の生成
function createBackgroundImages() {
    createPlaceholderImage('tokyo_skyline', 800, 400, '#87CEEB', '東京の街並み', 'backgrounds');
    createPlaceholderImage('tokyo_streets', 800, 400, '#A9A9A9', '東京の道路', 'backgrounds');
    createPlaceholderImage('tokyo_tower', 400, 600, '#FF4500', '東京タワー', 'backgrounds');
    
    createPlaceholderImage('mount_fuji', 800, 400, '#E0F7FA', '富士山', 'backgrounds');
    createPlaceholderImage('rice_fields', 800, 200, '#8BC34A', '田んぼ', 'backgrounds');
    createPlaceholderImage('sakura_trees', 800, 300, '#FFCDD2', '桜の木', 'backgrounds');
    
    createPlaceholderImage('temple_gate', 600, 400, '#8D6E63', '寺院の門', 'backgrounds');
    createPlaceholderImage('shrine_path', 800, 300, '#D7CCC8', '神社の参道', 'backgrounds');
    createPlaceholderImage('stone_lanterns', 400, 300, '#BDBDBD', '石灯籠', 'backgrounds');
    
    // スタート画面用の背景
    createPlaceholderImage('start-bg', 800, 600, '#4CAF50', '日本の風景', '');
}

// 障害物画像の生成
function createObstacleImages() {
    // 乗り物系
    createPlaceholderImage('tram', 100, 80, '#2196F3', '路面電車', 'obstacles');
    createPlaceholderImage('rickshaw', 80, 60, '#795548', '人力車', 'obstacles');
    createPlaceholderImage('tour_bus', 120, 90, '#FFC107', '観光バス', 'obstacles');
    
    // 構造物系
    createPlaceholderImage('torii', 80, 100, '#F44336', '鳥居', 'obstacles');
    createPlaceholderImage('stone_lantern', 60, 70, '#9E9E9E', '石灯籠', 'obstacles');
    createPlaceholderImage('bamboo_fence', 100, 50, '#8BC34A', '竹垣', 'obstacles');
    createPlaceholderImage('food_stall', 90, 80, '#FF9800', '屋台', 'obstacles');
    createPlaceholderImage('lantern', 50, 60, '#FFEB3B', '提灯', 'obstacles');
    
    // 自然系
    createPlaceholderImage('bonsai', 50, 40, '#4CAF50', '盆栽', 'obstacles');
    createPlaceholderImage('rock', 70, 50, '#607D8B', '岩', 'obstacles');
    createPlaceholderImage('pond', 120, 20, '#03A9F4', '池', 'obstacles');
}

// アイテム画像の生成
function createItemImages() {
    // コイン
    createPlaceholderImage('five_yen', 30, 30, '#FFD700', '五円玉', 'items');
    createPlaceholderImage('koban', 40, 25, '#FFC107', '小判', 'items');
    
    // キャラクタートークン
    createPlaceholderImage('ninja_scroll', 35, 35, '#9C27B0', '忍者の巻物', 'items');
    createPlaceholderImage('samurai_sword', 40, 40, '#607D8B', '侍の刀', 'items');
    createPlaceholderImage('miko_bell', 35, 35, '#E91E63', '巫女の鈴', 'items');
    createPlaceholderImage('student_book', 35, 40, '#3F51B5', '学生の教科書', 'items');
    
    // パワーアップ
    createPlaceholderImage('maneki_neko', 40, 40, '#FFEB3B', '招き猫', 'items');
    createPlaceholderImage('paper_balloon', 40, 40, '#F44336', '紙風船', 'items');
    createPlaceholderImage('daruma', 40, 40, '#F44336', 'だるま', 'items');
    createPlaceholderImage('cloud_sandals', 40, 30, '#BBDEFB', '雲雀の草履', 'items');
    createPlaceholderImage('bamboo_copter', 35, 45, '#8BC34A', '竹とんぼ', 'items');
    createPlaceholderImage('wind_god', 45, 45, '#B3E5FC', '風神', 'items');
    createPlaceholderImage('seven_gods', 45, 45, '#FFD54F', '七福神', 'items');
    
    // ホバーボード
    createPlaceholderImage('cloud_staff', 80, 20, '#E1F5FE', '雲に乗った如意棒', 'items');
    createPlaceholderImage('flying_koinobori', 80, 25, '#FF9800', '飛行する鯉のぼり', 'items');
    createPlaceholderImage('floating_tatami', 80, 15, '#8D6E63', '浮遊する畳', 'items');
    createPlaceholderImage('wind_bag', 70, 30, '#B3E5FC', '風神の風袋', 'items');
}

// キャラクター画像の生成
function createCharacterImages() {
    createPlaceholderImage('ninja', 60, 90, '#212121', '忍者', 'characters');
    createPlaceholderImage('samurai', 65, 95, '#D32F2F', '侍', 'characters');
    createPlaceholderImage('miko', 60, 90, '#E91E63', '巫女', 'characters');
    createPlaceholderImage('student', 60, 90, '#1976D2', '現代の学生', 'characters');
}

// プレースホルダー画像の作成関数
function createPlaceholderImage(name, width, height, color, text, subfolder) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // 背景色の描画
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    
    // 枠線の描画
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
    
    // テキストの描画
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    
    // 画像の保存（実際のゲームでは、これはサーバーサイドで行うか、Base64エンコードされた画像を使用します）
    // ここではデモ用にBase64文字列として返します
    const dataUrl = canvas.toDataURL('image/png');
    
    // 実際のゲームでは、この画像をファイルとして保存するか、直接使用します
    console.log(`Created placeholder image for ${name} (${subfolder})`);
    
    // 画像要素を作成して返す（デモ用）
    const img = new Image();
    img.src = dataUrl;
    img.alt = text;
    img.title = name;
    
    // 実際のゲームでは、この画像をアセットとして読み込みます
    return img;
}

// すべてのプレースホルダー画像を生成
function createAllPlaceholderImages() {
    createBackgroundImages();
    createObstacleImages();
    createItemImages();
    createCharacterImages();
    console.log('All placeholder images created successfully!');
}

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    // プレースホルダー画像の生成（実際のゲームでは、本物の画像を使用します）
    createAllPlaceholderImages();
});
