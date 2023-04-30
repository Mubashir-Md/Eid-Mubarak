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

  try {

    const response = await fetch(`https://eid-mubarak.onrender.com/screenshot?name=${encodeURIComponent(name)}`);

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screenshot.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  }
  catch(error){
    console.log(error);
  }
});




// share on socials

const whatsappShare = async () => {
  const response = await fetch('https://eid-mubarak.onrender.com/screenshot')
  const blob = await response.blob();

  const reader = new FileReader();
  reader.readAsDataURL(blob);
  await new Promise(resolve => reader.onload = resolve);
  const base64data = reader.result.split(',')[1];

  const imgUrl = URL.createObjectURL(blob);

  const text = "Eid Mubarak \nMay Allah bless you and your family.\n Want to make a similar one, checkout: ";

  const url = `whatsapp://send?text=${encodeURIComponent(text)}&` + `?image=${encodeURIComponent(imgUrl)}`;
  window.open(url);


}

// document.getElementById("whatsapp").addEventListener("click", whatsappShare)