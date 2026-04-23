import { socket } from "./socket.ts";

const form = document.getElementById("chatForm") as HTMLFormElement;
const input = document.getElementById("chatText") as HTMLInputElement;
const timeline = document.getElementById("timeline") as HTMLUListElement;
const charCount = document.getElementById("charCount") as HTMLSpanElement;

input.addEventListener("input", () => {
  const length = input.value.length;
  charCount.textContent = `${length}/50`;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
    charCount.textContent = `0/50`;
  }
});

socket.on("chat message", (msg: string) => {
  const item = document.createElement("li");
  item.textContent = msg;
  timeline.appendChild(item);
});
