# My Anniversary

เว็บไซต์แสดงความทรงจำและเนื้อหาเฉลิมฉลองวันครบรอบ พัฒนาด้วย React, TypeScript และ Vite พร้อมจัดรูปแบบส่วนติดต่อผู้ใช้ด้วย Tailwind CSS และ CSS ของโปรเจกต์

เอกสารฉบับนี้อธิบายการติดตั้ง การพัฒนา การตรวจสอบคุณภาพ การสร้างไฟล์สำหรับเผยแพร่ และการอัปเดตเว็บไซต์ผ่าน Netlify Drop

## 1. ข้อกำหนดเบื้องต้น

โปรเจกต์ต้องใช้ซอฟต์แวร์ดังต่อไปนี้

- Node.js รุ่นที่รองรับการทำงานกับ dependencies ใน `package.json`
- npm ซึ่งติดตั้งมาพร้อม Node.js
- เว็บเบราว์เซอร์สมัยใหม่ เช่น Google Chrome, Microsoft Edge หรือ Firefox

ตรวจสอบเวอร์ชันที่ติดตั้งในเครื่อง:

```powershell
node --version
npm --version
```

## 2. การติดตั้งโปรเจกต์

เปิด PowerShell แล้วเข้าสู่โฟลเดอร์โปรเจกต์:

```powershell
cd "C:\Users\67143\Desktop\lovegorpor\my-anniversary"
```

ติดตั้ง dependencies:

```powershell
npm install
```

โดยทั่วไป หากมีไฟล์ `package-lock.json` อยู่แล้ว ควรใช้คำสั่งต่อไปนี้เพื่อให้ได้ dependencies ตรงตาม lockfile:

```powershell
npm ci
```

## 3. การเปิดเว็บไซต์ระหว่างพัฒนา

เริ่มเซิร์ฟเวอร์สำหรับพัฒนา:

```powershell
npm run dev
```

จากนั้นเปิด URL ที่แสดงในหน้าต่าง PowerShell โดยปกติ Vite จะใช้งานที่:

```text
http://localhost:5173
```

เซิร์ฟเวอร์รองรับ Hot Module Replacement เมื่อแก้ไขไฟล์ เว็บไซต์จะรีเฟรชการเปลี่ยนแปลงให้โดยอัตโนมัติ

หยุดเซิร์ฟเวอร์ด้วย `Ctrl + C`

## 4. คำสั่งที่ใช้งานได้

| คำสั่ง | รายละเอียด |
| --- | --- |
| `npm install` | ติดตั้ง dependencies ของโปรเจกต์ |
| `npm ci` | ติดตั้ง dependencies ตาม `package-lock.json` แบบสะอาด |
| `npm run dev` | เปิดเซิร์ฟเวอร์สำหรับพัฒนา |
| `npm run lint` | ตรวจสอบรูปแบบและปัญหาตามกฎ ESLint |
| `npm run build` | ตรวจสอบ TypeScript และสร้างไฟล์ production ใน `dist` |
| `npm run preview` | เปิดดูไฟล์ production ที่ build แล้วในเครื่อง |

## 5. การตรวจสอบก่อนเผยแพร่

ก่อนนำเว็บไซต์ขึ้นออนไลน์ ควรเรียกใช้คำสั่งต่อไปนี้:

```powershell
npm run lint
npm run build
```

การ build ที่สำเร็จจะสร้างโฟลเดอร์:

```text
C:\Users\67143\Desktop\lovegorpor\my-anniversary\dist
```

ทดสอบไฟล์ production ในเครื่องได้ด้วย:

```powershell
npm run preview
```

## 6. การอัปเดตเว็บไซต์ผ่าน Netlify Drop

วิธีนี้เหมาะสำหรับการเผยแพร่เว็บไซต์แบบ static โดยไม่ต้องติดตั้ง Netlify CLI หรือเชื่อมต่อ Git repository

### 6.1 สร้างไฟล์ production

ทุกครั้งที่แก้ไขเว็บไซต์ ให้เปิด PowerShell ที่โฟลเดอร์โปรเจกต์และเรียกใช้:

```powershell
cd "C:\Users\67143\Desktop\lovegorpor\my-anniversary"
npm run build
```

ห้ามลากโฟลเดอร์โปรเจกต์ทั้งหมดขึ้น Netlify ให้ใช้เฉพาะโฟลเดอร์ `dist` ที่สร้างหลังจาก build สำเร็จ

### 6.2 อัปโหลดเว็บไซต์

