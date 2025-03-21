/**
 * ジャパンランナー - ゲーム統合スクリプト
 * 日本文化要素をコアゲームメカニクスに統合するファイル
 */

// 日本文化要素の読み込み
import { 
    BACKGROUNDS, 
    OBSTACLES, 
    COLLECTIBLES, 
    POWERUPS, 
    HOVERBOARDS, 
    CHARACTERS, 
    SEASONAL_EVENTS, 
    JAPANESE_TEXT 
} from './japanese-elements.js';

// ゲーム拡張クラス
class JapanRunnerExtended extends JapanRunner {
    constructor() {
        super();
        
        // 日本文化要素の初期化
        this.currentBackground = 'TOKYO';  // デフォルトの背景テーマ
        this.selectedCharacter = 0;  // デフォルトのキャラクター（忍者）
        this.unlockedCharacters = [true, false, false, false];  // 最初は忍者のみアンロック
        this.currentHoverboard = null;  // 選択中のホバーボード
        this.unlockedHoverboards = [false, false, false, false];  // 最初はホバーボードなし
        
        // 季節イベント
        this.currentSeason = null;
        this.seasonalEventActive = false;
        
        // 日本文化要素の読み込み
        this.loadJapaneseElements();
    }
    
    // 日本文化要素の読み込み
    loadJapaneseElements() {
        // プレースホルダー画像の生成（実際のゲームでは本物の画像を使用）
        this.loadingScreen.style.display = 'flex';
        this.progressBar.style.width = '0%';
        
        // 画像の読み込み進捗を表示
        let loadedAssets = 0;
        const totalAssets = this.countTotalAssets();
        
        // プレースホルダー画像の生成スクリプトを読み込み
        const script = document.createElement('script');
        script.src = 'js/placeholder-images.js';
        script.onload = () => {
            // 画像生成完了後の処理
            this.updateLoadingProgress(100);
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                this.gameState = GAME_STATE.START;
                this.startScreen.style.display = 'flex';
                
                // スタート画面の背景を日本風に
                this.startScreen.style.backgroundImage = "url('assets/images/start-bg.jpg')";
                
                // ゲームタイトルを日本語に
                document.querySelector('.game-start-screen h1').textContent = 'ジャパンランナー';
                document.querySelector('.game-start-screen p').textContent = '日本文化を駆け抜けるエンドレスランナーゲーム';
                
                // ボタンテキストを日本語に
                this.startButton.textContent = JAPANESE_TEXT.START_GAME;
                this.restartButton.textContent = JAPANESE_TEXT.PLAY_AGAIN;
                
                // スコア表示を日本語に
                document.querySelector('.score').textContent = `${JAPANESE_TEXT.SCORE}: `;
                document.querySelector('.coins').textContent = `${JAPANESE_TEXT.COINS}: `;
                document.querySelector('.distance').textContent = `${JAPANESE_TEXT.DISTANCE}: `;
                document.querySelector('.final-score').textContent = `${JAPANESE_TEXT.SCORE}: `;
                document.querySelector('.high-score').textContent = `${JAPANESE_TEXT.HIGH_SCORE}: `;
                
                // ゲームオーバー画面を日本語に
                document.querySelector('.game-over-screen h2').textContent = JAPANESE_TEXT.GAME_OVER;
            }, 500);
        };
        document.head.appendChild(script);
        
        // 読み込み進捗の更新
        const updateProgress = (progress) => {
            this.updateLoadingProgress(progress);
        };
        
        // 進捗を50%まで徐々に更新（プレースホルダー画像生成を待つ）
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 1;
            updateProgress(progress);
            if (progress >= 50) {
                clearInterval(progressInterval);
            }
        }, 20);
    }
    
    // 総アセット数のカウント
    countTotalAssets() {
        let count = 0;
        
        // 背景
        Object.values(BACKGROUNDS).forEach(bg => {
            count += bg.elements.length;
        });
        
        // 障害物
        Object.values(OBSTACLES).forEach(category => {
            count += category.length;
        });
        
        // コレクティブル
        count += Object.values(COLLECTIBLES.COINS).length;
        count += Object.values(COLLECTIBLES.TOKENS).length;
        
        // パワーアップ
        count += POWERUPS.length;
        
        // ホバーボード
        count += HOVERBOARDS.length;
        
        // キャラクター
        count += CHARACTERS.length;
        
        return count;
    }
    
    // 読み込み進捗の更新
    updateLoadingProgress(progress) {
        this.progressBar.style.width = `${progress}%`;
    }
    
    // ゲーム開始のオーバーライド
    startGame() {
        this.gameState = GAME_STATE.PLAYING;
        this.startScreen.style.display = 'none';
        this.playScreen.style.display = 'block';
        
        // 選択されたキャラクターに基づいてプレイヤーを初期化
        const character = CHARACTERS[this.selectedCharacter];
        this.player = new PlayerExtended(
            GAME_CONFIG.playerStartX,
            GAME_CONFIG.playerStartY,
            character.width,
            character.height,
            character
        );
        
        // ゲームループの開始
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    // ゲーム状態の更新のオーバーライド
    update(deltaTime) {
        // 親クラスの更新メソッドを呼び出し
        super.update(deltaTime);
        
        // 日本文化要素の更新
        this.updateJapaneseElements(deltaTime);
    }
    
    // 日本文化要素の更新
    updateJapaneseElements(deltaTime) {
        // 背景のスクロール効果
        
        // コインの生成と更新
        this.generateJapaneseCoins();
        this.updateCoins(deltaTime);
        
        // パワーアップの生成と更新
        this.generateJapanesePowerups();
        this.updatePowerups(deltaTime);
    }
    
    // 日本風コインの生成
    generateJapaneseCoins() {
        // 一定確率でコインを生成
        if (Math.random() < 0.05) {
            // ランダムなレーンにコインを配置
            const lane = Math.floor(Math.random() * GAME_CONFIG.lanes);
            const x = lane * GAME_CONFIG.laneWidth + GAME_CONFIG.laneWidth / 2;
            
            // 通常コインか特別コインかをランダムに決定
            const isSpecial = Math.random() < 0.2;  // 20%の確率で特別コイン
            const coinType = isSpecial ? COLLECTIBLES.COINS.SPECIAL : COLLECTIBLES.COINS.REGULAR;
            
            // コインの作成
            const coin = new CoinExtended(
                x,
                -50,
                coinType.width,
                coinType.height,
                coinType
            );
            
            this.coins.push(coin);
        }
    }
    
    // コインの更新
    updateCoins(deltaTime) {
        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            coin.update(this.speed);
            
            // 画面外に出たコインの削除
            if (coin.y > GAME_CONFIG.canvasHeight) {
                this.coins.splice(i, 1);
                continue;
            }
            
            // プレイヤーとの衝突判定
            if (!coin.collected && this.checkCollision(this.player, coin)) {
                coin.collected = true;
                this.coins.splice(i, 1);
                
                // コインの価値に応じてスコア加算
                if (coin.type.name === COLLECTIBLES.COINS.SPECIAL.name) {
                    this.score += 5;
                } else {
                    this.score += 1;
                }
                
                // コイン数の更新
                this.coinsElement.textContent = this.score;
            }
        }
    }
    
    // 日本風パワーアップの生成
    generateJapanesePowerups() {
        // 低確率でパワーアップを生成
        if (Math.random() < 0.005) {
            // ランダムなレーンにパワーアップを配置
            const lane = Math.floor(Math.random() * GAME_CONFIG.lanes);
            const x = lane * GAME_CONFIG.laneWidth + GAME_CONFIG.laneWidth / 2;
            
            // ランダムなパワーアップを選択
            const powerupIndex = Math.floor(Math.random() * POWERUPS.length);
            const powerupType = POWERUPS[powerupIndex];
            
            // パワーアップの作成
            const powerup = new PowerupExtended(
                x,
                -50,
                powerupType.width,
                powerupType.height,
                powerupType
            );
            
            this.powerups.push(powerup);
        }
    }
    
    // パワーアップの更新
    updatePowerups(deltaTime) {
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const powerup = this.powerups[i];
            powerup.update(this.speed);
            
            // 画面外に出たパワーアップの削除
            if (powerup.y > GAME_CONFIG.canvasHeight) {
                this.powerups.splice(i, 1);
                continue;
            }
            
            // プレイヤーとの衝突判定
            if (!powerup.collected && this.checkCollision(this.player, powerup)) {
                powerup.collected = true;
                this.powerups.splice(i, 1);
                
                // パワーアップの効果を適用
                this.applyPowerupEffect(powerup.type);
            }
        }
    }
    
    // パワーアップ効果の適用
    applyPowerupEffect(powerupType) {
        switch (powerupType.type) {
            case 'MAGNET':
                // コインマグネット効果
                this.player.activateMagnet(powerupType.duration);
                break;
            case 'JETPACK':
                // ジェットパック効果
                this.player.activateJetpack(powerupType.duration);
                break;
            case 'MULTIPLIER':
                // スコア倍増効果
                this.player.activateMultiplier(powerupType.duration);
                break;
            case 'SNEAKERS':
                // 高ジャンプ効果
                this.player.activateSneakers(powerupType.duration);
                break;
            case 'POGOSTICK':
                // 連続ジャンプ効果
                this.player.activatePogostick(powerupType.duration);
                break;
            case 'HEADSTART':
                // 一気に前進効果
                this.player.activateHeadstart(powerupType.duration);
                break;
            case 'SCOREBOOSTER':
                // スコア大幅アップ効果
                this.score += 100;
                break;
        }
    }
    
    // 描画のオーバーライド
    render() {
        // キャンバスのクリア
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 背景の描画
        this.renderJapaneseBackground();
        
        // コインの描画
        for (const coin of this.coins) {
            coin.render(this.ctx);
        }
        
        // パワーアップの描画
        for (const powerup of this.powerups) {
            powerup.render(this.ctx);
        }
        
        // 障害物の描画
        for (const obstacle of this.obstacles) {
            obstacle.render(this.ctx);
        }
        
        // プレイヤーの描画
        this.player.render(this.ctx);
    }
    
    // 日本風背景の描画
    renderJapaneseBackground() {
        // 現在の背景テーマを取得
        const bgTheme = BACKGROUNDS[this.currentBackground];
        
        // 背景のグラデーション
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, bgTheme.color);
        gradient.addColorStop(1, '#FFFFFF');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 地面の描画
        this.ctx.fillStyle = '#8BC34A';  // 緑色
        this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);
        
        // レーンの区切り線
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 5;
        this.ctx.setLineDash([20, 10]);
        
        for (let i = 1; i < GAME_CONFIG.lanes; i++) {
            const x = i * GAME_CONFIG.laneWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height - 100);
            this.ctx.stroke();
        }
        
        this.ctx.setLineDash([]);
    }
}

