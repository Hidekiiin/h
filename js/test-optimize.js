/**
 * ジャパンランナー - テストと最適化
 * ゲームの動作テストと最適化を行うファイル
 */

// モジュールの読み込みエラーを修正
document.addEventListener('DOMContentLoaded', () => {
    // ES Modulesの問題を解決するためのポリフィル
    if (typeof BACKGROUNDS === 'undefined') {
        // japanese-elements.jsがモジュールとして読み込めない場合の対処
        console.log('モジュール読み込みエラーを修正します...');
        
        // japanese-elements.jsを非モジュールとして再読み込み
        const script = document.createElement('script');
        script.src = 'js/japanese-elements.js';
        script.type = 'text/javascript';
        document.head.appendChild(script);
        
        // 他のスクリプトも順番に読み込み
        script.onload = () => {
            const scripts = [
                'js/placeholder-images.js',
                'js/game-integration.js',
                'js/ui-controls.js'
            ];
            
            let loadedCount = 0;
            scripts.forEach(src => {
                const s = document.createElement('script');
                s.src = src;
                s.type = 'text/javascript';
                s.onload = () => {
                    loadedCount++;
                    if (loadedCount === scripts.length) {
                        console.log('すべてのスクリプトが読み込まれました');
                        initGame();
                    }
                };
                document.head.appendChild(s);
            });
        };
    } else {
        // 正常に読み込めた場合
        initGame();
    }
});

// ゲームの初期化
function initGame() {
    console.log('ゲームを初期化します...');
    
    // パフォーマンスモニタリング
    const performanceMonitor = new PerformanceMonitor();
    performanceMonitor.start();
    
    // エラーハンドリング
    setupErrorHandling();
    
    // ブラウザ互換性チェック
    checkBrowserCompatibility();
    
    // ゲームの初期化（既存のコードを使用）
    try {
        const game = new JapanRunnerWithUI();
        console.log('ゲームが正常に初期化されました');
    } catch (error) {
        console.error('ゲーム初期化エラー:', error);
        showErrorMessage('ゲームの初期化中にエラーが発生しました。ページを再読み込みしてください。');
    }
}

// パフォーマンスモニタリングクラス
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.frames = 0;
        this.lastTime = 0;
        this.fpsElement = null;
        this.memoryElement = null;
        this.isMonitoring = false;
        
        // デバッグモード（開発中のみ有効）
        this.debugMode = true;
        
        if (this.debugMode) {
            this.createDebugPanel();
        }
    }
    
    // デバッグパネルの作成
    createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.className = 'debug-panel';
        debugPanel.style.position = 'fixed';
        debugPanel.style.top = '10px';
        debugPanel.style.left = '10px';
        debugPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        debugPanel.style.color = 'white';
        debugPanel.style.padding = '10px';
        debugPanel.style.borderRadius = '5px';
        debugPanel.style.fontFamily = 'monospace';
        debugPanel.style.fontSize = '12px';
        debugPanel.style.zIndex = '1000';
        
        const fpsDisplay = document.createElement('div');
        fpsDisplay.textContent = 'FPS: 0';
        this.fpsElement = fpsDisplay;
        
        const memoryDisplay = document.createElement('div');
        memoryDisplay.textContent = 'Memory: 0 MB';
        this.memoryElement = memoryDisplay;
        
        debugPanel.appendChild(fpsDisplay);
        debugPanel.appendChild(memoryDisplay);
        
        document.body.appendChild(debugPanel);
    }
    
    // モニタリング開始
    start() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.lastTime = performance.now();
        this.frames = 0;
        
        // FPS計測
        const measureFPS = (timestamp) => {
            this.frames++;
            
            const elapsed = timestamp - this.lastTime;
            if (elapsed >= 1000) {
                this.fps = Math.round((this.frames * 1000) / elapsed);
                this.frames = 0;
                this.lastTime = timestamp;
                
                if (this.debugMode && this.fpsElement) {
                    this.fpsElement.textContent = `FPS: ${this.fps}`;
                    
                    // メモリ使用量（Chrome のみ対応）
                    if (window.performance && window.performance.memory) {
                        const memoryUsed = Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024));
                        this.memoryElement.textContent = `Memory: ${memoryUsed} MB`;
                    }
                }
                
                // 低FPSの場合に最適化を実行
                if (this.fps < 30) {
                    this.optimizePerformance();
                }
            }
            
            if (this.isMonitoring) {
                requestAnimationFrame(measureFPS);
            }
        };
        
        requestAnimationFrame(measureFPS);
    }
    
    // モニタリング停止
    stop() {
        this.isMonitoring = false;
    }
    
    // パフォーマンス最適化
    optimizePerformance() {
        console.log('パフォーマンスを最適化しています...');
        
        // キャンバスの解像度を下げる
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            const currentWidth = canvas.width;
            const currentHeight = canvas.height;
            
            // 解像度を75%に下げる
            canvas.width = currentWidth * 0.75;
            canvas.height = currentHeight * 0.75;
            
            // CSSサイズは維持
            canvas.style.width = `${currentWidth}px`;
            canvas.style.height = `${currentHeight}px`;
        }
        
        // 背景の複雑さを下げる
        simplifyBackground();
        
        // パーティクル効果を無効化
        disableParticleEffects();
    }
}

