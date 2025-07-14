const os = require("os");
const process = require("process");
const { version: nodeVersion } = process;
const startTime = Date.now();

const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    downloadMediaMessage
} = require("@whiskeysockets/baileys");

const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const qrcode = require("qrcode-terminal");
const P = require("pino");

const logger = P({ level: "silent" });

const getUptime = () => {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    return new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);
};

const getSystemInfo = () => ({
    os: `${os.type()} ${os.release()}`,
    cpu: os.cpus()[0].model,
    cores: os.cpus().length,
    ram: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
    load: os.loadavg().map(n => n.toFixed(2)).join(", "),
    uptime: `${Math.floor(os.uptime() / 60)} menit`
});

const handleMessage = async (sock, msg) => {
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const mention = [msg.key.participant || msg.key.remoteJid];

    const commands = {
        'p': async () => {
            await sock.sendMessage(sender, {
                text: `pa pe pa pe assalamu'alaikum kek ${msg.pushName || 'user'} \n\n_dibalas otomatis oleh bot🤖_`,
                mentions: mention
            });
        },
        '!info': async () => {
            const sysInfo = getSystemInfo();
            const info = `
*🤖 Bot Info:*
• Nama: JakajekbaeBot
• Aktif: ${getUptime()}
• Baileys: @whiskeysockets/baileys v6.x
• Node.js: ${nodeVersion}

*🖥 VPS Info:*
• OS: ${sysInfo.os}
• CPU: ${sysInfo.cpu}
• Core: ${sysInfo.cores}
• RAM: ${sysInfo.ram}
• Beban CPU: ${sysInfo.load}
• Uptime VPS: ${sysInfo.uptime}
            `.trim();
            await sock.sendMessage(sender, { text: info });
        },
        'assalamualaikum': async () => {
            await sock.sendMessage(sender, {
                text: `wa'alaikum salam`,
                mentions: mention
            });
        }
    };

    if (commands[text.toLowerCase()]) {
        await commands[text.toLowerCase()]();
        return;
    }

    // Handle sticker creation
    const isImage = msg.message?.imageMessage;
    const caption = msg.message?.imageMessage?.caption?.toLowerCase() || "";

    if (isImage && caption === "!sticker") {
        try {
            const buffer = await downloadMediaMessage(msg, "buffer", {}, {
                logger,
                reuploadRequest: sock.updateMediaMessage
            });

            const sticker = new Sticker(buffer, {
                pack: "botStickerBy",
                author: "jakajekbae",
                type: StickerTypes.FULL,
                quality: 70
            });

            await sock.sendMessage(sender, {
                sticker: await sticker.toBuffer()
            });
        } catch (err) {
            console.error("❌ Gagal buat stiker:", err);
            await sock.sendMessage(sender, { text: "Gagal buat stiker 😞" });
        }
    }
};

async function startSock() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger,
        auth: state,
        generateHighQualityLinkPreview: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
        if (qr) {
            console.log("Scan QR ini:");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
            console.log("Terputus. Reconnect?", true);
            startSock();
        }

        if (connection === "open") {
            console.log("BOT TERHUBUNG ✅");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        await handleMessage(sock, messages[0]);
    });
}

startSock().catch(console.error);
