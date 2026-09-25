/**
 * Graduation Invitation Interactive Scripts - Hoàng Thị Thuyên 🎓
 * Clean Edition: Direct wish submission & automatic file storage
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const guestNameDisplay = document.getElementById('guestNameDisplay');
  const editGuestBtn = document.getElementById('editGuestBtn');
  const editGuestModal = document.getElementById('editGuestModal');
  const closeGuestModal = document.getElementById('closeGuestModal');
  const cancelGuestModal = document.getElementById('cancelGuestModal');
  const saveGuestNameBtn = document.getElementById('saveGuestNameBtn');
  const customGuestInput = document.getElementById('customGuestInput');

  const confettiBtn = document.getElementById('confettiBtn');
  const wishQuickBtn = document.getElementById('wishQuickBtn');
  const triggerWishSection = document.getElementById('triggerWishSection');
  const openWishModalBtn = document.getElementById('openWishModalBtn');
  const addToCalBtn = document.getElementById('addToCalBtn');

  // Form & Private Wishes Elements
  const inlineWishForm = document.getElementById('inlineWishForm');
  const senderNameInput = document.getElementById('senderName');
  const wishMessageInput = document.getElementById('wishMessage');
  const stickerBtns = document.querySelectorAll('.sticker-btn');

  // Success Modal
  const sentSuccessModal = document.getElementById('sentSuccessModal');
  const successSenderName = document.getElementById('successSenderName');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');

  const toastNotice = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');

  let selectedSticker = '🎓';

  // 1. READ URL PARAMETER FOR GUEST NAME (e.g. ?to=Anh+Em+Tổ+3 or ?name=...)
  const urlParams = new URLSearchParams(window.location.search);
  const customTo = urlParams.get('to') || urlParams.get('name') || urlParams.get('khach');
  if (customTo && customTo.trim() !== '') {
    guestNameDisplay.textContent = customTo.trim();
    customGuestInput.value = customTo.trim();
  }

  // Toast Helper
  function showToast(message, icon = 'fa-circle-check') {
    toastMsg.textContent = message;
    const iconElem = toastNotice.querySelector('i');
    if (iconElem) {
      iconElem.className = `fa-solid ${icon}`;
    }
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3500);
  }

  // 2. MODAL FOR EDITING GUEST NAME
  function openModal() {
    customGuestInput.value = guestNameDisplay.textContent;
    editGuestModal.classList.add('active');
    setTimeout(() => customGuestInput.focus(), 150);
  }

  function closeModal() {
    editGuestModal.classList.remove('active');
  }

  if (editGuestBtn) editGuestBtn.addEventListener('click', openModal);
  if (guestNameDisplay) guestNameDisplay.parentElement.addEventListener('click', (e) => {
    if (e.target !== editGuestBtn && !editGuestBtn.contains(e.target)) {
      openModal();
    }
  });

  if (closeGuestModal) closeGuestModal.addEventListener('click', closeModal);
  if (cancelGuestModal) cancelGuestModal.addEventListener('click', closeModal);
  
  if (saveGuestNameBtn) {
    saveGuestNameBtn.addEventListener('click', () => {
      const newName = customGuestInput.value.trim();
      if (newName) {
        guestNameDisplay.textContent = newName;
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('to', newName);
        window.history.replaceState({}, '', newUrl.toString());
        closeModal();
        showToast(`Đã đổi tên khách mời thành "${newName}"!`);
      }
    });
  }

  // 3. COUNTDOWN TIMER TO GRADUATION: 15:30 Oct 03, 2026
  const targetDate = new Date('2026-10-03T15:30:00+07:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. CELEBRATORY CONFETTI
  function fireConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { x: 0.2, y: 0.6 },
        colors: ['#d4af37', '#132448', '#f7e7b4', '#e63946', '#2a9d8f']
      });
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { x: 0.8, y: 0.6 },
        colors: ['#d4af37', '#132448', '#f7e7b4', '#e63946', '#2a9d8f']
      });
    }
  }

  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
      fireConfetti();
      showToast('Chúc mừng lễ tốt nghiệp Hoàng Thị Thuyên! 🎓✨', 'fa-award');
    });
  }


  // 6. SCROLL TO PRIVATE WISHES SECTION
  function scrollToWishes() {
    const wishesWall = document.getElementById('wishesWall');
    if (wishesWall) {
      wishesWall.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => senderNameInput.focus(), 600);
    }
  }

  if (wishQuickBtn) wishQuickBtn.addEventListener('click', scrollToWishes);
  if (triggerWishSection) triggerWishSection.addEventListener('click', scrollToWishes);
  if (openWishModalBtn) openWishModalBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    scrollToWishes();
  });


  // 8. ADD TO CALENDAR
  if (addToCalBtn) {
    addToCalBtn.addEventListener('click', () => {
      const title = encodeURIComponent('Lễ Tốt Nghiệp - Hoàng Thị Thuyên (EAUT)');
      const details = encodeURIComponent('Lễ Tốt Nghiệp của Hoàng Thị Thuyên. Địa điểm: Trường Đại học Công nghệ Đông Á (Đường Trịnh Văn Bô, Nam Từ Liêm, Hà Nội). Rất mong được đón tiếp bạn!');
      const location = encodeURIComponent('Trường Đại học Công nghệ Đông Á, Đường Trịnh Văn Bô, Nam Từ Liêm, Hà Nội');
      const dates = '20261003T083000Z/20261003T113000Z';
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(gcalUrl, '_blank');
      showToast('Đang mở Google Calendar để lưu lịch hẹn 📅');
    });
  }

  // 9. STICKER SELECTION
  stickerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stickerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSticker = btn.dataset.sticker;
    });
  });

  // 10. SUBMIT WISH & AUTOMATICALLY SAVE TO FILE
  const PRIVATE_STORAGE_KEY = 'thuyen_private_wishes_vault';

  function savePrivateWishLocally(wish) {
    try {
      const saved = localStorage.getItem(PRIVATE_STORAGE_KEY);
      const wishes = saved ? JSON.parse(saved) : [];
      wishes.push(wish);
      localStorage.setItem(PRIVATE_STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
      console.warn('Private storage note', e);
    }
  }

  const TARGET_EMAIL = 'hoanght614@gmail.com';

  async function saveWishToFile(wish) {
    // 1. Send wish directly to Thuyen's Gmail
    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Người gửi": wish.name,
          "Biểu tượng": wish.sticker,
          "Thời gian": wish.createdAt,
          "Lời chúc": wish.message,
          "_subject": `🎓 Lời chúc tốt nghiệp mới từ: ${wish.name}`,
          "_template": "table",
          "_captcha": "false"
        })
      });
    } catch (err) {
      console.warn('FormSubmit email note', err);
    }

    // 2. Also save to local server if running
    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wish)
      });
    } catch (_) {}

    return true;
  }

  if (inlineWishForm) {
    inlineWishForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = senderNameInput.value.trim();
      const message = wishMessageInput.value.trim();

      if (!name || !message) return;

      const newWish = {
        name,
        message,
        sticker: selectedSticker,
        createdAt: new Date().toLocaleString('vi-VN')
      };

      // 1. Save to local storage backup
      savePrivateWishLocally(newWish);

      // 2. Save directly to loi_chuc.txt & loi_chuc.json on server
      await saveWishToFile(newWish);

      // Show success modal with sender name
      if (successSenderName) {
        successSenderName.textContent = name;
      }
      if (sentSuccessModal) {
        sentSuccessModal.classList.add('active');
      }

      // Reset form
      wishMessageInput.value = '';
      fireConfetti();
      showToast('Đã gửi lời chúc đến Thuyên thành công! ❤️', 'fa-heart');
    });
  }

  if (closeSuccessModalBtn) {
    closeSuccessModalBtn.addEventListener('click', () => {
      sentSuccessModal.classList.remove('active');
    });
  }
});
