/**
 * ジャパンランナー - UIとコントロール
 * ゲームのユーザーインターフェースとコントロールを実装するファイル
 */

// UIクラス
class GameUI {
    constructor(game) {
        this.game = game;
        
        // UI要素
        this.menuButton = null;
        this.pauseButton = null;
        this.resumeButton = null;
        this.soundButton = null;
        this.helpButton = null;
        this.characterSelectButton = null;
        
        // UI画面
        this.menuScreen = null;
        this.characterSelectScreen = null;
        this.settingsScreen = null;
        this.helpScreen = null;
        
        // モバイルコントロール
        this.mobileControls = null;
        
        // UI初期化
        this.initUI();
    }
    
    // UI要素の初期化
    initUI() {
        this.createMenuButton();
        this.createPauseButton();
        this.createSoundButton();
        this.createHelpButton();
        this.createCharacterSelectButton();
        
        this.createMenuScreen();
        this.createCharacterSelectScreen();
        this.createSettingsScreen();
        this.createHelpScreen();
        
        this.createMobileControls();
        
        // イベントリスナーの設定
        this.setupEventListeners();
    }
    
    // メニューボタンの作成
    createMenuButton() {
        this.menuButton = document.createElement('button');
        this.menuButton.className = 'ui-button menu-button';
        this.menuButton.innerHTML = '<span>≡</span>';
        this.menuButton.title = 'メニュー';
        
        this.game.playScreen.appendChild(this.menuButton);
    }
    
    // 一時停止ボタンの作成
    createPauseButton() {
        this.pauseButton = document.createElement('button');
        this.pauseButton.className = 'ui-button pause-button';
        this.pauseButton.innerHTML = '<span>⏸</span>';
        this.pauseButton.title = '一時停止';
        
        this.resumeButton = document.createElement('button');
        this.resumeButton.className = 'ui-button resume-button';
        this.resumeButton.innerHTML = '<span>▶</span>';
        this.resumeButton.title = '再開';
        this.resumeButton.style.display = 'none';
        
        this.game.playScreen.appendChild(this.pauseButton);
        this.game.playScreen.appendChild(this.resumeButton);
    }
    
    // サウンドボタンの作成
    createSoundButton() {
        this.soundButton = document.createElement('button');
        this.soundButton.className = 'ui-button sound-button';
        this.soundButton.innerHTML = '<span>🔊</span>';
        this.soundButton.title = 'サウンド オン/オフ';
        
        this.game.playScreen.appendChild(this.soundButton);
    }
    
    // ヘルプボタンの作成
    createHelpButton() {
        this.helpButton = document.createElement('button');
        this.helpButton.className = 'ui-button help-button';
        this.helpButton.innerHTML = '<span>?</span>';
        this.helpButton.title = 'ヘルプ';
        
        this.game.playScreen.appendChild(this.helpButton);
    }
    
    // キャラクター選択ボタンの作成
    createCharacterSelectButton() {
        this.characterSelectButton = document.createElement('button');
        this.characterSelectButton.className = 'character-select-button';
        this.characterSelectButton.textContent = 'キャラクター選択';
        
        this.game.startScreen.insertBefore(this.characterSelectButton, this.game.startButton);
    }
    
    // メニュー画面の作成
    createMenuScreen() {
        this.menuScreen = document.createElement('div');
        this.menuScreen.className = 'menu-screen';
        this.menuScreen.style.display = 'none';
        
        const menuTitle = document.createElement('h2');
        menuTitle.textContent = 'メニュー';
        
        const resumeGameButton = document.createElement('button');
        resumeGameButton.className = 'menu-button';
        resumeGameButton.textContent = 'ゲームに戻る';
        resumeGameButton.addEventListener('click', () => this.hideMenuScreen());
        
        const settingsButton = document.createElement('button');
        settingsButton.className = 'menu-button';
        settingsButton.textContent = '設定';
        settingsButton.addEventListener('click', () => this.showSettingsScreen());
        
        const helpButton = document.createElement('button');
        helpButton.className = 'menu-button';
        helpButton.textContent = 'ヘルプ';
        helpButton.addEventListener('click', () => this.showHelpScreen());
        
        const restartButton = document.createElement('button');
        restartButton.className = 'menu-button';
        restartButton.textContent = 'リスタート';
        restartButton.addEventListener('click', () => {
            this.hideMenuScreen();
            this.game.restartGame();
        });
        
        const mainMenuButton = document.createElement('button');
        mainMenuButton.className = 'menu-button';
        mainMenuButton.textContent = 'メインメニューに戻る';
        mainMenuButton.addEventListener('click', () => {
            this.hideMenuScreen();
            this.game.goToMainMenu();
        });
        
        this.menuScreen.appendChild(menuTitle);
        this.menuScreen.appendChild(resumeGameButton);
        this.menuScreen.appendChild(settingsButton);
        this.menuScreen.appendChild(helpButton);
        this.menuScreen.appendChild(restartButton);
        this.menuScreen.appendChild(mainMenuButton);
        
        this.game.playScreen.appendChild(this.menuScreen);
    }
    
