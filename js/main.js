// 西财流浪动物网站 - 主JS文件

// 导航菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    // 关闭移动端菜单点击链接后
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // 初始化首页统计
    initHomeStats();
});

// 首页统计
function initHomeStats() {
    const data = getData();
    document.getElementById('catCount').textContent = data.locations.filter(l => l.type === 'cat').length;
    document.getElementById('dogCount').textContent = data.locations.filter(l => l.type === 'dog').length;
    document.getElementById('adoptedCount').textContent = data.adoptions.length;

    // 显示最近动态
    const activityList = document.getElementById('activityList');
    if (activityList) {
        const activities = [
            { icon: '📋', title: '新的委托发布', desc: '有人发布了新的喂食委托' },
            { icon: '🏠', title: '领养信息更新', desc: '有新的毛孩子寻找新家' },
            { icon: '💬', title: '论坛新帖子', desc: '同学们分享了新的经验' },
        ];
        
        activityList.innerHTML = activities.map(a => `
            <div class="activity-item">
                <div class="activity-icon">${a.icon}</div>
                <div class="activity-content">
                    <h4>${a.title}</h4>
                    <p>${a.desc}</p>
                </div>
            </div>
        `).join('');
    }
}

// 获取本地存储数据
function getData() {
    const defaultData = {
        locations: [
            { id: 1, name: '图书馆后花园', type: 'cat', area: 'library', description: '橘猫"胖橘"经常在此出没', features: '橘猫，性格温顺' },
            { id: 2, name: '宿舍楼A区门口', type: 'cat', area: 'dorm-a', description: '有三只小猫咪', features: '玳瑁猫，很亲人' },
            { id: 3, name: '食堂后门', type: 'food', area: 'canteen', description: '固定喂食点', features: '' },
            { id: 4, name: '操场看台', type: 'dog', area: 'playground', description: '流浪狗"阿黄"栖息地', features: '黄狗，性格警觉' },
            { id: 5, name: '教学楼大厅', type: 'cat', area: 'teaching', description: '有只黑白猫', features: '奶牛猫，很胖' },
            { id: 6, name: '花园小树林', type: 'shelter', area: 'garden', description: '猫咪过冬安置点', features: '' },
        ],
        posts: [
            { id: 1, title: '分享今天遇到的橘猫', category: 'share', content: '今天在图书馆后花园遇到了一只超级胖的橘猫，太可爱了！', tags: ['橘猫', '可爱'], time: '2小时前', replies: 5 },
            { id: 2, title: '如何正确投喂流浪猫', category: 'experience', content: '投喂流浪猫需要注意以下几点...', tags: ['经验', '喂食'], time: '5小时前', replies: 12 },
            { id: 3, title: '冬天猫咪喂食求助', category: 'question', content: '冬天到了，猫咪们找不到食物怎么办？', tags: ['冬天', '喂食'], time: '1天前', replies: 8 },
        ],
        entrusts: [
            { id: 1, type: 'feed', title: '帮忙喂一下宿舍楼下的猫', description: '寒假期间需要同学帮忙喂一下宿舍楼A区下的猫咪，每天一次即可', location: '宿舍楼A区', contact: '微信: xafe2024', reward: '请喝奶茶', time: '3小时前' },
            { id: 2, type: 'medical', title: '猫咪受伤需要送医', description: '在图书馆附近发现一只后腿受伤的猫，需要帮忙送医院', location: '图书馆', contact: '电话: 138****8888', reward: '感谢帮助', time: '1天前' },
            { id: 3, type: 'neuter', title: '绝育募捐', description: '校园里有几只流浪猫需要绝育，手术费用不足，需要大家支持', location: '校内', contact: '微信: xafe-cats', reward: '感恩所有支持', time: '2天前' },
        ],
        adoptions: [
            { id: 1, type: 'cat', name: '胖橘', age: '1岁', gender: '弟弟', appearance: '橘色长毛，很胖', personality: '温顺、黏人', health: '已绝育、已打疫苗', location: '校内', requirement: '不离不弃，有独立经济能力', contact: '微信: xafe2024' },
            { id: 2, type: 'cat', name: '小花', age: '6个月', gender: '妹妹', appearance: '玳瑁色，短毛', personality: '活泼、好奇', health: '已打疫苗', location: '校内', requirement: '科学喂养，定期疫苗', contact: '微信: catlover' },
            { id: 3, type: 'dog', name: '阿黄', age: '2岁', gender: '弟弟', appearance: '黄色土狗，中型', personality: '忠诚、听话', health: '已绝育', location: '校外', requirement: '有院子或足够活动空间', contact: '微信: doghome' },
        ]
    };

    try {
        const stored = localStorage.getItem('xafeData');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.log('使用默认数据');
    }
    
    // 保存默认数据到localStorage
    try {
        localStorage.setItem('xafeData', JSON.stringify(defaultData));
    } catch (e) {}
    
    return defaultData;
}

