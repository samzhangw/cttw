const vocationalGroups = {
  '機械群': ['機械科', '鑄造科', '板金科', '機械木模科', '配管科', '模具科', '機電科', '製圖科', '生物產業機電科', '電腦機械製圖科'],
  '動力機械群': ['汽車科', '重機科', '飛機修護科', '動力機械科', '農業機械科', '軌道車輛科'],
  '電機與電子群': ['資訊科', '電子科', '控制科', '電機科', '冷凍空調科', '航空電子科', '電機空調科'],
  '化工群': ['化工科', '紡織科', '染整科'],
  '土木與建築群': ['建築科', '土木科', '消防工程科', '空間測繪科'],
  '商業與管理群': ['商業經營科', '國際貿易科', '會計事務科', '資料處理科', '不動產事務科', '電子商務科', '流通管理科', '農產行銷科', '航運管理科'],
  '外語群': ['應用外語科（英文組）', '應用外語科（日文組）'],
  '設計群': ['家具木工科', '美工科', '陶瓷工程科', '室內空間設計科', '圖文傳播科', '金屬工藝科', '家具設計科', '廣告設計科', '多媒體設計科', '多媒體應用科', '室內設計科'],
  '農業群': ['農場經營科', '園藝科', '森林科', '野生動物保育科', '造園科', '畜產保健科'],
  '食品群': ['食品加工科', '食品科', '水產食品科', '烘焙科'],
  '家政群': ['家政科', '服裝科', '幼兒保育科', '美容科', '時尚模特兒科', '流行服飾科', '時尚造型科', '照顧服務科'],
  '餐旅群': ['觀光事業科', '餐飲管理科']
};

function toggleVocationalGroup() {
  const schoolType = document.getElementById('schoolType').value;
  const vocationalGroupContainer = document.getElementById('vocationalGroupContainer');
  const vocationalGroup = document.getElementById('vocationalGroup');

  if (schoolType === '職業類科') {
    vocationalGroupContainer.style.display = 'block';
  } else {
    vocationalGroupContainer.style.display = 'none';
    vocationalGroup.value = 'all'; // 清空職業類科的選擇，恢復到默認值
  }
}

function selectIdentity(identity) {
  const cards = document.querySelectorAll('.identity-card');
  cards.forEach(card => {
    card.classList.remove('selected');
  });
  
  document.getElementById(`identity-${identity}`).classList.add('selected');
  document.getElementById('selectedIdentity').value = identity;
  
  // 記錄用戶選擇的身分
  logUserActivity('select_identity', { identity });
  
  // 滑動到分析表單
  document.getElementById('analysisForm').scrollIntoView({ behavior: 'smooth' });
  
  // 顯示選擇後的提示
  const identityNames = {
    'student': '學生',
    'parent': '家長',
    'teacher': '老師'
  };
  
  const confirmationElement = document.getElementById('identityConfirmation');
  confirmationElement.textContent = `您選擇的身分是: ${identityNames[identity]}`;
  confirmationElement.style.display = 'block';
  
  // 添加淡入動畫
  setTimeout(() => {
    confirmationElement.classList.add('show');
  }, 100);
}

function toggleInstructions() {
  var instructionsModal = document.getElementById('instructionsModal');
  var modalContent = instructionsModal.querySelector('.modal-content');
  instructionsModal.style.display = 'block';
  
  setTimeout(() => {
    instructionsModal.classList.add('show');
    modalContent.classList.add('show-content');
  }, 10);
}

function closeInstructions() {
  var modal = document.getElementById('instructionsModal');
  var modalContent = modal.querySelector('.modal-content');
  modalContent.classList.remove('show-content');
  modal.classList.remove('show');
  
  setTimeout(() => {
    modal.style.display = 'none';
  }, 400);
}

let isDragging = false;
let startY;
let startTop;

function showDisclaimer() {
  var modal = document.getElementById('disclaimerModal');
  var modalContent = modal.querySelector('.modal-content');
  modal.style.display = 'block';
  
  // Add slight delay before adding show class for better animation
  setTimeout(() => {
    modal.classList.add('show');
    modalContent.classList.add('show-content');
  }, 10);
  
  modalContent.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);
  
  modalContent.addEventListener('touchstart', startDragging);
  document.addEventListener('touchmove', drag);
  document.addEventListener('touchend', stopDragging);
}

