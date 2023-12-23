import { Container, Text } from "pixi.js";
import { color, font, fontSize } from "../ui/tokens";
import { Button } from "../ui/Button";
import { navigation } from "../utils/navigation";
import { HomeScreen } from "./HomeScreen";

const HOW_TO_PLAY = `
  Tap on any adjacent blocks of the same type to make them all disappear.
  Clear larger sets for more points. That's it.
`.replace(/\n/g, " ").trim()

const ABOUT = `
  This is one of many versions of this game.  This particular one was built for my mother
  since I don't know how long the last version I made will keep running. 
`.replace(/\s+/mg, " ").trim()

/** The first screen that shows up after loading */
export class AboutScreen extends Container {
  public static assetBundles = ['common'];
  private helpHeader: Text;
  private helpBody: Text;
  private aboutHeader: Text;
  private aboutBody: Text;
  private backButton: Button;
  
  constructor() {
    super();
    this.helpHeader = this.addChild(new Text("How to Play", {
      fill: color.purple,
      fontFamily: font.flavor,
      fontSize: fontSize.mediumLarge,
      wordWrap: true,
      wordWrapWidth: 400,
    }))
    this.helpBody = this.addChild(new Text(HOW_TO_PLAY, {
      fill: color.dark,
      fontFamily: font.ui,
      fontSize: fontSize.medium,
      wordWrap: true,
      wordWrapWidth: 400,
    }))
    this.aboutHeader = this.addChild(new Text("About", {
      fill: color.purple,
      fontFamily: font.flavor,
      fontSize: fontSize.mediumLarge,
      wordWrap: true,
      wordWrapWidth: 400,
    }))
    this.aboutBody = this.addChild(new Text(ABOUT, {
      fill: color.dark,
      fontFamily: font.ui,
      fontSize: fontSize.medium,
      wordWrap: true,
      wordWrapWidth: 400,
    }))

    this.backButton = this.addChild(new Button({text: "Great!"}))
    this.backButton.onpointertap = () => {
      navigation.showScreen(HomeScreen)
    }
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {

    const centerX = width * 0.5
    
    let top = 50;
    const sections = [this.helpHeader, this.helpBody, this.aboutHeader, this.aboutBody]
    sections.forEach((text) => {
      if (text === this.aboutHeader) {
        // Add extra gap before header
        top += 40;
      }
      text.anchor.set(0.5,0);
      text.x = centerX;
      text.y = top;
      top += text.height;
    })

    top += 40
    this.backButton.anchor.set(0.5, 0)
    this.backButton.x = centerX;
    this.backButton.y = top;
  }

  public async hide() {

  }


}