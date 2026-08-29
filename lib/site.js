export const site = {
  name: "David&talia",
  fullName: "David&talia Real Estate",
  tagline: "כל בית צריך מתווך אחד שיאמין בו",
  description:
    "משרד תיווך נדל\"ן בוטיק בניהול דיויד עזריה וטליה כהן — מכירה, השכרה, ליווי קונים, אחזקת נכסים ושיווק פרויקטים חדשים. שירות אישי, מקצועיות ושקיפות מלאה בכל שלב.",
  phones: [
    { label: "טליה כהן", number: "0504639858" },
    { label: "דיויד עזריה", number: "0509287879" },
  ],
  email: "t0504639858@gmail.com",
  social: {
    facebook:
      "https://www.facebook.com/talia.hayon?rdid=g4cF6OGFeRgHePMX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cay3e1AQ%2F",
    instagramTalia: "https://www.instagram.com/talia_cohen1988/",
    instagramDavid:
      "https://www.instagram.com/david_gabriel_azarya?igsh=MWUwOWxocjNkaDRubA%3D%3D",
  },
};

export function telHref(number) {
  return `tel:${number.replace(/[^0-9+]/g, "")}`;
}

export function whatsappHref(number, text) {
  const digits = number.replace(/\D/g, "");
  const intl = digits.startsWith("0") ? `972${digits.slice(1)}` : digits;
  const base = `https://wa.me/${intl}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
