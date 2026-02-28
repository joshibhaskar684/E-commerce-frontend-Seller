import "./globals.css";


export const metadata = {
  title: "Quick for Business",
  description: "This is an business site of Quick where  business can register and sell their products in our site quicksin.in",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
