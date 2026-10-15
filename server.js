const express = require('express');
const app = express();
app.use(express.json());

let players = {}; // بيحفظ الأسماء والـ IDs

// تسجيل / حجز الاسم
app.post('/api/register', (req, res) => {
    const { username, device_id } = req.body;
    if (!username || !device_id) return res.status(400).json({ error: "بيانات ناقصة" });

    for (let name in players) {
        if (name === username && players[name] !== device_id) {
            return res.json({ success: false, message: "الاسم ده محجوز لشخص تاني!" });
        }
    }

    players[username] = device_id;
    console.log(`[+] لاعب سجل: ${username}`);
    res.json({ success: true, message: "تم حجز الاسم بنجاح" });
});

// عرض قائمة الأصدقاء المتصلين
app.get('/api/players', (req, res) => {
    res.json({ success: true, players: Object.keys(players) });
});

// Render بيحدد البورت تلقائياً أو بيشتغل على 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر شغال على البورت ${PORT}`);
});