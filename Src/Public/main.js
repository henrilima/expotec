class Shorten {
    constructor(firebase, warns = true) {
        if (!firebase) {
            throw new Error('Hoped to find a definition for "firebase". (11)');
        }

        if (warns !== false && warns !== true) warns = true;
        if (warns === true) {
            console.log("Shorten-Firebase v2.0.0 inicializado. (1)");
        }

        this.database = firebase.database();
    }

    async set(ref, value) {
        if (!ref || !value || typeof value !== "object") {
            throw new Error(
                "Hoped to find a reference and an value [object] (12). Check the documentation."
            );
        }

        this.database.ref(ref).update(value);
    }

    async update(ref, value) {
        this.set(ref, value);
    }

    async add(ref, value, newValue) {
        if (
            !ref ||
            !value ||
            !newValue ||
            typeof ref !== "string" ||
            typeof value !== "string" ||
            typeof newValue !== "number"
        ) {
            throw new Error(
                "Hoped to find a reference, a property and a value (13). Check the documentation."
            );
        }
        this.database
            .ref(ref)
            .once("value")
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    let oldValue = snapshot.val()[value]
                        ? snapshot.val()[value]
                        : 0;
                    let data = {
                        [value]: oldValue + newValue,
                    };
                    this.database.ref(ref).update(data);
                } else {
                    let data = {
                        [value]: newValue,
                    };
                    this.database.ref(ref).update(data);
                }
            });
    }

    async delete(ref) {
        if (!ref || typeof ref !== "string") {
            throw new Error(
                "Hoped to find a reference (14). Check the documentation."
            );
        }
        this.database.ref(ref).remove();
    }

    async erase(ref) {
        this.delete(ref);
    }

    async get(ref) {
        if (!ref || typeof ref !== "string") {
            throw new Error(
                "Hoped to find a reference (14). Check the documentation."
            );
        }
        var data = null;
        await this.database
            .ref(ref)
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() && snapshot.val()) {
                    data = snapshot.val();
                } else {
                    data = null;
                }
            });

        return Promise.resolve(data).then((value) => value);
    }

    async getAllData() {
        var data = null;
        await this.database
            .ref("/")
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() && snapshot.val()) {
                    data = snapshot.val();
                } else {
                    data = null;
                }
            });

        return Promise.resolve(data).then((value) => value);
    }

    async search(ref, property) {
        if (
            !ref ||
            (!property &&
                typeof ref !== "string" &&
                typeof property !== "string")
        ) {
            throw new Error(
                "Hoped to find a reference (14). Check the documentation."
            );
        }
        var data = null;
        await this.database
            .ref(ref)
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() && snapshot.val()[property]) {
                    data = snapshot.val()[property];
                } else {
                    data = null;
                }
            });
        return Promise.resolve(data).then((value) => value);
    }

    async latency() {
        let time = Date.now();
        return Math.round(
            await this.database
                .ref("shorten-firebase")
                .once("value")
                .then(() => Date.now() - time)
        );
    }

    async ping() {
        this.latency();
    }
};

var gendersList = document.querySelectorAll(".gender-box");
var numbersList = document.querySelectorAll(".number-box");
var idade;
var sexo;
var escolaridade;
var cidade;
var satisfacao;
var recomendaria;
var projetos;
var popular;

const firebaseConfig = {
    apiKey: "AIzaSyAmJTth6czuf4feaQusCqj4-4kBwnY0lP4",
    authDomain: "expotec-f048f.firebaseapp.com",
    databaseURL: "https://expotec-f048f-default-rtdb.firebaseio.com",
    projectId: "expotec-f048f",
    storageBucket: "expotec-f048f.appspot.com",
    messagingSenderId: "31169006400",
    appId: "1:31169006400:web:098e6f8a8ded87124d08a5"
};

firebase.initializeApp(firebaseConfig);
const database = new Shorten(firebase, false);

async function start() {
    setTimeout(() => {
        document.getElementById("start").style.display = "none";
        const avaliacao = document.getElementById("idade");
        avaliacao.style.display = "flex";
        avaliacao.style.animation = "fade-up 1s ease forwards";
        setTimeout(() => (avaliacao.style.animation = "none"), 1200);
    }, 200);
}