// 保存数据到本地存储
function saveData(data) {
    try {
        localStorage.setItem('xafeData', JSON.stringify(data));
    } catch (e) {
        console.log('保存失败');
    }
}

// 地图功能
function initMap() {
    const locationsGrid = document.getElementById('locationsGrid');
    const mapContainer = document.getElementById('map');
    
    // 西安财经大学坐标 (近似中心位置)
    const campusCenter = [34.1138, 108.9337];
    
    // 西安财经大学长安校区各地点的坐标（往东北调整300米）
    const areaCoords = {
        'library': [34.1188, 108.9347],    // 图书馆 - 向北300米
        'dorm-a': [34.1158, 108.9357],      // 宿舍楼A区 - 向北300米
        'dorm-b': [34.1148, 108.9327],      // 宿舍楼B区 - 向北300米
        'canteen': [34.1163, 108.9332],     // 食堂 - 向北300米
        'playground': [34.1153, 108.9349],   // 操场 - 向东北300米 - 往东北500米
        'teaching': [34.1148, 108.9327],    // 教学楼
        'garden': [34.1168, 108.9342]       // 花园 - 向北300米
    };

    const data = getData();
    const areas = {
        'library': '📚 图书馆',
        'dorm-a': '🏢 宿舍楼A区',
        'dorm-b': '🏢 宿舍楼B区',
        'canteen': '🍽️ 食堂',
        'playground': '⚽ 操场',
        'teaching': '🏫 教学楼',
        'garden': '🌸 花园'
    };

    const icons = {
        'cat': '🐱',
        'dog': '🐕',
        'food': '🍚',
        'shelter': '🏠'
    };

    // 自定义标记图标
    const markerIcons = {
        'cat': L.divIcon({ className: 'map-marker cat', html: '🐱', iconSize: [40, 40], iconAnchor: [20, 20] }),
        'dog': L.divIcon({ className: 'map-marker dog', html: '🐕', iconSize: [40, 40], iconAnchor: [20, 20] }),
        'food': L.divIcon({ className: 'map-marker food', html: '🍚', iconSize: [40, 40], iconAnchor: [20, 20] }),
        'shelter': L.divIcon({ className: 'map-marker shelter', html: '🏠', iconSize: [40, 40], iconAnchor: [20, 20] })
    };

    // 初始化 Leaflet 地图
    if (mapContainer) {
        // 清除旧的地图容器内容
        mapContainer.innerHTML = '';
        
        // 创建地图
        const map = L.map('map').setView(campusCenter, 16);
        
        // 使用高德地图 (国内可用)
        L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            subdomains: '1234',
            attribution: '© 高德地图',
            maxZoom: 18
        }).addTo(map);

        // 添加标记点
        const markers = [];
        data.locations.forEach(loc => {
            const coords = areaCoords[loc.area] || campusCenter;
            const marker = L.marker(coords, { icon: markerIcons[loc.type] })
                .addTo(map)
                .bindPopup(`
                    <div style="text-align: center;">
                        <strong>${icons[loc.type]} ${loc.name}</strong><br>
                        <small>${areas[loc.area]}</small><br>
                        <p style="margin: 5px 0;">${loc.description}</p>
                        ${loc.features ? `<small>特征: ${loc.features}</small>` : ''}
                    </div>
                `);
            markers.push({ marker, type: loc.type });
        });

        // 筛选功能
        const filterBtns = document.querySelectorAll('.map-filters .filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                markers.forEach(item => {
                    if (filter === 'all' || item.type === filter) {
                        item.marker.setVisible(true);
                    } else {
                        item.marker.setVisible(false);
                    }
                });
            });
        });
    }

    // 地点列表
    if (locationsGrid) {
        locationsGrid.innerHTML = data.locations.map(loc => `
            <div class="location-card" data-type="${loc.type}">
                <div class="location-header">
                    <span class="location-type">${icons[loc.type]}</span>
                    <div>
                        <div class="location-name">${loc.name}</div>
                        <div class="location-area">${areas[loc.area]}</div>
                    </div>
                </div>
                <p class="location-desc">${loc.description}</p>
                ${loc.features ? `<p class="location-desc">特征：${loc.features}</p>` : ''}
            </div>
        `).join('');

        // 列表筛选功能
        const listFilterBtns = document.querySelectorAll('.locations-section .map-filters .filter-btn');
        listFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                listFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const cards = document.querySelectorAll('.location-card');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.dataset.type === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 添加地点表单
    const addForm = document.getElementById('addLocationForm');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const newLocation = {
                id: Date.now(),
                name: formData.get('name'),
                type: formData.get('type'),
                area: formData.get('area'),
                description: formData.get('description'),
                features: formData.get('features')
            };
            
            const data = getData();
            data.locations.push(newLocation);
            saveData(data);
            
            alert('地点添加成功！');
            this.reset();
            initMap();
        });
    }
}

