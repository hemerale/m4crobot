/*
	Hemerale - 2022
				*/

require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { video, bannedWords, welcomeEmbed, welcomeDmEmbed } = require("./config");

const {
    DISCORD_TOKEN,
    WELCOME_CHANNEL_ID,
    LEAVE_CHANNEL_ID,
    WELCOME_ROLE_NAME = "User",
    EXEMPT_ROLE_IDS = "",
} = process.env;

if (!DISCORD_TOKEN) {
    console.error("Errore: variabile d'ambiente DISCORD_TOKEN non impostata. Copia .env.example in .env e compilalo.");
    process.exit(1);
}

const exemptRoleIds = EXEMPT_ROLE_IDS.split(",").map(id => id.trim()).filter(Boolean);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

// Avviso per quando il bot diventa online
client.on("ready", () => {
    console.log("il bot è ora online");
    client.user.setActivity("YGN", { type: 3 }); // 3 = Watching
});

// Messaggio di benvenuto agli utenti appena entrati
client.on("guildMemberAdd", async (member) => {
    const ruolo = member.guild.roles.cache.find(r => r.name === WELCOME_ROLE_NAME);
    if (ruolo) {
        await member.roles.add(ruolo).catch(err => console.error("Impossibile assegnare il ruolo:", err));
    } else {
        console.warn(`Ruolo "${WELCOME_ROLE_NAME}" non trovato nel server.`);
    }

    const embedBenvenuto = new EmbedBuilder()
        .setTitle(welcomeEmbed.title)
        .setColor(welcomeEmbed.color)
        .setDescription(welcomeEmbed.description(member.id))
        .setImage(welcomeEmbed.image);

    const canale = WELCOME_CHANNEL_ID && client.channels.cache.get(WELCOME_CHANNEL_ID);
    if (canale) {
        canale.send({ embeds: [embedBenvenuto] }).catch(err => console.error("Impossibile inviare il messaggio di benvenuto:", err));
    }

    const embedBenvenutoDm = new EmbedBuilder()
        .setTitle(welcomeDmEmbed.title)
        .setColor(welcomeDmEmbed.color)
        .setDescription(welcomeDmEmbed.description)
        .setImage(welcomeDmEmbed.image);

    member.send({ embeds: [embedBenvenutoDm] }).catch(() => {
        // L'utente potrebbe avere i DM disabilitati, non è un errore critico
    });
});

// Saluto agli utenti appena usciti
client.on("guildMemberRemove", (member) => {
    const canale = LEAVE_CHANNEL_ID && client.channels.cache.get(LEAVE_CHANNEL_ID);
    if (canale) {
        canale.send(`<@${member.id}> è uscito... -1 :( `).catch(err => console.error("Impossibile inviare il messaggio di uscita:", err));
    }
});

// Comandi personalizzati + sistema di moderazione
client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const contenuto = message.content.toLowerCase();

    if (contenuto === "che cosa guardo?") {
        message.channel.send(video[Math.floor(Math.random() * video.length)]);
        return;
    }

    if (contenuto === "banana") {
        message.react("🍌").catch(err => console.error("Impossibile reagire al messaggio:", err));
        return;
    }

    // La moderazione si applica solo ai messaggi in un server, non nei DM
    if (!message.guild || !message.member) return;

    const esente = exemptRoleIds.some(id => message.member.roles.cache.has(id));
    if (esente) return;

    const trovata = bannedWords.some(parola => contenuto.includes(parola.toLowerCase()));
    if (trovata) {
        message.delete().catch(err => console.error("Impossibile eliminare il messaggio:", err));
    }
});

client.login(DISCORD_TOKEN);

/* Messaggio contenente un embed con le regole del server
        client.on("messageCreate", (message) => {
        if (message.content == "regole") {
            var embed = new Discord.MessageEmbed()
                .setTitle("REGOLE")
                .setColor("00FF00")
                .setDescription(`
1. Sii rispettoso (può portare il ban)
Devi rispettare tutti gli utenti, indipendentemente dai tuoi gusti nei loro confronti. Tratta gli altri come vorresti essere trattato.
(1a. ovviamente l'ironia può essere accettata, dipende dal contesto)
2. Nessun linguaggio inappropriato (può portare il ban)
L'uso di volgarità non è proibito ma è consigliabile limitarla. Tuttavia, è vietato qualsiasi linguaggio dispregiativo nei confronti di qualsiasi utente.
(2a. Questo include il divieto atteggiamenti discriminatori o minaccie di morte)
3. Nessuna pubblicità (time out di 1 settimana, se succede una seconda volta ban)
Non spammare il tuo canale o profilo in altri canali oltre al canale apposito
4. Nessun materiale NSFW (BAN)
Questo è un server della community di m4croxx e non intende condividere questo tipo di materiale.
5. Niente spam di messaggi privi di senso (BAN)
non è consentito spammare messaggi, anche se non ci sarà nessuna slowmode, il bot ti muterà in automatico per non infastidire nessuno
6. Nessun nome e immagine del profilo offensivi (WARN e poi BAN)
Ti verrà chiesto di cambiare il tuo nome o la tua immagine se lo staff li ritiene inappropriati.
7. Raid al server (ISTANT BAN)
Non sono consentiti raid o menzioni di raid.
8. Minacce dirette e indirette (ISTANT BAN)
Le minacce ad altri utenti di DDoS, Violenze, DoX e altre minacce dannose sono assolutamente vietate.
9. Argomenti Sensibili
Parlare di argomenti sensibili come orientamenti politici o religiosi è sconsigliato, anche se finché non offensivo verso nessuno è consentito
(9a. Non è possibile revocare le punizioni intraprese dagli admin in situazioni simili, avete la libertà di parlare di quel che preferite ma vi prendete la responsabilità.)
(9b. Le possibilità che vengano assegnate punizioni di gruppo in base alle infrazioni commesse aumentano, e anche in questo caso sono irrevocabili.)
10. No a argomenti legati a attività illegali
Ciò include tutti i crimini previsti dalla legge italiana, e il server non si assume nessuna responsabilità dei possibili argomenti trattati dai membri.
(10a. Gli Admin si riservano il diritto di analizzare ogni situazione e selezionare la giusta punizione, che in ogni caso è irrevocabile.)
(10b. I membri che sentono parlare di possibili argomenti che violano queste regole sono tenuti a segnalarlo, in modo da evitare punizioni ingiuste.)
11. Usa i canali rispettando il loro topic (solo elimino dei messaggi, poi può portare a brevi time out)
Ad esempio nella chat generale sei libero di parlare di quel che preferisci, ma in una chat dedicata bisogna seguire il suo argomento.
12. Mantieni la calma nei canali vocali (ruolo mutato, porta fino al ban permanente)
Questo include il divieto di sovrapporre la tua voce a quelle altrui eccessivamente, di urlare o fare errape.
(12a. In casi come questo è consigliato segnalare l'utente allo staff e corredare testimoni.)
(12b. Situazioni simili sono altamente situazionali quindi c'è da aspettarsi diverse segnalazioni prima di assegnare punizioni effettive al utente.)
(12c. Soundboard e modifiche vocali non sono bannabili se non altamente fastidiose, ad esempio non bisogna spammare le soundboard)
                `)

            message.channel.send({ embeds: [embed] })
        }
    })
*/
