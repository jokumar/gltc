// src/app/layout.js


import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      
        <div>{children}</div>
     
      </body>
    </html>
  );
}
