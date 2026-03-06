// 数据文件 - 存储网站数据
// 注意：这是一个演示数据文件，实际项目可能需要后端支持

// 图鉴数据 - 完整的动物档案
const GALLERY_DATA = [
    {
        id: 1,
        name: '胖橘',
        alias: '大橘、橘总、食堂馆长',
        type: 'cat',
        color: '橘猫',
        gender: '弟弟',
        age: '3岁',
        birthYear: '2023年',
        neuter: true,
        neuterNote: '已绝育（剪耳）',
        location: '食堂后门',
        locationArea: 'canteen',
        coordinates: [34.1163, 108.9332],
        activeTime: '全天活跃，饭点最积极',
        status: '在校活跃',
        statusCode: 'active',
        personality: ['亲人', '贪吃', '可抱'],
        feedGuide: '可以喂猫粮和猫罐头，不能吃火腿肠（含盐量高）',
        intro: '胖橘是校园里最出名的猫咪之一，因为体型圆润得名。原先是流浪猫，后来被同学投喂喂成了校猫。',
        stories: '曾在高数课上呼呼大睡，被老师称为"旁听生"；抢过校长的鸡腿，从此一战成名。',
        relations: '好基友是图书馆的小白，经常一起晒太阳',
        images: ['🐱'],
        personalityBad: []
    },
    {
        id: 2,
        name: '小花',
        alias: '玳瑁、幼儿园园长',
        type: 'cat',
        color: '玳瑁',
        gender: '妹妹',
        age: '2岁',
        birthYear: '2024年',
        neuter: true,
        neuterNote: '已绝育',
        location: '宿舍楼A区',
        locationArea: 'dorm-a',
        coordinates: [34.1158, 108.9357],
        activeTime: '上午和傍晚',
        status: '在校活跃',
        statusCode: 'active',
        personality: ['活泼', '好奇', '亲人'],
        feedGuide: '什么都吃，特别喜欢猫条',
        intro: '玳瑁花纹的小花是宿舍区的常驻民，喜欢跟着人走。',
        stories: '幼儿园园长称号来源：经常在宿舍楼下的儿童区陪小朋友玩。',
        relations: '孩子是咪咪',
        images: ['🐱'],
        personalityBad: []
    },
    {
        id: 3,
        name: '阿黄',
        alias: '大黄、操场守护者',
        type: 'dog',
        color: '黄色土狗',
        gender: '弟弟',
        age: '4岁',
        birthYear: '2022年',
        neuter: true,
        neuterNote: '已绝育',
        location: '操场看台',
        locationArea: 'playground',
        coordinates: [34.1153, 108.9349],
        activeTime: '早晨和傍晚',
        status: '在校活跃',
        statusCode: 'active',
        personality: ['忠诚', '警觉', '听话'],
        feedGuide: '可以喂狗粮和剩饭剩菜，不喜欢太咸的食物',
        intro: '阿黄是校园里的老住户了，一直负责守护操场。因为性格忠诚，深受学生喜爱。',
        stories: '曾在晚上吓跑过小偷，保护了操场的公共财产。',
        relations: '好基友是小白（猫）',
        images: ['🐕'],
        personalityBad: ['护食']
    },
    {
        id: 4,
        name: '小白',
        alias: '雪球、图书馆馆长',
        type: 'cat',
        color: '奶牛猫',
        gender: '弟弟',
        age: '2岁',
        birthYear: '2024年',
        neuter: true,
        neuterNote: '已绝育',
        location: '图书馆门口',
        locationArea: 'library',
        coordinates: [34.1188, 108.9347],
        activeTime: '白天较多',
        status: '在校活跃',
        statusCode: 'active',
        personality: ['高冷', '亲人'],
        feedGuide: '只吃猫粮，肠胃不太好',
        intro: '因为全身大部分白色，只有尾巴和头部有黑色花纹，所以叫小白。实际上是奶牛猫。',
        stories: '图书馆馆长的由来：经常在图书馆门口迎接来学习的学生。',
        relations: '好基友是胖橘',
        images: ['🐱'],
        personalityBad: []
    },
    {
        id: 5,
        name: '咪咪',
        alias: '小橘、萌新',
        type: 'cat',
        color: '橘猫',
        gender: '妹妹',
        age: '6个月',
        birthYear: '2025年',
        neuter: false,
        neuterNote: '未绝育',
        location: '宿舍楼A区',
        locationArea: 'dorm-a',
        coordinates: [34.1158, 108.9357],
        activeTime: '活泼好动，随时可见',
        status: '在校活跃',
        statusCode: 'active',
        personality: ['活泼', '贪吃', '怕生'],
        feedGuide: '还是小朋友，吃幼猫粮',
        intro: '小花的孩子，目前最年轻的成员。因为性格活泼，很受同学们喜爱。',
        stories: '最近刚学会爬树，还不太熟练。',
        relations: '妈妈是小花',
        images: ['🐱'],
        personalityBad: []
    },
    {
        id: 6,
        name: '小黑',
        alias: '黑煤球、夜巡使',
        type: 'cat',
        color: '纯黑',
        gender: '弟弟',
        age: '3岁',
        birthYear: '2023年',
        neuter: true,
        neuterNote: '已绝育',
        location: '花园小树林',
        locationArea: 'garden',
        coordinates: [34.1168, 108.9342],
        activeTime: '夜晚',
        status: '在校活跃',
        statusCode: 'active',
        personality: ['怕生', '警觉'],
        feedGuide: '比较害羞，会等人走了再吃',
        intro: '全身乌黑的猫咪，因为夜色中不太明显得名。晚上经常在小树林里"巡逻"。',
        stories: '有传说它是"校园守护神"，晚上会赶走老鼠。',
        relations: '',
        images: ['🐱'],
        personalityBad: ['凶', '会哈气']
    },
    {
        id: 7,
        name: '团子',
        alias: '糯米、团子酱',
        type: 'cat',
        color: '三花',
        gender: '妹妹',
        age: '1岁',
        birthYear: '2025年',
        neuter: false,
        neuterNote: '未绝育',
        location: '教学楼大厅',
        locationArea: 'teaching',
        coordinates: [34.1148, 108.9327],
        activeTime: '上课时间',
        status: '寻找领养',
        statusCode: 'adopted',
        personality: ['黏人', '可抱', '亲人'],
        feedGuide: '不挑食，什么都吃',
        intro: '三花妹妹，性格超级好，特别喜欢让人抱。因为太亲人，不太适合流浪生活，正在寻找领养。',
        stories: '曾在教室暖气片上睡觉，被同学拍照发到论坛上。',
        relations: '',
        images: ['🐱'],
        personalityBad: []
    },
    {
        id: 8,
        name: '旺财',
        alias: '拆家旺、 二哈属性',
        type: 'dog',
        color: '哈士奇串串',
        gender: '弟弟',
        age: '2岁',
        birthYear: '2024年',
        neuter: true,
        neuterNote: '已绝育',
        location: '宿舍楼B区',
        locationArea: 'dorm-b',
        coordinates: [34.1148, 108.9327],
        activeTime: '精力旺盛，随时活跃',
        status: '在校活跃',
        statusCode: 'active',
        personality: ['活泼', '贪玩', '亲人'],
        feedGuide: '狗粮即可，饭量较大',
        intro: '虽然是只串串，但颜值很高。因为精力过于旺盛，经常"拆家"，但性格非常友好。',
        stories: '喜欢和同学们玩飞盘游戏，是操场上的运动健将。',
        relations: '',
        images: ['🐕'],
        personalityBad: []
    },
    {
        id: 9,
        name: '汤姆',
        alias: 'Tom、学术猫',
        type: 'cat',
        color: '英短蓝猫串串',
        gender: '弟弟',
        age: '5岁',
        birthYear: '2021年',
        neuter: true,
        neuterNote: '已绝育',
        location: '教学楼',
        locationArea: 'teaching',
        coordinates: [34.1148, 108.9327],
        activeTime: '白天',
        status: '喵星',
        statusCode: 'passed',
        personality: ['高冷', '温顺'],
        feedGuide: '已去喵星',
        intro: '曾经是教室里的"学术猫"，经常在讲台上听老师讲课。是校园里的老前辈了。',
        stories: 'RIP汤姆，2025年冬天因为肾衰竭离开了我们。会永远留在同学们的记忆中。',
        relations: '',
        images: ['🐱'],
        personalityBad: []
    }
];

