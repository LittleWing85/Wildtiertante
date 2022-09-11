import { NavLink } from "react-router-dom";

export default function About() {
    return (
        <section>
            <p>
                Feeding an orphaned wild animal baby regularly with the right
                amount of milk increases its chances of survival.
                Wildtiertante.de provides a tool to support you in organizing
                and documentating the feeding of your little patients. Open the
                tab{" "}
                <NavLink to="/newLitter">&quot;Add new Litter&quot;</NavLink> to
                enter information about how many patients you are caring for.
                You will find a list with the next feeding times for all your
                animals sorted by feeding time in the tab{" "}
                <NavLink to="/whosNext">&quot;Who&apos;s next?&quot;</NavLink>.
            </p>

            <div className="aboutImagesContainer">
                <img
                    className="aboutImage"
                    src="./media/Franziskustierheim-3136.JPG"
                ></img>
                <img
                    className="aboutImage"
                    src="./media/Franziskustierheim-3448.JPG"
                ></img>
            </div>
            <div className="aboutImagesContainer">
                <img
                    className="aboutImage"
                    src="./media/Franziskustierheim-3596.JPG"
                ></img>
                <img
                    className="aboutImage"
                    src="./media/IMG-20190722-WA0000.jpg"
                ></img>
            </div>
            <div className="aboutImagesContainer">
                <img
                    className="aboutImage"
                    src="./media/IMG_20210602_231415_5.jpg"
                ></img>
                <img
                    className="aboutImage"
                    src="./media/IMG_20180825_193615.jpg"
                ></img>
            </div>
        </section>
    );
}
