// Invitation Code Generation & Management
function generateInvitationCode() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  return `CTTW${year}${month}${day}${hour}`;
}

function updateInvitationCode() {
  const invitationCodeElement = document.getElementById('invitationCode');
  invitationCodeElement.textContent = generateInvitationCode();
}

function copyInvitationCode() {
  const invitationCode = document.getElementById('invitationCode').textContent;
  navigator.clipboard.writeText(invitationCode)
    .then(() => showToast())
    .catch(err => {
      console.error('Unable to copy to clipboard:', err);
      alert('Copy failed, please copy the invitation code manually.');
    });
}

function shareInvitationCode() {
  const invitationCode = document.getElementById('invitationCode').textContent;
  if (navigator.share) {
    navigator.share({
      title: '中投區會考落點分析邀請碼',
      text: `我的中投區會考落點分析邀請碼是：${invitationCode}`,
      url: 'https://ctttw.github.io/'
    })
    .then(() => console.log('Successfully shared'))
    .catch((error) => console.log('Error sharing', error));
  } else {
    alert(`請複製以下文字進行分享：\n\n我的中投區會考落點分析邀請碼是：${invitationCode}\n\n網站: https://ctttw.github.io/`);
  }
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  
  // Create ripple effect
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');
  toast.appendChild(ripple);
  
  // Trigger reflow for animation
  toast.offsetHeight;
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }, 2000);
}