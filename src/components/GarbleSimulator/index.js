import { useState } from 'react';
import Heading from '@theme/Heading';
import '../../css/mui.css';
// import styles from './styles.module.css';

function SpeechGetOOCRanges(Message) {
  let ranges = [];
  let startIndex = 0;
  let endIndex = -1;
  do
  {
    // Find the next opening bracket after the last closing bracket
    startIndex = Message.indexOf("(", endIndex+1);
    // If no opening bracket was found, there is no more OOC section and we stop
    if(startIndex < 0) { break; }

    // Find the next closing bracket after the last opening bracket
    endIndex = Message.indexOf(")", startIndex);
    // If no closing bracket was found, we use the last character of the string as end index
    if(endIndex < 0) { endIndex = Message.length - 1; }

    // Add the OOC range with start postition and length to the ranges list
    ranges.push({ start: startIndex, length: (endIndex - startIndex + 1) });
  }while(1);

  return ranges;
}

function SpeechIndexInOocRange(index, oocRanges)
{
  for(let range of oocRanges)
  {
    if(index >= range.start && index < range.start + range.length) { return true; }
  }
  return false;
}

function isPunctuationOrSpace(character) {
  const punctionOrSpace = /\p{P}|\p{Z}|\p{S}/u;
  return punctionOrSpace.test(character);
}

function isAccentedOrLatinCharacter(character) {
  return 'áàãâéèêíìîõóòôúùûñç'.includes(character);
}

function SpeechTransformBabyTalk(text) {
  if (typeof text !== "string") text = "";

  let inOOC = false;
  let transformed = "";
  const oocRanges = SpeechGetOOCRanges(text);
  for (let charIdx = 0; charIdx < text.length; charIdx++) {
    var char = text.charAt(charIdx).toLowerCase();
    inOOC = SpeechIndexInOocRange(charIdx, oocRanges);
    if (inOOC) {
      transformed += text.charAt(charIdx);
      continue;
    }

    if ('kl'.includes(char)) transformed += 'w';
    else if (char == "s") transformed += 'sh';
    else if (char == "t") transformed += 'th';
    else if (isPunctuationOrSpace(char) || char.match('[a-z]')) transformed += char;
    // Let's do light Chinese garbling for now for ABDL.
    // else if (isChineseCharacter(char)) transformed += doChineseGarbling(char, 1);
  }
  return transformed;
}

