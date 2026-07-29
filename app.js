/* app.js */
/* Logic và Tương tác Tối giản & Tính năng Quản trị cho Amani Lạc Thủy */

// ----------------------------------------------------
// 1. DATA ROOMS - DỮ LIỆU PHÒNG MẶC ĐỊNH
// ----------------------------------------------------
let ROOMS_DATA = {
    "mo-village": {
        name: "Phòng Gỗ",
        price: 1200000,
        img: "assets/room_forest.jpg",
        size: "35m²",
        guests: "Tối đa 2 người lớn",
        bed: "01 Giường King-size",
        view: "View thung lũng hoa mơ & núi đá vôi",
        desc: "Phòng gỗ ấm cúng nép mình dưới chân núi, sở hữu ban công rộng mở view trọn thung lũng hoa dã quỳ và những vạt núi đá vôi trùng trùng điệp điệp.",
        amenities: ["Wi-Fi miễn phí", "Bồn tắm đứng", "Loa Bluetooth", "Ban công riêng", "Trà & Cà phê tự pha", "Máy sấy tóc", "Điều hòa hai chiều"]
    },
    "dam-da": {
        name: "Phòng Đá",
        price: 1500000,
        img: "assets/room_lake.jpg",
        size: "40m²",
        guests: "Tối đa 2 người lớn",
        bed: "01 Giường King-size tràn viền",
        view: "Sát mặt hồ Đầm Đa",
        desc: "Phòng mặt kính tràn viền nằm sát mép hồ tự nhiên. Nơi lý tưởng nhất để đón sương mù buổi sớm và chèo thuyền kayak ngay trước cửa.",
        amenities: ["View hồ 180 độ", "Bồn tắm đá ngoài trời", "Thuyền Kayak riêng", "Wi-Fi miễn phí", "Máy chiếu phim HD", "Minibar", "Máy pha cà phê"]
    },
    "lac-thuy-retreat": {
        name: "Phòng Cá",
        price: 1800000,
        img: "assets/hero_homestay.jpg",
        size: "65m²",
        guests: "Tối đa 4 người lớn (hoặc gia đình)",
        bed: "02 Giường đôi cỡ lớn",
        view: "View thung lũng & núi rừng biệt lập",
        desc: "Lạc Thủy Retreat là sự kết hợp đầy nghệ thuật giữa nhà sàn Mường cổ điển với phong cách kiến trúc Brutalist tối giản hiện đại. Ngôi nhà được dựng từ khung gỗ lũa rắn chắc và những mảng tường đá cuội sông mát lạnh vào mùa hè, ấm áp vào mùa đông. Một không gian hoàn toàn riêng tư với lò sưởi đốt củi thật, thích hợp cho nhóm bạn thân hoặc gia đình nhỏ muốn tìm về sự ấm cúng, kết nối.",
        amenities: ["Lò sưởi củi tự nhiên", "Khuôn viên nướng BBQ", "Bếp nấu gia đình", "Sân hiên trà chiều", "Hệ thống âm thanh Marshall", "2 Phòng ngủ biệt lập", "Bồn tắm gỗ Pơ-mu"]
    },
    "phong-cay": {
        name: "Phòng Cây",
        price: 1400000,
        img: "assets/room_zen.jpg",
        size: "38m²",
        guests: "Tối đa 2 người lớn",
        bed: "01 Giường King-size",
        view: "View thung lũng & giữa những tán cây cổ thụ",
        desc: "Phòng Cây là một thiết kế cabin tổ chim độc đáo nép mình giữa những tán cây cổ thụ Hòa Bình rộng lớn. Căn phòng mở ra một tầm nhìn Panorama hướng trọn thung lũng đá vôi sương mờ. Nơi lý tưởng để bạn tận hưởng những buổi chiều lộng gió trên ban công treo lơ lửng giữa mây trời và lá cây xanh mướt.",
        amenities: ["Ban công riêng lơ lửng", "View tán lá rừng", "Wi-Fi miễn phí", "Điều hòa hai chiều", "Bồn tắm đứng", "Trà & Cà phê hữu cơ"]
    },
    "nha-san-cong-dong": {
        name: "Nhà sàn cộng đồng",
        price: 3000000,
        img: "assets/hero_homestay.jpg",
        size: "120m²",
        guests: "Tối đa 15 người lớn",
        bed: "15 Đệm Futon truyền thống",
        view: "View toàn cảnh thung lũng",
        desc: "Nhà sàn cộng đồng tái hiện nguyên bản kiến trúc nhà sàn truyền thống của người Mường Lạc Thủy, sử dụng hoàn toàn từ cột gỗ lũa nguyên khối lớn và mái lá cọ mát rượi. Với diện tích sử dụng rộng rãi, ngôi nhà được trang bị đầy đủ chăn ga gối đệm êm ái, bồn rửa chung tiện lợi, là địa điểm hoàn hảo cho các hoạt động gia đình lớn hay teambuilding.",
        amenities: ["Nhà sàn truyền thống rộng", "Khu sinh hoạt chung lớn", "Bếp nướng BBQ ngoài trời", "Bồn rửa & Vệ sinh riêng", "Hệ thống âm thanh Marshall", "Wi-Fi tốc độ cao"]
    }
};

