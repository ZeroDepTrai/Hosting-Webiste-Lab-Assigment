/* shared.js – inject nav + footer + toast into every page */

const NAV_HTML = `
<header>
  <nav role="navigation" aria-label="Điều hướng chính">
    <a class="nav-logo" href="trang-chu.html" aria-label="BMW Trang chủ">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#333" stroke-width="2"/>
        <path d="M50 12 A38 38 0 0 1 88 50 L50 50 Z" fill="#1c69d4"/>
        <path d="M50 88 A38 38 0 0 1 12 50 L50 50 Z" fill="#1c69d4"/>
        <path d="M88 50 A38 38 0 0 1 50 88 L50 50 Z" fill="white"/>
        <path d="M12 50 A38 38 0 0 1 50 12 L50 50 Z" fill="white"/>
      </svg>
    </a>
    <ul class="nav-links">
      <li><a href="trang-chu.html" data-page="trang-chu">Trang Chủ</a></li>
      <li><a href="gioi-thieu.html" data-page="gioi-thieu">Giới Thiệu</a></li>
      <li><a href="san-pham.html" data-page="san-pham">Sản Phẩm</a></li>
      <li><a href="dich-vu.html" data-page="dich-vu">Dịch Vụ</a></li>
      <li><a href="tin-tuc.html" data-page="tin-tuc">Tin Tức &amp; Sự Kiện</a></li>
      <li><a href="bang-gia.html" data-page="bang-gia">Bảng Giá</a></li>
      <li><a href="lien-he.html" data-page="lien-he">Liên Hệ</a></li>
    </ul>
    <div class="nav-right">
      <div class="nav-search-wrap">
        <input type="search" placeholder="Tìm kiếm..." aria-label="Tìm kiếm"/>
        <button aria-label="Tìm kiếm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>
      <a href="dang-nhap.html" class="nav-auth-btn">Đăng nhập</a>
    </div>
    <button class="hamburger" onclick="toggleMobileNav()" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>

<nav class="mobile-nav" id="mobileNav" role="navigation" aria-label="Menu di động">
  <a href="trang-chu.html">Trang Chủ</a>
  <a href="gioi-thieu.html">Giới Thiệu</a>
  <a href="san-pham.html">Sản Phẩm</a>
  <a href="dich-vu.html">Dịch Vụ</a>
  <a href="tin-tuc.html">Tin Tức &amp; Sự Kiện</a>
  <a href="bang-gia.html">Bảng Giá</a>
  <a href="lien-he.html">Liên Hệ</a>
  <a href="dang-nhap.html">Đăng Nhập</a>
  <a href="dang-ky.html">Đăng Ký</a>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <svg width="52" height="52" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="3"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <path d="M50 12 A38 38 0 0 1 88 50 L50 50 Z" fill="#1c69d4"/>
        <path d="M50 88 A38 38 0 0 1 12 50 L50 50 Z" fill="#1c69d4"/>
        <path d="M88 50 A38 38 0 0 1 50 88 L50 50 Z" fill="rgba(255,255,255,0.85)"/>
        <path d="M12 50 A38 38 0 0 1 50 12 L50 50 Z" fill="rgba(255,255,255,0.85)"/>
      </svg>
      <p>BMW Việt Nam – Mang đến trải nghiệm lái xe đỉnh cao, kết hợp thiết kế tinh tế và hiệu suất vượt trội kể từ năm 1994.</p>
    </div>
    <div class="footer-col">
      <h4>Sản Phẩm</h4>
      <ul>
        <li><a href="san-pham.html">3 Series</a></li>
        <li><a href="san-pham.html">5 Series</a></li>
        <li><a href="san-pham.html">7 Series</a></li>
        <li><a href="san-pham.html">X Series</a></li>
        <li><a href="san-pham.html">M Series</a></li>
        <li><a href="san-pham.html">i Series (EV)</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Dịch Vụ</h4>
      <ul>
        <li><a href="dich-vu.html">Bảo dưỡng</a></li>
        <li><a href="dich-vu.html">Tài chính</a></li>
        <li><a href="dich-vu.html">Bảo hiểm</a></li>
        <li><a href="dich-vu.html">Lái thử</a></li>
        <li><a href="dich-vu.html">BMW Cũ</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Công Ty</h4>
      <ul>
        <li><a href="gioi-thieu.html">Giới thiệu</a></li>
        <li><a href="tin-tuc.html">Tin tức</a></li>
        <li><a href="tin-tuc.html">Sự kiện</a></li>
        <li><a href="lien-he.html">Liên hệ</a></li>
        <li><a href="#">Tuyển dụng</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 BMW Việt Nam. Tất cả quyền được bảo lưu.</p>
    <p>Chính sách bảo mật · Điều khoản sử dụng · Cookie</p>
  </div>
</footer>
<div class="toast" id="toast" role="alert" aria-live="polite"></div>
`;

// Inject on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Mark active nav link
  const currentFile = location.pathname.split('/').pop() || 'trang-chu.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    const page = a.getAttribute('data-page');
    if (currentFile.startsWith(page) || (currentFile === '' && page === 'trang-chu')) {
      a.classList.add('active');
    }
  });
});

function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
