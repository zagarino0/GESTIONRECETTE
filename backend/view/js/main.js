const form = document.querySelector('form');
const nif = document.getElementById('nif');
const datedebutexe = document.getElementById('datedebutexe');
const dateclotexe = document.getElementById('dateclotexe');


form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Convert date format to dd/mm/yyyy
    const datedebutexe = data.datedebutexe;
    const conversiondatedebutexe = datedebutexe.split('-');
    const conversionreversedatedebutexe = conversiondatedebutexe.reverse();
    const finalConversionDatedebutexe = conversionreversedatedebutexe.join('/');

    data.datedebutexe = finalConversionDatedebutexe;

    const dateclotexe = data.dateclotexe;
    const conversiondateclotexe = dateclotexe.split('-');
    const conversionreversedateclotexe = conversiondateclotexe.reverse();
    const finalConversionDateclotexe = conversionreversedateclotexe.join('/');

    data.dateclotexe = finalConversionDateclotexe;


    // Posting data with fetch method
    fetch('http://localhost:3500/getclientbynif', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
})

nif.addEventListener('input', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Convert date format to dd/mm/yyyy
    const datedebutexe = data.datedebutexe;
    const conversiondatedebutexe = datedebutexe.split('-');
    const conversionreversedatedebutexe = conversiondatedebutexe.reverse();
    const finalConversionDatedebutexe = conversionreversedatedebutexe.join('/');

    data.datedebutexe = finalConversionDatedebutexe;

    const dateclotexe = data.dateclotexe;
    const conversiondateclotexe = dateclotexe.split('-');
    const conversionreversedateclotexe = conversiondateclotexe.reverse();
    const finalConversionDateclotexe = conversionreversedateclotexe.join('/');

    data.dateclotexe = finalConversionDateclotexe;


    // Posting data with fetch method
    fetch('http://localhost:3500/getclientbynif', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
})

datedebutexe.addEventListener('input', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Convert date format to dd/mm/yyyy
    const datedebutexe = data.datedebutexe;
    const conversiondatedebutexe = datedebutexe.split('-');
    const conversionreversedatedebutexe = conversiondatedebutexe.reverse();
    const finalConversionDatedebutexe = conversionreversedatedebutexe.join('/');

    data.datedebutexe = finalConversionDatedebutexe;

    const dateclotexe = data.dateclotexe;
    const conversiondateclotexe = dateclotexe.split('-');
    const conversionreversedateclotexe = conversiondateclotexe.reverse();
    const finalConversionDateclotexe = conversionreversedateclotexe.join('/');

    data.dateclotexe = finalConversionDateclotexe;


    // Posting data with fetch method
    fetch('http://localhost:3500/getclientbynif', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
})

dateclotexe.addEventListener('input', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Convert date format to dd/mm/yyyy
    const datedebutexe = data.datedebutexe;
    const conversiondatedebutexe = datedebutexe.split('-');
    const conversionreversedatedebutexe = conversiondatedebutexe.reverse();
    const finalConversionDatedebutexe = conversionreversedatedebutexe.join('/');

    data.datedebutexe = finalConversionDatedebutexe;

    const dateclotexe = data.dateclotexe;
    const conversiondateclotexe = dateclotexe.split('-');
    const conversionreversedateclotexe = conversiondateclotexe.reverse();
    const finalConversionDateclotexe = conversionreversedateclotexe.join('/');

    data.dateclotexe = finalConversionDateclotexe;


    // Posting data with fetch method
    fetch('http://localhost:3500/getclientbynif', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
})