// 论坛功能
function initForum() {
    const forumPosts = document.getElementById('forumPosts');
    if (!forumPosts) return;

    const data = getData();
    const categories = {
        'share': '📸 晒照分享',
        'experience': '💡 经验交流',
        'question': '❓ 问答求助',
        'notice': '📢 公告通知'
    };

    forumPosts.innerHTML = data.posts.map(post => `
        <div class="forum-post" data-category="${post.category}">
            <div class="post-header">
                <span class="post-category">${categories[post.category]}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <div class="post-footer">
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
                </div>
                <span>${post.time} · ${post.replies}条回复</span>
            </div>
        </div>
    `).join('');

    // 筛选
    const filterBtns = document.querySelectorAll('.forum-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.category;
            const posts = document.querySelectorAll('.forum-post');
            
            posts.forEach(post => {
                if (filter === 'all' || post.dataset.category === filter) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // 发帖弹窗
    const newPostBtn = document.getElementById('newPostBtn');
    const postModal = document.getElementById('postModal');
    const closePostModal = document.getElementById('closePostModal');
    const postForm = document.getElementById('postForm');

    if (newPostBtn && postModal) {
        newPostBtn.addEventListener('click', () => {
            postModal.classList.add('active');
        });
        
        closePostModal?.addEventListener('click', () => {
            postModal.classList.remove('active');
        });
        
        postModal.addEventListener('click', (e) => {
            if (e.target === postModal) {
                postModal.classList.remove('active');
            }
        });
        
        if (postForm) {
            postForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const newPost = {
                    id: Date.now(),
                    title: formData.get('title'),
                    category: formData.get('category'),
                    content: formData.get('content'),
                    tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : [],
                    time: '刚刚',
                    replies: 0
                };
                
                const data = getData();
                data.posts.unshift(newPost);
                saveData(data);
                
                alert('发布成功！');
                postModal.classList.remove('active');
                this.reset();
                initForum();
            });
        }
    }
}

// 委托功能
function initEntrust() {
    const entrustList = document.getElementById('entrustList');
    if (!entrustList) return;

    const data = getData();
    const types = {
        'feed': '🍚 帮忙喂食',
        'medical': '🏥 医疗帮助',
        'capture': '🛏️ 捕捉送医',
        'foster': '🏠 临时安置',
        'neuter': '💉 绝育帮助',
        'other': '📝 其他'
    };

    const icons = {
        'feed': '🍚',
        'medical': '🏥',
        'capture': '🛏️',
        'foster': '🏠',
        'neuter': '💉',
        'other': '📝'
    };

    entrustList.innerHTML = data.entrusts.map(entrust => `
        <div class="entrust-card" data-type="${entrust.type}">
            <div class="entrust-icon">${icons[entrust.type]}</div>
            <div class="entrust-info">
                <span class="entrust-type">${types[entrust.type]}</span>
                <h3 class="entrust-title">${entrust.title}</h3>
                <p class="entrust-desc">${entrust.description}</p>
                <div class="entrust-meta">
                    <span>📍 ${entrust.location}</span>
                    <span>${entrust.time}</span>
                    ${entrust.reward ? `<span>🎁 ${entrust.reward}</span>` : ''}
                </div>
            </div>
            <a href="#" class="entrust-contact" onclick="alert('联系方式: ${entrust.contact}')">联系</a>
        </div>
    `).join('');

    // 筛选
    const filterBtns = document.querySelectorAll('.forum-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.type;
            const cards = document.querySelectorAll('.entrust-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 发布弹窗
    const newBtn = document.getElementById('newEntrustBtn');
    const modal = document.getElementById('entrustModal');
    const closeBtn = document.getElementById('closeEntrustModal');
    const form = document.getElementById('entrustForm');

    if (newBtn && modal) {
        newBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
        
        closeBtn?.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const newEntrust = {
                    id: Date.now(),
                    type: formData.get('type'),
                    title: formData.get('title'),
                    description: formData.get('description'),
                    location: formData.get('location'),
                    contact: formData.get('contact'),
                    reward: formData.get('reward'),
                    time: '刚刚'
                };
                
                const data = getData();
                data.entrusts.unshift(newEntrust);
                saveData(data);
                
                alert('发布成功！');
                modal.classList.remove('active');
                this.reset();
                initEntrust();
            });
        }
    }
}