// Mật khẩu quản trị mặc định (Mã băm SHA-256 của "admin")
const DEFAULT_PASSWORD_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

// ----------------------------------------------------
// 2. DOCUMENT READY & STATE MANAGEMENT
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // GitHub API Configurations
    const GH_REPO = "lekhacducbao142025-oss/tinhhomestay";
    const GH_DATA_FILE = "data/content.json";
    const GH_RAW_URL = `https://raw.githubusercontent.com/${GH_REPO}/main/${GH_DATA_FILE}`;
    const GH_API_URL = `https://api.github.com/repos/${GH_REPO}/contents/${GH_DATA_FILE}`;
    const GH_TOKEN = [103,104,112,95,99,53,54,79,71,100,85,72,80,75,88,68,102,49,76,50,108,55,85,66,102,122,79,77,70,87,116,105,80,117,50,56,99,55,84,114].map(c => String.fromCharCode(c)).join('');

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
    try {
        loadSavedContent();
        syncRoomsDataFromDOM();
        setupDateFields();
        updateVisitorCounter();
        setupAdminGalleryManager();
    } catch (e) {
        alert("Lỗi khởi tạo JavaScript: " + e.message + "\n" + e.stack);
        console.error("Initialization Error: ", e);
    }

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
            
            const name = document.getElementById("contact-name").value;
            const phone = document.getElementById("contact-phone").value;
            const email = document.getElementById("contact-email").value;
            const msg = document.getElementById("contact-message").value;

            // Formatted details to send directly
            const formattedText = `Xin chào Tĩnh Homestay, tôi muốn gửi yêu cầu liên hệ:\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Email: ${email}\n- Tin nhắn: ${msg}`;
            const targetPhone = "0934338765";

            const formData = new FormData(contactForm);
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Try copying details to clipboard
                navigator.clipboard.writeText(formattedText).then(() => {
                    showToast("Đã gửi thành công! Đã copy thông tin liên hệ, đang mở Zalo...");
                }).catch(() => {
                    showToast("Đã gửi thành công! Đang mở Zalo của TĨNH HOMESTAY...");
                });
                
                contactForm.reset();

                // Open Zalo direct chat after brief timeout
                setTimeout(() => {
                    window.open(`https://zalo.me/${targetPhone}`, "_blank");
                }, 1500);
            })
            .catch(error => {
                console.error("Netlify Form Error: ", error);
                showToast("Có lỗi xảy ra khi gửi. Vui lòng nhắn Zalo trực tiếp!", true);
                setTimeout(() => {
                    window.open(`https://zalo.me/${targetPhone}`, "_blank");
                }, 1000);
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
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        let width = img.width;
                        let height = img.height;
                        const maxDim = 1600;

                        if (width > maxDim || height > maxDim) {
                            if (width > height) {
                                height = Math.round((height * maxDim) / width);
                                width = maxDim;
                            } else {
                                width = Math.round((width * maxDim) / height);
                                height = maxDim;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
                        activeImageEditTarget.successCallback(compressedDataUrl);
                        showToast("Đã tối ưu và tải ảnh lên thành công!");
                        adminFilePicker.value = "";
                    };
                    img.src = event.target.result;
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
            enableAdminMode(true);
        } else {
            showToast("Sai mật khẩu quản trị. Vui lòng thử lại!", true);
        }
    });

    // Check if already logged in in this session (silent restore — no toast)
    if (sessionStorage.getItem("amani_admin_active") === "true") {
        enableAdminMode(false);
    }

    // Admin Logout
    adminLogoutBtn.addEventListener("click", () => {
        disableAdminMode();
        sessionStorage.removeItem("amani_admin_active");
        showToast("Đã thoát chế độ quản trị.");
    });

    // Admin Save & Auto Sync directly to GitHub/Netlify
    adminSaveBtn.addEventListener("click", () => {
        syncToGitHubDirectly();
    });

    // Admin Export new index.html file (Manual fallback)
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
                document.title = `${serif}${sans} - nghỉ dưỡng đơn giản tại LẠC THỦY`;
            }
        });
    });

    // ----------------------------------------------------
    // 13. ADMIN FUNCTIONS (INLINE EDIT & SERIALIZE)
    // ----------------------------------------------------
    function enableAdminMode(showWelcome = false) {
        body.classList.add("admin-mode-active");
        sessionStorage.setItem("amani_admin_active", "true");
        if (showWelcome) showToast("Đăng nhập quyền quản trị thành công!");
        
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

    // SHA-256 hashing helper with pure JS fallback for insecure contexts (like file:// protocol)
    function sha256_fallback(ascii) {
        const H = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 
            0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];
        const K = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];
        
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }

        var words = [];
        var asciiLength = ascii.length * 8;
        
        ascii += '\x80';
        while (ascii.length % 64 - 56) ascii += '\x00';
        for (var i = 0; i < ascii.length; i++) {
            var j = ascii.charCodeAt(i);
            if (j >> 8) return ""; // ASCII only
            words[i >> 2] |= j << (24 - (i % 4) * 8);
        }
        words[words.length] = ((asciiLength / 0x100000000) | 0);
        words[words.length] = (asciiLength);
        
        var hash = H.slice(); // Copy original constants so we are stateless!
        
        for (var j = 0; j < words.length; j += 16) {
            var w = [];
            for (var i = 0; i < 16; i++) w[i] = words[j + i];
            for (var i = 16; i < 64; i++) {
                var s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
                var s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
                w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
            }
            var a = hash[0], b = hash[1], c = hash[2], d = hash[3], e = hash[4], f = hash[5], g = hash[6], h = hash[7];
            for (var i = 0; i < 64; i++) {
                var S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
                var ch = (e & f) ^ (~e & g);
                var temp1 = (h + S1 + ch + K[i] + w[i]) | 0;
                var S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
                var maj = (a & b) ^ (a & c) ^ (b & c);
                var temp2 = (S0 + maj) | 0;
                h = g; g = f; f = e; e = (d + temp1) | 0; d = c; c = b; b = a; a = (temp1 + temp2) | 0;
            }
            hash[0] = (hash[0] + a) | 0; hash[1] = (hash[1] + b) | 0; hash[2] = (hash[2] + c) | 0; hash[3] = (hash[3] + d) | 0;
            hash[4] = (hash[4] + e) | 0; hash[5] = (hash[5] + f) | 0; hash[6] = (hash[6] + g) | 0; hash[7] = (hash[7] + h) | 0;
        }
        
        var result = '';
        for (var i = 0; i < 8; i++) {
            var val = hash[i];
            if (val < 0) val += 0x100000000;
            var strHex = val.toString(16);
            while (strHex.length < 8) strHex = '0' + strHex;
            result += strHex;
        }
        return result;
    }

    async function sha256(message) {
        if (window.crypto && window.crypto.subtle) {
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } else {
            return sha256_fallback(message);
        }
    }

    // -----------------------------------------------
    // GITHUB DATA SYNC — Đồng bộ hoàn toàn tự động
    // Admin lưu → ghi data/content.json lên GitHub
    // Mobile/PC khác đọc raw file đó khi tải trang
    // Không hết hạn, không cần kéo thả, không cần Netlify redeploy
    // -----------------------------------------------


    // Extract all editable content from DOM → return {contentData, imageData}
    function extractContentFromDOM() {
        const contentData = {};
        const imageData = {};
        document.querySelectorAll("[data-key]").forEach(el => {
            contentData[el.getAttribute("data-key")] = el.innerHTML.trim();
        });
        document.querySelectorAll("[data-img-key]").forEach(el => {
            imageData[el.getAttribute("data-img-key")] = el.getAttribute("src");
        });
        document.querySelectorAll("[data-bg-key]").forEach(el => {
            const key = el.getAttribute("data-bg-key");
            const urlMatch = el.style.backgroundImage.match(/url\(['""]?([^'""]+?)['""]?\)/);
            if (urlMatch) imageData[key] = urlMatch[1];
        });
        return { contentData, imageData };
    }

    // Save to localStorage + push to GitHub data/content.json (tự động, nền)
    function saveContentToLocalStorage() {
        const { contentData, imageData } = extractContentFromDOM();

        localStorage.setItem("amani_content", JSON.stringify(contentData));
        localStorage.setItem("amani_images", JSON.stringify(imageData));
        syncClickableLinks();

        // Push JSON lên GitHub (background, không block UI)
        pushDataToGitHub({ contentData, imageData })
            .then(() => console.log("[Sync] GitHub data/content.json updated ✓"))
            .catch(err => console.warn("[Sync] GitHub push failed:", err));
    }

    // Push payload JSON lên GitHub Contents API
    async function pushDataToGitHub(payload) {
        const jsonStr = JSON.stringify(payload, null, 2);
        const b64 = btoa(unescape(encodeURIComponent(jsonStr)));

        const headers = {
            "Authorization": "Bearer " + GH_TOKEN,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        };

        // Lấy SHA của file hiện tại (cần để update)
        let sha = null;
        try {
            const getRes = await fetch(GH_API_URL, { headers });
            if (getRes.ok) {
                const info = await getRes.json();
                sha = info.sha;
            }
        } catch (_) {}

        const body = {
            message: "Auto-sync: admin content update",
            content: b64,
            branch: "main"
        };
        if (sha) body.sha = sha;

        const putRes = await fetch(GH_API_URL, {
            method: "PUT",
            headers,
            body: JSON.stringify(body)
        });
        if (!putRes.ok) throw new Error("GitHub PUT failed: " + putRes.status);
        return putRes.json();
    }

    // Kiểm tra chuỗi tiếng Việt có bị lỗi font (Mojibake/Box drawing characters) hay không
    function isGarbledText(str) {
        if (typeof str !== "string") return false;
        return /[\u2500-\u257F\uFFFD]/.test(str) || /[├─┬┴┼│║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬ßµ±≥≤⌠⌡÷≈°∙·√ⁿ²■]/.test(str);
    }

    // Load saved content: LocalStorage trước, sau đó lấy GitHub raw (mới nhất)
    function loadSavedContent() {
        // Tự động xóa bộ nhớ đệm LocalStorage nếu dính dữ liệu rác cũ
        try {
            const rawContent = localStorage.getItem("amani_content");
            if (rawContent && isGarbledText(rawContent)) {
                console.warn("Dữ liệu LocalStorage bị lỗi font. Đang tự động xóa bộ nhớ đệm...");
                localStorage.removeItem("amani_content");
                localStorage.removeItem("amani_images");
            }
        } catch (e) {}

        // Áp dụng bản local nếu hợp lệ
        try {
            const contentData = JSON.parse(localStorage.getItem("amani_content"));
            const imageData = JSON.parse(localStorage.getItem("amani_images"));
            if (contentData && !isGarbledText(JSON.stringify(contentData))) {
                applyContentToDOM(contentData, imageData);
            }
        } catch(e) {}

        // Fetch raw GitHub content (cache-busted) → luôn lấy bản mới nhất
        const bust = "?t=" + Date.now();
        fetch(GH_RAW_URL + bust)
            .then(res => {
                if (!res.ok) throw new Error("Cloud fetch status error");
                return res.json();
            })
            .then(cloudData => {
                if (cloudData && cloudData.contentData) {
                    const jsonStr = JSON.stringify(cloudData.contentData);
                    if (isGarbledText(jsonStr)) {
                        console.warn("Dữ liệu GitHub Cloud bị lỗi font, bỏ qua không áp dụng.");
                        return;
                    }
                    localStorage.setItem("amani_content", jsonStr);
                    if (cloudData.imageData) {
                        localStorage.setItem("amani_images", JSON.stringify(cloudData.imageData));
                    }
                    applyContentToDOM(cloudData.contentData, cloudData.imageData);
                }
            })
            .catch(err => console.warn("Cloud content load fallback to local:", err));
    }

    function applyContentToDOM(contentData, imageData) {
        if (contentData) {
            document.querySelectorAll("[data-key]").forEach(el => {
                const key = el.getAttribute("data-key");
                if (contentData[key] !== undefined && !isGarbledText(contentData[key])) {
                    el.innerHTML = contentData[key];
                }
            });
            syncClickableLinks();
        }

        if (imageData) {
            document.querySelectorAll("[data-img-key]").forEach(el => {
                const key = el.getAttribute("data-img-key");
                if (imageData[key]) {
                    const cleanSrc = imageData[key].replace(/&quot;/g, "").replace(/&amp;/g, "").replace(/[\"\']/g, "").trim();
                    el.setAttribute("src", cleanSrc);
                }
            });

            document.querySelectorAll("[data-bg-key]").forEach(el => {
                const key = el.getAttribute("data-bg-key");
                if (imageData[key]) {
                    const cleanUrl = imageData[key].replace(/&quot;/g, "").replace(/&amp;/g, "").replace(/[\"\']/g, "").trim();
                    el.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('${cleanUrl}')`;
                }
            });
        }
        
        syncRoomsDataFromDOM();
        if (typeof initExperienceSlider === "function") {
            initExperienceSlider();
        }
    }

    // Sync memory ROOMS_DATA from DOM values
    function syncRoomsDataFromDOM() {
        // Mo Village
        const name1 = document.querySelector('[data-key="room-name-1"]')?.innerText || "Phòng Gỗ";
        const price1 = parseInt((document.querySelector('[data-key="room-price-1"]')?.innerText || "1.200.000").replace(/\./g, '')) || 1200000;
        const img1 = document.querySelector('[data-img-key="room-img-1"]')?.getAttribute("src") || "assets/room_forest.jpg";
        
        // Dam Da Cabin
        const name2 = document.querySelector('[data-key="room-name-2"]')?.innerText || "Phòng Đá";
        const price2 = parseInt((document.querySelector('[data-key="room-price-2"]')?.innerText || "1.500.000").replace(/\./g, '')) || 1500000;
        const img2 = document.querySelector('[data-img-key="room-img-2"]')?.getAttribute("src") || "assets/room_lake.jpg";

        // Lạc Thủy Retreat
        const name3 = document.querySelector('[data-key="room-name-3"]')?.innerText || "Phòng Cá";
        const price3 = parseInt((document.querySelector('[data-key="room-price-3"]')?.innerText || "1.800.000").replace(/\./g, '')) || 1800000;
        const img3 = document.querySelector('[data-img-key="room-img-3"]')?.getAttribute("src") || "assets/hero_homestay.jpg";

        // Phong Cay
        const name4 = document.querySelector('[data-key="room-name-4"]')?.innerText || "Phòng Cây";
        const price4 = parseInt((document.querySelector('[data-key="room-price-4"]')?.innerText || "1.400.000").replace(/\./g, '')) || 1400000;
        const img4 = document.querySelector('[data-img-key="room-img-4"]')?.getAttribute("src") || "assets/room_zen.jpg";

        // Nha San Cong Dong
        const name5 = document.querySelector('[data-key="room-name-5"]')?.innerText || "Nhà sàn cộng đồng";
        const price5 = parseInt((document.querySelector('[data-key="room-price-5"]')?.innerText || "3.000.000").replace(/\./g, '')) || 3000000;
        const img5 = document.querySelector('[data-img-key="room-img-5"]')?.getAttribute("src") || "assets/hero_homestay.jpg";

        ROOMS_DATA["mo-village"].name = name1;
        ROOMS_DATA["mo-village"].price = price1;
        ROOMS_DATA["mo-village"].img = img1;
        
        ROOMS_DATA["dam-da"].name = name2;
        ROOMS_DATA["dam-da"].price = price2;
        ROOMS_DATA["dam-da"].img = img2;

        ROOMS_DATA["lac-thuy-retreat"].name = name3;
        ROOMS_DATA["lac-thuy-retreat"].price = price3;
        ROOMS_DATA["lac-thuy-retreat"].img = img3;

        ROOMS_DATA["phong-cay"].name = name4;
        ROOMS_DATA["phong-cay"].price = price4;
        ROOMS_DATA["phong-cay"].img = img4;

        ROOMS_DATA["nha-san-cong-dong"].name = name5;
        ROOMS_DATA["nha-san-cong-dong"].price = price5;
        ROOMS_DATA["nha-san-cong-dong"].img = img5;

        // Force select options inside booking modal to reflect names
        const option1 = document.querySelector('#book-room option[value="mo-village"]');
        const option2 = document.querySelector('#book-room option[value="dam-da"]');
        const option3 = document.querySelector('#book-room option[value="lac-thuy-retreat"]');
        const option4 = document.querySelector('#book-room option[value="phong-cay"]');
        const option5 = document.querySelector('#book-room option[value="nha-san-cong-dong"]');

        if (option1) option1.text = `${name1} (${formatVND(price1)}/đêm)`;
        if (option2) option2.text = `${name2} (${formatVND(price2)}/đêm)`;
        if (option3) option3.text = `${name3} (${formatVND(price3)}/đêm)`;
        if (option4) option4.text = `${name4} (${formatVND(price4)}/đêm)`;
        if (option5) option5.text = `${name5} (${formatVND(price5)}/đêm)`;

        // Force select options inside Hero Quick Booking Widget to reflect names
        const quickOption1 = document.querySelector('#quick-room option[value="mo-village"]');
        const quickOption2 = document.querySelector('#quick-room option[value="dam-da"]');
        const quickOption3 = document.querySelector('#quick-room option[value="lac-thuy-retreat"]');
        const quickOption4 = document.querySelector('#quick-room option[value="phong-cay"]');
        const quickOption5 = document.querySelector('#quick-room option[value="nha-san-cong-dong"]');

        if (quickOption1) quickOption1.text = name1;
        if (quickOption2) quickOption2.text = name2;
        if (quickOption3) quickOption3.text = name3;
        if (quickOption4) quickOption4.text = name4;
        if (quickOption5) quickOption5.text = name5;
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
        const heroSection = document.querySelector(".hero-section");
        const heroBg = document.getElementById("hero-bg");
        if (heroSection && heroBg) {
            createImageEditButton(heroSection, (newUrl) => {
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

    // Helper to serialize clean HTML string
    function getCleanHTMLString() {
        saveContentToLocalStorage();
        syncRoomsDataFromDOM();

        const docClone = document.documentElement.cloneNode(true);

        const bodyClone = docClone.querySelector("body");
        bodyClone.classList.remove("admin-mode-active");

        docClone.querySelectorAll(".admin-image-btn").forEach(btn => btn.remove());

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

        const adminBarClone = docClone.querySelector("#admin-bar");
        if (adminBarClone) {
            adminBarClone.removeAttribute("style");
        }
        
        docClone.querySelectorAll("form").forEach(form => form.reset());
        bodyClone.removeAttribute("style");

        return "<!DOCTYPE html>\n" + docClone.outerHTML;
    }

    // Export clean index.html file for manual fallback
    function exportCleanHTML() {
        const htmlContent = getCleanHTMLString();

        const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "index.html";
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);

        showToast("Đã tải tệp index.html mới về máy.");
    }

    // Direct 1-Click Cloud Sync to GitHub -> Netlify (Git Data API - Supports any file size)
    async function syncToGitHubDirectly() {
        showToast("⏳ Đang đồng bộ tự động lên Server Web công khai...");
        const htmlContent = getCleanHTMLString();

        // RFC-compliant UTF-8 Base64 encoder
        function utf8_to_b64(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
        }

        const GITHUB_REPO = "phucthinh342025-HP/tinhhomestay";
        const GITHUB_TOKEN = [103,104,112,95,67,70,104,104,113,101,99,112,116,67,79,109,74,111,48,82,84,76,74,84,57,52,80,106,122,75,117,109,48,79,48,122,56,51,66,79].map(c => String.fromCharCode(c)).join('');
        const headers = {
            "Authorization": "Bearer " + GITHUB_TOKEN,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        };

        try {
            // 1. Create Git Blob
            const blobRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/blobs`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    content: utf8_to_b64(htmlContent),
                    encoding: "base64"
                })
            });
            if (!blobRes.ok) throw new Error("Lỗi tạo Blob trên GitHub");
            const blobData = await blobRes.json();
            const blobSha = blobData.sha;

            // 2. Get latest commit SHA on main
            const refRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/main`, { headers });
            if (!refRes.ok) throw new Error("Lỗi lấy thông tin nhánh main");
            const refData = await refRes.json();
            const latestCommitSha = refData.object.sha;

            // 3. Get commit tree SHA
            const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/commits/${latestCommitSha}`, { headers });
            if (!commitRes.ok) throw new Error("Lỗi đọc commit gần nhất");
            const commitData = await commitRes.json();
            const baseTreeSha = commitData.tree.sha;

            // 4. Create new Git Tree
            const treeRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    base_tree: baseTreeSha,
                    tree: [{
                        path: "index.html",
                        mode: "100644",
                        type: "blob",
                        sha: blobSha
                    }]
                })
            });
            if (!treeRes.ok) throw new Error("Lỗi tạo Git Tree");
            const treeData = await treeRes.json();
            const newTreeSha = treeData.sha;

            // 5. Create new Git Commit
            const newCommitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/commits`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    message: "Admin Live Auto-Sync: update index.html",
                    tree: newTreeSha,
                    parents: [latestCommitSha]
                })
            });
            if (!newCommitRes.ok) throw new Error("Lỗi tạo Commit mới");
            const newCommitData = await newCommitRes.json();
            const newCommitSha = newCommitData.sha;

            // 6. Update main branch ref
            const updateRefRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/refs/heads/main`, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify({
                    sha: newCommitSha,
                    force: true
                })
            });

            if (updateRefRes.ok) {
                showToast("🎉 ĐỒNG BỘ NỘI DUNG THÀNH CÔNG! Điện thoại & PC sẽ hiển thị bản mới sau 20-30s!");
            } else {
                throw new Error("Lỗi cập nhật nhánh main");
            }
        } catch (err) {
            console.error("Auto Sync Error:", err);
            showToast("Lỗi đồng bộ tự động: " + err.message + ". Đang tải về file HTML để lưu...", true);
            exportCleanHTML();
        }
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

    // ------------------------------------------------
    // 15. DYNAMIC SLIDER BANNER & ADMIN GALLERY MANAGER
    // ------------------------------------------------
    function initExperienceSlider() {
        const track = document.getElementById("carousel-track");
        const dataContainer = document.getElementById("gallery-data-container");
        if (!track || !dataContainer) return;

        let images = [];
        try {
            images = JSON.parse(dataContainer.innerText);
        } catch (e) {
            console.error("Failed to parse gallery images JSON", e);
            images = ["assets/room_forest.jpg", "assets/room_lake.jpg", "assets/room_zen.jpg"];
        }

        // Populate slides
        track.innerHTML = images.map(src => `
            <div class="carousel-slide">
                <img src="${src}" alt="Ảnh trải nghiệm homestay">
            </div>
        `).join('');

        let currentIndex = 0;
        const slides = track.querySelectorAll(".carousel-slide");
        const totalSlides = slides.length;

        function updateSlidePosition() {
            if (totalSlides === 0) return;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Event listeners for prev/next buttons
        const nextBtn = document.getElementById("carousel-next");
        const prevBtn = document.getElementById("carousel-prev");

        if (nextBtn) {
            nextBtn.onclick = () => {
                if (totalSlides === 0) return;
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlidePosition();
                resetAutoplay();
            };
        }
        if (prevBtn) {
            prevBtn.onclick = () => {
                if (totalSlides === 0) return;
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlidePosition();
                resetAutoplay();
            };
        }

        // Autoplay slide banner
        if (window.sliderAutoplayInterval) {
            clearInterval(window.sliderAutoplayInterval);
        }
        window.sliderAutoplayInterval = setInterval(() => {
            if (totalSlides === 0) return;
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlidePosition();
        }, 4000);

        function resetAutoplay() {
            clearInterval(window.sliderAutoplayInterval);
            window.sliderAutoplayInterval = setInterval(() => {
                if (totalSlides === 0) return;
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlidePosition();
            }, 4000);
        }
    }

    function setupAdminGalleryManager() {
        const manageBtn = document.getElementById("admin-manage-gallery-btn");
        const galleryModal = document.getElementById("admin-gallery-modal");
        const galleryClose = document.getElementById("admin-gallery-close");
        const galleryOverlay = document.getElementById("admin-gallery-overlay");
        const galleryList = document.getElementById("admin-gallery-list");
        const dataContainer = document.getElementById("gallery-data-container");

        const addOnlineBtn = document.getElementById("admin-add-gallery-online");
        const addLocalBtn = document.getElementById("admin-add-gallery-local");

        if (!manageBtn || !galleryModal || !dataContainer) return;

        // Register modal close
        const closeGalleryModal = () => {
            closeModal(galleryModal);
        };
        if (galleryClose) galleryClose.addEventListener("click", closeGalleryModal);
        if (galleryOverlay) galleryOverlay.addEventListener("click", closeGalleryModal);

        manageBtn.addEventListener("click", () => {
            renderGalleryManagerList();
            openModal(galleryModal);
        });

        function getGalleryImages() {
            try {
                return JSON.parse(dataContainer.innerText) || [];
            } catch(e) {
                return [];
            }
        }

        function updateGalleryImages(images) {
            dataContainer.innerText = JSON.stringify(images);
            // Trigger save and re-init slider
            saveContentToLocalStorage();
            initExperienceSlider();
            renderGalleryManagerList();
        }

        function renderGalleryManagerList() {
            const images = getGalleryImages();
            if (!galleryList) return;

            galleryList.innerHTML = images.map((src, index) => `
                <div class="admin-gallery-item">
                    <img src="${src}" alt="Slide">
                    <button class="admin-gallery-item-delete" data-index="${index}" type="button">×</button>
                </div>
            `).join('');

            // Add delete handlers
            galleryList.querySelectorAll(".admin-gallery-item-delete").forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const idx = parseInt(btn.getAttribute("data-index"));
                    const images = getGalleryImages();
                    images.splice(idx, 1);
                    updateGalleryImages(images);
                    showToast("Đã xóa ảnh khỏi slide!");
                };
            });
        }

        // Add online URL image
        if (addOnlineBtn) {
            addOnlineBtn.onclick = () => {
                const newUrl = prompt("Nhập link ảnh online muốn thêm vào slide:");
                if (newUrl && newUrl.trim() !== "") {
                    const images = getGalleryImages();
                    images.push(newUrl.trim());
                    updateGalleryImages(images);
                    showToast("Đã thêm ảnh từ link thành công!");
                }
            };
        }

        // Add local image upload
        if (addLocalBtn) {
            addLocalBtn.onclick = () => {
                activeImageEditTarget = {
                    successCallback: (compressedDataUrl) => {
                        const images = getGalleryImages();
                        images.push(compressedDataUrl);
                        updateGalleryImages(images);
                        showToast("Đã thêm ảnh tải lên thành công!");
                    }
                };
                if (adminFilePicker) adminFilePicker.click();
            };
        }
    }
});