function closeDisclaimer() {
  var modal = document.getElementById('disclaimerModal');
  var modalContent = modal.querySelector('.modal-content');
  modalContent.classList.remove('show-content');
  modal.classList.remove('show');
  
  // Add delay to match animation duration before hiding
  setTimeout(() => {
    modal.style.display = 'none';
  }, 400);
}

function startDragging(e) {
  isDragging = true;
  startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
  startTop = parseInt(window.getComputedStyle(this).top);
  this.style.cursor = 'grabbing';
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  let modalContent = document.querySelector('.modal-content');
  let currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
  let deltaY = currentY - startY;
  modalContent.style.top = `${startTop + deltaY}px`;
}

function stopDragging() {
  isDragging = false;
  document.querySelector('.modal-content').style.cursor = 'grab';
}

document.querySelectorAll('.modal .close').forEach(function(btn) {
  btn.addEventListener('click', function() {
    this.closest('.modal').style.display = 'none';
  });
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById('disclaimerModal');
  if (event.target == modal) {
    closeDisclaimer();
  }
  var exportModal = document.getElementById('exportModal');
  if (event.target == exportModal) {
    closeExportModal();
  }
  var instructionsModal = document.getElementById('instructionsModal');
  if (event.target == instructionsModal) {
    closeInstructions();
  }
}

function generateInvitationCode() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  return `CTTW${year}${month}${day}${hour}`;
}

