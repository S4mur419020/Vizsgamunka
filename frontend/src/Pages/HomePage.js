import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>

      <section>
        <h1>Üdv a Sneaker Webshopban</h1>
        <p>Vásárolj gyorsan és egyszerűen</p>
      </section>

      <section>
        <h2>Kiemelt termékek</h2>

        <div>
          <div>
            <h3>Niek Air Force 1</h3>
            <p>34 990 Ft</p>
            <Link to="/products/1">Részletek</Link>
          </div>

          <div>
            <h3>Adidas Superstar</h3>
            <p>37 600 Ft</p>
            <Link to="/products/2">Részletek</Link>
          </div>
        </div>
      </section>

      <section>
        <h2>Miért minket válassz?</h2>
        <ul>
          <li>Gyors szállítás</li>
          <li>Biztonságos fizetés</li>
          <li>Egyszerű vásárlás</li>
        </ul>
      </section>

    </div>
  )
}
