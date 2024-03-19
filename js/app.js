const body = document.querySelector('body');

if (body){
  body.addEventListener("keydown", (e) => {
    const p1 = document.createElement('P');
    const p2 = document.createElement('P');
    p1.textContent = `Pressed key - ${e.key}`
    p2.textContent = `Pressed key code - ${e.code}`
    body.append(p1);
    body.append(p2);
  });
}