// Add showLoading and hideLoading functions
function showLoading() {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner-container">
        <div class="spinner-ring"></div>
        <div class="spinner-inner">
          <div class="spinner-circle"></div>
          <div class="spinner-icon"><i class="fas fa-chart-line"></i></div>
        </div>
      </div>
      <div class="loading-text">分析中，請稍候...</div>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <div class="loading-status">準備中...</div>
      </div>
      <div class="loading-steps">
        <div class="step active"><i class="fas fa-cog"></i><span>初始化</span></div>
        <div class="step"><i class="fas fa-database"></i><span>資料收集</span></div>
        <div class="step"><i class="fas fa-calculator"></i><span>計算積分</span></div>
        <div class="step"><i class="fas fa-check-circle"></i><span>完成</span></div>
      </div>
    </div>
  `;
  document.body.appendChild(loadingOverlay);

  // Fade in animation
  requestAnimationFrame(() => {
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.opacity = '0';
    requestAnimationFrame(() => {
      loadingOverlay.style.transition = 'opacity 0.3s ease';
      loadingOverlay.style.opacity = '1';
      
      // Animate the progress bar
      setTimeout(() => animateAnalysisProgress(), 300);
    });
  });
}

function animateAnalysisProgress() {
  const progressFill = document.querySelector('.progress-fill');
  const loadingStatus = document.querySelector('.loading-status');
  const loadingSteps = document.querySelectorAll('.loading-steps .step');
  
  const statuses = [
    '準備分析資料...',
    '收集學校資訊...',
    '比對成績條件...',
    '計算會考積分...',
    '整理結果報表...',
    '完成！'
  ];
  
  let currentStep = 0;
  const totalSteps = statuses.length;
  
  const updateProgress = () => {
    if (currentStep >= totalSteps) return;
    
    const progress = (currentStep + 1) / totalSteps;
    progressFill.style.width = `${progress * 100}%`;
    loadingStatus.textContent = statuses[currentStep];
    loadingStatus.classList.add('pulse');
    
    // Update step indicators
    loadingSteps.forEach((step, index) => {
      if (index < Math.floor(currentStep / (totalSteps / loadingSteps.length))) {
        step.classList.add('active', 'completed');
        step.classList.remove('current');
      } else if (index === Math.floor(currentStep / (totalSteps / loadingSteps.length))) {
        step.classList.add('active', 'current');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'current', 'completed');
      }
    });
    
    setTimeout(() => {
      loadingStatus.classList.remove('pulse');
      currentStep++;
      if (currentStep < totalSteps) {
        const delay = currentStep === totalSteps - 1 ? 300 : (500 + Math.random() * 500);
        setTimeout(updateProgress, delay);
      } else {
        // Final step animation
        loadingSteps.forEach((step) => {
          step.classList.add('active', 'completed');
          step.classList.remove('current');
        });
      }
    }, 300);
  };
  
  updateProgress();
}

function hideLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.remove();
    }, 300);
  }
}

async function logUserActivity(action, details = {}) {
  try {
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
    const timestamp = new Date().toISOString();
    
    const data = {
      timestamp,
      action,
      userAgent,
      screenResolution,
      viewportSize,
      darkMode: document.body.classList.contains('dark-mode'),
      ...details
    };

    // Send to Google Apps Script endpoint
    const response = await fetch('https://script.google.com/macros/s/AKfycbx5FRSSJwv5NQQDYS14p9xupj3iQj-TPS3vexSFLUESNdkuS9d1d5Ro4b-Wy7IMmYXidw/exec', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to log activity');
    }
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

async function analyzeScores() {
  try {
    // 檢查邀請碼
    const invitationCode = document.getElementById('invitationCode').value;
    const currentInvitationCode = generateInvitationCode();
    if (invitationCode !== currentInvitationCode) {
      alert('邀請碼錯誤或已過期，請確認最新的邀請碼。');
      return;
    }
    
    // 檢查身分是否選擇
    const selectedIdentity = document.getElementById('selectedIdentity').value;
    if (!selectedIdentity) {
      alert('請先選擇您的身分（學生、家長或老師）');
      document.getElementById('identitySelector').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const schoolOwnership = document.getElementById('schoolOwnership').value;
    const schoolType = document.getElementById('schoolType').value;
    const vocationalGroup = document.getElementById('vocationalGroup').value;

    // 檢查所有成績欄位是否填寫
    const fields = ['chinese', 'english', 'math', 'science', 'social', 'composition'];
    let isAllFieldsFilled = true;
    let emptyFields = [];

    fields.forEach(field => {
      const value = document.getElementById(field).value;
      if (value === "") {
        isAllFieldsFilled = false;
        emptyFields.push(field);
      }
    });

    if (!isAllFieldsFilled) {
      let errorMessage = '請填寫以下欄位會考成績：\n';
      const fieldNames = {
        'chinese': '國文',
        'english': '英文',
        'math': '數學',
        'science': '自然',
        'social': '社會',
        'composition': '作文'
      };
      emptyFields.forEach(field => {
        errorMessage += `- ${fieldNames[field]}\n`;
      });
      alert(errorMessage);
      return;
    }

    // 顯示加載動畫
    showLoading();

    // 記錄使用者嘗試分析行為
    await logUserActivity('analyze_scores', {
      scores: {
        chinese: document.getElementById('chinese').value,
        english: document.getElementById('english').value,
        math: document.getElementById('math').value,
        science: document.getElementById('science').value,
        social: document.getElementById('social').value,
        composition: document.getElementById('composition').value
      },
      filters: {
        schoolOwnership,
        schoolType,
        vocationalGroup
      }
    });

    // 準備成績資料
    const scores = {
      chinese: document.getElementById('chinese').value,
      english: document.getElementById('english').value,
      math: document.getElementById('math').value,
      science: document.getElementById('science').value,
      social: document.getElementById('social').value,
      composition: parseInt(document.getElementById('composition').value)
    };

    // 請求學校資料
    const response = await fetch('https://script.google.com/macros/s/AKfycbxz-jXjvbGS-CVA97Z-8IkhcGtMPnSU3BrYS-gPP5VAzHmBBfGn5KMpU-ig2PKDc3bF/exec', {
      method: 'POST',
      body: JSON.stringify({
        scores,
        filters: {
          schoolOwnership,
          schoolType,
          vocationalGroup
        }
      })
    });

    if (!response.ok) {
      throw new Error('無法取得學校資料');
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    // 記錄錯誤活動
    await logUserActivity('analyze_error', { error: error.message });
    alert('發生錯誤：' + error.message);
  } finally {
    // 隱藏加載動畫
    hideLoading();
  }
}

function displayResults(data) {
  const { totalPoints, totalCredits, eligibleSchools } = data;

  let resultsHTML = `<div class="analysis-results">`;
  resultsHTML += `<div class="result-header">
                    <svg class="result-decorator" width="50" height="50" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="var(--accent-color)" opacity="0.2"></circle>
                      <path d="M9 12l2 2 4-4" stroke="var(--accent-color)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <h2><i class="fas fa-clipboard-check icon"></i> 分析結果</h2>
                  </div>`;
  resultsHTML += `<div class="result-summary">
                    <div class="result-card">
                      <i class="fas fa-star icon"></i>
                      <div class="result-value">${totalPoints}</div>
                      <div class="result-label">總積分</div>
                    </div>
                    <div class="result-card">
                      <i class="fas fa-award icon"></i>
                      <div class="result-value">${totalCredits}</div>
                      <div class="result-label">總積點</div>
                    </div>
                  </div>`;
  // 新增一個顯示使用者輸入成績的詳細區塊，增加結果完整性
  resultsHTML += `<div class="detailed-scores">
                    <h3><i class="fas fa-chart-bar icon"></i> 您的成績輸入</h3>
                    <table class="scores-table">
                      <tr>
                        <th>科目</th>
                        <th>分數</th>
                      </tr>
                      <tr><td>國文</td><td>${document.getElementById('chinese').value || '-'}</td></tr>
                      <tr><td>英文</td><td>${document.getElementById('english').value || '-'}</td></tr>
                      <tr><td>數學</td><td>${document.getElementById('math').value || '-'}</td></tr>
                      <tr><td>自然</td><td>${document.getElementById('science').value || '-'}</td></tr>
                      <tr><td>社會</td><td>${document.getElementById('social').value || '-'}</td></tr>
                      <tr><td>作文</td><td>${document.getElementById('composition').value || '-'}</td></tr>
                    </table>
                  </div>`;
  
  // 添加學校統計部分 - 改為圖卡式設計
  if (eligibleSchools && eligibleSchools.length > 0) {
    // 計算各類型學校的數量
    let schoolsByType = {};
    eligibleSchools.forEach(school => {
      if (!schoolsByType[school.type]) {
        schoolsByType[school.type] = 0;
      }
      schoolsByType[school.type]++;
    });
    
    // 生成學校統計HTML - 使用卡片設計
    resultsHTML += `<div class="school-stats">
                      <h4><i class="fas fa-chart-pie"></i> 學校統計</h4>
                      <div class="stats-total-card">
                        <div class="stats-total-icon">
                          <i class="fas fa-school"></i>
                        </div>
                        <div class="stats-total-value">${eligibleSchools.length}</div>
                        <div class="stats-total-label">符合條件的學校總數</div>
                      </div>
                      <div class="stats-cards">`;
    
    // 添加各類型學校卡片
    Object.entries(schoolsByType).forEach(([type, count]) => {
      const percentage = Math.round((count / eligibleSchools.length) * 100);
      const typeIcon = getSchoolTypeIcon(type);
      const cardColor = getColorForSchoolType(type);
      
      resultsHTML += `<div class="stats-card" style="--stats-card-color: ${cardColor.split(',')[0].replace('linear-gradient(90deg', '').trim()}">
                        <div class="stats-card-icon">
                          <i class="${typeIcon}"></i>
                        </div>
                        <div class="stats-value">${count}</div>
                        <div class="stats-label">${type}</div>
                        <div class="stats-percentage">${percentage}%</div>
                      </div>`;
    });
    
    resultsHTML += `</div>
                </div>`;
  }
  
  resultsHTML += `<div class="result-schools"><h3><i class="fas fa-list-ul icon"></i> 可能錄取的學校</h3>`;
  if (eligibleSchools && eligibleSchools.length > 0) {
    let groupedSchools = {};
    eligibleSchools.forEach(school => {
      if (!groupedSchools[school.type]) {
        groupedSchools[school.type] = [];
      }
      groupedSchools[school.type].push(school.name);
    });
    Object.entries(groupedSchools).forEach(([type, schools]) => {
      resultsHTML += `<div class="school-group">
                        <h4>${type}</h4>
                        <ul>`;
      schools.forEach((schoolName, index) => {
        resultsHTML += `<li style="animation-delay: ${index * 0.1}s"><i class="fas fa-check-circle icon"></i>${schoolName}</li>`;
      });
      resultsHTML += `</ul></div>`;
    });
  } else {
    resultsHTML += `<p class="no-schools"><i class="fas fa-exclamation-triangle icon"></i> 根據您的成績，暫時沒有符合條件的學校。</p>`;
  }
  
  resultsHTML += `</div></div>`;
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = resultsHTML;
  resultsElement.style.display = 'none';
  setTimeout(() => {
    resultsElement.style.display = 'block';
    resultsElement.style.animation = 'fadeInUp 0.8s ease-out forwards';
    document.getElementById('exportResults').style.display = 'inline-block';
    document.getElementById('exportResults').style.animation = 'fadeInUp 0.5s ease-out forwards';
  }, 100);
  // 儲存最新資料供匯出使用
  window.latestAnalysisData = data;
}

// 新增判斷學校類型的圖標函數
function getSchoolTypeIcon(type) {
  switch(type) {
    case '普通科': return 'fas fa-book';
    case '職業類科': return 'fas fa-tools';
    case '綜合高中': return 'fas fa-school';
    case '機械群': return 'fas fa-cogs';
    case '電機與電子群': return 'fas fa-microchip';
    case '商業與管理群': return 'fas fa-briefcase';
    case '外語群': return 'fas fa-language';
    case '設計群': return 'fas fa-paint-brush';
    case '餐旅群': return 'fas fa-utensils';
    case '家政群': return 'fas fa-home';
    default: return 'fas fa-graduation-cap';
  }
}

// 添加獲取類型顏色的函數 - 增加更多顏色變化
function getColorForSchoolType(type) {
  const colors = {
    '普通科': 'linear-gradient(90deg, #4361ee, #3a0ca3)',
    '職業類科': 'linear-gradient(90deg, #f72585, #7209b7)',
    '綜合高中': 'linear-gradient(90deg, #4cc9f0, #4895ef)',
    '機械群': 'linear-gradient(90deg, #3a86ff, #0077b6)',
    '電機與電子群': 'linear-gradient(90deg, #00b4d8, #0096c7)',
    '商業與管理群': 'linear-gradient(90deg, #ffd166, #ffaa00)',
    '外語群': 'linear-gradient(90deg, #06d6a0, #1b9aaa)',
    '設計群': 'linear-gradient(90deg, #ef476f, #d62246)',
    '餐旅群': 'linear-gradient(90deg, #ff9e00, #ff6d00)',
    '家政群': 'linear-gradient(90deg, #9d4edd, #7b2cbf)',
    '食品群': 'linear-gradient(90deg, #2ec4b6, #20a4f3)',
    '農業群': 'linear-gradient(90deg, #70e000, #38b000)',
    '土木與建築群': 'linear-gradient(90deg, #fb8500, #ffb703)',
    '化工群': 'linear-gradient(90deg, #ff477e, #ff5c8a)'
  };
  
  return colors[type] || 'linear-gradient(90deg, #4cc9f0, #4361ee)';
}

// 新增匯出格式選菜單相關函式
function showExportModal() {
  var exportModal = document.getElementById('exportModal');
  var modalContent = exportModal.querySelector('.modal-content');
  exportModal.style.display = 'block';
  
  setTimeout(() => {
    exportModal.classList.add('show');
    modalContent.classList.add('show-content');
  }, 10);
}

function closeExportModal() {
  var exportModal = document.getElementById('exportModal');
  var modalContent = exportModal.querySelector('.modal-content');
  modalContent.classList.remove('show-content');
  exportModal.classList.remove('show');
  
  setTimeout(() => {
    exportModal.style.display = 'none';
  }, 400);
}

function exportAsTXT() {
  const resultsElement = document.getElementById('results');
  const resultsText = resultsElement.innerText;
  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
  });
  const watermark = 
    "********************************\n" +
    "*    https://ctttw.github.io/   *\n" +
    "*  CTTW 中投區會考落點分析系統 *\n" +
    "*       以下資料僅供參考       *\n" +
    "*                              *\n" +
    `*產生時間: ${dateTime}         *\n` +
    "*                              *\n" +
    "********************************\n\n";
  const contentWithWatermark = watermark + resultsText;
  const blob = new Blob([contentWithWatermark], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, '中投區會考落點分析結果.txt');
  closeExportModal();
}

function exportAsCSV() {
  if (!window.latestAnalysisData) {
    alert("請先進行分析後再匯出！");
    return;
  }
  const { totalPoints, totalCredits, eligibleSchools } = window.latestAnalysisData;
  // Add BOM for UTF-8 encoding to properly display Chinese characters
  let csvContent = "\uFEFF" + "總積分,總積點\n" + totalPoints + "," + totalCredits + "\n\n";
  
  // 添加成績資料
  csvContent += "科目,分數\n";
  csvContent += `國文,${document.getElementById('chinese').value}\n`;
  csvContent += `英文,${document.getElementById('english').value}\n`;
  csvContent += `數學,${document.getElementById('math').value}\n`;
  csvContent += `自然,${document.getElementById('science').value}\n`;
  csvContent += `社會,${document.getElementById('social').value}\n`;
  csvContent += `作文,${document.getElementById('composition').value}\n\n`;
  
  csvContent += "學校類型,學校名稱\n";
  eligibleSchools.forEach(school => {
    // 將逗號轉成其他字元避免 CSV 分隔問題
    const type = school.type.replace(/,/g, " ");
    const name = school.name.replace(/,/g, " ");
    csvContent += `${type},${name}\n`;
  });
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, '中投區會考落點分析結果.csv');
  closeExportModal();
}

function exportAsJSON() {
  if (!window.latestAnalysisData) {
    alert("請先進行分析後再匯出！");
    return;
  }
  
  // 獲取成績數據並添加到分析結果
  const scores = {
    chinese: document.getElementById('chinese').value,
    english: document.getElementById('english').value,
    math: document.getElementById('math').value,
    science: document.getElementById('science').value,
    social: document.getElementById('social').value,
    composition: document.getElementById('composition').value
  };
  
  // 合併成績和分析結果
  const exportData = {
    ...window.latestAnalysisData,
    scores,
    exportTime: new Date().toISOString(),
    source: "CTTW 中投區會考落點分析系統"
  };
  
  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, '中投區會考落點分析結果.json');
  closeExportModal();
}

// 新增列印功能
function printResults() {
  if (!window.latestAnalysisData) {
    alert("請先進行分析後再列印！");
    return;
  }
  
  // 記錄使用者列印行為
  logUserActivity('print_results', {
    data: window.latestAnalysisData
  });
  
  // 創建一個新的打印窗口
  const printWindow = window.open('', '_blank');
  const { totalPoints, totalCredits, eligibleSchools } = window.latestAnalysisData;
  
  // 獲取使用者輸入的成績
  const scores = {
    chinese: document.getElementById('chinese').value || '-',
    english: document.getElementById('english').value || '-',
    math: document.getElementById('math').value || '-',
    science: document.getElementById('science').value || '-',
    social: document.getElementById('social').value || '-',
    composition: document.getElementById('composition').value || '-'
  };
  
  // 獲取當前日期時間
  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
  });
  
  // 創建打印內容
  let printContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>中投區會考落點分析結果</title>
    <style>
      body {
        font-family: 'Arial', '微軟正黑體', sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #4376f7;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #e74eff;
        margin: 10px 0;
      }
      .subtitle {
        font-size: 14px;
        color: #666;
      }
      .watermark {
        text-align: center;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 5px;
        margin-bottom: 20px;
        font-size: 12px;
        color: #666;
      }
      .summary {
        display: flex;
        justify-content: space-around;
        margin: 20px 0;
        flex-wrap: wrap;
      }
      .summary-card {
        background: #f9f9f9;
        border-radius: 8px;
        padding: 15px;
        margin: 10px;
        text-align: center;
        flex: 1;
        min-width: 120px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
      .summary-value {
        font-size: 24px;
        font-weight: bold;
        color: #00976a;
      }
      .summary-label {
        font-size: 14px;
        color: #666;
      }
      .scores-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      .scores-table th, .scores-table td {
        padding: 8px 12px;
        border: 1px solid #ddd;
        text-align: center;
      }
      .scores-table th {
        background-color: #f2f2f2;
      }
      .schools-section {
        margin-top: 30px;
      }
      .school-type {
        margin-top: 20px;
        font-size: 18px;
        color: #4376f7;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
      }
      .school-list {
        list-style-type: none;
        padding-left: 0;
      }
      .school-item {
        padding: 8px 0;
        border-bottom: 1px dashed #eee;
      }
      .no-schools {
        text-align: center;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 5px;
        color: #666;
        font-style: italic;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #999;
        border-top: 1px solid #eee;
        padding-top: 10px;
      }
      .stats-section {
        background: #f5f5f5;
        border-radius: 8px;
        padding: 15px;
        margin: 20px 0;
      }
      .stats-title {
        font-size: 18px;
        color: #4376f7;
        margin-bottom: 15px;
        text-align: center;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
      }
      .stat-item {
        background: white;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .stat-value {
        font-size: 20px;
        font-weight: bold;
        color: #e74eff;
      }
      .stat-label {
        font-size: 12px;
        color: #666;
      }
      .page-break {
        page-break-after: always;
      }
      .qr-code {
        text-align: center;
        margin: 20px 0;
      }
      .qr-code img {
        max-width: 150px;
        height: auto;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="title">中投區會考落點分析結果</div>
      <div class="subtitle">分析時間: ${dateTime}</div>
    </div>
    
    <div class="watermark">
      本分析結果由 CTTW 中投區會考落點分析系統生成，僅供參考。
      <br>官方網站: https://ctttw.github.io/
    </div>
    
    <div class="summary">
      <div class="summary-card">
        <i class="fas fa-star icon"></i>
        <div class="summary-value">${totalPoints}</div>
        <div class="summary-label">總積分</div>
      </div>
      <div class="summary-card">
        <i class="fas fa-award icon"></i>
        <div class="summary-value">${totalCredits}</div>
        <div class="summary-label">總積點</div>
      </div>
    </div>
    
    <h3>考生成績</h3>
    <table class="scores-table">
      <tr>
        <th>國文</th>
        <th>英文</th>
        <th>數學</th>
        <th>自然</th>
        <th>社會</th>
        <th>作文</th>
      </tr>
      <tr>
        <td>${scores.chinese}</td>
        <td>${scores.english}</td>
        <td>${scores.math}</td>
        <td>${scores.science}</td>
        <td>${scores.social}</td>
        <td>${scores.composition}</td>
      </tr>
    </table>
  `;
  
  // 添加學校統計信息
  if (eligibleSchools && eligibleSchools.length > 0) {
    let schoolsByType = {};
    let totalSchoolCount = eligibleSchools.length;
    
    // 計算各類型學校的數量
    eligibleSchools.forEach(school => {
      if (!schoolsByType[school.type]) {
        schoolsByType[school.type] = 0;
      }
      schoolsByType[school.type]++;
    });
    
    printContent += `
      <div class="stats-section">
        <div class="stats-title">學校統計</div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">${totalSchoolCount}</div>
            <div class="stat-label">總學校數</div>
          </div>
    `;
    
    Object.entries(schoolsByType).forEach(([type, count]) => {
      printContent += `
        <div class="stat-item">
          <div class="stat-value">${count}</div>
          <div class="stat-label">${type}</div>
        </div>
      `;
    });
    
    printContent += `
        </div>
      </div>
    `;
  }
  
  printContent += `
    <div class="schools-section">
      <h3>可能錄取的學校</h3>
  `;
  
  if (eligibleSchools && eligibleSchools.length > 0) {
    let groupedSchools = {};
    eligibleSchools.forEach(school => {
      if (!groupedSchools[school.type]) {
        groupedSchools[school.type] = [];
      }
      groupedSchools[school.type].push(school.name);
    });
    
    Object.entries(groupedSchools).forEach(([type, schools]) => {
      printContent += `
        <div class="school-type">${type}</div>
        <ul class="school-list">
      `;
      
      schools.forEach(schoolName => {
        printContent += `<li class="school-item">• ${schoolName}</li>`;
      });
      
      printContent += `</ul></div>`;
    });
  } else {
    printContent += `
      <div class="no-schools">
        根據您的成績，暫時沒有符合條件的學校。
      </div>
    `;
  }
  
  printContent += `
    </div>
    
    <div class="footer">
      注意：本分析結果僅供參考，實際錄取情況可能受多種因素影響。
      <br>建議您諮詢學校輔導老師或升學顧問的專業意見，並關注各校的官方網站和招生簡章。
      <br> CTTW 中投區會考落點分析系統
    </div>
    
    <div class="no-print">
      <button onclick="window.print()" style="padding: 10px 20px; background: #4376f7; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">列印此頁</button>
      <button onclick="window.close()" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px; margin-left: 10px;">關閉視窗</button>
    </div>
  </body>
  </html>
  `;
  
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
  
  closeExportModal();
}

