/* app.js */
/* Logic và Tương tác Tối giản & Tính năng Quản trị cho Amani Lạc Thủy */

// ----------------------------------------------------
// 1. DATA ROOMS - DỮ LIỆU PHÒNG MẶC ĐỊNH
// ----------------------------------------------------
let ROOMS_DATA = {
    "mo-village": {
        name: "Mơ Village Bungalow",
        price: 1200000,
        img: "assets/room_forest.jpg",
        size: "35m²",
        guests: "Tối đa 2 người lớn",
        bed: "01 Giường King-size",
        view: "View thung lũng hoa mơ & núi đá vôi",
        desc: "Mơ Village Bungalow mang phong cách tối giản Bắc Âu kết hợp với chất liệu gỗ thông tự nhiên bản địa. Tọa lạc trên sườn đồi cao nhất, Bungalow sở hữu hiên đón gió rộng rãi, cho bạn tầm nhìn bao quát toàn bộ thung lũng sương mờ Lạc Thủy. Mỗi buổi sáng thức dậy, chỉ cần kéo rèm cửa là cả một khoảng trời thung lũng ngập tràn sương nhẹ hiện ra trước mắt.",
        amenities: ["Wi-Fi miễn phí", "Bồn tắm đứng", "Loa Bluetooth", "Ban công riêng", "Trà & Cà phê tự pha", "Máy sấy tóc", "Điều hòa hai chiều"]
    },
    "dam-da": {
        name: "Đầm Đa Lake Cabin",
        price: 1500000,
        img: "assets/room_lake.jpg",
        size: "40m²",
        guests: "Tối đa 2 người lớn",
        bed: "01 Giường King-size tràn viền",
        view: "Sát mặt hồ Đầm Đa",
        desc: "Thiết kế độc đáo với mặt kính tràn cường lực nhìn thẳng ra hồ Đầm Đa phẳng lặng. Đầm Đa Lake Cabin được ví như chiếc gương soi khổng lồ giữa lòng thiên nhiên. Cabin được trang bị bồn tắm bằng đá tự nhiên ngoài hiên riêng, mang đến trải nghiệm ngâm mình thư giãn tuyệt đối dưới tán cây rừng, nghe tiếng cá đớp mồi và chim hót xa xăm.",
        amenities: ["View hồ 180 độ", "Bồn tắm đá ngoài trời", "Thuyền Kayak riêng", "Wi-Fi miễn phí", "Máy chiếu phim HD", "Minibar", "Máy pha cà phê"]
    },
    "lac-thuy-retreat": {
        name: "Lạc Thủy Retreat",
        price: 1800000,
        img: "assets/hero_homestay.jpg",
        size: "65m²",
        guests: "Tối đa 4 người lớn (hoặc gia đình)",
        bed: "02 Giường đôi cỡ lớn",
        view: "View thung lũng & núi rừng biệt lập",
        desc: "Lạc Thủy Retreat là sự kết hợp đầy nghệ thuật giữa nhà sàn Mường cổ điển với phong cách kiến trúc Brutalist tối giản hiện đại. Ngôi nhà được dựng từ khung gỗ lũa rắn chắc và những mảng tường đá cuội sông mát lạnh vào mùa hè, ấm áp vào mùa đông. Một không gian hoàn toàn riêng tư với lò sưởi đốt củi thật, thích hợp cho nhóm bạn thân hoặc gia đình nhỏ muốn tìm về sự ấm cúng, kết nối.",
        amenities: ["Lò sưởi củi tự nhiên", "Khuôn viên nướng BBQ", "Bếp nấu gia đình", "Sân hiên trà chiều", "Hệ thống âm thanh Marshall", "2 Phòng ngủ biệt lập", "Bồn tắm gỗ Pơ-mu"]
    }
};

// Mật khẩu quản trị mặc định (Mã băm SHA-256 của "admin")
const DEFAULT_PASSWORD_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

