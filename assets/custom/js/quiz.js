const QUESTIONS = [
    {
        label: 'Was sollte man verstehen, bevor man mit Investitionen beginnt?',
        answers: [
            'Einen klaren Finanzplan formulieren',
            'Ratschlägen folgen, ohne sie zu analysieren',
            'Investieren, nur weil es andere tun',
            'Blind investieren, ohne Risiken zu bewerten',
        ],
    },
    {
        label: 'Welche Anlagen gelten in der Regel als zuverlässiger auf lange Sicht?',
        answers: [
            'Ein diversifiziertes Portfolio mit minimalem Risiko',
            'Stark schwankende Aktien',
            'Nicht regulierte Instrumente',
            'Projekte ohne Erfahrung und Historie',
        ],
    },
    {
        label: 'Welches Prinzip hilft, Risiken beim Vermögensaufbau zu verringern?',
        answers: [
            'Verteilung der Mittel auf verschiedene Bereiche',
            'Das gesamte Kapital in einen einzigen Vermögenswert investieren',
            'Sich auf nur eine Informationsquelle verlassen',
            'Marktnachrichten völlig ignorieren',
        ],
    },
    {
        label: 'Was kann den Ertrag von Investitionen direkt beeinflussen?',
        answers: [
            'Die allgemeine Marktlage und wirtschaftliche Situation',
            'Das Design einer Internetseite',
            'Der Produktname',
            'Das Alter des Investors',
        ],
    },
    {
        label: 'Welcher Begriff beschreibt ein hohes finanzielles Ergebnis?',
        answers: [
            'Hohe Rendite',
            'Minimale Einnahmen',
            'Teilweiser Ausstieg',
            'Ersteinzahlung',
        ],
    },
];






const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
<div class="container quiz-wrapper">
    <div class="quiz-content">
        <div class="content">
            <img class="quiz-image" src="assets/custom/images/bg1.png"/>
            <h2 class="title">Interaktives Investment-Training</h2>
            <h5 class="text">
                Schritt-für-Schritt-Ausbildung im Investieren – von den ersten Kenntnissen bis zur sicheren Arbeit am Markt. 
                Das Programm vermittelt die wichtigsten Grundlagen und entwickelt praktische Fähigkeiten, 
                die für eine erfolgreiche Karriere im Bereich der Investitionen erforderlich sind.
            </h5>
            <div class="contact-wrapper">
                <div class="my-3 icons-wrapper">
                    <span
                        class="fables-iconemail fables-second-text-color pr-2 font-20 mt-1 d-inline-block"
                    ></span>
                    <p
                        class="font-14 fables-fifth-text-color mt-2 ml-4"
                    >
                        profit_quiz@gmail.com
                    </p>
                </div>
            </div>
            <button class="btn btn-primary w-100 py-3 first-button" data-action="startQuiz">Training starten</button>
        </div>
    </div>
</div>




      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

                // <div class="bar-wrapper" style="width: 100%; padding-left: 20px; padding-right: 20px">
                //     <div class="progress" style="padding-left: 0 !important; padding-right: 0 !important;">
                //         <div class="progress-bar" style="width: ${questionsStep.getProgress()}%"></div>
                //     </div>
                // </div>

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
          <div class="container quiz-wrapper">
            <div class="quiz-content text-center quiz-start">
                <div class="question-wrapper">
                    <h3 class="question mt-4">${question.label}</h3>
                </div>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>


            </div>
        </div>
      `;
    },
    getProgress: () =>
        Math.floor((questionsStep.questionIndex / QUESTIONS.length) * 100),
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

//   <h2 class="title">Formulario de contacto financiero</h2>
//   <h3 class="mb-4">Por favor, completa el formulario para recibir tus resultados financieros</h3>

const finalStep = {
    render: () => {
        $container.innerHTML = `
    <div class="container quiz-wrapper">
    <div class="row quiz-content form-content">
        <div class="col-lg-6 col-md-6 col-sm-12 form-block">
            <form id="quiz-form">
                <h2 class="title" style="color: #fff;">Fast geschafft! Speichere deine Ergebnisse</h2>
                <p class="text" style="color: #fff; margin-bottom: 20px;">
                    Fülle das Formular aus, um dein Wissen in den Bereichen Investitionen, Finanzplanung und Kapitalmanagement zu bewerten.
                </p>
                
                <input class="form-control" name="name" type="text" placeholder="Vor- und Nachname" required>
                <input class="form-control" name="email" type="email" placeholder="E-Mail-Adresse" required>
                <input class="form-control" name="phone" type="tel" placeholder="Telefonnummer" required>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" required id="privacyPolicy">
                    <label for="privacyPolicy">
                        Ich akzeptiere
                        <a class="form-link" href="cookie-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">die Cookie-Richtlinie</a>,
                        <a class="form-link" href="privacy-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">die Datenschutzrichtlinie</a> und
                        <a class="form-link" href="terms-of-use.html" target="_blank" style="color: #fff; text-decoration: underline;">die Nutzungsbedingungen</a> und stimme der Verarbeitung meiner personenbezogenen Daten zu.
                    </label>
                </div>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" id="newsletter" checked>
                    <label for="newsletter">Ich möchte exklusive Angebote per E-Mail erhalten.</label>
                </div>

                ${Object.keys(quiz.answers)
                    .map(
                        question =>
                            `<input name="${question}" value="${quiz.answers[question]}" hidden>`
                    )
                    .join('')}

                <button type="submit" class="btn btn-primary w-100 py-3 first-button">Senden</button>
            </form>
        </div>
    </div>
</div>


      `;

        // Agrega aquí el manejador de envío del formulario
        document.getElementById('quiz-form').addEventListener('submit', function (e) {
            e.preventDefault(); // evita el envío tradicional del formulario
            localStorage.setItem('quizDone', true);
            window.location.href = 'thanks.html';
        });
    },

    // Ya no necesitas esto si no se usa en ningún sitio:
    onClick: (el) => {
        const newPath = 'thanks.html';
        if (el.getAttribute('data-action') === 'submitAnswers') {
            localStorage.setItem('quizDone', true);
            document.getElementById('main-page').classList.remove('hide');
            document.getElementById('quiz-page').classList.add('hide');
            document.getElementById('footer').classList.add('hide');
            window.location.href = newPath;
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