// 共用的下載觸發函式
function triggerDownload(url, fileName) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
}

// 初始顯示免責聲明
window.onload = function() {
  showDisclaimer();
}

function toggleMenu() {
  var menu = document.getElementById("fullscreenMenu");
  menu.classList.toggle("show");
  document.body.style.overflow = menu.classList.contains("show") ? "hidden" : "auto";

  // 添加連結的動畫延遲
  var links = menu.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].style.animationDelay = (i * 0.1) + 's';
    links[i].style.animation = menu.classList.contains("show") ? 
      'slideInRight 0.5s ease-out forwards' : 'none';
  }
  
  // 添加菜單轉場特效
  const menuIcon = document.querySelector('.menu-icon i');
  if (menu.classList.contains("show")) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
    // 記錄菜單打開行為
    logUserActivity('open_menu');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
    // 記錄菜單關閉行為
    logUserActivity('close_menu');
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  updateDarkModeIcon(isDarkMode);
  
  // Log dark mode toggle
  logUserActivity('toggle_dark_mode', { enabled: isDarkMode });
}

function updateDarkModeIcon(isDarkMode) {
  const icon = document.querySelector('#darkModeToggle i');
  icon.style.transform = 'scale(0)';
  
  setTimeout(() => {
    if (isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    icon.style.transform = 'scale(1)';
  }, 150);
}

// 檢查用戶之前的深色模式偏好
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
  document.body.classList.add('dark-mode');
}
updateDarkModeIcon(savedDarkMode);

