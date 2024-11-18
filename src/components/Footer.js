import styles from '../styles/footer.module.css';
// src/components/Footer.js
export default function Footer() {
    return (
        <footer style={{scrollsnapalign: "start" }}>
        <div class={styles.footerContainer}>
          <div class={styles.footerSection} >
            <h3>Tennis Sites</h3>
            <ul>
              <li><a href="https://www.atptour.com/en">ATP Tour</a></li>
              <li><a href="https://www.dltc.net/">Dublin Lawn Tennis Council</a></li>
              <li><a href="https://www.itftennis.com/en/">ITF Tennis</a></li>
              <li><a href="https://www.leinstertennis.ie/">Leinster Tennis</a></li>
              <li><a href="https://www.tennisireland.ie/">Tennis Ireland</a></li>
              <li><a href="https://www.wtatennis.com/">WTA Tennis</a></li>
              <li><a href="https://www.tenniseurope.org/">Tennis Europe</a></li>
            </ul>
          </div>
          <div class={styles.footerSection}>
            <h3>LOCATE US</h3>
                 <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1321.4948055474433!2d-6.069107465845854!3d53.13252298178482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4867af24de590587%3A0x82e0a40bbcc6332e!2sGreystones%20Lawn%20Tennis%20Club!5e0!3m2!1sen!2sie!4v1731540251583!5m2!1sen!2sie"
              width="100%" height="150" style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe>
          </div>
          <div class={styles.footerSection}>
            <h3>CONTACT US</h3>
            <p>Greystone LTC<br />Mill Road<br />Greystones<br />Co. Wicklow</p>
            <p><strong>General Queries</strong> (01) 2876505</p>
            <p><strong>Junior Coaching and camps</strong> (085) 867 5860</p>
            <p><strong>Mail Us:</strong> <a href="mailto:admin@greystonesltc.ie ">admin@greystonesltc.ie</a></p>
          </div>
       
        </div>
        <div class={styles.footerBottom}>
          <p>&copy; 2024. Greystone Lawn Tennis Club</p>
        </div>
      </footer>


    );
  }
  