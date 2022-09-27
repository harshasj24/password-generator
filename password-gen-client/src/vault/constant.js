import facebook from "../assets/icons/facebook.png";
import hotstar from "../assets/icons/hotstar.png";
import netflix from "../assets/icons/netflix.png";
import outlook from "../assets/icons/outlook.png";
import prime from "../assets/icons/prime.png";
import twitter from "../assets/icons/twitter.png";
import instagram from "../assets/icons/instagram.png";
import gmail from "../assets/icons/gmail.png";

export const links = {
  facebook: {
    link: "https://www.facebook.com/login.php?content_id=UVPsp9NMrDhgF3H&ref=sem_smb&utm_source=GOOGLE&utm_medium=fbsmbsem&utm_campaign=PFX_SEM_G_BusinessAds_IN_EN_DSA_Other_Desktop&utm_content=IN_EN_DSA_Other_Desktop&gclid=Cj0KCQjwj7CZBhDHARIsAPPWv3egHmVogGQePua7U9pYjCdT1joWHK6-b0TOi6pIgis59ead8JscPWoaAoebEALw_wcB&utm_term=dsa-1633293535122&utm_ct=EVG&gclid=Cj0KCQjwj7CZBhDHARIsAPPWv3egHmVogGQePua7U9pYjCdT1joWHK6-b0TOi6pIgis59ead8JscPWoaAoebEALw_wcB",
    icon: facebook,
  },
  twitter: {
    link: "https://twitter.com/i/flow/login",
    icon: twitter,
  },
  netflix: {
    link: "https://www.netflix.com/in/login",
    icon: netflix,
  },
  prime: {
    link: "https://www.primevideo.com/",
    icon: prime,
  },
  instagram: {
    link: "https://www.instagram.com/accounts/login/",
    icon: instagram,
  },
  gmail: {
    link: "https://accounts.google.com/ServiceLogin/signinchooser?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
    icon: gmail,
  },
  hotstar: {
    link: "https://www.hotstar.com/in/subscribe/my-account",
    icon: hotstar,
  },

  outlook: {
    link: "https://outlook.office365.com/mail/",
    icon: outlook,
  },
};

export const checkLinks = (name) => {
  let key = Object.keys(links).filter((val) =>
    val.toLowerCase().includes(name.toLowerCase())
  );
  console.log(key);
  if (key.length > 0) {
    console.log(key, "123");
    return links[key[0]];
  }
  return;
};
