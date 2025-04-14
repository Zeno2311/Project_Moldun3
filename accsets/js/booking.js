// Khởi tạo mảng everyClass từ localStorage
let everyClass = [];
const showAddClass = document.getElementById('box-up');
const classList = document.getElementById('schedule-list');
// 

function showAdd() {
    if (showAddClass) {
        showAddClass.style.display = "block";
    } else {
        console.error("Không tìm thấy phần tử #box-up");
    }
}

function exitAdd() {
    checkEdit = -1;
    localStorage.setItem('checkEdit', JSON.stringify(checkEdit));
    if (showAddClass) {
        showAddClass.style.display = "none";
        document.getElementById('class-select').value = 'Chọn lớp học';
        document.getElementById('date-input').value = '';
        document.getElementById('class-time').value = 'Chọn khung giờ';
        document.getElementById('error-message-class').innerHTML = "";
        document.getElementById('error-message-date').innerHTML = "";
        document.getElementById('error-message-time').innerHTML = "";
        // Cho trở về màu bình thường
        document.getElementById('class-select').classList.add('not-error');
        document.getElementById('date-input').classList.add('not-error');
        document.getElementById('class-time').classList.add('not-error');

    } else {
        console.error("Không tìm thấy phần tử #box-up");
    }
}


function saveAdd() {
    const className = document.getElementById('class-select').value;
    if (className === "Chọn lớp học") {
        document.getElementById('class-select').classList.add('error');
        document.getElementById('error-message-class').innerHTML = "Vui lòng chọn lớp học";
    } else {
        document.getElementById('class-select').classList.remove('error');
        document.getElementById('error-message-class').innerHTML = "";
    }
    const classDate = document.getElementById('date-input').value;
    if (classDate === "") {
        document.getElementById('date-input').classList.add('error');
        document.getElementById('error-message-date').innerHTML = "Vui lòng chọn ngày";
    } else {
        document.getElementById('date-input').classList.remove('error');
        document.getElementById('error-message-date').innerHTML = "";
    }
    const classTime = document.getElementById('class-time').value;
    if (classTime === "Chọn khung giờ") {
        document.getElementById('class-time').classList.add('error');
        document.getElementById('error-message-time').innerHTML = "Vui lòng chọn khung giờ";
        return;
    } else {
        document.getElementById('class-time').classList.remove('error');
        document.getElementById('error-message-time').innerHTML = "";
    }
    // Kiểm tra xem thời gian đặt lịch học có bị trùng hay không của người dùng hiện tại
    // Kiểm tra xem có bị trùng lớp học và khung giờ không
    const isDuplicate = everyClass.some(cls => cls.time === classTime && cls.date === classDate && cls.name === className);
    if (isDuplicate) {
        // alert("Lớp học đã được đặt trước vào thời gian này. Vui lòng chọn thời gian khác.");
        swal("Lớp học đã được đặt trước vào thời gian này. Vui lòng chọn thời gian khác.", {
            icon: "warning",
        });
        // Đặt lại các trường nhập liệu về trạng thái ban đầu
        document.getElementById('class-select').value = 'Chọn lớp học';
        document.getElementById('date-input').value = '';
        document.getElementById('class-time').value = 'Chọn khung giờ';
        return;
    }
    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('accs')) || [];
    // Lấy ra số thứ tự của user hiện tại
    const checkId = JSON.parse(localStorage.getItem('checkIndex'));
    // Lấy thông tin người dùng hiện tại
    const currentUser = users[checkId];
    let newClass = {
        name: className,
        date: classDate,
        time: classTime,
        userr: currentUser.username,
        email: currentUser.email,
    };
    
    // Lấy danh sách lớp học từ localStorage
    everyClass = JSON.parse(localStorage.getItem('everyClass')) || [];
    // Lấy ra biến checkEdit
    const checkEdit = JSON.parse(localStorage.getItem('checkEdit'));
    // everyClass.push(newClass);
    if(checkEdit !== -1) {
        everyClass[checkEdit] = newClass;
    } else {
        everyClass.push(newClass);
    }
    localStorage.setItem('everyClass', JSON.stringify(everyClass));

    // Cập nhật giao diện
    classList.innerHTML = '';
    everyClass.sort((a, b) => {
        // Chuyển ngày thành đối tượng Date và so sánh chúng
        return new Date(b.date) - new Date(a.date); // Sắp xếp theo ngày giảm dần
    });
    everyClass.forEach((cls, index) => {
        if(cls.userr == currentUser.username) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cls.name}</td>
                <td>${cls.date}</td>
                <td>${cls.time}</td>
                <td>${cls.userr}</td>   
                <td>${cls.email}</td>
                <td>
                    <button onclick="editClass(${index})" id="click-1">Sửa</button>
                    <button onclick="deleteClass(${index})" id="click-2">Xóa</button>
                </td>
            `;
            classList.appendChild(tr);
        }
    });
    if(checkEdit !== -1) {
        swal("Sửa lại lịch học thành công!", {
            icon: "success",
        });
    } else {
        swal("Đặt lịch thành công!", {
            icon: "success",
        });
    }
    exitAdd();
}

function displayAdd() {
    // Lấy danh sách lớp học từ localStorage
    everyClass = JSON.parse(localStorage.getItem('everyClass')) || [];
    // Chỉ hiển thị lớp học của người dùng hiện tại
    const users = JSON.parse(localStorage.getItem('accs')) || [];
    // Lấy ra số thứ tự của user hiện tại
    const checkId = JSON.parse(localStorage.getItem('checkIndex'));
    // Lấy thông tin người dùng hiện tại
    const currentUser = users[checkId];
    // Hiển thị danh sách lớp học
    classList.innerHTML = '';
    everyClass.sort((a, b) => {
        // Chuyển ngày thành đối tượng Date và so sánh chúng
        return new Date(b.date) - new Date(a.date); // Sắp xếp theo ngày giảm dần
    });
    everyClass.forEach((cls, index) => {
        if(cls.userr == currentUser.username) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cls.name}</td>
                <td>${cls.date}</td>
                <td>${cls.time}</td>
                <td>${cls.userr}</td>   
                <td>${cls.email}</td>
                <td>
                    <button onclick="editClass(${index})" id="click-1">Sửa</button>
                    <button onclick="deleteClass(${index})" id="click-2">Xóa</button>
                </td>
            `;
            classList.appendChild(tr);
        }
    });
}

