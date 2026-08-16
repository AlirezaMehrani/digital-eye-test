# Digital Eye Test — MVP

نسخه اول یک پروتوتایپ وب برای:
- کالیبراسیون اولیه صفحه
- تست Tumbling-E جهت‌محور
- تست جداگانه چشم راست و چپ
- نمایش نتیجه غربالگری

> این MVP نسخه پزشکی یا ابزار صدور نسخه قطعی عینک نیست.

## اجرا

نیازمندی: Node.js 18+

```bash
npm install
npm run dev
```

سپس:
http://localhost:3000

## مرحله بعد

- کالیبراسیون فیزیکی دقیق بر اساس CSS px / devicePixelRatio
- staircase algorithm معتبرتر
- logMAR conversion
- Sphere refinement
- Cylinder/Axis
- PD
- safety screening
- backend و ذخیره داده
- clinical validation
