
function logout() {
    // Xóa thông tin người dùng khỏi localStorage
    let checkIndex = -1;
    localStorage.setItem('checkIndex', checkIndex);
}

const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

// Lấy các phần tử input và value để hiển thị giá trị    
const gymInput = document.getElementById("gym");
const yogaInput = document.getElementById("yoga");
const zumbaInput = document.getElementById("zumba");
const gymValue = document.getElementById("gym-value");
const yogaValue = document.getElementById("yoga-value");
const zumbaValue = document.getElementById("zumba-value");

// Thiết lập thông số cho biểu đồ 
const barWidth = 120; // Chiều rộng cột để vừa canvas
const maxHeight = 190; // Chiều cao tối đa để vừa canvas
const startX = 10;
const startY = 200; // startY để vừa canvas 
const labels = ["Gym", "Yoga", "Zumba"];
const colors = ["#36A2EB", "#4BC0C0", "#9966FF"];

// Hàm vẽ biểu đồ
function drawChart(gymCount, yogaCount, zumbaCount) {
    const counts = [gymCount, yogaCount, zumbaCount];
    const maxCount = Math.max(...counts, 1); // Đảm bảo không chia cho 0

    // Xóa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ trục X và Y
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Trục X
    ctx.lineTo(startX + barWidth * labels.length + 120, startY);
    ctx.moveTo(startX, startY); // Trục Y
    ctx.lineTo(startX, startY - maxHeight - 10);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.2;
    ctx.stroke();

    // Vẽ các cột và đường ngăn cách
    counts.forEach((count, index) => {
        const barHeight = (count / maxCount) * maxHeight; // Tính chiều cao cột
        const x = startX + index * (barWidth + 20); // Vị trí X của cột
        const y = startY - barHeight; // Vị trí Y của cột

        // Vẽ cột
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);

        // Ghi nhãn dưới cột
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(labels[index], x + barWidth / 2, startY + 15);

        // Vẽ đường ngăn cách giữa các cột (trừ cột cuối cùng)
        if (index < counts.length - 1) {
            const separatorX = x + barWidth + 10;
            ctx.beginPath();
            ctx.moveTo(separatorX, startY - maxHeight - 10);
            ctx.lineTo(separatorX, startY);
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });
}

// Hàm lấy dữ liệu từ everyClass và cập nhật biểu đồ
function updateChart() {
    // Lấy dữ liệu từ localStorage
    const everyClass = JSON.parse(localStorage.getItem('everyClass')) || [];

    // Đếm số lần xuất hiện của từng lớp học
    let gymCount = 0;
    let yogaCount = 0;
    let zumbaCount = 0;

    everyClass.forEach(cls => {
        switch (cls.name) {
            case "Gym":
                gymCount++;
                break;
            case "Yoga":
                yogaCount++;
                break;
            case "Zumba":
                zumbaCount++;
                break;
        }
    });

    // Nếu có input từ người dùng, ưu tiên dùng input
    const gymHours = gymInput ? (parseInt(gymInput.value) || gymCount) : gymCount;
    const yogaHours = yogaInput ? (parseInt(yogaInput.value) || yogaCount) : yogaCount;
    const zumbaHours = zumbaInput ? (parseInt(zumbaInput.value) || zumbaCount) : zumbaCount;

    // Cập nhật số liệu hiển thị
    if (gymValue) gymValue.textContent = gymHours;
    if (yogaValue) yogaValue.textContent = yogaHours;
    if (zumbaValue) zumbaValue.textContent = zumbaHours;

    // Vẽ lại biểu đồ
    drawChart(gymHours, yogaHours, zumbaHours);
}

// Khởi tạo biểu đồ khi tải trang
window.onload = function () {
    updateChart();
};

updateChart();


// Khởi tạo mảng everyClass từ localStorage
let everyClass = [];
const showAddClass = document.getElementById('box-up');
const classList = document.getElementById('schedule-list');

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
        // Đặt lại các trường nhập liệu về trạng thái ban đầu
        document.getElementById('name-input').value = '';
        document.getElementById('email-input').value = '';
        document.getElementById('class-select').value = 'Chọn lớp học';
        document.getElementById('date-input').value = '';
        document.getElementById('class-time').value = 'Chọn khung giờ';
        document.getElementById('error-message-class').innerHTML = "";
        document.getElementById('error-message-date').innerHTML = "";
        document.getElementById('error-message-time').innerHTML = "";
        // Cho trở về màu bình thường
        document.getElementById('name-input').classList.add('not-error');
        document.getElementById('email-input').classList.add('not-error');
        document.getElementById('class-select').classList.add('not-error');
        document.getElementById('date-input').classList.add('not-error');
        document.getElementById('class-time').classList.add('not-error');

    } else {
        console.error("Không tìm thấy phần tử #box-up");
    }
}


