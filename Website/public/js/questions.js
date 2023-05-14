const questions = [
    {
        question: "Ako imaš tri jabuke i daješ po jednu jabuku svakom od tri prijatelja, koliko će ti jabuka ostati?",
        answers: ["Ni jedna", "Jedna", "Dve", "Tri"],
        correctAnswer: 0,
	    timer: 60
    },
    {
        question: "Miš je udaljen od od svog skloništa 20 koraka. Mačka je udaljena od miša 5 skokova. Dok mačka jedanput skoči, miš načini 3 koraka. Jedan skok mačke velik kao 10 mišijih koraka. Da li će mačka uhvatiti miša?",
        answers: ["Miš će umaći mački za jedan korak", "Mačka će uhvatiti miša", "Miš će umaći za tri koraka"],
        correctAnswer: "Miš će umaći mački za jedan korak",
	    timer: 90
    },
    {
        question: "Ako imaš 10 novčića, od kojih je jedan lažan (teži), a svi ostali su pravi, koliko je najmanje merenja vagom sa tasovima potrebno da sigurno otkriješ koji je lažni novčić?",
        answers: ["Devet", "Pet", "Dva", "Tri"],
        correctAnswer: 3,
	    timer: 120
    },
    {
        question: "Ako imaš četiri kovanice od po 25 centi i pet kovanica od po 10 centi, koliko imaš novca?",
        answers: ["1 evro", "1.5 evra", "2 evra", "0.75 evra"],
        correctAnswer: 1,
	    timer: 60
    },
    {
        question: "Koji je najmanji broj koji se može dobiti sabiranjem tri različita dvocifrena broja?",
        answers: ["Trideset tri", "Trideset", "Trideset šest", "Trideset osam"],
        correctAnswer: 0,
	    timer: 60
    },
    {
        question: "Imaš tri kese sa novcem, od kojih jedna sadrži samo po 30 dolara, druga po 40 dolara, a treća po 50 dolara. " +
    	"Jedna kesa ima tačnu oznaku, dok druge dve imaju pogrešne oznake. Koji je najmanji broj kesa koje moraš da pregledaš " + 
	    "da bi tačno utvrdio koje su kese koje sadrže određen iznos novca?",
        answers: ["Dva", "Tri", "Jedan", "Ni jedna"],
        correctAnswer: 0,
	    timer: 120
    },
    {
        question: "Čovek je dao bratu polovinu svog bogatstva, a potom mu  dao polovinu onoga što je ostalo." +
	    "Sada mu je ostalo samo 10 evra. Koliko novca je imao na početku?",
        answers: ["40 evra", "2.5 evra", "20 evra", "100 evra"],
        correctAnswer: 0,
	    timer: 60
    },
    {
        question: "Ako 5 mašina naprave 5 čokoladica za 5 minuta, za koliko vremena 100 mašina naprave 100 čokoladica?",
        answers: ["5 minuta", "100 minuta", "10 minuta", "1 sat"],
        correctAnswer: 0,
        timer: 60
    },
    {
        question:"Ako ti lekar kaže da od 8:00 kreneš da uzimaš 3 tablete na svakih pola sata, kada ćeš popiti poslednju tabletu?",
        answers: ["8:30", "9:00", "9:30", "10:00"],
        correctAnswer: 1,
        timer: 90
    },
    {
        question:"Koliko treba da kupiš kutija s olovkama, ako želiš 40 olovaka, a u svakoj kutiji ima 8 olovaka?",
        answers: ["Pet", "Osam", "Deset", "Četrdeset"],
        correctAnswer: 0,
        timer: 60
    },
    {
        question:"U gradu živi 100 000 ljudi. Ako se broj stanovnika poveća za 10% svake godine, koliko će ljudi biti u gradu nakon 3 godine?",
        answers: ["133,100 ljudi", "121,000 ljudi", "139,300 ljudi", "161,051 ljudi"],
        correctAnswer: 3,
        timer: 90
    },
    {
        question:"U nekoj državi su svi stanovnici samo levoruki. Koliko posto stanovništva ne može pisati desnom rukom?",
        answers: ["0%", "50%", "100%", "Ne može se odrediti"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Četiri prijatelja, Ana, Borko, Cvetko i Dragan, trčali su maraton. Ana je završila pre Borka, " +
	    "ali nakon Cvetka. Dragan je završio poslednji. Ko je bio drugi po redu?",
        answers: ["Ana", "Borko", "Cvetko", "Dragan"],
        correctAnswer: 0,
        timer: 60
    },
    {
        question: "Grupa od 30 ljudi je putovala autobusom. Svaki je putnik dao vozaču 10 evra za kartu. " +
	    "Kasnije, vozač je shvatio da je pogrešio i da bi cena karte trebalo da bude samo 8 evra. Koliko bi trebalo ukupno vratiti novca putnicima?",
        answers: ["60 evra", "100 evra", "80 evra", "50 evra"],
        correctAnswer: 0,
        timer: 90
    },
    {
        question: "Dva trgovca su sklopila dogovor. Prvi će prodati drugom neku količinu robe za 1 000 dolara, " +
	    "a drugi će prodavati robu po ceni od 10 dolara po komadu. Koliko najmanje komada mora prodati drugi trgovac da bi bio u plusu?",
        answers: ["100 komada", "101 komad", "99 komada", "1 komad"],
        correctAnswer: 1,
        timer: 60
    },
    {
        question: "Ako je 1 = 5, 2 = 25, 3 = 125, koliko je 4?",
        answers: ["225", "350", "625", "475"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Ako je danas petak, koji će dan biti za 100 dana?",
        answers: ["Petak", "Subota", "Nedelja", "Ponedeljak"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Ako imaš 10 kilograma jabuka i da jabuke sadrže 99% vode. Nakon što ih ostaviš da se osuše, koliko kilograma jabuka će ostati?",
        answers: ["0.01 kilograma", "0.1 kilograma", "1 kilograma", "100 kilograma"],
        correctAnswer: 1,
        timer: 60
    },
    {
        question: "Ako 1 jagnjetina vredi 5 jaretina, 1 jaretina vredi 3 piletine, 1 piletina vredi 2 prasetine. Koliko prasetina vredi 1 jagnjetina?",
        answers: ["Deset", "Petnaest", "Trideset", "Trideset pet"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Postoji 6 ljudi u sobi. Svaka osoba rukuje s ostalima. Koliko ukupno rukovanja će se dogoditi?",
        answers: ["Šest", "Petnaest", "Trideset", "Trideset šest"],
        correctAnswer: 1,
        timer: 60
    },
    {
        question: "Ako 5 ljudi mogu očistiti 5 automobila u 5 sati, koliko treba ljudi da očiste 10 automobila u 10 sati?",
        answers: ["2.5 ljudi", "5 ljudi", "2 ljudi", "10 ljudi"],
        correctAnswer: 1,
        timer: 60
    },
    {
        question: "U kutiji su crvene, plave i crne rukavice. Koliko moraš izvući rukavica iz kutije da bi bio siguran da imaš najmanje jedan par iste boje?",
        answers: ["Dve", "Tri", "Četiri", "Šest"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Ako se na stablu nalazi 5 ptica, i pucaš na jednu od njih, koliko ih ostaje na stablu?",
        answers: ["Ni jedna", "Jedna", "Četiri", "Pet"],
        correctAnswer: 0,
        timer: 60
    },
    {
        question: "Koliko najviše kuglica težine 10 grama može stati u kontejner od 1,000 kg?",
        answers: ["100 kuglica", "10,000 kuglica", "100,000 kuglica", "1,000,000 kuglica"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Ako u sobi ima 5 devojaka, svaka ima 3 torbi i svaka torba sadrži 5 mačaka. Koliko ukupno ima nogu u sobi?",
        answers: ["30 nogu", "300 nogu", "75 nogu", "310 nogu"],
        correctAnswer: 3,
        timer: 90
    },
    {
        question: "Za lonac s poklopcem plaćeno je 1 200 dinara. Lonac je skuplji od poklopca za 1 000 dinara. Koliko košta poklopac?",
        answers: ["100 dinara","200 dinara","1000 dinara","1100 dinara"],
        correctAnswer: 0,
        timer: 60
    },
    {
        question: "Cena sveske je 100 dinara, ali plaćeno je još trećina cene sveske. Kolika je cena sveske?",
        answers: ["75 dinara", "100 dinara", "133 dinara", "150 dinara"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Otac je stariji od sina 3 puta, a sin je stariji od sestre 3 puta. Koliko je godina ocu ako zbir njegovih i ćerkinih godina iznosi 50?",
        answers: ["Pet", "Petnaest", "Četrdeset pet", "Šezdeset"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Kada je učenik pročitao polovinu knjige i još 20 strana ostalo mu je da pročita još trećinu knjige. Kolko je strana imala knjiga?",
        answers: ["100 strana", "120 strana", "125 strana", "250 strana"],
        correctAnswer: 1,
        timer: 60
    },
    {
        question: "Na koliko se načina od 5 jabuka mogu uzeti 2 jabuke?",
        answers: ["Na jedan", "Na deset", "Na dvanaest", "Na petnaest"],
        correctAnswer: 3,
        timer: 60
    },
    {
        question: "Koliko 2 i po štapa imaju krajeva?",
        answers: ["Četiri", "Pet", "Šest", "Četiri i po"],
        correctAnswer: 2,
        timer: 60
    },
    {
        question: "Sinu je 9 godina , a ocu je 35. Za koliko godina će otac biti tri puta stariji od sina?",
        answers: ["Za dve", "Za tri", "Za četiri", "Za pet"],
        correctAnswer: 2,
        timer: 90
    },
    {
        question: "Ako voziš autobus sa 40 putnika na početnoj stanici, na sledećoj stanici izlazi 10 putnika, " +
	    "a 5 novih putnika ulazi. Na sledećoj stanici, 15 putnika izlazi, a 10 novih putnika ulazi. " +
	    "Na sledećoj stanici izlazi 1 putnik. Koliko putnika je u autobusu?",
        answers: ["Dvadeset osam", "Dvadeset devet", "Trideset", "Trideset jedan"],
        correctAnswer: 1,
        timer: 90
    },
    {
        question: "Ako voziš autobus sa 40 putnika na početnoj stanici, na sledećoj stanici izlazi 5 putnika, " +
	    "a 10 novih putnika ulazi. Na sledećoj stanici, 10 putnika izlazi, a 15 novih putnika ulazi. " +
	    "Na sledećoj stanici ulazi 1 putnik. Koliko stanica bilo?",
        answers: ["Tri", "Četiri", "Četrdeset devet", "Pedeset jedan"],
        correctAnswer: 1,
        timer: 90
    },
    {
        question: "Svakog dana vozač autobusa prevozi putnike na putu dugom 50 km. Autobus ima neograničenu količinu goriva, " + 
	    "ali potroši 1 litar goriva na svakih 10 km. Koliko litara goriva će potrošiti vozač autobusa za jednu nedelju (računajući 7 dana)?",
        answers: ["Sedam", "Dvanaest", "Dvadeset jedan", "Trideset pet"],
        correctAnswer: 3,
        timer: 90
    },
    {
        question: "Jednom jajetu treba 5 minuta da se skuva. Ako se dva jajeta stave u istu posudu za kuvanje, koliko će im vremena trebati?",
        answers: ["2.5 minuta", "5 minuta", "7.5 minuta", "10 minuta"],
        correctAnswer: 1,
        timer: 60
    },
    {
        question: "Put je dugačak 10 km. Koliko si ukupno prešao ako pređeš pola tog puta, pa se vratiš pola unazad?",
        answers: ["7.5 kilometara", "10 kilometara", "12.5 kilometara", "15 kilometara"],
        correctAnswer: 0,
        timer: 90
    },
    {
        question: "Tri majmuna mogu jesti tri banane u tri minute. Koliko vremena će trebati 6 majmuna da pojedu 6 banana?",
        answers: ["1.5 minuta", "3 minuta", "4.5 minuta", "6 minuta"],
        correctAnswer: 1,
        timer: 60
    },
    {
        question: "Brat i sestra su pre 8 godina imali zajedno 8 godina. Koliko će godina imati zajedno posle 8 godina?",
        answers: ["Šesnaest","Dvadeset četiri","Trideset dve","Četrdeset"],
        correctAnswer: 3,
        timer: 90
    },
    {
        question: "Ako brojeve od 1 do 100 ispisuješ ciframa, koliko puta bi se pojavila cifra 7?",
        answers: ["Deset", "Devetnaest", "Dvadeset", "Dvadeset jedan"],
        correctAnswer: 2,
        timer: 120
    }
];