// 添加事件監聽器
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

const html5QrCode = new Html5Qrcode("qr-reader");
const qrConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

document.getElementById('scanQRCode').addEventListener('click', () => {
  const qrReader = document.getElementById('qr-reader');
  if (qrReader.style.display === 'none') {
    qrReader.style.display = 'block';
    html5QrCode.start({ facingMode: "environment" }, qrConfig, onScanSuccess);
  } else {
    qrReader.style.display = 'none';
    html5QrCode.stop();
  }
});

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('invitationCode').value = decodedText;
  html5QrCode.stop();
  document.getElementById('qr-reader').style.display = 'none';
  document.getElementById('qr-result').textContent = `您的邀請碼是：${decodedText}`;
  
  logUserActivity('qr_scan_success', { invitationCode: decodedText });
}

function handleQRCodeImage(file) {
  logUserActivity('qr_image_upload', { fileName: file.name });

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        document.getElementById('invitationCode').value = code.data;
        document.getElementById('qr-result').textContent = `您的邀請碼是：${code.data}`;
      } else {
        document.getElementById('qr-result').textContent = '無法識別 QR 碼，請嘗試其他圖片';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById('fileInput').addEventListener('change', event => {
  const file = event.target.files[0];
  if (file) {
    handleQRCodeImage(file);
  }
});

// 防止複製和右鍵
document.oncontextmenu = function (){
  return false;
}

document.body.onkeydown = function(e){
  var keyCode = e.keyCode || e.which || e.charCode;
  var ctrlKey = e.ctrlKey || e.metaKey;
  if(ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 73)) {
    e.preventDefault();
    return false;
  } else if(keyCode && keyCode == 123){
    return false;
  }
}

