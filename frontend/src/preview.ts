import { socket } from "./socket.ts";

const FONT_SIZE = 60;
const BOTTOM_MARGIN = 50;

const contaniner = document.querySelector(".scroll-container") as HTMLDivElement;

socket.on("chat message", (msg: string) => {
  if (!contaniner) return;

  const containerHeight = contaniner.clientHeight;

  const comment = document.createElement("div");
  comment.classList.add("scroll-text");
  comment.textContent = msg;
  comment.style.fontSize = `${FONT_SIZE}px`;

  const commentTop = Math.random() * (containerHeight - FONT_SIZE - BOTTOM_MARGIN);
  console.log("commentTop", commentTop);
  comment.style.top = `${commentTop}px`;

  contaniner.appendChild(comment);

  comment.addEventListener("animationend", () => {
    comment.remove();
  });

  console.log(msg);
});
