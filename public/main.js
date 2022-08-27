const addQuote = document.querySelector('#addQuote')

addQuote.addEventListener('click', ()=> {
  fetch('/quotes', {
    method: 'post',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      author: document.getElementsByName('author')[0].value,
      quote: document.getElementsByName('quote')[0].value,
    })
  })
  .then(res=> {
    if (res.ok){
      return res.json()
    }
  })
})