

const ContactUs = () => {
  
  
  

  return (
    <div
      style={{
        minHeight: "100vh",
         background: "linear-gradient(to bottom right, #21377068, #020e20ff)", // ombre blue
        color: "#f8fafc",
        padding: "50px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Heading Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontWeight: "700", fontSize: "2.8rem" }}>
          Contact Us
        </h1>
       
      </div>

      {/* Contact Info + Form Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Contact Info Cards */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#182f7bff" }}>📍 Address</h3>
          <p>Gujranwala, Pakistan</p>

          <h3 style={{ margin: "25px 0 15px", color: "#182f7bff" }}>📧 Email</h3>
          <p>inotebookreact@gmail.com</p>

          <h3 style={{ margin: "25px 0 15px", color: "#182f7bff" }}>📞 Phone</h3>
          <p>+92 3215537255 </p>
        </div>

        {/* Contact Form */}
        </div>
    </div>
  );
};

export default ContactUs;