// 拡張プレイヤークラス
class PlayerExtended extends Player {
    constructor(x, y, width, height, character) {
        super(x, y, width, height);
        
        // キャラクター情報
        this.character = character;
        
        // パワーアップ状態
        this.magnetActive = false;
        this.jetpackActive = false;
        this.multiplierActive = false;
        this.sneakersActive = false;
        this.pogostickActive = false;
        this.headstartActive = false;
        
        // パワーアップタイマー
        this.powerupTimers = {
            magnet: 0,
            jetpack: 0,
            multiplier: 0,
            sneakers: 0,
            pogostick: 0,
            headstart: 0
        };
        
        // キャラクター能力の適用
        this.applyCharacterAbilities();
    }
    
    // キャラクター能力の適用
    applyCharacterAbilities() {
        if (this.character.abilities.speed) {
            GAME_CONFIG.playerSpeed *= this.character.abilities.speed;
        }
        
        if (this.character.abilities.jump) {
            GAME_CONFIG.jumpForce *= this.character.abilities.jump;
        }
    }
    
    // 更新のオーバーライド
    update(deltaTime, keys) {
        super.update(deltaTime, keys);
        
        // パワーアップの更新
        this.updatePowerups(deltaTime);
    }
    
    // パワーアップの更新
    updatePowerups(deltaTime) {
        // コインマグネット
        if (this.magnetActive) {
            this.powerupTimers.magnet -= deltaTime;
            if (this.powerupTimers.magnet <= 0) {
                this.magnetActive = false;
            }
        }
        
        // ジェットパック
        if (this.jetpackActive) {
            this.powerupTimers.jetpack -= deltaTime;
            if (this.powerupTimers.jetpack <= 0) {
                this.jetpackActive = false;
                this.jumping = false;
                this.y = GAME_CONFIG.playerStartY;
            } else {
                // ジェットパック中は常に上昇
                this.y -= 5;
                if (this.y < 100) this.y = 100;  // 画面上部で止まる
            }
        }
        
        // マルチプライヤー
        if (this.multiplierActive) {
            this.powerupTimers.multiplier -= deltaTime;
            if (this.powerupTimers.multiplier <= 0) {
                this.multiplierActive = false;
            }
        }
        
        // スーパースニーカー
        if (this.sneakersActive) {
            this.powerupTimers.sneakers -= deltaTime;
            if (this.powerupTimers.sneakers <= 0) {
                this.sneakersActive = false;
                GAME_CONFIG.jumpForce = 20 * (this.character.abilities.jump || 1);
            }
        }
        
        // ポゴスティック
        if (this.pogostickActive) {
            this.powerupTimers.pogostick -= deltaTime;
            if (this.powerupTimers.pogostick <= 0) {
                this.pogostickActive = false;
            } else {
                // 地面に着いたら自動的に再ジャンプ
                if (!this.jumping && this.y >= GAME_CONFIG.playerStartY) {
                    this.jumping = true;
                    this.verticalVelocity = -GAME_CONFIG.jumpForce;
                }
            }
        }
        
        // ヘッドスタート
        if (this.headstartActive) {
            this.powerupTimers.headstart -= deltaTime;
            if (this.powerupTimers.headstart <= 0) {
                this.headstartActive = false;
            }
        }
    }
    
    // 描画のオーバーライド
    render(ctx) {
        // パワーアップ効果の視覚的表現
        if (this.magnetActive) {
            // マグネット効果の表示
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 50, 0, Math.PI * 2);
            ctx.strokeStyle = '#FFC107';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        if (this.jetpackActive) {
            // ジェットパック効果の表示
            ctx.fillStyle = '#FF5722';
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y + this.height);
            ctx.lineTo(this.x + this.width / 2 - 10, this.y + this.height + 20);
            ctx.lineTo(this.x + this.width / 2 + 10, this.y + this.height + 20);
            ctx.closePath();
            ctx.fill();
        }
        
        // キャラクターの描画
        if (this.character.name === '忍者') {
            ctx.fillStyle = '#212121';  // 黒
        } else if (this.character.name === '侍') {
            ctx.fillStyle = '#D32F2F';  // 赤
        } else if (this.character.name === '巫女') {
            ctx.fillStyle = '#E91E63';  // ピンク
        } else {
            ctx.fillStyle = '#1976D2';  // 青
        }
        
        ctx.fillRect<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>