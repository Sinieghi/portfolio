//usar dynamic import para otimizar essa class

export class InputLengthValidation {
  #elementFather;
  i = 0;
  constructor(
    eventTarget,
    elementFather,
    isPrepend,
    containerToBeAppended,
    textElement
  ) {
    this.#elementFather = document?.querySelector(`#${elementFather}`);
    this.textElement = textElement;
    this.message = "";
    this.isPrepend = isPrepend;
    this.containerToBeAppended = this.#elementFather.querySelectorAll(
      containerToBeAppended
    );
    this.eventTarget = eventTarget;
    this.regex = new RegExp(/^\S+@\S+\.\S+$/);
  }
  inputSelected = [];
  emojiEnums = ["&times;", "&#10003;", "&#9888;"];

  messageConstructor() {
    let constructMessage = this.message.split(":")[1] || "";
    if (this.message.startsWith("nota")) {
      this.spanClass = "nota";
      this.emoji = "&#9888;";
    }
    if (this.message === "sucesso") {
      this.spanClass = "sucesso";
      this.emoji = "&#10003;";
    }
    if (this.message.startsWith("erro")) {
      this.spanClass = "erro";
      this.emoji = "&times;";
    }
    return constructMessage;
  }

  buildingWarnNotification(warn, container) {
    const msg = this.messageConstructor();
    if (this.message === "sucesso") {
      warn.innerHTML = `<span class=${this.spanClass}>${this.emoji}</span>`;
    } else {
      warn.innerHTML = `<${this.textElement || "p"}>${msg}<span class=${
        this.spanClass
      }>${this.emoji}</span></${this.textElement || "p"}>`;
    }
    this.message = "";
    this.isPrepend ? container.prepend(warn) : container.append(warn);
  }

  static targetStatusHandler(bool, input) {
    if (bool) {
      input.classList.remove("target_input-fulfill") || "";
      input.classList.add("target_input-warning");
    } else {
      input.classList.remove("target_input-warning") || "";
      input.classList.add("target_input-fulfill");
    }
  }

  recursiveLengthValidationHandler(inp, setBoolean, checkLength) {
    if (checkLength) {
      return inp.minLength;
    }
    if (setBoolean) {
      for (const i in this.inputSelected) {
        if (this.inputSelected[i] === inp) {
          delete this.inputSelected[i];
          return;
        }
      }
    }
  }

  reinitialize(...containerToBeHide) {
    let isMember = JSON.parse(window.localStorage.getItem("isMember") || false);
    for (let i = 0; i < containerToBeHide.length; i++) {
      if (isMember) {
        this.containerToBeAppended[containerToBeHide[i]].style.display = "none";
      } else {
        this.containerToBeAppended[containerToBeHide[i]].style.display =
          "block";
      }
    }
    const isMemberStatus =
      this.#elementFather.querySelectorAll(".switch-status");
    for (let int = 0; int < isMemberStatus.length; int++) {
      isMemberStatus[int].addEventListener("click", () => {
        isMember = !isMember;
        for (let i = 0; i < containerToBeHide.length; i++) {
          if (isNaN(containerToBeHide[i])) {
            return;
          }
          if (isMember) {
            this.containerToBeAppended[containerToBeHide[i]].style.display =
              "none";
          } else {
            this.containerToBeAppended[containerToBeHide[i]].style.display =
              "block";
          }
        }
      });
    }
  }

  regexValidateEmail(targetInput, warn, regex, container) {
    if (
      !regex.test(targetInput.value) &&
      targetInput.value.length >= targetInput.minLength
    ) {
      this.message = `nota: Parece que seu email esta faltando os caracteres base, confere o @ ou "."`;
      this.buildingWarnNotification(warn, container);
      this.isPrepend ? container.prepend(warn) : container.append(warn);
      targetStatusHandler(true, targetInput);
    } else if (
      regex.test(targetInput.value) &&
      targetInput.value.length >= targetInput.minLength
    ) {
      this.message = "sucesso";
      this.buildingWarnNotification(warn, container);
      container.replaceChild(warn, warn);
      targetStatusHandler(false, targetInput);
    } else if (targetInput.value.length <= targetInput.minLength) {
      this.message = `nota: Campo obrigatório numero de caracteres mínimo ${targetInput.minLength}`;
      this.buildingWarnNotification(warn, container);
      targetStatusHandler(true, targetInput);
    }
  }

  validateDateInput(warn, targetInput, container) {
    if (new Date(targetInput.value) < new Date()) {
      this.message = `nota: A data neste campo é invalida, pois se refere a uma data passada e só aceitamos data de coleta futura`;
      targetStatusHandler(true, targetInput);
      this.buildingWarnNotification(warn, container);
    } else if (new Date(targetInput.value) >= new Date()) {
      this.message = `sucesso`;
      targetStatusHandler(false, targetInput);
    }
  }

  static nextDigit(input, cursor, isBackspace) {
    if (isBackspace) {
      for (let i = cursor - 1; i > 0; i--) {
        if (/\d/.test(input[i])) {
          return i;
        }
      }
    } else {
      for (let i = cursor - 1; i < input.length; i++) {
        if (/\d/.test(input[i])) {
          return i;
        }
      }
    }

    return cursor;
  }
  static formatPhoneNumber(e) {
    try {
      let phoneNumberString = e.target.value;
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      var match = cleaned.match(/^(\d{0,2})?(\d{0,5})?(\d{0,4})?/);
      return [
        match[1] ? "(" : "",
        match[1],
        match[2] ? ") " : "",
        match[2],
        match[3] ? "-" : "",
        match[3],
      ].join("");
    } catch (err) {
      return "";
    }
  }

  validatePhoneInput(warn, targetInput, container) {
    let x = +targetInput.value;
    if (isNaN(x) && x !== "(" && x !== ")") {
      this.message = `nota: Por favor certifique-se de colocar somente números ness campo`;
      this.buildingWarnNotification(warn, container);
      targetStatusHandler(true, targetInput);
    }
  }
  static phoneInputHandler(e, value) {
    let cursorPos = e.target.selectionStart;
    value = formatPhoneNumber(e);
    e.target.value = String(value);
    let isBackspace =
      e?.nativeEvent && e?.nativeEvent?.data == null ? true : false;
    let nextCursor = nextDigit(value, cursorPos, isBackspace);
    e.target.setSelectionRange(cursorPos + 1, nextCursor + 1);
    return value;
  }

  appendMessage(targetInput, warn, regex) {
    for (const container of this.containerToBeAppended) {
      if (container.contains(targetInput)) {
        if (targetInput.name === "email") {
          this.regexValidateEmail(targetInput, warn, regex, container);
        } else if (targetInput.name === "collectDate") {
          this.validateDateInput(warn, targetInput, container);
        } else if (targetInput.name === "phone") {
          this.validatePhoneInput(warn, targetInput, container);
        } else {
          if (targetInput.minLength >= targetInput.value.length) {
            this.message = `nota: Campo obrigatório numero de caracteres mínimo ${targetInput.minLength}`;
            this.buildingWarnNotification(warn, container);
          }
          if (targetInput.value.length >= targetInput.minLength) {
            this.message = `sucesso`;
            this.buildingWarnNotification(warn, container);
          }
          if (targetInput.nodeName === "SELECT" && targetInput.value === "") {
            this.message = `nota: Campo de partida e destino são obrigatórios`;
            this.buildingWarnNotification(warn, container);
          }
          if (targetInput.nodeName === "SELECT" && targetInput.value !== "") {
            this.message = `sucesso`;
            this.buildingWarnNotification(warn, container);
          }
        }
      }
    }
  }
  observerElementChanges(targetInput, warn, regex) {
    //text notification
    this.appendMessage(targetInput, warn, regex);

    //border colors
    if (
      targetInput.value.length <
        this.recursiveLengthValidationHandler(targetInput, false, true) &&
      targetInput.name !== "email" &&
      targetInput.name !== "collectDate"
    ) {
      targetStatusHandler(true, targetInput);
    } else if (
      targetInput.value.length >=
        this.recursiveLengthValidationHandler(targetInput, false, true) &&
      targetInput.name !== "email" &&
      targetInput.name !== "collectDate"
    ) {
      targetStatusHandler(false, targetInput);
    }

    if (targetInput.nodeName === "SELECT" && targetInput.value !== "") {
      targetStatusHandler(false, targetInput);
    } else if (targetInput.nodeName === "SELECT" && targetInput.value === "") {
      targetStatusHandler(true, targetInput);
    }
    return this;
  }

  initValidation() {
    this.warn = document.createElement("warning");
    this.inputs = this.#elementFather.querySelectorAll(this.eventTarget);

    for (let input of this.inputs) {
      if (input) {
        input.addEventListener("change", (changeEvent) => {
          const targetInput = changeEvent.target;
          if (targetInput.required) {
            this.recursiveLengthValidationHandler(targetInput, false);
            this.observerElementChanges(targetInput, this.warn, this.regex);
            this.recursiveLengthValidationHandler(targetInput, true, false);
            this.inputSelected.push(targetInput);
          }
        });
        input.addEventListener("click", (e) => {
          if (e.target.required) {
            this.recursiveLengthValidationHandler(e.target, false);
            this.observerElementChanges(e.target, this.warn, this.regex);
            this.recursiveLengthValidationHandler(e.target, true, false);
            this.inputSelected.push(e.target);
          }
        });
      }
      this.inputs = null;
    }
  }
}
export const {
  targetStatusHandler,
  formatPhoneNumber,
  nextDigit,
  phoneInputHandler,
} = InputLengthValidation;
// let a = [];
// let i = 0;
// let z = 0;
// function x(y) {
//   if (i == 20) return;
//   a[i] = z;
//   if (i == 11) {
//     a[i] = "agua";
//     console.log(i);
//     console.log(a[i]);
//   }
//   i++;
//   return x(z--);
// }
// x(15);
// console.log(a);
// function h() {
//   let t = 60;
//   while (t > 0) {
//     console.log(t);
//     t--;
//   }
//   return t;
// }
// console.log(h());

//recursiva com for loop
// let arr1 = ["banana", "aspdkpa", "aksdpaosij", "asndopas"];
// let arr = ["asbhdiasbd", "asdpasnda", "aalçmdçslmad0", "5654654s", "banana"];
// let int = 0;
// let numOfInt = 0;
// recursiveCall();
// function recursiveCall() {
//   if (int == arr1.length) return;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === arr1[int]) {
//       console.log("xx");
//     }
//     console.log(arr[i], arr1[int]);
//     console.log(numOfInt);
//     numOfInt++;
//   }
//   int++;
//   return recursiveCall();
// }
