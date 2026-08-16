import "./globals.css";

export const metadata = {
  title: "Digital Eye Test — MVP",
  description: "Online visual acuity screening prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}