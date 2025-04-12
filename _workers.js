import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// 静态资源内容
const STATIC_RESOURCES = {
  'index.html': `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>BridgeCF - GitHub 文件加速下载</title>
  <link rel="icon" href="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iI0EwMDQxRSIgZD0ibTEgMTcgOC03IDE2IDEgMSAxNi03IDhzLjAwMS01Ljk5OS02LTEyLTEyLTYtMTItNiIvPjxwYXRoIGZpbGw9IiNGRkFDMzMiIGQ9Ik0uOTczIDM1cy0uMDM2LTcuOTc5IDIuOTg1LTExUzE1IDIxLjE4NyAxNSAyMS4xODcgMTQuOTk5IDI5IDExLjk5OSAzMiAuOTczIDM1IC45NzMgMzUiLz48Y2lyY2xlIGN4PSI4Ljk5OSIgY3k9IjI3IiByPSI0IiBmaWxsPSIjRkZDQzREIi8+PHBhdGggZmlsbD0iIzU1QUNFRSIgZD0iTTM1Ljk5OSAwcy0xMCAwLTIyIDEwYy02IDUtNiAxNC00IDE2czExIDIgMTYtNGMxMC0xMiAxMC0yMiIvPjxwYXRoIGQ9Ik0yNi45OTkgNWE0IDQgMCAwIDAtMy42NDEgMi4zNkE0IDQgMCAwIDEgMjQuOTk5IDdhNCA0IDAgMCAxIDQgNGMwIC41ODYtLjEzMyAxLjEzOS0uMzU5IDEuNjRBMy45OSAzLjk5IDAgMCAwIDMwLjk5OSA5YTQgNCAwIDAgMC00LTQiLz48cGF0aCBmaWxsPSIjQTAwNDFFIiBkPSJNOCAyOHMwLTQgMS01IDEzLjAwMS0xMC45OTkgMTQtMTAtOS4wMDEgMTMtMTAuMDAxIDE0UzggMjggOCAyOCIvPjwvc3ZnPg==" type="image/svg+xml">
  <style>
    :root {
      --primary-color: #0366d6;
      --secondary-color: #24292e;
      --accent-color: #2ea44f;
      --error-color: #cb2431;
      --bg-color: #ffffff;
      --text-color: #24292e;
      --border-color: #e1e4e8;
      --hover-color: #f6f8fa;
      --delete-color: #d73a49;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      line-height: 1.6;
      background-color: var(--bg-color);
      color: var(--text-color);
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      justify-content: center;
    }

    .container {
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
    }

    header h1 {
      color: var(--primary-color);
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    header p {
      color: var(--text-color);
      opacity: 0.8;
    }

    main {
      margin-bottom: 2rem;
    }

    .input-wrapper {
      margin-bottom: 1.5rem;
      width: 100%;
    }

    textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
      resize: vertical !important;
    }

    textarea#githubUrl {
      padding: 0.8rem 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      min-height: 58px;
      line-height: 1.4;
      resize: none;
      overflow: hidden;
    }

    textarea#githubUrl:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .button-container {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    .space-between-buttons {
      justify-content: space-between !important;
    }

    button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
      font-size: 1rem;
      font-weight: 600;
      min-width: 140px;
    }

    button:hover {
      background-color: #2188ff;
    }

    .result-container {
      background-color: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 1.5rem;
      margin-top: 1.5rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .download-button {
      display: inline-block;
      background-color: var(--accent-color);
      color: white;
      padding: 0.8rem 1.5rem;
      margin: 1rem 0;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.2s;
    }

    .download-button:hover {
      background-color: #2c974b;
    }

    .cache-status {
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.8;
      margin-top: 0.5rem;
    }

    .storage-info {
      text-align: center;
      margin-top: 2rem;
      padding: 0.8rem;
      background-color: var(--hover-color);
      border-radius: 6px;
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.8;
    }

    .storage-info p {
      margin: 0;
    }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0.9rem;
      opacity: 0.7;
      padding: 1rem 0;
      background-color: var(--bg-color);
      border-top: 1px solid var(--border-color);
      margin-top: auto;
    }

    footer a {
      color: inherit !important;
      text-decoration: none !important;
    }

    footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }
      
      .container {
        padding: 1.5rem 1rem;
      }
      
      .input-wrapper {
        padding: 0;
      }
      
      textarea#githubUrl {
        font-size: 0.9rem;
        padding: 0.7rem;
      }
      
      button {
        width: 100%;
        max-width: 200px;
        font-size: 0.95rem;
      }
      
      .result-container {
        padding: 1.2rem;
      }
    }

    @media (max-width: 480px) {
      header h1 {
        font-size: 1.7rem;
      }
      
      .container {
        padding: 1rem 0.8rem;
      }
      
      button {
        font-size: 0.9rem;
        padding: 0.7rem 1.2rem;
      }
    }

    .progress-container {
      width: 100%;
      margin-top: 1rem;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background-color: var(--border-color);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background-color: var(--primary-color);
      width: 0%;
      transition: width 0.3s ease;
    }

    .progress-text {
      text-align: center;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.8;
    }

    .admin-links {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }

    .admin-links a {
      color: var(--primary-color);
      text-decoration: none;
    }

    .admin-links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>BridgeCF</h1>
      <p>GitHub 文件加速下载服务</p>
    </header>

    <main>
      <div class="input-wrapper">
        <textarea 
          id="githubUrl" 
          placeholder="输入 GitHub 文件链接，例如: https://github.com/user/repo/releases/download/v1.0/file.zip"
          rows="1"
        ></textarea>
        <div class="button-container">
          <button id="downloadBtn">开启加速</button>
        </div>
      </div>

      <div class="result-container" id="resultContainer" style="display: none;">
        <div id="loadingIndicator" class="loading">
          <div class="spinner"></div>
          <p>正在处理中，请稍候...</p>
        </div>

        <div id="resultSuccess" style="display: none;">
          <h3>文件准备就绪！</h3>
          <p>您的文件 <span id="filename">file.zip</span> 已准备好下载</p>
          <a href="#" id="downloadLink" class="download-button" target="_blank">点击下载</a>
          <p class="cache-status">
            <span id="cacheStatus"></span>
          </p>
        </div>

        <div id="resultError" style="display: none;">
          <h3>出错了</h3>
          <p id="errorMessage">链接无效或文件不存在</p>
        </div>
      </div>
      
      <div class="storage-info">
        <p>当前缓存占用: <span id="storageUsage">加载中...</span></p>
      </div>
      
      <div class="admin-links">
        <p>管理功能：
          <a href="#" id="deleteCacheLink">通过URL删除缓存</a> |
          <a href="#" id="deleteAllCacheLink">清理所有缓存</a>
        </p>
      </div>
    </main>

    <footer>
      <p>© <span id="currentYear"></span> <a href="https://github.com/hcllmsx/BridgeCFworkers" target="_blank">BridgeCF</a></p>
    </footer>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const githubUrlInput = document.getElementById('githubUrl');
      const downloadBtn = document.getElementById('downloadBtn');
      const resultContainer = document.getElementById('resultContainer');
      const loadingIndicator = document.getElementById('loadingIndicator');
      const resultSuccess = document.getElementById('resultSuccess');
      const resultError = document.getElementById('resultError');
      const downloadLink = document.getElementById('downloadLink');
      const filename = document.getElementById('filename');
      const errorMessage = document.getElementById('errorMessage');
      const cacheStatus = document.getElementById('cacheStatus');
      
      // 添加进度条元素
      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-container';
      progressContainer.innerHTML = '<div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div><div class="progress-text">准备中... <span id="progressPercent">0%</span></div>';
      loadingIndicator.appendChild(progressContainer);

      // 从URL参数中获取GitHub链接（如果有）
      const urlParams = new URLSearchParams(window.location.search);
      const urlFromParam = urlParams.get('url');
      if (urlFromParam) {
        githubUrlInput.value = decodeURIComponent(urlFromParam);
      }
      
      downloadBtn.addEventListener('click', function() {
        processDownload();
      });
      
      githubUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          processDownload();
        }
      });
      
      function processDownload() {
        const githubUrl = githubUrlInput.value.trim();
        
        if (!githubUrl) {
          showError('请输入GitHub文件链接');
          return;
        }
        
        if (!isValidGitHubUrl(githubUrl)) {
          showError('请输入有效的GitHub文件链接');
          return;
        }
        
        // 显示加载指示器
        resultContainer.style.display = 'block';
        loadingIndicator.style.display = 'flex';
        resultSuccess.style.display = 'none';
        resultError.style.display = 'none';
        
        // 启动模拟进度条
        startFakeProgress();
        
        // 发送请求到API
        fetch('/api/download', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: githubUrl })
        })
        .then(response => response.json())
        .then(data => {
          // 完成进度条
          completeProgress();
          
          // 延迟一下再显示结果，让用户看到进度条完成
          setTimeout(() => {
            loadingIndicator.style.display = 'none';
            
            if (data.error) {
              showError(data.error);
              return;
            }
            
            if (data.success) {
              resultSuccess.style.display = 'block';
              
              // 提取文件名
              const filenameFromUrl = extractFilenameFromUrl(githubUrl);
              filename.textContent = filenameFromUrl;
              
              // 设置下载链接
              downloadLink.href = data.downloadUrl;
              
              // 如果是直接下载，添加target="_blank"属性
              if (data.directDownload) {
                downloadLink.setAttribute('target', '_blank');
                // 移除自动下载功能
              } else {
                downloadLink.removeAttribute('target');
              }
              
              // 显示缓存状态
              if (data.cached) {
                cacheStatus.textContent = '（已缓存，下载速度将更快）';
              } else {
                cacheStatus.textContent = '（首次下载，已为后续用户缓存）';
              }
              
              // 更新浏览器历史，便于分享
              const shareUrl = new URL(window.location.href);
              shareUrl.searchParams.set('url', githubUrl);
              window.history.pushState({}, '', shareUrl);
            }
          }, 500);
        })
        .catch(error => {
          completeProgress();
          setTimeout(() => {
            loadingIndicator.style.display = 'none';
            showError('请求失败，请稍后重试');
            console.error('Error:', error);
          }, 500);
        });
      }
      
      // 模拟进度条控制
      let progressInterval;
      const progressFill = document.getElementById('progressFill');
      const progressPercent = document.getElementById('progressPercent');
      
      function startFakeProgress() {
        let progress = 0;
        progressFill.style.width = '0%';
        progressPercent.textContent = '0%';
        
        // 快速到达20%
        setTimeout(() => {
          progress = 20;
          updateProgressBar(progress);
        }, 300);
        
        // 然后慢慢增加到80%
        progressInterval = setInterval(() => {
          if (progress < 80) {
            progress += Math.random() * 3;
            if (progress > 80) progress = 80;
            updateProgressBar(progress);
          }
        }, 500);
      }
      
      function completeProgress() {
        clearInterval(progressInterval);
        updateProgressBar(100);
      }
      
      function updateProgressBar(percent) {
        const roundedPercent = Math.round(percent);
        progressFill.style.width = roundedPercent + '%';
        progressPercent.textContent = roundedPercent + '%';
      }
      
      function showError(message) {
        resultSuccess.style.display = 'none';
        resultError.style.display = 'block';
        errorMessage.textContent = message;
      }
      
      function isValidGitHubUrl(url) {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.hostname === 'github.com' || 
                 parsedUrl.hostname === 'raw.githubusercontent.com' ||
                 parsedUrl.hostname.endsWith('.github.io');
        } catch (e) {
          return false;
        }
      }
      
      function extractFilenameFromUrl(url) {
        try {
          const parsedUrl = new URL(url);
          const pathSegments = parsedUrl.pathname.split('/');
          return pathSegments[pathSegments.length - 1] || 'file';
        } catch (e) {
          return 'file';
        }
      }

      // 设置动态年份
      document.getElementById('currentYear').textContent = new Date().getFullYear();
      
      // 获取存储使用情况
      fetch('/api/storage-info')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            document.getElementById('storageUsage').textContent = data.usageFormatted;
          } else {
            document.getElementById('storageUsage').textContent = '无法获取';
          }
        })
        .catch(() => {
          document.getElementById('storageUsage').textContent = '无法获取';
        });
      
      // 弹窗输入TOKEN并跳转管理页面
      document.getElementById('deleteCacheLink').addEventListener('click', function(e) {
        e.preventDefault();
        const token = prompt('请输入管理员TOKEN：');
        if (token) {
          window.location.href = '/DeleteCacheByURL?token=' + token;
        }
      });
      
      document.getElementById('deleteAllCacheLink').addEventListener('click', function(e) {
        e.preventDefault();
        const token = prompt('请输入管理员TOKEN：');
        if (token) {
          window.location.href = '/DeleteCacheALL?token=' + token;
        }
      });
      
      // 自动调整文本框高度
      const textarea = document.getElementById('githubUrl');
      
      function autoResize() {
        // 重置高度，以便可以计算新的内容高度
        textarea.style.height = 'auto';
        
        // 设置高度以匹配内容（+2px留一点空间）
        const newHeight = Math.max(58, textarea.scrollHeight);
        textarea.style.height = newHeight + 'px';
      }
      
      // 监听输入事件
      textarea.addEventListener('input', autoResize);
      
      // 在窗口大小变化时重新调整
      window.addEventListener('resize', autoResize);
      
      // 初始化
      setTimeout(autoResize, 10);
    });
  </script>
</body>
</html>`,
  'delete-cache.html': `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>删除缓存 - BridgeCF</title>
  <link rel="icon" href="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iI0EwMDQxRSIgZD0ibTEgMTcgOC03IDE2IDEgMSAxNi03IDhzLjAwMS01Ljk5OS02LTEyLTEyLTYtMTItNiIvPjxwYXRoIGZpbGw9IiNGRkFDMzMiIGQ9Ik0uOTczIDM1cy0uMDM2LTcuOTc5IDIuOTg1LTExUzE1IDIxLjE4NyAxNSAyMS4xODcgMTQuOTk5IDI5IDExLjk5OSAzMiAuOTczIDM1IC45NzMgMzUiLz48Y2lyY2xlIGN4PSI4Ljk5OSIgY3k9IjI3IiByPSI0IiBmaWxsPSIjRkZDQzREIi8+PHBhdGggZmlsbD0iIzU1QUNFRSIgZD0iTTM1Ljk5OSAwcy0xMCAwLTIyIDEwYy02IDUtNiAxNC00IDE2czExIDIgMTYtNGMxMC0xMiAxMC0yMiIvPjxwYXRoIGQ9Ik0yNi45OTkgNWE0IDQgMCAwIDAtMy42NDEgMi4zNkE0IDQgMCAwIDEgMjQuOTk5IDdhNCA0IDAgMCAxIDQgNGMwIC41ODYtLjEzMyAxLjEzOS0uMzU5IDEuNjRBMy45OSAzLjk5IDAgMCAwIDMwLjk5OSA5YTQgNCAwIDAgMC00LTQiLz48cGF0aCBmaWxsPSIjQTAwNDFFIiBkPSJNOCAyOHMwLTQgMS01IDEzLjAwMS0xMC45OTkgMTQtMTAtOS4wMDEgMTMtMTAuMDAxIDE0UzggMjggOCAyOCIvPjwvc3ZnPg==" type="image/svg+xml">
  <style>
    /* 复用相同的样式 */
    :root {
      --primary-color: #0366d6;
      --secondary-color: #24292e;
      --accent-color: #2ea44f;
      --error-color: #cb2431;
      --bg-color: #ffffff;
      --text-color: #24292e;
      --border-color: #e1e4e8;
      --hover-color: #f6f8fa;
      --delete-color: #d73a49;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      line-height: 1.6;
      background-color: var(--bg-color);
      color: var(--text-color);
      padding: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
      flex: 1;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    h1 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .input-wrapper {
      margin-bottom: 1.5rem;
      width: 100%;
    }

    textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
      resize: vertical !important;
      min-height: 58px;
      line-height: 1.4;
    }

    textarea#urlInput {
      padding: 0.8rem 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      resize: none;
      overflow: hidden;
    }

    textarea#urlInput:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .button-container {
      display: flex;
      justify-content: space-between;
    }

    button {
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s, opacity 0.2s;
    }

    button.delete-btn {
      background-color: var(--delete-color);
    }

    button.delete-btn:hover {
      background-color: #cb2431;
    }

    button.back-btn {
      background-color: var(--accent-color);
    }

    button.back-btn:hover {
      background-color: #2c974b;
    }
    
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .result {
      margin-top: 1.5rem;
      padding: 1rem;
      border-radius: 6px;
    }

    .success {
      background-color: #e6ffed;
      color: #2c974b;
    }

    .error {
      background-color: #ffe6e6;
      color: #cb2431;
    }
    
    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin-right: 8px;
      vertical-align: middle;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0.9rem;
      opacity: 0.7;
      padding: 1rem 0;
      background-color: var(--bg-color);
      border-top: 1px solid var(--border-color);
      margin-top: auto;
    }

    footer a {
      color: inherit !important;
      text-decoration: none !important;
    }

    footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      body {
        padding: 1.5rem 1rem;
      }
      
      textarea#urlInput {
        font-size: 0.9rem;
        padding: 0.7rem;
      }
      
      button {
        width: 100%;
        max-width: 200px;
        font-size: 0.95rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>通过URL删除缓存</h1>
    
    <div class="input-wrapper">
      <textarea 
        id="urlInput" 
        placeholder="输入要删除的GitHub文件链接，例如: https://github.com/user/repo/releases/download/v1.0/file.zip"
        rows="1"
      ></textarea>
      <div class="button-container">
        <button id="deleteBtn" class="delete-btn">删除缓存</button>
        <button id="backBtn" class="back-btn">返回首页</button>
      </div>
    </div>

    <div id="result" class="result" style="display: none;"></div>
  </div>

  <footer>
    <p>© <span id="currentYear"></span> <a href="https://github.com/hcllmsx/BridgeCFworkers" target="_blank">BridgeCF</a></p>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const urlInput = document.getElementById('urlInput');
      const deleteBtn = document.getElementById('deleteBtn');
      const backBtn = document.getElementById('backBtn');
      const result = document.getElementById('result');

      // 从URL参数中获取token
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        result.style.display = 'block';
        result.className = 'result error';
        result.textContent = '错误：缺少管理令牌';
        return;
      }

      // 自动调整文本框高度
      function autoResize() {
        urlInput.style.height = 'auto';
        const newHeight = Math.max(58, urlInput.scrollHeight);
        urlInput.style.height = newHeight + 'px';
      }
      
      urlInput.addEventListener('input', autoResize);
      window.addEventListener('resize', autoResize);
      setTimeout(autoResize, 10);

      deleteBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();
        
        if (!url) {
          result.style.display = 'block';
          result.className = 'result error';
          result.textContent = '请输入要删除的GitHub文件链接';
          return;
        }

        // 禁用按钮并显示加载状态
        deleteBtn.disabled = true;
        let originalText = deleteBtn.textContent;
        deleteBtn.innerHTML = '<span class="loading-spinner"></span> 处理中...';
        
        // 发送删除请求
        fetch('/api/delete-cache-by-url?token=' + token, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
          // 恢复按钮状态
          deleteBtn.disabled = false;
          deleteBtn.innerHTML = originalText;
          
          result.style.display = 'block';
          
          if (data.success) {
            result.className = 'result success';
            result.textContent = '✅ 缓存删除成功';
          } else {
            result.className = 'result error';
            result.textContent = data.error || '删除失败';
          }
        })
        .catch(error => {
          // 恢复按钮状态
          deleteBtn.disabled = false;
          deleteBtn.innerHTML = originalText;
          
          result.style.display = 'block';
          result.className = 'result error';
          result.textContent = '请求失败，请稍后重试';
          console.error('Error:', error);
        });
      });

      backBtn.addEventListener('click', function() {
        window.location.href = '/';
      });

      // 设置动态年份
      document.getElementById('currentYear').textContent = new Date().getFullYear();
    });
  </script>
</body>
</html>`
};

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (e) {
      // 返回简单的错误提示而不是内联HTML
      return new Response('服务器错误：' + e.message, {
        status: 500,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
      });
    }
  },
  async scheduled(event, env, ctx) {
    // 初始化数据库
    await initDatabase(env);
    
    // 处理数据库中可能存在的重复URL记录
    await consolidateDuplicateUrls(env);
  }
};

