// ==================== 猫狗图鉴功能 ====================
let cachedAnimals = [];

function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    const icons = { 'cat': '🐱', 'dog': '🐕' };
    
    // 渲染图鉴卡片
    async function renderGallery(filter = 'all', search = '') {
        // 获取服务器数据
        try {
            const response = await fetch('http://localhost:3000/api/animals');
            cachedAnimals = await response.json();
        } catch (e) {
            cachedAnimals = GALLERY_DATA;
        }
        
        let animals = cachedAnimals;
        
        // 筛选
        if (filter === 'cat') {
            animals = animals.filter(a => a.type === 'cat');
        } else if (filter === 'dog') {
            animals = animals.filter(a => a.type === 'dog');
        } else if (filter === 'adopted') {
            animals = animals.filter(a => a.statusCode === 'adopted');
        } else if (filter === 'star') {
            animals = animals.filter(a => a.personality && a.personality.includes('亲人'));
        }
        
        // 搜索
        if (search) {
            const s = search.toLowerCase();
            animals = animals.filter(a => 
                a.name.toLowerCase().includes(s) ||
                (a.alias && a.alias.toLowerCase().includes(s)) ||
                a.location.toLowerCase().includes(s)
            );
        }
        
        // 空状态
        if (animals.length === 0) {
            galleryGrid.innerHTML = '<div class="empty-state">暂无动物记录，快来添加吧！</div>';
            return;
        }
        
        galleryGrid.innerHTML = animals.map(animal => {
            const statusInfo = STATUS_MAP[animal.statusCode] || STATUS_MAP.active;
            
            return \`
                <div class="gallery-card" data-id="\${animal.id}" data-type="\${animal.type}">
                    <div class="gallery-card-image">
                        <span class="gallery-card-emoji">\${icons[animal.type]}</span>
                        <span class="gallery-card-status \${statusInfo.class}">\${statusInfo.emoji} \${statusInfo.text}</span>
                    </div>
                    <div class="gallery-card-content">
                        <h3 class="gallery-card-name">\${animal.name}</h3>
                        <p class="gallery-card-alias">\${animal.alias || '暂无别名'}</p>
                        <div class="gallery-card-tags">
                            \${animal.neuter ? 
                                \`<span class="gallery-card-tag neutered">💉 已绝育</span>\` : 
                                \`<span class="gallery-card-tag unneutered">⚠️ 未绝育</span>\`
                            }
                            \${(animal.personality || []).slice(0, 2).map(p => 
                                \`<span class="gallery-card-tag">#\${p}</span>\`
                            ).join('')}
                        </div>
                        <div class="gallery-card-location">
                            📍 \${animal.location}
                        </div>
                    </div>
                </div>
            \`;
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
    
    // 初始化添加弹窗
    initAddAnimalModal();
    
    // 初始化编辑弹窗
    initEditAnimalModal();
}

// 添加动物弹窗
function initAddAnimalModal() {
    const addBtn = document.getElementById('addAnimalBtn');
    const addModal = document.getElementById('addAnimalModal');
    const closeBtn = document.getElementById('closeAddModal');
    const form = document.getElementById('addAnimalForm');
    
    if (!addBtn || !addModal) return;
    
    addBtn.addEventListener('click', () => {
        addModal.classList.add('active');
    });
    
    closeBtn?.addEventListener('click', () => {
        addModal.classList.remove('active');
    });
    
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) {
            addModal.classList.remove('active');
        }
    });
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // 收集性格标签
            const personality = [];
            document.querySelectorAll('#addAnimalForm .personality-checkbox:checked').forEach(cb => {
                personality.push(cb.value);
            });
            
            const personalityBad = [];
            document.querySelectorAll('#addAnimalForm .personality-bad-checkbox:checked').forEach(cb => {
                personalityBad.push(cb.value);
            });
            
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
            
            await fetch('http://localhost:3000/api/animals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(animalData)
            });
            
            alert('添加成功！');
            addModal.classList.remove('active');
            form.reset();
            initGallery(); // 刷新列表
        });
    }
}

// 编辑动物弹窗
function initEditAnimalModal() {
    const editModal = document.getElementById('editAnimalModal');
    const closeBtn = document.getElementById('closeEditModal');
    const form = document.getElementById('editAnimalForm');
    
    if (!editModal) return;
    
    closeBtn?.addEventListener('click', () => {
        editModal.classList.remove('active');
    });
    
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.remove('active');
        }
    });
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const id = parseInt(form.dataset.id);
            
            // 收集性格标签
            const personality = [];
            document.querySelectorAll('#editAnimalForm .personality-checkbox:checked').forEach(cb => {
                personality.push(cb.value);
            });
            
            const personalityBad = [];
            document.querySelectorAll('#editAnimalForm .personality-bad-checkbox:checked').forEach(cb => {
                personalityBad.push(cb.value);
            });
            
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
                images: [form.type.value === 'cat' ? '🐱' : '🐕'],
                personalityBad: personalityBad
            };
            
            await fetch('http://localhost:3000/api/animals/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(animalData)
            });
            
            alert('更新成功！');
            editModal.classList.remove('active');
            initGallery(); // 刷新列表
            showGalleryDetail(id); // 刷新详情
        });
    }
}

// 显示详情
function showGalleryDetail(id) {
    const animal = cachedAnimals.find(a => a.id === id);
    if (!animal) return;
    
    const icons = { 'cat': '🐱', 'dog': '🐕' };
    const modal = document.getElementById('galleryModal');
    
    // 填充基本信息
    const detailImage = document.getElementById('detailImage');
    const detailName = document.getElementById('detailName');
    const detailAlias = document.getElementById('detailAlias');
    
    if (detailImage) detailImage.textContent = icons[animal.type];
    if (detailName) detailName.textContent = animal.name;
    if (detailAlias) detailAlias.textContent = '别名：' + (animal.alias || '-');
    
    // 标签
    const tagsContainer = document.getElementById('detailTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = (animal.neuter ? 
            '<span class="detail-tag neutered">💉 ' + animal.neuterNote + '</span>' : 
            '<span class="detail-tag unneutered">⚠️ ' + (animal.neuterNote || '')) +
            '<span class="detail-tag status-tag ' + (STATUS_MAP[animal.statusCode]?.class || '') + '">' +
            (STATUS_MAP[animal.statusCode]?.emoji || '') + ' ' + (STATUS_MAP[animal.statusCode]?.text || '') + '</span>';
    }
    
    // 信息卡
    const detailType = document.getElementById('detailType');
    const detailColor = document.getElementById('detailColor');
    const detailGender = document.getElementById('detailGender');
    const detailAge = document.getElementById('detailAge');
    const detailNeuter = document.getElementById('detailNeuter');
    const detailLocation = document.getElementById('detailLocation');
    const detailActiveTime = document.getElementById('detailActiveTime');
    const detailStatus = document.getElementById('detailStatus');
    
    if (detailType) detailType.textContent = animal.type === 'cat' ? '🐱 猫咪' : '🐕 狗狗';
    if (detailColor) detailColor.textContent = animal.color || '';
    if (detailGender) detailGender.textContent = animal.gender || '';
    if (detailAge) detailAge.textContent = animal.age || '';
    if (detailNeuter) detailNeuter.textContent = animal.neuterNote || '';
    if (detailLocation) detailLocation.textContent = animal.location || '';
    if (detailActiveTime) detailActiveTime.textContent = animal.activeTime || '';
    if (detailStatus) detailStatus.textContent = STATUS_MAP[animal.statusCode]?.text || '';
    
    // 性格标签
    const personalityContainer = document.getElementById('detailPersonality');
    if (personalityContainer) {
        personalityContainer.innerHTML = (animal.personality || []).map(p => 
            '<span class="personality-tag good">#' + p + '</span>'
        ).join('') + 
        (animal.personalityBad || []).map(p => 
            '<span class="personality-tag bad">#' + p + '</span>'
        ).join('');
    }
    
    // 投喂指南
    const detailFeedGuide = document.getElementById('detailFeedGuide');
    if (detailFeedGuide) detailFeedGuide.textContent = animal.feedGuide || '暂无';
    
    // 介绍
    const detailIntro = document.getElementById('detailIntro');
    if (detailIntro) detailIntro.textContent = animal.intro || '暂无介绍';
    
    // 趣闻轶事
    const storiesSection = document.getElementById('detailStoriesSection');
    const storiesEl = document.getElementById('detailStories');
    if (animal.stories && storiesEl) {
        if (storiesEl) storiesEl.textContent = animal.stories;
        if (storiesSection) storiesSection.style.display = 'block';
    } else {
        if (storiesSection) storiesSection.style.display = 'none';
    }
    
    // 人际关系
    const relationsSection = document.getElementById('detailRelationsSection');
    const relationsEl = document.getElementById('detailRelations');
    if (animal.relations && relationsEl) {
        if (relationsEl) relationsEl.textContent = animal.relations;
        if (relationsSection) relationsSection.style.display = 'block';
    } else {
        if (relationsSection) relationsSection.style.display = 'none';
    }
    
    // 添加编辑和删除按钮
    const actionsContainer = document.getElementById('detailActions');
    if (actionsContainer) {
        actionsContainer.innerHTML = '<button class="btn-edit" onclick="openEditModal(' + id + ')">✏️ 编辑</button><button class="btn-delete" onclick="deleteAnimalConfirm(' + id + ')">🗑️ 删除</button>';
    }
    
    // 显示弹窗
    if (modal) modal.classList.add('active');
}

// 打开编辑弹窗
function openEditModal(id) {
    const animal = cachedAnimals.find(a => a.id === id);
    if (!animal) return;
    
    const form = document.getElementById('editAnimalForm');
    if (!form) return;
    
    // 填充表单数据
    form.dataset.id = id;
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
    
    // 填充状态单选按钮
    document.querySelectorAll('#editAnimalForm input[name="status"]').forEach(rb => {
        rb.checked = rb.value === (animal.statusCode || 'active');
    });
    
    // 填充性格复选框
    document.querySelectorAll('#editAnimalForm .personality-checkbox').forEach(cb => {
        cb.checked = (animal.personality || []).includes(cb.value);
    });
    
    document.querySelectorAll('#editAnimalForm .personality-bad-checkbox').forEach(cb => {
        cb.checked = (animal.personalityBad || []).includes(cb.value);
    });
    
    // 关闭详情弹窗，打开编辑弹窗
    document.getElementById('galleryModal').classList.remove('active');
    document.getElementById('editAnimalModal').classList.add('active');
}

// 删除动物确认
async function deleteAnimalConfirm(id) {
    const animal = cachedAnimals.find(a => a.id === id);
    if (!animal) return;
    
    if (confirm('确定要删除「' + animal.name + '」吗？此操作不可恢复！')) {
        await fetch('http://localhost:3000/api/animals/' + id, {
            method: 'DELETE'
        });
        document.getElementById('galleryModal').classList.remove('active');
        initGallery();
        alert('删除成功');
    }
}