// Add touch event handlers for mobile devices
function setupMobileInteractions() {
  // Fix for 300ms delay on touch devices
  document.addEventListener('touchstart', function() {}, {passive: true});
  
  // Handle mobile navigation better
  document.querySelectorAll('.fullscreen-menu a').forEach(link => {
    link.addEventListener('touchstart', function() {
      this.classList.add('active-touch');
    });
    link.addEventListener('touchend', function() {
      this.classList.remove('active-touch');
      setTimeout(() => toggleMenu(), 100);
    });
  });
  
  // Add scrolling for long modals on mobile
  document.querySelectorAll('.modal-content').forEach(modal => {
    modal.addEventListener('touchmove', function(e) {
      e.stopPropagation();
    }, {passive: true});
  });
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
  setupMobileInteractions();
  
  // Adjust UI based on screen size
  const adjustForMobile = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Adjust for mobile viewport
      document.querySelectorAll('.form-group select, .form-group input[type="text"]')
        .forEach(el => el.setAttribute('data-size', 'mobile'));
    }
  };
  
  adjustForMobile();
  window.addEventListener('resize', adjustForMobile);
});

function submitRating() {
  const rating = document.querySelector('input[name="rating"]:checked');
  const feedback = document.getElementById('feedbackText').value;
  
  if (!rating) {
    alert('請選擇星級評分');
    return;
  }
  
  // 記錄用戶評分活動
  logUserActivity('submit_rating', {
    rating: rating.value,
    feedback: feedback
  });
  
  // 發送評分數據到伺服器
  try {
    fetch('https://script.google.com/macros/s/AKfycbx5FRSSJwv5NQQDYS14p9xupj3iQj-TPS3vexSFLUESNdkuS9d1d5Ro4b-Wy7IMmYXidw/exec', {
      method: 'POST',
      body: JSON.stringify({
        action: 'rating',
        rating: rating.value,
        feedback: feedback,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
  }
  
  // 顯示感謝信息
  const ratingSection = document.querySelector('.rating-section');
  ratingSection.innerHTML = `
    <div class="rating-thanks">
      <i class="fas fa-heart icon"></i>
      <h3>感謝您的評分!</h3>
      <p>您的反饋對我們非常寶貴，我們會繼續努力改進系統。</p>
    </div>
  `;
}