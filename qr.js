const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Eliah_Hango,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function ELITECHWIZ_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Eliah_Hango = Eliah_Hango({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Eliah_Hango.ev.on('creds.update', saveCreds)
			Qr_Code_By_Eliah_Hango.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Eliah_Hango.sendMessage(Qr_Code_By_Eliah_Hango.user.id, { text: '' + b64data });
	
				   let ELITECHWIZ_TEXT = `

╔═══════════════════
 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 *EliTechWiz-V4* 
 ✅ 𝐘𝐨𝐮𝐫 𝐒𝐞𝐬𝐬𝐢𝐨𝐧 𝐈𝐝 𝐈𝐬 𝐑𝐞𝐚𝐝𝐲
╚═══════════════════

╔═══════════════════
𝐂𝐇𝐀𝐍𝐍𝐄𝐋 𝐋𝐈𝐍𝐊 𝐇𝐄𝐑𝐄
https://whatsapp.com/channel/0029VaeEYF0BvvsZpaTPfL2s
╚═══════════════════

╔═══════════════════
☉︎𝐖𝐏-𝐌𝐄-𝐎𝐖𝐍𝐄𝐑®️
https://wa.me/255617834510
╚═══════════════════

╔═══════════════════
 𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐂𝐡𝐨𝐨𝐬𝐢𝐧𝐠 EliTechWiz-V4
╚═══════════════════`
	 await Qr_Code_By_Eliah_Hango.sendMessage(Qr_Code_By_Eliah_Hango.user.id,{text:ELITECHWIZ_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Eliah_Hango.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					ELITECHWIZ_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await ELITECHWIZ_QR_CODE()
});
module.exports = router