    // キャラクター選択画面の作成
    createCharacterSelectScreen() {
        this.characterSelectScreen = document.createElement('div');
        this.characterSelectScreen.className = 'character-select-screen';
        this.characterSelectScreen.style.display = 'none';
        
        const screenTitle = document.createElement('h2');
        screenTitle.textContent = 'キャラクター選択';
        
        const charactersContainer = document.createElement('div');
        charactersContainer.className = 'characters-container';
        
        // キャラクターカードの作成
        const characters = [
            { name: '忍者', description: '素早い動きが特徴', unlocked: true },
            { name: '侍', description: 'パワフルな動きが特徴', unlocked: false },
            { name: '巫女', description: '特別なパワーアップ効果が長続き', unlocked: false },
            { name: '現代の学生', description: 'バランス型キャラクター', unlocked: false }
        ];
        
        characters.forEach((character, index) => {
            const card = document.createElement('div');
            card.className = `character-card ${character.unlocked ? 'unlocked' : 'locked'}`;
            card.dataset.index = index;
            
            const characterImage = document.createElement('div');
            characterImage.className = 'character-image';
            characterImage.textContent = character.name.substring(0, 1);
            
            const characterName = document.createElement('h3');
            characterName.textContent = character.name;
            
            const characterDesc = document.createElement('p');
            characterDesc.textContent = character.description;
            
            const selectButton = document.createElement('button');
            selectButton.className = 'select-button';
            selectButton.textContent = character.unlocked ? '選択' : 'ロック中';
            selectButton.disabled = !character.unlocked;
            
            card.appendChild(characterImage);
            card.appendChild(characterName);
            card.appendChild(characterDesc);
            card.appendChild(selectButton);
            
            if (character.unlocked) {
                selectButton.addEventListener('click', () => {
                    this.selectCharacter(index);
                });
            }
            
            charactersContainer.appendChild(card);
        });
        
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = '戻る';
        backButton.addEventListener('click', () => this.hideCharacterSelectScreen());
        
        this.characterSelectScreen.appendChild(screenTitle);
        this.characterSelectScreen.appendChild(charactersContainer);
        this.characterSelectScreen.appendChild(backButton);
        
        this.game.startScreen.appendChild(this.characterSelectScreen);
    }
    