window.onload = function() {
    displayAdd();
}

function editClass(index) {
    let checkEdit = index;
    localStorage.setItem('checkEdit', JSON.stringify(checkEdit));
    showAdd();
    // Lấy thông tin lớp học cần sửa
    const classToEdit = everyClass[index];
    // Hiển thị thông tin lớp học trong các trường nhập liệu
    document.getElementById('class-select').value = classToEdit.name;
    document.getElementById('date-input').value = classToEdit.date;
    document.getElementById('class-time').value = classToEdit.time;
}

function deleteClass(index) {
    swal({
        title: "Xóa lịch đã đặt?",
        text: "Bạn có chắc chắn muốn xóa lịch đã đặt không?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Đã xóa lịch thành công nếu có yêu cầu tư vấn xin liên hệ 0339801707", {
                    icon: "success",
                });
                everyClass.splice(index, 1);
                // Cập nhật lại localStorage
                localStorage.setItem('everyClass', JSON.stringify(everyClass));
                // Cập nhật giao diện
                displayAdd();
            } else {
                swal("Đã hủy xóa lịch đã đặt!");
            }
        });
        
}

function checkInPage() {
    // Lấy ra số thứ tự của user hiện tại
    const checkId = JSON.parse(localStorage.getItem('checkIndex'));
    if(checkId !== 0) {
        window.location.href = "/Ung_dung_dat_lich_GYM/homePage.html";
    } else {
        window.location.href = "/Ung_dung_dat_lich_GYM/homeAdmin.html";
    }
}