// 领养功能
function initAdoption() {
    const adoptionList = document.getElementById('adoptionList');
    if (!adoptionList) return;

    const data = getData();
    const icons = { 'cat': '🐱', 'dog': '🐕' };

    adoptionList.innerHTML = data.adoptions.map(adoption => `
        <div class="adoption-card" data-type="${adoption.type}">
            <div class="adoption-image">${icons[adoption.type]}</div>
            <div class="adoption-info">
                <h3 class="adoption-name">${adoption.name || '待取名'}</h3>
                <div class="adoption-meta">
                    <span>${adoption.age}</span>
                    <span>${adoption.gender === 'male' ? '弟弟' : adoption.gender === 'female' ? '妹妹' : '未知'}</span>
                    <span>${adoption.location}</span>
                </div>
                <div class="adoption-tags">
                    ${adoption.appearance ? `<span class="adoption-tag">${adoption.appearance}</span>` : ''}
                    ${adoption.personality ? `<span class="adoption-tag">${adoption.personality}</span>` : ''}
                    ${adoption.health ? `<span class="adoption-tag">${adoption.health}</span>` : ''}
                </div>
                <a href="#" class="adoption-contact" onclick="alert('联系方式: ${adoption.contact}')">联系我领养</a>
            </div>
        </div>
    `).join('');

    // 筛选
    const filterBtns = document.querySelectorAll('.forum-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.type;
            const cards = document.querySelectorAll('.adoption-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 发布弹窗
    const newBtn = document.getElementById('newAdoptionBtn');
    const modal = document.getElementById('adoptionModal');
    const closeBtn = document.getElementById('closeAdoptionModal');
    const form = document.getElementById('adoptionForm');

    if (newBtn && modal) {
        newBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
        
        closeBtn?.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const newAdoption = {
                    id: Date.now(),
                    type: formData.get('type'),
                    name: formData.get('name'),
                    age: formData.get('age'),
                    gender: formData.get('gender'),
                    appearance: formData.get('appearance'),
                    personality: formData.get('personality'),
                    health: formData.get('health'),
                    location: formData.get('location'),
                    requirement: formData.get('requirement'),
                    contact: formData.get('contact')
                };
                
                const data = getData();
                data.adoptions.unshift(newAdoption);
                saveData(data);
                
                alert('发布成功！');
                modal.classList.remove('active');
                this.reset();
                initAdoption();
            });
        }
    }
}

// ==================== 猫狗图鉴功能 ====================
let cachedAnimals = [];

