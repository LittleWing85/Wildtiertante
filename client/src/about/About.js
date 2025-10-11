import { Link } from "react-router-dom";

export default function About() {
    return (
        <section>
            <p>Liebe Wildtierfreunde,</p>
            <p className="topSpace">
                schön, dass ihr auf meiner Seite gelandet seid!
            </p>
            <p className="topSpaceSmall">
                Meine große Leidenschaft gilt der Aufzucht von verwaisten
                Wildtierbabys. Auf dieser Seite stelle ich euch alle Tipps und
                Infos zur Verfügung, die ich in meinen elf Jahren als Ersatzmama
                für verwaiste Tierbabies gesammelt habe.
            </p>
            <p className="topSpaceSmall">
                <Link to={"/information"}>Hier</Link> findet ihr ausführliche{" "}
                <b>Informationen zum Aufziehen von verwaisten Jungtieren</b>.
                Wichtig: Diese Informationen richten sich ausschließlich an
                Zieheltern, die bereits über Fachwissen verfügen - z.B.
                Tierpfleger*innen, TFAs, Tierschutzzentren und Pflegestellen,
                die schon Babytiere aufgezogen haben. Jungtiere gehören IMMER in
                die Hände von Fachmenschen, um ihnen eine Überlebenschance zu
                sichern. Auf keinen Fall sollten unerfahrene Finder Jungtiere
                alleine aufziehen.
            </p>
            <p className="topSpaceSmall">
                Damit ihr beim Päppeln eurer Schützlinge den Überblick behaltet,
                habe ich ein{" "}
                <b>
                    spezielles <Link to={"/documentationTool"}>Tool</Link>
                </b>{" "}
                entwickelt. Es zeigt euch an, welche Tierbabys als nächstes und
                in welcher Reihenfolge gefüttert werden müssen. Das ist
                besonders nützlich, wenn ihr sehr viele Tiere aufzieht und/oder
                mehrere Ersatzeltern eure Kleinen in Schichten versorgen.
                Außerdem rechnet das Tool anhand von Körpergewicht und Alter
                automatisch aus, welche Milchmenge eure Kleinen pro Fütterung
                ungefähr bekommen sollten. So braucht ihr nicht bei jeder
                Fütterung von vorne losrechnen. Schaut euch das{" "}
                <Link to={"/documentationTool"}>Tool</Link> einfach an - es hält
                weitere tolle und hilfreiche Funktionen für euch bereit!
            </p>
            <p className="topSpaceSmall">
                Nun noch <b>ein paar Infos zu mir</b>: Mein Wissen stammt von
                verschiedenen, auf Wildtiere spezialisierte Seminare und den
                Erfahrungen aus elf Jahren, in denen ich ehrenamtlich und
                hauptberuflich in verschiedenen Wildtierstationen
                Norddeutschlands gearbeitet habe. Dabei durfte ich Finder von
                Wildtieren telefonisch beraten, erste Hilfe für Neuankömmlinge
                leisten und verwaiste Tierbabies aufziehen. Einige besonders
                kleine und empfindliche Flaschenkinder habe ich als
                ehrenamtliche Pflegestelle zu Hause rund um die Uhr versorgt.
                Bei mir leben außerdem dauerhaft zwei wunderbare Kaninchen, die
                ich aus dem Tierschutz adoptiert habe.
            </p>
            <p className="topSpace">
                Ich wünsche euch viel Spaß auf meiner Seite und freue mich über
                euer Feedback, Anregungen, Fragen und Verbesserungsvorschläge!
            </p>
            <p className="topSpaceSmall">Eure Wildtiertante</p>
        </section>
    );
}