1. เปิด [Netlify Drop](https://app.netlify.com/drop)
2. เปิด File Explorer ไปที่โฟลเดอร์ `dist`
3. ลากโฟลเดอร์ `dist` ไปวางในพื้นที่อัปโหลดของ Netlify
4. รอให้ Netlify อัปโหลดและประมวลผลไฟล์จนเสร็จ
5. เปิด URL ที่ Netlify แสดงเพื่อทดสอบเว็บไซต์

### 6.3 อัปเดตเว็บไซต์เดิม

เมื่อมีการแก้ไขเว็บไซต์:

1. แก้ไขไฟล์ในโฟลเดอร์ `src` หรือ `public`
2. เรียกใช้ `npm run lint`
3. เรียกใช้ `npm run build`
4. ลากโฟลเดอร์ `dist` ที่สร้างใหม่ไปยัง Netlify
5. ตรวจสอบหน้าแรก รูปภาพ ปุ่ม และเนื้อหาสำคัญบน URL จริง

หาก Netlify แสดงเป็นการสร้างเว็บไซต์ใหม่แทนการอัปเดตเว็บไซต์เดิม ให้ตรวจสอบว่าเปิดหน้า deploy ของเว็บไซต์เดิมอยู่ หรือใช้วิธี deploy จากแดชบอร์ดของเว็บไซต์เดิม

## 7. โครงสร้างโฟลเดอร์สำคัญ

```text
my-anniversary/
├─ public/              ไฟล์ static และรูปภาพที่เข้าถึงได้โดยตรง
├─ src/                 ซอร์สโค้ด React และ TypeScript
│  ├─ assets/           ไฟล์ประกอบที่ import ผ่านซอร์สโค้ด
│  ├─ data/             ข้อมูลที่ใช้แสดงผลในเว็บไซต์
│  ├─ editpic/          ไฟล์หรือส่วนที่เกี่ยวข้องกับการจัดการรูปภาพ
│  ├─ App.tsx           คอมโพเนนต์หลักของเว็บไซต์
│  ├─ App.css           สไตล์หลักของแอปพลิเคชัน
│  ├─ index.css         สไตล์พื้นฐานระดับ global
│  └─ main.tsx          จุดเริ่มต้นการ render React
├─ dist/                ไฟล์ production ที่สร้างโดย npm run build
├─ index.html           HTML entry point
├─ package.json         scripts และ dependencies
├─ package-lock.json    เวอร์ชัน dependencies ที่ถูกล็อกไว้
├─ vite.config.ts       การตั้งค่า Vite และ development plugin
└─ tsconfig*.json       การตั้งค่า TypeScript
```

## 8. การจัดการรูปภาพ

รูปภาพที่ต้องการเผยแพร่เป็นส่วนหนึ่งของเว็บไซต์ควรจัดเก็บไว้ใน `public` หรืออยู่ในตำแหน่งที่ซอร์สโค้ด import ได้ถูกต้อง

เมื่อเพิ่มหรือลบรูปภาพ ให้เรียกใช้ build ใหม่ทุกครั้ง:

```powershell
npm run build
```

จากนั้นอัปโหลดโฟลเดอร์ `dist` เวอร์ชันล่าสุดไปยัง Netlify

### ข้อจำกัดของการอัปโหลดรูปภาพ

ในสภาพแวดล้อมสำหรับพัฒนา Vite มี endpoint `/api/pictures` ที่ช่วยอ่านรายการไฟล์และรับการอัปโหลดรูปภาพเข้า `public/picture` อย่างไรก็ตาม endpoint ดังกล่าวเป็น development middleware ที่อยู่ใน `vite.config.ts` และไม่ได้ถูก deploy เป็น backend บน Netlify Drop

ดังนั้น:

- การแสดงรูปภาพ static ที่รวมอยู่ใน `public` ยังคงใช้งานได้ตามปกติ
- การอัปโหลดรูปภาพจากหน้าเว็บจริงอาจไม่ทำงานบน Netlify Drop
- หากต้องการอัปโหลดรูปภาพบนเว็บไซต์จริง ต้องย้าย endpoint ไปเป็น Netlify Function หรือเชื่อมต่อบริการจัดเก็บไฟล์ภายนอก

## 9. การแก้ไขปัญหาเบื้องต้น

### คำสั่ง `npm` ไม่พบ

ติดตั้ง Node.js ใหม่จาก [เว็บไซต์ทางการของ Node.js](https://nodejs.org/) แล้วเปิด PowerShell หน้าต่างใหม่

### Dependencies มีปัญหา

ลบโฟลเดอร์ `node_modules` แล้วติดตั้งใหม่:

```powershell
Remove-Item -Recurse -Force "node_modules"
npm ci
```

### Build ไม่สำเร็จ

ตรวจสอบตามลำดับ:

1. อ่านข้อความ error ใน PowerShell
2. เรียกใช้ `npm run lint` เพื่อค้นหาปัญหาในซอร์สโค้ด
3. ตรวจสอบไฟล์ที่เพิ่งแก้ไขและ import ที่เกี่ยวข้อง
4. เรียกใช้ `npm ci` หาก dependencies ไม่ครบ
5. เรียกใช้ cd "C:\Users\67143\Desktop\lovegorpor\my-anniversary"
6. npm run build`

### เปิดเว็บแล้วเห็นหน้าเก่าหรือไฟล์ไม่ครบ

ตรวจสอบว่า:

- build สำเร็จหลังจากแก้ไขไฟล์แล้ว
- ลากโฟลเดอร์ `dist` ล่าสุด ไม่ใช่โฟลเดอร์เก่า
- ไฟล์ `index.html` อยู่ภายในโฟลเดอร์ที่อัปโหลด
- ลองเปิดเว็บในโหมดไม่ระบุตัวตนหรือกด `Ctrl + F5`

## 10. แนวทางการทำงานที่แนะนำ

1. แก้ไขซอร์สโค้ดใน `src` หรือเพิ่มไฟล์ใน `public`
2. เปิด `npm run dev` เพื่อดูผลระหว่างพัฒนา
3. ตรวจสอบด้วย `npm run lint`
4. สร้าง production build ด้วย `npm run build`
5. ทดสอบด้วย `npm run preview`
6. อัปโหลดโฟลเดอร์ `dist` ไปยัง Netlify Drop
7. ตรวจสอบเว็บไซต์จริงหลัง deploy ทุกครั้ง

ไม่ควรแก้ไขไฟล์ภายใน `dist` โดยตรง เนื่องจากไฟล์เหล่านี้จะถูกสร้างใหม่และถูกเขียนทับทุกครั้งที่เรียกใช้ `npm run build`
#   L O V E - G O R P O R  
 #   L O V E - G O R P O R  
 