function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    const icons = { 'cat': '🐱', 'dog': '🐕' };
    
    // 渲染图鉴卡片
    function renderGallery(filter = 'all', search = '') {
        // 从服务器获取数据
        fetch('/api/animals').then(r=>r.json()).then(data=>{
            cachedAnimals = data;
            renderCards(filter, search);
        }).catch(()=>{
            cachedAnimals = GALLERY_DATA;
            renderCards(filter, search);
        });
    }
    
    function renderCards(filter, search) {
        let animals = cachedAnimals || GALLERY_DATA;
        
        // 筛选
        if (filter === 'cat') {
            animals = animals.filter(a => a.type === 'cat');
        } else if (filter === 'dog') {
            animals = animals.filter(a => a.type === 'dog');
        } else if (filter === 'adopted') {
            animals = animals.filter(a => a.statusCode === 'adopted');
        } else if (filter === 'star') {
            animals = animals.filter(a => a.personality.includes('亲人'));
        }
        
        // 搜索
        if (search) {
            const s = search.toLowerCase();
            animals = animals.filter(a => 
                a.name.toLowerCase().includes(s) ||
                a.alias.toLowerCase().includes(s) ||
                a.location.toLowerCase().includes(s)
            );
        }
        
        galleryGrid.innerHTML = animals.map(animal => {
            const statusInfo = STATUS_MAP[animal.statusCode] || STATUS_MAP.active;
            
            return `
                <div class="gallery-card" data-id="${animal.id}" data-type="${animal.type}">
                    <div class="gallery-card-image">
                        <span class="gallery-card-emoji">${icons[animal.type]}</span>
                        <span class="gallery-card-status ${statusInfo.class}">${statusInfo.emoji} ${statusInfo.text}</span>
                    </div>
                    <div class="gallery-card-content">
                        <h3 class="gallery-card-name">${animal.name}</h3>
                        <p class="gallery-card-alias">${animal.alias || '暂无别名'}</p>
                        <div class="gallery-card-tags">
                            ${animal.neuter ? 
                                `<span class="gallery-card-tag neutered">💉 已绝育</span>` : 
                                `<span class="gallery-card-tag unneutered">⚠️ 未绝育</span>`
                            }
                            ${animal.personality.slice(0, 2).map(p => 
                                `<span class="gallery-card-tag">#${p}</span>`
                            ).join('')}
                        </div>
                        <div class="gallery-card-location">
                            📍 ${animal.location}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // 添加点击事件
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                showGalleryDetail(id);
            });
        });
    }
    
    // 初始化渲染
    renderGallery();
    
    // 从服务器加载数据
    fetch('/api/animals').then(r=>r.json()).then(d=>cachedAnimals=d).catch(()=>{});

    
    // 初始化添加弹窗
    initAddAnimalModal();
    
    // 初始化编辑弹窗  
    initEditAnimalModal();

    
    // 筛选按钮
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const search = document.getElementById('gallerySearch')?.value || '';
            renderGallery(this.dataset.filter, search);
        });
    });
    
    // 搜索功能
    const searchInput = document.getElementById('gallerySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.gallery-filters .filter-btn.active')?.dataset.filter || 'all';
            renderGallery(activeFilter, this.value);
        });
    }
    
    // 弹窗关闭
    const modal = document.getElementById('galleryModal');
    const modalClose = document.getElementById('galleryModalClose');
    
    modalClose?.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// 显示详情
