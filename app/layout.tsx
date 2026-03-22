import "./globals.css";

export const metadata = {
  title: "BrewElevate",
  description: "Elevate Your Home Coffee Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
