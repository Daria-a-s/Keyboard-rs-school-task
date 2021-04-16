const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    language: "en",
    caretPos: 0,
    sound: true,
    voice: false,
  },

  init() {
    let lang;
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard__key"
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
          element.focus();
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    let keyLayout = [
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
      "voice", "sound", "done", "space", "en", "arrL", "arrR",
    ];

    let keyLayoutShift = [
      "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?",
      "voice", "sound", "done", "space", "en", "arrL", "arrR",
    ];

    let keyLayoutRu = [
      "ё",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "backspace",
      "й",
      "ц",
      "у",
      "к",
      "е",
      "н",
      "г",
      "ш",
      "щ",
      "з",
      "х",
      "ъ",
      "\\",
      "caps",
      "ф",
      "ы",
      "в",
      "а",
      "п",
      "р",
      "о",
      "л",
      "д",
      "ж",
      "э",
      "enter",
      "shift",
      "я",
      "ч",
      "с",
      "м",
      "и",
      "т",
      "ь",
      "б",
      "ю",
      ".",
      "voice",
      "sound",
      "done",
      "space",
      "ru",
      "arrL",
      "arrR",
    ];

    let keyLayoutRuShift = [
      "Ё",
      "!",
      '"',
      "№",
      ";",
      "%",
      ":",
      "?",
      "*",
      "(",
      ")",
      "_",
      "+",
      "backspace",
      "й",
      "ц",
      "у",
      "к",
      "е",
      "н",
      "г",
      "ш",
      "щ",
      "з",
      "х",
      "ъ",
      "/",
      "caps",
      "ф",
      "ы",
      "в",
      "а",
      "п",
      "р",
      "о",
      "л",
      "д",
      "ж",
      "э",
      "enter",
      "shift",
      "я",
      "ч",
      "с",
      "м",
      "и",
      "т",
      "ь",
      "б",
      "ю",
      ",",
      "voice",
      "sound",
      "done",
      "space",
      "ru",
      "arrL",
      "arrR",
    ];

    let keyboardCodes = [
      "Backquote",
      "Digit1",
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7",
      "Digit8",
      "Digit9",
      "Digit0",
      "Minus",
      "Equal",
      "Backspace",
      "KeyQ",
      "KeyW",
      "KeyE",
      "KeyR",
      "KeyT",
      "KeyY",
      "KeyU",
      "KeyI",
      "KeyO",
      "KeyP",
      "BracketLeft",
      "BracketRight",
      "Backslash",
      "CapsLock",
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyH",
      "KeyJ",
      "KeyK",
      "KeyL",
      "Semicolon",
      "Quote",
      "Enter",
      "Shift",
      "KeyZ",
      "KeyX",
      "KeyC",
      "KeyV",
      "KeyB",
      "KeyN",
      "KeyM",
      "Comma",
      "Period",
      "Slash",
      "Voice",
      "Sound",
      "Done",
      "Space",
      "Lang",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (this.properties.language == "en" && !this.properties.shift)
      lang = keyLayout;
    else if (this.properties.language == "en" && this.properties.shift)
      lang = keyLayoutShift;
    else if (this.properties.language == "ru" && !this.properties.shift)
      lang = keyLayoutRu;
    else if (this.properties.language == "ru" && this.properties.shift)
      lang = keyLayoutRuShift;

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    lang.forEach((key) => {
      const keyElement = document.createElement("button");
      let c = 0;
      keyElement.id = String(keyboardCodes[keyLayout.indexOf(key)]);
      c++;
      let insertLineBreak;
      if (this.properties.language === "en")
        insertLineBreak =
          ["backspace", "\\", "enter", "/", "|", "?"].indexOf(key) !== -1;
      else
        insertLineBreak = ["backspace", "\\", "enter", "."].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      const textAr = document.querySelector(".use-keyboard-input");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          let soundBack = document.querySelector("#backspace");
          soundBack.currentTime = 0;
          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundBack.play();
            if (this.properties.caretPos > 0) {
              this.properties.value =
                this.properties.value.substring(
                  0,
                  this.properties.caretPos - 1
                ) + this.properties.value.substring(this.properties.caretPos);
              this.properties.caretPos--;
              setTimeout(() => {
                textAr.setSelectionRange(
                  this.properties.caretPos,
                  this.properties.caretPos
                );
                textAr.focus();
              }, 10);
            }
            this._triggerEvent("oninput");
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == "Backspace") {
              keyElement.classList.toggle("keyboard__key--pushed");
              this.properties.value =
                this.properties.value.substring(
                  0,
                  this.properties.caretPos - 1
                ) + this.properties.value.substring(this.properties.caretPos);
              this.properties.caretPos--;
              setTimeout(() => {
                textAr.setSelectionRange(
                  this.properties.caretPos,
                  this.properties.caretPos
                );
                textAr.focus();
              }, 10);
            }
          });
          document.addEventListener("keyup", (event) => {
            if (event.code == "Backspace")
              keyElement.classList.toggle("keyboard__key--pushed");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          let soundCap = document.querySelector("#caps");
          soundCap.currentTime = 0;
          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundCap.play();
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
            this._triggerEvent("oninput");
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == "CapsLock") {
              keyElement.classList.toggle("keyboard__key--pushed");
              this._toggleCapsLock();
              keyElement.classList.toggle(
                "keyboard__key--active",
                this.properties.capsLock
              );
            }
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          let soundE = document.querySelector("#enter");
          soundE.currentTime = 0;

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundE.play();
            this.properties.value =
              this.properties.value.substring(0, this.properties.caretPos) +
              "\n" +
              this.properties.value.substring(this.properties.caretPos);
            this.properties.caretPos++;
            setTimeout(() => {
              textAr.setSelectionRange(
                this.properties.caretPos,
                this.properties.caretPos
              );
              textAr.focus();
            }, 10);
            this._triggerEvent("oninput");
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == "Enter") {
              keyElement.classList.toggle("keyboard__key--pushed");
              this.properties.value =
                this.properties.value.substring(0, this.properties.caretPos) +
                "\n" +
                this.properties.value.substring(this.properties.caretPos);
              this.properties.caretPos++;
              setTimeout(() => {
                textAr.setSelectionRange(
                  this.properties.caretPos,
                  this.properties.caretPos
                );
                textAr.focus();
              }, 10);
            }
          });
          document.addEventListener("keyup", (event) => {
            if (event.code == "Enter")
              keyElement.classList.toggle("keyboard__key--pushed");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          let soundS;
          if (this.properties.language == "en")
            soundS = document.querySelector("#en");
          else soundS = document.querySelector("#ru");
          soundS.currentTime = 0;

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundS.play();
            this.properties.value =
              this.properties.value.substring(0, this.properties.caretPos) +
              " " +
              this.properties.value.substring(this.properties.caretPos);
            this.properties.caretPos++;
            setTimeout(() => {
              textAr.setSelectionRange(
                this.properties.caretPos,
                this.properties.caretPos
              );
              textAr.focus();
            }, 10);
            this._triggerEvent("oninput");
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == "Space") {
              keyElement.classList.toggle("keyboard__key--pushed");
              this.properties.value =
                this.properties.value.substring(0, this.properties.caretPos) +
                " " +
                this.properties.value.substring(this.properties.caretPos);
              this.properties.caretPos++;
              setTimeout(() => {
                textAr.setSelectionRange(
                  this.properties.caretPos,
                  this.properties.caretPos
                );
                textAr.focus();
              }, 10);
            }
          });
          document.addEventListener("keyup", (event) => {
            if (event.code == "Space")
              keyElement.classList.toggle("keyboard__key--pushed");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");
          let soundD;
          if (this.properties.language == "en")
            soundD = document.querySelector("#en");
          else soundD = document.querySelector("#ru");
          soundD.currentTime = 0;

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundD.play();
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "shift");
          keyElement.textContent = "shift";
          let soundSh = document.querySelector("#shift");
          soundSh.currentTime = 0;
          let flag = true

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundSh.play();
            if (this.properties.language == "en")
              this._toggleShift(keyLayout, keyLayoutShift);
            else this._toggleShift(keyLayoutRu, keyLayoutRuShift);
            keyElement.classList.toggle(
              "keyboard__key--dark",
              this.properties.shift
            );
            this._triggerEvent("oninput");
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == "ShiftLeft" || event.code == "ShiftRigth" && flag) {
              keyElement.classList.toggle("keyboard__key--pushed");
              if (this.properties.language == "en")
                this._toggleShift(keyLayout, keyLayoutShift);
              else this._toggleShift(keyLayoutRu, keyLayoutRuShift);
            }
            flag = false
          });
          document.addEventListener("keyup", (event) => {
            if (event.code == "ShiftLeft" || event.code == "ShiftRigth" && !flag) {
              keyElement.classList.toggle("keyboard__key--pushed");
              if (this.properties.language == "en")
                this._toggleShift(keyLayout, keyLayoutShift);
              else this._toggleShift(keyLayoutRu, keyLayoutRuShift);
            }
            flag = true;
          });

          break;

        case "en":
          keyElement.classList.add("keyboard__key--wideshift");
          keyElement.textContent = this.properties.language;
          let soundLa;
          if (this.properties.language == "en")
            soundLa = document.querySelector("#en");
          else soundLa = document.querySelector("#ru");
          soundLa.currentTime = 0;

          keyElement.addEventListener("click", () => {
            if (this.properties.language == "en") {
              this._changeLang(keyLayoutRu);
            } else if (this.properties.language == "ru") {
              this._changeLang(keyLayout);
            }
            if (this.properties.sound) soundLa.play();
            keyElement.textContent = this.properties.language;
            keyElement.classList.toggle(this.properties.language);
            this._triggerEvent("oninput");
          });
          break;

        case "arrL":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
          let soundAL;
          if (this.properties.language == "en")
            soundAL = document.querySelector("#en");
          else soundAL = document.querySelector("#ru");
          soundAL.currentTime = 0;

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundAL.play();
            textAr.setSelectionRange(
              this.properties.caretPos - 1,
              this.properties.caretPos - 1
            );
            if (this.properties.caretPos > 0) this.properties.caretPos--;
            textAr.focus();
            this._triggerEvent("oninput");
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == "ArrowLeft") {
              keyElement.classList.toggle("keyboard__key--pushed");
              if (this.properties.caretPos > 0) this.properties.caretPos--;
              textAr.focus();
            }
          });
          document.addEventListener("keyup", (event) => {
            if (event.code == "ArrowLeft")
              keyElement.classList.toggle("keyboard__key--pushed");
          });
          break;

        case "arrR":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
          let soundAR;
          if (this.properties.language == "en")
            soundAR = document.querySelector("#en");
          else soundAR = document.querySelector("#ru");
          soundAR.currentTime = 0;

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundAR.play();
            textAr.setSelectionRange(
              this.properties.caretPos + 1,
              this.properties.caretPos + 1
            );
            if (this.properties.caretPos < this.properties.value.length)
              this.properties.caretPos++;
            textAr.focus();
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == "ArrowRight") {
              keyElement.classList.toggle("keyboard__key--pushed");
              if (this.properties.caretPos < this.properties.value.length)
                this.properties.caretPos++;
              textAr.focus();
            }
          });
          document.addEventListener("keyup", (event) => {
            if (event.code == "ArrowRight")
              keyElement.classList.toggle("keyboard__key--pushed");
          });
          break;

        case "sound":
          keyElement.innerHTML = createIconHTML("volume_up");
          let soundSo;
          if (this.properties.language == "en")
            soundSo = document.querySelector("#en");
          else soundSo = document.querySelector("#ru");
          soundSo.currentTime = 0;

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundSo.play();
            this.properties.sound = !this.properties.sound;
            if (this.properties.sound)
              keyElement.innerHTML = createIconHTML("volume_up");
            else keyElement.innerHTML = createIconHTML("volume_off");
            keyElement.classList.toggle("keyboard__key--dark");
          });
          break;

        case "voice":
          keyElement.innerHTML = createIconHTML("mic_off");
          keyElement.classList.toggle("keyboard__key--dark");
          let soundV;
          if (this.properties.language == "en")
            soundV = document.querySelector("#en");
          else soundV = document.querySelector("#ru");
          soundV.currentTime = 0;

          window.SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

          let recognition = new SpeechRecognition();
          recognition.interimResults = false;
          
          keyElement.addEventListener("click", () => {
            if (this.properties.sound) soundV.play();
            this.properties.voice = !this.properties.voice;
            if (this.properties.voice)
            keyElement.innerHTML = createIconHTML("mic");
            else keyElement.innerHTML = createIconHTML("mic_off");
            keyElement.classList.toggle("keyboard__key--dark");
            
            
            if (this.properties.language == "en")
            recognition.lang = "en-US"
            else
            recognition.lang = "ru-RU"
            console.log(this.properties.language)
            
            if(this.properties.voice)
            {
              recognition.addEventListener('end', recognition.start, false);
              recognition.start();
              
              recognition.addEventListener("result", (e) => {
                const transcript = Array.from(e.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
                
                let poopScript = transcript.replace(
                  /poop|poo|shit|dump/gi,
                  "💩"
                  );
                  this.properties.value += poopScript + " ";
                  this.properties.caretPos = this.properties.value.length;
                  textAr.focus();
                  console.log(poopScript)
            this._triggerEvent("oninput");
                  
                });
                }
                else
              {
                recognition.removeEventListener('end', recognition.start, false);
                recognition.stop();  
                recognition = new SpeechRecognition();
              }
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            let soundMain;
            if (this.properties.language === "en")
              soundMain = document.querySelector("#en");
            else soundMain = document.querySelector("#ru");
            soundMain.currentTime = 0;
            console.log(this.properties.language);
            key = keyElement.textContent;
            key =
              (this.properties.capsLock && this.properties.shift) ||
              (!this.properties.capsLock && !this.properties.shift)
                ? key.toLowerCase()
                : key.toUpperCase();
            this.properties.value =
              this.properties.value.substring(0, this.properties.caretPos) +
              key +
              this.properties.value.substring(this.properties.caretPos);
            this.properties.caretPos++;
            if (this.properties.sound) soundMain.play();
            setTimeout(() => {
              textAr.setSelectionRange(
                this.properties.caretPos,
                this.properties.caretPos
              );
              textAr.focus();
            }, 10);
            console.log(this.properties.caretPos);
            this._triggerEvent("oninput");
          });

          document.addEventListener("keydown", (event) => {
            if (event.code == keyElement.id) {
              keyElement.classList.toggle("keyboard__key--pushed");
              key = keyElement.textContent;
              key =
                (this.properties.capsLock && this.properties.shift) ||
                (!this.properties.capsLock && !this.properties.shift)
                  ? key.toLowerCase()
                  : key.toUpperCase();
              this.properties.value =
                this.properties.value.substring(0, this.properties.caretPos) +
                key +
                this.properties.value.substring(this.properties.caretPos);
              this.properties.caretPos++;
              setTimeout(() => {
                textAr.setSelectionRange(
                  this.properties.caretPos,
                  this.properties.caretPos
                );
                textAr.focus();
              }, 10);
            }
          });
          document.addEventListener("keyup", (event) => {
            for (let i = 0; i < keyboardCodes.length - 1; i++) {
              if (event.code == keyElement.id) {
                keyElement.classList.toggle("keyboard__key--pushed");
              }
            }
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (
        key.childElementCount === 0 &&
        key.textContent !== "shift" &&
        key.textContent !== "en" &&
        key.textContent !== "ru"
      ) {
        if (
          (this.properties.shift === false &&
            this.properties.capsLock === false) ||
          (this.properties.shift === true && this.properties.capsLock === true)
        )
          key.textContent = key.textContent.toLowerCase();
        else key.textContent = key.textContent.toUpperCase();
      }
    }
  },

  _toggleShift(lang, langShift) {
    this.properties.shift = !this.properties.shift;
    let i = 0;
    for (const key of this.elements.keys) {
      if (key.textContent.length === 1)
        key.textContent = this.properties.shift ? langShift[i] : lang[i];
      i++;

      if (
        key.childElementCount === 0 &&
        key.textContent !== "shift" &&
        key.textContent !== "en" &&
        key.textContent !== "ru"
      ) {
        if (
          (this.properties.shift === false &&
            this.properties.capsLock === false) ||
          (this.properties.shift === true && this.properties.capsLock === true)
        )
          key.textContent = key.textContent.toLowerCase();
        else key.textContent = key.textContent.toUpperCase();
      }
    }
  },

  _changeLang(lang) {
    if (this.properties.language == "en") this.properties.language = "ru";
    else this.properties.language = "en";

    console.log(this.properties.language);

    let i = 0;
    for (const key of this.elements.keys) {
      if (key.textContent.length === 1) key.textContent = lang[i];
      i++;
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