// ==================== 猫狗图鉴数据管理 ====================

// 从 localStorage 获取图鉴数据
function getGalleryData() {
    try {
        const stored = localStorage.getItem('xafeGalleryData');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {}
    
    // 保存默认数据到 localStorage
    try {
        localStorage.setItem('xafeGalleryData', JSON.stringify(GALLERY_DATA));
    } catch (e) {}
    
    return GALLERY_DATA;
}

// 保存图鉴数据
function saveGalleryData(data) {
    try {
        localStorage.setItem('xafeGalleryData', JSON.stringify(data));
    } catch (e) {}
}

// 添加动物
function addAnimal(animalData) {
    fetch('/api/animals', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(animalData)
    }).then(() => { location.reload(); });
}

// 更新动物
function updateAnimal(id, animalData) {
    fetch('/api/animals/' + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(animalData)
    }).then(() => { location.reload(); });
}

// 删除动物
function deleteAnimal(id) {
    fetch('/api/animals/' + id, {method: 'DELETE'}).then(() => { location.reload(); });
}

// 状态映射
const STATUS_MAP = {
    'active': { text: '在校活跃', class: 'status-active', emoji: '✅' },
    'adopted': { text: '已领养', class: 'status-adopted', emoji: '🏠' },
    'medical': { text: '就医中', class: 'status-medical', emoji: '🏥' },
    'passed': { text: '喵星/汪星', class: 'status-passed', emoji: '⭐' }
};

// 地区映射
const AREA_MAP = {
    'library': '📚 图书馆',
    'dorm-a': '🏢 宿舍楼A区',
    'dorm-b': '🏢 宿舍楼B区',
    'canteen': '🍽️ 食堂',
    'playground': '⚽ 操场',
    'teaching': '🏫 教学楼',
    'garden': '🌸 花园'
};
