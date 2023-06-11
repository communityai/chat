const botID = document.currentScript.id;
const iframeId = "iframe";
const BASE_URL = "https://www.web3communityai.com" //"http://localhost:3000";

let button;

(function () {
  window.addEventListener("message", function (event) {
    if (event.data == "closeiframe" && button) {
      button.onclick();
    }
  }, false);
  


  window.addEventListener("load", function () {
    setTimeout(async function () {
      const responsed = await fetch(`${BASE_URL}/api/config/${botID}`);
      if (!responsed.ok) {
        console.error('An error occurred:', responsed.status);
      }
      const datad = await responsed.json();

      const iframe = document.createElement("iframe");
      iframe.id = iframeId;
      iframe.src = `${BASE_URL}/web-bot/${botID}`;
      iframe.style.display = "none";
      iframe.style.opacity = "0";
      iframe.style.position = "fixed";
      iframe.style.bottom = "100px";
      iframe.style.right = "40px";
      iframe.style.width = "450px";
      iframe.style.maxWidth = "80vw";
      iframe.style.height = "70vh";
      iframe.style.borderRadius = "10px";
      iframe.style.border = "none";
      iframe.style.zIndex = "999";
      iframe.style.boxShadow =
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(150, 150, 150, 0.2)";

      document.body.appendChild(iframe);

      button = document.createElement("button");
      button.id = "communityai-popup-button";
    //   button.textContent = "💬";
      img = document.createElement("img")
      img.src = 'https://www.web3communityai.com/chat-convo.png'
      img.style.height = "2.5rem";
      img.style.width = "2.5rem";
      img.style.borderRadius = "50%";
      button.textContent = "";
      button.appendChild(img)
      button.style.fontSize = "2.25rem";
      button.style.zIndex = "99999";
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "20px";
      button.style.border = "none";
      button.style.padding = "0.25rem";
      button.style.display = "flex";
      button.style.height = "4rem";
      button.style.width = "4rem";
      button.style.cursor = 'pointer'
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.style.borderRadius = "9999px";
      button.style.backgroundColor = datad.chat_color || "#22C55E";
      button.style.color = "#FFFFFF";
      button.style.textShadow = "0 1px 3px rgba(0, 0, 0, 0.3)";
      button.style.transitionDuration = "150ms";

      button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = datad.chat_color || "#22C55E";
        button.style.opacity = "0.9";
        button.style.textShadow = "0 2px 6px rgba(0, 0, 0, 0.4)";
        button.style.transitionTimingFunction = "ease-in";
      });
      
      button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = datad.chat_color || "#22C55E";
        button.style.textShadow = "0 1px 3px rgba(0, 0, 0, 0.3)";
        button.style.transitionTimingFunction = "ease-out";
        button.style.opacity = "1.0";
      });

      if (datad.chat_image && datad.chat_image.startsWith("data:image/")) {
        img = document.createElement("img");
        img.src = datad.chat_image;
        img.style.width = "2.5rem";
        img.style.height = "2.5rem";
        img.style.borderRadius = "50%";
        button.textContent = "";
        button.appendChild(img);
      }

      button.onclick = function () {
        if (iframe.style.opacity === "1") {
          setTimeout(() => {
            iframe.style.display = "none";
          }, 500);

          iframe.animate(
            [
              { opacity: 1, transform: "translateY(0)" },
              { opacity: 0, transform: "translateY(10px)" },
            ],
            {
              duration: 100,
              easing: "ease-out",
              fill: "forwards",
            },
          );
          iframe.style.opacity = "0";
          if (datad.chat_image && datad.chat_image.startsWith("data:image/")) {
            img = document.createElement("img");
            img.src = datad.chat_image;
            img.style.width = "2.5rem";
            img.style.height = "2.5rem";
            img.style.borderRadius = "50%";
            button.textContent = "";
            button.appendChild(img);
          } else {
            // button.textContent = "💬";
            img = document.createElement("img")
            img.src = 'https://www.web3communityai.com/chat-convo.png'
            img.style.height = "2.5rem";
            img.style.width = "2.5rem";
            img.style.borderRadius = "50%";
            button.textContent = "";
            button.appendChild(img)
          }
          
        } else {
          iframe.style.display = "block";
          iframe.animate(
            [
              { opacity: 0, transform: "translateY(10px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 100,
              easing: "ease-in",
              fill: "forwards",
            },
          );
          iframe.style.opacity = "1";
          button.textContent = "✖️";
        }
      };
      document.body.appendChild(button);
    }, 500);
  });
})();