function SpeechTransformGagGarble(text, intensity, ignoreOOC = false) {
  // Variables to build the new string and check if we are in a parentheses
  let transformed = "";
  let inOOC = false;
  if (text == null) text = "";
  if (intensity === 0) return text;

  const oocRanges = SpeechGetOOCRanges(text);

  for (let L = 0; L < text.length; L++) {
    const HUnnormalized = text.charAt(L);
    const H = text.charAt(L).toLowerCase();
    const isCaps = HUnnormalized.toUpperCase() === HUnnormalized;
    inOOC = (!ignoreOOC && SpeechIndexInOocRange(L, oocRanges));

    /** @type {(str: string) => string} */
    const capitalize = isCaps ? (i) => i.toUpperCase() : (i) => i;

    // GagTotal4 always returns mmmmm and muffles some frequent letters entirely, 75% least frequent letters
    if (intensity >= 20) {
      if (inOOC) transformed += text.charAt(L);
      else {
        if (isPunctuationOrSpace(H)) transformed += H;
        else if ('zqjxkvbywgpfucdlhr'.includes(H)) transformed += ' ';
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);
        else transformed += capitalize("m");
      }
    }

    // GagTotal3 always returns mmmmm and muffles some relatively frequent letters entirely, 50% least frequent letters
    else if (intensity >= 16) {
      if (inOOC) transformed += text.charAt(L);
      else {
        if (isPunctuationOrSpace(H)) transformed += H;
        else if ('zqjxkvbywgpf'.includes(H)) transformed += ' ';
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);
        else transformed += capitalize("m");
      }
    }

    // GagTotal2 always returns mmmmm and muffles some less frequent letters entirely; 25% least frequent letters
    else if (intensity >= 12) {
      if (inOOC) transformed += text.charAt(L);
      else {
        if (isPunctuationOrSpace(H)) transformed += H;
        else if ('zqjxkv'.includes(H)) transformed += ' ';
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);
        else transformed += capitalize("m");
      }
    }

    // Total gags always returns mmmmm
    else if (intensity >= 10) {
      if (inOOC) transformed += text.charAt(L);
      else {
        if (isPunctuationOrSpace(H)) transformed += H;
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);
        else transformed += capitalize("m");
      }
    }

    // VeryHeavy garble - Close to no letter stays the same
    else if (intensity >= 8) {
      if (!inOOC) {

        // Regular characters
        if ('aeiouy'.includes(H)) transformed += capitalize("e");
        else if ('jklr'.includes(H)) transformed += capitalize("a");
        else if ('szh'.includes(H)) transformed += capitalize("h");
        else if ('dfgnmwtcqxpv'.includes(H)) transformed += capitalize("m");
        else if (isPunctuationOrSpace(H) || H == 'b') transformed += capitalize(H);

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        else if ('аеиоуюля'.includes(H)) transformed += capitalize("e");
        else if ('сйх'.includes(H)) transformed += capitalize("к");
        else if ('жклру'.includes(H)) transformed += capitalize("a");
        else if ('зсгй'.includes(H)) transformed += capitalize("г");
        else if ('брвы'.includes(H)) transformed += capitalize("ф");
        else if ('дфгнм'.includes(H)) transformed += capitalize("м");
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }

    // Heavy garble - Almost no letter stays the same
    else if (intensity >= 7) {
      if (!inOOC) {

        // Regular characters
        if ('aeiouyt'.includes(H)) transformed += capitalize("e");
        else if ('cqx'.includes(H)) transformed += capitalize("k");
        else if ('jklrw'.includes(H)) transformed += capitalize("a");
        else if ('szh'.includes(H)) transformed += capitalize("h");
        else if ('bpv'.includes(H)) transformed += capitalize("f");
        else if ('dfgnm'.includes(H)) transformed += capitalize("m");
        else if (isPunctuationOrSpace(H)) transformed += H;

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        else if ('аеиоуюля'.includes(H)) transformed += capitalize("e");
        else if ('сйх'.includes(H)) transformed += capitalize("к");
        else if ('жклру'.includes(H)) transformed += capitalize("a");
        else if ('зсгй'.includes(H)) transformed += capitalize("г");
        else if ('брвы'.includes(H)) transformed += capitalize("ф");
        else if ('дфгнм'.includes(H)) transformed += capitalize("м");
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }

    // Medium garble - Some letters stays the same
    else if (intensity >= 6) {
      if (!inOOC) {

        // Regular characters
        if ('eiouyt'.includes(H)) transformed += capitalize("e");
        else if ('cqxk'.includes(H)) transformed += capitalize("k");
        else if ('jlrwa'.includes(H)) transformed += capitalize("a");
        else if ('szh'.includes(H)) transformed += capitalize("h");
        else if ('bpv'.includes(H)) transformed += capitalize("f");
        else if ('dfgm'.includes(H)) transformed += capitalize("m");
        else if (isPunctuationOrSpace(H) || H == 'n') transformed += capitalize(H);

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        else if ('аеиоуюля'.includes(H)) transformed += capitalize("e");
        else if ('сйх'.includes(H)) transformed += capitalize("к");
        else if ('жклру'.includes(H)) transformed += capitalize("a");
        else if ('зсгй'.includes(H)) transformed += capitalize("г");
        else if ('брвы'.includes(H)) transformed += capitalize("ф");
        else if ('дфгнм'.includes(H)) transformed += capitalize("м");
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }

    // Normal garble, keep vowels and a few letters the same
    else if (intensity >= 5) {
      if (!inOOC) {

        // Regular characters
        if ('vbct'.includes(H)) transformed += capitalize("e");
        else if ('qkx'.includes(H)) transformed += capitalize("k");
        else if ('wyjlr'.includes(H)) transformed += capitalize("a");
        else if ('sz'.includes(H)) transformed += capitalize("h");
        else if ('df'.includes(H)) transformed += capitalize("m");
        else if (H == "p") transformed += capitalize("f");
        else if (H == "g") transformed += capitalize("n");
        else if (isPunctuationOrSpace(H) || 'aeioumnh'.includes(H)) transformed += capitalize(H);

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        else if ('вфбп'.includes(H)) transformed += capitalize("фы");
        else if ('гкх'.includes(H)) transformed += capitalize("к");
        else if ('вужлр'.includes(H)) transformed += capitalize("а");
        else if ('ся'.includes(H)) transformed += capitalize("х");
        else if ('дф'.includes(H)) transformed += capitalize("м");
        else if (H == "р") transformed += capitalize("ф");
        else if (H == "г") transformed += capitalize("н");
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }

    // Easy garble, keep vowels and a some letters the same
    else if (intensity >= 4) {
      if (!inOOC) {

        // Regular characters
        if ('vbct'.includes(H)) transformed += capitalize("e");
        else if ('qkx'.includes(H)) transformed += capitalize("k");
        else if ('wyjlr'.includes(H)) transformed += capitalize("a");
        else if ('sz'.includes(H)) transformed += capitalize("s");
        else if (H == "d") transformed += capitalize("m");
        else if (H == "p") transformed += capitalize("f");
        else if (H == "g") transformed += capitalize("h");
        else if (isPunctuationOrSpace(H) || 'aeioumnhf'.includes(H)) transformed += capitalize(H);

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        if ('вфбп'.includes(H)) transformed += capitalize("фы");
        else if ('гкх'.includes(H)) transformed += capitalize("к");
        else if ('вужлр'.includes(H)) transformed += capitalize("а");
        else if ('ся'.includes(H)) transformed += capitalize("х");
        else if ('дф'.includes(H)) transformed += capitalize("м");
        else if (H == "р") transformed += capitalize("ф");
        else if (H == "г") transformed += capitalize("н");
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }

    // Light garble, half of the letters stay the same
    else if (intensity >= 3) {
      if (!inOOC) {

        // Regular characters
        if ('ct'.includes(H)) transformed += capitalize("e");
        else if ('qkx'.includes(H)) transformed += capitalize("k");
        else if ('jlr'.includes(H)) transformed += capitalize("a");
        else if (H == "s") transformed += capitalize("z");
        else if (H == "z") transformed += capitalize("s");
        else if (H == "f") transformed += capitalize("h");
        else if ('dmg'.includes(H)) transformed += capitalize("m");
        else if ('bhnvwpaeiouy'.includes(H) || isPunctuationOrSpace(H)) transformed += capitalize(H);

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        else if ('чц'.includes(H)) transformed += capitalize("e");
        else if ('йфв'.includes(H)) transformed += capitalize("к");
        else if ('длщя'.includes(H)) transformed += capitalize("a");
        else if (H == "з") transformed += capitalize("c");
        else if (H == "с") transformed += capitalize("з");
        else if ('дфмг'.includes(H)) transformed += capitalize("м");
        else if ('апрокенмит'.includes(H)) transformed += capitalize(H);
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }

    // Very Light garble, most of the letters stay the same
    else if (intensity >= 2) {
      if (!inOOC) {

        // Regular characters
        if (H == "t") transformed += 'e';
        else if ('cqkx'.includes(H)) transformed += capitalize("k");
        else if ('jlr'.includes(H)) transformed += capitalize("a");
        else if ('dmg'.includes(H)) transformed += capitalize("m");
        else if ('bhnvwp'.includes(H) || isPunctuationOrSpace(H) || 'aeiouyfsz'.includes(H)) transformed += capitalize(H);

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        else if ('чц'.includes(H)) transformed += capitalize("e");
        else if ('йфв'.includes(H)) transformed += capitalize("к");
        else if ('длщя'.includes(H)) transformed += capitalize("a");
        else if (H == "з") transformed += capitalize("c");
        else if (H == "с") transformed += capitalize("з");
        else if ('дфмг'.includes(H)) transformed += capitalize("м");
        else if ('апрокенмит'.includes(H)) transformed += capitalize(H);
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }

    // Almost no garble, only some letters change
    else if (intensity >= 1) {
      if (!inOOC) {

        // Regular characters
        if (H == "t") transformed += 'h';
        else if ('cqkx'.includes(H)) transformed += capitalize("k");
        else if ('dmg'.includes(H)) transformed += capitalize("m");
        else if ('bhnvwpaeiouyfszjlr'.includes(H) || isPunctuationOrSpace(H)) transformed += capitalize(H);

        // Accents/Latin characters
        else if (isAccentedOrLatinCharacter(H)) transformed += stripDiacriticsFromCharacter(H, intensity, isCaps);

        // Cyrillic characters
        else if ('чц'.includes(H)) transformed += capitalize("e");
        else if ('йфв'.includes(H)) transformed += capitalize("к");
        else if ('длщя'.includes(H)) transformed += capitalize("a");
        else if (H == "з") transformed += capitalize("c");
        else if (H == "с") transformed += capitalize("з");
        else if ('дфмг'.includes(H)) transformed += capitalize("м");
        else if ('апрокенмит'.includes(H)) transformed += capitalize(H);
        //else if (isChineseCharacter(H)) transformed += doChineseGarbling(H, intensity);

      } else transformed += text.charAt(L);
    }
  }

  return transformed;
}

function SpeechTransformStutter(text, intensity) {
  if (typeof text !== "string") text = "";

  let inOOC = false;
  let inWord = 1;
  let seed = text.length;
  const oocRanges = SpeechGetOOCRanges(text);
  // Loops in all letters to create a stuttering effect
  for (let L = 0; L < text.length; L++) {

    // Do not stutter the letters between parentheses
    const char = text.charAt(L).toLowerCase();
    inOOC = SpeechIndexInOocRange(L, oocRanges);

    // If we are not between brackets and at the start of a word, there's a chance to stutter that word
    if (!inOOC && inWord >= 0 && (char.match(/[[a-zа-яё]/i))) {

      // Generate a pseudo-random number using a seed, so that the same text always stutters the same way
      let R = Math.sin(seed++) * 10000;
      R = R - Math.floor(R);
      R = Math.floor(R * 10) + intensity;
      if (inWord == 1 || R >= 10) {
        text = text.substring(0, L) + text.charAt(L) + "-" + text.substring(L, text.length);
        L += 2;
      }
      inWord = -1;
    }

    if (char === " ") inWord = 0;
  }

  return text;
}

function SpeechTransformProcess(text, gagIntensity, stutterIntensity, shouldBabyTalk) {
  const transforms = [];
  if (shouldBabyTalk) {
    transforms.push("babyTalk");
    text = SpeechTransformBabyTalk(text);
  }
  if (gagIntensity > 0) {
    transforms.push("gagGarble");
    text = SpeechTransformGagGarble(text, gagIntensity, false);
  }
  if (stutterIntensity > 0) {
    transforms.push("stutter");
    text = SpeechTransformStutter(text, stutterIntensity);
  }
  return { effects: transforms, text };
}

function antiGarble(msg, garbleLevel, antiStutter, antiBabyTalk, gagIntensity, stutterIntensity, shouldBabyTalk) {
  let process = { effects: [], text: msg };
  let originalMsg;

  if (garbleLevel !== "off") {
    process = SpeechTransformProcess(msg, gagIntensity, stutterIntensity, shouldBabyTalk);
    if (gagIntensity > 0 ||
      (antiBabyTalk === "remove" && shouldBabyTalk) ||
      (antiStutter === "remove" && stutterIntensity > 0)
    ) {
      if (garbleLevel !== "full") {
        originalMsg = msg;
        if (antiBabyTalk === "preserve" && shouldBabyTalk) {
          originalMsg = SpeechTransformBabyTalk(originalMsg);
        }
        if (["low", "medium", "high"].includes(garbleLevel)) {
          const int = Math.min(gagIntensity, { low: 1, medium: 3, high: 5 }[garbleLevel]);
          originalMsg = SpeechTransformGagGarble(originalMsg, int);
        }
        if (antiStutter === "preserve" && stutterIntensity > 0) {
          originalMsg = /*fbcSettings.stutters ? stutterWord(originalMsg, true).results.join("") :*/ SpeechTransformStutter(originalMsg, stutterIntensity);
        }
      }
    }
    if (process.text === originalMsg) originalMsg = undefined;
  }

  return { processedText: process.text, originalMsg };
}

export default function GarbleSimulator({ defaultText }){
  const [garbleLevel, setGarbleLevel] = useState('none'); 
  const [antiStutter, setAntiStutter] = useState('ignore'); 
  const [antiBabyTalk, setAntiBabyTalk] = useState('remove');
  const [gagIntensity, setGagIntensity] = useState(6); 
  const [stutterIntensity, setStutterIntensity] = useState(3); 
  const [shouldBabyTalk, setShouldBabyTalk] = useState(false);
  const [text, setText] = useState(defaultText || "meow");
  const { processedText, originalMsg }= antiGarble(text, garbleLevel, antiStutter, antiBabyTalk, gagIntensity, stutterIntensity, shouldBabyTalk);
  return (
    <>
      <Heading as="h3" class="margin-bottom--md margin-top--none">WCE options:</Heading>
      <div class="row">
        <div class="col mui-select">
          <select value={garbleLevel} onChange={e => setGarbleLevel(e.target.value)}>
            <option value="none">none (complete ungarbling)</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="full">full (no ungarbling)</option>
            <option value="off">off (whisper only)</option>
          </select>
          <label>Garble Level</label>
        </div>
        <div class="col mui-select">
          <select value={antiStutter} onChange={e => setAntiStutter(e.target.value)}>
            <option value="remove">remove</option>
            <option value="ignore">ignore</option>
            <option value="preserve">preserve</option>
          </select>
          <label>Stutters</label>
        </div>
        <div class="col mui-select">
          <select value={antiBabyTalk} onChange={e => setAntiBabyTalk(e.target.value)}>
            <option value="remove">remove</option>
            <option value="ignore">ignore</option>
            <option value="preserve">preserve</option>
          </select>
          <label>Baby Talk</label>
        </div>
      </div>
      <Heading as="h3" class="margin-bottom--md margin-top--none">BC state:</Heading>
      <div class="row">
        <div class="col mui-textfield mui-textfield--float-label">
          <input type="number" value={gagIntensity} onChange={e => setGagIntensity(e.target.value)} min={0} max={20}/>
          <label>Gag Intensity</label>
        </div>
        <div class="col mui-textfield mui-textfield--float-label">
          <input type="number" value={stutterIntensity} onChange={e => setStutterIntensity(e.target.value)} min={0} max={5}/>
          <label>Stutter Intensity</label>
        </div>
        <div class="col mui-checkbox">
          <label>
            <input type="checkbox" checked={shouldBabyTalk} onChange={e => setShouldBabyTalk(e.target.checked)}/>
            Should Baby Talk
          </label>
        </div>
      </div>
      <Heading as="h3" class="margin-bottom--md margin-top--none">Simulated garbled message:</Heading>
      <div class="alert alert--secondary">
        {processedText}
        {originalMsg && (
        <>
          <br/>
          <span>[{originalMsg}]</span>
        </>
      )}
      </div>
      <div class="margin-top--md mui-textfield mui-textfield--float-label">
        <input value={text} onChange={e => setText(e.target.value)}/>
        <label>Text</label>
      </div>
    </>
  )
}