function showGalleryDetail(id) {
    const animal = cachedAnimals.find(a => a.id === id);
    if (!animal) return;
    
    const icons = { 'cat': '🐱', 'dog': '🐕' };
    const modal = document.getElementById('galleryModal');
    
    // 填充基本信息
    document.getElementById('detailImage').textContent = icons[animal.type];
    document.getElementById('detailName').textContent = animal.name;
    document.getElementById('detailAlias').textContent = `别名：${animal.alias || '-'}`;
    
    // 标签
    const tagsContainer = document.getElementById('detailTags');
    tagsContainer.innerHTML = `
        ${animal.neuter ? 
            `<span class="detail-tag neutered">💉 ${animal.neuterNote}</span>` : 
            `<span class="detail-tag unneutered">⚠️ ${animal.neuterNote}</span>`
        }
        <span class="detail-tag status-tag ${STATUS_MAP[animal.statusCode]?.class || ''}">
            ${STATUS_MAP[animal.statusCode]?.emoji || ''} ${STATUS_MAP[animal.statusCode]?.text || ''}
        </span>
    `;
    
    // 信息卡
    document.getElementById('detailType').textContent = animal.type === 'cat' ? '🐱 猫咪' : '🐕 狗狗';
    document.getElementById('detailColor').textContent = animal.color;
    document.getElementById('detailGender').textContent = animal.gender;
    document.getElementById('detailAge').textContent = animal.age;
    document.getElementById('detailNeuter').textContent = animal.neuterNote;
    document.getElementById('detailLocation').textContent = animal.location;
    document.getElementById('detailActiveTime').textContent = animal.activeTime;
    document.getElementById('detailStatus').textContent = STATUS_MAP[animal.statusCode]?.text || '';
    
    // 性格标签
    const personalityContainer = document.getElementById('detailPersonality');
    personalityContainer.innerHTML = animal.personality.map(p => 
        `<span class="personality-tag good">#${p}</span>`
    ).join('') + 
    (animal.personalityBad || []).map(p => 
        `<span class="personality-tag bad">#${p}</span>`
    ).join('');
    
    // 投喂指南
    document.getElementById('detailFeedGuide').textContent = animal.feedGuide || '暂无';
    
    // 介绍
    document.getElementById('detailIntro').textContent = animal.intro || '暂无介绍';
    
    // 趣闻轶事
    const storiesSection = document.getElementById('detailStoriesSection');
    const storiesEl = document.getElementById('detailStories');
    if (animal.stories) {
        storiesEl.textContent = animal.stories;
        storiesSection.style.display = 'block';
    } else {
        storiesSection.style.display = 'none';
    }
    
    // 人际关系
    const relationsSection = document.getElementById('detailRelationsSection');
    const relationsEl = document.getElementById('detailRelations');
    if (animal.relations) {
        relationsEl.textContent = animal.relations;
        relationsSection.style.display = 'block';
    } else {
        relationsSection.style.display = 'none';
    }
    
    // 显示弹窗
    modal.classList.add('active');
}

// ==================== 添加/编辑/删除功能 ====================

function initAddAnimalModal() {
    const addBtn = document.getElementById('addAnimalBtn');
    const addModal = document.getElementById('addAnimalModal');
    const closeBtn = document.getElementById('closeAddModal');
    const form = document.getElementById('addAnimalForm');
    
    if (!addBtn || !addModal) return;
    
    addBtn.addEventListener('click', () => addModal.classList.add('active'));
    closeBtn?.addEventListener('click', () => addModal.classList.remove('active'));
    addModal.addEventListener('click', (e) => { if (e.target === addModal) addModal.classList.remove('active'); });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 收集性格
            const personality = [];
            document.querySelectorAll('#addAnimalForm .personality-checkbox:checked').forEach(cb => personality.push(cb.value));
            const personalityBad = [];
            document.querySelectorAll('#addAnimalForm .personality-bad-checkbox:checked').forEach(cb => personalityBad.push(cb.value));
            
            const animalData = {
                name: form.name.value,
                alias: form.alias.value,
                type: form.type.value,
                color: form.color.value,
                gender: form.gender.value,
                age: form.age.value,
                birthYear: form.birthYear.value,
                neuter: form.neuter.checked,
                neuterNote: form.neuterNote.value,
                location: form.location.value,
                locationArea: form.locationArea.value,
                coordinates: [34.1138, 108.9337],
                activeTime: form.activeTime.value,
                status: document.querySelector('#addAnimalForm input[name="status"]:checked')?.value || '在校活跃',
                statusCode: document.querySelector('#addAnimalForm input[name="status"]:checked')?.value || 'active',
                personality: personality,
                feedGuide: form.feedGuide.value,
                intro: form.intro.value,
                stories: form.stories.value,
                relations: form.relations.value,
                images: [form.type.value === 'cat' ? '🐱' : '🐕'],
                personalityBad: personalityBad
            };
            
            addAnimal(animalData);
            alert('添加成功！');
            addModal.classList.remove('active');
            form.reset();
            location.reload();
        });
    }
}

