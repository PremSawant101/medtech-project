import "./globals.css";
import Navbar from "./Navbar";
import Providers from "./provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}