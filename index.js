// 1. import Person.js
import Person from './person.js'

// 2. Definisikan ketiga object person tersebut dengan ketentuan seperti diatas
const jane = Person('Jane', 20, false, 'https://picsum.photos/200')
const mary = Person('Mary', 23, false, 'https://picsum.photos/200?grayscale')
const charles = Person('Charles', 30, true, 'https://picsum.photos/seed/picsum/200',)


// 3. Tambah usia Jane 15 tahun
jane.addAge(15)

// 4. Set usia Charles menjadi 80 tahun
charles.setAge(80)

// 5. Tampilkan Informasi charles dengan querySelector
const charlesImg = document.querySelector("#charles .img");
const charlesInfo = document.querySelector("#charles .info");

// a. Set avatar charles pada selector image
charlesImg.src = charles.avatar;

// b. Tampilkan info dengan Template literals
charlesInfo.innerHTML = charles.toString();

// 6. Sama seperti Charles, tampilkan Informasi mary dan Jane dengan querySelector
document.querySelector("#mary .img").src = mary.avatar;
document.querySelector("#mary .info").innerHTML = mary.toString();
document.querySelector("#jane .img").src = jane.avatar;
document.querySelector("#jane .info").innerHTML = jane.toString();


const charlesJob = { job: "Programmer" };
// 7. Gabungkan objek charles dengan spread operator
const charlesJobInfo = { ...charles, ...charlesJob };

// 8. Definisikan fullName dan job milik Charles dengan object destructuring
const { fullName, job } = charlesJobInfo;

// a. Tampilkan job info milik charles dengan query selector
const charlesJobInfoSelector = document.querySelector("#charles .jobInfo");
// b. Tampilkan info dengan Template literals
charlesJobInfoSelector.innerHTML = `${fullName}'s Job: ${job}`;