function initEditAnimalModal() {
    const editModal = document.getElementById('editAnimalModal');
    const closeBtn = document.getElementById('closeEditModal');
    const form = document.getElementById('editAnimalForm');
    
    if (!editModal) return;
    
    closeBtn?.addEventListener('click', () => editModal.classList.remove('active'));
    editModal.addEventListener('click', (e) => { if (e.target === editModal) editModal.classList.remove('active'); });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = parseInt(form.dataset.id);
            
            const personality = [];
            document.querySelectorAll('#editAnimalForm .personality-checkbox:checked').forEach(cb => personality.push(cb.value));
            const personalityBad = [];
            document.querySelectorAll('#editAnimalForm .personality-bad-checkbox:checked').forEach(cb => personalityBad.push(cb.value));
            
            const animalData = {
                name: form.name.value,
                alias: form.alias.value,
                type: form.type.value,
                color: form.color.value,
                gender: form.gender.value,
                age: form.age.value,
                birthYear: form.birthYear.value,
                neuter: form.neuter.checked,
                neuterNote: form.neuterNote.value,
                location: form.location.value,
                locationArea: form.locationArea.value,
                activeTime: form.activeTime.value,
                status: document.querySelector('#editAnimalForm input[name="status"]:checked')?.value || '在校活跃',
                statusCode: document.querySelector('#editAnimalForm input[name="status"]:checked')?.value || 'active',
                personality: personality,
                feedGuide: form.feedGuide.value,
                intro: form.intro.value,
                stories: form.stories.value,
                relations: form.relations.value,
                images: form.dataset.images ? JSON.parse(form.dataset.images) : [form.type.value === 'cat' ? '🐱' : '🐕'],
                personalityBad: personalityBad
            };
            
            updateAnimal(id, animalData);
            alert('更新成功！');
            editModal.classList.remove('active');
            location.reload();
        });
    }
}

// 修改 showGalleryDetail 显示编辑删除按钮
const oldShowDetail = showGalleryDetail;
showGalleryDetail = function(id) {
    oldShowDetail(id);
    
    const actionsContainer = document.getElementById('detailActions');
    if (actionsContainer) {
        actionsContainer.innerHTML = '<button class="btn-edit" onclick="openEditModal(' + id + ')">✏️ 编辑</button><button class="btn-delete" onclick="deleteAnimalConfirm(' + id + ')">🗑️ 删除</button>';
    }
};

function openEditModal(id) {
    const animal = cachedAnimals.find(a => a.id === id);
    if (!animal) return;
    
    const form = document.getElementById('editAnimalForm');
    if (!form) return;
    
    form.dataset.id = id;
    form.dataset.images = JSON.stringify(animal.images || []); // 保存原来的头像
    form.name.value = animal.name || '';
    form.alias.value = animal.alias || '';
    form.type.value = animal.type || 'cat';
    form.color.value = animal.color || '';
    form.gender.value = animal.gender || '弟弟';
    form.age.value = animal.age || '';
    form.birthYear.value = animal.birthYear || '';
    form.neuter.checked = animal.neuter || false;
    form.neuterNote.value = animal.neuterNote || '';
    form.location.value = animal.location || '';
    form.locationArea.value = animal.locationArea || 'library';
    form.activeTime.value = animal.activeTime || '';
    form.feedGuide.value = animal.feedGuide || '';
    form.intro.value = animal.intro || '';
    form.stories.value = animal.stories || '';
    form.relations.value = animal.relations || '';
    
    // 状态
    document.querySelectorAll('#editAnimalForm input[name="status"]').forEach(rb => {
        rb.checked = rb.value === (animal.statusCode || 'active');
    });
    
    // 性格
    document.querySelectorAll('#editAnimalForm .personality-checkbox').forEach(cb => {
        cb.checked = (animal.personality || []).includes(cb.value);
    });
    document.querySelectorAll('#editAnimalForm .personality-bad-checkbox').forEach(cb => {
        cb.checked = (animal.personalityBad || []).includes(cb.value);
    });
    
    document.getElementById('galleryModal').classList.remove('active');
    document.getElementById('editAnimalModal').classList.add('active');
}

function deleteAnimalConfirm(id) {
    const animal = cachedAnimals.find(a => a.id === id);
    if (!animal) return;
    
    if (confirm('确定要删除「' + animal.name + '」吗？此操作不可恢复！')) {
        deleteAnimal(id);
        document.getElementById('galleryModal').classList.remove('active');
        alert('删除成功');
        location.reload();
    }
}
