import nodemailer from "nodemailer";

const createMessage = (weather: Weather) => `
<h1 style="font-size: larger;">Dear Admin,</h1>
  <article style="font-size: larger;">
	  <p>Threshold has been reached</p>
		<p>current Readings are:</p>
      ${Object.entries(weather)
        .map(
          ([key, value]) => `
    <p>${key}: ${value}</p>`
        )
        .join("\n")}
  </article>
`;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cocomanga59@gmail.com",
    pass: "otdzyyapakdabofe",
  },
});

export const sendMail = (emailReceivers, weather: Weather) => {
  console.log("sending mail to " + emailReceivers);

  transporter.sendMail(
    {
      from: "Weather Station ",
      to: emailReceivers,
      subject: "[Alert] Threshold Reached",
      html: createMessage(weather),
    },
    (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    }
  );
};
