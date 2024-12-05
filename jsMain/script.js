document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('#burger');
  
    burgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  });
  