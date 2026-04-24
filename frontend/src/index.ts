import { socket } from "./socket.ts";

const form = document.getElementById("chat-form") as HTMLFormElement;
const chatTextInput = document.getElementById("chat-text") as HTMLInputElement;
const timeline = document.getElementById("timeline") as HTMLUListElement;
const charCount = document.getElementById("char-count") as HTMLSpanElement;
const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;

const MESSAGE_MAX_CHAR_COUNT = 50;

chatTextInput.maxLength = MESSAGE_MAX_CHAR_COUNT;

chatTextInput.addEventListener("input", () => {
  updateCharCount();
  clearError();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatTextInput.value.trim();

  if (message.length === 0) {
    showError("コメントを入力してください");
    return;
  }

  if (message.length > MESSAGE_MAX_CHAR_COUNT) {
    showError(`コメントは${MESSAGE_MAX_CHAR_COUNT}文字以内で入力してください`);
    return;
  }

  clearError();
  socket.emit("chat message", message);
  chatTextInput.value = "";
  updateCharCount();
  chatTextInput.focus();
});

socket.on("chat message", (msg: string) => {
  const item = document.createElement("li");
  item.textContent = msg;
  timeline.appendChild(item);
});

function updateCharCount() {
  const length = chatTextInput.value.length;
  charCount.textContent = `${length} / ${MESSAGE_MAX_CHAR_COUNT}`;
}

function showError(message: string) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}
