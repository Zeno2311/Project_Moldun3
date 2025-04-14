let services = [
    // {
    //     nameService: "Gym",
    //     describeService: "Tập luyện với các thiết bị hiện đại",
    //     imageService: "/Ung_dung_dat_lich_GYM/data/gym.jpg"
    // },
    // {
    //     nameService: "Yoga",
    //     describeService: "Thư giãn và cân bằng tâm trí",
    //     imageService: "/Ung_dung_dat_lich_GYM/data/yoga.avif"
    // },
    // {
    //     nameService: "Zumba",
    //     describeService: "Đốt cháy calories với những điệu nhảy sôi động",
    //     imageService: "/Ung_dung_dat_lich_GYM/data/zumba.jpg"
    // },
];
// localStorage.setItem('services', JSON.stringify(services));


const lish = document.getElementById('service-list');
const addService = document.getElementById('add-service-btn');

// Lưu và thêm/sửa dịch vụ
function saveAdd() {
    // Lấy dữ liệu từ localStorage
    services = JSON.parse(localStorage.getItem('services')) || [];

    // Lấy dữ liệu nhập vào và kiểm tra điều kiện
    const nameService = document.getElementById('name-service').value;
    const comment = document.getElementById('cmt').value;
    const url = document.getElementById('url').value;

    let hasError = false;

    if (nameService === '') {
        document.getElementById('name-service').classList.add('error');
        document.getElementById('error-message-name').innerHTML = "Vui lòng không để tên dịch vụ trống";
        hasError = true;
    } else {
        document.getElementById('name-service').classList.remove('error');
        document.getElementById('name-service').classList.add('not-error');
        document.getElementById('error-message-name').innerHTML = "";
    }

    if (comment === '') {
        document.getElementById('cmt').classList.add('error');
        document.getElementById('error-message-textarea').innerHTML = "Vui lòng không để phần mô tả trống";
        hasError = true;
    } else {
        document.getElementById('cmt').classList.remove('error');
        document.getElementById('cmt').classList.add('not-error');
        document.getElementById('error-message-textarea').innerHTML = "";
    }

    if (url === '') {
        document.getElementById('url').classList.add('error');
        document.getElementById('error-message-url').innerHTML = "Vui lòng không để phần URL trống";
        hasError = true;
    } else {
        document.getElementById('url').classList.remove('error');
        document.getElementById('url').classList.add('not-error');
        document.getElementById('error-message-url').innerHTML = "";
    }

    if (hasError) return;

    // Kiểm tra trùng tên dịch vụ
    const checkService = services.some(cls => cls.nameService === nameService);
    const checkEditService = JSON.parse(localStorage.getItem('checkEditService')) || -1;

    if (checkService && checkEditService === -1) {
        swal("Dịch vụ này đã tồn tại.", { icon: "warning" });
        return;
    }

    // Tạo dịch vụ mới
    let newService = {
        nameService: nameService,
        describeService: comment,
        imageService: url,
    };

    // Kiểm tra chế độ sửa hay thêm
    if (checkEditService !== -1) {
        services[checkEditService] = newService;
        swal("Sửa lại dịch vụ thành công!", { icon: "success" });
    } else {
        services.push(newService);
        swal("Thêm dịch vụ thành công!", { icon: "success" });
    }

    // Cập nhật localStorage và giao diện
    localStorage.setItem('services', JSON.stringify(services));
    displayService();
    exitAdd();
}

// Hiển thị danh sách dịch vụ
function displayService() {
    services = JSON.parse(localStorage.getItem('services')) || [];
    lish.innerHTML = '';
    services.forEach((cls, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cls.nameService}</td>
            <td>${cls.describeService}</td>
            <td><img src="${cls.imageService}" alt="${cls.nameService}"></td>
            <td>
                <button onclick="editClass(${index})" id="click-1">Sửa</button>
                <button onclick="deleteClass(${index})" id="click-2">Xóa</button>
            </td>
        `;
        lish.appendChild(tr);
    });
}

// Sửa dịch vụ
function editClass(index) {
    localStorage.setItem('checkEditService', JSON.stringify(index));
    showAdd();
    services = JSON.parse(localStorage.getItem('services')) || [];
    const editService = services[index];
    document.getElementById('name-service').value = editService.nameService;
    document.getElementById('cmt').value = editService.describeService;
    document.getElementById('url').value = editService.imageService;
}

// Xóa dịch vụ
function deleteClass(index) {
    swal({
        title: "Xóa dịch vụ?",
        text: "Bạn có chắc chắn muốn xóa dịch vụ hay không?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            services.splice(index, 1);
            localStorage.setItem('services', JSON.stringify(services));
            displayService();
            swal("Đã xóa dịch vụ thành công!", { icon: "success" });
        } else {
            swal("Đã hủy xóa dịch vụ!");
        }
    });
}

// Hiển thị/Ẩn form thêm dịch vụ
const showAndExit = document.getElementById('add-service');

function exitAdd() {
    localStorage.setItem('checkEditService', JSON.stringify(-1));
    showAndExit.style.display = 'none';
    document.getElementById('name-service').value = '';
    document.getElementById('cmt').value = '';
    document.getElementById('url').value = '';
    document.getElementById('name-service').classList.remove('error', 'not-error');
    document.getElementById('cmt').classList.remove('error', 'not-error');
    document.getElementById('url').classList.remove('error', 'not-error');
    document.getElementById('error-message-name').innerHTML = "";
    document.getElementById('error-message-textarea').innerHTML = "";
    document.getElementById('error-message-url').innerHTML = "";
}

function showAdd() {
    showAndExit.style.display = 'block';
}

// Gọi hàm hiển thị khi tải trang
window.onload = displayService;