/**
 * 处理请求的主函数
 * @param {Request} request
 * @param {Object} env 环境变量和绑定
 * @param {Object} ctx 执行上下文
 */
async function handleRequest(request, env, ctx) {
  // 确保数据库已初始化
  let dbInitPromise;
  if (!globalThis.dbInitialized) {
    dbInitPromise = initDatabase(env).then(() => {
      globalThis.dbInitialized = true;
    });
    ctx.waitUntil(dbInitPromise);
  }

  const url = new URL(request.url);
  
  // 处理API请求
  if (url.pathname === "/api/download") {
    return handleDownload(request, env, ctx);
  }

  // 处理存储信息API请求
  if (url.pathname === "/api/storage-info") {
    return handleStorageInfo(request, env, ctx);
  }
  
  // 处理文件下载
  if (url.pathname.startsWith("/download/")) {
    return handleFileDownload(request, url.pathname.replace("/download/", ""), env, ctx);
  }

  // 处理缓存删除请求 - 删除所有缓存
  if (url.pathname === "/DeleteCacheALL") {
    const token = url.searchParams.get("token");
    return handleDeleteAllCache(request, token, env, ctx);
  }

  // 处理按URL删除缓存的管理页面
  if (url.pathname === "/DeleteCacheByURL") {
    const token = url.searchParams.get("token");
    return handleDeleteCacheByURLPage(request, token, env, ctx);
  }

  // 处理按URL删除缓存的API
  if (url.pathname === "/api/delete-cache-by-url") {
    const token = url.searchParams.get("token");
    return handleDeleteCacheByURL(request, token, env, ctx);
  }

  // 处理静态资源请求
  if (url.pathname === "/" || url.pathname === "/index.html") {
    return new Response(STATIC_RESOURCES['index.html'], {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }

  if (url.pathname === "/delete-cache.html") {
    return new Response(STATIC_RESOURCES['delete-cache.html'], {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }

  // 对于其他请求，返回404
  return new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
  });
}

/**
 * 处理下载请求
 * @param {Request} request
 * @param {Object} env 环境变量和绑定
 * @param {Object} ctx 执行上下文
 */
async function handleDownload(request, env, ctx) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { url } = data;
  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 检查是否为有效的GitHub下载链接
  if (!isValidGithubUrl(url)) {
    return new Response(JSON.stringify({ error: "Invalid GitHub URL" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 为URL生成唯一ID
    const fileId = generateFileId(url);
    
    // 检查数据库中是否已经有相同URL的下载记录
    const existingRecord = await env.DB.prepare(`
      SELECT file_id FROM downloads WHERE source_url = ? LIMIT 1
    `).bind(url).first();
    
    // 如果找到已有记录
    if (existingRecord) {
      // 检查R2中是否存在该文件
      const cachedFile = await env.R2_BUCKET.head(fileId);
      
      if (cachedFile) {
        // 更新下载计数
        await updateDownloadStats(fileId, url, env);
        
        // 确保使用R2公共URL（如果配置了）
        if (env.R2_PUBLIC_URL) {
          const r2PublicUrl = `${env.R2_PUBLIC_URL}/${fileId}`;
          return new Response(JSON.stringify({
            success: true,
            downloadUrl: r2PublicUrl,
            cached: true,
            directDownload: true
          }), {
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  
    // 检查存储容量
    await checkAndCleanStorage(env);
    
    // 从GitHub获取文件信息
    const headResponse = await fetch(url, { method: 'HEAD' });
    
    if (!headResponse.ok) {
      throw new Error(`Failed to fetch from GitHub: ${headResponse.status}`);
    }
    
    const contentType = headResponse.headers.get("Content-Type") || "application/octet-stream";
    const contentLength = headResponse.headers.get("Content-Length");
    const filename = getFilenameFromUrl(url);

    // 检查文件大小是否超过100MB（需要流式处理）
    const isLargeFile = contentLength && parseInt(contentLength) > 100 * 1024 * 1024;

    if (isLargeFile) {
      // 大文件处理：直接从GitHub流式传输到R2
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch from GitHub: ${response.status}`);
      }
      
      // 使用流式上传到R2
      await env.R2_BUCKET.put(fileId, response.body, {
        httpMetadata: {
          contentType,
          contentDisposition: `attachment; filename="${filename}"`,
        },
        customMetadata: {
          sourceUrl: url,
          filename,
          dateAdded: new Date().toISOString()
        }
      });
    } else {
      // 小文件处理：可以一次性下载
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch from GitHub: ${response.status}`);
      }
      
      const fileData = await response.arrayBuffer();
      
      // 保存到R2
      await env.R2_BUCKET.put(fileId, fileData, {
        httpMetadata: {
          contentType,
          contentDisposition: `attachment; filename="${filename}"`,
        },
        customMetadata: {
          sourceUrl: url,
          filename,
          dateAdded: new Date().toISOString()
        }
      });
    }
    
    // 记录下载信息到D1
    await recordDownload(fileId, url, filename, contentLength ? parseInt(contentLength) : 0, env);
    
    // 优先使用R2公共URL
    if (env.R2_PUBLIC_URL) {
      const r2PublicUrl = `${env.R2_PUBLIC_URL}/${fileId}`;
      return new Response(JSON.stringify({
        success: true,
        downloadUrl: r2PublicUrl,
        cached: false,
        directDownload: true
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // 如果没有配置R2公共URL，使用Worker代理
    return new Response(JSON.stringify({
      success: true,
      downloadUrl: `/download/${fileId}`,
      cached: false,
      directDownload: false
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

/**
 * 处理文件下载请求
 * @param {Request} request
 * @param {string} fileId
 * @param {Object} env 环境变量和绑定
 * @param {Object} ctx 执行上下文
 */
async function handleFileDownload(request, fileId, env, ctx) {
  try {
    // 从数据库获取文件信息
    const fileRecord = await env.DB.prepare(`
      SELECT filename FROM downloads WHERE file_id = ? LIMIT 1
    `).bind(fileId).first();
    
    const filename = fileRecord ? fileRecord.filename : 'download';
    
    // 如果配置了R2公共URL，构建带有正确查询参数的URL
    if (env.R2_PUBLIC_URL) {
      // 检查R2中是否存在该文件
      const exists = await env.R2_BUCKET.head(fileId);
      if (!exists) {
        return new Response("❌ 文件不存在！", { status: 404 });
      }
      
      // 更新下载计数
      await updateDownloadStats(fileId, null, env);
      
      // 构建带有内容处置的URL
      // 添加必要的查询参数，以确保文件作为附件下载，且带有正确的文件名
      const disposition = `attachment; filename="${encodeURIComponent(filename)}"`;
      const r2PublicUrl = `${env.R2_PUBLIC_URL}/${fileId}?response-content-disposition=${encodeURIComponent(disposition)}`;
      
      // 使用307临时重定向，保留原始请求的方法和正文
      return Response.redirect(r2PublicUrl, 307);
    }
    
    // 如果没有配置R2公共URL，通过Worker提供文件
    const file = await env.R2_BUCKET.get(fileId);
    
    if (!file) {
      return new Response("❌ 文件不存在！", { status: 404 });
    }
    
    // 更新下载计数
    await updateDownloadStats(fileId, null, env);
    
    // 返回文件（流式传输）
    return new Response(file.body, {
      headers: {
        "Content-Type": file.httpMetadata.contentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000",
        "Content-Length": file.size,
        "Accept-Ranges": "bytes"
      }
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

/**
 * 检查是否为有效的GitHub下载链接
 * @param {string} url
 * @returns {boolean}
 */
function isValidGithubUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === "github.com" || 
           parsedUrl.hostname === "raw.githubusercontent.com" ||
           parsedUrl.hostname.endsWith(".github.io");
  } catch (e) {
    return false;
  }
}

/**
 * 生成唯一的文件标识符
 * @param {string} url
 * @returns {string}
 */
function generateFileId(url) {
  // 使用URL的哈希值，不再包含时间戳，确保相同URL产生相同ID
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return hash.toString(16).replace('-', 'n'); // 替换负号为"n"以防止歧义
}

/**
 * 从URL中获取文件名
 * @param {string} url
 * @returns {string}
 */
function getFilenameFromUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const segments = pathname.split('/');
    return segments[segments.length - 1] || "download";
  } catch (e) {
    return "download";
  }
}

/**
 * 记录下载信息到D1
 * @param {string} fileId
 * @param {string} sourceUrl
 * @param {string} filename
 * @param {number} fileSize
 * @param {Object} env 环境变量和绑定
 */
async function recordDownload(fileId, sourceUrl, filename, fileSize, env) {
  await env.DB.prepare(`
    INSERT INTO downloads (file_id, source_url, filename, file_size, download_count, date_added, last_accessed)
    VALUES (?, ?, ?, ?, 1, datetime('now'), datetime('now'))
  `).bind(fileId, sourceUrl, filename, fileSize).run();
}

/**
 * 更新下载统计
 * @param {string} fileId
 * @param {string} sourceUrl 可选参数，用于在文件不存在时添加
 * @param {Object} env 环境变量和绑定
 */
async function updateDownloadStats(fileId, sourceUrl = null, env) {
  // 检查记录是否存在
  const record = await env.DB.prepare(`
    SELECT * FROM downloads WHERE file_id = ?
  `).bind(fileId).first();
  
  if (record) {
    // 更新下载计数和最后访问时间
    await env.DB.prepare(`
      UPDATE downloads 
      SET download_count = download_count + 1, last_accessed = datetime('now')
      WHERE file_id = ?
    `).bind(fileId).run();
  } else if (sourceUrl) {
    // 如果记录不存在但提供了sourceUrl，尝试获取文件信息并添加记录
    const file = await env.R2_BUCKET.head(fileId);
    if (file) {
      const filename = file.customMetadata.filename || "unknown";
      const fileSize = file.size || 0;
      await recordDownload(fileId, sourceUrl, filename, fileSize, env);
    }
  }
}

/**
 * 检查存储容量并清理旧文件
 * @param {Object} env 环境变量和绑定
 */
async function checkAndCleanStorage(env) {
  // 获取最大存储容量（GB）
  const maxStorageGB = parseInt(env.MAX_STORAGE_SIZE || "8");
  const maxStorageBytes = maxStorageGB * 1024 * 1024 * 1024;
  
  // 获取当前使用的存储容量
  let currentUsage = 0;
  const objects = await env.R2_BUCKET.list();
  
  if (objects.objects) {
    for (const obj of objects.objects) {
      currentUsage += obj.size;
    }
  }
  
  // 如果当前使用量接近限制，清理旧文件
  if (currentUsage > maxStorageBytes * 0.9) {
    // 获取文件过期天数
    const expiryDays = parseInt(env.FILE_EXPIRY_DAYS || "30");
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() - expiryDays);
    
    // 从D1获取最少使用的文件
    const oldestFiles = await env.DB.prepare(`
      SELECT file_id FROM downloads
      WHERE last_accessed < datetime(?)
      ORDER BY last_accessed ASC, download_count ASC
      LIMIT 50
    `).bind(expiryDate.toISOString()).all();
    
    // 删除旧文件
    if (oldestFiles.results && oldestFiles.results.length > 0) {
      for (const file of oldestFiles.results) {
        await env.R2_BUCKET.delete(file.file_id);
        await env.DB.prepare(`
          DELETE FROM downloads WHERE file_id = ?
        `).bind(file.file_id).run();
      }
    }
    
    // 如果仍然需要更多空间，删除最少使用的文件
    if (currentUsage > maxStorageBytes * 0.8) {
      const leastUsedFiles = await env.DB.prepare(`
        SELECT file_id FROM downloads
        ORDER BY download_count ASC, last_accessed ASC
        LIMIT 50
      `).bind().all();
      
      if (leastUsedFiles.results && leastUsedFiles.results.length > 0) {
        for (const file of leastUsedFiles.results) {
          await env.R2_BUCKET.delete(file.file_id);
          await env.DB.prepare(`
            DELETE FROM downloads WHERE file_id = ?
          `).bind(file.file_id).run();
        }
      }
    }
  }
}

/**
 * 初始化数据库
 * @param {Object} env 环境变量和绑定
 */
async function initDatabase(env) {
  try {
    // 创建下载记录表
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS downloads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_id TEXT NOT NULL UNIQUE,
        source_url TEXT NOT NULL,
        filename TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        download_count INTEGER NOT NULL DEFAULT 0,
        date_added TEXT NOT NULL,
        last_accessed TEXT NOT NULL
      )
    `).run();
    
    // 创建索引
    await env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS idx_file_id ON downloads (file_id)
    `).run();
    
    await env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS idx_last_accessed ON downloads (last_accessed)
    `).run();
    
    await env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS idx_download_count ON downloads (download_count)
    `).run();

    return true;
  } catch (error) {
    console.error("数据库初始化失败:", error);
    return false;
  }
}

/**
 * 处理数据库中重复URL的记录
 * @param {Object} env 环境变量和绑定
 */
async function consolidateDuplicateUrls(env) {
  try {
    console.log("开始检查数据库中的重复URL...");
    
    // 查找所有有重复URL的记录
    const duplicates = await env.DB.prepare(`
      SELECT source_url, COUNT(*) as count 
      FROM downloads 
      GROUP BY source_url 
      HAVING count > 1
    `).all();
    
    if (!duplicates.results || duplicates.results.length === 0) {
      console.log("没有找到重复URL记录");
      return;
    }
    
    console.log(`找到 ${duplicates.results.length} 个重复URL`);
    
    // 处理每个重复URL
    for (const dup of duplicates.results) {
      const url = dup.source_url;
      const newFileId = generateFileId(url);
      
      console.log(`处理URL: ${url}, 新ID: ${newFileId}`);
      
      // 获取该URL的所有记录，按下载计数和最后访问时间排序
      const records = await env.DB.prepare(`
        SELECT * FROM downloads 
        WHERE source_url = ? 
        ORDER BY download_count DESC, last_accessed DESC
      `).bind(url).all();
      
      if (!records.results || records.results.length <= 1) {
        continue; // 安全检查
      }
      
      // 保留下载次数最多的记录（或最近访问的）作为主记录
      const mainRecord = records.results[0];
      
      // 累计下载次数
      let totalDownloads = mainRecord.download_count;
      
      // 从R2中检查主记录是否存在
      let mainFileExists = await env.R2_BUCKET.head(mainRecord.file_id) !== null;
      
      // 查找第一个在R2中存在的文件
      let fileToKeep = mainRecord.file_id;
      let fileExists = mainFileExists;
      
      for (let i = 1; i < records.results.length; i++) {
        const record = records.results[i];
        totalDownloads += record.download_count;
        
        // 如果主文件不存在，检查这个记录的文件是否存在
        if (!fileExists) {
          const exists = await env.R2_BUCKET.head(record.file_id) !== null;
          if (exists) {
            fileToKeep = record.file_id;
            fileExists = true;
          }
        }
      }
      
      // 如果没有找到存在的文件，跳过
      if (!fileExists) {
        console.log(`没有找到URL ${url} 的有效文件，跳过`);
        continue;
      }
      
      // 计划稍后删除的旧记录ID
      const idsToDelete = records.results
        .slice(1) // 跳过主记录
        .map(r => r.file_id);
      
      // 更新主记录
      await env.DB.prepare(`
        UPDATE downloads 
        SET file_id = ?, download_count = ?
        WHERE id = ?
      `).bind(newFileId, totalDownloads, mainRecord.id).run();
      
      // 如果主记录的file_id不是要保留的file_id，需要复制R2对象
      if (mainRecord.file_id !== fileToKeep && mainRecord.file_id !== newFileId) {
        if (fileExists) {
          const fileObj = await env.R2_BUCKET.get(fileToKeep);
          if (fileObj) {
            await env.R2_BUCKET.put(newFileId, fileObj.body, {
              httpMetadata: fileObj.httpMetadata,
              customMetadata: fileObj.customMetadata
            });
          }
        }
      } else if (mainRecord.file_id !== newFileId && mainFileExists) {
        // 如果主记录的file_id需要更改且文件存在，复制它
        const fileObj = await env.R2_BUCKET.get(mainRecord.file_id);
        if (fileObj) {
          await env.R2_BUCKET.put(newFileId, fileObj.body, {
            httpMetadata: fileObj.httpMetadata,
            customMetadata: fileObj.customMetadata
          });
        }
      }
      
      // 删除重复的记录
      for (const id of idsToDelete) {
        await env.DB.prepare(`
          DELETE FROM downloads WHERE file_id = ?
        `).bind(id).run();
        
        // 只有当这个文件ID不是要保留的ID时才删除它
        if (id !== fileToKeep) {
          try {
            await env.R2_BUCKET.delete(id);
          } catch (e) {
            console.error(`删除R2对象 ${id} 失败:`, e);
          }
        }
      }
      
      // 如果保留的文件ID不是新ID，但它存在于R2中，需要复制
      if (fileToKeep !== newFileId && fileExists) {
        const fileObj = await env.R2_BUCKET.get(fileToKeep);
        if (fileObj) {
          await env.R2_BUCKET.put(newFileId, fileObj.body, {
            httpMetadata: fileObj.httpMetadata,
            customMetadata: {
              ...fileObj.customMetadata,
              sourceUrl: url
            }
          });
          
          // 删除旧文件
          try {
            await env.R2_BUCKET.delete(fileToKeep);
          } catch (e) {
            console.error(`删除R2对象 ${fileToKeep} 失败:`, e);
          }
        }
      }
      
      console.log(`合并完成: URL ${url}, 新ID: ${newFileId}, 总下载量: ${totalDownloads}`);
    }
    
    console.log("重复URL处理完成");
  } catch (error) {
    console.error("合并重复URL时出错:", error);
  }
}

/**
 * 处理存储信息请求
 * @param {Request} request
 * @param {Object} env 环境变量和绑定
 * @param {Object} ctx 执行上下文
 */
async function handleStorageInfo(request, env, ctx) {
  try {
    // 获取R2存储桶中的所有对象
    const objects = await env.R2_BUCKET.list();
    
    // 计算总存储大小
    let totalSize = 0;
    let fileCount = 0;
    
    if (objects.objects) {
      fileCount = objects.objects.length;
      for (const obj of objects.objects) {
        totalSize += obj.size;
      }
    }
    
    // 获取最大存储容量（GB）
    const maxStorageGB = parseInt(env.MAX_STORAGE_SIZE || "8");
    const maxStorageBytes = maxStorageGB * 1024 * 1024 * 1024;
    
    // 计算使用百分比
    const usagePercent = (totalSize / maxStorageBytes) * 100;
    
    // 格式化大小显示
    let usageFormatted = "";
    if (totalSize < 1024) {
      usageFormatted = `${totalSize} B`;
    } else if (totalSize < 1024 * 1024) {
      usageFormatted = `${(totalSize / 1024).toFixed(2)} KB`;
    } else if (totalSize < 1024 * 1024 * 1024) {
      usageFormatted = `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      usageFormatted = `${(totalSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
    
    // 将使用百分比添加到显示信息中
    usageFormatted = `${usageFormatted} / ${maxStorageGB} GB (${usagePercent.toFixed(2)}%) · ${fileCount} 个文件`;
    
    return new Response(JSON.stringify({
      success: true,
      usage: totalSize,
      maxStorage: maxStorageBytes,
      usagePercent: usagePercent,
      usageFormatted: usageFormatted,
      fileCount: fileCount
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

/**
 * 处理删除所有缓存的请求
 * @param {Request} request
 * @param {string} token 验证令牌
 * @param {Object} env 环境变量和绑定
 * @param {Object} ctx 执行上下文
 */
async function handleDeleteAllCache(request, token, env, ctx) {
  // 验证令牌
  if (!token || token !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({
      success: false,
      error: "未授权访问"
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  
  try {
    // 获取所有缓存文件
    const objects = await env.R2_BUCKET.list();
    
    let deletedCount = 0;
    if (objects.objects && objects.objects.length > 0) {
      // 删除所有R2对象
      for (const obj of objects.objects) {
        await env.R2_BUCKET.delete(obj.key);
        deletedCount++;
      }
      
      // 清空数据库记录
      await env.DB.prepare(`DELETE FROM downloads`).run();
    }
    
    // 返回JSON响应而不是HTML
    return new Response(JSON.stringify({
      success: true,
      deletedCount,
      message: `已成功删除 ${deletedCount} 个缓存文件并清空数据库记录`
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

/**
 * 处理按URL删除缓存的管理页面
 * @param {Request} request
 * @param {string} token 验证令牌
 * @param {Object} env 环境变量和绑定
 * @param {Object} ctx 执行上下文
 */
async function handleDeleteCacheByURLPage(request, token, env, ctx) {
  // 验证令牌
  if (!token || token !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({
      success: false,
      error: "未授权访问"
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  
  // 直接返回内联的HTML内容
  return new Response(STATIC_RESOURCES['delete-cache.html'], {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

/**
 * 处理通过URL删除缓存的API请求
 * @param {Request} request
 * @param {string} token 验证令牌
 * @param {Object} env 环境变量和绑定
 * @param {Object} ctx 执行上下文
 */
async function handleDeleteCacheByURL(request, token, env, ctx) {
  // 验证令牌
  if (!token || token !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({
      success: false,
      error: "未授权访问"
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  
  // 验证请求方法
  if (request.method !== "POST") {
    return new Response(JSON.stringify({
      success: false,
      error: "Method not allowed"
    }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }
  
  // 解析请求体
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({
      success: false,
      error: "Invalid JSON"
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  
  const { url } = data;
  if (!url) {
    return new Response(JSON.stringify({
      success: false,
      error: "URL is required"
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  
  try {
    // 从数据库中查找对应URL的文件
    const fileRecord = await env.DB.prepare(`
      SELECT file_id, filename, file_size, download_count FROM downloads 
      WHERE source_url = ? LIMIT 1
    `).bind(url).first();
    
    if (!fileRecord) {
      return new Response(JSON.stringify({
        success: false,
        error: "❌ 文件不存在！"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const fileId = fileRecord.file_id;
    
    // 检查R2中是否存在该文件
    const fileExists = await env.R2_BUCKET.head(fileId);
    
    if (!fileExists) {
      // 文件在数据库中有记录，但R2中不存在
      // 删除数据库记录并返回部分成功
      await env.DB.prepare(`
        DELETE FROM downloads WHERE file_id = ?
      `).bind(fileId).run();
      
      return new Response(JSON.stringify({
        success: true,
        message: "Database record deleted, but file was not found in storage",
        fileId: fileId,
        fileInfo: fileRecord
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // 删除R2对象
    await env.R2_BUCKET.delete(fileId);
    
    // 删除数据库记录
    await env.DB.prepare(`
      DELETE FROM downloads WHERE file_id = ?
    `).bind(fileId).run();
    
    return new Response(JSON.stringify({
      success: true,
      message: "File and database record deleted successfully",
      fileId: fileId,
      fileInfo: fileRecord
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
