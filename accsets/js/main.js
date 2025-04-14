// *Đăng nhập và đăng ký tài khoản*
// Khi bấm vào đăng ký ngay thì hiện ra trang đăng ký
let accs = [
    {
        username: "Admin",
        email: "admin@gmail.com",
        password: "12345678",
    }
];
// Lưu tài khoản admin vào localStorage
// localStorage.setItem('accs', JSON.stringify(accs));
// Khi bấm vào đăng ký ngay thì hiện ra trang đăng ký
function showSign() {
    window.location.href = "register.html";
}
// Khi bấm vào đăng nhập thì hiện ra trang đăng nhập
function showLogin() {
    window.location.href = "login.html";
}
// Kiểm tra nhập liệu
// Đăng ký tài khoản
function signup() {
    const useremail = document.getElementById('signup-email').value.trim();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
    accs = JSON.parse(localStorage.getItem('accs')) || [];
    // Kiểm tra xem các trường nhập liệu có rỗng không
    if (useremail === "" || username === "" || password === "" || confirmPassword === "") {
        if (useremail === "") {
            document.getElementById('signup-email').classList.add('error');
            document.getElementById("error-message-email").innerHTML = "Vui lòng nhập email";
        } else {
            document.getElementById('signup-email').classList.remove('error');
            document.getElementById("error-message-email").innerHTML = "";
        }
        if (username === "") {
            document.getElementById('signup-username').classList.add('error');
            document.getElementById("error-message-username").innerHTML = "Vui lòng nhập tên tài khoản";
        } else {
            document.getElementById('signup-username').classList.remove('error');
            document.getElementById("error-message-username").innerHTML = "";
        }
        if (password === "") {
            document.getElementById('signup-password').classList.add('error');
            document.getElementById("error-message-password").innerHTML = "Vui lòng nhập mật khẩu";
        } else {
            document.getElementById('signup-password').classList.remove('error');
            document.getElementById("error-message-password").innerHTML = "";
        }
        if (confirmPassword === "") {
            document.getElementById('signup-confirm-password').classList.add('error');
            document.getElementById("error-message-confirm-password").innerHTML = "Vui lòng xác nhận mật khẩu";
        } else {
            document.getElementById('signup-confirm-password').classList.remove('error');
            document.getElementById("error-message-confirm-password").innerHTML = "";
        }
        return;
    } else {
        document.getElementById('signup-email').classList.remove('error');
        document.getElementById("error-message-email").innerHTML = "";
        document.getElementById('signup-username').classList.remove('error');
        document.getElementById("error-message-username").innerHTML = "";
        document.getElementById('signup-password').classList.remove('error');
        document.getElementById("error-message-password").innerHTML = "";
        document.getElementById('signup-confirm-password').classList.remove('error');
        document.getElementById("error-message-confirm-password").innerHTML = "";
    }
    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existingAccount = accs.find(acc => acc.email === useremail || acc.username === username);
    if (existingAccount) {
        document.getElementById('signup-email').classList.add('error');
        document.getElementById("error-message-email").innerHTML = "Tài khoản đã tồn tại! Vui lòng thử lại";
        return;
    } else {
        document.getElementById('signup-email').classList.remove('error');
        document.getElementById("error-message-email").innerHTML = "";
    }
    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(useremail)) {
        document.getElementById('signup-email').classList.add('error');
        document.getElementById("error-message-email").innerHTML = "Email không đúng! Vui lòng thử lại";
        return;
    } else {
        document.getElementById('signup-email').classList.remove('error');
        document.getElementById("error-message-email").innerHTML = "";
    }
    // Kiểm tra độ dài mật khẩu
    const regex = /^(?=.*[A-Z]).*\d$/;
    if (!regex.test(password)) {
        document.getElementById('signup-password').classList.add('error');
        document.getElementById("error-message-password").innerHTML = "Mật khẩu phải có ít nhất một chữ viết hoa và kết thúc bằng số";
        return;
    } else {
        document.getElementById('signup-password').classList.remove('error');
        document.getElementById("error-message-password").innerHTML = "";
    }
    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        document.getElementById('signup-confirm-password').classList.add('error');
        document.getElementById("error-message-confirm-password").innerHTML = "Mật khẩu không khớp! Vui lòng thử lại";
        return;
    } else {
        document.getElementById('signup-confirm-password').classList.remove('error');
        document.getElementById("error-message-confirm-password").innerHTML = "";
    }
    // Tạo đối tượng tài khoản mới
    const newAccount = {
        username: username,
        email: useremail,
        password: password,
    };
    // Lưu tài khoản vào localStorage
    accs.push(newAccount);
    localStorage.setItem('accs', JSON.stringify(accs));
    // Hiển thị thông báo thành công
    swal("Đăng ký thành công", "Đang tải vui lòng đợi chút !!!!", "success");
    setTimeout(() => {
        window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
    }, 2000); // Thời gian chờ 2 giây trước khi chuyển hướng
    // Reset lại các trường nhập liệu
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-confirm-password').value = '';
}
// Đăng nhập tài khoản
function login() {
    checkIndex = localStorage.getItem('checkIndex') || -1; // Lưu lại vị trí tài khoản đã đăng nhập
    checkLogin = JSON.parse(localStorage.getItem('accs')) || [];
    const useremail = document.getElementById('login-useremail').value.trim();
    const password = document.getElementById('login-password').value.trim(); 
    
    // Kiểm tra đăng nhập admin
    if (useremail === accs[0].email && password === accs[0].password) {
        checkIndex = 0; // Lưu lại vị trí tài khoản đã đăng nhập
        localStorage.setItem('checkIndex', checkIndex); // Lưu lại vị trí tài khoản đã đăng nhập vào localStorage
        swal("Đăng nhập thành công", "Đang tải vui lòng đợi chút !!!!", "success");
        setTimeout(() => {
            window.location.href = "/Ung_dung_dat_lich_GYM/homeAdmin.html"; // Chuyển hướng đến trang admin
        }, 1000); // Thời gian chờ 2 giây trước khi chuyển hướng
    } else if(useremail !== accs[0].email || password !== accs[0].password) { 
        document.getElementById('login-useremail').classList.add('error');
        document.getElementById("error-message-email").innerHTML = " Email Hoặc mật khẩu không đúng! Vui lòng thử lại";
    } else {
        if (useremail === "") {
            document.getElementById('login-useremail').classList.add('error');
            document.getElementById("error-message-email").innerHTML = "Vui lòng nhập email";
        } else {
            document.getElementById('login-useremail').classList.remove('not-error');
            document.getElementById("error-message-email").innerHTML = "";
        } 
    
        if (password === "") {
            document.getElementById('login-password').classList.add('error');
            document.getElementById("error-message-password").innerHTML = "Vui lòng nhập mật khẩu";
        } else {
            document.getElementById('login-password').classList.remove('not-error');
            document.getElementById("error-message-password").innerHTML = "";
        }
    }
    // Kiểm tra đăng nhập tài khoản User
    checkLogin.forEach((acc, index) => {
        if (acc.email === useremail && acc.password === password && index !== 0) {
            checkIndex = index; // Lưu lại vị trí tài khoản đã đăng nhập
            localStorage.setItem('checkIndex', checkIndex); // Lưu lại vị trí tài khoản đã đăng nhập vào localStorage
            swal("Đăng nhập thành công", "Đang tải vui lòng đợi chút !!!!", "success");
            setTimeout(() => {
                window.location.href = "/Ung_dung_dat_lich_GYM/homePage.html"; // Chuyển hướng đến trang người dùng
            }, 1000); // Thời gian chờ 2 giây trước khi chuyển hướng
            // Lưu tài khoản số nào đã đăng nhập vào localStorage
        } else if(acc.email === useremail && index !== 0 || acc.password === password && index !== 0) {
            document.getElementById('login-useremail').classList.add('error');
            document.getElementById("error-message-email").innerHTML = " Email không đúng! Vui lòng thử lại";
        } else {
            if (useremail === "") {
                document.getElementById('login-useremail').classList.add('error');
                document.getElementById("error-message-email").innerHTML = "Vui lòng nhập email";
            } else {
                document.getElementById('login-useremail').classList.remove('not-error');
                document.getElementById("error-message-email").innerHTML = "";
            } 
        
            if (password === "") {
                document.getElementById('login-password').classList.add('error');
                document.getElementById("error-message-password").innerHTML = "Vui lòng nhập mật khẩu";
            } else {
                document.getElementById('login-password').classList.remove('not-error');
                document.getElementById("error-message-password").innerHTML = "";
            }
        }
    });
}
//*******************************************************//

function logout() {
    // Xóa thông tin người dùng khỏi localStorage
    let checkIndex = -1;
    localStorage.setItem('checkIndex', checkIndex);
}