async function switchSection(tId, id) {
    setTimeout(() => {
        document.getElementById(tId).style.display = "none";
        const el = document.getElementById(id);
        el.style.display = "flex";
        el.style.animation = "fade-up 1s ease forwards";
        setTimeout(() => (el.style.animation = "none"), 1200);
    }, 200);
}

async function cancel(tId) {
    idade =
        sexo =
        escolaridade =
        cidade =
        satisfacao =
        popular =
        undefined;

    setTimeout(() => {
        document.getElementById(tId).style.display = "none";
        const avaliacao = document.getElementById("start");
        avaliacao.style.display = "flex";
        avaliacao.style.animation = "fade-up 1s ease forwards";
        setTimeout(() => (avaliacao.style.animation = "none"), 1200);
    }, 200);

    resetInputs();
}

async function resetInputs(id = 1) {
    numbersList.forEach((number) => {
        number.classList.remove("button-active");
        number.classList.remove("woman-button-active");
    });
    gendersList.forEach((number) => {
        number.classList.remove("button-active");
        number.classList.remove("woman-button-active");
    });
    gendersList.forEach((number) => {
        number.classList.remove("button-active");
        number.classList.remove("other-button-active");
    });

    document.getElementById("age-input").value = 14;
    document.getElementById("schooling-select").value = "none";
    document.getElementById("city-select").value = "none";

    if (id === 0) {
        document.getElementById('title-main').innerHTML = "EXPOTEC - Avaliação do Evento";
        document.getElementById('subtitle-main').innerHTML = "Que tal avaliar a sua experiência na nossa EXPOTEC? É simples e demora apenas alguns segundinhos. ;D";
    };
};

async function finish() {
    setTimeout(() => {
        document.getElementById('avaliacao').style.display = "none";
        const el = document.getElementById('start');
        el.style.display = "flex";
        el.style.animation = "fade-up 1s ease forwards";
        setTimeout(() => (el.style.animation = "none"), 1200);

        document.getElementById('emojis').style.display = "flex";
        document.getElementById('title-main').innerHTML = "<span class='emphasis'>Obrigado</span> pela avaliação!";
        document.getElementById('subtitle-main').innerHTML = "Sua ajuda é muito importante para melhorarmos nossos projetos!";

        setTimeout(() => {
            document.getElementById('emojis').style.display = "none";
            document.getElementById('title-main').innerHTML = "EXPOTEC - Avaliação do Evento";
            document.getElementById('subtitle-main').innerHTML = "Que tal avaliar a sua experiência na nossa EXPOTEC? É simples e demora apenas alguns segundinhos. ;D";
            const avaliacao = document.getElementById("start");
            avaliacao.style.animation = "fade-up 1s ease forwards";
            setTimeout(() => (avaliacao.style.animation = "none"), 1000);
        }, 8000);
    }, 200);

    const database = new Shorten(firebase);

    database.set('data', {
        [Object.keys(await database.get('data') || {}).length]: {
            sexo,
            escolaridade,
            cidade,
            satisfacao,
            idade,
        }
    });

    resetInputs(0);
}

document.addEventListener("click", (el) => {
    var classNumber = el.target.classList;
    if (!classNumber.contains("number-box")) return;
    if (!classNumber.contains("button-active")) {
        numbersList.forEach((number) => {
            number.classList.remove("button-active");
        });
        classNumber.add("button-active");
        satisfacao = Number(el.target.getAttribute("valor"));
    }
});

document.addEventListener("click", (el) => {
    var classGender = el.target.classList;
    if (!classGender.contains("gender-box")) return;
    if (!classGender.contains("button-active")) {
        gendersList.forEach((number) => {
            number.classList.remove("button-active");
            number.classList.remove("woman-button-active");
            number.classList.remove("other-button-active");
        });
        classGender.add("button-active");
        if (el.target.getAttribute("genero") === "mulher") {
            classGender.add("woman-button-active");
        }
        if (el.target.getAttribute("genero") === "outro") {
            classGender.add("other-button-active");
        }
        sexo = String(el.target.getAttribute("genero"));
    }
});

async function changeAge(value) {
    let el = document.getElementById("age-input").value;
    el = Number(el) + Number(value);
    document.getElementById("age-input").value = el;
}

async function setValues(section) {
    if (section === "idade") {
        idade = Number(document.getElementById("age-input").value);
    } else if (section === "localidade") {
        escolaridade = document.getElementById("schooling-select").value;
        cidade = document.getElementById("city-select").value;
    }
};
