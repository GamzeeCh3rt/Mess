document.addEventListener("DOMContentLoaded", function () {
  const correctPassword = "1218676";
  let tries = 0;

  const isProtectedPage = window.location.pathname.includes("TGmodRules.html");
  
  if (!isProtectedPage) {
    return;
  }

  const loadingOverlay = document.getElementById("loading-overlay");
  const bodyElement = document.body;
  const contentElement = document.getElementById("content");

  if (loadingOverlay) {
    loadingOverlay.style.display = "flex";
  }
  
  if (contentElement) {
    contentElement.style.display = "none";
  }
  
  const mainContentElements = document.querySelectorAll('.center-content, .buttons-container, hr, p, h3, ol, ul, details');
  
  mainContentElements.forEach(element => {
    element.style.visibility = "hidden";
    element.style.opacity = "0";
    element.style.position = "absolute";
    element.style.left = "-9999px";
  });

  function showAccessDenied() {
  if (loadingOverlay) {
    loadingOverlay.style.display = "none";
  }
  
  document.body.innerHTML = `
    <div class="background-page" style="background: url('../assets/videos/prank.gif') no-repeat center center fixed; background-size: cover;">
      <div class="center-content">
        <div class="background-content">
          <h2>Доступ запрещён</h2>
          <p>Вы превысили допустимое количество попыток ввода пароля.</p>
          <br>
          <a href="../index.html" class="button-link">🌐 Главная страница</a>
        </div>
      </div>
    </div>
  `;
  
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
  });
}

  function requestPassword() {
    let pwd = prompt("Введите пароль для доступа к странице:");

    if (pwd === null) {
      showAccessDenied();
      return;
    }

    if (pwd === correctPassword) {
      if (loadingOverlay) {
        loadingOverlay.style.display = "none";
      }
      
      if (contentElement) {
        contentElement.style.display = "block";
      }
      
      mainContentElements.forEach(element => {
        element.style.visibility = "visible";
        element.style.opacity = "1";
        element.style.position = "static";
        element.style.left = "auto";
      });
      
      bodyElement.classList.add("password-verified");
    } else {
      tries++;
      if (tries < 3) {
        alert("Неверный пароль, попробуйте снова.");
        requestPassword();
      } else {
        showAccessDenied();
      }
    }
  }

  setTimeout(() => {
    requestPassword();
  }, 300);
});