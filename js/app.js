document.getElementById("image").addEventListener("change", function () {
  const fileName = this.files[0] ? this.files[0].name : "Нет файла";
  document.querySelector(".icon-attach").style.display = "none";
  document.getElementById("file-name").textContent = `${fileName}`;
});

function switchModal(type) {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (type === "login") {
      registerForm.setAttribute("aria-hidden", "true");
      loginForm.setAttribute("aria-hidden", "false");
  } else {
      registerForm.setAttribute("aria-hidden", "false");
      loginForm.setAttribute("aria-hidden", "true");
  }
}
function switchModal(type) {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (type === "login") {
        registerForm.setAttribute("aria-hidden", "true");
        loginForm.setAttribute("aria-hidden", "false");
    } else {
        registerForm.setAttribute("aria-hidden", "false");
        loginForm.setAttribute("aria-hidden", "true");
    }
}

const input = document.getElementById("message");
const message = document.querySelector(".btn-submit");

input.addEventListener("input", function () {
  if (input.value.trim() === "") {
    message.style.display = "none";
  } else {
    message.style.display = "block";
  }
});

function registerUser() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const avatarFile = document.getElementById("registerAvatar").files[0];

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }

  fetch("http://127.0.0.1:3000/register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
      localStorage.setItem("token", data.token);
      fetchMessages();
      document.getElementById("messageForm").style.display = "flex";
      document.getElementById("modalOverlay").style.display = "none";
    })
    .catch((error) =>
      alert("Ошибка: Такой пользователь уже существует. Авторизуйтесь")
    );
}

function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      document.getElementById("modalOverlay").style.display = "none";
      document.getElementById("messageForm").style.display = "flex";
      fetchMessages();
    })
    .catch((error) =>
      alert("Ошибка: Такого пользователя нет, или пароль/логин введен неверно.")
    );
}

function fetchMessages() {
  fetch("http://127.0.0.1:3000/getMessages")
    .then((response) => response.json())
    .then((messages) => {
      const wall = document.getElementById("wall");
      wall.innerHTML = "";
      messages.forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        let messageContent = `
  <img src="${msg.avatar ? msg.avatar : "img/anonymous.jpg"}" 
       alt="avatar" 
       class="avatar" 
       style="width: 50px; height: 50px; border-radius: 50%;">
  <div class="message-content">
    <span class="username">${msg.username}:</span>
    ${
      msg.image
        ? `<div class="image-container"><img src="${msg.image}" alt="Message Image" style="border-radius: 5px;" width="200"></div>`
        : ""
    }
    <div class="text-time-container">
      <span>${msg.message}</span>
      <span class="timestamp">${msg.created_at
        .split("T")[1]
        .split(":")
        .slice(0, 2)
        .join(":")}</span>
    </div>
  </div>
`;

        messageElement.innerHTML = messageContent;
        wall.appendChild(messageElement);
      });
    })
    .catch((error) => console.error("Ошибка:", error)); // Обработка ошибок
}
function postMessageWithImage() {
  const message = document.getElementById("message").value;
  const messageBtn = document.querySelector(".btn-submit");
  document.querySelector(".icon-attach").style.display = "block";
  document.getElementById("file-name").textContent = "";
  messageBtn.style.display = "none";

  const image = document.getElementById("image").files[0];
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("message", message);
  if (image) {
    formData.append("image", image);
  }

  fetch("http://127.0.0.1:3000/postMessageWithImage", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      document.getElementById("message").value = "";
      document.getElementById("image").value = "";
    })
    .catch((error) => console.error("Ошибка:", error));
}

const eventSource = new EventSource("http://127.0.0.1:3000/events");
eventSource.onmessage = function (event) {
  if (event.data === "update") {
    fetchMessages();
  }
};
