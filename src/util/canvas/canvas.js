const Color = require('../others/color')

let Canvas = {}

try {
    Canvas = require('canvas')
} catch (e) { }

const { createCanvas, Image, loadImage } = Canvas
const moment = require('moment');

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
}