// ----------------------------------------------------
// 2. DOCUMENT READY & STATE MANAGEMENT
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const body = document.body;
    const header = document.getElementById("main-header");
    const scrollProgress = document.getElementById("scroll-progress");
    const themeToggle = document.getElementById("theme-toggle");
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    // Modals
    const bookingModal = document.getElementById("booking-modal");
    const detailsModal = document.getElementById("details-modal");
    const adminLoginModal = document.getElementById("admin-login-modal");
    const adminPwdModal = document.getElementById("admin-pwd-modal");
    const adminStatsModal = document.getElementById("admin-stats-modal");
    const adminStatsBtn = document.getElementById("admin-stats-btn");
    
    // Booking Form fields
    const bookRoomSelect = document.getElementById("book-room");
    const bookCheckin = document.getElementById("book-checkin");
    const bookCheckout = document.getElementById("book-checkout");
    const bookGuests = document.getElementById("book-guests");
    const srvBBQ = document.getElementById("srv-bbq");
    const srvTour = document.getElementById("srv-tour");
    
    let totalVisits = 0;
    
    // Load saved content, visitor stats and sync on init
    loadSavedContent();
    syncRoomsDataFromDOM();
    setupDateFields();
    updateVisitorCounter();

    // ------------------------------------------------
    // 3. THEME TOGGLE (LIGHT / DARK MODE)
    // ------------------------------------------------
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        const isDark = body.classList.contains("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        showToast(isDark ? "Đã chuyển sang giao diện tối" : "Đã chuyển sang giao diện sáng");
    });

    // ------------------------------------------------
    // 4. HEADER STICKY & SCROLL PROGRESS
    // ------------------------------------------------
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Sticky Header
        if (scrollTop > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Progress Bar
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${scrollPercent}%`;
    });

    // ------------------------------------------------
    // 5. MOBILE NAVIGATION
    // ------------------------------------------------
    mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains("active") && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

    // ------------------------------------------------
    // 6. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ------------------------------------------------
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".scroll-reveal").forEach(element => {
        revealObserver.observe(element);
    });

    // ------------------------------------------------
    // 7. FAQS ACCORDION
    // ------------------------------------------------
    document.querySelectorAll(".faq-item").forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Close all first for clean accordion behavior
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // ------------------------------------------------
    // 8. MODAL HANDLERS (GENERAL)
    // ------------------------------------------------
    const modalOverlays = [
        { btn: "modal-close", overlay: "modal-overlay", modal: bookingModal },
        { btn: "details-close", overlay: "details-overlay", modal: detailsModal },
        { btn: "admin-login-close", overlay: "admin-login-overlay", modal: adminLoginModal },
        { btn: "admin-pwd-close", overlay: "admin-pwd-overlay", modal: adminPwdModal },
        { btn: "admin-stats-close", overlay: "admin-stats-overlay", modal: adminStatsModal }
    ];

    modalOverlays.forEach(item => {
        document.getElementById(item.btn).addEventListener("click", () => closeModal(item.modal));
        document.getElementById(item.overlay).addEventListener("click", () => closeModal(item.modal));
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal(bookingModal);
            closeModal(detailsModal);
            closeModal(adminLoginModal);
            closeModal(adminPwdModal);
            closeModal(adminStatsModal);
        }
    });

    function openModal(modal) {
        modal.classList.add("active");
        body.style.overflow = "hidden"; // Prevent background scroll
    }

    function closeModal(modal) {
        modal.classList.remove("active");
        if (!document.querySelector(".modal.active")) {
            body.style.overflow = "";
        }
    }

    // ------------------------------------------------
    // 9. ROOM DETAILS MODAL LOGIC
    // ------------------------------------------------
    document.querySelectorAll(".view-details-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const roomId = btn.getAttribute("data-room");
            const roomData = ROOMS_DATA[roomId];
            
            if (roomData) {
                const container = document.getElementById("room-details-content");
                
                // Construct amenities HTML list
                const amenitiesHTML = roomData.amenities.map(item => `
                    <li><i class="fa-solid fa-chevron-right"></i> ${item}</li>
                `).join('');
                
                container.innerHTML = `
                    <div class="room-details-grid">
                        <div class="details-img-slider">
                            <img src="${roomData.img}" alt="${roomData.name}">
                        </div>
                        <div class="details-info-side">
                            <span class="section-label">${roomData.view}</span>
                            <h3>${roomData.name}</h3>
                            <div class="details-price">${formatVND(roomData.price)} <span class="font-sm color-muted">/ đêm</span></div>
                            <p class="details-desc">${roomData.desc}</p>
                            
                            <div class="details-features-list">
                                <h4>Thông tin phòng</h4>
                                <ul>
                                    <li><i class="fa-solid fa-maximize"></i> Diện tích: ${roomData.size}</li>
                                    <li><i class="fa-solid fa-user-group"></i> Sức chứa: ${roomData.guests}</li>
                                    <li><i class="fa-solid fa-bed"></i> Giường ngủ: ${roomData.bed}</li>
                                    <li><i class="fa-solid fa-location-dot"></i> Địa điểm: Lạc Thủy, Hòa Bình</li>
                                </ul>
                            </div>
                            
                            <div class="details-features-list">
                                <h4>Tiện ích bao gồm</h4>
                                <ul>
                                    ${amenitiesHTML}
                                </ul>
                            </div>
                            
                            <div class="room-card-actions" style="grid-template-columns: 1fr; margin-top: 30px;">
                                <button class="btn-primary full-width modal-book-trigger" data-room="${roomId}">Đặt Phòng Ngay</button>
                            </div>
                        </div>
                    </div>
                `;
                
                openModal(detailsModal);
                
                // Add event listener to the "Book Room Now" inside details modal
                container.querySelector(".modal-book-trigger").addEventListener("click", () => {
                    closeModal(detailsModal);
                    triggerBookingFlow(roomId);
                });
            }
        });
    });

    // ------------------------------------------------
    // 10. BOOKING FLOW LOGIC & CALCULATOR
    // ------------------------------------------------
    // Event listeners to update price live
    if (bookRoomSelect) bookRoomSelect.addEventListener("change", calculateBookingPrice);
    if (bookCheckin) bookCheckin.addEventListener("change", calculateBookingPrice);
    if (bookCheckout) bookCheckout.addEventListener("change", calculateBookingPrice);
    if (bookGuests) bookGuests.addEventListener("change", calculateBookingPrice);
    if (srvBBQ) srvBBQ.addEventListener("change", calculateBookingPrice);
    if (srvTour) srvTour.addEventListener("change", calculateBookingPrice);

    // Book buttons in cards
    document.querySelectorAll(".book-now-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const roomId = btn.getAttribute("data-room");
            triggerBookingFlow(roomId);
        });
    });

    // Quick booking form submit (Homepage Hero Widget)
    const quickForm = document.getElementById("quick-booking-form");
    quickForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (body.classList.contains("admin-mode-active")) return;
        const room = document.getElementById("quick-room").value;
        const checkin = document.getElementById("quick-checkin").value;
        const checkout = document.getElementById("quick-checkout").value;
        const guests = document.getElementById("quick-guests").value;
        
        // Sync to modal inputs
        bookRoomSelect.value = room;
        bookCheckin.value = checkin;
        bookCheckout.value = checkout;
        bookGuests.value = guests;
        
        openModal(bookingModal);
        calculateBookingPrice();
    });

    function triggerBookingFlow(roomId) {
        bookRoomSelect.value = roomId;
        openModal(bookingModal);
        calculateBookingPrice();
    }

    function calculateBookingPrice() {
        const roomId = bookRoomSelect.value;
        const room = ROOMS_DATA[roomId];
        
        if (!room) return;
        
        const checkinVal = bookCheckin.value;
        const checkoutVal = bookCheckout.value;
        const guestsVal = parseInt(bookGuests.value) || 2;
        
        let nights = 0;
        let roomCost = 0;
        let bbqCost = 0;
        let tourCost = 0;
        let total = 0;
        
        if (checkinVal && checkoutVal) {
            const start = new Date(checkinVal);
            const end = new Date(checkoutVal);
            
            const timeDiff = end.getTime() - start.getTime();
            if (timeDiff > 0) {
                nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            }
        }
        
        if (nights > 0) {
            roomCost = room.price * nights;
            
            // Services
            if (srvBBQ.checked) {
                bbqCost = 350000 * guestsVal; // 350k per guest
                document.getElementById("summary-bbq-row").style.display = "flex";
                document.getElementById("summary-bbq-price").innerText = formatVND(bbqCost);
            } else {
                document.getElementById("summary-bbq-row").style.display = "none";
            }
            
            if (srvTour.checked) {
                tourCost = 150000; // Flat rate 150k
                document.getElementById("summary-tour-row").style.display = "flex";
                document.getElementById("summary-tour-price").innerText = formatVND(tourCost);
            } else {
                document.getElementById("summary-tour-row").style.display = "none";
            }
            
            total = roomCost + bbqCost + tourCost;
        } else {
            document.getElementById("summary-bbq-row").style.display = "none";
            document.getElementById("summary-tour-row").style.display = "none";
        }
        
        // Update summary DOM
        document.getElementById("summary-room-name").innerText = room.name;
        document.getElementById("summary-nights").innerText = `${nights} đêm`;
        document.getElementById("summary-room-price").innerText = `${formatVND(room.price)} / đêm`;
        document.getElementById("summary-total").innerText = formatVND(total);
    }

    // Helper to format currency
    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'đ');
    }

    // Default dates setup
    function setupDateFields() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formatDate = (date) => {
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            
            return yyyy + '-' + mm + '-' + dd;
        };
        
        const todayStr = formatDate(today);
        const tomorrowStr = formatDate(tomorrow);
        
        const qCheckin = document.getElementById("quick-checkin");
        const qCheckout = document.getElementById("quick-checkout");
        
        if(qCheckin) {
            qCheckin.min = todayStr;
            qCheckin.value = todayStr;
        }
        if(qCheckout) {
            qCheckout.min = tomorrowStr;
            qCheckout.value = tomorrowStr;
        }
        
        if(bookCheckin) {
            bookCheckin.min = todayStr;
            bookCheckin.value = todayStr;
        }
        if(bookCheckout) {
            bookCheckout.min = tomorrowStr;
            bookCheckout.value = tomorrowStr;
        }
        
        const handleCheckinChange = (e) => {
            const selectedDate = new Date(e.target.value);
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            const nextDayStr = formatDate(nextDay);
            
            if (e.target.id === "quick-checkin" && qCheckout) {
                qCheckout.min = nextDayStr;
                if (new Date(qCheckout.value) <= selectedDate) {
                    qCheckout.value = nextDayStr;
                }
            } else if (e.target.id === "book-checkin" && bookCheckout) {
                bookCheckout.min = nextDayStr;
                if (new Date(bookCheckout.value) <= selectedDate) {
                    bookCheckout.value = nextDayStr;
                }
            }
        };

        if(qCheckin) qCheckin.addEventListener("change", handleCheckinChange);
        if(bookCheckin) bookCheckin.addEventListener("change", handleCheckinChange);
    }

    // ------------------------------------------------
    // 11. NETLIFY FORM SUBMISSIONS (AJAX STYLE)
    // ------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const bookingForm = document.getElementById("booking-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (body.classList.contains("admin-mode-active")) return;
            
            const formData = new FormData(contactForm);
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                showToast("Yêu cầu liên hệ đã gửi thành công! Amani sẽ liên hệ lại với bạn ngay.");
                contactForm.reset();
            })
            .catch(error => {
                console.error("Netlify Form Error: ", error);
                showToast("Có lỗi xảy ra khi gửi. Vui lòng nhắn Zalo để được hỗ trợ tức thì!", true);
            });
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (body.classList.contains("admin-mode-active")) return;
            
            const formData = new FormData(bookingForm);
            const selectedRoomName = ROOMS_DATA[bookRoomSelect.value]?.name || bookRoomSelect.value;
            formData.set("room", selectedRoomName);
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                showToast("Gửi đăng ký phòng thành công! Chúng tôi đã lưu thông tin và sẽ gọi bạn xác nhận cọc.");
                bookingForm.reset();
                closeModal(bookingModal);
                setupDateFields();
            })
            .catch(error => {
                console.error("Netlify Booking Form Error: ", error);
                showToast("Không thể gửi yêu cầu trực tuyến. Vui lòng gọi Hotline/Zalo để giữ chỗ gấp!", true);
            });
        });
    }

    // ----------------------------------------------------
    // 12. ADMIN MODE INTERFACES & AUTHENTICATION
    // ----------------------------------------------------
    const adminLoginTrigger = document.getElementById("admin-login-trigger");
    const adminLoginForm = document.getElementById("admin-login-form");
    const adminPwdForm = document.getElementById("admin-pwd-form");
    
    const adminBar = document.getElementById("admin-bar");
    const adminSaveBtn = document.getElementById("admin-save-btn");
    const adminExportBtn = document.getElementById("admin-export-btn");
    const adminPwdBtn = document.getElementById("admin-pwd-btn");
    const adminLogoutBtn = document.getElementById("admin-logout-btn");

    // Hidden file picker references
    const adminFilePicker = document.getElementById("admin-file-picker");
    let activeImageEditTarget = null;

    if (adminFilePicker) {
        adminFilePicker.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file && activeImageEditTarget) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    activeImageEditTarget.successCallback(dataUrl);
                    showToast("Đã tải ảnh lên thành công!");
                    adminFilePicker.value = ""; // Reset picker
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Intercept select clicks in Admin Mode to allow editing option names directly
    const handleSelectEdit = (e) => {
        if (!body.classList.contains("admin-mode-active")) return;
        
        // Prevent opening dropdown
        e.preventDefault();
        
        const choice = prompt(
            "CHỈNH SỬA DANH SÁCH PHÒNG NGHỈ:\n" +
            "1. Sửa phòng 1 (Hiện tại: " + (document.querySelector('[data-key="room-name-1"]')?.innerText || "Mơ Village Bungalow") + ")\n" +
            "2. Sửa phòng 2 (Hiện tại: " + (document.querySelector('[data-key="room-name-2"]')?.innerText || "Đầm Đa Lake Cabin") + ")\n" +
            "3. Sửa phòng 3 (Hiện tại: " + (document.querySelector('[data-key="room-name-3"]')?.innerText || "Lạc Thủy Retreat") + ")\n\n" +
            "Nhập số tương ứng (1, 2, hoặc 3) để đổi tên phòng:"
        );
        
        if (choice === "1") {
            const currentName = document.querySelector('[data-key="room-name-1"]')?.innerText || "";
            const newName = prompt("Nhập tên mới cho Phòng 1:", currentName);
            if (newName && newName.trim() !== "") {
                const el = document.querySelector('[data-key="room-name-1"]');
                if (el) el.innerHTML = newName.trim();
                saveContentToLocalStorage();
                syncRoomsDataFromDOM();
                showToast("Đã đổi tên Phòng 1 thành công!");
            }
        } else if (choice === "2") {
            const currentName = document.querySelector('[data-key="room-name-2"]')?.innerText || "";
            const newName = prompt("Nhập tên mới cho Phòng 2:", currentName);
            if (newName && newName.trim() !== "") {
                const el = document.querySelector('[data-key="room-name-2"]');
                if (el) el.innerHTML = newName.trim();
                saveContentToLocalStorage();
                syncRoomsDataFromDOM();
                showToast("Đã đổi tên Phòng 2 thành công!");
            }
        } else if (choice === "3") {
            const currentName = document.querySelector('[data-key="room-name-3"]')?.innerText || "";
            const newName = prompt("Nhập tên mới cho Phòng 3:", currentName);
            if (newName && newName.trim() !== "") {
                const el = document.querySelector('[data-key="room-name-3"]');
                if (el) el.innerHTML = newName.trim();
                saveContentToLocalStorage();
                syncRoomsDataFromDOM();
                showToast("Đã đổi tên Phòng 3 thành công!");
            }
        }
    };

    const quickRoomSelect = document.getElementById("quick-room");
    const bookRoomSelect = document.getElementById("book-room");
    
    if (quickRoomSelect) {
        quickRoomSelect.addEventListener("mousedown", handleSelectEdit);
    }
    if (bookRoomSelect) {
        bookRoomSelect.addEventListener("mousedown", handleSelectEdit);
    }

    // Open login modal
    adminLoginTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(adminLoginModal);
    });

    // Handle Login Submit
    adminLoginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pwdInput = document.getElementById("admin-password").value;
        const currentHash = localStorage.getItem("amani_pwd_hash") || DEFAULT_PASSWORD_HASH;
        
        const inputHash = await sha256(pwdInput);
        
        if (inputHash === currentHash) {
            closeModal(adminLoginModal);
            adminLoginForm.reset();
            enableAdminMode();
            showToast("Đăng nhập quyền quản trị thành công!");
        } else {
            showToast("Sai mật khẩu quản trị. Vui lòng thử lại!", true);
        }
    });

    // Check if already logged in in this session
    if (sessionStorage.getItem("amani_admin_active") === "true") {
        enableAdminMode();
    }

    // Admin Logout
    adminLogoutBtn.addEventListener("click", () => {
        disableAdminMode();
        sessionStorage.removeItem("amani_admin_active");
        showToast("Đã thoát chế độ quản trị.");
    });

    // Admin Save content temporarily (to LocalStorage)
    adminSaveBtn.addEventListener("click", () => {
        saveContentToLocalStorage();
        syncRoomsDataFromDOM();
        showToast("Đã lưu các thay đổi vào trình duyệt!");
    });

    // Admin Export new index.html file
    adminExportBtn.addEventListener("click", () => {
        exportCleanHTML();
    });

    // Open Stats Modal
    if (adminStatsBtn) {
        adminStatsBtn.addEventListener("click", () => {
            openModal(adminStatsModal);
            document.getElementById("stat-total-views").innerText = totalVisits.toLocaleString('vi-VN');
            document.getElementById("stat-unique-visitors").innerText = Math.floor(totalVisits * 0.76).toLocaleString('vi-VN');
        });
    }

    // Open Change Password Modal
    adminPwdBtn.addEventListener("click", () => {
        openModal(adminPwdModal);
    });

    // Handle Change Password Submit
    adminPwdForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const oldPwd = document.getElementById("pwd-old").value;
        const newPwd = document.getElementById("pwd-new").value;
        const confirmPwd = document.getElementById("pwd-new-confirm").value;

        const currentHash = localStorage.getItem("amani_pwd_hash") || DEFAULT_PASSWORD_HASH;
        const oldHash = await sha256(oldPwd);

        if (oldHash !== currentHash) {
            showToast("Mật khẩu cũ không chính xác!", true);
            return;
        }

        if (newPwd !== confirmPwd) {
            showToast("Mật khẩu mới không trùng khớp!", true);
            return;
        }

        const newHash = await sha256(newPwd);
        localStorage.setItem("amani_pwd_hash", newHash);
        closeModal(adminPwdModal);
        adminPwdForm.reset();
        showToast("Đổi mật khẩu quản trị thành công!");
    });

    // Real-time syncing for duplicate data keys (e.g., logo, phone numbers)
    document.querySelectorAll("[data-key]").forEach(el => {
        el.addEventListener("input", () => {
            const key = el.getAttribute("data-key");
            const val = el.innerHTML;
            
            // Sync all other elements with the same key
            document.querySelectorAll(`[data-key="${key}"]`).forEach(other => {
                if (other !== el) {
                    other.innerHTML = val;
                }
            });
            
            // Update page title if they edit the logo
            if (key === "logo-serif" || key === "logo-sans") {
                const serif = document.querySelector('[data-key="logo-serif"]')?.innerText || "Amani";
                const sans = document.querySelector('[data-key="logo-sans"]')?.innerText || "Lạc Thủy";
                document.title = `${serif} ${sans} | Homestay Nghỉ Dưỡng Tối Giản Hòa Bình`;
            }
        });
    });

    // ----------------------------------------------------
    // 13. ADMIN FUNCTIONS (INLINE EDIT & SERIALIZE)
    // ----------------------------------------------------
    function enableAdminMode() {
        body.classList.add("admin-mode-active");
        sessionStorage.setItem("amani_admin_active", "true");
        
        // Make text editable
        document.querySelectorAll("[data-key]").forEach(el => {
            el.setAttribute("contenteditable", "true");
            // Prevent link clicks during editing
            if (el.tagName === "A") {
                el.addEventListener("click", preventDefaultHandler);
            }
        });

        // Prevent link clicks on logo <a> wrappers
        document.querySelectorAll("a").forEach(a => {
            if (a.querySelector("[data-key]")) {
                a.addEventListener("click", preventDefaultHandler);
            }
        });

        // Temporarily remove 'for' attribute from labels to allow clicking & editing text without focusing input
        document.querySelectorAll("label[data-key]").forEach(lbl => {
            const originalFor = lbl.getAttribute("for");
            if (originalFor) {
                lbl.setAttribute("data-original-for", originalFor);
                lbl.removeAttribute("for");
            }
        });

        // Inject Image edit buttons
        injectImageEditButtons();
    }

    function disableAdminMode() {
        body.classList.remove("admin-mode-active");
        
        document.querySelectorAll("[data-key]").forEach(el => {
            el.removeAttribute("contenteditable");
            if (el.tagName === "A") {
                el.removeEventListener("click", preventDefaultHandler);
            }
        });

        // Restore link clicks on logo <a> wrappers
        document.querySelectorAll("a").forEach(a => {
            if (a.querySelector("[data-key]")) {
                a.removeEventListener("click", preventDefaultHandler);
            }
        });

        // Restore 'for' attribute to labels
        document.querySelectorAll("label[data-key]").forEach(lbl => {
            const originalFor = lbl.getAttribute("data-original-for");
            if (originalFor) {
                lbl.setAttribute("for", originalFor);
                lbl.removeAttribute("data-original-for");
            }
        });

        // Remove image edit buttons
        document.querySelectorAll(".admin-image-btn").forEach(btn => btn.remove());
    }

    function preventDefaultHandler(e) {
        e.preventDefault();
    }

    // SHA-256 hashing helper
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Save current inline edits to LocalStorage
    function saveContentToLocalStorage() {
        const contentData = {};
        const imageData = {};

        // Extract texts
        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            contentData[key] = el.innerHTML.trim();
        });

        // Extract images
        document.querySelectorAll("[data-img-key]").forEach(el => {
            const key = el.getAttribute("data-img-key");
            imageData[key] = el.getAttribute("src");
        });

        // Extract background images
        document.querySelectorAll("[data-bg-key]").forEach(el => {
            const key = el.getAttribute("data-bg-key");
            const style = el.style.backgroundImage;
            // Extract URL from style
            const urlMatch = style.match(/url\(['"]?([^'"]+?)['"]?\)/);
            if (urlMatch) {
                imageData[key] = urlMatch[1];
            }
        });

        localStorage.setItem("amani_content", JSON.stringify(contentData));
        localStorage.setItem("amani_images", JSON.stringify(imageData));

        // Sync clickable link values (Hotline / Zalo)
        syncClickableLinks();
    }

    // Load saved content on refresh
    function loadSavedContent() {
        const contentData = JSON.parse(localStorage.getItem("amani_content"));
        const imageData = JSON.parse(localStorage.getItem("amani_images"));

        if (contentData) {
            document.querySelectorAll("[data-key]").forEach(el => {
                const key = el.getAttribute("data-key");
                if (contentData[key] !== undefined) {
                    el.innerHTML = contentData[key];
                }
            });
            syncClickableLinks();
        }

        if (imageData) {
            // Apply source images
            document.querySelectorAll("[data-img-key]").forEach(el => {
                const key = el.getAttribute("data-img-key");
                if (imageData[key]) {
                    el.setAttribute("src", imageData[key]);
                }
            });

            // Apply background images
            document.querySelectorAll("[data-bg-key]").forEach(el => {
                const key = el.getAttribute("data-bg-key");
                if (imageData[key]) {
                    el.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('${imageData[key]}')`;
                }
            });
        }
        
        // Sync select options and pricing mapping from DOM
        syncRoomsDataFromDOM();
    }

    // Sync memory ROOMS_DATA from DOM values
    function syncRoomsDataFromDOM() {
        // Mo Village
        const name1 = document.querySelector('[data-key="room-name-1"]')?.innerText || "Mơ Village Bungalow";
        const price1 = parseInt((document.querySelector('[data-key="room-price-1"]')?.innerText || "1.200.000").replace(/\./g, '')) || 1200000;
        const img1 = document.querySelector('[data-img-key="room-img-1"]')?.getAttribute("src") || "assets/room_forest.jpg";
        
        // Dam Da Cabin
        const name2 = document.querySelector('[data-key="room-name-2"]')?.innerText || "Đầm Đa Lake Cabin";
        const price2 = parseInt((document.querySelector('[data-key="room-price-2"]')?.innerText || "1.500.000").replace(/\./g, '')) || 1500000;
        const img2 = document.querySelector('[data-img-key="room-img-2"]')?.getAttribute("src") || "assets/room_lake.jpg";

        // Lạc Thủy Retreat
        const name3 = document.querySelector('[data-key="room-name-3"]')?.innerText || "Lạc Thủy Retreat";
        const price3 = parseInt((document.querySelector('[data-key="room-price-3"]')?.innerText || "1.800.000").replace(/\./g, '')) || 1800000;
        const img3 = document.querySelector('[data-img-key="room-img-3"]')?.getAttribute("src") || "assets/hero_homestay.jpg";

        ROOMS_DATA["mo-village"].name = name1;
        ROOMS_DATA["mo-village"].price = price1;
        ROOMS_DATA["mo-village"].img = img1;
        
        ROOMS_DATA["dam-da"].name = name2;
        ROOMS_DATA["dam-da"].price = price2;
        ROOMS_DATA["dam-da"].img = img2;

        ROOMS_DATA["lac-thuy-retreat"].name = name3;
        ROOMS_DATA["lac-thuy-retreat"].price = price3;
        ROOMS_DATA["lac-thuy-retreat"].img = img3;

        // Force select options inside booking modal to reflect names
        const option1 = document.querySelector('#book-room option[value="mo-village"]');
        const option2 = document.querySelector('#book-room option[value="dam-da"]');
        const option3 = document.querySelector('#book-room option[value="lac-thuy-retreat"]');

        if (option1) option1.text = `${name1} (${formatVND(price1)}/đêm)`;
        if (option2) option2.text = `${name2} (${formatVND(price2)}/đêm)`;
        if (option3) option3.text = `${name3} (${formatVND(price3)}/đêm)`;

        // Force select options inside Hero Quick Booking Widget to reflect names
        const quickOption1 = document.querySelector('#quick-room option[value="mo-village"]');
        const quickOption2 = document.querySelector('#quick-room option[value="dam-da"]');
        const quickOption3 = document.querySelector('#quick-room option[value="lac-thuy-retreat"]');

        if (quickOption1) quickOption1.text = name1;
        if (quickOption2) quickOption2.text = name2;
        if (quickOption3) quickOption3.text = name3;
    }

    // Automatically sync edited texts to anchor links (tel: and zalo.me)
    function syncClickableLinks() {
        const hotlineNumEl = document.querySelector('[data-key="hotline-num"]');
        const zaloTextEl = document.querySelector('[data-key="zalo-text"]');

        if (hotlineNumEl) {
            const rawPhone = hotlineNumEl.innerText.replace(/\s+/g, '');
            // Update tel link in page
            document.querySelectorAll('a[href^="tel:"]').forEach(el => {
                el.setAttribute("href", `tel:${rawPhone}`);
            });
        }

        if (zaloTextEl) {
            // If the user modified the zalo text and it contains a number, or we use the hotline number as Zalo URL fallback
            const phoneForZalo = hotlineNumEl ? hotlineNumEl.innerText.replace(/\s+/g, '') : "0987654321";
            document.querySelectorAll('a[href*="zalo.me"]').forEach(el => {
                el.setAttribute("href", `https://zalo.me/${phoneForZalo}`);
            });
        }
    }

    // Inject "Change image" buttons dynamically on hover wrappers
    function injectImageEditButtons() {
        // 1. Image elements with data-img-key
        document.querySelectorAll("[data-img-key]").forEach(el => {
            // Find parent wrapper or card wrapper
            let wrapper = el.parentElement;
            if (wrapper.classList.contains("room-img-wrapper") || wrapper.classList.contains("image-wrapper-decorative")) {
                createImageEditButton(wrapper, (newUrl) => {
                    el.setAttribute("src", newUrl);
                    saveContentToLocalStorage();
                    syncRoomsDataFromDOM();
                });
            }
        });

        // 2. Background image with data-bg-key (Hero)
        const heroBg = document.getElementById("hero-bg");
        if (heroBg) {
            createImageEditButton(heroBg, (newUrl) => {
                heroBg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('${newUrl}')`;
                saveContentToLocalStorage();
                syncRoomsDataFromDOM();
            });
        }
    }

    function createImageEditButton(container, successCallback) {
        // Make container position relative if not
        const computedStyle = window.getComputedStyle(container);
        if (computedStyle.position === "static") {
            container.style.position = "relative";
        }

        // Avoid duplicate button injection
        if (container.querySelector(".admin-image-btn")) return;

        const btn = document.createElement("button");
        btn.className = "admin-image-btn";
        btn.innerHTML = '<i class="fa-solid fa-camera"></i> Đổi ảnh';
        
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const pickMethod = confirm("Bạn muốn tải ảnh từ máy tính lên (bấm OK) hay nhập link ảnh online (bấm Cancel)?");
            
            if (pickMethod) {
                // Upload local image
                activeImageEditTarget = { container, successCallback };
                if (adminFilePicker) adminFilePicker.click();
            } else {
                // Online URL image
                const currentImg = container.querySelector("img") ? container.querySelector("img").getAttribute("src") : "";
                const newUrl = prompt("Nhập đường dẫn ảnh mới (Local path ví dụ: assets/room_forest.jpg hoặc link online):", currentImg);
                
                if (newUrl !== null && newUrl.trim() !== "") {
                    successCallback(newUrl.trim());
                    showToast("Đã cập nhật hình ảnh thành công!");
                }
            }
        });

        container.appendChild(btn);
    }

    // Export clean index.html file for user redeploy
    function exportCleanHTML() {
        // Save current changes first
        saveContentToLocalStorage();
        syncRoomsDataFromDOM();

        // Clone the document to modify it in memory
        const docClone = document.documentElement.cloneNode(true);

        // 1. Remove admin bar active classes
        const bodyClone = docClone.querySelector("body");
        bodyClone.classList.remove("admin-mode-active");

        // 2. Remove all injected image buttons
        docClone.querySelectorAll(".admin-image-btn").forEach(btn => btn.remove());

        // 3. Remove contenteditable attributes and restore label for attributes
        docClone.querySelectorAll("[data-key]").forEach(el => {
            el.removeAttribute("contenteditable");
            if (el.tagName === "LABEL") {
                const originalFor = el.getAttribute("data-original-for");
                if (originalFor) {
                    el.setAttribute("for", originalFor);
                    el.removeAttribute("data-original-for");
                }
            }
        });

        // 4. Ensure admin bar is hidden and forms are reset
        const adminBarClone = docClone.querySelector("#admin-bar");
        if (adminBarClone) {
            adminBarClone.removeAttribute("style"); // Reset inline style
        }
        
        // Reset forms inside the export
        docClone.querySelectorAll("form").forEach(form => form.reset());

        // 5. Clean up any dynamically injected scrollbar widths or inline styles from overlays
        bodyClone.removeAttribute("style");

        // Create HTML string
        const htmlContent = "<!DOCTYPE html>\n" + docClone.outerHTML;

        // Create blob and download link
        const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "index.html";
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);

        showToast("Tải về tệp index.html mới thành công! Hãy lấy tệp này kéo thả lại lên Netlify.");
    }

    // Fetch and update visitor count
    function updateVisitorCounter() {
        const counterUrl = "https://api.counterapi.dev/v1/namespaces/amani_lac_thuy/counters/visits/up";
        
        fetch(counterUrl)
            .then(response => {
                if (!response.ok) throw new Error("API response error");
                return response.json();
            })
            .then(data => {
                if (data && typeof data.count === "number") {
                    totalVisits = data.count;
                } else if (data && typeof data.value === "number") {
                    totalVisits = data.value;
                }
                updateVisitUI();
            })
            .catch(error => {
                console.warn("CounterAPI error, using local fallback counter:", error);
                let localVisits = parseInt(localStorage.getItem("mock_visits")) || 382;
                localVisits += 1;
                localStorage.setItem("mock_visits", localVisits);
                totalVisits = localVisits;
                updateVisitUI();
            });
    }

    function updateVisitUI() {
        const footerCountEl = document.getElementById("footer-visit-count");
        if (footerCountEl) {
            footerCountEl.innerText = totalVisits.toLocaleString('vi-VN');
        }
    }

    // ------------------------------------------------
    // 14. TOAST NOTIFICATION UTILITY
    // ------------------------------------------------
    function showToast(message, isError = false) {
        const toastContainer = document.getElementById("toast-container");
        if (!toastContainer) return;
        
        const toast = document.createElement("div");
        toast.className = `toast success ${isError ? 'error-toast' : ''}`;
        
        if (isError) {
            toast.style.borderLeftColor = "#d9534f";
        }
        
        const iconHTML = isError 
            ? '<i class="fa-solid fa-circle-exclamation toast-icon" style="color: #d9534f;"></i>' 
            : '<i class="fa-solid fa-circle-check toast-icon"></i>';
            
        toast.innerHTML = `
            ${iconHTML}
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add("show");
        }, 50);
        
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4500);
    }
});
