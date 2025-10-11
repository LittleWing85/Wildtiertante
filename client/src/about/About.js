import { Link } from "react-router-dom";

export default function About() {
    return (
        <section>
            <p>
                Liebe Päppler, <br />
                <br />
                schön, dass ihr auf meiner Seite gelandet seid!
            </p>
            <p>
                Ihr findet <Link to={"/information"}>hier</Link> Informationen
                zur Jungtieraufzucht von Eichhörnchen, Mäusen und Kaninchen.
                Wichtig: Diese Informationen richten sich ausschließlich an
                Zieheltern, die bereits über Fachwissen verfügen - z.B.
                Tierpfleger*innen, TFAs, Tierschutzzentren und Pflegestellen,
                die bereits Babytiere anderer Tierarten aufgezogen haben.
                Jungtiere gehören IMMER in die Hände von Fachmenschen, um ihnen
                eine Überlebenschance zu sichern. NIEMALS sollten unerfahrene
                Finder Jungtiere alleine aufziehen.
            </p>
            <p>
                Das Herzstück meiner Webseite bildet die{" "}
                <Link to={"/documentationTool"}>App</Link>, die euch bei den
                Milchfütterungen aller Tierarten unterstützt. Sie zeigt euch an,
                welche Tiere als nächstes und in welcher Reihenfolge gefüttert
                werden müssen, damit ihr den Überblick behaltet, wenn ihr sehr
                viele Tiere aufzieht und/oder mehrere Ersatzeltern eure Kleinen
                in Schichten versorgen. Außerdem rechnet sie euch automatisch
                aus, welche Milchmenge eute Kleinen pro Fütterung ungefähr
                bekommen sollten und überwacht die Gesamtmilchmenge pro Tag.
                Schaut euch die App an - sie hält noch tolle und hilfreiche
                weitere Funktionen für euch bereit!
            </p>
            <p>
                Noch ein paar Infos zu mir: Ich habe ehrenamtlich und
                hauptberuflich 11 Jahre Erfahrung in der Aufzucht von Jungtieren
                in verschiedenen Stationen in Norddeutschland gesammelt,
                besonders kleine und empfindliche Flaschenkinder ehrenamtlich zu
                Hause als private Pflegestelle aufgezogen und zahlreiche
                Seminare zum Thema Jungtieraufzucht besucht. Bei mir zu Hause
                leben außerdem zwei Kaninchen, die ich aus dem Tierschutz
                übernommen habe.
            </p>
            <p>
                Ich wünsche euch viel Spaß auf meiner Seite und freue mich über
                euer Feedback, Anregungen, Fragen und Verbesserungsvorschläge!
                <br />
                <br />
                Eure Wildtiertante
            </p>
        </section>
    );
}