function saveAdd() {
    const nameInput = document.getElementById('name-input').value;
    if (nameInput === "") {
        document.getElementById('name-input').classList.add('error');
        document.getElementById('error-message-name').innerHTML = "Vui lòng nhập tên lớp học";
    } else {
        document.getElementById('name-input').classList.remove('error');
        document.getElementById('error-message-name').innerHTML = "";
    }
    const emailInput = document.getElementById('email-input').value;
    if (emailInput === "") {
        document.getElementById('email-input').classList.add('error');
        document.getElementById('error-message-email').innerHTML = "Vui lòng nhập email";
    } else {
        document.getElementById('email-input').classList.remove('error');
        document.getElementById('error-message-email').innerHTML = "";
    }
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

    // Kiểm tra xem có bị trùng lớp học và khung giờ không
    const isDuplicate = everyClass.some(cls => cls.name === className && cls.time === classTime && cls.date === classDate && cls.userr === nameInput);
    if (isDuplicate) {
        swal("Lớp học đã được đặt trước vào thời gian này. Vui lòng chọn thời gian khác.", {
            icon: "warning",
        });
        // Đặt lại các trường nhập liệu về trạng thái ban đầu
        document.getElementById('class-select').value = 'Chọn lớp học';
        document.getElementById('date-input').value = '';
        document.getElementById('class-time').value = 'Chọn khung giờ';
        return;
    }
    // lưu lại vào newClass
    let newClass = {
        name: className,
        date: classDate,
        time: classTime,
        userr: nameInput,
        email: emailInput
    };

    // Lấy danh sách lớp học từ localStorage
    everyClass = JSON.parse(localStorage.getItem('everyClass')) || [];
    // Lấy ra biến checkEdit từ localStorage
    const checkEdit = JSON.parse(localStorage.getItem('checkEdit'));
    if (checkEdit !== -1) {
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
    });
    exitAdd();
    swal("Sửa lịch học thành công!", {
        icon: "success",
    });
}

function displayAdd() {
    // Lấy danh sách lớp học từ localStorage
    everyClass = JSON.parse(localStorage.getItem('everyClass')) || [];
    // Hiển thị danh sách lớp học
    classList.innerHTML = '';
    everyClass.sort((a, b) => {
        // Chuyển ngày thành đối tượng Date và so sánh chúng
        return new Date(b.date) - new Date(a.date); // Sắp xếp theo ngày giảm dần
    });
    everyClass.forEach((cls, index) => {
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
    });
}

window.onload = displayAdd();

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
    document.getElementById('name-input').value = classToEdit.userr;
    document.getElementById('email-input').value = classToEdit.email;
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

function displayAddFilter() {
    // Lấy dữ liệu nhập vào
    const filterClass = document.getElementById('filter-data-admin-check').value;
    const filterEmail = document.getElementById('search-email-check').value;
    console.log(filterEmail);

    const filterTime = document.getElementById('search-time-check').value;
    // Lấy danh sách lớp học từ localStorage
    everyClass = JSON.parse(localStorage.getItem('everyClass')) || [];
    // Hiển thị danh sách lớp học
    classList.innerHTML = '';
    everyClass.sort((a, b) => {
        // Chuyển ngày thành đối tượng Date và so sánh chúng
        return new Date(b.date) - new Date(a.date); // Sắp xếp theo ngày giảm dần
    });
    everyClass.forEach((cls, index) => {
        if (filterClass === "Tất cả" && filterEmail === '' && filterTime === '') {
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
        } else if (cls.name === filterClass || cls.email === filterEmail || cls.date === filterTime) {
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


// Tạo biến lấy ra dữ liệu và tạo mới dữ liệu
const displayClass = document.getElementById('class-select');
function renderClasses() {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    displayClass.innerHTML = '<option>Chọn lớp học</option>';
    services.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.nameService;
        option.textContent = cls.nameService;
        displayClass.appendChild(option);
    });
}
renderClasses();

const displayClassR = document.getElementById('filter-data-admin-check');
function renderClassesR() {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    displayClass.innerHTML = '<option>Tất cả</option>';
    services.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.nameService;
        option.textContent = cls.nameService;
        displayClassR.appendChild(option);
    });
}
renderClassesR();