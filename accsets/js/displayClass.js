// Tạo biến lưu và tạo hộp 
const displaySv = document.getElementById('class-lish');
function displayService() {
    // Lấy dữ liệu dịch vụ từ localStorage
    const services = JSON.parse(localStorage.getItem('services')) || [];
    // kiểm tra đăng nhập gắn link theo tài khoản
    checkIndex = localStorage.getItem('checkIndex') || -1;
    let linkCheck;
    if(checkIndex !== -1) {
        linkCheck = "/Ung_dung_dat_lich_GYM/pages/booking/schedule.html";
    } else {
        linkCheck = "/Ung_dung_dat_lich_GYM/pages/auth/login.html";
    }
    
    // Làm mới 
    displaySv.innerHTML = '';
    
    services.forEach((cls, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="class">
                <img src="${cls.imageService}" alt="${cls.nameService}">
                <div class="class-content">
                    <h4>${cls.nameService}</h4>
                    <p>${cls.describeService}</p>
                    <button>
                        <a href="${linkCheck}">Đặt lịch</a>
                    </button>
                </div>
            </div>
        `;
        displaySv.appendChild(div);
    });
}

window.onload = function () {
    displayService();
};