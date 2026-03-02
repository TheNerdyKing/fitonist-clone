import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "STONIX - תוצאות. לא שיווק.",
  description: "אנחנו מטפלים בכל מה שקשור לפרסום - כדי שיהיה לך שקט נפשי. עם מטרה אחת ברורה: להביא לך יותר לקוחות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased bg-dark-bg text-white">
        {children}
      </body>
    </html>
  );
}
