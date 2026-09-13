// Contenuti e liste usate dal bot, separati dalla logica in index.js

module.exports = {
    // Titoli suggeriti dal comando "che cosa guardo?"
    video: [
        "guarda si PARTE e già la vita MI ODIA! - m4crovanilla #1",
        "guarda IRON e GRANO sono stati TROVATI! | m4crovanilla - ep 2",
        "guarda road to vittoria warzone su warzone!",
        "guarda la ultracraft ep 1!",
        "guarda Giochiamo a Fall guys tarocco - bro falls",
        "guarda Ho fatto il COLPO al DIAMOND CASINO' - GTA V",
        "guarda BEDWARS A CASO su HYPIXELS",
        "guarda CHE BELLA PIZZA! - cooking simulator",
        "guarda GUIDA e SPARATORIE su GTA per arrivare a 1M! - 1 Milione di V",
        "guarda ma se ANDASSIMO NEL NETHER? | m4crovanilla ep3",
        "guarda COME MAI ci sono dei VECCHETTI COSI'? - Just Die Alredy",
        "guarda 3 GIOCHI che l'umanità NON DOVEVA CONCEPIRE",
    ],

    // Parole/frammenti bloccati dal filtro automatico (case-insensitive)
    bannedWords: [
        "dlcorcl", "discord-gi", "nitrofree",
        "dio", "madonna", "gesù", "gesu", "sant", "porco",
        "froci", "nigg", "negr", "faggot", "coglion", "ritardat", "stronz",
    ],

    welcomeEmbed: {
        title: "Benvenuto 🤚",
        color: 0x00ff00,
        description: (memberId) =>
            `HEY! è entrato da noi <@${memberId}>, penso abbia sbagliato server... ti prego <@${memberId}> non uscire siamo soli :(`,
        image: "https://images-ext-2.discordapp.net/external/k1JCrsx1-syTOdPou3gZovS_sePviNcZBkv4AR4GcDc/https/cdn-longterm.mee6.xyz/plugins/welcome/images/740659333481758861/f5522a431af360aa56e92838847b5ad2bc8555948d4a5644408843420a55bb5b.png?width=1193&height=671",
    },

    welcomeDmEmbed: {
        title: "Perfavore",
        color: 0x7004fc,
        description: "Resta nel server ti prego siamo soli forse se siamo in tanti karen mi riporta i figli a casa... vabbè comunque ora che sei nel server puoi avere aggiornamenti sui video youtube e twitch di m4croxx :)",
        image: "https://images-ext-2.discordapp.net/external/k1JCrsx1-syTOdPou3gZovS_sePviNcZBkv4AR4GcDc/https/cdn-longterm.mee6.xyz/plugins/welcome/images/740659333481758861/f5522a431af360aa56e92838847b5ad2bc8555948d4a5644408843420a55bb5b.png?width=1193&height=671",
    },
};
