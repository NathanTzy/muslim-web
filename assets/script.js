let city = '0816';
const date = new Date();
const dd = String(date.getDate()).padStart(2, '0');
// padStart itu buat didepan angka ada angka 0 jika kurang dari 2 digit.
const mm = String(date.getMonth() + 1).padStart(2, '0');
const yyyy = date.getFullYear();
const hour = String(date.getHours()).padStart(2, '0');
const minute = String(date.getMinutes()).padStart(2, '0');
const clockNow = `${hour}:${minute}`;

console.log(mm);


const now = yyyy + '-' + mm + '-' + dd;


// jadwal solat API
const jadwalApi = `https://api.myquran.com/v1/sholat/jadwal/${city}/${yyyy}/${mm}`

fetch(jadwalApi)
    .then(function (response) {
        if (!response.ok) {
            throw new console.error(`errrrrorrrrrrr`);
        }
        return response.json();
    })

    .then((data) => {
        const jadwal = data.data;
        const list = jadwal.jadwal;
        const listJadwal = document.getElementById("list-jadwal");
        const kota = document.getElementById('city');
        const prov = document.getElementById('province');



        kota.innerHTML = jadwal.lokasi
        prov.innerHTML = jadwal.daerah;


        list.forEach((el) => {
            const tr = document.createElement("tr");

            if (el.date === now){
                tr.classList.add ('table-primary')
            }


            // tanggal
            const dd = document.createElement("td");
            dd.innerText = el.tanggal;
            dd.classList.add('date');

            // imsak
            const imsak = document.createElement('td');
            imsak.innerText = el.imsak;

            // subuh
            const subuh = document.createElement('td');
            subuh.innerText = el.subuh;

            // terbit
            const terbit = document.createElement('td');
            terbit.innerText = el.terbit;

            // dzuhur
            const dzuhur = document.createElement('td');
            dzuhur.innerText = el.dzuhur;

            // ashar
            const ashar = document.createElement('td');
            ashar.innerText = el.ashar;

            // maghrib
            const maghrib = document.createElement('td');
            maghrib.innerText = el.maghrib;

            // isya
            const isya = document.createElement('td');

            isya.innerText = el.isya;


            listJadwal.appendChild(tr);
            tr.appendChild(dd);
            tr.appendChild(imsak);
            tr.appendChild(subuh);
            tr.appendChild(terbit);
            tr.appendChild(dzuhur);
            tr.appendChild(ashar);
            tr.appendChild(maghrib);
            tr.appendChild(isya);

            // pengingat solat
    let solat = document.querySelector('#solat');

    let array1 = ['subuh', 'terbit', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya'];
    let array2 = ['terbit', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya', 'subuh'];
    let array3 = ['isya'];
    let array4 = ['subuh'];
    let array5 = ['dzuhur'];
    let array6 = ['terbit'];
    let array7 = ['dhuha'];


    array1.forEach(function (solat1) {
        array2.forEach(function (solat2) {
            array3.forEach(function (solat3) {
                array4.forEach(function (solat4) {
                    array5.forEach(function (solat5) {
                        array6.forEach(function(solat6) {
                            array7.forEach(function(solat7) {
                                let solat5Time = el[solat5].split(':'); // Memisahkan jam dan menit
                                let jam = parseInt(solat5Time[0], 10);
                                let menit = parseInt(solat5Time[1], 10);

                                // Mengurangkan 15 menit
                                menit -= 15;

                                // Menangani menit negatif (meminjam dari jam)
                                if (menit < 0) {
                                    menit += 60;
                                    jam -= 1;
                                }

                                // Memformat hasilnya kembali ke format "HH:mm"
                                let jamFormatted = jam.toString().padStart(2, '0');
                                let menitFormatted = menit.toString().padStart(2, '0');
                                let larang = `${jamFormatted}:${menitFormatted}`;

                                console.log(larang);
                                if (clockNow >= el[solat6] && clockNow < el[solat7]) {
                                    solat.innerHTML = 'syuruq'
                                }else if (clockNow >= el[solat1] && clockNow <= el[solat2]) {
                                    solat.innerHTML = solat1;
                                } else if (clockNow >= el[solat3]) {
                                    solat.innerHTML = solat3;
                                } else if (clockNow >= '00:00' && clockNow < el[solat4]) {
                                    solat.innerHTML = solat3;
                                } else if (clockNow >= larang && clockNow < el[solat5]) {
                                    solat.innerHTML = '(waktu dilarang shalat!!!)';
                                }
                            })
                        })
                        
                    })
                })
            })
        })
    })
        });
    })

    // current time
    function showTime() {
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";
        if (h == 0) {
            h = 12;
        }
        if (h > 12) {
            h = h - 12;
            session = "PM";
        }
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        var time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("MyClockDisplay").innerText = time;
        document.getElementById("MyClockDisplay").textContent = time;
        setTimeout(showTime, 1000);
    }
    showTime();

    
