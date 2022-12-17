const Color = require('../others/color')

let Canvas = {}

try {
    Canvas = require('canvas')
} catch (e) { }

const { createCanvas, Image, loadImage } = Canvas
const moment = require('moment');
moment.locale('pt-BR');

module.exports = class CanvasTemplates {
  static async spotify({ spotifyInfo }) {
    const config = {
        width: 720,
        height: 280,
        margin: 32,
        padding: 35,
        avRadius: 60,
        barRadius: 35,
        background: '',
        colorText: '#43b581',
    }
    const canvas = createCanvas(config.width, config.height);
    const ctx = canvas.getContext('2d');


    const avatar = spotifyInfo.assets.largeImageURL({ format: 'png', size: 1024 });
    const image = await loadImage(avatar);

    ctx.drawImage(image, config.height, -config.height / 2, 480, 480);
    blur(3)
    ctx.drawImage(image, 0, 0, config.height, config.height);

    const posX = 670;
    const posY = 267;
    const end = 330;
    const color = '#484b4e';
    const size = 8;

    const bgColor = 'rgba(0, 0, 0, 0.6)'
    ctx.fillStyle = bgColor;
    ctx.fillRect(config.height, -config.height / 2, 480, 480);

    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    drawBar(posX, posY, end, color, size)

    let trackStart = spotifyInfo.timestamps.start;
    let trackEnd = spotifyInfo.timestamps.end;

    let porcentagemcompleta = (new Date() - trackStart) / (trackEnd - trackStart) * 100;
    let porcentagem = (Math.round(porcentagemcompleta * 100) / 100);
    let pct = 330 + porcentagem * 3.3

    let trackMoment = moment(new Date() - trackStart).format('mm:ss');
    let tracktime = moment(trackEnd - trackStart).format('mm:ss');

    ctx.font = '12px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(trackMoment, 315 - 30, posY + 5);
    ctx.fillText(tracktime, 315 * 2 + 50, posY + 5);

    ctx.strokeStyle = '#1DB954';
    drawBar(pct, posY, end, color, size)

    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(pct, posY);
    ctx.lineTo(pct, posY);
    ctx.lineWidth = 17;
    ctx.stroke();

    const measure = (text) => (ctx.measureText(text).width) + 10;

    let startX = 315 - 30 //barX + barWidth + 10;
    let startY = 100 //margin + 45 + padding;

    let measured = 0;

    const addText = (text, font, hex = color) => {
        ctx.fillStyle = hex;
        ctx.font = font;

        ctx.fillText(text, startX - measured, startY);

        measured += measure(text);
    };

    const smallTextFont = '27px Arial';
    const smallTextColor = '#F9F9FA';


    const details = spotifyInfo.details.replace(/;/g, ",").split(' ').map((e, i) => i % 5 == 0 ? '\n' + e : e).join(' ')

    addText(details, smallTextFont, smallTextColor);


    const iconSpotify = await loadImage('https://media.discordapp.net/attachments/681503728792371233/701576801692024932/Spotify_Icon_RGB_White.png?width=475&height=475');
    ctx.drawImage(iconSpotify, 290, 10, 40, 40);

    ctx.clip()

    function drawBar(posX, posY, end, color, size) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.moveTo(posX, posY);
        ctx.lineTo(end, posY);
        ctx.stroke();
    }

    function blur(strength) {
        ctx.globalAlpha = 0.5;
        for (var y = -strength; y <= strength; y += 2) {
            for (var x = -strength; x <= strength; x += 2) {
                ctx.drawImage(canvas, x, y);

                if (x >= 0 && y >= 0)
                    ctx.drawImage(canvas, -(x - 3), -(y - 1));
            };
        };
        ctx.globalAlpha = 1.0;
    }
    return canvas.toBuffer();
}

  static async perfeito(url) {

        const canvas = createCanvas(456, 400);
        const ctx = canvas.getContext('2d');

        const background = await loadImage('./util/img/png/perfeito.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const background2 = await loadImage(url)
        ctx.drawImage(background2, 258, 50, 200, 240);

        return canvas.toBuffer();
    }

  static async profile({ author }) {
        const width = 315;
        const height = 460;

        const avRadius = 50;

        const margin = 10;

        const Canvas = require('canvas');
        const canvas = Canvas.createCanvas(width + (margin * 2), height + (margin * 2));
        const ctx = canvas.getContext('2d');

        const boxHeight = 185;
        const b = { x: 15, y: 355, w: 283, h: 45 };

        ctx.shadowColor = '#25292e';
        ctx.shadowBlur = margin;

        ctx.fillStyle = 'transparent';
        ctx.fillRect(0 + margin, 0 + margin, width, height);

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#202225';
        ctx.fillRect(0 + margin, 0 + margin, width, boxHeight);

        ctx.fillStyle = '#2f3136';
        ctx.fillRect(0 + margin, boxHeight + margin, width, height - boxHeight);

        ctx.fillStyle = '#36393f';
        ctx.fillRect(b.x + margin, b.y + margin, b.w, b.h);

        ctx.strokeStyle = '#212327';
        ctx.lineWidth = 1;

        ctx.strokeRect(b.x + margin, b.y + margin, b.w, b.h);
        ctx.strokeRect(0 + margin, 0 + margin, width - 1, height);

        ctx.fillStyle = '#72767d';
        ctx.font = 'bold 16px Arial';

        ctx.fillText('CARGOS', 25, boxHeight + 42);
        ctx.fillText('NOTA', 25, boxHeight + 120);

        ctx.fillStyle = '#43b581';
        ctx.fillText('FICA A DICA:', 25, height - 25);

        ctx.font = '15px Arial';
        ctx.fillStyle = '#43b581';

        ctx.fillStyle = '#8f9193';
        ctx.fillText('Clique com o botão direito', 132, height - 25);
        ctx.fillText('em um usuário para mais ações', 60, height - 5);

        ctx.fillStyle = '#707070';
        ctx.font = '15px Arial';
        ctx.fillText('Clique para adicionar uma nota', 25, boxHeight + 153);

        ctx.font = '25px Arial';
        ctx.fillStyle = '#ffffff';

        const uM = ctx.measureText(author.tag).width;
        const uX = (width / 2 - (uM / 2)) + margin / 2;

        ctx.fillText(author.username, uX, boxHeight - 23);

        ctx.fillStyle = '#9fa0a1';
        ctx.fillText('#' + author.discriminator, (uX + uM) - (ctx.measureText('#' + author.discriminator).width - 1), boxHeight - 23);

        const avatarLoad = author.displayAvatarURL({ format: 'png', size: 1024 })

        const avatar = await loadImage(avatarLoad);
        ctx.lineWidth = 8;
        const avX = (height / 3 + 10);
        fillRectWithImage(avatar, avX, height / 6, avRadius);

        function fillRectWithImage(img, x, y, r) {
            const canvas2 = createCanvas(r * 2, r * 2);
            const ctx2 = canvas2.getContext('2d');

            ctx2.drawImage(img, 0, 0, r * 2, r * 2);
            ctx2.globalCompositeOperation = 'destination-in';

            ctx2.arc(r, r, r, 0, 2 * Math.PI);
            ctx2.fill();

            ctx.drawImage(canvas2, x - r, y - r);
        }
        return canvas.toBuffer();
    }  

  static async perfil({ author }) {
        const width = 960;
        const height = 422;
        const margin = 10;
        const padding = 1;
        const avRadius = 110;
        const barRadius = 1;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const defaultBgColor = '#202225';

        ctx.fillStyle = defaultBgColor;
        ctx.fillRect(0, 0, width, height);

        const avatar = await loadImage(author.user.displayAvatarURL({ format: 'png', size: 1024 }));
        ctx.lineWidth = 8;

        const avX = (height / 3) //- 60;


        const AVATAR_BACKGROUND_RADIUS = 30
        const AVATAR_SIZE = AVATAR_BACKGROUND_RADIUS * 8.60

        //const avX = (height / 3 + 15);
        //const poxZ = (avX - 100)

        //ctx.roundImage(avatar, avX, height / 2, AVATAR_SIZE, AVATAR_SIZE)

        fillRectWithImage(avatar, avX, height / 2, avRadius);

        const color_status = {
            idle: '#faa61a',
            ocupado: '#43b581',
            dnd: '#f04747',
            offline: '#747f8d',
            online: '#43b581'
        }
        const color = color_status[author.presence.status]

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(avX, height / 2, avRadius + (ctx.lineWidth / 2) - 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.font = '48px Arial';

        const name = author.user.username;

        const nameX = (margin / 3) + padding + (avRadius / 3);
        const nameW = ctx.measureText(name).width;

        ctx.lineWidth = barRadius;
        ctx.lineCap = 'round';

        ctx.strokeStyle = '#484b4e';

        const barY = ((height - (margin + padding)) - (barRadius / 2));
        const nameY = barY + (barRadius - 15);

        ctx.fillStyle = 'white';
        ctx.fillText(name, nameX, nameY);

        const smallerTextColor = '#676a6e';

        ctx.font = '28px Arial';
        ctx.fillStyle = smallerTextColor;
        ctx.fillText('#' + author.user.discriminator, (nameX + nameW) + 5, nameY);

        ctx.textAlign = 'end';
        ctx.fillStyle = color;
        ctx.font = '65px Arial';

        ctx.font = '38px Arial';
        const accountCreated = 'Conta criada: ' + moment(author.user.createdTimestamp).format('ll');
        const joinedMemberGuild = 'Entrou na guild: ' + moment(author.joinedTimestamp).format('ll');
        const memberId = 'ID: ' + author.id

        const idY = 100;
        const idX = 770;

        const accountCreatedY = 150;
        const accountCreatedX = 860;

        const joinedMemberY = 200;
        const joinedMemberX = 900;

        ctx.fillStyle = 'white';
        ctx.fillText(memberId, idX, idY);
        ctx.fillText(accountCreated, accountCreatedX, accountCreatedY);
        ctx.fillText(joinedMemberGuild, joinedMemberX, joinedMemberY);

        function fillRectWithImage(img, x, y, r) {
            const canvas2 = createCanvas(r * 2, r * 2);
            const ctx2 = canvas2.getContext('2d');

            ctx2.drawImage(img, 0, 0, r * 2, r * 2);
            ctx2.globalCompositeOperation = 'destination-in';

            ctx2.arc(r, r, r, 0, 2 * Math.PI);
            ctx2.fill();

            ctx.drawImage(canvas2, x - r, y - r);
        }

        const status = {
            online() { },
            offline(x, y) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, statusRadius - 16, 0, 2 * Math.PI);
                ctx.fill();
            },
            dnd(x, y) {
                const size = 11;

                ctx.strokeStyle = defaultBgColor;
                ctx.lineWidth = 12;

                ctx.beginPath();
                ctx.moveTo(x - size, y);
                ctx.lineTo(x + size, y);
                ctx.stroke();
            },
            idle(x, y) {
                ctx.fillStyle = defaultBgColor;
                ctx.beginPath();
                ctx.arc(x - 10, y - 10, statusRadius - 15.5, 0, 2 * Math.PI);
                ctx.fill();
            }
        };

        const statusMargin = 85;
        const statusRadius = 30;

        const drawStatus = (x, y) => {
            const draw = status[author.presence.status];

            ctx.fillStyle = defaultBgColor;
            ctx.beginPath();
            ctx.arc(x, y, statusRadius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, statusRadius - 7, 0, 2 * Math.PI);
            ctx.fill();

            draw(x, y);
        };

        drawStatus(avX + statusMargin, (height / 2) + statusMargin);

        const badges = {
            DISCORD_PARTNER: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/DISCORD_PARTNER.png",
            HYPESQUAD_EVENTS: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/HYPESQUAD_EVENTS.png",
            BUGHUNTER_LEVEL_1: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/BUGHUNTER_LEVEL_1.png",
            HOUSE_BRAVERY: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/HOUSE_BRAVERY.png",
            HOUSE_BRILLIANCE: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/HOUSE_BRILLIANCE.png",
            HOUSE_BALANCE: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/HOUSE_BALANCE.png",
            EARLY_SUPPORTER: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/EARLY_SUPPORTER.png",
            EARLY_VERIFIED_DEVELOPER: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/EARLY_VERIFIED_DEVELOPER.png",
            ACTIVEDEVELOPER: "https://media.discordapp.net/attachments/1049928797014728714/1053553568105373746/imagem_2022-12-17_030519190-removebg-preview.png",
            ACTIVE_DEVELOPER: "https://media.discordapp.net/attachments/1049928797014728714/1053553568105373746/imagem_2022-12-17_030519190-removebg-preview.png",
            VERIFIED_DEVELOPER: "https://raw.githubusercontent.com/queendeveloperbr/wu-zi-mu-2.0/master/utils/img/png/badges/EARLY_VERIFIED_DEVELOPER.png"
        }

        let flags = author.user.flags.toArray().filter(x => !['EARLY_VERIFIED_DEVELOPER', 'PARTNERED_SERVER_OWNER'].includes(x))


        for (let i = 0; i < flags.length; i++) {
            let img = await loadImage(badges[flags[i]])

            const BRAND_SIZE = 44
            const poxZ = height - BRAND_SIZE - 12
            const height_margin = (450)

            const poxX = width - (height_margin * i / 7) - BRAND_SIZE - 10
            ctx.drawImage(img, poxX, poxZ, BRAND_SIZE, BRAND_SIZE)
        }
        return canvas.toBuffer()
    }
}