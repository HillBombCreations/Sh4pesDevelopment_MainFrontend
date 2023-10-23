import Tabs from '../../../universalComponents/Tabs'
import ContactForm from '../../../universalComponents/ContactForm/Mobile'
import PropTypes from 'prop-types'

function MobileLanding({ pathname }) {
    
    return (
      <div id="page-container">
          <div id="content-wrap" style={{ padding: '10px 20vw 10px 20vw' }}>
            <header style={{ display: 'flex', flexDirection: 'column'}}>
              <img src="/assets/HBCreations.png" alt="HB Creations Banner" style={{ width: '150px', alignItems: 'center', marginLeft: 'auto', marginRight: '8vw' }} />
              <Tabs pathname={pathname} />
            </header>
            <div style={{ textAlign: 'left', paddingBottom: '50px' }}>
              <div style={{ overflow: 'auto', maxHeight: '75vh' }}>
                <h2 style={{ fontSize: '18px' }}>Raise Your Online Presence</h2>
                <h3 style={{ fontSize: '16px' }}>Innovation Meets Talent</h3>
                    <h3 style={{ fontSize: '16px' }}>Your Vision, Our Expertise</h3>
                    <p style={{ fontSize: '14px' }}>
                    At Hill Bomb Creations, we're not just a web development company – we're your fast track to online success.
                    Our name is more than just a clever play on words; it's a commitment to propelling your local business to new heights in the digital landscape.
                    </p>
                <br />
                <h3 style={{ fontSize: '16px' }}>Our Mission</h3>
                <p style={{ fontSize: '14px' }}>
                    Our mission is simple: to help businesses accelerate down the digital hill, leaving their competition in the dust.
                    We specialize in creating cutting-edge websites that embody the spirit of a downhill rush – sleek, fast, and exciting.
                </p>
                <br />
                <hr />
                <br />
                <h2 style={{ fontSize: '18px' }}>Why Choose HB Creations</h2>
                <h3 style={{ fontSize: '16px' }}>1. Unparalleled Talent</h3>
                <p style={{ fontSize: '14px' }}>
                    Our platform is home to a vast network of highly skilled freelance developers, designers, and tech experts. 
                    They are handpicked based on their experience, qualifications, and a proven track record of delivering exceptional results. 
                    When you work with us, you're choosing the best in the business.
                </p>
                <h3 style={{ fontSize: '16px' }}>2. Customized Solutions</h3>
                <p style={{ fontSize: '14px' }}>
                    No two projects are the same. That's why we believe in tailoring our services to meet your unique needs. 
                    Whether it's web development, mobile apps, e-commerce solutions, or any other tech project, our freelancers will work closely 
                    with you to deliver solutions that align perfectly with your goals.
                </p>
                <h3 style={{ fontSize: '16px' }}>3. Affordability</h3>
                <p style={{ fontSize: '14px' }}>
                    We understand that budget constraints can be a significant concern. Our competitive pricing and flexible payment options ensure 
                    that top-notch tech solutions are within your reach. We believe in the power of technology to transform businesses, and we're 
                    committed to making it accessible to everyone.
                </p>
                <h3 style={{ fontSize: '16px' }}>4. Seamless Collaboration</h3>
                <p style={{ fontSize: '14px' }}>
                    Communication is key in every successful project. Our platform offers robust collaboration tools to ensure that you are always in the loop. 
                    You can easily share your ideas, give feedback, and track progress in real-time. Our freelancers are dedicated to keeping you informed every step of the way.
                </p>
                <h3 style={{ fontSize: '16px' }}>5. Quality Assurance</h3>
                <p style={{ fontSize: '14px' }}>
                    Quality is non-negotiable at HB Creations. We adhere to the highest industry standards and perform rigorous quality checks to ensure 
                    that the solutions we deliver are not just good but exceptional. Your satisfaction is our ultimate goal.
                </p>
                <br />
                <hr />
                <br />
                <h2 style={{ fontSize: '18px' }} id='services'>Our Services</h2>
                <h3 style={{ fontSize: '16px' }}> Website Design</h3>
                <p style={{ fontSize: '14px' }}> 
                    We specialize in creating visually stunning and highly functional websites tailored to your brand and objectives.
                    Our custom web solutions ensure you stand out in the digital landscape.
                </p>
                <h3 style={{ fontSize: '16px' }}>E-commerce Development</h3>
                <p style={{ fontSize: '14px' }}>
                    Take your business to new heights with our e-commerce solutions.
                    We design and develop online stores that are secure, user-friendly, and optimized for conversions.
                </p>
                <h3 style={{ fontSize: '16px' }}>Maintenance and Support</h3>
                <p style={{ fontSize: '14px' }}>
                    Ensure your website remains in top shape with our ongoing maintenance packages.
                    We handle updates, security, content management, and more, so you can focus on your business.
                </p>
                <h3 style={{ fontSize: '16px' }}>Reliable Hosting Solutions</h3>
                <p style={{ fontSize: '14px' }}>
                    Our hosting services provide a reliable and secure home for your website.
                    We handle all the technical intricacies, ensuring your site runs smoothly and stays online, so you can focus on your core business.
                </p>
                <br />
                <hr />
                <br />
                <h2 id="contact">Contact Us</h2>
                    <ContactForm />
                <br />
                <hr />
                <br />
                <h3 style={{ fontSize: '16px' }}>Join Us on the Fast Track</h3>
                <p style={{ fontSize: '14px' }}>
                    Let Hill Bomb Creations be your digital downhill specialist. Partner with us, and let's race toward success together. 
                    Whether you're a local business just starting or an established one looking to conquer new peaks, we're here to accelerate your journey.
                    Ready to take the plunge?
                </p>
                <p>
                    Contact us today, and let's start your exhilarating descent into the digital world
                </p>
            </div>
          </div>
        </div>
        <footer id="footer">
        <div id="footer-content">
            <span style={{ marginRight: '10px', fontSize: '14px' }}>© 2023 Hill Bomb Creations</span>
            <span id="contact"  style={{ fontSize: '14px' }}><a style={{ color: 'inherit' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a></span>
        </div>
        </footer>
      </div>
    );
}

MobileLanding.propTypes = {
  pathname: PropTypes.string.isRequired,
}
export default MobileLanding;