    // 設定画面の作成
    createSettingsScreen() {
        this.settingsScreen = document.createElement('div');
        this.settingsScreen.className = 'settings-screen';
        this.settingsScreen.style.display = 'none';
        
        const screenTitle = document.createElement('h2');
        screenTitle.textContent = '設定';
        
        // 音量設定
        const volumeContainer = document.createElement('div');
        volumeContainer.className = 'setting-container';
        
        const volumeLabel = document.createElement('label');
        volumeLabel.textContent = '音量:';
        
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '100';
        volumeSlider.value = '80';
        
        volumeContainer.appendChild(volumeLabel);
        volumeContainer.appendChild(volumeSlider);
        
        // 難易度設定
        const difficultyContainer = document.createElement('div');
        difficultyContainer.className = 'setting-container';
        
        const difficultyLabel = document.createElement('label');
        difficultyLabel.textContent = '難易度:';
        
        const difficultySelect = document.createElement('select');
        const difficulties = ['簡単', '普通', '難しい'];
        
        difficulties.forEach(difficulty => {
            const option = document.createElement('option');
            option.value = difficulty;
            option.textContent = difficulty;
            difficultySelect.appendChild(option);
        });
        
        difficultySelect.value = '普通';
        
        difficultyContainer.appendChild(difficultyLabel);
        difficultyContainer.appendChild(difficultySelect);
        
        // 背景テーマ設定
        const themeContainer = document.createElement('div');
        themeContainer.className = 'setting-container';
        
        const themeLabel = document.createElement('label');
        themeLabel.textContent = '背景テーマ:';
        
        const themeSelect = document.createElement('select');
        const themes = ['東京', '富士山', '寺社仏閣'];
        
        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme;
            themeSelect.appendChild(option);
        });
        
        themeSelect.value = '東京';
        
        themeContainer.appendChild(themeLabel);
        themeContainer.appendChild(themeSelect);
        
        // 戻るボタン
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = '戻る';
        backButton.addEventListener('click', () => this.hideSettingsScreen());
        
        // 設定を保存ボタン
        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';
        saveButton.textContent = '設定を保存';
        saveButton.addEventListener('click', () => {
            // 設定の保存処理
            this.game.settings = {
                volume: volumeSlider.value,
                difficulty: difficultySelect.value,
                theme: themeSelect.value
            };
            
            // テーマの適用
            this.applyTheme(themeSelect.value);
            
            this.hideSettingsScreen();
        });
        
        this.settingsScreen.appendChild(screenTitle);
        this.settingsScreen.appendChild(volumeContainer);
        this.settingsScreen.appendChild(difficultyContainer);
        this.settingsScreen.appendChild(themeContainer);
        this.settingsScreen.appendChild(saveButton);
        this.settingsScreen.appendChild(backButton);
        
        this.game.playScreen.appendChild(this.settingsScreen);
    }
    
    // ヘルプ画面の作成
    createHelpScreen() {
        this.helpScreen = document.createElement('div');
        this.helpScreen.className = 'help-screen';
        this.helpScreen.style.display = 'none';
        
        const screenTitle = document.createElement('h2');
        screenTitle.textContent = 'ヘルプ';
        
        const helpContent = document.createElement('div');
        helpContent.className = 'help-content';
        
        // 操作方法
        const controlsSection = document.createElement('div');
        controlsSection.className = 'help-section';
        
        const controlsTitle = document.createElement('h3');
        controlsTitle.textContent = '操作方法';
        
        const controlsList = document.createElement('ul');
        
        const controls = [
            { key: '←→', action: '左右移動' },
            { key: '↑', action: 'ジャンプ' },
            { key: '↓', action: 'スライディング' },
            { key: 'P', action: '一時停止' }
        ];
        
        controls.forEach(control => {
            const item = document.createElement('li');
            item.innerHTML = `<span class="key">${control.key}</span>: ${control.action}`;
            controlsList.appendChild(item);
        });
        
        controlsSection.appendChild(controlsTitle);
        controlsSection.appendChild(controlsList);
        
        // アイテム説明
        const itemsSection = document.createElement('div');
        itemsSection.className = 'help-section';
        
        const itemsTitle = document.createElement('h3');
        itemsTitle.textContent = 'アイテム';
        
        const itemsList = document.createElement('ul');
        
        const items = [
            { name: '五円玉', description: '基本コイン' },
            { name: '小判', description: '価値の高いコイン' },
            { name: '招き猫', description: 'コインを引き寄せる' },
            { name: '紙風船', description: '空を飛ぶ' },
            { name: 'だるま', description: 'スコア倍増' }
        ];
        
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;
            itemsList.appendChild(listItem);
        });
        
        itemsSection.appendChild(itemsTitle);
        itemsSection.appendChild(itemsList);
        
        // 戻るボタン
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = '戻る';
        backButton.addEventListener('click', () => this.hideHelpScreen());
        
        helpContent.appendChild(controlsSection);
        helpContent.appendChild(itemsSection);
        
        this.helpScreen.appendChild(screenTitle);
        this.helpScreen.appendChild(helpContent);
        this.helpScreen.appendChild(backButton);
        
        this.game.playScreen.appendChild(this.helpScreen);
    }
    
    // モバイルコントロールの作成
    createMobileControls() {
        this.mobileControls = document.createElement('div');
        this.mobileControls.className = 'mobile-controls';
        
        // 左ボタン
        const leftButton = document.createElement('button');
        leftButton.className = 'mobile-button left-button';
        leftButton.innerHTML = '←';
        
        // 右ボタン
        const rightButton = document.createElement('button');
        rightButton.className = 'mobile-button right-button';
        rightButton.innerHTML = '→';
        
        // ジャンプボタン
        const jumpButton = document.createElement('button');
        jumpButton.className = 'mobile-button jump-button';
        jumpButton.innerHTML = '↑';
        
        // スライドボタン
        const slideButton = document.createElement('button');
        slideButton.className = 'mobile-button slide-button';
        slideButton.innerHTML = '↓';
        
        this.mobileControls.appendChild(leftButton);
        this.mobileControls.appendChild(rightButton);
        this.mobileControls.appendChild(jumpButton);
        this.mobileControls.appendChild(slideButton);
        
        this.game.playScreen.appendChild(this.mo<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>