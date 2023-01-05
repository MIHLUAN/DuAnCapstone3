import React from 'react'

export default function Footer() {
  return (
    <footer class="footer">
      <div class="footer__part --part-1">
        <div class="container">
          <div class="footer__item">
            <h2>GET HELP</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Nike</a></li>
              <li><a href="#">Adidas</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="footer__item ps-3 me-3 --border">
            <h2>Support</h2>
            <ul>
              
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Phone</a></li>
            </ul>
          </div>
          <div class="footer__item">
            <h2>REGISTER</h2>
            <ul>
              <li><a href="#">Register</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}