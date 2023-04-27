// Edit name

const editBtn = document.getElementById("edit");
editBtn.addEventListener("click", () => {
  const userInput = document.getElementById('userInput');
  userInput.style.visibility = 'visible';
  const userName = userInput.value;

  const name = document.getElementById('name');
  name.innerHTML = userName || 'Your name';

})

// download screenshot

document.getElementById("download").addEventListener("click", async () => {

  const name = document.getElementById('userInput').value;

  const response = await fetch(`http://localhost:3000/screenshot?name=${encodeURIComponent(name)}`);

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'screenshot.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(blob);
});




// share on socials

const whatsappShare = async () => {
  const response = await fetch('http://localhost:3000/screenshot')
  const blob = await response.blob();

  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function(){
    const base64 = reader.result;
    
  }

  const imgUrl = URL.createObjectURL(blob);

  const text = "Eid Mubarak \nMay Allah bless you and your family.\n Want to make a similar one, checkout: ";

  const url = `whatsapp://send?text=${encodeURIComponent(text)}&` + `?image=${encodeURIComponent(imgUrl)}`;
  console.log(url)
  window.open(url);


}

document.getElementById("whatsapp").addEventListener("click", whatsappShare)