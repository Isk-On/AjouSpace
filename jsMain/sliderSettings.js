const teamMembers = [
  {
    name: 'Mariya',
    description: ' Mariya — Project Leader, coordinating all stages of development and ensuring tasks are completed on time.',
    fullPhoto: 'images/team/Mariya.jpg'
  },
  {
    name: 'Elina',
    description: 'Assistant Leader, helping organize the team’s work and maintaining communication',
    fullPhoto: 'images/team/Elina.jpg'
  },
  {
    name: 'Gulsevar',
    description: 'Designer, creating the visual style of the website and ensuring a user-friendly and aesthetically pleasing interface.',
    fullPhoto: 'images/team/Gulsevar.jpg'
  },
  {
    name: 'Jasmina',
    description: 'Designer, creating the visual style of the website and ensuring a user-friendly and aesthetically pleasing interface.',
    fullPhoto: 'images/team/Jasmina.jpg'
  },
  {
    name: 'Bahodir',
    description: 'Designer, creating the visual style of the website and ensuring a user-friendly and aesthetically pleasing interface.',
    fullPhoto: 'images/team/Bahodir.jpg'
  },
  {
    name: 'Najmiddin',
    description: 'Designer, creating the visual style of the website and ensuring a user-friendly and aesthetically pleasing interface.',
    fullPhoto: 'images/team/Najmiddin.jpg'
  },
  {
    name: 'Akmal',
    description: 'Developer, writing code for the website and ensuring its functionality and technical stability.',
    fullPhoto: 'images/team/Akmal.jpg'
  },
  {
    name: 'Iskandar',
    description: 'Developer, writing code for the website and ensuring its functionality and technical stability.',
    fullPhoto: 'images/team/Iskandar.jpg'
  },
];

function showMemberInfo(index) {
  const prevSelected = document.querySelector('.team-member.selected');
  if (prevSelected) {
    prevSelected.classList.remove('selected');
  }
  
  const selected = document.querySelectorAll('.team-member')[index];
  selected.classList.add('selected');
  
  const member = teamMembers[index];
  document.getElementById("member-name").textContent = member.name;
  document.getElementById("member-description").textContent = member.description;
  document.getElementById("member-photo").src = member.fullPhoto;
}
