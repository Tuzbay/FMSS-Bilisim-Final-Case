import React from "react";
import "./Footer.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

// Footer componenti oluşturulmuştur. Burada yapan kişiye ait sosyal medya hesaplarına yönlendirmeler bulunmaktadır.

function Footer() {
  return (
    <div className="footer">
      <strong>~ Tunay Uzbay YELCE ~</strong>
      <div className="footer__bottom">
        <a
          href="https://www.linkedin.com/in/tunayuzbayyelce/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon fontSize="large" />
        </a>

        <a
          href="https://github.com/Tuzbay"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon fontSize="large" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