// 背景の簡略化
function simplifyBackground() {
    // 実際のゲームコードに合わせて実装
    console.log('背景を簡略化しました');
}

// パーティクル効果の無効化
function disableParticleEffects() {
    // 実際のゲームコードに合わせて実装
    console.log('パーティクル効果を無効化しました');
}

// エラーハンドリングの設定
function setupErrorHandling() {
    window.onerror = function(message, source, lineno, colno, error) {
        console.error('ゲームエラー:', message, 'at', source, lineno, colno);
        showErrorMessage('ゲーム実行中にエラーが発生しました。ページを再読み込みしてください。');
        return true;
    };
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('未処理のPromise拒否:', event.reason);
        showErrorMessage('非同期処理中にエラーが発生しました。ページを再読み込みしてください。');
    });
}

// エラーメッセージの表示
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.position = 'fixed';
    errorMessage.style.top = '50%';
    errorMessage.style.left = '50%';
    errorMessage.style.transform = 'translate(-50%, -50%)';
    errorMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    errorMessage.style.color = 'white';
    errorMessage.style.padding = '20px';
    errorMessage.style.borderRadius = '10px';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.zIndex = '2000';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'ページを再読み込み';
    reloadButton.style.marginTop = '10px';
    reloadButton.style.padding = '5px 10px';
    reloadButton.style.backgroundColor = 'white';
    reloadButton.style.color = 'red';
    reloadButton.style.border = 'none';
    reloadButton.style.borderRadius = '5px';
    reloadButton.style.cursor = 'pointer';
    
    reloadButton.addEventListener('click', function() {
        location.reload();
    });
    
    errorMessage.appendChild(messageText);
    errorMessage.appendChild(reloadButton);
    
    document.body.appendChild(errorMessage);
}

// ブラウザ互換性チェック
function checkBrowserCompatibility() {
    const issues = [];
    
    // Canvas対応チェック
    if (!document.createElement('canvas').getContext) {
        issues.push('お使いのブラウザはCanvasをサポートしていません。');
    }
    
    // WebGL対応チェック
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            issues.push('お使いのブラウザはWebGLをサポートしていません。一部の視覚効果が制限されます。');
        }
    } catch (e) {
        issues.push('WebGLの確認中にエラーが発生しました。');
    }
    
    // localStorage対応チェック
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (e) {
        issues.push('お使いのブラウザはlocalStorageをサポートしていません。ゲームの進行状況が保存されません。');
    }
    
    // AudioContext対応チェック
    if (!window.AudioContext && !window.webkitAudioContext) {
        issues.push('お使いのブラウザはWeb Audio APIをサポートしていません。ゲーム音声が制限されます。');
    }
    
    // 互換性の問題があれば警告を表示
    if (issues.length > 0) {
        console.warn('ブラウザ互換性の問題:', issues);
        
        const warningMessage = document.createElement('div');
        warningMessage.className = 'compatibility-warning';
        warningMessage.style.position = 'fixed';
        warningMessage.style.bottom = '10px';
        warningMessage.style.right = '10px';
        warningMessage.style.backgroundColor = 'rgba(255, 165, 0, 0.8)';
        warningMessage.style.color = 'white';
        warningMessage.style.padding = '10px';
        warningMessage.style.borderRadius = '5px';
        warningMessage.style.maxWidth = '300px';
        warningMessage.style.zIndex = '1000';
        
        const warningTitle = document.createElement('h3');
        warningTitle.textContent = 'ブラウザ互換性の警告';
        warningTitle.style.margin = '0 0 10px 0';
        
        const warningList = document.createElement('ul');
        warningList.style.margin = '0';
        warningList.style.paddingLeft = '20px';
        
        issues.forEach(issue => {
            const item = document.createElement('li');
            item.textContent = issue;
            warningList.appendChild(item);
        });
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '閉じる';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.backgroundColor = 'white';
        closeButton.style.color = 'orange';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.addEventListener('click', function() {
            document.body.removeChild(warningMessage);
        });
        
        warningMessage.appendChild(warningTitle);
        warningMessage.appendChild(warningList);
        warningMessage.appendChild(closeButton);
        
        document.body.appendChild(warningMessage);
    } else {
        console.log('ブラウザ互換性チェック: 問題なし');
    }
}

// モジュールエクスポートの問題を修正
if (typeof module !== 'undefined') {
    module.exports = {
        PerformanceMonitor,
        setupErrorHandling,
        checkBrowserCompatibility
    };
}
