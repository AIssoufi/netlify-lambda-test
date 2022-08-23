import Mailchimp from "mailchimp-api-v3";
import md5 from "md5";
require("dotenv").config();

const api_key = process.env.MAILCHIMP_API_KEY;
const list_id = "6254e3c154";

const mailchimp = new Mailchimp(api_key);

export async function handler(event, context, callback) {
    const data = JSON.parse(event.body);
    const email = data.email;
    const hashedEmail = md5(email);
    let msg = `Le mail ${email} à bien été ajouté !`;

    await mailchimp.put(`/lists/${list_id}/members/${hashedEmail}`, {
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed"
    }).catch(() => {
        msg = 'Une erreur est survenu !'
    });


    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg })
    })
}