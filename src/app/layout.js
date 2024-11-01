// src/app/layout.js

import Footer from '../components/Footer';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
