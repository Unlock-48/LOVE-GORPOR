<div align="center">

# 💗 My Anniversary

### A little digital space for our memories

เว็บไซต์วันครบรอบที่รวบรวมรูปภาพ วิดีโอ และช่วงเวลาพิเศษเอาไว้ในที่เดียว  
สร้างด้วยความรักด้วย React, TypeScript และ Vite

<p>
  <a href="https://github.com/Kantinan48/LOVE-GORPOR">Repository</a>
  ·
  <a href="https://github.com/Unlock-48/LOVE-GORPOR">Mirror Repository</a>
</p>

</div>

<p align="center">
  <img src="./src/assets/hero.png" alt="My Anniversary preview" width="760">
</p>

## ✨ เกี่ยวกับโปรเจ็กต์

โปรเจ็กต์นี้เป็นเว็บไซต์ส่วนตัวสำหรับบันทึกเรื่องราวของเราในรูปแบบ interactive
มีทั้งแกลเลอรีความทรงจำ วิดีโอ ช่วงเวลาโปรด และข้อความที่อยากเก็บไว้ดูด้วยกัน

## 🌷 ฟีเจอร์

- **Memory gallery** — ดูรูปภาพและความทรงจำในรูปแบบแกลเลอรี
- **Story showcase** — นำเสนอเรื่องราวผ่านวิดีโอและข้อความ
- **Interactive controls** — กดถูกใจ เปิดดูรูปภาพ และเลื่อนดูเนื้อหาได้
- **Responsive design** — ใช้งานได้ทั้งบนคอมพิวเตอร์และโทรศัพท์
- **Beautiful UI** — โทนสีและ typography ที่ออกแบบให้เหมาะกับเว็บไซต์ความทรงจำ

## 🛠️ เทคโนโลยี

| เทคโนโลยี | หน้าที่ |
| --- | --- |
| [React](https://react.dev/) | สร้างส่วนติดต่อผู้ใช้ |
| [TypeScript](https://www.typescriptlang.org/) | เพิ่ม type safety ให้โค้ด |
| [Vite](https://vite.dev/) | Development server และ build tool |
| [Tailwind CSS](https://tailwindcss.com/) | ช่วยจัดรูปแบบ UI |
| [Lucide React](https://lucide.dev/) | ไอคอนในเว็บไซต์ |

## 🚀 เริ่มต้นใช้งาน

### สิ่งที่ต้องมี

- [Node.js](https://nodejs.org/) เวอร์ชันที่รองรับโปรเจ็กต์
- npm

### ติดตั้งและเปิดโปรเจ็กต์

```bash
git clone https://github.com/Kantinan48/LOVE-GORPOR.git
cd LOVE-GORPOR
npm ci
npm run dev
```

จากนั้นเปิด URL ที่ Vite แสดงใน Terminal โดยปกติคือ
[`http://localhost:5173`](http://localhost:5173)

## 📦 คำสั่งที่ใช้บ่อย

| คำสั่ง | รายละเอียด |
| --- | --- |
| `npm run dev` | เปิดเซิร์ฟเวอร์สำหรับพัฒนา |
| `npm run lint` | ตรวจสอบโค้ดด้วย ESLint |
| `npm run build` | ตรวจสอบ TypeScript และสร้าง production build |
| `npm run preview` | เปิดดู production build ในเครื่อง |

ก่อนเผยแพร่เว็บไซต์ แนะนำให้ตรวจสอบด้วยคำสั่ง:

```bash
npm run lint
npm run build
```

## 🗂️ โครงสร้างโปรเจ็กต์

```text
my-anniversary/
├── public/              รูปภาพและวิดีโอที่ใช้บนเว็บไซต์
├── src/
│   ├── assets/          ไฟล์ภาพที่ import ผ่านโค้ด
│   ├── data/            ข้อมูล memories และ showcase
│   ├── App.tsx          คอมโพเนนต์หลัก
│   ├── App.css          สไตล์ของแอป
│   └── main.tsx         จุดเริ่มต้นของ React
├── index.html
├── package.json
└── vite.config.ts
```

## 🌐 การเผยแพร่ด้วย Netlify

สร้างไฟล์สำหรับเผยแพร่ก่อน:

```bash
npm run build
```

จากนั้นนำโฟลเดอร์ `dist` ไปวางใน [Netlify Drop](https://app.netlify.com/drop)

> เว็บไซต์นี้เป็น static site การอัปโหลดรูปภาพจากหน้าเว็บจริงอาจต้องใช้
> backend หรือบริการจัดเก็บไฟล์เพิ่มเติม

## 🔄 อัปเดตไปยัง GitHub ทั้งสองบัญชี

โปรเจ็กต์นี้ตั้งค่า remote ไว้สองแห่ง:

```text
origin  → Kantinan48/LOVE-GORPOR
unlock  → Unlock-48/LOVE-GORPOR
```

หลังแก้ไขโค้ดแล้วใช้คำสั่ง:

```bash
git add .
git commit -m "Describe your update"
git push origin main
git push unlock main
```

## 💌 หมายเหตุ

โปรเจ็กต์นี้สร้างขึ้นเพื่อเก็บความทรงจำส่วนตัว  
รูปภาพและวิดีโอในโฟลเดอร์ `public/` เป็นเนื้อหาส่วนตัวของเจ้าของโปรเจ็กต์

<div align="center">

### Made with love 🤍

</div>
